<script setup lang="ts">
const props = defineProps({
  categories: {
    type: Array,
    required: true,
    // Cada categoría debe tener: { id, label, icon, count }
  },
  modelValue: {
    type: String,
    default: 'all'
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

const emit = defineEmits(['update:modelValue', 'search', 'no-results-click'])

const searchQuery = defineModel('searchQuery', { type: String, default: '' })
const hasNoResults = defineModel('hasNoResults', { type: Boolean, default: false })

const selectedCategory = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleSearch = (event) => {
  emit('search', event.target.value)
}

const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <div class="bg-white border-b border-gray-200 shadow-sm">
    <div class="mx-auto container px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row lg:items-center gap-4 py-4">
        <!-- Categorías -->
        <div class="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectedCategory = cat.id"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all',
              selectedCategory === cat.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            <span v-if="cat.icon">{{ cat.icon }}</span>
            <span>{{ cat.label }}</span>
            <span :class="[
              'px-2 py-0.5 rounded-full text-xs font-semibold',
              selectedCategory === cat.id ? 'bg-white/20' : 'bg-gray-200'
            ]">
              {{ typeof cat.count === 'number' ? cat.count : cat.count?.value || 0 }}
            </span>
          </button>
        </div>

        <!-- Buscador -->
        <div v-if="showSearch" class="relative lg:w-72">
          <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="search"
            :placeholder="searchPlaceholder"
            @input="handleSearch"
            class="block w-full pl-9 pr-9 py-2 text-sm text-gray-900 placeholder-gray-500 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mensaje sin resultados -->
      <div v-if="showSearch && hasNoResults" class="pb-4 -mt-2">
        <p class="text-sm text-gray-500">
          No encontramos resultados para "<span class="font-medium">{{ searchQuery }}</span>".
          <button @click="emit('no-results-click')" class="text-primary font-semibold hover:underline">Pregúntanos directamente</button>
        </p>
      </div>
    </div>
  </div>
</template>
