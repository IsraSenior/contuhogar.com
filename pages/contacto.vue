<script setup lang="ts">
import { ref, computed } from 'vue'
const route = useRoute();
import dialPhoneOptions from "@/db/tlf-dial.json";
import { useMainStore } from '@/stores/index'
import { getPhoneFormat, getDialCodeFromCountry } from '@/utils/phoneFormats'
import { useGeoLocation } from '@/composables/useGeoLocation'

const store = useMainStore()

const title = `ConTuHogar | Contacto`;
const description = "Contáctanos para obtener asesoría especializada en crédito hipotecario, leasing habitacional y financiamiento de vivienda en Colombia. Atención personalizada para colombianos en el exterior."

// SEO optimizado
useSeo({
    title: title,
    description: description,
    type: 'website'
})

// Structured data para contacto
useLocalBusinessSchema()

// GTM/GA4 tracking
const { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError } = useTracking()

// CAPTCHA
const { captchaAnswer, userAnswer: captchaUserAnswer, captchaError, validateCaptcha, resetCaptcha, generateCaptcha } = useCaptcha()
const captchaQuestion = ref<string>('')

// Rate limiting info
const { remainingAttemptsMessage, isNearLimit, recordAttempt, resetAttempts } = useRateLimit()

// Auto-detectar país del usuario
const { detectCountry } = useGeoLocation()

// Placeholder dinámico según el país seleccionado
const phonePlaceholder = computed(() => {
    const format = getPhoneFormat(form.value.dial.code)
    return format ? format.placeholder : '3001234567'
})

// Formatear el número de teléfono mientras el usuario escribe
const formatPhoneInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    const cursorPosition = input.selectionStart || 0
    const oldValue = input.value

    // Extraer solo los dígitos
    const digitsOnly = oldValue.replace(/\D/g, '')

    // Obtener el formato del país
    const format = getPhoneFormat(form.value.dial.code)

    if (!format || !format.mask) {
        form.value.phone = digitsOnly
        return
    }

    // Aplicar el formato usando la máscara
    let formatted = ''
    let digitIndex = 0
    let newCursorPosition = cursorPosition

    for (let i = 0; i < format.mask.length && digitIndex < digitsOnly.length; i++) {
        const maskChar = format.mask[i]

        if (maskChar === '#') {
            formatted += digitsOnly[digitIndex]
            digitIndex++
        } else {
            formatted += maskChar
            // Si estamos antes de la posición del cursor, ajustar
            if (formatted.length <= cursorPosition) {
                newCursorPosition++
            }
        }
    }

    // Actualizar el valor
    form.value.phone = formatted

    // Restaurar la posición del cursor en el siguiente tick
    nextTick(() => {
        input.setSelectionRange(newCursorPosition, newCursorPosition)
    })

    // Llamar a checkFormProgress después de formatear
    checkFormProgress()
}

// Generate initial CAPTCHA question y auto-detectar país
onMounted(async () => {
    const { question } = generateCaptcha()
    captchaQuestion.value = question

    // Auto-detectar país del usuario
    try {
        const detectedCountry = await detectCountry()

        if (detectedCountry) {
            const dialCode = getDialCodeFromCountry(detectedCountry)

            if (dialCode) {
                // Buscar el país en las opciones disponibles
                const countryOption = dialPhoneOptions.find(opt => opt.code === dialCode)

                if (countryOption) {
                    form.value.dial = countryOption
                    phoneDropdown.value.selected = countryOption
                }
            }
        }
    } catch (e) {
        console.warn('Country detection failed, using default:', e)
        // Si falla, mantener Colombia como país por defecto
    }
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

const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dial: phoneDropdown.value.selected,
    message: '',
    source_page: route.fullPath,
    website: '', // honeypot (debe quedar vacío)
    _formStartTime: 0 // timestamp para validación anti-bot
})

const state = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const hasTrackedStart = ref(false)

// Validación inline
const emailError = ref('')
const phoneError = ref('')

// CAPTCHA condicional - solo se muestra cuando hay interacción significativa
const showCaptcha = ref(false)

// Verificar si los campos básicos están completos para mostrar CAPTCHA
const checkFormProgress = () => {
    if (!showCaptcha.value) {
        const hasName = form.value.firstName.length >= 2
        const hasEmail = form.value.email.length >= 5
        const hasPhone = form.value.phone.length >= 5

        if (hasName && hasEmail && hasPhone) {
            showCaptcha.value = true
        }
    }
}

