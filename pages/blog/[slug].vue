<script setup>
const route = useRoute()

// Lista completa de artículos (misma que en blog/index.vue)
const allArticles = [
  {
    slug: 'el-momento-es-ahora',
    title: 'Aprovecha el poder de las tasas de cambio a tu favor',
    excerpt: 'En los últimos años, la devaluación del peso colombiano ha dificultado que muchas familias en el país puedan acceder a una vivienda propia.',
    image: 'https://img.freepik.com/foto-gratis/mano-que-sostiene-flecha-crecimiento-monedas_23-2148780591.jpg',
    date: 'Junio 25, 2025',
    datetime: '2025-06-25',
    category: 'Inversión',
    readingTime: '5 min',
    author: {
      name: 'Alejandra Pérez C.',
      avatar: '/team/alejandra-perez.avif',
      role: 'Gerente'
    }
  },
  {
    slug: 'credito-hipotecario-desde-exterior',
    title: 'Cómo obtener crédito hipotecario desde el exterior',
    excerpt: 'Guía completa para colombianos residentes en el exterior que desean solicitar un crédito hipotecario en Colombia.',
    image: 'https://img.freepik.com/foto-gratis/casa-modelo-madera-llave-sobre-plano_23-2148780574.jpg',
    date: 'Mayo 15, 2025',
    datetime: '2025-05-15',
    category: 'Guías',
    readingTime: '8 min',
    author: {
      name: 'Alejandra Pérez C.',
      avatar: '/team/alejandra-perez.avif',
      role: 'Gerente'
    }
  },
  {
    slug: 'leasing-vs-credito-hipotecario',
    title: 'Leasing vs Crédito Hipotecario: ¿Cuál elegir?',
    excerpt: 'Análisis comparativo entre leasing habitacional y crédito hipotecario tradicional.',
    image: 'https://img.freepik.com/foto-gratis/concepto-casa-diagrama-finanzas_23-2148780568.jpg',
    date: 'Abril 20, 2025',
    datetime: '2025-04-20',
    category: 'Comparativas',
    readingTime: '6 min',
    author: {
      name: 'Alejandra Pérez C.',
      avatar: '/team/alejandra-perez.avif',
      role: 'Gerente'
    }
  },
  {
    slug: 'errores-comunes-compra-vivienda',
    title: '5 Errores comunes al comprar vivienda desde el exterior',
    excerpt: 'Evita los errores más frecuentes que cometen los colombianos en el exterior al comprar propiedad en Colombia.',
    image: 'https://img.freepik.com/foto-gratis/agente-bienes-raices-dando-casa-cliente_23-2148780556.jpg',
    date: 'Marzo 10, 2025',
    datetime: '2025-03-10',
    category: 'Consejos',
    readingTime: '7 min',
    author: {
      name: 'Alejandra Pérez C.',
      avatar: '/team/alejandra-perez.avif',
      role: 'Gerente'
    }
  }
]

// Encontrar artículo actual
const currentArticle = computed(() => {
  return allArticles.find(a => a.slug === route.params.slug) || allArticles[0]
})

// Artículos relacionados (misma categoría, excluyendo el actual)
const relatedArticles = computed(() => {
  return allArticles
    .filter(a => a.slug !== currentArticle.value.slug && a.category === currentArticle.value.category)
    .slice(0, 3)
})

// Contenido del artículo (en el futuro vendría de CMS)
const articleContent = computed(() => {
  if (currentArticle.value.slug === 'el-momento-es-ahora') {
    return `
      <p>En los últimos años, la devaluación del peso colombiano ha dificultado que muchas familias en el país puedan acceder a una vivienda propia, ya sea mediante pagos de contado o a través de créditos hipotecarios. Sin embargo, esta realidad ha generado una gran oportunidad para los colombianos residentes en el exterior quienes reciben ingresos en monedas fuertes como el dólar, el euro u otras fuertes divisas.</p>

      <p>Hoy, los colombianos quienes trabajan y residen en algunos países del exterior tienen una ventaja única: tu dinero vale más en Colombia. Esta diferencia les permite invertir de forma más estratégica, segura y rentable, incluso en mejores condiciones que en tu país de residencia.</p>

      <p>La finca raíz continúa siendo una de las formas más estables y sólidas de inversión en el mundo. No solo incrementa el patrimonio, sino que también brinda seguridad y estabilidad financiera. Contar con ingresos en una moneda fuerte y acceder a créditos en pesos colombianos ofrece beneficios como cuotas más asequibles, posibilidad de hacer abonos a capital y, en muchos casos, pagar el préstamo en menos tiempo del previsto.</p>

      <p>Hoy es el momento ideal para invertir en tu país, aplica a un crédito de vivienda y compra tu propiedad ya, o ayuda a tu familia a cumplir ese sueño que la economía local ha hecho difícil. La diferencia la haces tú. Tus buenas decisiones pueden convertirse en un hogar para ti o los tuyos en Colombia.</p>
    `
  }
  return '<p>Contenido del artículo próximamente...</p>'
})

