<template>
  <div class="relative">
    <!-- Input de texto para escribir fecha -->
    <div
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all outline-none bg-white"
      :class="{
        'border-red-500 ring-2 ring-red-200': error || inputError,
        'ring-2 ring-primary border-transparent': isOpen
      }"
    >
      <div class="flex items-center gap-3">
        <label for="date-picker-input" class="sr-only">Fecha</label>
        <input
          id="date-picker-input"
          name="date-picker-input"
          ref="inputRef"
          v-model="inputValue"
          type="text"
          inputmode="numeric"
          :placeholder="placeholder"
          class="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400"
          maxlength="10"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @input="handleInputChange"
          @keydown="handleKeydown"
        />
        <button
          type="button"
          @click="toggleCalendar"
          class="p-1 hover:bg-gray-100 rounded transition-colors"
          aria-label="Abrir calendario"
        >
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
        </button>
      </div>
    </div>

    <!-- Mensaje de error de formato -->
    <p v-if="inputError" class="mt-1 text-sm text-red-600">
      {{ inputError }}
    </p>

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
  placeholder: 'DD/MM/AAAA',
  error: false
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const isOpen = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const calendarRef = ref<HTMLElement | null>(null);
const inputValue = ref('');
const inputError = ref('');
const selectedDate = ref<Date | null>(null);

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

// Posición del calendario (arriba o abajo según espacio disponible)
const positionClass = computed(() => {
  return 'left-0 top-full';
});

/**
 * Convierte fecha ISO (YYYY-MM-DD) a formato display (DD/MM/YYYY)
 */
const isoToDisplay = (isoDate: string): string => {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return '';
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

/**
 * Convierte fecha display (DD/MM/YYYY) a formato ISO (YYYY-MM-DD)
 */
const displayToIso = (displayDate: string): string | null => {
  const parts = displayDate.split('/');
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (day < 1 || day > 31) return null;
  if (month < 1 || month > 12) return null;
  if (year < 1900 || year > 2100) return null;

  // Validar que la fecha sea válida
  const date = new Date(year, month - 1, day);
  if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
    return null;
  }

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

/**
 * Valida si la fecha está dentro de los rangos permitidos
 */
const isDateInRange = (isoDate: string): boolean => {
  const date = new Date(isoDate);

  if (props.minDate && date < props.minDate) {
    return false;
  }
  if (props.maxDate && date > props.maxDate) {
    return false;
  }

  return true;
};

/**
 * Formatea la entrada mientras el usuario escribe
 */
const formatInputValue = (value: string): string => {
  // Remover todo excepto números
  const digits = value.replace(/\D/g, '');

  // Agregar slashes automáticamente
  if (digits.length <= 2) {
    return digits;
  } else if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  } else {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  }
};

/**
 * Maneja cambios en el input de texto
 */
const handleInputChange = () => {
  inputError.value = '';

  const formatted = formatInputValue(inputValue.value);
  inputValue.value = formatted;

  // Si tiene formato completo (DD/MM/YYYY), validar y emitir
  if (formatted.length === 10) {
    const isoDate = displayToIso(formatted);

    if (!isoDate) {
      inputError.value = 'Fecha inválida';
      return;
    }

    if (!isDateInRange(isoDate)) {
      inputError.value = 'Fecha fuera del rango permitido';
      return;
    }

    // Actualizar selectedDate para el calendario
    selectedDate.value = new Date(isoDate);

    // Emitir el valor
    emit('update:modelValue', isoDate);
  }
};

/**
 * Maneja teclas especiales
 */
const handleKeydown = (e: KeyboardEvent) => {
  // Permitir: backspace, delete, tab, escape, enter
  if ([8, 46, 9, 27, 13].includes(e.keyCode)) {
    return;
  }

  // Permitir: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
  if ((e.ctrlKey || e.metaKey) && [65, 67, 86, 88].includes(e.keyCode)) {
    return;
  }

  // Permitir: flechas
  if ([37, 38, 39, 40].includes(e.keyCode)) {
    return;
  }

  // Permitir solo números y slash
  if (!((e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 96 && e.keyCode <= 105) ||
        e.key === '/')) {
    e.preventDefault();
  }
};

/**
 * Maneja focus en el input
 */
const handleInputFocus = () => {
  // No abrir calendario automáticamente al hacer focus en el input
};

/**
 * Maneja blur del input
 */
const handleInputBlur = () => {
  // Validar fecha completa al salir del input
  if (inputValue.value.length > 0 && inputValue.value.length < 10) {
    inputError.value = 'Completa la fecha en formato DD/MM/AAAA';
  }
};

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
 * Maneja la selección de fecha desde el calendario
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

  // Actualizar input display
  inputValue.value = isoToDisplay(isoDate);
  inputError.value = '';

  emit('update:modelValue', isoDate);

  // Esperar a que v-calendar termine su ciclo reactivo antes de cerrar
  nextTick(() => {
    closeCalendar();
  });
};

// Inicializar con valor existente
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    selectedDate.value = new Date(newValue);
    inputValue.value = isoToDisplay(newValue);
    inputError.value = '';
  } else {
    selectedDate.value = null;
    inputValue.value = '';
  }
}, { immediate: true });

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
