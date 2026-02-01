<script setup lang="ts">
import type { Service } from '~/stores/index'

/**
 * Variantes de visualización de la tarjeta
 */
type ServiceCardVariant = 'default' | 'featured'

/**
 * Props del componente ServiceCard
 */
interface ServiceCardProps {
  service: Service
  variant?: ServiceCardVariant
}

const props = withDefaults(defineProps<ServiceCardProps>(), {
  variant: 'default'
})

const cardClasses = computed(() => {
  return props.variant === 'featured'
    ? 'bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20'
    : 'bg-white border border-gray-100'
})
</script>

<template>
  <NuxtLink
    :to="`/servicios${service.href || service.slug}`"
    :class="['group relative block rounded-2xl p-6 hover:shadow-lg transition-all', cardClasses]"
  >
    <!-- Imagen -->
    <div v-if="service.image" class="relative aspect-video mb-4 overflow-hidden rounded-xl">
      <NuxtImg
        :src="service.image"
        :alt="service.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        format="webp"
        quality="80"
        loading="lazy"
      />
    </div>

    <!-- Título -->
    <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
      {{ service.title }}
    </h3>

    <!-- Descripción -->
    <p v-if="service.intro || service.description" class="text-sm text-gray-600 line-clamp-3 mb-4">
      {{ service.intro || service.description }}
    </p>

    <!-- CTA -->
    <div class="flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
      <span>Ver más</span>
      <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </div>
  </NuxtLink>
</template>
