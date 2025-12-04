import type { H3Event } from 'h3'

interface TurnstileResponse {
  success: boolean
  'error-codes'?: string[]
  challenge_ts?: string
  hostname?: string
}

/**
 * Verifica el token de Cloudflare Turnstile en el servidor
 * @param token - Token generado por el widget Turnstile en el cliente
 * @param event - Evento H3 para obtener IP del cliente
 * @returns true si el token es válido, false si no lo es
 */
export async function verifyTurnstileToken(token: string, event: H3Event): Promise<boolean> {
  if (!token) {
    console.warn('[Turnstile] Token vacío recibido')
    return false
  }

  const config = useRuntimeConfig()
  const secretKey = config.turnstile?.secretKey

  if (!secretKey) {
    console.error('[Turnstile] TURNSTILE_SECRET_KEY no configurada')
    // En desarrollo, permitir pasar si no hay secretKey configurada
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Turnstile] Modo desarrollo: permitiendo sin verificación')
      return true
    }
    return false
  }

  // Obtener IP del cliente
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'

  try {
    const response = await $fetch<TurnstileResponse>(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
          remoteip: ip,
        }).toString(),
      }
    )

    if (!response.success) {
      console.warn('[Turnstile] Verificación fallida:', response['error-codes'])
    }

    return response.success === true
  } catch (error) {
    console.error('[Turnstile] Error al verificar token:', error)
    return false
  }
}
