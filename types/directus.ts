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
 * Colección: blog_categories
 * Categorías del blog
 */
export interface BlogCategory {
  id?: string
  status?: 'published' | 'draft'
  sort?: number | null
  name: string
  slug: string
  description?: string | null
  color?: string | null
}

/**
 * Colección: posts
 * Artículos del blog
 */
export interface Post {
  id?: string
  status?: 'draft' | 'published' | 'archived'
  sort?: number | null
  date_created?: string | null
  date_updated?: string | null
  title: string
  slug: string
  excerpt?: string | null
  content?: string | null
  featured_image?: string | null
  blog_category?: string | BlogCategory | null
  category?: string | null
  tags?: string[] | null
  author_name?: string | null
  author_role?: string | null
  author_avatar?: string | null
  reading_time?: string | null
  meta_title?: string | null
  meta_description?: string | null
  related_services?: string[] | null
}

/**
 * Colección: landing_pages
 * Páginas programáticas por mercado
 */
export interface LandingPage {
  id?: string
  status?: 'draft' | 'published'
  title?: string | null
  slug: string
  service_slug: string
  country?: string | null
  country_code?: string | null
  city?: string | null
  hero_title?: string | null
  hero_subtitle?: string | null
  content?: string | null
  featured_image?: string | null
  meta_title?: string | null
  meta_description?: string | null
  faqs?: Array<{ question: string; answer: string }> | null
  stats?: Array<{ value: string; label: string; description?: string }> | null
  testimonial_ids?: string[] | null
  date_created?: string | null
  date_updated?: string | null
}

/**
 * Colección: team
 * Miembros del equipo
 */
export interface TeamMember {
  id?: string
  status?: 'published' | 'draft'
  sort?: number | null
  name: string
  title: string
  email?: string | null
  image?: string | null
  date_created?: string | null
  date_updated?: string | null
}

/**
 * Union type de todas las colecciones
 */
export type DirectusCollections = {
  leads: Leads
  newsletter_subscribers: NewsletterSubscriber
  blog_categories: BlogCategory
  posts: Post
  landing_pages: LandingPage
  team: TeamMember
}
