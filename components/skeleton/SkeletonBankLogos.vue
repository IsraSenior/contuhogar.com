<script setup lang="ts">
/**
 * Skeleton para la seccion de logos de bancos
 * Replica estructura de BankLogosSection.vue
 * Fondo blanco - usa skeleton-shimmer standard
 */
</script>

<template>
  <div class="bg-white py-16">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- Header de la seccion -->
      <div class="text-center mb-12">
        <!-- Titulo -->
        <div class="h-8 w-96 max-w-full skeleton-shimmer rounded-lg mx-auto mb-3" />
        <!-- Subtitulo -->
        <div class="h-5 w-[32rem] max-w-full skeleton-shimmer rounded mx-auto" />
      </div>

      <!-- Grid de logos (6 logos) -->
      <div class="flex flex-wrap justify-center gap-8 items-center">
        <div
          v-for="i in 6"
          :key="i"
          class="flex items-center justify-center p-4 bg-white rounded-xl border border-gray-100 h-20 w-40"
        >
          <div class="h-6 w-24 skeleton-shimmer rounded" />
        </div>
      </div>

      <!-- Trust message -->
      <div class="mt-12 text-center">
        <div class="flex items-center justify-center gap-2">
          <div class="w-5 h-5 skeleton-shimmer rounded-full" />
          <div class="h-4 w-80 max-w-full skeleton-shimmer rounded" />
        </div>
      </div>
    </div>
  </div>
</template>
