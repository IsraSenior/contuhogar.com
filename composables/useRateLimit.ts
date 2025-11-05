// composables/useRateLimit.ts
import { ref, computed } from 'vue'

const RATE_LIMIT_MAX = 5 // Debe coincidir con el servidor
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000 // 5 minutos en milisegundos

// Estado global compartido entre instancias del composable
const globalAttempts = ref<Array<{ timestamp: number }>>([])
const globalResetTime = ref<number | null>(null)

/**
 * Composable para rastrear información de rate limiting del lado del cliente
 * Rastrea intentos fallidos para mostrar advertencias proactivas
 */
export const useRateLimit = () => {
  /**
   * Limpia intentos antiguos fuera de la ventana de tiempo
   */
  const cleanOldAttempts = () => {
    const now = Date.now()
    globalAttempts.value = globalAttempts.value.filter(
      attempt => now - attempt.timestamp < RATE_LIMIT_WINDOW_MS
    )

    // Si no hay intentos, resetear el tiempo
    if (globalAttempts.value.length === 0) {
      globalResetTime.value = null
    }
  }

  /**
   * Registra un intento de envío de formulario
   */
  const recordAttempt = () => {
    const now = Date.now()
    cleanOldAttempts()

    globalAttempts.value.push({ timestamp: now })

    // Establecer tiempo de reset si es el primer intento
    if (globalAttempts.value.length === 1) {
      globalResetTime.value = now + RATE_LIMIT_WINDOW_MS
    }
  }

  /**
   * Resetea el contador de intentos (útil después de éxito)
   */
  const resetAttempts = () => {
    globalAttempts.value = []
    globalResetTime.value = null
  }

  /**
   * Número de intentos restantes
   */
  const remaining = computed(() => {
    cleanOldAttempts()
    return Math.max(0, RATE_LIMIT_MAX - globalAttempts.value.length)
  })

  /**
   * Mensaje informativo sobre intentos restantes
   */
  const remainingAttemptsMessage = computed(() => {
    const rem = remaining.value

    if (rem === 0) {
      return 'Has alcanzado el límite de intentos'
    }

    if (rem === 1) {
      return 'Te queda 1 intento'
    }

    if (rem === 2) {
      return 'Te quedan 2 intentos'
    }

    return null // No mostrar mensaje si tiene 3+ intentos
  })

  /**
   * Indica si el usuario está cerca del límite (<=2 intentos)
   */
  const isNearLimit = computed(() => {
    return remaining.value <= 2 && remaining.value > 0
  })

  /**
   * Indica si el usuario alcanzó el límite
   */
  const isAtLimit = computed(() => {
    return remaining.value === 0
  })

  return {
    remaining,
    remainingAttemptsMessage,
    isNearLimit,
    isAtLimit,
    recordAttempt,
    resetAttempts
  }
}
