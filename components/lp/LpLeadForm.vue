<script setup lang="ts">
import dialPhoneOptions from '@/db/tlf-dial.json'
import { getPhoneFormat, getDialCodeFromCountry } from '@/utils/phoneFormats'
import { useGeoLocation } from '@/composables/useGeoLocation'

interface Props {
  title?: string
  subtitle?: string
  formId?: string
  simulatorSlug?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Habla con un asesor hoy',
  subtitle: 'Sin compromiso. Respuesta en menos de 24 horas.',
  formId: 'lead-form',
  simulatorSlug: ''
})
const route = useRoute()

const simulatorUrl = computed(() => {
  const base = '/simulador/credito'
  if (!props.simulatorSlug) return base
  const params = new URLSearchParams({
    utm_source: 'meta_ads',
    utm_medium: 'cpc',
    utm_campaign: 'lp',
    utm_content: props.simulatorSlug
  })
  return `${base}?${params.toString()}`
})

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

// Tracking
const { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError } = useTracking()
const { trackLead, createEventId } = useMetaPixel()
const { remainingAttemptsMessage, isNearLimit, recordAttempt, resetAttempts } = useRateLimit()

// Geo detection
const { detectCountry } = useGeoLocation()

// Phone dropdown
const phoneDropdown = ref({
  selected: {
    flag: '\u{1F1E8}\u{1F1F4}',
    code: '+57'
  },
  options: dialPhoneOptions,
})

// Phone placeholder
const phonePlaceholder = computed(() => {
  const format = getPhoneFormat(form.value.dial.code)
  return format ? format.placeholder : '3001234567'
})

// Form state
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dial: phoneDropdown.value.selected,
  message: '',
  source_page: route.fullPath,
  source_component: 'contact_form' as const,
  website: '', // honeypot original
  _formStartTime: 0,
})

const state = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const hasTrackedStart = ref(false)

// Inline validation
const emailError = ref('')
const phoneError = ref('')

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (form.value.email && !emailRegex.test(form.value.email)) {
    emailError.value = 'Ingresa un correo electrónico válido'
  } else {
    emailError.value = ''
  }
}

const validatePhone = () => {
  const phoneRegex = /^[\d\s\-\+\(\)]{5,25}$/
  if (form.value.phone && !phoneRegex.test(form.value.phone)) {
    phoneError.value = 'Ingresa un número de teléfono válido'
  } else {
    phoneError.value = ''
  }
}

// Format phone input
const formatPhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const cursorPosition = input.selectionStart || 0
  const oldValue = input.value
  const digitsOnly = oldValue.replace(/\D/g, '')
  const format = getPhoneFormat(form.value.dial.code)

  if (!format || !format.mask) {
    form.value.phone = digitsOnly
    return
  }

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
      if (formatted.length <= cursorPosition) {
        newCursorPosition++
      }
    }
  }

  form.value.phone = formatted
  nextTick(() => {
    input.setSelectionRange(newCursorPosition, newCursorPosition)
  })
}

// Track form interactions
const onFormInteraction = (fieldName: string = 'unknown', eventType: 'focus' | 'blur' | 'input' = 'focus') => {
  trackInteraction(fieldName, eventType)
  if (!hasTrackedStart.value) {
    trackFormStart('lp_lead_form', route.fullPath)
    hasTrackedStart.value = true
    form.value._formStartTime = Date.now()
  }
}

// Auto-detect country
onMounted(async () => {
  try {
    const detectedCountry = await detectCountry()
    if (detectedCountry) {
      const dialCode = getDialCodeFromCountry(detectedCountry)
      if (dialCode) {
        const countryOption = dialPhoneOptions.find(opt => opt.code === dialCode)
        if (countryOption) {
          form.value.dial = countryOption
          phoneDropdown.value.selected = countryOption
        }
      }
    }
  } catch (e) {
    console.warn('Country detection failed, using default:', e)
  }
})

