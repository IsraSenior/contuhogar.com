<script setup lang="ts">
/**
 * Componente de testimonios con carrusel animado
 * - Desktop/Tablet: 3 columnas verticales con animaciones intercaladas
 * - Mobile: Carrusel horizontal infinito con todos los testimonios + drag/swipe
 * - Hover global: Pausa todas las animaciones al hacer hover
 */

interface Testimonial {
  quote: string
  name: string
  handle?: string
  avatar?: string
  location?: string
}

interface Props {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Lo que dicen nuestros clientes',
  subtitle: 'Historias reales de colombianos que cumplieron su sueño de tener vivienda propia'
})

// Estado para pausar todas las animaciones con hover global
const isPaused = ref(false)

// ===== Mobile Drag/Swipe State =====
const mobileCarouselRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragCurrentX = ref(0)
const dragOffset = ref(0) // Accumulated offset from previous drags

// Get current animation offset by reading computed style
const getAnimationOffset = (): number => {
  if (!mobileCarouselRef.value) return 0
  const style = window.getComputedStyle(mobileCarouselRef.value)
  const matrix = new DOMMatrix(style.transform)
  return matrix.m41 // translateX value
}

// Touch event handlers for mobile drag
const handleTouchStart = (e: TouchEvent) => {
  if (!mobileCarouselRef.value) return

  isDragging.value = true
  isPaused.value = true
  dragStartX.value = e.touches[0].clientX

  // Capture current animation position as starting offset
  dragOffset.value = getAnimationOffset()
  dragCurrentX.value = 0
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value || !mobileCarouselRef.value) return

  const currentX = e.touches[0].clientX
  dragCurrentX.value = currentX - dragStartX.value

  // Apply manual transform (offset from animation + drag delta)
  const totalOffset = dragOffset.value + dragCurrentX.value
  mobileCarouselRef.value.style.transform = `translateX(${totalOffset}px)`
}

const handleTouchEnd = () => {
  if (!isDragging.value || !mobileCarouselRef.value) return

  isDragging.value = false

  // Calculate final position
  const totalOffset = dragOffset.value + dragCurrentX.value
  const carouselWidth = mobileCarouselRef.value.scrollWidth / 2 // Half because content is duplicated

  // Normalize offset to be within bounds (for infinite loop effect)
  let normalizedOffset = totalOffset % carouselWidth
  if (normalizedOffset > 0) {
    normalizedOffset = normalizedOffset - carouselWidth
  }

  // Calculate what percentage of the animation we're at
  // Animation goes from 0 to -50% (which is -carouselWidth)
  const animationProgress = Math.abs(normalizedOffset) / carouselWidth

  // Set animation delay to resume from current position
  // Animation duration is dynamic based on number of testimonials
  const animationDelay = -(animationProgress * animationDuration.value)
  mobileCarouselRef.value.style.animationDelay = `${animationDelay}s`

  // Clear manual transform and let CSS animation take over
  mobileCarouselRef.value.style.transform = ''

  // Resume animation after a brief moment
  setTimeout(() => {
    isPaused.value = false
  }, 50)
}

// Dividir testimonios en 3 columnas para desktop
const column1 = computed(() => {
  return props.testimonials.filter((_, idx) => idx % 3 === 0)
})

const column2 = computed(() => {
  return props.testimonials.filter((_, idx) => idx % 3 === 1)
})

const column3 = computed(() => {
  return props.testimonials.filter((_, idx) => idx % 3 === 2)
})

// Duplicar para efecto infinito en columnas verticales
const duplicatedColumn1 = computed(() => [...column1.value, ...column1.value])
const duplicatedColumn2 = computed(() => [...column2.value, ...column2.value])
const duplicatedColumn3 = computed(() => [...column3.value, ...column3.value])

// Duplicar testimonios para efecto infinito en mobile horizontal
// La duplicación permite que cuando el primer set se vaya, el segundo ya esté visible
const duplicatedAll = computed(() => [...props.testimonials, ...props.testimonials])

// Velocidad del marquee: segundos que tarda cada tarjeta en pasar completamente
// La duración total se calcula: cantidad de tarjetas * segundos por tarjeta
// Esto garantiza velocidad constante sin importar cuántos testimoniales haya
const secondsPerCard = 2 // Cada tarjeta tarda 2 segundos en pasar
const animationDuration = computed(() => props.testimonials.length * secondsPerCard)
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

      <!-- Mobile: Carrusel horizontal infinito con drag/swipe -->
      <div
        class="md:hidden relative overflow-hidden touch-pan-y"
        :class="{ 'marquee-container-paused': isPaused }"
        @mouseenter="isPaused = true"
        @mouseleave="isPaused = false"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @touchcancel="handleTouchEnd"
      >
        <!-- Gradiente izquierdo -->
        <div class="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <!-- Gradiente derecho -->
        <div class="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div
          ref="mobileCarouselRef"
          class="marquee-horizontal flex gap-4 py-4"
          :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
          :style="{ animationDuration: `${animationDuration}s` }"
        >
          <div
            v-for="(testimonial, idx) in duplicatedAll"
            :key="`mobile-${idx}`"
            class="shrink-0 w-72"
          >
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
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

      <!-- Desktop/Tablet: Columnas verticales -->
      <div
        class="hidden md:block relative h-[600px] lg:h-[700px] overflow-hidden"
        :class="{ 'marquee-container-paused': isPaused }"
        @mouseenter="isPaused = true"
        @mouseleave="isPaused = false"
      >
        <!-- Gradiente superior -->
        <div class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <!-- Gradiente inferior -->
        <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div class="grid grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          <!-- Columna 1: Scroll hacia arriba (solo lg) -->
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

          <!-- Columna 3: Scroll hacia arriba lento -->
          <div class="relative overflow-hidden">
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
            <strong class="text-primary">+3.000</strong> colombianos cumplieron su sueño con nosotros
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
