<script setup lang="ts">
const open = ref(false)
const route = useRoute();
const currentStep = ref(1)
const totalSteps = 3 // Reducido de 4 a 3 (sin paso de CAPTCHA visible)
const isFooterVisible = ref(false)

import dialPhoneOptions from "@/db/tlf-dial.json";

// GTM/GA4 tracking
const { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError, trackWhatsAppClick } = useTracking()

// Anti-spam protection (reemplaza Turnstile)
const { isBot, getBotDetectionPayload } = useBotDetection()
const {
  honeypotFieldName1,
  honeypotFieldName2,
  honeypot1Value,
  honeypot2Value,
  trackInteraction,
  isLegitimateSession,
  getAntiSpamPayload,
  reset: resetAntiSpam
} = useAntiSpam()

// Rate limiting info
const { remainingAttemptsMessage, isNearLimit, recordAttempt, resetAttempts } = useRateLimit()

// Observer para ocultar el widget cuando el footer es visible
onMounted(() => {
    const footer = document.getElementById('site-footer')
    if (footer) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    isFooterVisible.value = entry.isIntersecting
                })
            },
            { threshold: 0.1 }
        )
        observer.observe(footer)

        onUnmounted(() => {
            observer.disconnect()
        })
    }
})

const phoneDropdown = ref({
    status: true,
    selected: {
        "flag": "🇨🇴",
        "code": "+57"
    },
    options: dialPhoneOptions,
});
const fullPath = computed(() => route.fullPath)

const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dial: phoneDropdown.value.selected,
    message: '',
    source_page: '',
    website: '', // honeypot (debe quedar vacío)
    _formStartTime: 0 // timestamp para validación anti-bot
})

const state = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const hasTrackedStart = ref(false)

// Track when WhatsApp widget is opened
watch(open, (newVal) => {
    if (newVal) {
        trackWhatsAppClick('floating_widget')
        currentStep.value = 1 // Reset to step 1 when opening
        state.value = 'idle'
    }
})

// Track form start when user interacts with any field
const onFormInteraction = (fieldName: string = 'unknown', eventType: 'focus' | 'blur' | 'input' = 'focus') => {
    // Track anti-spam interaction
    trackInteraction(fieldName, eventType)

    if (!hasTrackedStart.value) {
        trackFormStart('whatsapp_widget_form', fullPath.value)
        hasTrackedStart.value = true
        // Registrar timestamp de inicio del formulario
        form.value._formStartTime = Date.now()
    }
}

// Step navigation
const nextStep = () => {
    if (currentStep.value < totalSteps) {
        currentStep.value++
    }
}

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--
    }
}

// Step validation
const canProceedFromStep1 = computed(() => {
    return form.value.firstName.trim().length >= 2 && form.value.lastName.trim().length >= 2
})

const canProceedFromStep2 = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(form.value.email) && form.value.phone.trim().length >= 5
})

const canProceedFromStep3 = computed(() => {
    return form.value.message.trim().length >= 10
})

