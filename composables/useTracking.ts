// composables/useTracking.ts
/**
 * Composable para tracking de eventos con Google Tag Manager y Google Analytics 4
 */

interface DataLayerEvent {
  event: string;
  [key: string]: any;
}

/**
 * Push event to dataLayer (GTM/GA4)
 */
export const useTracking = () => {
  const pushEvent = (eventData: DataLayerEvent) => {
    if (process.client && typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventData);

      // Log en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log('[GTM Event]', eventData);
      }
    }
  };

  // Eventos de formularios
  const trackFormStart = (formName: string, formLocation: string) => {
    pushEvent({
      event: 'form_start',
      form_name: formName,
      form_location: formLocation,
      timestamp: new Date().toISOString(),
    });
  };

  const trackFormSubmit = (formName: string, formLocation: string, additionalData?: Record<string, any>) => {
    pushEvent({
      event: 'form_submit',
      form_name: formName,
      form_location: formLocation,
      timestamp: new Date().toISOString(),
      ...additionalData,
    });
  };

  const trackFormSuccess = (formName: string, formLocation: string, leadId?: string) => {
    pushEvent({
      event: 'form_success',
      form_name: formName,
      form_location: formLocation,
      lead_id: leadId,
      timestamp: new Date().toISOString(),
    });
  };

  const trackFormError = (formName: string, formLocation: string, errorType: string, errorMessage?: string) => {
    pushEvent({
      event: 'form_error',
      form_name: formName,
      form_location: formLocation,
      error_type: errorType,
      error_message: errorMessage,
      timestamp: new Date().toISOString(),
    });
  };

  // Eventos de conversión
  const trackConversion = (conversionType: string, value?: number, currency: string = 'COP') => {
    pushEvent({
      event: 'conversion',
      conversion_type: conversionType,
      value,
      currency,
      timestamp: new Date().toISOString(),
    });
  };

  // Eventos de engagement
  const trackServiceView = (serviceName: string, serviceSlug: string) => {
    pushEvent({
      event: 'view_service',
      service_name: serviceName,
      service_slug: serviceSlug,
      timestamp: new Date().toISOString(),
    });
  };

  const trackBlogView = (blogTitle: string, blogSlug: string) => {
    pushEvent({
      event: 'view_blog_post',
      blog_title: blogTitle,
      blog_slug: blogSlug,
      timestamp: new Date().toISOString(),
    });
  };

  const trackWhatsAppClick = (source: string) => {
    pushEvent({
      event: 'whatsapp_click',
      click_source: source,
      timestamp: new Date().toISOString(),
    });
  };

  const trackPhoneClick = (phoneNumber: string, source: string) => {
    pushEvent({
      event: 'phone_click',
      phone_number: phoneNumber,
      click_source: source,
      timestamp: new Date().toISOString(),
    });
  };

  const trackEmailClick = (emailAddress: string, source: string) => {
    pushEvent({
      event: 'email_click',
      email_address: emailAddress,
      click_source: source,
      timestamp: new Date().toISOString(),
    });
  };

  // Eventos de navegación
  const trackCTAClick = (ctaText: string, ctaLocation: string, ctaDestination: string) => {
    pushEvent({
      event: 'cta_click',
      cta_text: ctaText,
      cta_location: ctaLocation,
      cta_destination: ctaDestination,
      timestamp: new Date().toISOString(),
    });
  };

  const trackExternalLink = (linkUrl: string, linkText: string, linkLocation: string) => {
    pushEvent({
      event: 'external_link_click',
      link_url: linkUrl,
      link_text: linkText,
      link_location: linkLocation,
      timestamp: new Date().toISOString(),
    });
  };

  // Eventos de scroll
  const trackScrollDepth = (depth: number, page: string) => {
    pushEvent({
      event: 'scroll_depth',
      scroll_depth: depth,
      page_path: page,
      timestamp: new Date().toISOString(),
    });
  };

  // Eventos de video (si se agregan en el futuro)
  const trackVideoPlay = (videoTitle: string, videoUrl: string) => {
    pushEvent({
      event: 'video_play',
      video_title: videoTitle,
      video_url: videoUrl,
      timestamp: new Date().toISOString(),
    });
  };

  // Eventos de búsqueda (si se implementa)
  const trackSearch = (searchTerm: string, resultsCount: number) => {
    pushEvent({
      event: 'search',
      search_term: searchTerm,
      results_count: resultsCount,
      timestamp: new Date().toISOString(),
    });
  };

  // Evento genérico para casos personalizados
  const trackCustomEvent = (eventName: string, eventData: Record<string, any> = {}) => {
    pushEvent({
      event: eventName,
      ...eventData,
      timestamp: new Date().toISOString(),
    });
  };

  return {
    // Core
    pushEvent,

    // Formularios
    trackFormStart,
    trackFormSubmit,
    trackFormSuccess,
    trackFormError,

    // Conversiones
    trackConversion,

    // Engagement
    trackServiceView,
    trackBlogView,
    trackWhatsAppClick,
    trackPhoneClick,
    trackEmailClick,

    // Navegación
    trackCTAClick,
    trackExternalLink,

    // Scroll
    trackScrollDepth,

    // Media
    trackVideoPlay,

    // Búsqueda
    trackSearch,

    // Custom
    trackCustomEvent,
  };
};

// Type declaration for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}
