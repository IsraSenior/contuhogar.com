<script setup lang="ts">
const { isLoading } = useLoading(150)
const config = useRuntimeConfig()
const directusUrl = config.public.DIRECTUS_URL as string

const title = `Blog | ContuHogar`;
const description = "Explora artículos sobre inversión inmobiliaria, crédito hipotecario, leasing habitacional y consejos para colombianos en el exterior que desean comprar vivienda en Colombia."

// SEO optimizado
useSeo({
  title: title,
  description: description,
  type: 'website'
})

// Fetch de categorías del blog desde Directus (query ligero e independiente)
const { data: blogCategories } = await useDirectusItems<BlogCategory>('blog_categories', {
  filter: { status: { _eq: 'published' } },
  sort: ['sort']
})

// Fetch de artículos publicados con relación a categoría expandida
const { data: posts } = await useDirectusItems<Post>('posts', {
  filter: { status: { _eq: 'published' } },
  sort: ['-date_created'],
  fields: ['*', 'blog_category.id', 'blog_category.name', 'blog_category.slug'] as any
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
  const cat = blogCategories.value?.find(c => c.id === post.blog_category)
  return cat?.name || 'General'
}

const getCategorySlug = (post: Post): string => {
  if (!post.blog_category) return 'general'
  if (typeof post.blog_category === 'object') return post.blog_category.slug
  const cat = blogCategories.value?.find(c => c.id === post.blog_category)
  return cat?.slug || 'general'
}

// Transformar Post[] al formato que BlogCard espera
const transformedArticles = computed(() => {
  if (!posts.value) return []
  return posts.value.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    image: post.featured_image ? `${directusUrl}/assets/${post.featured_image}` : '',
    date: formatDate(post.date_created),
    datetime: post.date_created?.split('T')[0] || '',
    category: getCategoryName(post),
    categorySlug: getCategorySlug(post),
    readingTime: post.reading_time || null,
    author: {
      name: post.author_name || 'ContuHogar',
      avatar: post.author_avatar || '',
      role: post.author_role || ''
    }
  }))
})

// CollectionPage schema para SEO
useCollectionPageSchema({
  name: 'Blog | ContuHogar',
  description,
  url: 'https://contuhogar.com/blog',
  items: transformedArticles.value.map((a) => ({
    name: a.title,
    url: `https://contuhogar.com/blog/${a.slug}`
  }))
})

// Estados
const searchQuery = ref('')
const selectedCategory = ref('all')
const currentPage = ref(1)
const itemsPerPage = 6
const minSearchLength = 3 // Mínimo de caracteres para iniciar búsqueda

// Categorías desde Directus con conteo de posts
const categories = computed(() => {
  const allCategories = [
    { id: 'all', label: 'Todas', count: transformedArticles.value.length },
    ...(blogCategories.value || []).map(cat => ({
      id: cat.slug,
      label: cat.name,
      count: transformedArticles.value.filter(a => a.categorySlug === cat.slug).length
    }))
  ]
  return allCategories.filter(cat => cat.id === 'all' || cat.count > 0)
})

// Filtrar artículos
const filteredArticles = computed(() => {
  let filtered = transformedArticles.value

  // Filtrar por categoría usando slug
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(a => a.categorySlug === selectedCategory.value)
  }

  // Filtrar por búsqueda (solo si hay al menos 3 caracteres)
  const trimmedQuery = searchQuery.value.trim()
  if (trimmedQuery.length >= minSearchLength) {
    const query = trimmedQuery.toLowerCase()
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query) ||
      a.category.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Artículos para la grid (excluyendo el destacado cuando aplique)
const articlesForGrid = computed(() => {
  // Si se muestra el artículo destacado, excluirlo de la lista
  if (selectedCategory.value === 'all' && searchQuery.value.trim().length < minSearchLength) {
    return filteredArticles.value.slice(1) // Excluir el primero (destacado)
  }
  return filteredArticles.value
})

// Paginación sobre articlesForGrid en vez de filteredArticles
const totalPages = computed(() => {
  return Math.ceil(articlesForGrid.value.length / itemsPerPage)
})

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return articlesForGrid.value.slice(start, end)
})

