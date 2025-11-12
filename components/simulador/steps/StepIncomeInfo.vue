<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">
        Ingresos y Gastos
      </h2>
      <p class="text-gray-600">
        Ayúdanos a entender tu situación financiera actual.
      </p>
    </div>

    <!-- Grid 2 columnas: Ingresos y Deducciones/Obligaciones -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Columna 1: Ingresos -->
      <div class="space-y-6">
        <!-- Ingresos Fijos -->
        <div>
          <label for="ingresosFijos" class="block text-sm font-semibold text-gray-700 mb-2">
            Ingresos fijos mensuales <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              $
            </span>
            <input
              id="ingresosFijos"
              v-model.number="localIngresosFijos"
              type="number"
              min="0"
              step="100000"
              placeholder="5000000"
              class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              @input="calculateNetos"
            />
          </div>
          <p class="mt-2 text-sm text-gray-500">
            Salario mensual u otros ingresos regulares
          </p>
        </div>

        <!-- Ingresos Variables (Opcional) -->
        <div>
          <label for="ingresosVariables" class="block text-sm font-semibold text-gray-700 mb-2">
            Ingresos variables mensuales (opcional)
          </label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              $
            </span>
            <input
              id="ingresosVariables"
              v-model.number="localIngresosVariables"
              type="number"
              min="0"
              step="100000"
              placeholder="0"
              class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              @input="calculateNetos"
            />
          </div>
          <p class="mt-2 text-sm text-gray-500">
            Comisiones, bonos u otros ingresos no fijos
          </p>
        </div>
      </div>

      <!-- Columna 2: Deducciones y Obligaciones -->
      <div class="space-y-6">
        <!-- Deducciones (Opcional) -->
        <div>
          <label for="deducciones" class="block text-sm font-semibold text-gray-700 mb-2">
            Deducciones de nómina (opcional)
          </label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              $
            </span>
            <input
              id="deducciones"
              v-model.number="localDeducciones"
              type="number"
              min="0"
              step="50000"
              placeholder="0"
              class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              @input="calculateNetos"
            />
          </div>
          <p class="mt-2 text-sm text-gray-500">
            Seguros, pensión, aportes, etc.
          </p>
        </div>

        <!-- Otras Obligaciones (Opcional) -->
        <div>
          <label for="otrasObligaciones" class="block text-sm font-semibold text-gray-700 mb-2">
            Otras obligaciones financieras (opcional)
          </label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              $
            </span>
            <input
              id="otrasObligaciones"
              v-model.number="localOtrasObligaciones"
              type="number"
              min="0"
              step="50000"
              placeholder="0"
              class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              @input="updateStore"
            />
          </div>
          <p class="mt-2 text-sm text-gray-500">
            Tarjetas de crédito, préstamos, etc.
          </p>
        </div>
      </div>
    </div>

    <!-- Resumen de Ingresos Netos -->
    <div class="p-6 bg-primary/5 rounded-xl border-2 border-primary/20">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-800">
          Resumen Financiero
        </h3>
        <div class="text-3xl">💰</div>
      </div>

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
        <div v-if="localOtrasObligaciones > 0" class="flex justify-between items-center pt-2 border-t border-gray-200">
          <span class="text-sm text-gray-600">Obligaciones actuales:</span>
          <span class="font-semibold text-orange-600">
            {{ formatCurrency(localOtrasObligaciones) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils/formatters';

const store = useSimuladorStore();

const localIngresosFijos = ref<number | null>(store.datosIngresos.ingresosFijos);
const localIngresosVariables = ref<number>(store.datosIngresos.ingresosVariables);
const localDeducciones = ref<number>(store.datosIngresos.deducciones);
const localOtrasObligaciones = ref<number>(store.datosIngresos.otrasObligaciones);

const totalIngresos = computed(() => {
  return (localIngresosFijos.value || 0) + localIngresosVariables.value;
});

const ingresosNetos = computed(() => {
  return totalIngresos.value - localDeducciones.value;
});

const calculateNetos = () => {
  updateStore();
};

const updateStore = () => {
  store.updateDatosIngresos({
    ingresosFijos: localIngresosFijos.value,
    ingresosVariables: localIngresosVariables.value,
    deducciones: localDeducciones.value,
    otrasObligaciones: localOtrasObligaciones.value
  });
};

// Cargar datos al montar
onMounted(() => {
  localIngresosFijos.value = store.datosIngresos.ingresosFijos;
  localIngresosVariables.value = store.datosIngresos.ingresosVariables;
  localDeducciones.value = store.datosIngresos.deducciones;
  localOtrasObligaciones.value = store.datosIngresos.otrasObligaciones;
});
</script>
