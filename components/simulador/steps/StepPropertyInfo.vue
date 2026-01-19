<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">
        Información del inmueble
      </h2>
      <p class="text-gray-600">
        Detalles del inmueble que deseas adquirir.
      </p>
    </div>

    <!-- Valor del Bien -->
    <div>
      <label for="valorBien" class="block text-sm font-semibold text-gray-700 mb-2">
        Valor del inmueble <span class="text-red-500">*</span>
      </label>
      <CurrencyInput
        id="valorBien"
        v-model="localValorBien"
        placeholder="200.000.000"
        :min="0"
        :step="1000000"
        :error="!!errors.valorBien"
        :error-message="errors.valorBien"
        @update:model-value="calculatePorcentaje"
        @blur="validateValorBien"
      />
      <p v-if="!errors.valorBien" class="mt-2 text-sm text-gray-500">
        Valor total del inmueble que deseas adquirir
      </p>
    </div>

    <!-- Monto Solicitado -->
    <div>
      <label for="montoSolicitado" class="block text-sm font-semibold text-gray-700 mb-2">
        Monto que quieres financiar <span class="text-red-500">*</span>
      </label>
      <CurrencyInput
        id="montoSolicitado"
        v-model="localMontoSolicitado"
        placeholder="120.000.000"
        :min="0"
        :step="1000000"
        :error="!!errors.montoSolicitado"
        :error-message="errors.montoSolicitado"
        @update:model-value="calculatePorcentaje"
        @blur="validateMontoSolicitado"
      />
      <p v-if="!errors.montoSolicitado" class="mt-2 text-sm text-gray-500">
        Monto que solicitas financiar
      </p>

      <!-- Porcentaje de Financiación -->
      <div
        v-if="porcentajeFinanciacion > 0"
        class="mt-4 p-4 rounded-lg"
        :class="{
          'bg-green-50 border border-green-200': porcentajeValido,
          'bg-red-50 border border-red-200': !porcentajeValido
        }"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">
            Porcentaje de financiación
          </span>
          <span
            class="text-lg font-bold"
            :class="{
              'text-green-600': porcentajeValido,
              'text-red-600': !porcentajeValido
            }"
          >
            {{ porcentajeFinanciacion.toFixed(1) }}%
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            class="h-2 rounded-full transition-all duration-300"
            :class="{
              'bg-green-500': porcentajeValido,
              'bg-red-500': !porcentajeValido
            }"
            :style="{ width: `${Math.min(porcentajeFinanciacion, 100)}%` }"
          ></div>
        </div>
        <p v-if="financiacionError.length === 0" class="mt-2 text-xs text-gray-600">
          Máximo permitido: {{ limiteFinanciacion }}% para
          {{ store.datosPersonales.tipoCredito }}
        </p>
      </div>

      <!-- Errores de financiación inline -->
      <div v-if="financiacionError.length > 0" class="mt-3 space-y-1">
        <p v-for="(error, index) in financiacionError" :key="index" class="text-sm text-red-600">
          {{ error }}
        </p>
      </div>
    </div>

    <!-- Plazo en Meses -->
    <div>
      <label for="plazo" class="block text-sm font-semibold text-gray-700 mb-2">
        Plazo del crédito (en meses) <span class="text-red-500">*</span>
      </label>
      <div class="flex items-center gap-4">
        <input
          id="plazo"
          v-model.number="localPlazoMeses"
          type="range"
          :min="PLAZO_MINIMO"
          :max="plazoMaximoDisponible"
          step="12"
          class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          @input="validatePlazo"
        />
        <div class="shrink-0 text-right min-w-[180px]">
          <p class="text-2xl font-bold text-primary">
            {{ localPlazoMeses }} meses <span class="text-lg text-gray-600">({{ Math.floor(localPlazoMeses / 12) }} años)</span>
          </p>
        </div>
      </div>
      <p class="mt-2 text-sm text-gray-500">
        Rango: {{ PLAZO_MINIMO }}-{{ plazoMaximoDisponible }} meses
      </p>

      <!-- Información de edad final -->
      <div
        v-if="store.datosPersonales.edad"
        class="mt-4 p-4 rounded-lg"
        :class="{
          'bg-blue-50 border border-blue-200': edadFinalValida,
          'bg-red-50 border border-red-200': !edadFinalValida
        }"
      >
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-700">
            Edad al finalizar el crédito:
          </span>
          <span
            class="text-lg font-bold"
            :class="{
              'text-blue-600': edadFinalValida,
              'text-red-600': !edadFinalValida
            }"
          >
            {{ edadFinal.toFixed(0) }} años
          </span>
        </div>
        <p v-if="plazoError.length === 0" class="mt-1 text-xs text-gray-600">
          Edad máxima permitida: {{ EDAD_FINAL_MAXIMA }} años
        </p>
      </div>

      <!-- Errores de plazo inline -->
      <div v-if="plazoError.length > 0" class="mt-3 space-y-1">
        <p v-for="(error, index) in plazoError" :key="index" class="text-sm text-red-600">
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useSimuladorStore();
const {
  PLAZO_MINIMO,
  PLAZO_MAXIMO,
  EDAD_FINAL_MAXIMA,
  PORCENTAJE_FINANCIACION_HIPOTECARIO,
  PORCENTAJE_FINANCIACION_LEASING,
  validarEdadPlazo,
  validarFinanciacion
} = useSimuladorCalculations();

