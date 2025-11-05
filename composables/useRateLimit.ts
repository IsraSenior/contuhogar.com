// composables/useRateLimit.ts
import { ref, computed } from 'vue'

export interface RateLimitInfo {
  limit: number
  remaining: number
  resetTime: string | null
}

/**
 * Composable para rastrear información de rate limiting
 * Extrae headers de las respuestas HTTP para mostrar intentos restantes
 */
export const useRateLimit = () => {
  const rateLimitInfo = ref<RateLimitInfo>({
    limit: 5,
    remaining: 5,
    resetTime: null
  })

  /**
   * Extrae información de rate limiting de los headers de respuesta
   */
  const extractRateLimitFromResponse = (response: Response) => {
    const limit = response.headers.get('X-RateLimit-Limit')
    const remaining = response.headers.get('X-RateLimit-Remaining')
    const reset = response.headers.get('X-RateLimit-Reset')

    if (limit) rateLimitInfo.value.limit = parseInt(limit)
    if (remaining) rateLimitInfo.value.remaining = parseInt(remaining)
    if (reset) rateLimitInfo.value.resetTime = reset
  }

  /**
   * Mensaje informativo sobre intentos restantes
   */
  const remainingAttemptsMessage = computed(() => {
    const remaining = rateLimitInfo.value.remaining

    if (remaining === 0) {
      return 'Has alcanzado el límite de intentos'
    }

    if (remaining === 1) {
      return 'Te queda 1 intento'
    }

    if (remaining <= 2) {
      return `Te quedan ${remaining} intentos`
    }

    return null // No mostrar mensaje si tiene 3+ intentos
  })

  /**
   * Indica si el usuario está cerca del límite (<=2 intentos)
   */
  const isNearLimit = computed(() => {
    return rateLimitInfo.value.remaining <= 2
  })

  /**
   * Indica si el usuario alcanzó el límite
   */
  const isAtLimit = computed(() => {
    return rateLimitInfo.value.remaining === 0
  })

  return {
    rateLimitInfo,
    remainingAttemptsMessage,
    isNearLimit,
    isAtLimit,
    extractRateLimitFromResponse
  }
}
