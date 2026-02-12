<template>
  <div class="relative h-screen flex flex-col lg:flex-row">
    <!-- Botón Cerrar (redirige al home) -->
    <NuxtLink
      to="/"
      class="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      title="Volver al inicio"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </NuxtLink>

    <!-- Sidebar con Stepper (Desktop) -->
    <aside class="hidden lg:flex lg:w-[400px] xl:w-[450px] bg-gray-50 p-8 flex-col">
      <!-- Título -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Simulador de crédito
        </h1>
        <p class="text-sm text-gray-600">
          Completa cada paso para conocer tu preaprobación
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

      <!-- Logos de bancos y aliados -->
      <!-- <div class="pt-6 border-t border-gray-200">
        <p class="text-[10px] text-gray-400 uppercase tracking-wider mb-3">Respaldado por</p>
        <div class="flex flex-wrap items-center gap-3">
          <template v-for="logo in mainStore.logos" :key="logo.name">
            <span
              v-if="logo.type === 'text'"
              class="text-xs font-bold text-gray-400"
            >
              {{ logo.value }}
            </span>
            <NuxtImg
              v-else
              :src="logo.value"
              :alt="logo.name"
              class="h-5 w-auto grayscale opacity-50"
              loading="lazy"
            />
          </template>
        </div>
      </div> -->

      <!-- Info adicional y créditos (altura fija para alinear con main footer) -->
      <div class="mt-auto py-4 border-t border-gray-200 min-h-[88px] flex flex-col justify-center">
        <p class="text-xs text-gray-500 mb-2">
          Tu información es confidencial y segura. Este simulador es solo para fines informativos.
        </p>
        <!-- Logo y copyright -->
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="opacity-40 hover:opacity-60 transition-opacity">
            <Logo class="w-24 h-auto" />
          </NuxtLink>
          <p class="text-[10px] text-gray-400">
            &copy; {{ new Date().getFullYear() }} Todos los derechos reservados.
          </p>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Header Mobile (solo en mobile) -->
      <div class="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
        <!-- Logo en Mobile -->
        <div class="mb-3">
          <NuxtLink to="/" class="inline-block">
            <Logo class="w-32 h-auto" />
          </NuxtLink>
        </div>
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

      <!-- Footer con navegación (alineado con sidebar) -->
      <div v-if="store.pasoActual < 5" class="bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-12 py-4 lg:min-h-[88px] flex items-center">
        <div class="max-w-4xl mx-auto w-full">
          <StepNavigation
            :current-step="store.pasoActual"
            :can-go-next="canAdvance"
            :can-go-previous="store.pasoActual > 1"
            :show-previous="store.pasoActual > 1"
            :next-button-text="store.pasoActual === 4 ? 'Ver resultados' : 'Siguiente'"
            @next="handleNext"
            @prev="handlePrev"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import VerticalStepper from './ui/VerticalStepper.vue';
import StepNavigation from './ui/StepNavigation.vue';
import StepPersonalInfo from './steps/StepPersonalInfo.vue';
import StepPropertyInfo from './steps/StepPropertyInfo.vue';
import StepIncomeInfo from './steps/StepIncomeInfo.vue';
import StepElegibility from './steps/StepElegibility.vue';
import StepResults from './steps/StepResults.vue';
import { useSimuladorStore } from '~/stores/simulador';
import { useMainStore } from '~/stores/index';

const store = useSimuladorStore();
const mainStore = useMainStore();
const transitionName = ref('slide-left');

// Meta Pixel tracking
const { trackInitiateCheckout, trackSimuladorStart, trackSimuladorStep } = useMetaPixel()

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
    'Información personal',
    'Información del inmueble',
    'Ingresos y gastos',
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
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'simulador_step_completed',
        step: store.pasoActual - 1,
        step_name: getStepName(store.pasoActual - 1)
      });
    }

    // Meta Pixel: Track step progression
    trackSimuladorStep(store.pasoActual - 1, getStepName(store.pasoActual - 1))
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

const getStepName = (step: number) => {
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
  // Start session tracking (non-blocking)
  store.startSession();

  store.loadFromLocalStorage();

  // Track inicio del simulador
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'simulador_started'
    });
  }

  // Meta Pixel: Track simulator start
  trackInitiateCheckout({ content_name: 'simulador_credito', content_category: 'simulator' })
  trackSimuladorStart()
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
