import { defineEventHandler, setHeader } from 'h3'

/**
 * Endpoint de sitemap dinámico para ConTuHogar
 *
 * Genera un sitemap.xml con:
 * - Páginas estáticas principales
 * - Páginas dinámicas de servicios del store
 * - Páginas dinámicas de blog (cuando estén disponibles en Directus)
 *
 * @route GET /sitemap.xml
 */
export default defineEventHandler((event) => {
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
  // Importamos directamente el array de servicios sin necesitar el store completo
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

  // Combinar todas las URLs
  const allPages = [...staticPages, ...servicePages]

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
