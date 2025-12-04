// composables/useSeo.ts
/**
 * Composable para gestión centralizada de SEO
 * Mejora consistencia y facilita mantenimiento de metadatos SEO
 */

interface SeoOptions {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    section?: string
    tags?: string[]
  }
}

/**
 * Configura todos los metadatos SEO de forma consistente
 */
export const useSeo = (options: SeoOptions) => {
  const route = useRoute()
  const config = useRuntimeConfig()

  const baseUrl = 'https://contuhogar.com'

  // Default OG image si no se proporciona una específica
  const defaultOgImage = `${baseUrl}/og-image.jpg`

  // URL canónica basada en la ruta actual
  const canonicalUrl = options.url || `${baseUrl}${route.path}`

  // Imagen OG (usa la proporcionada o la default)
  const ogImage = options.image || defaultOgImage

  // Título completo con marca
  const fullTitle = options.title.includes('ConTuHogar')
    ? options.title
    : `${options.title} | ConTuHogar`

  // Configurar metadatos básicos
  useSeoMeta({
    // Metadatos básicos
    title: fullTitle,
    description: options.description,

    // Open Graph
    ogTitle: fullTitle,
    ogDescription: options.description,
    ogImage: ogImage,
    ogImageAlt: options.title,
    ogUrl: canonicalUrl,
    ogType: options.type || 'website',
    ogSiteName: 'ConTuHogar',
    ogLocale: 'es_CO',

    // Twitter Card
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: options.description,
    twitterImage: ogImage,
    twitterImageAlt: options.title,
    twitterSite: '@contuhogar', // Ajustar si tienen Twitter

    // Metadatos adicionales
    robots: 'index, follow',
    author: 'ConTuHogar',

    // Article metadata (si aplica)
    ...(options.type === 'article' && options.article && {
      articlePublishedTime: options.article.publishedTime,
      articleModifiedTime: options.article.modifiedTime,
      articleAuthor: options.article.author,
      articleSection: options.article.section,
      articleTag: options.article.tags,
    })
  })

  // Configurar link canónico y otros links
  useHead({
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl
      },
      {
        rel: 'alternate',
        hreflang: 'es-co',
        href: canonicalUrl
      }
    ],
    htmlAttrs: {
      lang: 'es-CO'
    }
  })
}

/**
 * Genera JSON-LD para LocalBusiness (para la página principal y contacto)
 */
export const useLocalBusinessSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'ConTuHogar',
    description: 'Asesoría especializada en crédito hipotecario y leasing habitacional para colombianos en el exterior',
    url: 'https://contuhogar.com',
    logo: 'https://contuhogar.com/logo.png',
    image: 'https://contuhogar.com/og-image.jpg',
    telephone: [
      '+573208033672', // Colombia
      '+17185214701',  // EE.UU.
      '+34910602499'   // España
    ],
    email: 'gerencia@contuhogar.net',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cra. 54 # 105-20',
      addressLocality: 'Bogotá',
      addressRegion: 'D.C.',
      addressCountry: 'CO'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '4.694301983112287',
      longitude: '-74.06811201548074'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00'
    },
    sameAs: [
      // Agregar redes sociales si existen
      // 'https://www.facebook.com/contuhogar',
      // 'https://www.instagram.com/contuhogar',
      // 'https://www.linkedin.com/company/contuhogar'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Colombia'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios Financieros',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Crédito hipotecario',
            description: 'Préstamo destinado a la compra de vivienda en Colombia'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Leasing habitacional',
            description: 'Alternativa de financiamiento para adquirir vivienda'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Crédito de remodelación',
            description: 'Línea de crédito para mejoras y remodelaciones'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Compra de cartera',
            description: 'Traslado de crédito hipotecario con mejores condiciones'
          }
        }
      ]
    }
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(schema)
      }
    ]
  })
}

/**
 * Genera JSON-LD para BreadcrumbList
 */
export const useBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(schema)
      }
    ]
  })
}

/**
 * Genera JSON-LD para Article (para blog posts)
 */
export const useArticleSchema = (article: {
  title: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
  url: string
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || 'ConTuHogar'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ConTuHogar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://contuhogar.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(schema)
      }
    ]
  })
}

/**
 * Genera JSON-LD para FAQPage
 */
export const useFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(schema)
      }
    ]
  })
}
