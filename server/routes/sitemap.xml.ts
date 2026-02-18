import { defineEventHandler, setHeader } from 'h3'
import { createDirectus, rest, readItems, staticToken } from '@directus/sdk'

/**
 * Endpoint de sitemap dinámico para ContuHogar
 *
 * Genera un sitemap.xml con:
 * - Páginas estáticas principales
 * - Páginas dinámicas de servicios del store
 * - Páginas dinámicas de blog posts (desde Directus)
 * - Páginas programáticas de landing pages (desde Directus)
 *
 * @route GET /sitemap.xml
 */
export default defineEventHandler(async (event) => {
  const baseUrl = 'https://contuhogar.com'
  const today = new Date().toISOString().split('T')[0]

  // Páginas estáticas con prioridades y changefreq
  const staticPages = [
    {
      loc: '',
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: '/servicios',
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      loc: '/simulador/credito',
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: '/blog',
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/contacto',
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      loc: '/nosotros',
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      loc: '/faqs',
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      loc: '/terminos-condiciones',
      lastmod: today,
      changefreq: 'yearly',
      priority: '0.3'
    },
    {
      loc: '/politica-privacidad',
      lastmod: today,
      changefreq: 'yearly',
      priority: '0.3'
    }
  ]

  // Servicios dinámicos del store
  const serviceSlugs = [
    'credito-hipotecario',
    'leasing-habitacional',
    'credito-de-remodelacion',
    'compra-de-cartera',
    'conturenta'
  ]

  const servicePages = serviceSlugs.map(slug => ({
    loc: `/servicios/${slug}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.9'
  }))

  // Fetch blog posts y landing pages desde Directus
  let blogPages: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> = []
  let landingPages: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> = []

  try {
    const config = useRuntimeConfig()
    const directusServer = createDirectus(config.DIRECTUS_URL)
      .with(staticToken(config.DIRECTUS_ADMIN_TOKEN))
      .with(rest())

    // Fetch published blog posts
    const posts = await directusServer.request(
      readItems('posts', {
        filter: { status: { _eq: 'published' } },
        fields: ['slug', 'date_updated', 'date_created'],
        sort: ['-date_created']
      })
    )

    blogPages = posts.map((post: any) => ({
      loc: `/blog/${post.slug}`,
      lastmod: (post.date_updated || post.date_created || today).split('T')[0],
      changefreq: 'weekly',
      priority: '0.7'
    }))

    // Fetch published landing pages
    const landings = await directusServer.request(
      readItems('landing_pages', {
        filter: { status: { _eq: 'published' } },
        fields: ['slug', 'service_slug', 'date_updated', 'date_created'],
        sort: ['-date_created']
      })
    )

    landingPages = landings.map((lp: any) => ({
      loc: `/servicios/${lp.service_slug}/${lp.slug}`,
      lastmod: (lp.date_updated || lp.date_created || today).split('T')[0],
      changefreq: 'monthly',
      priority: '0.8'
    }))
  } catch (error) {
    // Si Directus no responde, el sitemap sigue funcionando con las URLs estáticas
    console.warn('[sitemap] Error fetching from Directus, continuing with static pages only:', error)
  }

  // Combinar todas las URLs
  const allPages = [...staticPages, ...servicePages, ...blogPages, ...landingPages]

  // Generar XML
  const urls = allPages.map(page => `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  // Configurar headers
  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')

  return sitemap
})
