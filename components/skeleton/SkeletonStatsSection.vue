<script setup lang="ts">
/**
 * Skeleton para la seccion de estadisticas
 * Replica estructura de StatsSection.vue
 * Props: count (default 4), variant (default 'muted')
 */
interface Props {
  count?: number
  variant?: 'white' | 'muted' | 'primary'
}

const props = withDefaults(defineProps<Props>(), {
  count: 4,
  variant: 'muted'
})

// Clases segun variante (misma logica que StatsSection)
const sectionClasses = computed(() => {
  const base = 'py-12 lg:py-16'
  const variants = {
    white: 'bg-white border-b border-gray-100',
    muted: 'bg-gray-50 border-b border-gray-100',
    primary: 'bg-primary'
  }
  return `${base} ${variants[props.variant]}`
})

// Usar shimmer light en fondo primary
const shimmerClass = computed(() =>
  props.variant === 'primary' ? 'skeleton-shimmer-light' : 'skeleton-shimmer'
)
</script>

<template>
  <section :class="sectionClasses">
    <div class="mx-auto container px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="i in count" :key="i" class="text-center">
          <!-- Numero grande -->
          <div :class="['h-10 lg:h-12 w-20 mx-auto rounded-lg', shimmerClass]" />
          <!-- Label -->
          <div :class="['h-4 w-32 mx-auto mt-2 rounded', shimmerClass]" />
          <!-- Descripcion -->
          <div :class="['h-3 w-40 mx-auto mt-1 rounded', shimmerClass]" />
        </div>
      </div>
    </div>
  </section>
</template>
