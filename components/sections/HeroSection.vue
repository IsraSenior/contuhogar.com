<script setup>
const props = defineProps({
  badge: {
    type: String,
    default: ''
  },
  badgeIcon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  benefits: {
    type: Array,
    default: () => []
  },
  showSearch: {
    type: Boolean,
    default: false
  },
  searchPlaceholder: {
    type: String,
    default: 'Buscar...'
  }
})

const emit = defineEmits(['search', 'no-results-click'])

const searchQuery = defineModel('searchQuery', { type: String, default: '' })
const hasNoResults = defineModel('hasNoResults', { type: Boolean, default: false })

const handleSearch = (event) => {
  emit('search', event.target.value)
}
</script>

<template>
  <div class="bg-linear-to-br from-primary via-primary to-primary/90 text-white">
    <div class="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div class="text-center">
        <!-- Badge opcional -->
        <div v-if="badge" class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm font-medium mb-6">
          <svg v-if="badgeIcon" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
          </svg>
          {{ badge }}
        </div>

        <!-- Título principal -->
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <slot name="title">{{ title }}</slot>
        </h1>

        <!-- Subtítulo -->
        <p v-if="subtitle || $slots.subtitle" class="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>

        <!-- Beneficios con checkmarks -->
        <ul v-if="benefits.length > 0" class="mt-6 space-y-2 text-sm text-white/90 max-w-2xl mx-auto">
          <li v-for="(benefit, index) in benefits" :key="index" class="flex items-start gap-2 justify-center">
            <svg class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>{{ benefit }}</span>
          </li>
        </ul>

        <!-- Slot para beneficios personalizados -->
        <slot name="benefits"></slot>

        <!-- Barra de búsqueda opcional -->
        <div v-if="showSearch" class="mt-10 max-w-2xl mx-auto">
          <div class="relative">
            <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="search"
              :placeholder="searchPlaceholder"
              @input="handleSearch"
              class="block w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-secondary outline-none"
            />
          </div>
          <p v-if="hasNoResults" class="mt-3 text-sm text-white/80">
            No encontramos resultados. <button @click="emit('no-results-click')" class="underline font-semibold">Pregúntanos directamente</button>
          </p>
        </div>

        <!-- Slot adicional para contenido personalizado -->
        <slot name="extra"></slot>
      </div>
    </div>
  </div>
</template>
