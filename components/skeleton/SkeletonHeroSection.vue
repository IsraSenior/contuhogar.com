<script setup lang="ts">
/**
 * Skeleton para HeroSection generico (paginas internas)
 * Replica estructura de HeroSection.vue
 * Soporta variantes: primary (oscuro) y muted (claro)
 */

interface Props {
  showBadge?: boolean
  showSearchBar?: boolean
  variant?: 'primary' | 'muted'
}

const props = withDefaults(defineProps<Props>(), {
  showBadge: false,
  showSearchBar: false,
  variant: 'primary'
})

const shimmerClass = computed(() => {
  return props.variant === 'primary' ? 'skeleton-shimmer-light' : 'skeleton-shimmer'
})

const bgClass = computed(() => {
  return props.variant === 'primary'
    ? 'bg-linear-to-br from-primary via-primary to-primary/90'
    : 'bg-muted'
})
</script>

<template>
  <div :class="bgClass">
    <div class="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div class="text-center">
        <!-- Badge opcional -->
        <div v-if="showBadge" class="flex justify-center mb-6">
          <div :class="['h-8 w-64 rounded-lg', shimmerClass]" />
        </div>

        <!-- Titulo principal (2 lineas, responsive) -->
        <div class="space-y-3 max-w-3xl mx-auto">
          <div :class="['h-10 sm:h-12 lg:h-14 w-full rounded-lg mx-auto', shimmerClass]" />
          <div :class="['h-10 sm:h-12 lg:h-14 w-4/5 rounded-lg mx-auto', shimmerClass]" />
        </div>

        <!-- Subtitulo (2 lineas) -->
        <div class="mt-6 space-y-2 max-w-2xl mx-auto">
          <div :class="['h-5 w-full rounded mx-auto', shimmerClass]" />
          <div :class="['h-5 w-3/4 rounded mx-auto', shimmerClass]" />
        </div>

        <!-- Search bar opcional -->
        <div v-if="showSearchBar" class="mt-10 max-w-2xl mx-auto">
          <div :class="['h-14 w-full rounded-xl', shimmerClass]" />
        </div>
      </div>
    </div>
  </div>
</template>
