<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Buscar...'
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

const searchQuery = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    emit('search', value)
  }
})
</script>

<template>
  <div class="relative">
    <label for="searchbar-input" class="sr-only">Buscar</label>
    <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </div>
    <input
      id="searchbar-input"
      name="searchbar-input"
      v-model="searchQuery"
      type="search"
      :placeholder="placeholder"
      class="block w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-secondary outline-none"
    />
  </div>
</template>
