<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">
        Información personal
      </h2>
      <p class="text-gray-600">
        Para comenzar, necesitamos conocer un poco sobre ti.
      </p>
    </div>

    <!-- Grid 2 columnas para Nombres y Apellidos -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Nombres -->
      <div>
        <label for="nombres" class="block text-sm font-semibold text-gray-700 mb-2">
          Nombres <span class="text-red-500">*</span>
        </label>
        <input
          id="nombres"
          v-model="localNombres"
          type="text"
          placeholder="Ej: Juan Carlos"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
          :class="{
            'border-red-500 ring-2 ring-red-200': validationErrors.nombres
          }"
          @blur="validateField('nombres')"
        />
        <p v-if="validationErrors.nombres" class="mt-1 text-sm text-red-600">
          {{ validationErrors.nombres }}
        </p>
      </div>

      <!-- Apellidos -->
      <div>
        <label for="apellidos" class="block text-sm font-semibold text-gray-700 mb-2">
          Apellidos <span class="text-red-500">*</span>
        </label>
        <input
          id="apellidos"
          v-model="localApellidos"
          type="text"
          placeholder="Ej: García Pérez"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
          :class="{
            'border-red-500 ring-2 ring-red-200': validationErrors.apellidos
          }"
          @blur="validateField('apellidos')"
        />
        <p v-if="validationErrors.apellidos" class="mt-1 text-sm text-red-600">
          {{ validationErrors.apellidos }}
        </p>
      </div>
    </div>

    <!-- Fecha de Nacimiento -->
    <div>
      <label for="fechaNacimiento" class="block text-sm font-semibold text-gray-700 mb-2">
        Fecha de nacimiento <span class="text-red-500">*</span>
      </label>
      <DatePicker
        v-model="localFechaNacimiento"
        :max-date="maxDateObj"
        :min-date="minDateObj"
        placeholder="Selecciona tu fecha de nacimiento"
        :error="!!validationErrors.fechaNacimiento"
        @update:model-value="calculateAge"
      />
      <p v-if="validationErrors.fechaNacimiento" class="mt-1 text-sm text-red-600">
        {{ validationErrors.fechaNacimiento }}
      </p>
      <p v-else class="mt-2 text-sm text-gray-500">
        Debes tener entre {{ EDAD_MINIMA }} y {{ EDAD_MAXIMA }} años
      </p>
      <div v-if="calculatedAge && !validationErrors.fechaNacimiento" class="mt-2 flex items-center gap-2">
        <span class="text-sm font-medium text-primary">
          Edad: {{ calculatedAge }} años
        </span>
      </div>
    </div>

    <!-- Teléfono con selector de país -->
    <div>
      <label for="telefono" class="block text-sm font-semibold text-gray-700 mb-2">
        Teléfono <span class="text-red-500">*</span>
      </label>
      <div class="grid grid-cols-3 gap-3">
        <!-- Selector de país -->
        <div class="col-span-1">
          <PhoneCountryCombobox
            v-model="localTelefonoCodigo"
            :options="phoneDropdownOptions"
          />
        </div>
        <!-- Input de teléfono -->
        <div class="col-span-2">
          <input
            id="telefono"
            v-model="localTelefono"
            type="tel"
            autocomplete="tel"
            :placeholder="`Ej: ${phonePlaceholder}`"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            :class="{
              'border-red-500 ring-2 ring-red-200': validationErrors.telefono
            }"
            @blur="validateField('telefono')"
            @input="formatPhoneInput"
          />
          <p v-if="validationErrors.telefono" class="mt-1 text-sm text-red-600">
            {{ validationErrors.telefono }}
          </p>
          <!-- Hint del formato -->
          <p v-else-if="getPhoneFormat(localTelefonoCodigo.code)" class="mt-1 text-xs text-gray-500 font-mono">
            Formato: {{ getPhoneFormat(localTelefonoCodigo.code)?.format }}
          </p>
        </div>
      </div>
    </div>

    <!-- Correo electrónico -->
    <div>
      <label for="correo" class="block text-sm font-semibold text-gray-700 mb-2">
        Correo electrónico <span class="text-red-500">*</span>
      </label>
      <input
        id="correo"
        v-model="localCorreo"
        type="email"
        placeholder="Ej: info@contuhogar.com"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
        :class="{
          'border-red-500 ring-2 ring-red-200': validationErrors.correo
        }"
        @blur="validateField('correo')"
      />
      <p v-if="validationErrors.correo" class="mt-1 text-sm text-red-600">
        {{ validationErrors.correo }}
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
              class="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
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
                Crédito hipotecario
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
              class="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
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
                Leasing habitacional
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
import type { TipoCredito, CodigoPaisTelefono } from '~/types/simulador';
import dialPhoneOptions from '@/db/tlf-dial.json';
import { getPhoneFormat, getDialCodeFromCountry } from '@/utils/phoneFormats';
import { useGeoLocation } from '@/composables/useGeoLocation';

