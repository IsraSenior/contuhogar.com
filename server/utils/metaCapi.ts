// server/utils/metaCapi.ts
import { createHash } from 'crypto'
import type { H3Event } from 'h3'
import { getRequestHeader, getCookie } from 'h3'
import { getClientIP } from './rateLimit'

interface CapiUserData {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
}

interface CapiEventOptions {
  event: H3Event
  eventName: string
  eventId?: string
  userData?: CapiUserData
  customData?: Record<string, any>
  eventSourceUrl?: string
}

/**
 * SHA-256 hash for PII (Meta requirement)
 */
function hashSha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

/**
 * Send event to Meta Conversions API (fire-and-forget)
 * Never blocks the response - errors are logged silently
 */
export function sendCapiEvent(options: CapiEventOptions): void {
  const config = useRuntimeConfig()
  const accessToken = config.META_CAPI_ACCESS_TOKEN as string | undefined
  const pixelId = config.public?.META_PIXEL_ID as string | undefined

  if (!accessToken || !pixelId) {
    if (process.dev) {
      console.log('[CAPI Stub]', options.eventName, options.customData)
    }
    return
  }

  const { event, eventName, eventId, userData, customData, eventSourceUrl } = options

  // Extract client info
  const clientIp = getClientIP(event)
  const userAgent = getRequestHeader(event, 'user-agent') || ''
  const fbc = getCookie(event, '_fbc') || undefined
  const fbp = getCookie(event, '_fbp') || undefined
  const referer = getRequestHeader(event, 'referer') || eventSourceUrl || ''

  // Build user_data with hashed PII
  const user_data: Record<string, any> = {
    client_ip_address: clientIp !== 'unknown' ? clientIp : undefined,
    client_user_agent: userAgent || undefined,
    fbc: fbc,
    fbp: fbp,
  }

  if (userData?.email) {
    user_data.em = [hashSha256(userData.email)]
  }
  if (userData?.phone) {
    // Remove spaces and special chars, keep + and digits
    const cleanPhone = userData.phone.replace(/[^\d+]/g, '')
    user_data.ph = [hashSha256(cleanPhone)]
  }
  if (userData?.firstName) {
    user_data.fn = [hashSha256(userData.firstName)]
  }
  if (userData?.lastName) {
    user_data.ln = [hashSha256(userData.lastName)]
  }

  // Build event payload
  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: referer,
        action_source: 'website',
        user_data,
        custom_data: customData,
      },
    ],
  }

  // Fire and forget - never block the response
  fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.error('[CAPI] Event send failed:', err?.message || err)
  })
}
