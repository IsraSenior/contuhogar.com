<template>
  <div class="w-full mb-8">
    <div class="flex justify-between items-center mb-4">
      <button
        v-for="step in steps"
        :key="step.number"
        type="button"
        :disabled="!canGoToStep(step.number)"
        @click="goToStep(step.number)"
        class="flex flex-col items-center flex-1 relative group"
        :class="{
          'cursor-pointer hover:opacity-80': canGoToStep(step.number),
          'cursor-not-allowed opacity-50': !canGoToStep(step.number)
        }"
      >
        <!-- Círculo del paso -->
        <div
          class="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all duration-300 mb-2"
          :class="{
            'bg-primary text-white shadow-lg scale-110':
              currentStep === step.number,
            'bg-primary text-white':
              currentStep > step.number,
            'bg-gray-200 text-gray-500': currentStep < step.number
          }"
        >
          <span v-if="currentStep > step.number">✓</span>
          <span v-else>{{ step.number }}</span>
        </div>

        <!-- Título del paso -->
        <span
          class="text-xs sm:text-sm text-center font-medium hidden sm:block"
          :class="{
            'text-primary font-semibold': currentStep === step.number,
            'text-gray-700': currentStep > step.number,
            'text-gray-400': currentStep < step.number
          }"
        >
          {{ step.title }}
        </span>

        <!-- Línea conectora -->
        <div
          v-if="step.number < steps.length"
          class="absolute left-[calc(50%+20px)] sm:left-[calc(50%+24px)] top-5 sm:top-6 w-[calc(100%-40px)] sm:w-[calc(100%-48px)] h-0.5 -z-10"
          :class="{
            'bg-primary':
              currentStep > step.number,
            'bg-gray-200': currentStep <= step.number
          }"
        ></div>
      </button>
    </div>

    <!-- Título móvil (solo se muestra en mobile) -->
    <div class="text-center sm:hidden">
      <p class="text-sm font-semibold text-primary">
        {{ steps[currentStep - 1].title }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentStep: number;
  canGoToStep: (step: number) => boolean;
}>();

const emit = defineEmits<{
  goToStep: [step: number];
}>();

const steps = [
  { number: 1, title: 'Información personal' },
  { number: 2, title: 'Información del inmueble' },
  { number: 3, title: 'Ingresos y gastos' },
  { number: 4, title: 'Elegibilidad' },
  { number: 5, title: 'Resultados' }
];

const goToStep = (step: number) => {
  if (props.canGoToStep(step)) {
    emit('goToStep', step);
  }
};
</script>
