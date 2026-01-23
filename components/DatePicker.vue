<template>
  <div class="relative">
    <div
      ref="triggerRef"
      @click="toggleCalendar"
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all outline-none cursor-pointer bg-white"
      :class="{
        'border-red-500 ring-2 ring-red-200': error,
        'ring-2 ring-primary border-transparent': isOpen
      }"
    >
      <div class="flex items-center justify-between">
        <span v-if="displayValue" class="text-gray-900">
          {{ displayValue }}
        </span>
        <span v-else class="text-gray-400">
          {{ placeholder }}
        </span>
        <svg
          class="w-5 h-5 text-gray-400 transition-transform"
          :class="{ 'rotate-180': isOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>

    <!-- Calendario flotante -->
    <div
      v-show="isOpen"
      ref="calendarRef"
      class="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
      :class="positionClass"
    >
      <VDatePicker
        v-model="selectedDate"
        :min-date="minDate"
        :max-date="maxDate"
        :model-config="modelConfig"
        mode="date"
        :attributes="calendarAttributes"
        @dayclick="handleDateSelect"
      />
    </div>

    <!-- Overlay para cerrar al hacer click fuera -->
    <div
      v-if="isOpen"
      @click="closeCalendar"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { DatePicker as VDatePicker } from 'v-calendar';

interface Props {
  modelValue: string | null;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  error?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Selecciona una fecha',
  error: false
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const isOpen = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const calendarRef = ref<HTMLElement | null>(null);
const selectedDate = ref<Date | null>(
  props.modelValue ? new Date(props.modelValue) : null
);

// Configuración del modelo para formato ISO
const modelConfig = {
  type: 'string',
  mask: 'YYYY-MM-DD'
};

// Atributos del calendario para personalizar colores
const calendarAttributes = computed(() => [
  {
    key: 'today',
    highlight: {
      color: 'blue',
      fillMode: 'outline'
    },
    dates: new Date()
  }
]);

// Valor formateado para mostrar
const displayValue = computed(() => {
  if (!selectedDate.value) return '';

  const date = selectedDate.value;
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
});

// Posición del calendario (arriba o abajo según espacio disponible)
const positionClass = computed(() => {
  // Por defecto abajo, pero podría calcularse dinámicamente
  return 'left-0 top-full';
});

/**
 * Abre/cierra el calendario
 */
const toggleCalendar = () => {
  isOpen.value = !isOpen.value;
};

/**
 * Cierra el calendario
 */
const closeCalendar = () => {
  isOpen.value = false;
};

/**
 * Maneja la selección de fecha
 */
const handleDateSelect = (day: any) => {
  if (!day?.date) return;
  const date = day.date;
  selectedDate.value = date;

  // Emitir en formato ISO (YYYY-MM-DD)
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const dayNum = date.getDate().toString().padStart(2, '0');
  const isoDate = `${year}-${month}-${dayNum}`;

  emit('update:modelValue', isoDate);

  // Esperar a que v-calendar termine su ciclo reactivo antes de cerrar
  nextTick(() => {
    closeCalendar();
  });
};

// Watch para sincronizar con cambios externos del modelValue
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    selectedDate.value = new Date(newValue);
  } else {
    selectedDate.value = null;
  }
});

// Cerrar con tecla Escape
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeCalendar();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
});
</script>
