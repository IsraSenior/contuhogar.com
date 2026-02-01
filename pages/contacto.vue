<script setup lang="ts">
import { ref, computed } from 'vue'
const route = useRoute();
const { isLoading } = useLoading(150)
import dialPhoneOptions from "@/db/tlf-dial.json";
import { useMainStore } from '@/stores/index'
import { getPhoneFormat, getDialCodeFromCountry } from '@/utils/phoneFormats'
import { useGeoLocation } from '@/composables/useGeoLocation'
import { formatCurrency } from '~/utils/formatters'

const store = useMainStore()

// Anti-spam protection
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

// Datos pre-llenados desde el store (simulador o servicio)
const prefillData = ref(store.contactPrefill)

// Verificar si viene del simulador
const isFromSimulador = computed(() => prefillData.value?.source === 'simulador')

// Verificar si viene de un servicio
const isFromServicio = computed(() => prefillData.value?.source === 'servicio')

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

// Auto-detectar país al montar
onMounted(async () => {
    // Verificar si hay datos pre-llenados desde el store
    if (prefillData.value) {
        const data = prefillData.value

        // Pre-llenar campos del formulario si vienen del simulador
        if (data.source === 'simulador') {
            if (data.nombres) form.value.firstName = data.nombres
            if (data.apellidos) form.value.lastName = data.apellidos
            if (data.email) form.value.email = data.email
            if (data.telefono) form.value.phone = data.telefono

            // Si viene con código de teléfono, buscar el país correspondiente
            if (data.telefonoCodigo) {
                const countryOption = dialPhoneOptions.find(opt => opt.code === data.telefonoCodigo)
                if (countryOption) {
                    form.value.dial = countryOption
                    phoneDropdown.value.selected = countryOption
                }
            }

            // Guardar datos del simulador en campo oculto
            if (data.simulador) {
                form.value.simuladorInfo = JSON.stringify(data.simulador)

                // Set deduplication flags to skip duplicate Telegram notification
                if (data.skipTelegramNotification) {
                    form.value._skipTelegramFromSimulator = true
                }
                if (data.simuladorSessionId) {
                    form.value._simuladorSessionId = data.simuladorSessionId
                }

                // Generar mensaje automático con resumen del simulador
                const sim = data.simulador
                const tipoCredito = sim.tipoCredito === 'hipotecario' ? 'Crédito Hipotecario' : 'Leasing Habitacional'
                const resultadoText = sim.resultado === 'aprobado' ? 'Preaprobado ✅' :
                                      sim.resultado === 'rechazado' ? 'No cumple requisitos ❌' :
                                      'Ajuste necesario ⚠️'

                form.value.message = `Vengo del simulador de crédito.

📋 Resumen de mi simulación:
• Tipo: ${tipoCredito}
• Valor inmueble: ${formatCurrency(sim.valorBien || 0)}
• Monto solicitado: ${formatCurrency(sim.montoSolicitado || 0)}
• Plazo: ${sim.plazoMeses || 0} meses (${Math.floor((sim.plazoMeses || 0) / 12)} años)
• Resultado: ${resultadoText}
${sim.cuotaMensual ? `• Cuota estimada: ${formatCurrency(sim.cuotaMensual)}` : ''}

Me gustaría continuar con el proceso y recibir asesoría personalizada.`
            }
        }

        // Pre-llenar mensaje si viene de un servicio
        if (data.source === 'servicio' && data.servicioNombre) {
            form.value.message = `Me interesa el servicio: ${data.servicioNombre}

Me gustaría recibir más información y asesoría personalizada.`
        }

        // Marcar como interacción iniciada
        hasTrackedStart.value = true
        form.value._formStartTime = Date.now()

        // Limpiar los datos del store después de usarlos
        store.clearContactPrefill()

        // No hacer detección de país si ya viene con código
        if (data.telefonoCodigo) return
    }

    // Auto-detectar país del usuario (solo si no viene con datos pre-llenados)
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
    _formStartTime: 0, // timestamp para validación anti-bot
    simuladorInfo: '', // campo oculto con datos del simulador (JSON)
    _skipTelegramFromSimulator: false, // flag to skip Telegram if coming from simulator
    _simuladorSessionId: '' // simulator session ID for deduplication
})

const state = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const hasTrackedStart = ref(false)

// Validación inline
const emailError = ref('')
const phoneError = ref('')

