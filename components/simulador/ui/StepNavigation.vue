<template>
  <div class="flex justify-between items-center gap-2">
    <!-- Botón Anterior -->
    <button
      v-if="showPrevious"
      type="button"
      @click="$emit('prev')"
      :disabled="!canGoPrevious"
      class="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      :class="canGoPrevious
        ? 'text-gray-600 hover:bg-gray-100'
        : 'text-gray-400'"
    >
      <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span class="hidden xs:inline">Anterior</span>
    </button>

    <div v-else></div>

    <!-- Botón Siguiente -->
    <button
      v-if="showNext"
      type="button"
      @click="$emit('next')"
      :disabled="!canGoNext"
      class="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
      :class="canGoNext
        ? 'bg-primary text-white hover:bg-primary/90'
        : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
    >
      <span>{{ nextButtonText }}</span>
      <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
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
