<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array,
    required: true,
    // items: [{ title: '', content: '', icon: '' }]
  },
  multiple: {
    type: Boolean,
    default: false // permite múltiples secciones abiertas
  },
  defaultOpen: {
    type: Number,
    default: null // índice de la sección abierta por defecto
  }
})

const openSections = ref(new Set(props.defaultOpen !== null ? [props.defaultOpen] : []))

// Mapeo de nombres de iconos a SVG paths
const iconPaths = {
  document: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  clipboard: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  sparkles: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  check: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
}

const getIconPath = (iconName) => iconPaths[iconName] || iconPaths.document

const toggleSection = (index) => {
  if (props.multiple) {
    // Modo múltiple: permite abrir/cerrar independientemente
    if (openSections.value.has(index)) {
      openSections.value.delete(index)
    } else {
      openSections.value.add(index)
    }
  } else {
    // Modo single: solo una sección abierta a la vez
    if (openSections.value.has(index)) {
      openSections.value.clear()
    } else {
      openSections.value.clear()
      openSections.value.add(index)
    }
  }
}

const isOpen = (index) => openSections.value.has(index)

defineExpose({ openSections, toggleSection, isOpen })
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all duration-200 hover:shadow-md"
    >
      <!-- Header (clickeable) -->
      <button
        @click="toggleSection(index)"
        :aria-expanded="isOpen(index)"
        :aria-controls="`accordion-panel-${index}`"
        :id="`accordion-header-${index}`"
        class="w-full px-6 py-4 flex items-center justify-between text-left transition-colors duration-200"
        :class="[
          isOpen(index)
            ? 'bg-primary/5 border-b border-gray-200'
            : 'bg-white hover:bg-gray-50'
        ]"
      >
        <div class="flex items-center gap-4 flex-1">
          <!-- Icono SVG -->
          <div
            class="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
            :class="[
              isOpen(index)
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(item.icon)" />
            </svg>
          </div>

          <!-- Título -->
          <h3
            class="text-lg font-semibold transition-colors duration-200"
            :class="[
              isOpen(index) ? 'text-primary' : 'text-gray-900'
            ]"
          >
            {{ item.title }}
          </h3>
        </div>

        <!-- Chevron -->
        <svg
          class="w-5 h-5 transition-transform duration-200 shrink-0 ml-4"
          :class="[
            isOpen(index) ? 'rotate-180 text-primary' : 'text-gray-400'
          ]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <!-- Contenido (expandible) -->
      <Transition
        name="accordion"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @leave="onLeave"
      >
        <div
          v-if="isOpen(index)"
          class="accordion-content"
          :id="`accordion-panel-${index}`"
          :aria-labelledby="`accordion-header-${index}`"
          role="region"
        >
          <div class="px-6 py-5 prose prose-lg max-w-none text-gray-600">
            <div v-html="item.content"></div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
// Animaciones de altura dinámica
const onEnter = (el) => {
  el.style.height = '0'
  el.offsetHeight // fuerza reflow
  el.style.height = el.scrollHeight + 'px'
}

const onAfterEnter = (el) => {
  el.style.height = 'auto'
}

const onLeave = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.offsetHeight // fuerza reflow
  el.style.height = '0'
}
</script>

<style scoped>
.accordion-content {
  overflow: hidden;
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Estilos para el contenido HTML */
:deep(.prose) {
  color: #4b5563;
}

:deep(.prose ol),
:deep(.prose ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

:deep(.prose li) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

:deep(.prose a) {
  color: var(--primary-color);
  text-decoration: underline;
  transition: color 0.2s;
}

:deep(.prose a:hover) {
  color: var(--secondary-color);
}

:deep(.prose p) {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

:deep(.prose .font-semibold) {
  color: #1f2937;
  font-weight: 600;
}
</style>
