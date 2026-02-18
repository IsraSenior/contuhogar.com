<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Recursos útiles'
  },
  resources: {
    type: Array,
    required: true,
    // Cada recurso debe tener: { label, to }
  }
})
</script>

<template>
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <h3 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
      <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
      </svg>
      <slot name="title">{{ title }}</slot>
    </h3>
    <ul class="space-y-3">
      <li v-for="(resource, index) in resources" :key="index">
        <NuxtLink
          :to="resource.to"
          class="text-sm text-primary hover:text-secondary font-medium flex items-center gap-2 transition-colors"
        >
          <span>→</span>
          {{ resource.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
