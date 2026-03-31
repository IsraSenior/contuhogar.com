<script setup lang="ts">
interface Props {
  quote: string
  name: string
  location: string
  avatar?: string
}

defineProps<Props>()

const scrollToForm = () => {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative py-16 lg:py-24 overflow-hidden">
    <!-- Imagen de fondo con overlay -->
    <div class="absolute inset-0" aria-hidden="true">
      <NuxtImg
        src="/images/personas-leyendo-inversiones.jpg"
        alt=""
        class="w-full h-full object-cover"
        loading="lazy"
        format="webp"
      />
      <div class="absolute inset-0 bg-primary/90" />
    </div>

    <div class="relative container mx-auto px-4 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Decorative quote mark - naranja -->
        <div class="text-secondary/40 text-8xl md:text-9xl font-serif leading-none select-none mb-2" aria-hidden="true">
          &ldquo;
        </div>

        <!-- Quote -->
        <blockquote>
          <p class="text-xl sm:text-2xl md:text-3xl font-medium italic text-white leading-relaxed -mt-10">
            {{ quote }}
          </p>
        </blockquote>

        <!-- Linea decorativa naranja -->
        <div class="mt-8 mx-auto w-16 h-1 bg-secondary rounded-full" aria-hidden="true" />

        <!-- Attribution -->
        <div class="mt-6 flex items-center justify-center gap-3">
          <!-- Avatar -->
          <NuxtImg
            v-if="avatar"
            :src="avatar"
            :alt="name"
            width="48"
            height="48"
            class="w-12 h-12 rounded-full object-cover ring-2 ring-secondary/50"
            loading="lazy"
          />

          <div :class="avatar ? 'text-left' : 'text-center'">
            <p class="text-white font-semibold text-lg">
              {{ name }}
            </p>
            <p class="text-white/60 text-sm">
              {{ location }}
            </p>
          </div>
        </div>

        <!-- Micro-CTA -->
        <div class="mt-8">
          <button
            type="button"
            class="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
            @click="scrollToForm"
          >
            Quiero mi asesoría gratuita
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