const store = useSimuladorStore();
const { EDAD_MINIMA, EDAD_MAXIMA } = useSimuladorCalculations();
const { detectCountry } = useGeoLocation();

// Estados locales
const localNombres = ref<string>(store.datosPersonales.nombres || '');
const localApellidos = ref<string>(store.datosPersonales.apellidos || '');
const localFechaNacimiento = ref<string>(store.datosPersonales.fechaNacimiento || '');
const localTelefono = ref<string>(store.datosPersonales.telefono || '');
const localTelefonoCodigo = ref<CodigoPaisTelefono>(store.datosPersonales.telefonoCodigo);
const localCorreo = ref<string>(store.datosPersonales.correo || '');
const localTipoCredito = ref<TipoCredito | null>(store.datosPersonales.tipoCredito);
const calculatedAge = ref<number | null>(store.datosPersonales.edad);

// Opciones para el selector de país
const phoneDropdownOptions = dialPhoneOptions;

// Placeholder dinámico según el país seleccionado
const phonePlaceholder = computed(() => {
  const format = getPhoneFormat(localTelefonoCodigo.value.code);
  return format ? format.placeholder : '300 123 4567';
});

// Formatear el número de teléfono mientras el usuario escribe
const formatPhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const cursorPosition = input.selectionStart || 0;
  const oldValue = input.value;

  // Extraer solo los dígitos
  const digitsOnly = oldValue.replace(/\D/g, '');

  // Obtener el formato del país
  const format = getPhoneFormat(localTelefonoCodigo.value.code);

  if (!format || !format.mask) {
    localTelefono.value = digitsOnly;
    return;
  }

  // Aplicar el formato usando la máscara
  let formatted = '';
  let digitIndex = 0;
  let newCursorPosition = cursorPosition;

  for (let i = 0; i < format.mask.length && digitIndex < digitsOnly.length; i++) {
    const maskChar = format.mask[i];

    if (maskChar === '#') {
      formatted += digitsOnly[digitIndex];
      digitIndex++;
    } else {
      formatted += maskChar;
      if (formatted.length <= cursorPosition) {
        newCursorPosition++;
      }
    }
  }

  // Actualizar el valor
  localTelefono.value = formatted;

  // Restaurar la posición del cursor en el siguiente tick
  nextTick(() => {
    input.setSelectionRange(newCursorPosition, newCursorPosition);
  });
};

// Validaciones
const validationErrors = ref<Record<string, string>>({
  nombres: '',
  apellidos: '',
  fechaNacimiento: '',
  telefono: '',
  correo: ''
});

// Fechas límite para el date picker
const today = new Date();
const maxDateObj = computed(() => {
  const date = new Date(today);
  date.setFullYear(date.getFullYear() - EDAD_MINIMA);
  return date;
});

const minDateObj = computed(() => {
  const date = new Date(today);
  date.setFullYear(date.getFullYear() - EDAD_MAXIMA);
  return date;
});

/**
 * Calcula la edad a partir de la fecha de nacimiento
 */
