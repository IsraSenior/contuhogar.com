<script setup>
const { isLoading } = useLoading(150)

const title = `Blog | ContuHogar`;
const description = "Explora artículos sobre inversión inmobiliaria, crédito hipotecario, leasing habitacional y consejos para colombianos en el exterior que desean comprar vivienda en Colombia."

// SEO optimizado
useSeo({
  title: title,
  description: description,
  type: 'website'
})

// Artículos del blog (hardcoded por ahora - en el futuro podría venir de Directus)
const articles = ref([
  {
    slug: 'el-momento-es-ahora',
    title: 'Aprovecha el poder de las tasas de cambio a tu favor',
    excerpt: 'En los últimos años, la devaluación del peso colombiano ha dificultado que muchas familias en el país puedan acceder a una vivienda propia, ya sea mediante pagos de contado o a través de créditos hipotecarios.',
    image: 'https://img.freepik.com/foto-gratis/mano-que-sostiene-flecha-crecimiento-monedas_23-2148780591.jpg',
    date: 'Junio 25, 2025',
    datetime: '2025-06-25',
    category: 'Inversión',
    author: {
      name: 'Alejandra Pérez C.',
      avatar: '/team/alejandra-perez.avif',
      role: 'Gerente'
    }
  },
  {
    slug: 'credito-hipotecario-desde-exterior',
    title: 'Cómo obtener crédito hipotecario desde el exterior',
    excerpt: 'Guía completa para colombianos residentes en el exterior que desean solicitar un crédito hipotecario en Colombia. Conoce los requisitos, documentos necesarios y el proceso paso a paso.',
    image: 'https://img.freepik.com/foto-gratis/casa-modelo-madera-llave-sobre-plano_23-2148780574.jpg',
    date: 'Mayo 15, 2025',
    datetime: '2025-05-15',
    category: 'Guías',
    author: {
      name: 'Alejandra Pérez C.',
      avatar: '/team/alejandra-perez.avif',
      role: 'Gerente'
    }
  },
  {
    slug: 'leasing-vs-credito-hipotecario',
    title: 'Leasing vs Crédito Hipotecario: ¿Cuál elegir?',
    excerpt: 'Análisis comparativo entre leasing habitacional y crédito hipotecario tradicional. Descubre cuál se adapta mejor a tu situación financiera y objetivos a largo plazo.',
    image: 'https://img.freepik.com/foto-gratis/concepto-casa-diagrama-finanzas_23-2148780568.jpg',
    date: 'Abril 20, 2025',
    datetime: '2025-04-20',
    category: 'Comparativas',
    author: {
      name: 'Alejandra Pérez C.',
      avatar: '/team/alejandra-perez.avif',
      role: 'Gerente'
    }
  },
  {
    slug: 'errores-comunes-compra-vivienda',
    title: '5 Errores comunes al comprar vivienda desde el exterior',
    excerpt: 'Evita los errores más frecuentes que cometen los colombianos en el exterior al comprar propiedad en Colombia. Aprende de la experiencia de otros y protege tu inversión.',
    image: 'https://img.freepik.com/foto-gratis/agente-bienes-raices-dando-casa-cliente_23-2148780556.jpg',
    date: 'Marzo 10, 2025',
    datetime: '2025-03-10',
    category: 'Consejos',
    author: {
      name: 'Alejandra Pérez C.',
      avatar: '/team/alejandra-perez.avif',
      role: 'Gerente'
    }
  },
  {
    slug: 'tendencias-mercado-inmobiliario-2025',
    title: 'Tendencias del mercado inmobiliario colombiano 2025',
    excerpt: 'Análisis de las principales tendencias del mercado inmobiliario en Colombia para 2025. Descubre las mejores zonas para invertir y las proyecciones de valorización.',
    image: 'https://img.freepik.com/foto-gratis/grafico-negocios-crecimiento-estadisticas_23-2148780545.jpg',
    date: 'Febrero 5, 2025',
    datetime: '2025-02-05',
    category: 'Análisis',
    author: {
      name: 'Alejandra Pérez C.',
      avatar: '/team/alejandra-perez.avif',
      role: 'Gerente'
    }
  },
  {
    slug: 'documentos-necesarios-credito',
    title: 'Documentos necesarios para solicitar tu crédito',
    excerpt: 'Lista completa y detallada de todos los documentos que necesitas preparar para solicitar un crédito hipotecario o leasing habitacional desde el exterior.',
    image: 'https://img.freepik.com/foto-gratis/documentos-papeles-escritorio_23-2148780590.jpg',
    date: 'Enero 18, 2025',
    datetime: '2025-01-18',
    category: 'Guías',
    author: {
      name: 'Alejandra Pérez C.',
      avatar: '/team/alejandra-perez.avif',
      role: 'Gerente'
    }
  }
])

// Estados
const searchQuery = ref('')
const selectedCategory = ref('all')
const currentPage = ref(1)
const itemsPerPage = 6
const minSearchLength = 3 // Mínimo de caracteres para iniciar búsqueda

// Extraer categorías únicas (solo mostrar las que tienen contenido)
const categories = computed(() => {
  const uniqueCategories = [...new Set(articles.value.map(a => a.category))]
  const categoryCounts = {}

  uniqueCategories.forEach(cat => {
    categoryCounts[cat] = articles.value.filter(a => a.category === cat).length
  })

  const allCategories = [
    { id: 'all', label: 'Todas', count: articles.value.length },
    ...uniqueCategories.map(cat => ({
      id: cat.toLowerCase(),
      label: cat,
      count: categoryCounts[cat]
    }))
  ]

  // Filtrar: siempre mostrar "Todas", y las demás solo si tienen count > 0
  return allCategories.filter(cat => cat.id === 'all' || cat.count > 0)
})

// Filtrar artículos
const filteredArticles = computed(() => {
  let filtered = articles.value

  // Filtrar por categoría
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(a => a.category.toLowerCase() === selectedCategory.value)
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
