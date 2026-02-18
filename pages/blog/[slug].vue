<script setup lang="ts">
const { isLoading } = useLoading(150)
const route = useRoute()
const store = useMainStore()
const config = useRuntimeConfig()
const directusUrl = config.public.DIRECTUS_URL as string

// Fetch del artículo actual por slug desde Directus (con categoría expandida)
const { data: currentPosts } = await useDirectusItems<Post>('posts', {
  filter: {
    slug: { _eq: route.params.slug as string },
    status: { _eq: 'published' }
  },
  fields: ['*', 'blog_category.id', 'blog_category.name', 'blog_category.slug'] as any,
  limit: 1
})

const currentPost = computed(() => currentPosts.value?.[0] || null)

// 404 si no existe el artículo
if (!currentPost.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })
}

// Resolver ID de categoría para el filtro de relacionados
const currentCategoryId = computed(() => {
  const bc = currentPost.value?.blog_category
  if (!bc) return null
  return typeof bc === 'object' ? bc.id : bc
})

// Fetch de artículos relacionados (misma categoría, excluyendo el actual)
const { data: relatedPosts } = await useDirectusItems<Post>('posts', {
  filter: {
    status: { _eq: 'published' },
    slug: { _neq: route.params.slug as string },
    ...(currentCategoryId.value ? { blog_category: { _eq: currentCategoryId.value } } : {})
  },
  fields: ['*', 'blog_category.id', 'blog_category.name', 'blog_category.slug'] as any,
  sort: ['-date_created'],
  limit: 3
})

// Formatear fecha para display
const formatDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Resolver nombre de categoría desde la relación M2O
const getCategoryName = (post: Post): string => {
  if (!post.blog_category) return 'General'
  if (typeof post.blog_category === 'object') return post.blog_category.name
  return 'General'
}

// Transformar Post al formato que BlogCard espera
const transformPost = (post: Post) => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt || '',
  image: post.featured_image ? `${directusUrl}/assets/${post.featured_image}` : '',
  date: formatDate(post.date_created),
  datetime: post.date_created?.split('T')[0] || '',
  category: getCategoryName(post),
  readingTime: post.reading_time || null,
  author: {
    name: post.author_name || 'ContuHogar',
    avatar: post.author_avatar || '',
    role: post.author_role || ''
  }
})

// Artículo actual transformado
const currentArticle = computed(() => {
  if (!currentPost.value) return null
  return transformPost(currentPost.value)
})

// Contenido del artículo desde Directus
const articleContent = computed(() => {
  return currentPost.value?.content || '<p>Contenido del artículo próximamente...</p>'
})

// Artículos relacionados transformados
const relatedArticles = computed(() => {
  if (!relatedPosts.value) return []
  return relatedPosts.value.map(transformPost)
})

// SEO optimizado para artículo
watchEffect(() => {
  if (currentArticle.value) {
    useSeo({
      title: `${currentArticle.value.title} | Blog ContuHogar`,
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

// Servicios destacados para sección de cross-selling
const featuredSlugs = ['credito-hipotecario', 'leasing-habitacional']
const featuredServices = computed(() => {
  return store.services.filter(s => featuredSlugs.includes(s.slug))
})
</script>

<template>
  <div>
    <!-- Skeleton durante carga -->
    <SkeletonBlogPost v-if="isLoading" />

    <!-- Contenido real -->
    <template v-else>
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

            <!-- CTA Banner: Simulador -->
            <div class="bg-primary/5 border border-primary/10 rounded-xl p-6 lg:p-8 mt-8">
              <div class="flex flex-col sm:flex-row items-center gap-6">
                <div class="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="flex-1 text-center sm:text-left">
                  <h3 class="text-lg font-bold text-primary mb-1">Descubre cuánto puedes financiar</h3>
                  <p class="text-gray-600 text-sm">Simula tu crédito hipotecario en 2 minutos y conoce tu cuota estimada</p>
                </div>
                <NuxtLink
                  to="/simulador/credito"
                  class="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors text-sm"
                >
                  Ir al simulador
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </NuxtLink>
              </div>
            </div>

            <!-- Artículos relacionados -->
            <div class="mt-12">
              <template v-if="relatedArticles.length > 0">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Sigue explorando sobre {{ currentArticle.category }}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <BlogCard
                    v-for="article in relatedArticles"
                    :key="article.slug"
                    :article="article"
                  />
                </div>
              </template>
              <template v-else>
                <div class="bg-white rounded-2xl p-6 lg:p-8 shadow-sm text-center">
                  <p class="text-gray-600 mb-4">Explora más contenido en nuestro blog sobre crédito de vivienda e inversión en Colombia</p>
                  <NuxtLink
                    to="/blog"
                    class="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
                  >
                    Ver todos los artículos
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </NuxtLink>
                </div>
              </template>
            </div>

            <!-- Servicios que te pueden interesar -->
            <div class="mt-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Servicios que te pueden interesar</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ServiceCard
                  v-for="service in featuredServices"
                  :key="service.slug"
                  :service="service"
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
                cta-text="Hablar con un ejecutivo de crédito"
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
      title="Tu hogar en Colombia te está esperando"
      description="Da el primer paso hacia tu inversión inmobiliaria. Nuestro equipo está listo para asesorarte sin costo ni compromiso."
      :primary-cta="{ text: 'Simular mi crédito', to: '/simulador/credito' }"
      :secondary-cta="{ text: 'Hablar con un ejecutivo de crédito', to: '/contacto' }"
      :benefits="['Sin costo inicial', 'Respuesta en 24 h', 'Proceso 100 % remoto']"
    />
    </template>
  </div>
</template>
