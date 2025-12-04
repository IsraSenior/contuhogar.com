<template>
  <div class="flex flex-col gap-4">
    <button
      v-for="step in steps"
      :key="step.number"
      type="button"
      :disabled="!canGoToStep(step.number)"
      @click="goToStep(step.number)"
      class="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left border-2"
      :class="{
        'bg-primary/5 border-primary shadow-md': currentStep === step.number,
        'bg-white border-gray-200 hover:border-gray-300': currentStep !== step.number && canGoToStep(step.number),
        'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed': !canGoToStep(step.number),
      }"
    >
      <!-- Icono -->
      <div
        class="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
        :class="{
          'bg-primary text-white': currentStep === step.number || currentStep > step.number,
          'bg-gray-100 text-gray-400': currentStep < step.number
        }"
      >
        <component :is="step.icon" class="w-7 h-7" />
      </div>

      <!-- Contenido -->
      <div class="flex-1 min-w-0">
        <h3
          class="font-bold text-lg transition-colors"
          :class="{
            'text-primary': currentStep === step.number,
            'text-gray-900': currentStep > step.number,
            'text-gray-500': currentStep < step.number
          }"
        >
          {{ step.title }}
        </h3>
        <p class="text-sm text-gray-500 mt-0.5">
          {{ step.description }}
        </p>
      </div>

      <!-- Check mark (completado) -->
      <div
        v-if="currentStep > step.number"
        class="shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
      >
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';

const props = defineProps<{
  currentStep: number;
  canGoToStep: (step: number) => boolean;
}>();

const emit = defineEmits<{
  goToStep: [step: number];
}>();

// Iconos SVG como componentes
const UserIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  })
]);

const HomeIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  })
]);

const CashIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  })
]);

const CheckIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  })
]);

const ChartIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  })
]);

const steps = [
  {
    number: 1,
    title: 'Información personal',
    description: 'Edad y tipo de crédito',
    icon: UserIcon
  },
  {
    number: 2,
    title: 'Información del inmueble',
    description: 'Valor, monto y plazo',
    icon: HomeIcon
  },
  {
    number: 3,
    title: 'Ingresos y gastos',
    description: 'Situación financiera',
    icon: CashIcon
  },
  {
    number: 4,
    title: 'Elegibilidad',
    description: 'Requisitos básicos',
    icon: CheckIcon
  },
  {
    number: 5,
    title: 'Resultados',
    description: 'Tu evaluación',
    icon: ChartIcon
  }
];

const goToStep = (step: number) => {
  if (props.canGoToStep(step)) {
    emit('goToStep', step);
  }
};
</script>