// Submit handler
const onSubmit = async () => {
  // Block bots silently
  if (isBot.value) {
    console.warn('[AntiSpam] Bot detected, blocking LP form submission')
    state.value = 'success'
    return
  }

  if (!isLegitimateSession.value) {
    console.warn('[AntiSpam] Insufficient interaction on LP form')
  }

  state.value = 'loading'
  errorMsg.value = ''
  recordAttempt()

  trackFormSubmit('lp_lead_form', form.value.source_page, {
    has_message: !!form.value.message,
    phone_country: form.value.dial.code,
  })

  try {
    const antiSpamPayload = getAntiSpamPayload()
    const botDetectionPayload = getBotDetectionPayload()
    const metaEventId = createEventId()

    const res = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        ...form.value,
        ...antiSpamPayload,
        ...botDetectionPayload,
        _metaEventId: metaEventId,
      }
    })

    if ((res as any)?.ok) {
      state.value = 'success'
      trackFormSuccess('lp_lead_form', form.value.source_page, (res as any)?.id)
      trackLead({
        content_name: 'lp_lead_form',
        content_category: 'lead',
      }, metaEventId)

      // Reset form
      form.value.firstName = ''
      form.value.lastName = ''
      form.value.email = ''
      form.value.phone = ''
      form.value.message = ''
      hasTrackedStart.value = false
      resetAttempts()
      resetAntiSpam()
    } else {
      throw new Error('Respuesta invalida del servidor')
    }
  } catch (e: any) {
    state.value = 'error'
    if (e?.statusCode === 429) {
      const retryAfter = e?.data?.retryAfter
      const minutes = retryAfter ? Math.ceil(retryAfter / 60) : 5
      errorMsg.value = `Has alcanzado el limite de intentos. Espera ${minutes} minuto${minutes > 1 ? 's' : ''} antes de intentar de nuevo.`
    } else {
      errorMsg.value = e?.data?.message || e?.data?.statusMessage || e?.message || 'Error al enviar. Por favor, intentalo de nuevo.'
    }
    trackFormError('lp_lead_form', form.value.source_page, 'submit_failed', errorMsg.value)
  }
}
</script>

