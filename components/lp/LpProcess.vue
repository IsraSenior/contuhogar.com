<script setup lang="ts">
interface Step {
  number: string | number
  title: string
  description: string
}

defineProps<{
  steps: Step[]
}>()

const scrollToForm = () => {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative bg-primary py-16 lg:py-20 overflow-hidden">
    <!-- Imagen de fondo con overlay -->
    <div class="absolute inset-0" aria-hidden="true">
      <NuxtImg
        src="/images/familia-llaves-mudanza.jpg"
        alt=""
        class="w-full h-full object-cover opacity-10"
        loading="lazy"
        format="webp"
      />
    </div>

    <div class="relative container mx-auto px-4 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-14">
        <h2 class="text-3xl md:text-4xl font-bold text-white">
          Tu camino a casa en 4 pasos
        </h2>
        <p class="mt-3 text-white/60 text-lg">Así de simple es el proceso</p>
      </div>

      <!-- Steps grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="relative flex flex-col items-center text-center"
        >
          <!-- Connector line (desktop only, not on last item) -->
          <div
            v-if="index < steps.length - 1"
            class="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-px bg-white/15"
            aria-hidden="true"
          />

          <!-- Step number circle - naranja -->
          <div class="relative w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center text-2xl font-bold mb-5 shrink-0 shadow-lg shadow-secondary/30">
            {{ step.number }}
          </div>

          <!-- Step content -->
          <h3 class="text-lg font-bold text-white mb-2">
            {{ step.title }}
          </h3>
          <p class="text-white/70 text-base leading-relaxed max-w-xs">
            {{ step.description }}
          </p>
        </div>
      </div>

      <!-- Re-engagement CTA -->
      <div class="mt-14 text-center">
        <p class="text-white/70 text-lg mb-5">¿Listo para dar el primer paso?</p>
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white rounded-xl font-bold text-lg hover:bg-secondary/90 transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary shadow-lg shadow-secondary/30"
          @click="scrollToForm"
        >
          Solicitar asesoría gratuita
        </button>
        <p class="mt-3 text-white/50 text-sm">Sin compromiso · Respuesta en 24 h · 100% remoto</p>
      </div>
    </div>
  </section>
</template>
