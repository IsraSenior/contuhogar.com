<template>
  <div class="flex justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
    <!-- Botón Anterior -->
    <button
      v-if="showPrevious"
      type="button"
      @click="$emit('prev')"
      :disabled="!canGoPrevious"
      class="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
      :class="canGoPrevious
        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        : 'bg-gray-100 text-gray-400'"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span class="hidden sm:inline">Anterior</span>
    </button>

    <div v-else class="w-24"></div>

    <!-- Botón Siguiente -->
    <button
      v-if="showNext"
      type="button"
      @click="$emit('next')"
      :disabled="!canGoNext"
      class="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
      :class="canGoNext
        ? 'bg-primary text-white hover:shadow-lg hover:scale-105'
        : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
    >
      <span>{{ nextButtonText }}</span>
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    currentStep: number;
    canGoNext?: boolean;
    canGoPrevious?: boolean;
    showNext?: boolean;
    showPrevious?: boolean;
    nextButtonText?: string;
  }>(),
  {
    canGoNext: true,
    canGoPrevious: true,
    showNext: true,
    showPrevious: true,
    nextButtonText: 'Siguiente'
  }
);

defineEmits<{
  next: [];
  prev: [];
}>();
</script>