// Validar email en tiempo real
const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (form.value.email && !emailRegex.test(form.value.email)) {
        emailError.value = 'Por favor ingresa un correo electrónico válido'
    } else {
        emailError.value = ''
    }
}

// Validar teléfono en tiempo real
const validatePhone = () => {
    const phoneRegex = /^[\d\s\-\+\(\)]{5,25}$/
    if (form.value.phone && !phoneRegex.test(form.value.phone)) {
        phoneError.value = 'Por favor ingresa un número de teléfono válido'
    } else {
        phoneError.value = ''
    }
}

// Track form start when user interacts with any field
const onFormInteraction = () => {
    if (!hasTrackedStart.value) {
        trackFormStart('contact_form', route.fullPath)
        hasTrackedStart.value = true
        // Registrar timestamp de inicio del formulario
        form.value._formStartTime = Date.now()
    }
    // Verificar progreso del formulario para mostrar CAPTCHA
    checkFormProgress()
}

// Track phone and email clicks
const { trackPhoneClick, trackEmailClick } = useTracking()

const onPhoneClick = (phoneNumber: string) => {
    trackPhoneClick(phoneNumber, 'contact_page')
}

const onEmailClick = (emailAddress: string) => {
    trackEmailClick(emailAddress, 'contact_page')
}

