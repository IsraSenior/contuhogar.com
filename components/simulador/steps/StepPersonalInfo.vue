<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">
        Información Personal
      </h2>
      <p class="text-gray-600">
        Cuéntanos un poco sobre ti y el tipo de crédito que buscas.
      </p>
    </div>

    <!-- Edad -->
    <div>
      <label for="edad" class="block text-sm font-semibold text-gray-700 mb-2">
        ¿Cuál es tu edad? <span class="text-red-500">*</span>
      </label>
      <input
        id="edad"
        v-model.number="localEdad"
        type="number"
        min="18"
        max="74"
        placeholder="Ej: 35"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
        :class="{
          'border-red-500 ring-2 ring-red-200': validationError
        }"
        @blur="validate"
      />
      <p v-if="!validationError" class="mt-2 text-sm text-gray-500">
        Edad mínima: 18 años | Edad máxima: 74 años
      </p>
      <p v-else class="mt-2 text-sm text-red-600">
        {{ validationError }}
      </p>
    </div>

    <!-- Tipo de Crédito -->
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-3">
        Tipo de crédito que deseas <span class="text-red-500">*</span>
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Hipotecario -->
        <button
          type="button"
          @click="selectTipoCredito('hipotecario')"
          class="relative p-6 border-2 rounded-xl transition-all duration-300 text-left"
          :class="{
            'border-primary bg-primary/5 shadow-md':
              localTipoCredito === 'hipotecario',
            'border-gray-300 hover:border-gray-400': localTipoCredito !== 'hipotecario'
          }"
        >
          <div class="flex items-start gap-3">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
              :class="{
                'bg-primary':
                  localTipoCredito === 'hipotecario',
                'bg-gray-100': localTipoCredito !== 'hipotecario'
              }"
            >
              🏠
            </div>
            <div class="flex-1">
              <h3
                class="font-bold text-lg mb-1"
                :class="{
                  'text-primary': localTipoCredito === 'hipotecario',
                  'text-gray-800': localTipoCredito !== 'hipotecario'
                }"
              >
                Crédito Hipotecario
              </h3>
              <p class="text-sm text-gray-600">
                Financiamiento hasta el 70% del valor del inmueble
              </p>
            </div>
          </div>
          <!-- Check mark -->
          <div
            v-if="localTipoCredito === 'hipotecario'"
            class="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
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

        <!-- Leasing -->
        <button
          type="button"
          @click="selectTipoCredito('leasing')"
          class="relative p-6 border-2 rounded-xl transition-all duration-300 text-left"
          :class="{
            'border-primary bg-primary/5 shadow-md':
              localTipoCredito === 'leasing',
            'border-gray-300 hover:border-gray-400': localTipoCredito !== 'leasing'
          }"
        >
          <div class="flex items-start gap-3">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
              :class="{
                'bg-primary':
                  localTipoCredito === 'leasing',
                'bg-gray-100': localTipoCredito !== 'leasing'
              }"
            >
              🔑
            </div>
            <div class="flex-1">
              <h3
                class="font-bold text-lg mb-1"
                :class="{
                  'text-primary': localTipoCredito === 'leasing',
                  'text-gray-800': localTipoCredito !== 'leasing'
                }"
              >
                Leasing Habitacional
              </h3>
              <p class="text-sm text-gray-600">
                Financiamiento hasta el 80% del valor del inmueble
              </p>
            </div>
          </div>
          <!-- Check mark -->
          <div
            v-if="localTipoCredito === 'leasing'"
            class="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TipoCredito } from '~/types/simulador';

const store = useSimuladorStore();
const { EDAD_MINIMA, EDAD_MAXIMA } = useSimuladorCalculations();

const localEdad = ref<number | null>(store.datosPersonales.edad);
const localTipoCredito = ref<TipoCredito | null>(store.datosPersonales.tipoCredito);
const validationError = ref<string>('');

const validate = () => {
  validationError.value = '';

  if (localEdad.value === null || localEdad.value === undefined) {
    validationError.value = 'Por favor ingresa tu edad';
    return false;
  }

  if (localEdad.value < EDAD_MINIMA || localEdad.value > EDAD_MAXIMA) {
    validationError.value = `La edad debe estar entre ${EDAD_MINIMA} y ${EDAD_MAXIMA} años`;
    return false;
  }

  return true;
};

const selectTipoCredito = (tipo: TipoCredito) => {
  localTipoCredito.value = tipo;
  store.updateDatosPersonales({ tipoCredito: tipo });
};

// Sincronizar con el store
watch(localEdad, (newValue) => {
  if (newValue !== null && newValue >= EDAD_MINIMA && newValue <= EDAD_MAXIMA) {
    store.updateDatosPersonales({ edad: newValue });
    validationError.value = '';
  }
});

// Cargar datos del store al montar
onMounted(() => {
  localEdad.value = store.datosPersonales.edad;
  localTipoCredito.value = store.datosPersonales.tipoCredito;
});
</script>