const localValorBien = ref<number | null>(store.datosBien.valorBien);
const localMontoSolicitado = ref<number | null>(store.datosBien.montoSolicitado);
const localPlazoMeses = ref<number>(store.datosBien.plazoMeses);

const porcentajeFinanciacion = ref<number>(0);
const financiacionError = ref<string[]>([]);
const plazoError = ref<string[]>([]);

// Estado de errores para validación visual
const errors = ref<Record<string, string>>({
  valorBien: '',
  montoSolicitado: ''
});

const limiteFinanciacion = computed(() => {
  return store.datosPersonales.tipoCredito === 'hipotecario'
    ? PORCENTAJE_FINANCIACION_HIPOTECARIO
    : PORCENTAJE_FINANCIACION_LEASING;
});

const porcentajeValido = computed(() => {
  return porcentajeFinanciacion.value > 0 && porcentajeFinanciacion.value <= limiteFinanciacion.value;
});

const edadFinal = computed(() => {
  if (!store.datosPersonales.edad) return 0;
  return store.datosPersonales.edad + localPlazoMeses.value / 12;
});

const edadFinalValida = computed(() => {
  return edadFinal.value <= EDAD_FINAL_MAXIMA;
});

const plazoMaximoDisponible = computed(() => {
  if (!store.datosPersonales.edad) return PLAZO_MAXIMO;
  const plazoMax = Math.floor((EDAD_FINAL_MAXIMA - store.datosPersonales.edad) * 12);
  return Math.min(plazoMax, PLAZO_MAXIMO);
});

/**
 * Valida el valor del bien
 */
const validateValorBien = () => {
  errors.value.valorBien = '';

  if (!localValorBien.value || localValorBien.value === 0) {
    errors.value.valorBien = 'El valor del inmueble es requerido';
  }
};

/**
 * Valida el monto solicitado
 */
const validateMontoSolicitado = () => {
  errors.value.montoSolicitado = '';

  if (!localMontoSolicitado.value || localMontoSolicitado.value === 0) {
    errors.value.montoSolicitado = 'El monto a financiar es requerido';
  }
};

const calculatePorcentaje = () => {
  financiacionError.value = [];

  if (!localValorBien.value || !localMontoSolicitado.value) {
    porcentajeFinanciacion.value = 0;
    return;
  }

  porcentajeFinanciacion.value = (localMontoSolicitado.value / localValorBien.value) * 100;

  // Validar financiación
  if (store.datosPersonales.tipoCredito) {
    const validacion = validarFinanciacion(
      localValorBien.value,
      localMontoSolicitado.value,
      store.datosPersonales.tipoCredito
    );

    if (!validacion.valido) {
      financiacionError.value = validacion.errores;
    }
  }

  // Guardar en store
  store.updateDatosBien({
    valorBien: localValorBien.value,
    montoSolicitado: localMontoSolicitado.value
  });
};

const validatePlazo = () => {
  plazoError.value = [];

  if (!store.datosPersonales.edad) return;

  const validacion = validarEdadPlazo(store.datosPersonales.edad, localPlazoMeses.value);

  if (!validacion.valido) {
    plazoError.value = validacion.errores;
  }

  // Guardar en store
  store.updateDatosBien({ plazoMeses: localPlazoMeses.value });
};

// Sincronizar valores
watch(localValorBien, calculatePorcentaje);
watch(localMontoSolicitado, calculatePorcentaje);
watch(localPlazoMeses, validatePlazo);

// Ajustar plazo si supera el máximo disponible
watch(() => store.datosPersonales.edad, () => {
  if (localPlazoMeses.value > plazoMaximoDisponible.value) {
    localPlazoMeses.value = plazoMaximoDisponible.value;
    validatePlazo();
  }
});

// Cargar datos al montar
onMounted(() => {
  localValorBien.value = store.datosBien.valorBien;
  localMontoSolicitado.value = store.datosBien.montoSolicitado;
  localPlazoMeses.value = store.datosBien.plazoMeses;
  calculatePorcentaje();
  validatePlazo();
});
</script>
