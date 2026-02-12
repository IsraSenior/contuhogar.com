<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Props
interface Props {
  variant?: 'inline' | 'stacked'
  showTitle?: boolean
  buttonText?: string
  titleText?: string
  subtitleText?: string
  dark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'stacked',
  showTitle: true,
  buttonText: 'Suscribirme',
  titleText: 'Recibe tips de financiamiento',
  subtitleText: 'Consejos exclusivos para comprar tu vivienda en Colombia.',
  dark: false
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

// Meta Pixel tracking
const { trackSubscribe, createEventId } = useMetaPixel()

// Route for source tracking
const route = useRoute()

// Form state
const email = ref('')
const state = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const successMsg = ref('')
const formStartTime = ref(0)
const hasTrackedStart = ref(false)

// Email validation
const emailError = ref('')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isEmailValid = computed(() => {
  return email.value && emailRegex.test(email.value)
})

// Validate email on blur
const validateEmail = () => {
  if (email.value && !emailRegex.test(email.value)) {
    emailError.value = 'Por favor ingresa un correo valido'
  } else {
    emailError.value = ''
  }
}

// Track form interaction
const onFormInteraction = (fieldName: string = 'email', eventType: 'focus' | 'blur' | 'input' = 'focus') => {
  trackInteraction(fieldName, eventType)

  if (!hasTrackedStart.value) {
    hasTrackedStart.value = true
    formStartTime.value = Date.now()
  }
}

// Get UTM parameters from URL
const getUtmParams = () => {
  if (!import.meta.client) return {}

  const searchParams = new URLSearchParams(window.location.search)
  return {
    utm_source: searchParams.get('utm_source') || null,
    utm_medium: searchParams.get('utm_medium') || null,
    utm_campaign: searchParams.get('utm_campaign') || null,
  }
}

// Get locale
const getLocale = () => {
  if (!import.meta.client) return null
  return navigator.language || null
}

// Submit handler
const onSubmit = async () => {
  // Validate email first
  if (!isEmailValid.value) {
    emailError.value = 'Por favor ingresa un correo valido'
    return
  }

  // Block bots detected by BotD
  if (isBot.value) {
    console.warn('[Newsletter] Bot detected, blocking submission')
    // Silently fail for bots
    state.value = 'success'
    successMsg.value = 'Gracias por suscribirte.'
    return
  }

  // Check for insufficient interaction (potential bot)
  if (!isLegitimateSession.value) {
    console.warn('[Newsletter] Insufficient interaction detected')
    // Don't block, but log - server will validate
  }

  state.value = 'loading'
  errorMsg.value = ''

  try {
    const antiSpamPayload = getAntiSpamPayload()
    const botDetectionPayload = getBotDetectionPayload()
    const utmParams = getUtmParams()

    // Generate Meta event ID for deduplication
    const metaEventId = createEventId()

    const res = await $fetch('/api/newsletter/subscribe', {
      method: 'POST',
      body: {
        email: email.value,
        source_page: route.fullPath,
        locale: getLocale(),
        ...utmParams,
        ...antiSpamPayload,
        ...botDetectionPayload,
        _formStartTime: formStartTime.value,
        _metaEventId: metaEventId,
      }
    })

    if ((res as any)?.ok) {
      state.value = 'success'

      // Meta Pixel: Track Subscribe event (deduplicated with CAPI)
      if (!(res as any)?.alreadySubscribed) {
        trackSubscribe({ content_name: 'newsletter' }, metaEventId)
      }

      // Customize success message based on response
      if ((res as any)?.alreadySubscribed) {
        successMsg.value = 'Ya estas suscrito a nuestro boletin.'
      } else if ((res as any)?.resubscribed) {
        successMsg.value = 'Te has vuelto a suscribir exitosamente.'
      } else {
        successMsg.value = (res as any)?.message || 'Te has suscrito exitosamente.'
      }

      // Clear form
      email.value = ''
      hasTrackedStart.value = false
      resetAntiSpam()
    } else {
      throw new Error('Respuesta invalida del servidor')
    }
  } catch (e: any) {
    state.value = 'error'

    // Handle rate limiting (429)
    if (e?.statusCode === 429) {
      const retryAfter = e?.data?.retryAfter
      const minutes = retryAfter ? Math.ceil(retryAfter / 60) : 5
      errorMsg.value = `Has alcanzado el limite de intentos. Espera ${minutes} minuto${minutes > 1 ? 's' : ''}.`
    } else {
      errorMsg.value = e?.data?.message || e?.data?.statusMessage || e?.message || 'Error al suscribirse'
    }
  }
}

// Initialize form start time on mount
onMounted(() => {
  formStartTime.value = Date.now()
})
</script>

<template>
  <div class="newsletter-form" :class="[`variant-${variant}`, { 'theme-dark': dark }]">
    <!-- Title section (optional) -->
    <div v-if="showTitle && state !== 'success'" class="mb-4">
      <h3 :class="['text-lg font-semibold', dark ? 'text-white' : 'text-primary']">
        {{ titleText }}
      </h3>
      <p v-if="subtitleText" :class="['text-sm mt-1', dark ? 'text-gray-400' : 'text-gray-600']">
        {{ subtitleText }}
      </p>
    </div>

