<script setup lang="ts">
/**
 * Skeleton para tarjeta de servicio
 * Replica estructura de ServiceCard.vue
 * Fondo blanco - usa skeleton-shimmer standard
 */
</script>

<template>
  <div class="bg-white rounded-2xl p-6 border border-gray-100">
    <!-- Imagen -->
    <div class="relative aspect-video mb-4 overflow-hidden rounded-xl">
      <div class="w-full h-full skeleton-shimmer" />
    </div>

    <!-- Titulo -->
    <div class="h-7 w-3/4 skeleton-shimmer rounded mt-5 mb-3" />

    <!-- Descripcion (3 lineas) -->
    <div class="space-y-2 mb-4">
      <div class="h-4 w-full skeleton-shimmer rounded" />
      <div class="h-4 w-full skeleton-shimmer rounded" />
      <div class="h-4 w-2/3 skeleton-shimmer rounded" />
    </div>

    <!-- CTA -->
    <div class="h-4 w-20 skeleton-shimmer rounded mt-4" />
  </div>
</template>
