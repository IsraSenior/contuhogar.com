// composables/useMetaPixel.ts

/**
 * Generates a unique event ID for Meta Pixel/CAPI deduplication
 */
function generateEventId(): string {
  return `${Date.now()}.${Math.random().toString(36).substring(2, 10)}`
}

/**
 * Safe wrapper for fbq() - no-op in SSR or when pixel is not loaded
 */
function safeFbq(...args: any[]) {
  if (import.meta.client && typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args)
  }
}

export const useMetaPixel = () => {
  /**
   * Track a standard Meta event with optional eventID for deduplication
   */
  const trackEvent = (eventName: string, params: Record<string, any> = {}, eventId?: string): string => {
    const id = eventId || generateEventId()
    safeFbq('track', eventName, params, { eventID: id })
    return id
  }

  /**
   * Track a custom Meta event
   */
  const trackCustom = (eventName: string, params: Record<string, any> = {}, eventId?: string): string => {
    const id = eventId || generateEventId()
    safeFbq('trackCustom', eventName, params, { eventID: id })
    return id
  }

  // === Standard Events ===

  /** Lead event - contact form, WhatsApp widget */
  const trackLead = (params: Record<string, any> = {}, eventId?: string): string => {
    return trackEvent('Lead', params, eventId)
  }

  /** CompleteRegistration - simulator completed */
  const trackCompleteRegistration = (params: Record<string, any> = {}, eventId?: string): string => {
    return trackEvent('CompleteRegistration', params, eventId)
  }

  /** Subscribe - newsletter */
  const trackSubscribe = (params: Record<string, any> = {}, eventId?: string): string => {
    return trackEvent('Subscribe', params, eventId)
  }

  /** Contact - clicks on WhatsApp, phone, email */
  const trackContact = (params: Record<string, any> = {}): string => {
    return trackEvent('Contact', params)
  }

  /** ViewContent - service/blog pages */
  const trackViewContent = (params: Record<string, any> = {}): string => {
    return trackEvent('ViewContent', params)
  }

  /** InitiateCheckout - simulator start */
  const trackInitiateCheckout = (params: Record<string, any> = {}): string => {
    return trackEvent('InitiateCheckout', params)
  }

  // === Custom Events ===

  /** SimuladorStep - wizard progression */
  const trackSimuladorStep = (step: number, stepName: string): string => {
    return trackCustom('SimuladorStep', { step, step_name: stepName })
  }

  /** SimuladorStart - simulator initiated */
  const trackSimuladorStart = (): string => {
    return trackCustom('SimuladorStart')
  }

  /** DownloadPDF - pre-approval letter download */
  const trackDownloadPDF = (params: Record<string, any> = {}): string => {
    return trackCustom('DownloadPDF', params)
  }

  /** Generate event ID for deduplication (to pass to server) */
  const createEventId = (): string => {
    return generateEventId()
  }

  return {
    trackEvent,
    trackCustom,
    trackLead,
    trackCompleteRegistration,
    trackSubscribe,
    trackContact,
    trackViewContent,
    trackInitiateCheckout,
    trackSimuladorStep,
    trackSimuladorStart,
    trackDownloadPDF,
    createEventId,
  }
}
