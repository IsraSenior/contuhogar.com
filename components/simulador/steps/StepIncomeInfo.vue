<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">
        Ingresos y gastos
      </h2>
      <p class="text-gray-600">
        Ayúdanos a entender tu situación financiera actual.
      </p>
    </div>

    <!-- Grid 2 columnas: Ingresos y Deducciones -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Columna 1: Ingresos -->
      <div class="space-y-6">
        <!-- Ingresos Fijos -->
        <div>
          <label for="ingresosFijos" class="block text-sm font-semibold text-gray-700 mb-2">
            Ingresos fijos mensuales <span class="text-red-500">*</span>
          </label>
          <CurrencyInput
            id="ingresosFijos"
            v-model="localIngresosFijos"
            placeholder="5.000.000"
            :min="0"
            :step="100000"
            :error="!!errors.ingresosFijos"
            :error-message="errors.ingresosFijos"
            @update:model-value="calculateNetos"
            @blur="validateIngresosFijos"
          />
          <p v-if="!errors.ingresosFijos" class="mt-2 text-sm text-gray-500">
            Salario mensual u otros ingresos regulares
          </p>
        </div>

        <!-- Ingresos Variables (Opcional) -->
        <div>
          <label for="ingresosVariables" class="block text-sm font-semibold text-gray-700 mb-2">
            Ingresos variables - adicionales (opcional)
          </label>
          <CurrencyInput
            id="ingresosVariables"
            v-model="localIngresosVariables"
            placeholder="0"
            :min="0"
            :step="100000"
            @update:model-value="calculateNetos"
          />
          <p class="mt-2 text-sm text-gray-500">
            Comisiones, bonos u otros ingresos no fijos
          </p>
        </div>
      </div>

      <!-- Columna 2: Deducciones -->
      <div>
        <!-- Deducciones (Opcional) -->
        <div>
          <label for="deducciones" class="block text-sm font-semibold text-gray-700 mb-2">
            Deducciones de nómina (opcional)
          </label>
          <CurrencyInput
            id="deducciones"
            v-model="localDeducciones"
            placeholder="0"
            :min="0"
            :step="50000"
            @update:model-value="calculateNetos"
          />
          <p class="mt-2 text-sm text-gray-500">
            Seguros, pensión, aportes, etc.
          </p>
        </div>
      </div>
    </div>

    <!-- Obligaciones Financieras (Ancho completo) -->
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-3">
        Obligaciones financieras (opcional)
      </label>

      <!-- Lista de obligaciones -->
      <div v-if="localObligaciones.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
        <div
          v-for="(obligacion, index) in localObligaciones"
          :key="obligacion.id"
          class="p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-medium text-gray-500">
                  {{ getTipoObligacionLabel(obligacion.tipo) }}
                </span>
              </div>
              <p class="text-base font-semibold text-gray-900">
                {{ formatCurrency(obligacion.monto) }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                {{ getCalculoLabel(obligacion) }}
              </p>
            </div>
            <button
              type="button"
              @click="removeObligacion(index)"
              class="shrink-0 text-red-500 hover:text-red-700 transition-colors"
              title="Eliminar obligación"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Botón para agregar obligación -->
      <button
        type="button"
        @click="showObligacionForm = true"
        class="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span class="font-medium">Agregar obligación</span>
      </button>

      <!-- Modal/Form para agregar obligación -->
      <div
        v-if="showObligacionForm"
        class="fixed inset-0 z-50 flex items-center justify-center bg-primary/30 backdrop-blur-sm p-4"
        @click.self="cancelarObligacion"
      >
        <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">
            Agregar obligación financiera
          </h3>

          <!-- Tipo de obligación -->
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de obligación <span class="text-red-500">*</span>
            </label>
            <select
              v-model="nuevaObligacion.tipo"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            >
              <option value="">Selecciona un tipo</option>
              <option value="tarjeta_credito">Tarjeta de crédito</option>
              <option value="hipotecaria_arriendo">Hipotecaria / Arriendo</option>
              <option value="otra">Otra obligación</option>
            </select>
            <p class="mt-1 text-xs text-gray-500">
              <span v-if="nuevaObligacion.tipo === 'tarjeta_credito'">
                <!-- Se considerará el 3% del cupo utilizado -->
              </span>
              <span v-else-if="nuevaObligacion.tipo === 'hipotecaria_arriendo'">
                Se considerará el monto completo mensual
              </span>
              <span v-else-if="nuevaObligacion.tipo === 'otra'">
                Se considerará el monto completo mensual
              </span>
            </p>
          </div>

          <!-- Monto -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              {{ nuevaObligacion.tipo === 'tarjeta_credito' ? 'Cupo utilizado' : 'Valor mensual' }} <span class="text-red-500">*</span>
            </label>
            <CurrencyInput
              v-model="nuevaObligacion.monto"
              :placeholder="nuevaObligacion.tipo === 'tarjeta_credito' ? 'Cupo utilizado' : 'Valor mensual'"
              :min="0"
              :step="10000"
            />
          </div>

          <!-- Botones -->
          <div class="flex gap-3">
            <button
              type="button"
              @click="cancelarObligacion"
              class="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              @click="agregarObligacion"
              :disabled="!nuevaObligacion.tipo || !nuevaObligacion.monto"
              class="flex-1 px-4 py-3 bg-primary rounded-lg text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Resumen de Ingresos Netos -->
    <div class="p-6 bg-gray-50 rounded-xl border border-gray-200">
      <h3 class="text-lg font-bold text-gray-800 mb-4">
        Resumen financiero
      </h3>

      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Ingresos totales:</span>
          <span class="font-semibold text-gray-800">
            {{ formatCurrency(totalIngresos) }}
          </span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Deducciones:</span>
          <span class="font-semibold text-red-600">
            - {{ formatCurrency(localDeducciones) }}
          </span>
        </div>
        <div class="h-px bg-gray-300"></div>
        <div class="flex justify-between items-center">
          <span class="text-base font-bold text-gray-800">Ingresos netos:</span>
          <span class="text-xl font-bold text-primary">
            {{ formatCurrency(ingresosNetos) }}
          </span>
        </div>
        <div v-if="totalObligacionesMensuales > 0" class="flex justify-between items-center pt-2 border-t border-gray-200">
          <span class="text-sm text-gray-600">Obligaciones mensuales:</span>
          <span class="font-semibold text-orange-600">
            {{ formatCurrency(totalObligacionesMensuales) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils/formatters';
import type { ObligacionFinanciera, TipoObligacion } from '~/types/simulador';
import { useSimuladorCalculations } from '~/composables/useSimuladorCalculations';

const store = useSimuladorStore();
const { calcularMontoMensualObligacion } = useSimuladorCalculations();

const localIngresosFijos = ref<number | null>(store.datosIngresos.ingresosFijos);
const localIngresosVariables = ref<number>(store.datosIngresos.ingresosVariables);
const localDeducciones = ref<number>(store.datosIngresos.deducciones);
const localObligaciones = ref<ObligacionFinanciera[]>([...store.datosIngresos.obligacionesFinancieras]);

const showObligacionForm = ref(false);
const nuevaObligacion = ref<{ tipo: TipoObligacion | ''; monto: number | null }>({
  tipo: '',
  monto: null
});

// Estado de errores para validación visual
const errors = ref<Record<string, string>>({
  ingresosFijos: ''
});

const totalIngresos = computed(() => {
  return (localIngresosFijos.value || 0) + localIngresosVariables.value;
});

const ingresosNetos = computed(() => {
  return totalIngresos.value - localDeducciones.value;
});

/**
 * Calcula el total de obligaciones mensuales
 */
const totalObligacionesMensuales = computed(() => {
  return localObligaciones.value.reduce((total, obligacion) => {
    return total + calcularMontoMensualObligacion(obligacion);
  }, 0);
});

/**
 * Obtiene la etiqueta del tipo de obligación
 */
const getTipoObligacionLabel = (tipo: TipoObligacion): string => {
  const labels = {
    tarjeta_credito: 'Tarjeta de crédito',
    hipotecaria_arriendo: 'Hipotecaria / Arriendo',
    otra: 'Otra obligación'
  };
  return labels[tipo] || tipo;
};

/**
 * Obtiene el texto explicativo del cálculo
 */
const getCalculoLabel = (obligacion: ObligacionFinanciera): string => {
  if (obligacion.tipo === 'tarjeta_credito') {
    const mensual = calcularMontoMensualObligacion(obligacion);
    return `Pago mensual: ${formatCurrency(mensual)}`;
  }
  return 'Pago mensual completo';
};

/**
 * Agrega una nueva obligación
 */
const agregarObligacion = () => {
  if (!nuevaObligacion.value.tipo || !nuevaObligacion.value.monto) return;

  const obligacion: ObligacionFinanciera = {
    id: `obl-${Date.now()}`,
    tipo: nuevaObligacion.value.tipo as TipoObligacion,
    monto: nuevaObligacion.value.monto
  };

  localObligaciones.value.push(obligacion);
  updateStore();

  // Reset form
  nuevaObligacion.value = { tipo: '', monto: null };
  showObligacionForm.value = false;
};

/**
 * Elimina una obligación
 */
const removeObligacion = (index: number) => {
  localObligaciones.value.splice(index, 1);
  updateStore();
};

/**
 * Cancela la creación de una obligación
 */
const cancelarObligacion = () => {
  nuevaObligacion.value = { tipo: '', monto: null };
  showObligacionForm.value = false;
};

/**
 * Valida los ingresos fijos
 */
const validateIngresosFijos = () => {
  errors.value.ingresosFijos = '';

  if (!localIngresosFijos.value || localIngresosFijos.value === 0) {
    errors.value.ingresosFijos = 'Los ingresos fijos son requeridos';
  }
};

const calculateNetos = () => {
  updateStore();
};

const updateStore = () => {
  store.updateDatosIngresos({
    ingresosFijos: localIngresosFijos.value,
    ingresosVariables: localIngresosVariables.value,
    deducciones: localDeducciones.value,
    obligacionesFinancieras: localObligaciones.value
  });
};

// Cargar datos al montar
onMounted(() => {
  localIngresosFijos.value = store.datosIngresos.ingresosFijos;
  localIngresosVariables.value = store.datosIngresos.ingresosVariables;
  localDeducciones.value = store.datosIngresos.deducciones;
  localObligaciones.value = [...store.datosIngresos.obligacionesFinancieras];
});
</script>