const onSubmit = async () => {
    // Si el CAPTCHA no se ha mostrado aún, mostrarlo ahora
    if (!showCaptcha.value) {
        showCaptcha.value = true
        return
    }

    // Validar CAPTCHA primero
    if (!validateCaptcha()) {
        return
    }

    state.value = 'loading'
    errorMsg.value = ''

    // Registrar intento para rate limiting
    recordAttempt()

    // Track form submit
    trackFormSubmit('contact_form', form.value.source_page, {
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
            state.value = 'success'

            // Track successful form submission
            trackFormSuccess('contact_form', form.value.source_page, (res as any)?.id)

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

            // Reset CAPTCHA, tracking y rate limit counter
            const { question } = resetCaptcha()
            captchaQuestion.value = question
            hasTrackedStart.value = false
            resetAttempts() // Reset rate limit counter on success
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
        trackFormError('contact_form', form.value.source_page, 'submit_failed', errorMsg.value)
    }
}
</script>

<template>
    <!-- Layout optimizado: dos columnas (info + formulario) -->
    <div class="relative bg-muted min-h-screen">
        <div class="mx-auto max-w-7xl py-16 lg:px-0 px-5">
            <!-- Grid de dos columnas -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                <!-- COLUMNA IZQUIERDA: Información y contenido de valor -->
                <div class="col-span-7">
                    <h2 class="text-4xl font-bold tracking-tight text-pretty text-primary sm:text-5xl lg:text-6xl">
                        Recibe tu Pre-Aprobación en 24 Horas
                    </h2>
                    <p class="mt-4 text-base text-gray-600">Completa el formulario y recibe:</p>
                    <ul class="mt-3 space-y-2 text-sm text-gray-600">
                        <li class="flex items-start gap-2">
                            <svg class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <span>Análisis de tu perfil sin costo ni compromiso</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <span>Comparativa de tasas personalizadas</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <span>Acompañamiento de expertos de inicio a fin</span>
                        </li>
                    </ul>

                    <!-- Badge de respuesta rápida -->
                    <div class="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Respuesta en menos de 24 horas
                    </div>

                    <!-- Social Proof y Bancos Aliados -->
                    <div class="mt-8 pt-6 border-t border-gray-200">
                        <!-- Contador Social -->
                        <div class="flex items-center gap-2 text-sm text-gray-600 mb-4">
                            <p><span class="font-semibold text-primary">Más de 1,500 colombianos</span> han cumplido su sueño con nosotros</p>
                        </div>

                        <!-- Bancos Aliados -->
                        <div>
                            <p class="text-xs text-gray-500 mb-2 font-medium">Trabajamos con:</p>
                            <div class="flex flex-wrap items-center gap-6 opacity-60">
                                <NuxtImg
                                    v-for="(logo, idx) in store.logos.slice(0, 4)"
                                    :key="idx"
                                    :src="logo"
                                    :alt="`Banco aliado ${idx + 1}`"
                                    class="h-6 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- COLUMNA DERECHA: Formulario -->
                <div class="col-span-5 bg-white rounded-2xl shadow-xl shadow-primary/5 p-8 lg:p-10">
                    <form @submit.prevent="onSubmit">
                        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <!-- Honeypot oculto -->
                            <input type="text" name="website" v-model="form.website" class="hidden" tabindex="-1"
                                autocomplete="off" />
                            <div>
                                <label for="first-name"
                                    class="block text-sm/6 font-semibold text-primary">Nombres</label>
                                <div class="mt-2.5">
                                    <input type="text" name="first-name" id="first-name" v-model="form.firstName"
                                        autocomplete="given-name"
                                        placeholder="Ej: Juan Carlos"
                                        @focus="onFormInteraction"
                                        @input="checkFormProgress"
                                        class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                        required>
                                </div>
                            </div>
                            <div>
                                <label for="last-name"
                                    class="block text-sm/6 font-semibold text-primary">Apellidos <span class="text-gray-400 font-normal text-xs">(opcional)</span></label>
                                <div class="mt-2.5">
                                    <input type="text" name="last-name" id="last-name" v-model="form.lastName"
                                        autocomplete="family-name"
                                        placeholder="Ingresa tus apellidos"
                                        class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary">
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="email" class="block text-sm/6 font-semibold text-primary">Correo
                                    electrónico</label>
                                <div class="mt-2.5">
                                    <input id="email" name="email" type="email" v-model="form.email"
                                        autocomplete="email"
                                        placeholder="tu.email@ejemplo.com"
                                        @blur="validateEmail"
                                        @input="checkFormProgress"
                                        class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                        :class="{ 'outline-red-500 outline-2': emailError }"
                                        required>
                                </div>
                                <p v-if="emailError" class="mt-1 text-sm text-red-600">{{ emailError }}</p>
                            </div>
                            <div class="sm:col-span-2">
                                <label class="block text-sm/6 font-semibold text-primary mb-2.5">Teléfono</label>
                                <div class="grid grid-cols-3 gap-3">
                                    <!-- Combobox de país -->
                                    <div class="col-span-1">
                                        <PhoneCountryCombobox
                                            v-model="form.dial"
                                            :options="phoneDropdown.options"
                                        />
                                    </div>
                                    <!-- Input de teléfono -->
                                    <div class="col-span-2">
                                        <input type="tel" name="phone" id="phone" v-model="form.phone"
                                            autocomplete="tel"
                                            :placeholder="`Ej: ${phonePlaceholder}`"
                                            @blur="validatePhone"
                                            @input="formatPhoneInput"
                                            aria-describedby="phone-description"
                                            class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                            :class="{ 'outline-red-500 outline-2': phoneError }"
                                            required>
                                        <p v-if="phoneError" class="mt-1 text-sm text-red-600">{{ phoneError }}</p>
                                        <!-- Hint del formato -->
                                        <p v-if="getPhoneFormat(form.dial.code)" class="mt-1 text-xs text-gray-500 font-mono">
                                            Formato: {{ getPhoneFormat(form.dial.code)?.format }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <div class="flex justify-between text-sm/6">
                                    <label for="message" class="block text-sm/6 font-semibold text-primary">
                                        Mensaje <span class="text-gray-400 font-normal text-xs">(opcional)</span></label>
                                </div>
                                <div class="mt-2.5 relative">
                                    <textarea id="message" name="message" v-model="form.message" rows="4"
                                        maxlength="500"
                                        placeholder="Cuéntanos cómo podemos ayudarte..."
                                        aria-describedby="message-description"
                                        class="block w-full rounded-md bg-white px-3.5 py-2 pb-8 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"></textarea>
                                    <div class="absolute bottom-2 right-3 text-xs"
                                         :class="form.message.length > 500 ? 'text-red-600 font-semibold' : form.message.length > 450 ? 'text-orange-600' : 'text-gray-400'">
                                        {{ form.message.length }}/500
                                    </div>
                                </div>
                            </div>

                            <!-- CAPTCHA - solo se muestra cuando hay progreso significativo -->
                            <div v-if="showCaptcha" class="sm:col-span-2">
                                <!-- Transición suave -->
                                <div class="animate-fade-in">
                                    <SimpleCaptcha v-model="captchaUserAnswer" :question="captchaQuestion" :error="captchaError" @refresh="handleCaptchaRefresh" />

                                    <!-- Rate limit warning -->
                                    <div v-if="remainingAttemptsMessage && isNearLimit" class="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                        <p class="text-orange-700 text-sm font-medium">⚠️ {{ remainingAttemptsMessage }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-10 border-t border-primary/10 pt-8">
                            <button type="submit" class="btn primary w-full sm:w-auto" :disabled="state === 'loading'">
                                <span v-if="state === 'loading'">Procesando solicitud…</span>
                                <span v-else>Obtener Asesoría Gratuita</span>
                            </button>

                            <p class="mt-3 text-xs text-gray-500 flex items-center gap-1">
                                <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                                </svg>
                                Tus datos están seguros y protegidos
                            </p>

                            <p v-if="state === 'success'" class="mt-4 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                                ✓ ¡Gracias por contactarnos! Nuestro equipo te responderá en las próximas 24 horas.
                            </p>
                            <p v-else-if="state === 'error'" class="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                                ⚠️ {{ errorMsg }}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Sección de información de contacto y mapa -->
    <div class="bg-white py-12 sm:py-20">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <!-- Header de la sección -->
            <div class="mb-12">
                <h2 class="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    Otras formas de contactarnos
                </h2>
                <p class="mt-2 text-base text-gray-600">Elige la opción que más te convenga</p>
            </div>

            <!-- Grid de información de contacto -->
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                <!-- Tarjeta 1: Teléfonos -->
                <div class="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-6 hover:shadow-lg transition-shadow">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-primary">Teléfonos</h3>
                    </div>
                    <dl class="space-y-2 text-sm text-gray-600">
                        <dd><span class="text-gray-500">Colombia:</span> <a class="font-medium text-primary hover:text-secondary transition-colors"
                                href="tel:+573208033672"
                                @click="onPhoneClick('+573208033672')">(+57) 320 8033672</a></dd>
                        <dd><span class="text-gray-500">EE. UU.:</span> <a class="font-medium text-primary hover:text-secondary transition-colors"
                                href="tel:+17185214701"
                                @click="onPhoneClick('+17185214701')">(+1) 718 521 4701</a></dd>
                        <dd><span class="text-gray-500">España:</span> <a class="font-medium text-primary hover:text-secondary transition-colors"
                                href="tel:+34910602499"
                                @click="onPhoneClick('+34910602499')">(+34) 910 602 499</a></dd>
                    </dl>
                </div>

                <!-- Tarjeta 2: Correos -->
                <div class="rounded-xl bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 hover:shadow-lg transition-shadow">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                            <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-primary">Correos</h3>
                    </div>
                    <dl class="space-y-2 text-sm text-gray-600">
                        <dd><a class="font-medium text-primary hover:text-secondary transition-colors break-all"
                                href="mailto:gerencia@contuhogar.net"
                                @click="onEmailClick('gerencia@contuhogar.net')">gerencia@contuhogar.net</a></dd>
                        <dd><a class="font-medium text-primary hover:text-secondary transition-colors break-all"
                                href="mailto:gerenciacomercial@contuhogar.net"
                                @click="onEmailClick('gerenciacomercial@contuhogar.net')">gerenciacomercial@contuhogar.net</a></dd>
                    </dl>
                </div>

                <!-- Tarjeta 3: Ubicación -->
                <div class="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-6 hover:shadow-lg transition-shadow">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-primary">Ubicación</h3>
                    </div>
                    <p class="text-sm text-gray-600">
                        Cra. 54 # 105-20<br>
                        Suba, Bogotá D.C.<br>
                        Colombia
                    </p>
                </div>

                <!-- Tarjeta 4: Horarios -->
                <div class="rounded-xl bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 hover:shadow-lg transition-shadow">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                            <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-primary">Horario</h3>
                    </div>
                    <dl class="space-y-2 text-sm text-gray-600">
                        <dd><span class="font-medium text-gray-700">Lun - Vie:</span> 9:00 AM - 6:00 PM</dd>
                        <dd><span class="font-medium text-gray-700">Sábado:</span> 9:00 AM - 1:00 PM</dd>
                        <dd><span class="font-medium text-gray-700">Domingo:</span> Cerrado</dd>
                    </dl>
                </div>
            </div>

            <!-- Mapa integrado - ancho completo pero discreto -->
            <div class="mt-8 relative">
                <div class="relative w-full h-80 rounded-2xl overflow-hidden shadow-md">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7952.869193792473!2d-74.06811201548074!3d4.694301983112287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9ac51b077c03%3A0x6647e2ae857d89e7!2zQ3JhLiA1NCAjIDEwNS0yMCwgU3ViYSwgQm9nb3TDoSwgRC5DLiwgQm9nb3RhLCBCb2dvdMOhLCBELkMuLCBDb2xvbWJpYQ!5e0!3m2!1sen!2sdo!4v1753368565906!5m2!1sen!2sdo"
                        style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                        class="h-full w-full"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>
