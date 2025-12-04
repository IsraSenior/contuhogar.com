<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  primaryCta: {
    type: Object,
    default: () => ({ text: '', to: '' })
  },
  secondaryCta: {
    type: Object,
    default: () => null
  },
  benefits: {
    type: Array,
    default: () => []
  },
  image: {
    type: String,
    default: 'https://img.freepik.com/foto-gratis/mira-compramos-casa_637285-12424.jpg'
  },
  imageAlt: {
    type: String,
    default: 'Familia feliz celebrando'
  }
})
</script>

<template>
  <div class="bg-white">
    <div class="container mx-auto py-16 px-6 lg:px-8">
      <div class="relative isolate overflow-hidden bg-secondary px-6 py-12 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-12 lg:px-16">
        <!-- Grid de 12 columnas para proporciones precisas -->
        <div class="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
          <!-- Contenido principal - 7 columnas -->
          <div class="text-center lg:text-left lg:col-span-7">
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-2xl">
              <slot name="title">{{ title }}</slot>
            </h2>
            <p v-if="description || $slots.description" class="mt-4 text-lg text-white/90 max-w-2xl">
              <slot name="description">{{ description }}</slot>
            </p>

            <!-- Botones CTA -->
            <div class="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <NuxtLink
                v-if="primaryCta?.to"
                :to="primaryCta.to"
                class="w-full sm:w-auto rounded-lg bg-white px-6 py-3 text-base font-semibold text-secondary shadow-lg hover:bg-gray-50 transition-colors text-center"
              >
                {{ primaryCta.text }}
              </NuxtLink>
              <NuxtLink
                v-if="secondaryCta?.to"
                :to="secondaryCta.to"
                class="w-full sm:w-auto rounded-lg border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors text-center"
              >
                {{ secondaryCta.text }}
              </NuxtLink>
            </div>

            <!-- Beneficios con checkmarks -->
            <div v-if="benefits.length > 0" class="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-white/80">
              <div v-for="(benefit, index) in benefits" :key="index" class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                {{ benefit }}
              </div>
            </div>

            <!-- Slot para beneficios personalizados -->
            <slot name="benefits"></slot>
          </div>

          <!-- Imagen decorativa - 5 columnas (solo desktop) -->
          <div v-if="image" class="relative mt-8 lg:mt-0 hidden lg:block lg:col-span-5">
            <NuxtImg
              class="w-full rounded-xl shadow-2xl ring-1 ring-white/10 object-cover aspect-4/3"
              :src="image"
              :alt="imageAlt"
              format="webp"
              quality="80"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Slot para imagen personalizada -->
        <slot name="image"></slot>
      </div>
    </div>
  </div>
</template>
