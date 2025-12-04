<script setup>
/**
 * Componente de testimonios con carrusel vertical animado
 * 3 columnas con animaciones intercaladas (arriba, abajo, arriba)
 */
const props = defineProps({
  title: {
    type: String,
    default: 'Lo que dicen nuestros clientes'
  },
  subtitle: {
    type: String,
    default: 'Historias reales de colombianos que cumplieron su sueño de tener vivienda propia'
  },
  testimonials: {
    type: Array,
    required: true
    // { quote, name, handle, avatar, location }
  }
})

// Dividir testimonios en 3 columnas
const column1 = computed(() => {
  return props.testimonials.filter((_, idx) => idx % 3 === 0)
})

const column2 = computed(() => {
  return props.testimonials.filter((_, idx) => idx % 3 === 1)
})

const column3 = computed(() => {
  return props.testimonials.filter((_, idx) => idx % 3 === 2)
})

// Duplicar para efecto infinito
const duplicatedColumn1 = computed(() => [...column1.value, ...column1.value])
const duplicatedColumn2 = computed(() => [...column2.value, ...column2.value])
const duplicatedColumn3 = computed(() => [...column3.value, ...column3.value])
</script>

<template>
  <section class="bg-gray-50 py-20 lg:py-28 overflow-hidden">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-base font-semibold text-secondary mb-3">Testimonios</h2>
        <p class="text-3xl lg:text-4xl font-bold text-primary mb-4">
          {{ title }}
        </p>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ subtitle }}
        </p>
      </div>

      <!-- Columnas de testimonios -->
      <div class="relative h-[600px] lg:h-[700px] overflow-hidden">
        <!-- Gradiente superior -->
        <div class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <!-- Gradiente inferior -->
        <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          <!-- Columna 1: Scroll hacia arriba -->
          <div class="relative overflow-hidden hidden lg:block">
            <div class="marquee-up">
              <div
                v-for="(testimonial, idx) in duplicatedColumn1"
                :key="`col1-${idx}`"
                class="mb-6"
              >
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                  <blockquote class="text-gray-700 text-sm leading-relaxed mb-4">
                    "{{ testimonial.quote }}"
                  </blockquote>
                  <div class="flex items-center gap-3">
                    <NuxtImg
                      v-if="testimonial.avatar"
                      :src="testimonial.avatar"
                      :alt="testimonial.name"
                      class="w-10 h-10 rounded-full object-cover bg-gray-100"
                      format="webp"
                      quality="75"
                      loading="lazy"
                    />
                    <div v-else class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span class="text-primary font-semibold text-sm">{{ testimonial.name.charAt(0) }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-semibold text-gray-900 text-sm truncate">{{ testimonial.name }}</p>
                      <p v-if="testimonial.location" class="text-xs text-gray-500 truncate">{{ testimonial.location }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Columna 2: Scroll hacia abajo -->
          <div class="relative overflow-hidden">
            <div class="marquee-down">
              <div
                v-for="(testimonial, idx) in duplicatedColumn2"
                :key="`col2-${idx}`"
                class="mb-6"
              >
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                  <blockquote class="text-gray-700 text-sm leading-relaxed mb-4">
                    "{{ testimonial.quote }}"
                  </blockquote>
                  <div class="flex items-center gap-3">
                    <NuxtImg
                      v-if="testimonial.avatar"
                      :src="testimonial.avatar"
                      :alt="testimonial.name"
                      class="w-10 h-10 rounded-full object-cover bg-gray-100"
                      format="webp"
                      quality="75"
                      loading="lazy"
                    />
                    <div v-else class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span class="text-primary font-semibold text-sm">{{ testimonial.name.charAt(0) }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-semibold text-gray-900 text-sm truncate">{{ testimonial.name }}</p>
                      <p v-if="testimonial.location" class="text-xs text-gray-500 truncate">{{ testimonial.location }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Columna 3: Scroll hacia arriba -->
          <div class="relative overflow-hidden hidden md:block">
            <div class="marquee-up-slow">
              <div
                v-for="(testimonial, idx) in duplicatedColumn3"
                :key="`col3-${idx}`"
                class="mb-6"
              >
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                  <blockquote class="text-gray-700 text-sm leading-relaxed mb-4">
                    "{{ testimonial.quote }}"
                  </blockquote>
                  <div class="flex items-center gap-3">
                    <NuxtImg
                      v-if="testimonial.avatar"
                      :src="testimonial.avatar"
                      :alt="testimonial.name"
                      class="w-10 h-10 rounded-full object-cover bg-gray-100"
                      format="webp"
                      quality="75"
                      loading="lazy"
                    />
                    <div v-else class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span class="text-primary font-semibold text-sm">{{ testimonial.name.charAt(0) }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-semibold text-gray-900 text-sm truncate">{{ testimonial.name }}</p>
                      <p v-if="testimonial.location" class="text-xs text-gray-500 truncate">{{ testimonial.location }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Badge de confianza -->
      <div class="text-center mt-12">
        <div class="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-100">
          <div class="flex -space-x-2">
            <div class="w-8 h-8 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center">
              <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="w-8 h-8 rounded-full bg-secondary/10 border-2 border-white flex items-center justify-center">
              <svg class="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <span class="text-sm text-gray-600">
            <strong class="text-primary">+1,500</strong> colombianos cumplieron su sueño con nosotros
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes marquee-down {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
}

.marquee-up {
  animation: marquee-up 40s linear infinite;
}

.marquee-up:hover {
  animation-play-state: paused;
}

.marquee-down {
  animation: marquee-down 35s linear infinite;
}

.marquee-down:hover {
  animation-play-state: paused;
}

.marquee-up-slow {
  animation: marquee-up 45s linear infinite;
}

.marquee-up-slow:hover {
  animation-play-state: paused;
}

/* Reduce motion para accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .marquee-up,
  .marquee-down,
  .marquee-up-slow {
    animation: none;
  }
}
</style>
