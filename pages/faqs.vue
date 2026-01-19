<script setup>
import { ref, computed } from 'vue'
const store = useMainStore();
const route = useRoute();

const title = `Preguntas Frecuentes | ConTuHogar`;
const description = "Encuentra respuestas a las preguntas más comunes sobre crédito hipotecario, leasing habitacional y financiamiento de vivienda en Colombia para residentes en el exterior."

// SEO optimizado
useSeo({
    title: title,
    description: description,
    type: 'website'
})

// Structured data para FAQ
useFAQSchema(store.questions)

// Estados
const searchQuery = ref('')
const selectedCategory = ref('all')
const currentPage = ref(1)
const itemsPerPage = 9
const minSearchLength = 3 // Mínimo de caracteres para iniciar búsqueda

// Categorizar preguntas
const categorizedQuestions = computed(() => {
  const categories = {
    requisitos: [],
    proceso: [],
    tasas: [],
    documentos: [],
    otros: []
  }

  store.questions.forEach(q => {
    const question = q.question.toLowerCase()
    if (question.includes('requisito') || question.includes('necesito') || question.includes('puedo')) {
      categories.requisitos.push(q)
    } else if (question.includes('proceso') || question.includes('tiempo') || question.includes('demora')) {
      categories.proceso.push(q)
    } else if (question.includes('tasa') || question.includes('interés') || question.includes('cuota')) {
      categories.tasas.push(q)
    } else if (question.includes('documento') || question.includes('papel')) {
      categories.documentos.push(q)
    } else {
      categories.otros.push(q)
    }
  })

  return categories
})

// Filtrar preguntas por búsqueda y categoría
const filteredQuestions = computed(() => {
  let questions = []

  if (selectedCategory.value === 'all') {
    questions = store.questions
  } else {
    questions = categorizedQuestions.value[selectedCategory.value] || []
  }

  // Solo filtrar si hay al menos 3 caracteres
  const trimmedQuery = searchQuery.value.trim()
  if (trimmedQuery.length >= minSearchLength) {
    const query = trimmedQuery.toLowerCase()
    questions = questions.filter(q =>
      q.question.toLowerCase().includes(query) ||
      q.answer.toLowerCase().includes(query)
    )
  }

  return questions
})

// Paginación
const totalPages = computed(() => {
  return Math.ceil(filteredQuestions.value.length / itemsPerPage)
})

const paginatedQuestions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredQuestions.value.slice(start, end)
})

// Resetear página cuando cambian los filtros
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})

// Control de accordions (permitir múltiples abiertos)
const openQuestions = ref(new Set())

const toggleQuestion = (index) => {
  if (openQuestions.value.has(index)) {
    openQuestions.value.delete(index)
  } else {
    openQuestions.value.add(index)
  }
}

const isQuestionOpen = (index) => {
  return openQuestions.value.has(index)
}