// Verificar progreso del formulario (para tracking)
const checkFormProgress = () => {
    // Tracking de progreso del formulario si es necesario
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
const onFormInteraction = (fieldName: string = 'unknown', eventType: 'focus' | 'blur' | 'input' = 'focus') => {
    // Track anti-spam interaction
    trackInteraction(fieldName, eventType)

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

    // Registrar intento para rate limiting
    recordAttempt()

    // Track form submit
    trackFormSubmit('contact_form', form.value.source_page, {
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

            // Reset tracking, rate limit counter y anti-spam
            hasTrackedStart.value = false
            resetAttempts() // Reset rate limit counter on success
            resetAntiSpam() // Reset anti-spam state
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
        trackFormError('contact_form', form.value.source_page, 'submit_failed', errorMsg.value)
    }
}
</script>

<template>
    <div>
    <div class="relative bg-muted min-h-screen">
        <div class="mx-auto container px-6 lg:px-8 py-16">
            <!-- Skeleton State -->
            <template v-if="isLoading">
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <!-- Left Column Skeleton -->
                <div class="col-span-7 space-y-6">
                  <!-- Badge -->
                  <div class="skeleton-shimmer h-10 w-72 rounded-lg" />
                  <!-- Title -->
                  <div class="space-y-3">
                    <div class="skeleton-shimmer h-12 sm:h-14 lg:h-16 w-full rounded-lg" />
                    <div class="skeleton-shimmer h-12 sm:h-14 lg:h-16 w-4/5 rounded-lg" />
                  </div>
                  <!-- Subtitle -->
                  <div class="space-y-2 mt-6">
                    <div class="skeleton-shimmer h-5 w-full rounded" />
                    <div class="skeleton-shimmer h-5 w-5/6 rounded" />
                  </div>
                  <!-- Benefits list -->
                  <div class="space-y-3 mt-6">
                    <div v-for="i in 3" :key="i" class="flex items-center gap-2">
                      <div class="skeleton-shimmer w-5 h-5 rounded-full shrink-0" />
                      <div class="skeleton-shimmer h-4 flex-1 rounded" :style="{ maxWidth: `${70 + (i % 3) * 10}%` }" />
                    </div>
                  </div>
                  <!-- Bank logos -->
                  <div class="mt-8 pt-6 border-t border-gray-200">
                    <div class="skeleton-shimmer h-4 w-56 rounded mb-3" />
                    <div class="flex flex-wrap items-center gap-8">
                      <div v-for="i in 4" :key="i" class="skeleton-shimmer h-6 w-20 rounded" />
                    </div>
                  </div>
                </div>

                <!-- Right Column Skeleton (Form) -->
                <div class="col-span-5 bg-white rounded-2xl shadow-xl shadow-primary/5 p-8 lg:p-10">
                  <div class="space-y-6">
                    <!-- Form fields -->
                    <div class="grid grid-cols-2 gap-6">
                      <div class="space-y-2">
                        <div class="skeleton-shimmer h-4 w-16 rounded" />
                        <div class="skeleton-shimmer h-11 w-full rounded-md" />
                      </div>
                      <div class="space-y-2">
                        <div class="skeleton-shimmer h-4 w-20 rounded" />
                        <div class="skeleton-shimmer h-11 w-full rounded-md" />
                      </div>
                    </div>
                    <div class="space-y-2">
                      <div class="skeleton-shimmer h-4 w-32 rounded" />
                      <div class="skeleton-shimmer h-11 w-full rounded-md" />
                    </div>
                    <div class="space-y-2">
                      <div class="skeleton-shimmer h-4 w-20 rounded" />
                      <div class="grid grid-cols-3 gap-3">
                        <div class="skeleton-shimmer h-11 rounded-md" />
                        <div class="col-span-2 skeleton-shimmer h-11 rounded-md" />
                      </div>
                    </div>
                    <div class="space-y-2">
                      <div class="skeleton-shimmer h-4 w-20 rounded" />
                      <div class="skeleton-shimmer h-28 w-full rounded-md" />
                    </div>
                    <!-- Submit button -->
                    <div class="mt-10 pt-8 border-t border-gray-100">
                      <div class="skeleton-shimmer h-12 w-48 rounded-md" />
                      <div class="skeleton-shimmer h-4 w-56 rounded mt-3" />
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- Real Content -->
            <template v-else>
            <!-- Grid de dos columnas -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                <!-- COLUMNA IZQUIERDA: Información y contenido de valor -->
                <div class="col-span-7">
                    <!-- Badge de respuesta rápida -->
                    <div class="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg text-sm font-medium mb-6 border border-white/20">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Recibe tu preaprobación en 24 horas
                    </div>

                    <h1 class="text-4xl font-bold tracking-tight text-pretty text-primary sm:text-5xl lg:text-6xl max-w-2xl">
                        Recibe tu preaprobación en 24 horas
                    </h1>

                    <p class="mt-6 text-lg text-gray-600 leading-relaxed">
                        Completa el formulario y nuestro equipo de expertos analizará tu perfil para brindarte la mejor opción de financiamiento.
                    </p>

                    <ul class="mt-6 space-y-3 text-base text-gray-600">
                        <li class="flex items-start gap-2">
                            <svg class="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <span>Análisis de tu perfil sin costo inicial ni compromiso.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg class="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <span>Comparativa de tasas de interés personalizadas.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg class="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <span>Acompañamiento de expertos de inicio a fin.</span>
                        </li>
                    </ul>

                    <!-- Bancos Aliados -->
                    <div class="mt-8 pt-6 border-t border-gray-200">
                        <p class="text-sm text-gray-500 mb-3 font-medium">Trabajamos con los principales bancos:</p>
                            <div class="flex flex-wrap items-center gap-8 opacity-60">
                                <template v-for="(logo, idx) in store.bankLogos" :key="idx">
                                    <span
                                        v-if="logo.type === 'text'"
                                        class="text-sm font-bold text-gray-500"
                                    >
                                        {{ logo.value }}
                                    </span>
                                    <NuxtImg
                                        v-else
                                        :src="logo.value"
                                        :alt="logo.name"
                                        class="h-6 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                                        loading="lazy"
                                    />
                                </template>
                            </div>
                    </div>
                </div>

                <!-- COLUMNA DERECHA: Formulario -->
                <div class="col-span-5 bg-white rounded-2xl shadow-xl shadow-primary/5 p-8 lg:p-10">
                    <!-- Banner indicando que viene del simulador -->
                    <div v-if="isFromSimulador" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <div>
                                <p class="text-green-800 font-semibold">¡Datos pre-cargados del simulador!</p>
                                <p class="text-green-700 text-sm mt-1">Hemos llenado el formulario con tu información. Revisa los datos y envía tu solicitud.</p>
                            </div>
                        </div>
                    </div>

                    <form @submit.prevent="onSubmit">
                        <!-- Región aria-live para anuncios de errores a screen readers -->
                        <div
                            aria-live="polite"
                            aria-atomic="true"
                            class="sr-only"
                        >
                            <template v-if="emailError">{{ emailError }}</template>
                            <template v-if="phoneError">{{ phoneError }}</template>
                        </div>

                        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <!-- Honeypot campos ocultos (anti-bot) - nombres dinámicos -->
                            <!-- Original honeypot for backwards compatibility -->
                            <input type="text" name="website" v-model="form.website" class="hidden" tabindex="-1"
                                autocomplete="off" aria-hidden="true" />
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
                            <!-- Campo oculto con datos del simulador -->
                            <input type="hidden" name="simuladorInfo" v-model="form.simuladorInfo" />
                            <div>
                                <label for="first-name"
                                    class="block text-sm/6 font-semibold text-primary">Nombres</label>
                                <div class="mt-2.5">
                                    <input type="text" name="first-name" id="first-name" v-model="form.firstName"
                                        autocomplete="given-name"
                                        placeholder="Ej: Juan Carlos"
                                        @focus="onFormInteraction('firstName', 'focus')"
                                        @blur="onFormInteraction('firstName', 'blur')"
                                        @input="() => { onFormInteraction('firstName', 'input'); checkFormProgress() }"
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
                                        @focus="onFormInteraction('lastName', 'focus')"
                                        @blur="onFormInteraction('lastName', 'blur')"
                                        @input="onFormInteraction('lastName', 'input')"
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
                                        @focus="onFormInteraction('email', 'focus')"
                                        @blur="() => { validateEmail(); onFormInteraction('email', 'blur') }"
                                        @input="() => { onFormInteraction('email', 'input'); checkFormProgress() }"
                                        class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                        :class="{ 'outline-red-500 outline-2': emailError }"
                                        :aria-invalid="!!emailError"
                                        :aria-describedby="emailError ? 'email-error' : undefined"
                                        required>
                                </div>
                                <p v-if="emailError" id="email-error" class="mt-1 text-sm text-red-600" role="alert">{{ emailError }}</p>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="phone" class="block text-sm/6 font-semibold text-primary mb-2.5">Teléfono</label>
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
                                            @focus="onFormInteraction('phone', 'focus')"
                                            @blur="() => { validatePhone(); onFormInteraction('phone', 'blur') }"
                                            @input="(e) => { formatPhoneInput(e); onFormInteraction('phone', 'input') }"
                                            :aria-describedby="phoneError ? 'phone-error phone-format' : 'phone-format'"
                                            class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                            :class="{ 'outline-red-500 outline-2': phoneError }"
                                            :aria-invalid="!!phoneError"
                                            required>
                                        <p v-if="phoneError" id="phone-error" class="mt-1 text-sm text-red-600" role="alert">{{ phoneError }}</p>
                                        <!-- Hint del formato -->
                                        <p v-if="getPhoneFormat(form.dial.code)" id="phone-format" class="mt-1 text-xs text-gray-500 font-mono">
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
                                        placeholder="Cuéntanos, cómo podemos ayudarte..."
                                        aria-describedby="message-description"
                                        @focus="onFormInteraction('message', 'focus')"
                                        @blur="onFormInteraction('message', 'blur')"
                                        @input="onFormInteraction('message', 'input')"
                                        class="block w-full rounded-md bg-white px-3.5 py-2 pb-8 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"></textarea>
                                    <div class="absolute bottom-2 right-3 text-xs"
                                         :class="form.message.length > 500 ? 'text-red-600 font-semibold' : form.message.length > 450 ? 'text-orange-600' : 'text-gray-400'">
                                        {{ form.message.length }}/500
                                    </div>
                                </div>
                            </div>

                            <!-- Rate limit warning -->
                            <div class="sm:col-span-2">
                                <div v-if="remainingAttemptsMessage && isNearLimit" class="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                    <p class="text-orange-700 text-sm font-medium">{{ remainingAttemptsMessage }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-10 border-t border-primary/10 pt-8">
                            <button type="submit" class="btn primary w-full sm:w-auto" :disabled="state === 'loading'">
                                <span v-if="state === 'loading'">Procesando solicitud…</span>
                                <span v-else>Obtener asesoría gratuita</span>
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
            </template>
        </div>
    </div>

    <!-- Sección de información de contacto y mapa -->
    <div class="bg-white py-12 sm:py-20">
        <div class="mx-auto container px-6 lg:px-8">
            <!-- Skeleton State -->
            <template v-if="isLoading">
              <!-- Header skeleton -->
              <div class="mb-12">
                <div class="skeleton-shimmer h-10 w-80 rounded-lg mb-2" />
                <div class="skeleton-shimmer h-5 w-64 rounded" />
              </div>
              <!-- Contact info cards skeleton -->
              <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                <div v-for="i in 4" :key="i" class="rounded-xl bg-gray-100 p-6">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="skeleton-shimmer w-10 h-10 rounded-full" />
                    <div class="skeleton-shimmer h-5 w-24 rounded" />
                  </div>
                  <div class="space-y-2">
                    <div class="skeleton-shimmer h-4 w-full rounded" />
                    <div class="skeleton-shimmer h-4 w-5/6 rounded" />
                    <div class="skeleton-shimmer h-4 w-4/5 rounded" />
                  </div>
                </div>
              </div>
              <!-- Map skeleton -->
              <div class="mt-8">
                <div class="skeleton-shimmer w-full h-80 rounded-2xl" />
              </div>
            </template>

            <!-- Real Content -->
            <template v-else>
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
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-primary">Correos</h3>
                    </div>
                    <dl class="space-y-2 text-sm text-gray-600">
                        <dd><a class="font-medium text-primary hover:text-secondary transition-colors break-all"
                                href="mailto:gerenciacomercial@contuhogar.com "
                                @click="onEmailClick('gerenciacomercial@contuhogar.com ')">gerenciacomercial@contuhogar.com </a></dd>
                        <dd><a class="font-medium text-primary hover:text-secondary transition-colors break-all"
                                href="mailto:gerencia@contuhogar.com"
                                @click="onEmailClick('gerencia@contuhogar.com')">gerencia@contuhogar.com</a></dd>
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
                        Puente Largo, Bogotá D.C.<br>
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
                        <dd><span class="font-medium text-gray-700">Lun - Vie:</span> 8:30 AM - 6:30 PM</dd>
                        <dd><span class="font-medium text-gray-700">Sáb y Dom:</span> Cerrado</dd>
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
            </template>
        </div>
    </div>
    </div>
</template>
