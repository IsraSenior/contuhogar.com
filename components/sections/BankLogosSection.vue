<script setup lang="ts">
import { useMainStore, type PartnerLogo } from '@/stores/index'

const store = useMainStore()

const props = defineProps({
  title: {
    type: String,
    default: 'Respaldo estratégico para invertir con confianza en Colombia'
  },
  subtitle: {
    type: String,
    default: 'Nuestras alianzas estratégicas nos permiten ofrecerte las mejores opciones de financiamiento, tiempos, solidez y respaldo para la inversión de tu hogar en Colombia.'
  },
  trustMessage: {
    type: String,
    default: 'Más de 16 años de experiencia conectando colombianos en el exterior con su verdadero hogar.'
  },
  logos: {
    type: Array as PropType<PartnerLogo[]>,
    default: () => null
  }
})

const displayLogos = computed(() => props.logos || store.logos)
</script>

<template>
  <div class="bg-white py-16">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- Header de la sección -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">
          <slot name="title">{{ title }}</slot>
        </h2>
        <p v-if="subtitle || $slots.subtitle" class="text-lg text-gray-600 max-w-2xl mx-auto">
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
      </div>

      <!-- Grid de logos -->
      <div class="flex flex-wrap justify-center gap-8 items-center">
        <div
          v-for="(logo, idx) in displayLogos"
          :key="idx"
          class="flex items-center justify-center p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group h-20 w-40"
        >
          <!-- Logo de texto -->
          <span
            v-if="logo.type === 'text'"
            class="text-xl font-bold text-gray-600 group-hover:text-primary transition-colors"
          >
            {{ logo.value }}
          </span>
          <!-- Logo de imagen -->
          <NuxtImg
            v-else
            :src="logo.value"
            :alt="logo.name"
            class="h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Trust message -->
      <div v-if="trustMessage || $slots.trustMessage" class="mt-12 text-center">
        <p class="text-sm text-gray-500 flex items-center justify-center gap-2">
          <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span>
            <slot name="trustMessage">{{ trustMessage }}</slot>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
