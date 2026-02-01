<script setup lang="ts">
/**
 * LegalPageLayout - Layout moderno para paginas legales tipo Stripe/Notion
 * Features:
 * - Hero compacto con titulo, descripcion y fecha
 * - Layout 2 columnas en desktop (sidebar sticky + contenido)
 * - Sidebar con navegacion por anclas con seccion activa
 * - Mobile: indice como dropdown
 * - Intersection Observer para detectar seccion activa
 */

interface Section {
  id: string
  title: string
  icon?: string
}

interface Props {
  title: string
  description: string
  lastUpdated: string
  sections: Section[]
}

const props = defineProps<Props>()

// Estado del indice mobile
const isMobileIndexOpen = ref(false)

// Seccion activa (basada en scroll)
const activeSection = ref<string | null>(props.sections[0]?.id || null)

// Referencias a las secciones
const sectionRefs = ref<Map<string, Element>>(new Map())

// Intersection Observer para detectar seccion activa
let observer: IntersectionObserver | null = null

onMounted(() => {
  // Esperar un tick para que las secciones esten renderizadas
  nextTick(() => {
    // Encontrar todas las secciones por ID
    props.sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) {
        sectionRefs.value.set(section.id, el)
      }
    })

    // Configurar Intersection Observer
    observer = new IntersectionObserver(
      (entries) => {
        // Encontrar la seccion mas visible
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          // Ordenar por posicion vertical y tomar la primera
          const sorted = visibleEntries.sort((a, b) => {
            return a.boundingClientRect.top - b.boundingClientRect.top
          })
          const topEntry = sorted.find((e) => e.boundingClientRect.top >= 0) || sorted[0]
          if (topEntry) {
            activeSection.value = topEntry.target.id
          }
        }
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    )

    // Observar cada seccion
    sectionRefs.value.forEach((el) => {
      observer?.observe(el)
    })
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

// Scroll suave a seccion y expandir acordeon
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    // Cerrar indice mobile
    isMobileIndexOpen.value = false

    // Scroll suave
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })

    // Actualizar seccion activa
    activeSection.value = sectionId
  }
}

// Toggle indice mobile
const toggleMobileIndex = () => {
  isMobileIndexOpen.value = !isMobileIndexOpen.value
}

// Obtener icono de seccion
const getSectionIcon = (section: Section): string => {
  return section.icon || 'heroicons:document-text'
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero compacto -->
    <div class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-12 lg:py-16">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">Legal</p>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
            {{ title }}
          </h1>
          <p class="mt-4 text-lg text-gray-600">
            {{ description }}
          </p>
          <p class="mt-3 text-sm text-gray-500">
            Ultima actualizacion: {{ lastUpdated }}
          </p>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="container mx-auto px-4 py-8 lg:py-12">
      <!-- Indice mobile (dropdown) -->
      <div class="lg:hidden mb-6">
        <button
          @click="toggleMobileIndex"
          class="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <span class="font-medium text-gray-900">Indice de contenidos</span>
          <svg
            class="w-5 h-5 text-gray-500 transition-transform duration-200"
            :class="isMobileIndexOpen ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Lista de secciones mobile -->
        <div
          v-if="isMobileIndexOpen"
          class="mt-2 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
        >
          <nav class="divide-y divide-gray-100">
            <button
              v-for="section in sections"
              :key="section.id"
              @click="scrollToSection(section.id)"
              class="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors"
              :class="activeSection === section.id ? 'bg-primary/5 text-primary' : 'text-gray-700'"
            >
              <span class="text-sm font-medium">{{ section.title }}</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Layout 2 columnas desktop -->
      <div class="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
        <!-- Sidebar desktop (sticky) -->
        <aside class="hidden lg:block">
          <div class="sticky top-24">
            <nav class="bg-white rounded-xl border border-gray-200 p-4">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">
                Contenidos
              </p>
              <ul class="space-y-1">
                <li v-for="section in sections" :key="section.id">
                  <button
                    @click="scrollToSection(section.id)"
                    class="w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 flex items-center gap-2"
                    :class="
                      activeSection === section.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    "
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200"
                      :class="activeSection === section.id ? 'bg-primary' : 'bg-gray-300'"
                    />
                    {{ section.title }}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        <!-- Contenido principal -->
        <main class="space-y-4">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