    <!-- Success state -->
    <div v-if="state === 'success'" :class="['p-4 rounded-lg', dark ? 'bg-green-900/30 border border-green-700/50' : 'bg-green-50 border border-green-200']">
      <div class="flex items-center gap-2">
        <svg :class="['w-5 h-5 shrink-0', dark ? 'text-white' : 'text-green-600']" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p :class="['text-sm font-medium', dark ? 'text-white' : 'text-green-700']">{{ successMsg }}</p>
      </div>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="onSubmit">
      <!-- Honeypot fields (hidden) -->
      <input
        type="text"
        name="website"
        class="hidden"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />
      <input
        :name="honeypotFieldName1"
        v-model="honeypot1Value"
        type="text"
        class="absolute -left-[9999px] opacity-0 h-0 w-0 pointer-events-none"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />
      <input
        :name="honeypotFieldName2"
        v-model="honeypot2Value"
        type="url"
        class="absolute -left-[9999px] opacity-0 h-0 w-0 pointer-events-none"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />

      <!-- Inline variant -->
      <div v-if="variant === 'inline'" class="flex gap-2">
        <div class="flex-1">
          <label for="newsletter-email-inline" class="sr-only">Correo electronico</label>
          <input
            id="newsletter-email-inline"
            name="newsletter-email-inline"
            type="email"
            v-model="email"
            placeholder="tu.email@ejemplo.com"
            autocomplete="email"
            @focus="onFormInteraction('email', 'focus')"
            @blur="() => { validateEmail(); onFormInteraction('email', 'blur') }"
            @input="onFormInteraction('email', 'input')"
            :class="[
              'block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2',
              dark
                ? 'bg-white/10 border border-white/10 text-white placeholder:text-gray-500 outline-white/20 focus:outline-primary'
                : 'bg-white text-primary placeholder:text-gray-400 outline-gray-300 focus:outline-primary',
              emailError ? 'outline-red-500 outline-2' : ''
            ]"
            required
          />
        </div>
        <button
          type="submit"
          :class="[
            'shrink-0 px-4 py-2 rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
            dark
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'btn primary'
          ]"
          :disabled="state === 'loading'"
        >
          <span v-if="state === 'loading'">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          <span v-else>{{ buttonText }}</span>
        </button>
      </div>

      <!-- Stacked variant -->
      <div v-else class="space-y-3">
        <div>
          <label for="newsletter-email-stacked" class="sr-only">Correo electronico</label>
          <input
            id="newsletter-email-stacked"
            name="newsletter-email-stacked"
            type="email"
            v-model="email"
            placeholder="tu.email@ejemplo.com"
            autocomplete="email"
            @focus="onFormInteraction('email', 'focus')"
            @blur="() => { validateEmail(); onFormInteraction('email', 'blur') }"
            @input="onFormInteraction('email', 'input')"
            class="block w-full rounded-md bg-white px-3.5 py-2.5 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
            :class="{ 'outline-red-500 outline-2': emailError }"
            required
          />
          <p v-if="emailError" class="mt-1 text-sm text-red-600">{{ emailError }}</p>
        </div>
        <button
          type="submit"
          class="btn primary w-full"
          :disabled="state === 'loading'"
        >
          <span v-if="state === 'loading'" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Procesando...</span>
          </span>
          <span v-else>{{ buttonText }}</span>
        </button>
      </div>

      <!-- Error message -->
      <p v-if="state === 'error'" :class="['mt-3 p-3 rounded-lg border text-sm', dark ? 'bg-red-900/30 text-red-300 border-red-700/50' : 'bg-red-50 text-red-700 border-red-200']">
        {{ errorMsg }}
      </p>

      <!-- Privacy note -->
      <p :class="['mt-3 text-xs flex items-center gap-1', dark ? 'text-gray-500' : 'text-gray-500']">
        <svg :class="['w-3.5 h-3.5', dark ? 'text-gray-600' : 'text-gray-400']" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
        </svg>
        No spam. Puedes cancelar cuando quieras.
      </p>
    </form>
  </div>
</template>