const onSubmit = async () => {
    // Block bots detected by BotD
    if (isBot.value) {
        console.warn('[AntiSpam] Bot detected, blocking submission')
        // Silently fail for bots - don't give them feedback
        state.value = 'success'
        return
    }

    // Check for insufficient interaction (potential bot)
    if (!isLegitimateSession.value) {
        console.warn('[AntiSpam] Insufficient interaction detected')
        // Don't block, but log for monitoring - server will validate
    }

    state.value = 'loading'
    errorMsg.value = ''
    form.value.source_page = fullPath.value

    // Registrar intento para rate limiting
    recordAttempt()

    // Track form submit
    trackFormSubmit('whatsapp_widget_form', form.value.source_page, {
        has_message: !!form.value.message,
        phone_country: form.value.dial.code,
    })

    try {
        // Combine form data with anti-spam payloads
        const antiSpamPayload = getAntiSpamPayload()
        const botDetectionPayload = getBotDetectionPayload()

        const res = await $fetch('/api/contact', {
            method: 'POST',
            body: {
                ...form.value,
                ...antiSpamPayload,
                ...botDetectionPayload
            }
        })
        if ((res as any)?.ok) {
            state.value = 'success'

            // Track successful form submission
            trackFormSuccess('whatsapp_widget_form', form.value.source_page, (res as any)?.id)

            // Abrir WhatsApp con mensaje pre-llenado
            const phone = "573150540000";
            const message = `Hola soy *${form.value.firstName} ${form.value.lastName}*,
Correo: *${form.value.email}*
Teléfono: *${form.value.phone}*
Desde: *${form.value.source_page}*

${form.value.message}
            `;
            window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`);

            // Limpia el form
            form.value.firstName = ''
            form.value.lastName = ''
            form.value.email = ''
            form.value.phone = ''
            form.value.message = ''

            // Reset tracking, step y anti-spam
            hasTrackedStart.value = false
            currentStep.value = 1
            resetAttempts() // Reset rate limit counter on success
            resetAntiSpam() // Reset anti-spam state

            // Cerrar widget después de éxito
            setTimeout(() => {
                open.value = false
            }, 2000)
        } else {
            throw new Error('Respuesta inválida del servidor')
        }
    } catch (e: any) {
        state.value = 'error'

        // Manejo especial para rate limiting (429)
        if (e?.statusCode === 429) {
            const retryAfter = e?.data?.retryAfter
            const minutes = retryAfter ? Math.ceil(retryAfter / 60) : 5
            errorMsg.value = `Has alcanzado el límite de intentos. Por favor, espera ${minutes} minuto${minutes > 1 ? 's' : ''} antes de intentarlo de nuevo.`
        } else {
            errorMsg.value = e?.data?.message || e?.data?.statusMessage || e?.message || 'Error al enviar'
        }

        // Track form error
        trackFormError('whatsapp_widget_form', form.value.source_page, 'submit_failed', errorMsg.value)
    }
}

const stepTitles = [
    '¿Cómo te llamas?',
    'Datos de contacto',
    'Cuéntanos más'
]

const stepDescriptions = [
    'Para poder brindarte una atención personalizada',
    'Para contactarte y enviarte información',
    'Describe brevemente tu consulta o proyecto'
]
</script>

<template>
    <div v-show="!isFooterVisible" class="fixed z-50 bottom-6 right-6 lg:bottom-8 lg:right-8">
        <!-- Botón flotante de WhatsApp -->
        <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="scale-0 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-0 opacity-0"
        >
            <button
                v-if="!open"
                @click.prevent="open = true"
                class="group relative flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
                <!-- Pulse animation (sutil) -->
                <span class="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-20"></span>

                <svg class="w-8 h-8 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>

                <!-- Tooltip -->
                <span class="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    ¿Necesitas ayuda?
                </span>
            </button>
        </Transition>

        <!-- Panel del formulario -->
        <Transition
            enter-active-class="transition duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            enter-from-class="translate-y-8 scale-95 opacity-0"
            enter-to-class="translate-y-0 scale-100 opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="translate-y-0 scale-100 opacity-100"
            leave-to-class="translate-y-8 scale-95 opacity-0"
        >
            <div
                v-if="open"
                class="fixed inset-0 lg:inset-auto lg:absolute lg:bottom-0 lg:right-0 lg:w-[420px] lg:max-h-[85vh] bg-white lg:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
                <!-- Header -->
                <div class="relative bg-primary text-white px-6 py-5">
                    <!-- Botón cerrar -->
                    <button
                        @click.prevent="open = false"
                        class="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <!-- Info del header -->
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold">Escríbenos</h3>
                            <p class="text-sm text-white/80">Respuesta en menos de 24h</p>
                        </div>
                    </div>

                    <!-- Progress steps -->
                    <div class="flex items-center gap-2">
                        <template v-for="step in totalSteps" :key="step">
                            <div
                                class="flex-1 h-1.5 rounded-full transition-all duration-500"
                                :class="step <= currentStep ? 'bg-white' : 'bg-white/30'"
                            ></div>
                        </template>
                    </div>
                </div>

                <!-- Contenido del formulario -->
                <div class="flex-1 overflow-y-auto px-6 py-6">
                    <!-- Honeypot campos ocultos (anti-bot) -->
                    <input type="text" name="website" v-model="form.website" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />
                    <!-- Dynamic honeypot 1 -->
                    <input
                        :name="honeypotFieldName1"
                        v-model="honeypot1Value"
                        type="text"
                        class="absolute -left-[9999px] opacity-0 h-0 w-0 pointer-events-none"
                        tabindex="-1"
                        autocomplete="off"
                        aria-hidden="true"
                    />
                    <!-- Dynamic honeypot 2 -->
                    <input
                        :name="honeypotFieldName2"
                        v-model="honeypot2Value"
                        type="url"
                        class="absolute -left-[9999px] opacity-0 h-0 w-0 pointer-events-none"
                        tabindex="-1"
                        autocomplete="off"
                        aria-hidden="true"
                    />

                    <!-- Step header -->
                    <div class="mb-6">
                        <div class="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <span class="w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold text-xs flex items-center justify-center">{{ currentStep }}</span>
                            <span>Paso {{ currentStep }} de {{ totalSteps }}</span>
                        </div>
                        <h4 class="text-xl font-bold text-gray-900">{{ stepTitles[currentStep - 1] }}</h4>
                        <p class="text-sm text-gray-500 mt-1">{{ stepDescriptions[currentStep - 1] }}</p>
                    </div>

                    <!-- Step 1: Name -->
                    <Transition
                        mode="out-in"
                        enter-active-class="transition duration-200 ease-out"
                        enter-from-class="translate-x-4 opacity-0"
                        enter-to-class="translate-x-0 opacity-100"
                        leave-active-class="transition duration-150 ease-in"
                        leave-from-class="translate-x-0 opacity-100"
                        leave-to-class="-translate-x-4 opacity-0"
                    >
                        <div v-if="currentStep === 1" class="space-y-4">
                            <div>
                                <label for="first-name" class="block text-sm font-medium text-gray-700 mb-2">Nombres</label>
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    v-model="form.firstName"
                                    autocomplete="given-name"
                                    @focus="onFormInteraction('firstName', 'focus')"
                                    @blur="onFormInteraction('firstName', 'blur')"
                                    @input="onFormInteraction('firstName', 'input')"
                                    placeholder="Ej: Juan Carlos"
                                    class="block w-full rounded-xl bg-gray-50 px-4 py-3.5 text-base text-gray-900 border-2 border-transparent focus:border-[#25D366] focus:bg-white focus:ring-0 transition-all"
                                    required
                                >
                            </div>
                            <div>
                                <label for="last-name" class="block text-sm font-medium text-gray-700 mb-2">Apellidos</label>
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    v-model="form.lastName"
                                    autocomplete="family-name"
                                    @focus="onFormInteraction('lastName', 'focus')"
                                    @blur="onFormInteraction('lastName', 'blur')"
                                    @input="onFormInteraction('lastName', 'input')"
                                    placeholder="Ej: Pérez García"
                                    class="block w-full rounded-xl bg-gray-50 px-4 py-3.5 text-base text-gray-900 border-2 border-transparent focus:border-[#25D366] focus:bg-white focus:ring-0 transition-all"
                                    required
                                >
                            </div>
                        </div>

                        <!-- Step 2: Contact -->
                        <div v-else-if="currentStep === 2" class="space-y-4">
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    v-model="form.email"
                                    autocomplete="email"
                                    @focus="onFormInteraction('email', 'focus')"
                                    @blur="onFormInteraction('email', 'blur')"
                                    @input="onFormInteraction('email', 'input')"
                                    placeholder="info@contuhogar.com"
                                    class="block w-full rounded-xl bg-gray-50 px-4 py-3.5 text-base text-gray-900 border-2 border-transparent focus:border-[#25D366] focus:bg-white focus:ring-0 transition-all"
                                    required
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                                <div class="flex gap-2">
                                    <select
                                        v-model="form.dial"
                                        name="dial"
                                        id="dial"
                                        required
                                        class="w-28 rounded-xl bg-gray-50 px-3 py-3.5 text-sm text-gray-900 border-2 border-transparent focus:border-[#25D366] focus:bg-white focus:ring-0 transition-all"
                                    >
                                        <option v-for="(option, index) in phoneDropdown.options" :key="index" :value="option">
                                            {{ option.flag }} {{ option.code }}
                                        </option>
                                    </select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        v-model="form.phone"
                                        autocomplete="tel"
                                        @focus="onFormInteraction('phone', 'focus')"
                                        @blur="onFormInteraction('phone', 'blur')"
                                        @input="onFormInteraction('phone', 'input')"
                                        placeholder="3001234567"
                                        class="flex-1 rounded-xl bg-gray-50 px-4 py-3.5 text-base text-gray-900 border-2 border-transparent focus:border-[#25D366] focus:bg-white focus:ring-0 transition-all"
                                        required
                                    >
                                </div>
                            </div>
                        </div>

                        <!-- Step 3: Message (último paso) -->
                        <div v-else-if="currentStep === 3" class="space-y-4">
                            <div class="relative">
                                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                                    ¿En qué podemos ayudarte?
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    v-model="form.message"
                                    rows="5"
                                    maxlength="500"
                                    @focus="onFormInteraction('message', 'focus')"
                                    @blur="onFormInteraction('message', 'blur')"
                                    @input="onFormInteraction('message', 'input')"
                                    placeholder="Cuéntanos sobre tu proyecto de vivienda, tus dudas o cómo podemos ayudarte..."
                                    class="block w-full rounded-xl bg-gray-50 px-4 py-3.5 pb-8 text-base text-gray-900 border-2 border-transparent focus:border-[#25D366] focus:bg-white focus:ring-0 transition-all resize-none"
                                ></textarea>
                                <div
                                    class="absolute bottom-3 right-3 text-xs"
                                    :class="form.message.length > 500 ? 'text-red-600 font-semibold' : form.message.length > 450 ? 'text-orange-600' : 'text-gray-400'"
                                >
                                    {{ form.message.length }}/500
                                </div>
                            </div>

                            <!-- Rate limit warning -->
                            <div v-if="remainingAttemptsMessage && isNearLimit" class="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                                <p class="text-orange-700 text-sm font-medium flex items-center gap-2">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                    {{ remainingAttemptsMessage }}
                                </p>
                            </div>

                            <!-- Success message -->
                            <Transition
                                enter-active-class="transition duration-300 ease-out"
                                enter-from-class="scale-95 opacity-0"
                                enter-to-class="scale-100 opacity-100"
                            >
                                <div v-if="state === 'success'" class="p-4 bg-green-50 border border-green-200 rounded-xl">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p class="text-green-800 font-semibold">¡Mensaje enviado!</p>
                                            <p class="text-green-600 text-sm">Te contactaremos pronto por WhatsApp</p>
                                        </div>
                                    </div>
                                </div>
                            </Transition>

                            <!-- Error message -->
                            <div v-if="state === 'error'" class="p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p class="text-red-700 text-sm">{{ errorMsg }}</p>
                            </div>
                        </div>
                    </Transition>
                </div>

                <!-- Footer con navegación -->
                <div class="px-6 py-4 border-t border-gray-100 bg-gray-50/80 backdrop-blur-sm">
                    <div class="flex gap-3">
                        <!-- Botón Atrás -->
                        <button
                            v-if="currentStep > 1 && state !== 'success'"
                            type="button"
                            @click="prevStep"
                            class="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>

                        <!-- Botones de paso -->
                        <button
                            v-if="currentStep === 1"
                            type="button"
                            @click="nextStep"
                            :disabled="!canProceedFromStep1"
                            class="flex-1 px-6 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            :class="canProceedFromStep1 ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-200 text-gray-500'"
                        >
                            <span>Continuar</span>
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>

                        <button
                            v-else-if="currentStep === 2"
                            type="button"
                            @click="nextStep"
                            :disabled="!canProceedFromStep2"
                            class="flex-1 px-6 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            :class="canProceedFromStep2 ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-200 text-gray-500'"
                        >
                            <span>Continuar</span>
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>

                        <button
                            v-else-if="currentStep === 3 && state !== 'success'"
                            type="button"
                            @click="onSubmit"
                            :disabled="!canProceedFromStep3 || state === 'loading'"
                            class="flex-1 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#128C7E] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <svg v-if="state === 'loading'" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            <span>{{ state === 'loading' ? 'Enviando...' : 'Enviar por WhatsApp' }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
