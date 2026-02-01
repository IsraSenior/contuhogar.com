<script setup lang="ts">
/**
 * Skeleton para tarjeta de blog
 * Replica estructura de BlogCard.vue
 * Fondo blanco - usa skeleton-shimmer standard
 */

interface Props {
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  featured: false
})

const layoutClasses = computed(() => {
  return props.featured
    ? 'flex flex-col gap-8 lg:flex-row'
    : 'flex flex-col gap-4'
})

const imageClasses = computed(() => {
  return props.featured
    ? 'aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0'
    : 'aspect-video sm:aspect-3/2'
})
</script>

<template>
  <article :class="['relative bg-white p-5 rounded-3xl', layoutClasses]">
    <!-- Imagen -->
    <div :class="['relative overflow-hidden rounded-2xl', imageClasses]">
      <div class="absolute inset-0 skeleton-shimmer" />
    </div>

    <!-- Contenido -->
    <div class="flex-1">
      <!-- Metadata: fecha + categoria -->
      <div class="flex items-center gap-x-4">
        <div class="h-3 w-24 skeleton-shimmer rounded" />
        <div class="h-6 w-16 skeleton-shimmer rounded-full" />
      </div>

      <!-- Titulo (2 lineas) -->
      <div class="mt-3 space-y-2">
        <div class="h-5 w-full skeleton-shimmer rounded" />
        <div class="h-5 w-3/4 skeleton-shimmer rounded" />
      </div>

      <!-- Excerpt (3 lineas) -->
      <div class="mt-5 space-y-2">
        <div class="h-4 w-full skeleton-shimmer rounded" />
        <div class="h-4 w-full skeleton-shimmer rounded" />
        <div class="h-4 w-2/3 skeleton-shimmer rounded" />
      </div>

      <!-- Autor -->
      <div class="mt-6 flex border-t border-gray-100 pt-6">
        <div class="flex items-center gap-x-4">
          <!-- Avatar -->
          <div class="w-10 h-10 skeleton-shimmer rounded-full" />
          <!-- Nombre y rol -->
          <div class="space-y-2">
            <div class="h-3 w-24 skeleton-shimmer rounded" />
            <div class="h-3 w-16 skeleton-shimmer rounded" />
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
