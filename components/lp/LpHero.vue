<script setup lang="ts">
interface Props {
  headline: string
  subheadline: string
  ctaPrimaryText?: string
  ctaSecondaryText?: string
  urgencyText?: string
  image?: string
  simulatorSlug?: string  // slug de la landing para tracking, ej: "peru-emocional"
}

const props = withDefaults(defineProps<Props>(), {
  ctaPrimaryText: 'Quiero que me contacten',
  ctaSecondaryText: 'O simula tu crédito',
  image: '/images/familia-nueva-casa.jpg',
  simulatorSlug: ''
})

const simulatorUrl = computed(() => {
  const base = '/simulador/credito'
  if (!props.simulatorSlug) return base
  const params = new URLSearchParams({
    utm_source: 'meta_ads',
    utm_medium: 'cpc',
    utm_campaign: 'lp',
    utm_content: props.simulatorSlug
  })
  return `${base}?${params.toString()}`
})

const scrollToForm = () => {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative bg-primary overflow-hidden">
    <div class="container mx-auto px-4 lg:px-8 py-14 md:py-20 lg:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

        <!-- Columna izquierda: Contenido (col-span-7) -->
        <div class="lg:col-span-7 text-center lg:text-left">
          <!-- Badge de urgencia -->
          <div v-if="urgencyText" class="mb-6">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium border border-white/15">
              <svg class="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              {{ urgencyText }}
            </span>
          </div>

          <!-- Headline H1 -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight text-pretty">
            {{ headline }}
          </h1>

          <!-- Subheadline -->
          <p class="mt-5 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {{ subheadline }}
          </p>

          <!-- CTAs -->
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <!-- CTA Primario - Naranja, scroll al formulario -->
            <button
              type="button"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-secondary text-white rounded-xl font-bold text-lg hover:bg-secondary/90 transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary shadow-lg shadow-secondary/30"
              @click="scrollToForm"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {{ ctaPrimaryText }}
            </button>

            <!-- CTA Secundario - Outline blanco, link al simulador con tracking -->
            <NuxtLink
              :to="simulatorUrl"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white/80 rounded-xl font-medium text-base hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            >
              {{ ctaSecondaryText }}
            </NuxtLink>
          </div>

          <!-- Trust indicators con checkmarks naranjas -->
          <div class="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-white/80">
            <span class="inline-flex items-center gap-1.5">
              <svg class="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Sin costo
            </span>
            <span class="inline-flex items-center gap-1.5">
              <svg class="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Respuesta en 24 h
            </span>
            <span class="inline-flex items-center gap-1.5">
              <svg class="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              100% en línea
            </span>
          </div>
        </div>

        <!-- Columna derecha: Imagen (col-span-5) -->
        <div class="lg:col-span-5 relative">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
            <NuxtImg
              :src="image"
              :alt="headline"
              width="600"
              height="500"
              class="w-full h-72 sm:h-80 lg:h-[28rem] object-cover"
              loading="eager"
              format="webp"
            />
            <!-- Overlay gradiente sutil en el borde inferior -->
            <div class="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" aria-hidden="true" />

            <!-- Badge flotante "100% en línea" -->
            <div class="absolute top-4 right-4 px-3 py-1.5 bg-white rounded-lg shadow-lg flex items-center gap-1.5">
              <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
              <span class="text-xs font-bold text-primary">100% en línea</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </section>
</template>
