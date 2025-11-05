<script setup lang="ts">
const open = ref(false)
const route = useRoute();
const currentStep = ref(1)
const totalSteps = 4

import dialPhoneOptions from "@/db/tlf-dial.json";

// GTM/GA4 tracking
const { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError, trackWhatsAppClick } = useTracking()

// CAPTCHA
const { captchaAnswer, userAnswer: captchaUserAnswer, captchaError, validateCaptcha, resetCaptcha, generateCaptcha } = useCaptcha()
const captchaQuestion = ref<string>('')

// Rate limiting info
const { remainingAttemptsMessage, isNearLimit } = useRateLimit()

// Generate initial CAPTCHA question
onMounted(() => {
    const { question } = generateCaptcha()
    captchaQuestion.value = question
})

// Handle CAPTCHA refresh
const handleCaptchaRefresh = () => {
    const { question } = resetCaptcha()
    captchaQuestion.value = question
}

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
    }
})

// Track form start when user interacts with any field
const onFormInteraction = () => {
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
    // Validar CAPTCHA primero
    if (!validateCaptcha()) {
        return
    }

    state.value = 'loading'
    errorMsg.value = ''
    form.value.source_page = fullPath.value

    // Track form submit
    trackFormSubmit('whatsapp_widget_form', form.value.source_page, {
        has_message: !!form.value.message,
        phone_country: form.value.dial.code,
    })

    try {
        const res = await $fetch('/api/contact', {
            method: 'POST',
            body: {
                ...form.value,
                _captchaAnswer: captchaAnswer.value,
                _captchaUserAnswer: parseInt(captchaUserAnswer.value)
            }
        })
        if ((res as any)?.ok) {

            const sendRes = await $fetch('/api/send/lead', {
                method: 'POST',
                body: form.value
            })

            if ((sendRes as any)?.ok) {
                state.value = 'success'

                // Track successful form submission
                trackFormSuccess('whatsapp_widget_form', form.value.source_page, (res as any)?.id)

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

                // Reset CAPTCHA, tracking y step
                const { question } = resetCaptcha()
                captchaQuestion.value = question
                hasTrackedStart.value = false
                currentStep.value = 1
            }

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

        // Reset CAPTCHA en caso de error
        const { question } = resetCaptcha()
        captchaQuestion.value = question

        // Track form error
        trackFormError('whatsapp_widget_form', form.value.source_page, 'submit_failed', errorMsg.value)
    }
}

const stepTitles = [
    '¿Cómo te llamas?',
    'Datos de contacto',
    'Cuéntanos más',
    'Verificación'
]
</script>

<template>
    <div :class="[
        'fixed z-50 flex items-end gap-6',
        { 'bottom-0 right-0 lg:bottom-10 lg:right-10': open },
        { 'bottom-5 right-5': !open },
    ]">
        <Transition enter-from-class="translate-x-full translate-y-full opacity-0"
            enter-active-class="transition duration-500 ease-out"
            enter-to-class="translate-x-0 translate-y-0 opacity-100 scale-100"
            leave-from-class="translate-x-0 translate-y-0 opacity-100"
            leave-active-class="transition duration-500 ease-in"
            leave-to-class="translate-x-full translate-y-full opacity-0 scale-0">
            <div v-if="open" class="w-screen h-screen lg:h-auto lg:w-full lg:max-w-md bg-white shadow-2xl lg:rounded-3xl relative flex flex-col">
                <!-- Header -->
                <div class="relative bg-primary text-white px-6 py-6 lg:rounded-t-3xl">
                    <button class="absolute right-4 top-4 text-white hover:text-gray-200 transition-colors"
                        @click.prevent="open = false">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div class="flex items-center gap-3 mb-4">
                        <NuxtImg src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                            class="w-10 h-10" alt="WhatsApp" format="webp" quality="85" sizes="40px" />
                        <div>
                            <h3 class="text-lg font-semibold">Contáctanos</h3>
                            <p class="text-sm text-white/90">Te responderemos pronto</p>
                        </div>
                    </div>

                    <!-- Progress bar -->
                    <div class="flex gap-1">
                        <div v-for="step in totalSteps" :key="step"
                             class="flex-1 h-1 rounded-full transition-all duration-300"
                             :class="step <= currentStep ? 'bg-white' : 'bg-white/30'">
                        </div>
                    </div>
                </div>

                <!-- Form Content -->
                <div class="flex-1 overflow-y-auto px-6 py-6">
                    <!-- Honeypot -->
                    <input type="text" name="website" v-model="form.website" class="hidden" tabindex="-1"
                        autocomplete="off" />

                    <!-- Step indicator -->
                    <div class="mb-6">
                        <p class="text-sm text-gray-500">Paso {{ currentStep }} de {{ totalSteps }}</p>
                        <h4 class="text-xl font-semibold text-primary mt-1">{{ stepTitles[currentStep - 1] }}</h4>
                    </div>

                    <!-- Step 1: Name -->
                    <div v-show="currentStep === 1" class="space-y-4">
                        <div>
                            <label for="first-name" class="block text-sm font-semibold text-primary mb-2">Nombres</label>
                            <input type="text" name="first-name" id="first-name" v-model="form.firstName"
                                autocomplete="given-name"
                                @focus="onFormInteraction"
                                placeholder="Ej: Juan"
                                class="block w-full rounded-lg bg-gray-50 px-4 py-3 text-base text-primary border-2 border-transparent focus:border-primary focus:bg-white transition-all"
                                required>
                        </div>
                        <div>
                            <label for="last-name" class="block text-sm font-semibold text-primary mb-2">Apellidos</label>
                            <input type="text" name="last-name" id="last-name" v-model="form.lastName"
                                autocomplete="family-name"
                                placeholder="Ej: Pérez"
                                class="block w-full rounded-lg bg-gray-50 px-4 py-3 text-base text-primary border-2 border-transparent focus:border-primary focus:bg-white transition-all"
                                required>
                        </div>
                    </div>

                    <!-- Step 2: Contact -->
                    <div v-show="currentStep === 2" class="space-y-4">
                        <div>
                            <label for="email" class="block text-sm font-semibold text-primary mb-2">Correo electrónico</label>
                            <input id="email" name="email" type="email" v-model="form.email"
                                autocomplete="email"
                                placeholder="tu@email.com"
                                class="block w-full rounded-lg bg-gray-50 px-4 py-3 text-base text-primary border-2 border-transparent focus:border-primary focus:bg-white transition-all"
                                required>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-primary mb-2">Teléfono</label>
                            <div class="grid grid-cols-3 gap-2">
                                <select v-model="form.dial" name="dial" id="dial" required
                                    class="col-span-1 rounded-lg bg-gray-50 px-3 py-3 text-sm text-primary border-2 border-transparent focus:border-primary focus:bg-white transition-all">
                                    <option v-for="(option, index) in phoneDropdown.options" :value="option">
                                        {{ option.flag }} {{ option.code }}
                                    </option>
                                </select>
                                <input type="tel" name="phone" id="phone" v-model="form.phone"
                                    autocomplete="tel"
                                    placeholder="3001234567"
                                    class="col-span-2 rounded-lg bg-gray-50 px-4 py-3 text-base text-primary border-2 border-transparent focus:border-primary focus:bg-white transition-all"
                                    required>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: Message -->
                    <div v-show="currentStep === 3" class="space-y-4">
                        <div class="relative">
                            <label for="message" class="block text-sm font-semibold text-primary mb-2">
                                ¿En qué podemos ayudarte?
                            </label>
                            <textarea id="message" name="message" v-model="form.message" rows="6"
                                maxlength="500"
                                placeholder="Cuéntanos sobre tu proyecto..."
                                class="block w-full rounded-lg bg-gray-50 px-4 py-3 pb-8 text-base text-primary border-2 border-transparent focus:border-primary focus:bg-white transition-all resize-none"></textarea>
                            <div class="absolute bottom-2 right-3 text-xs"
                                 :class="form.message.length > 500 ? 'text-red-600 font-semibold' : form.message.length > 450 ? 'text-orange-600' : 'text-gray-400'">
                                {{ form.message.length }}/500
                            </div>
                        </div>
                    </div>

                    <!-- Step 4: CAPTCHA -->
                    <div v-show="currentStep === 4" class="space-y-4">
                        <SimpleCaptcha v-model="captchaUserAnswer" :question="captchaQuestion" :error="captchaError" @refresh="handleCaptchaRefresh" />

                        <!-- Rate limit warning -->
                        <div v-if="remainingAttemptsMessage && isNearLimit" class="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <p class="text-orange-700 text-sm font-medium">⚠️ {{ remainingAttemptsMessage }}</p>
                        </div>

                        <div v-if="state === 'success'" class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p class="text-green-700 text-sm">¡Gracias! Te contactaremos pronto.</p>
                        </div>
                        <div v-else-if="state === 'error'" class="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p class="text-red-700 text-sm">{{ errorMsg }}</p>
                        </div>
                    </div>
                </div>

                <!-- Footer with navigation -->
                <div class="px-6 py-4 border-t border-gray-100 lg:rounded-b-3xl bg-gray-50">
                    <div class="flex gap-3">
                        <button v-if="currentStep > 1 && currentStep < totalSteps"
                                type="button"
                                @click="prevStep"
                                class="px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-all">
                            Atrás
                        </button>

                        <button v-if="currentStep === 1"
                                type="button"
                                @click="nextStep"
                                :disabled="!canProceedFromStep1"
                                class="flex-1 px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                :class="canProceedFromStep1 ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-300 text-gray-500'">
                            Continuar
                        </button>

                        <button v-else-if="currentStep === 2"
                                type="button"
                                @click="nextStep"
                                :disabled="!canProceedFromStep2"
                                class="flex-1 px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                :class="canProceedFromStep2 ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-300 text-gray-500'">
                            Continuar
                        </button>

                        <button v-else-if="currentStep === 3"
                                type="button"
                                @click="nextStep"
                                :disabled="!canProceedFromStep3"
                                class="flex-1 px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                :class="canProceedFromStep3 ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-300 text-gray-500'">
                            Continuar
                        </button>

                        <button v-else-if="currentStep === 4"
                                type="button"
                                @click="onSubmit"
                                :disabled="state === 'loading'"
                                class="flex-1 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <svg v-if="state === 'loading'" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>{{ state === 'loading' ? 'Enviando...' : 'Enviar por WhatsApp' }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>

        <button :class="[
            'w-16 h-16 shadow-lg hover:scale-110 transition-transform duration-300',
            { 'hidden lg:block': open }
        ]" @click.prevent="open = !open">
            <NuxtImg src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                class="h-full w-full object-center object-cover" alt="WhatsApp" format="webp" quality="85" sizes="64px" loading="lazy" />
        </button>
    </div>
</template>