<template>
  <section :id="formId" class="bg-primary py-16 lg:py-20">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

        <!-- Columna izquierda: Copy motivacional -->
        <div class="lg:col-span-5 text-center lg:text-left">

          <!-- Eyebrow -->
          <p class="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Asesoría gratuita</p>

          <!-- Título -->
          <h2 class="text-3xl md:text-4xl font-bold text-white leading-tight">
            {{ title }}
          </h2>

          <!-- Separador naranja -->
          <div class="mt-5 mb-6 w-12 h-1 bg-secondary rounded-full mx-auto lg:mx-0" aria-hidden="true" />

          <!-- Subtitle -->
          <p class="text-white/60 leading-relaxed">
            {{ subtitle }}
          </p>

          <!-- Beneficios — cards compactos -->
          <div class="mt-8 space-y-3">
            <div class="flex items-center gap-4 bg-white/5 rounded-xl px-4 py-3">
              <span class="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div class="text-left">
                <p class="text-white font-semibold text-sm leading-tight">Sin costo</p>
                <p class="text-white/50 text-xs mt-0.5">Análisis de tu perfil crediticio gratis</p>
              </div>
            </div>

            <div class="flex items-center gap-4 bg-white/5 rounded-xl px-4 py-3">
              <span class="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div class="text-left">
                <p class="text-white font-semibold text-sm leading-tight">Respuesta en 24 h</p>
                <p class="text-white/50 text-xs mt-0.5">Un asesor te contacta en menos de un día</p>
              </div>
            </div>

            <div class="flex items-center gap-4 bg-white/5 rounded-xl px-4 py-3">
              <span class="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
              </span>
              <div class="text-left">
                <p class="text-white font-semibold text-sm leading-tight">100% remoto</p>
                <p class="text-white/50 text-xs mt-0.5">Desde Perú, sin necesidad de viajar</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna derecha: Formulario card blanco -->
        <div class="lg:col-span-7">
          <div class="bg-white rounded-2xl shadow-2xl shadow-black/20 p-6 sm:p-8 lg:p-10">

            <!-- Estado de exito -->
            <div v-if="state === 'success'" class="text-center py-8">
              <div class="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-5">
                <svg class="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-primary mb-2">¡Solicitud enviada!</h3>
              <p class="text-gray-600">Nuestro equipo te contactará en las próximas 24 horas.</p>

              <!-- Siguiente paso: simulador -->
              <div class="mt-8 pt-8 border-t border-gray-100">
                <p class="text-sm text-gray-500 mb-4">Mientras esperas, puedes:</p>
                <NuxtLink
                  :to="simulatorUrl"
                  class="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-secondary text-white rounded-xl font-bold text-lg hover:bg-secondary/90 transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 shadow-lg shadow-secondary/25"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Simular mi crédito ahora
                </NuxtLink>
                <p class="text-xs text-gray-400 mt-2">Descubre en 5 minutos cuánto puedes financiar</p>
              </div>
            </div>

            <!-- Formulario -->
            <form v-else @submit.prevent="onSubmit">
              <!-- Honeypot fields ocultos -->
              <input type="text" name="website" v-model="form.website" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <input :name="honeypotFieldName1" v-model="honeypot1Value" type="text" class="absolute -left-[9999px] opacity-0 h-0 w-0 pointer-events-none" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <input :name="honeypotFieldName2" v-model="honeypot2Value" type="url" class="absolute -left-[9999px] opacity-0 h-0 w-0 pointer-events-none" tabindex="-1" autocomplete="off" aria-hidden="true" />

              <!-- Aria-live para errores -->
              <div aria-live="polite" aria-atomic="true" class="sr-only">
                <template v-if="emailError">{{ emailError }}</template>
                <template v-if="phoneError">{{ phoneError }}</template>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <!-- Nombres -->
                <div>
                  <label for="lp-first-name" class="block text-sm font-semibold text-primary mb-1.5">Nombres</label>
                  <input
                    type="text"
                    id="lp-first-name"
                    name="first-name"
                    v-model="form.firstName"
                    autocomplete="given-name"
                    placeholder="Ej: Juan Carlos"
                    required
                    @focus="onFormInteraction('firstName', 'focus')"
                    @blur="onFormInteraction('firstName', 'blur')"
                    @input="onFormInteraction('firstName', 'input')"
                    class="block w-full rounded-lg bg-gray-50 px-4 py-3 text-base text-primary outline-1 -outline-offset-1 outline-gray-200 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary focus:bg-white transition-colors"
                  >
                </div>

                <!-- Apellidos -->
                <div>
                  <label for="lp-last-name" class="block text-sm font-semibold text-primary mb-1.5">
                    Apellidos
                    <span class="text-gray-400 font-normal text-xs">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="lp-last-name"
                    name="last-name"
                    v-model="form.lastName"
                    autocomplete="family-name"
                    placeholder="Ingresa tus apellidos"
                    @focus="onFormInteraction('lastName', 'focus')"
                    @blur="onFormInteraction('lastName', 'blur')"
                    @input="onFormInteraction('lastName', 'input')"
                    class="block w-full rounded-lg bg-gray-50 px-4 py-3 text-base text-primary outline-1 -outline-offset-1 outline-gray-200 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary focus:bg-white transition-colors"
                  >
                </div>

                <!-- Email -->
                <div class="sm:col-span-2">
                  <label for="lp-email" class="block text-sm font-semibold text-primary mb-1.5">Correo electrónico</label>
                  <input
                    type="email"
                    id="lp-email"
                    name="email"
                    v-model="form.email"
                    autocomplete="email"
                    placeholder="tu.email@ejemplo.com"
                    required
                    @focus="onFormInteraction('email', 'focus')"
                    @blur="() => { validateEmail(); onFormInteraction('email', 'blur') }"
                    @input="onFormInteraction('email', 'input')"
                    class="block w-full rounded-lg bg-gray-50 px-4 py-3 text-base text-primary outline-1 -outline-offset-1 outline-gray-200 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary focus:bg-white transition-colors"
                    :class="{ 'outline-red-600 outline-2': emailError }"
                    :aria-invalid="!!emailError"
                    :aria-describedby="emailError ? 'lp-email-error' : undefined"
                  >
                  <p v-if="emailError" id="lp-email-error" class="mt-1 text-sm text-red-600" role="alert">{{ emailError }}</p>
                </div>

                <!-- Telefono -->
                <div class="sm:col-span-2">
                  <label for="lp-phone" class="block text-sm font-semibold text-primary mb-1.5">Telefono</label>
                  <div class="grid grid-cols-3 gap-3">
                    <div class="col-span-1">
                      <PhoneCountryCombobox
                        v-model="form.dial"
                        :options="phoneDropdown.options"
                      />
                    </div>
                    <div class="col-span-2">
                      <input
                        type="tel"
                        id="lp-phone"
                        name="phone"
                        v-model="form.phone"
                        autocomplete="tel"
                        :placeholder="`Ej: ${phonePlaceholder}`"
                        required
                        @focus="onFormInteraction('phone', 'focus')"
                        @blur="() => { validatePhone(); onFormInteraction('phone', 'blur') }"
                        @input="(e) => { formatPhoneInput(e); onFormInteraction('phone', 'input') }"
                        class="block w-full rounded-lg bg-gray-50 px-4 py-3 text-base text-primary outline-1 -outline-offset-1 outline-gray-200 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary focus:bg-white transition-colors"
                        :class="{ 'outline-red-600 outline-2': phoneError }"
                        :aria-invalid="!!phoneError"
                        :aria-describedby="phoneError ? 'lp-phone-error' : 'lp-phone-format'"
                      >
                      <p v-if="phoneError" id="lp-phone-error" class="mt-1 text-sm text-red-600" role="alert">{{ phoneError }}</p>
                      <p v-if="getPhoneFormat(form.dial.code)" id="lp-phone-format" class="mt-1 text-xs text-gray-500 font-mono">
                        Formato: {{ getPhoneFormat(form.dial.code)?.format }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Mensaje opcional -->
                <div class="sm:col-span-2">
                  <label for="lp-message" class="block text-sm font-semibold text-primary mb-1.5">
                    Mensaje
                    <span class="text-gray-400 font-normal text-xs">(opcional)</span>
                  </label>
                  <textarea
                    id="lp-message"
                    name="message"
                    v-model="form.message"
                    rows="3"
                    maxlength="500"
                    placeholder="Cuéntanos brevemente tu situación..."
                    @focus="onFormInteraction('message', 'focus')"
                    @blur="onFormInteraction('message', 'blur')"
                    @input="onFormInteraction('message', 'input')"
                    class="block w-full rounded-lg bg-gray-50 px-4 py-3 text-base text-primary outline-1 -outline-offset-1 outline-gray-200 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary focus:bg-white transition-colors resize-none"
                  />
                </div>

                <!-- Rate limit warning -->
                <div v-if="remainingAttemptsMessage && isNearLimit" class="sm:col-span-2">
                  <div class="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p class="text-orange-700 text-sm font-medium">{{ remainingAttemptsMessage }}</p>
                  </div>
                </div>
              </div>

              <!-- Submit button -->
              <div class="mt-6">
                <button
                  type="submit"
                  class="w-full px-8 py-4 bg-secondary text-white rounded-xl font-bold text-lg hover:bg-secondary/90 transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 shadow-lg shadow-secondary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="state === 'loading'"
                >
                  <span v-if="state === 'loading'" class="inline-flex items-center gap-2">
                    <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando...
                  </span>
                  <span v-else>Solicitar asesoría gratuita</span>
                </button>
              </div>

              <!-- Seguridad -->
              <p class="mt-3 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                Tus datos están seguros y protegidos
              </p>

              <!-- Error state -->
              <div v-if="state === 'error'" class="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200" role="alert">
                {{ errorMsg }}
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>