// Artículo destacado (el más reciente)
const featuredArticle = computed(() => filteredArticles.value[0])

// Resetear página cuando cambian los filtros
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})

// Funciones de paginación
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    const blogGrid = document.querySelector('.blog-grid')
    if (blogGrid) {
      blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

// Estado sin resultados (solo cuando hay búsqueda real con mínimo de caracteres)
const hasNoResults = computed(() => {
  const trimmedQuery = searchQuery.value.trim()
  return trimmedQuery.length >= minSearchLength && filteredArticles.value.length === 0
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SkeletonHeroSection v-if="isLoading" variant="primary" show-badge />
    <HeroSection
      v-else
      badge="Más de 3.000 colombianos confían en nosotros"
      badge-icon
      title="Explora. Infórmate. Invierte con seguridad."
      subtitle="En nuestro blog encontrarás contenido útil, claro y actualizado sobre todo lo que necesitas saber para invertir con confianza en finca raíz desde cualquier lugar del mundo."
    />

    <!-- Categorías y Buscador (skeleton incluido dentro del componente si es necesario) -->
    <template v-if="!isLoading">
      <CategoryPills
        v-model="selectedCategory"
        v-model:searchQuery="searchQuery"
        v-model:hasNoResults="hasNoResults"
        :categories="categories"
        :show-search="true"
        search-placeholder="Buscar artículos..."
        @no-results-click="$router.push('/contacto')"
      />
    </template>

    <!-- Contenido principal -->
    <div class="bg-muted py-16">
      <div class="mx-auto container px-6 lg:px-8">
        <!-- Skeleton state -->
        <template v-if="isLoading">
          <!-- Skeleton articulo destacado -->
          <div class="mb-16">
            <div class="mb-6">
              <div class="h-8 w-48 skeleton-shimmer rounded" />
            </div>
            <SkeletonBlogCard :featured="true" />
          </div>

          <!-- Skeleton grid -->
          <div class="mb-6 flex items-center justify-between">
            <div class="h-8 w-36 skeleton-shimmer rounded" />
            <div class="h-4 w-20 skeleton-shimmer rounded" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonBlogCard v-for="i in 6" :key="i" />
          </div>
        </template>

        <!-- Contenido real -->
        <template v-else>
          <!-- Artículo destacado -->
          <div v-if="featuredArticle && selectedCategory === 'all' && searchQuery.trim().length < minSearchLength" class="mb-16">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-gray-900">Artículo destacado</h2>
            </div>
            <BlogCard :article="featuredArticle" :featured="true" />
          </div>

          <!-- Grid de artículos -->
          <div v-if="paginatedArticles.length > 0" class="blog-grid">
          <div class="mb-6 flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ selectedCategory === 'all' && searchQuery.trim().length < minSearchLength ? 'Más artículos' : 'Artículos' }}
            </h2>
            <p class="text-sm text-gray-500">
              {{ articlesForGrid.length }} {{ articlesForGrid.length === 1 ? 'artículo' : 'artículos' }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogCard
              v-for="article in paginatedArticles"
              :key="article.slug"
              :article="article"
            />
          </div>

          <!-- Paginación -->
          <div v-if="totalPages > 1" class="mt-12 flex items-center justify-center gap-2">
            <!-- Botón anterior -->
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <!-- Números de página -->
            <div class="flex gap-2">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
            </div>

            <!-- Botón siguiente -->
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <!-- Contador de resultados -->
          <div v-if="articlesForGrid.length > 0" class="mt-4 text-center text-sm text-gray-500">
            Mostrando {{ ((currentPage - 1) * itemsPerPage) + 1 }} - {{ Math.min(currentPage * itemsPerPage, articlesForGrid.length) }} de {{ articlesForGrid.length }} artículos
          </div>
        </div>

        <!-- Estado vacío -->
        <div v-else class="text-center py-16">
          <svg class="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="mt-4 text-lg font-semibold text-gray-900">No encontramos artículos</h3>
          <p class="mt-2 text-sm text-gray-500">Intenta con otra búsqueda o explora todas las categorías</p>
          <button
            @click="searchQuery = ''; selectedCategory = 'all'"
            class="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ver todos los artículos
          </button>
        </div>
        </template>
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
  </div>
</template>
