/**
 * Tipos de TypeScript auto-generados desde Directus
 * Generado: 2025-11-01T17:20:55.961Z
 * No editar manualmente - usar: npx tsx scripts/directus-generate-types.ts
 */

/**
 * Colección: leads
 */
export interface Leads {
  id?: string
  status?: string
  sort?: number | null
  date_created?: string | null
  date_updated?: string | null
  name?: string | null
  lastname?: string | null
  email?: string | null
  phone?: string | null
  message?: string | null
  source_page?: string | null
}

/**
 * Colección: newsletter_subscribers
 * Suscriptores del boletín informativo
 */
export interface NewsletterSubscriber {
  id?: string
  email: string
  status: 'subscribed' | 'unsubscribed' | 'bounced'
  date_created?: string | null
  date_updated?: string | null
  subscribed_at?: string | null
  unsubscribed_at?: string | null
  ip_address?: string | null
  user_agent?: string | null
  device_type?: 'mobile' | 'tablet' | 'desktop' | null
  browser?: string | null
  os?: string | null
  source_page?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  locale?: string | null
}

/**
 * Union type de todas las colecciones
 */
export type DirectusCollections = {
  leads: Leads
  newsletter_subscribers: NewsletterSubscriber
}
