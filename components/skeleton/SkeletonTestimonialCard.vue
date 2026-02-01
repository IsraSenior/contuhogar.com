<script setup lang="ts">
/**
 * Skeleton para tarjeta de testimonio
 * Replica estructura de testimonios en TestimonialMarquee.vue
 * Fondo blanco - usa skeleton-shimmer standard
 */
</script>

<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <!-- Quote (4 lineas) -->
    <div class="space-y-2 mb-4">
      <div class="h-4 w-full skeleton-shimmer rounded" />
      <div class="h-4 w-full skeleton-shimmer rounded" />
      <div class="h-4 w-full skeleton-shimmer rounded" />
      <div class="h-4 w-3/4 skeleton-shimmer rounded" />
    </div>

    <!-- Avatar y datos -->
    <div class="flex items-center gap-3">
      <!-- Avatar -->
      <div class="w-10 h-10 rounded-full skeleton-shimmer" />
      <!-- Nombre y ubicacion -->
      <div class="flex-1 min-w-0">
        <div class="h-4 w-32 skeleton-shimmer rounded mb-1" />
        <div class="h-3 w-24 skeleton-shimmer rounded" />
      </div>
    </div>
  </div>
</template>
