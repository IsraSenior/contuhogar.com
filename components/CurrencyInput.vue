<template>
  <div>
    <div class="relative">
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">
        COP
      </span>
      <input
        :id="id"
        :name="id"
        ref="inputRef"
        v-model="displayValue"
        type="text"
        inputmode="numeric"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 transition-all outline-none"
        :class="[
          inputClass,
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-primary focus:border-transparent'
        ]"
        @input="handleInput"
        @blur="handleBlur"
      />
    </div>
    <p v-if="errorMessage" class="text-red-500 text-sm mt-1">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: number | null;
  id?: string;
  placeholder?: string;
  min?: number;
  step?: number;
  disabled?: boolean;
  inputClass?: string;
  error?: boolean;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  step: 1000000,
  disabled: false,
  placeholder: '0',
  inputClass: '',
  error: false,
  errorMessage: ''
});

const emit = defineEmits<{
  'update:modelValue': [value: number | null];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const displayValue = ref('');

/**
 * Formatea un número con separadores de miles (puntos)
 */
const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined || isNaN(value) || value === 0) {
    return '';
  }
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Parsea un string formateado a número
 * Elimina todos los caracteres que no sean dígitos
 */
const parseFormattedValue = (formatted: string): number | null => {
  const cleaned = formatted.replace(/\D/g, '');
  if (cleaned === '' || cleaned === '0') {
    return null;
  }
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? null : parsed;
};

/**
 * Valor formateado para mostrar en el input
 */
const formattedValue = computed(() => {
  return formatNumber(props.modelValue);
});

/**
 * Maneja el evento input (mientras el usuario escribe)
 */
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const cursorPosition = target.selectionStart || 0;
  const previousValue = displayValue.value;
  const inputValue = target.value;

  // Parsear el valor ingresado
  const numericValue = parseFormattedValue(inputValue);

  // Emitir el valor numérico
  emit('update:modelValue', numericValue);

  // Actualizar el valor de display
  displayValue.value = formatNumber(numericValue);

  // En el siguiente tick, restaurar la posición del cursor
  nextTick(() => {
    if (!inputRef.value) return;

    // Calcular nueva posición del cursor basada en la diferencia de longitud
    const lengthDiff = displayValue.value.length - previousValue.length;
    let newCursorPosition = cursorPosition + lengthDiff;

    // Ajustar posición si el cursor está en un separador
    if (newCursorPosition > 0 && displayValue.value[newCursorPosition - 1] === '.') {
      newCursorPosition++;
    }

    // Asegurar que la posición del cursor está dentro del rango
    newCursorPosition = Math.max(0, Math.min(newCursorPosition, displayValue.value.length));

    // Establecer la posición del cursor
    inputRef.value.setSelectionRange(newCursorPosition, newCursorPosition);
  });
};

/**
 * Maneja el evento blur (cuando el input pierde el foco)
 */
const handleBlur = () => {
  // Asegurar que el valor esté correctamente formateado
  if (props.modelValue !== null && props.modelValue < props.min) {
    emit('update:modelValue', props.min);
  }
};

// Sincronizar displayValue con modelValue cuando cambia externamente
watch(() => props.modelValue, (newValue) => {
  displayValue.value = formatNumber(newValue);
}, { immediate: true });
</script>