// SEO optimizado para artículo
watchEffect(() => {
  if (currentArticle.value) {
    useSeo({
      title: `${currentArticle.value.title} | Blog ConTuHogar`,
      description: currentArticle.value.excerpt,
      type: 'article',
      image: currentArticle.value.image,
      article: {
        publishedTime: currentArticle.value.datetime,
        modifiedTime: currentArticle.value.datetime,
        author: currentArticle.value.author.name,
        section: currentArticle.value.category,
        tags: [currentArticle.value.category, 'Inversión', 'Vivienda', 'Colombia']
      }
    })

    // Structured data para artículo
    useArticleSchema({
      title: currentArticle.value.title,
      description: currentArticle.value.excerpt,
      image: currentArticle.value.image,
      datePublished: currentArticle.value.datetime,
      dateModified: currentArticle.value.datetime,
      author: currentArticle.value.author.name,
      url: `https://contuhogar.com/blog/${currentArticle.value.slug}`
    })

    // Breadcrumb para mejor SEO
    useBreadcrumbSchema([
      { name: 'Inicio', url: 'https://contuhogar.com' },
      { name: 'Blog', url: 'https://contuhogar.com/blog' },
      { name: currentArticle.value.title, url: `https://contuhogar.com/blog/${currentArticle.value.slug}` }
    ])
  }
})

// Recursos útiles para sidebar
const usefulResources = [
  { label: 'Ver todos los artículos', to: '/blog' },
  { label: 'Crédito hipotecario', to: '/servicios/credito-hipotecario' },
  { label: 'Leasing habitacional', to: '/servicios/leasing-habitacional' },
  { label: 'Preguntas Frecuentes', to: '/faqs' }
]
</script>

<template>
  <div>
    <!-- Hero del artículo -->
    <HeroSection
      :badge="currentArticle.category"
      :title="currentArticle.title"
      :subtitle="currentArticle.excerpt"
    />

    <!-- Contenido principal -->
    <div class="bg-muted">
      <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-12">

          <!-- Columna izquierda: Contenido del artículo -->
          <article class="lg:col-span-8">
            <!-- Imagen destacada -->
            <div class="relative aspect-video mb-6 overflow-hidden rounded-2xl shadow-lg">
              <NuxtImg
                :src="currentArticle.image"
                :alt="currentArticle.title"
                class="w-full h-full object-cover"
                format="webp"
                quality="85"
                loading="eager"
                fetchpriority="high"
              />
            </div>

            <!-- Autor y fecha de publicación -->
            <div class="flex items-center justify-between gap-4 mb-6 px-1">
              <!-- Autor -->
              <div class="flex items-center gap-3">
                <NuxtImg
                  :src="currentArticle.author.avatar"
                  :alt="currentArticle.author.name"
                  class="w-10 h-10 rounded-full ring-2 ring-white shadow-sm"
                  format="webp"
                  quality="75"
                  sizes="40px"
                  loading="lazy"
                />
                <div>
                  <p class="text-sm font-semibold text-gray-900">{{ currentArticle.author.name }}</p>
                  <p class="text-xs text-gray-500">{{ currentArticle.author.role }}</p>
                </div>
              </div>

              <!-- Fecha y tiempo de lectura -->
              <div class="flex items-center gap-4 text-sm text-gray-500">
                <time :datetime="currentArticle.datetime" class="flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ currentArticle.date }}
                </time>
                <span class="flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ currentArticle.readingTime }}
                </span>
              </div>
            </div>

            <!-- Contenido del artículo -->
            <div class="bg-white rounded-2xl p-8 lg:p-12 shadow-sm prose prose-lg max-w-none">
              <div v-html="articleContent"></div>
            </div>

            <!-- Artículos relacionados -->
            <div v-if="relatedArticles.length > 0" class="mt-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Artículos relacionados</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BlogCard
                  v-for="article in relatedArticles"
                  :key="article.slug"
                  :article="article"
                />
              </div>
            </div>
          </article>

          <!-- Columna derecha: Sidebar -->
          <aside class="lg:col-span-4 mt-12 lg:mt-0">
            <div class="lg:sticky lg:top-24 space-y-6">

              <!-- CTA Contacto -->
              <SidebarCTA
                variant="secondary"
                icon="question"
                title="¿Necesitas asesoría personalizada?"
                description="Nuestros expertos están listos para ayudarte a tomar la mejor decisión para tu inversión"
                cta-text="Hablar con un asesor"
                cta-link="/contacto"
                badge="Respuesta en menos de 24 horas"
                :badge-icon="true"
              />

              <!-- CTA Simulador -->
              <SidebarCTA
                variant="primary"
                icon="calculator"
                title="Simula tu crédito"
                description="Descubre en minutos cuánto puedes solicitar y cuál sería tu cuota mensual"
                cta-text="Ir al simulador"
                cta-link="/simulador/credito"
              />

              <!-- Recursos útiles -->
              <ResourcesList
                title="Recursos útiles"
                :resources="usefulResources"
              />
            </div>
          </aside>
        </div>
      </div>
    </div>

    <!-- Bancos Aliados -->
    <BankLogosSection />

    <!-- CTA Final -->
    <CTASection
      title="Tu hogar en Colombia te esta esperando"
      description="Da el primer paso hacia tu inversion inmobiliaria. Nuestro equipo esta listo para asesorarte sin costo ni compromiso."
      :primary-cta="{ text: 'Simular mi credito', to: '/simulador/credito' }"
      :secondary-cta="{ text: 'Hablar con un asesor', to: '/contacto' }"
      :benefits="['Sin costo inicial', 'Respuesta en 24h', 'Proceso 100% remoto']"
    />
  </div>
</template>
