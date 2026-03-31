<script setup lang="ts">
interface Props {
  text?: string
  microcopy?: string
}

withDefaults(defineProps<Props>(), {
  text: 'Hablar con un asesor',
  microcopy: 'Sin compromiso · Respuesta en 24h'
})

const scrollToForm = () => {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom)]">
    <!-- Gradient fade -->
    <div class="bg-gradient-to-t from-white via-white to-transparent pt-4 px-4 pb-4">
      <!-- Microcopy -->
      <p v-if="microcopy" class="text-xs text-gray-500 text-center mb-2">
        {{ microcopy }}
      </p>

      <!-- CTA Button -->
      <button
        type="button"
        class="block w-full py-3.5 bg-secondary text-white text-center font-semibold text-base rounded-xl shadow-lg shadow-secondary/25 hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        @click="scrollToForm"
      >
        {{ text }}
      </button>
    </div>
  </div>
</template>