const calculateAge = () => {
  validationErrors.value.fechaNacimiento = '';

  if (!localFechaNacimiento.value) {
    calculatedAge.value = null;
    store.updateDatosPersonales({ edad: null });
    return;
  }

  const birthDate = new Date(localFechaNacimiento.value);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Ajustar si aún no ha cumplido años este año
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Validar rango de edad
  if (age < EDAD_MINIMA || age > EDAD_MAXIMA) {
    validationErrors.value.fechaNacimiento = `Debes tener entre ${EDAD_MINIMA} y ${EDAD_MAXIMA} años`;
    calculatedAge.value = age;
    store.updateDatosPersonales({ edad: null });
  } else {
    calculatedAge.value = age;
    store.updateDatosPersonales({
      fechaNacimiento: localFechaNacimiento.value,
      edad: age
    });
  }
};

/**
 * Valida un campo específico
 */
const validateField = (field: string) => {
  validationErrors.value[field] = '';

  switch (field) {
    case 'nombres':
      if (!localNombres.value.trim()) {
        validationErrors.value.nombres = 'Por favor ingresa tus nombres';
      } else {
        store.updateDatosPersonales({ nombres: localNombres.value.trim() });
      }
      break;

    case 'apellidos':
      if (!localApellidos.value.trim()) {
        validationErrors.value.apellidos = 'Por favor ingresa tus apellidos';
      } else {
        store.updateDatosPersonales({ apellidos: localApellidos.value.trim() });
      }
      break;

    case 'telefono':
      if (!localTelefono.value.trim()) {
        validationErrors.value.telefono = 'Por favor ingresa tu teléfono';
      } else {
        store.updateDatosPersonales({ telefono: localTelefono.value.trim() });
      }
      break;

    case 'correo':
      if (!localCorreo.value.trim()) {
        validationErrors.value.correo = 'Por favor ingresa tu correo';
      } else if (!isValidEmail(localCorreo.value)) {
        validationErrors.value.correo = 'Por favor ingresa un correo válido';
      } else {
        store.updateDatosPersonales({ correo: localCorreo.value.trim() });
      }
      break;
  }
};

/**
 * Valida formato de email
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Selecciona el tipo de crédito
 */
const selectTipoCredito = (tipo: TipoCredito) => {
  localTipoCredito.value = tipo;
  store.updateDatosPersonales({ tipoCredito: tipo });
};

// Watchers para sincronizar con el store
watch(localNombres, (value) => {
  if (value.trim()) {
    store.updateDatosPersonales({ nombres: value.trim() });
  }
});

watch(localApellidos, (value) => {
  if (value.trim()) {
    store.updateDatosPersonales({ apellidos: value.trim() });
  }
});

watch(localTelefono, (value) => {
  if (value.trim()) {
    store.updateDatosPersonales({ telefono: value.trim() });
  }
});

watch(localCorreo, (value) => {
  if (value.trim() && isValidEmail(value)) {
    store.updateDatosPersonales({ correo: value.trim() });
  }
});

// Watcher para el código de país del teléfono
watch(localTelefonoCodigo, (value) => {
  store.updateDatosPersonales({ telefonoCodigo: value });
});

// Cargar datos del store al montar y auto-detectar país
onMounted(async () => {
  localNombres.value = store.datosPersonales.nombres || '';
  localApellidos.value = store.datosPersonales.apellidos || '';
  localFechaNacimiento.value = store.datosPersonales.fechaNacimiento || '';
  localTelefono.value = store.datosPersonales.telefono || '';
  localTelefonoCodigo.value = store.datosPersonales.telefonoCodigo;
  localCorreo.value = store.datosPersonales.correo || '';
  localTipoCredito.value = store.datosPersonales.tipoCredito;
  calculatedAge.value = store.datosPersonales.edad;

  // Auto-detectar país del usuario si no hay teléfono guardado
  if (!store.datosPersonales.telefono) {
    try {
      const detectedCountry = await detectCountry();

      if (detectedCountry) {
        const dialCode = getDialCodeFromCountry(detectedCountry);

        if (dialCode) {
          const countryOption = phoneDropdownOptions.find(opt => opt.code === dialCode);

          if (countryOption) {
            localTelefonoCodigo.value = countryOption;
            store.updateDatosPersonales({ telefonoCodigo: countryOption });
          }
        }
      }
    } catch (e) {
      console.warn('Country detection failed, using default:', e);
    }
  }
});
</script>