// Funciones de paginación
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Scroll suave hacia arriba de las FAQs
    const faqList = document.querySelector('.faq-list')
    if (faqList) {
      faqList.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

// Categorías sin emojis para un look más profesional (solo mostrar las que tienen contenido)
const categories = computed(() => {
  const allCategories = [
    { id: 'all', label: 'Todas', count: store.questions.length },
    { id: 'requisitos', label: 'Requisitos', count: categorizedQuestions.value.requisitos.length },
    { id: 'proceso', label: 'Proceso', count: categorizedQuestions.value.proceso.length },
    { id: 'tasas', label: 'Tasas', count: categorizedQuestions.value.tasas.length },
    { id: 'documentos', label: 'Documentos', count: categorizedQuestions.value.documentos.length },
  ]
  // Filtrar: siempre mostrar "Todas", y las demás solo si tienen count > 0
  return allCategories.filter(cat => cat.id === 'all' || cat.count > 0)
})

// Estado sin resultados para el buscador (solo cuando hay búsqueda real con mínimo de caracteres)
const hasNoResults = computed(() => {
  const trimmedQuery = searchQuery.value.trim()
  return trimmedQuery.length >= minSearchLength && filteredQuestions.value.length === 0
})
</script>

<template>
    <!-- Hero Section -->
    <HeroSection
        badge="Más de 3,000 colombianos confían en nosotros"
        badge-icon
        title="⁠¿Tienes dudas sobre tu préstamo en Colombia?"
        subtitle="Encuentra respuestas claras y rápidas a tus preguntas. Si no encuentras lo que buscas, nuestro equipo está listo para ayudarte."
    />

    <!-- Categorías y Buscador -->
    <CategoryPills
        v-model="selectedCategory"
        v-model:searchQuery="searchQuery"
        v-model:hasNoResults="hasNoResults"
        :categories="categories"
        :show-search="true"
        search-placeholder="Buscar preguntas..."
        @no-results-click="$router.push('/contacto')"
    />

    <!-- Contenido principal -->
    <div class="bg-muted">
        <div class="mx-auto container px-6 lg:px-8 py-16">
            <div class="lg:grid lg:grid-cols-12 lg:gap-12">

                <!-- Columna izquierda: FAQs -->
                <div class="lg:col-span-8">
                    <div v-if="paginatedQuestions.length > 0" class="space-y-4 faq-list">
                        <div
                            v-for="(item, index) in paginatedQuestions"
                            :key="index"
                            class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <button
                                @click="toggleQuestion(index)"
                                class="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                            >
                                <span class="flex-1 text-base font-semibold text-gray-900">
                                    {{ item.question }}
                                </span>
                                <svg
                                    :class="[
                                        'w-5 h-5 text-primary transition-transform flex-shrink-0',
                                        isQuestionOpen(index) ? 'rotate-45' : ''
                                    ]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                                </svg>
                            </button>

                            <Transition
                                enter-active-class="transition-all duration-300"
                                enter-from-class="opacity-0 max-h-0"
                                enter-to-class="opacity-100 max-h-96"
                                leave-active-class="transition-all duration-200"
                                leave-from-class="opacity-100 max-h-96"
                                leave-to-class="opacity-0 max-h-0"
                            >
                                <div v-if="isQuestionOpen(index)" class="px-6 pb-5">
                                    <div class="pt-2 border-t border-gray-100">
                                        <div class="prose prose-sm max-w-none text-gray-600" v-html="item.answer"></div>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>

                    <!-- Paginación -->
                    <div v-if="totalPages > 1" class="mt-8 flex items-center justify-center gap-2">
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
                    <div v-if="filteredQuestions.length > 0" class="mt-4 text-center text-sm text-gray-500">
                        Mostrando {{ ((currentPage - 1) * itemsPerPage) + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredQuestions.length) }} de {{ filteredQuestions.length }} preguntas
                    </div>

                    <!-- Estado vacío -->
                    <div v-else class="text-center py-16">
                        <svg class="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <h3 class="mt-4 text-lg font-semibold text-gray-900">No encontramos preguntas</h3>
                        <p class="mt-2 text-sm text-gray-500">Intenta con otra búsqueda o contáctanos directamente</p>
                    </div>
                </div>

                <!-- Columna derecha: Sidebar sticky -->
                <div class="lg:col-span-4 mt-12 lg:mt-0">
                    <div class="lg:sticky lg:top-24 space-y-6">

                        <!-- Widget de contacto rápido -->
                        <div class="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-6 border-2 border-secondary/20">
                            <div class="text-center">
                                <div class="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-full mb-4">
                                    <svg class="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-2">
                                    ¿No encuentras tu respuesta?
                                </h3>
                                <p class="text-sm text-gray-600 mb-6">
                                    Nuestros asesores están listos para resolver todas tus dudas personalmente
                                </p>
                                <NuxtLink
                                    to="/contacto"
                                    class="block w-full px-4 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-colors shadow-md"
                                >
                                    Hablar con un ejecutivo de crédito
                                </NuxtLink>
                                <p class="mt-3 text-xs text-gray-500 flex items-center justify-center gap-1">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                                    </svg>
                                    Respuesta en menos de 24 horas
                                </p>
                            </div>
                        </div>

                        <!-- CTA Simulador -->
                        <div class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border-2 border-primary/20">
                            <div class="text-center">
                                <div class="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                                    <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <h3 class="text-lg font-bold text-gray-900 mb-2">
                                    Simula tu crédito
                                </h3>
                                <p class="text-sm text-gray-600 mb-4">
                                    Descubre en minutos cuánto puedes solicitar y cuál sería tu cuota mensual
                                </p>
                                <NuxtLink
                                    to="/simulador/credito"
                                    class="block w-full px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                                >
                                    Ir al simulador
                                </NuxtLink>
                            </div>
                        </div>

                        <!-- Recursos adicionales -->
                        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                                </svg>
                                Recursos útiles
                            </h3>
                            <ul class="space-y-3">
                                <li>
                                    <NuxtLink to="/servicios/credito-hipotecario" class="text-sm text-primary hover:text-secondary font-medium flex items-center gap-2">
                                        <span>→</span> Crédito hipotecario
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/servicios/leasing-habitacional" class="text-sm text-primary hover:text-secondary font-medium flex items-center gap-2">
                                        <span>→</span> Leasing habitacional
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/nosotros" class="text-sm text-primary hover:text-secondary font-medium flex items-center gap-2">
                                        <span>→</span> Conoce nuestro equipo
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bancos y Aliados -->
    <BankLogosSection />

    <!-- CTA Final -->
    <CTASection
        title="Tu hogar en Colombia te está esperando"
        description="Da el primer paso hacia tu inversión inmobiliaria. Nuestro equipo está listo para asesorarte sin costo ni compromiso."
        :primary-cta="{ text: 'Simular mi crédito', to: '/simulador/credito' }"
        :secondary-cta="{ text: 'Hablar con un ejecutivo de crédito', to: '/contacto' }"
        :benefits="['Sin costo inicial', 'Respuesta en 24h', 'Proceso 100% remoto']"
        image="https://img.freepik.com/foto-gratis/mira-compramos-casa_637285-12424.jpg"
        image-alt="Familia feliz celebrando compra de casa"
    />
</template>
