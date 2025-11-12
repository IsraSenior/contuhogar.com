<template>
  <div class="h-screen flex flex-col lg:flex-row">
    <!-- Sidebar con Stepper (Desktop) -->
    <aside class="hidden lg:flex lg:w-[400px] xl:w-[450px] bg-gray-50 p-8 flex-col">
      <!-- Logo o Título -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Simulador de Crédito
        </h1>
        <p class="text-sm text-gray-600">
          Completa cada paso para conocer tu pre-aprobación
        </p>
      </div>

      <!-- Vertical Stepper -->
      <div class="flex-1">
        <VerticalStepper
          :current-step="store.pasoActual"
          :can-go-to-step="store.canGoToStep"
          @go-to-step="handleGoToStep"
        />
      </div>

      <!-- Info adicional -->
      <div class="mt-auto pt-6 border-t border-gray-200">
        <p class="text-xs text-gray-500">
          Tu información es confidencial y segura. Este simulador es solo para fines informativos.
        </p>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Header Mobile (solo en mobile) -->
      <div class="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
        <h2 class="text-lg font-bold text-primary">
          Paso {{ store.pasoActual }} de 5: {{ currentStepTitle }}
        </h2>
        <div class="mt-2 flex gap-1">
          <div
            v-for="i in 5"
            :key="i"
            class="h-1 flex-1 rounded-full transition-all"
            :class="i <= store.pasoActual ? 'bg-primary' : 'bg-gray-200'"
          ></div>
        </div>
      </div>

      <!-- Content Container -->
      <div class="flex-1 overflow-y-auto">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
          <!-- Transición del paso actual -->
          <Transition :name="transitionName" mode="out-in">
            <component :is="currentStepComponent" :key="store.pasoActual" class="animate-fade-in" />
          </Transition>
        </div>
      </div>

      <!-- Footer con navegación -->
      <div v-if="store.pasoActual < 5" class="bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-12 py-4">
        <div class="max-w-4xl mx-auto">
          <StepNavigation
            :current-step="store.pasoActual"
            :can-go-next="canAdvance"
            :can-go-previous="store.pasoActual > 1"
            :show-previous="store.pasoActual > 1"
            :next-button-text="store.pasoActual === 4 ? 'Ver Resultados' : 'Siguiente'"
            @next="handleNext"
            @prev="handlePrev"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VerticalStepper from './ui/VerticalStepper.vue';
import StepNavigation from './ui/StepNavigation.vue';
import StepPersonalInfo from './steps/StepPersonalInfo.vue';
import StepPropertyInfo from './steps/StepPropertyInfo.vue';
import StepIncomeInfo from './steps/StepIncomeInfo.vue';
import StepElegibility from './steps/StepElegibility.vue';
import StepResults from './steps/StepResults.vue';

const store = useSimuladorStore();
const transitionName = ref<'slide-left' | 'slide-right'>('slide-left');

// Componente del paso actual
const currentStepComponent = computed(() => {
  switch (store.pasoActual) {
    case 1:
      return StepPersonalInfo;
    case 2:
      return StepPropertyInfo;
    case 3:
      return StepIncomeInfo;
    case 4:
      return StepElegibility;
    case 5:
      return StepResults;
    default:
      return StepPersonalInfo;
  }
});

// Título del paso actual (para mobile)
const currentStepTitle = computed(() => {
  const titles = [
    'Información Personal',
    'Información del inmueble',
    'Ingresos y Gastos',
    'Elegibilidad',
    'Resultados'
  ];
  return titles[store.pasoActual - 1] || '';
});

// Validación para avanzar
const canAdvance = computed(() => {
  switch (store.pasoActual) {
    case 1:
      return store.isPaso1Valid;
    case 2:
      return store.isPaso2Valid;
    case 3:
      return store.isPaso3Valid;
    case 4:
      return store.isPaso4Valid;
    case 5:
      return false;
    default:
      return false;
  }
});

// Handlers de navegación
const handleNext = () => {
  if (canAdvance.value) {
    transitionName.value = 'slide-left';
    store.nextStep();

    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'simulador_step_completed',
        step: store.pasoActual - 1,
        step_name: getStepName(store.pasoActual - 1)
      });
    }
  }
};

const handlePrev = () => {
  transitionName.value = 'slide-right';
  store.prevStep();
};

const handleGoToStep = (step: number) => {
  transitionName.value = step > store.pasoActual ? 'slide-left' : 'slide-right';
  store.goToStep(step);
};

const getStepName = (step: number): string => {
  const names = [
    'informacion_personal',
    'informacion_bien',
    'ingresos_gastos',
    'elegibilidad',
    'resultados'
  ];
  return names[step - 1] || 'unknown';
};

// Cargar desde localStorage al montar
onMounted(() => {
  store.loadFromLocalStorage();

  // Track inicio del simulador
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'simulador_started'
    });
  }
});

// Guardar antes de salir
onBeforeUnmount(() => {
  store.saveToLocalStorage();
});
</script>

<style scoped>
/* Transiciones slide */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
