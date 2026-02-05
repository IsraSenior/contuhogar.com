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
          name="nombres"
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
          name="apellidos"
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

    <!-- Grid 2 columnas para Fecha de Nacimiento y Teléfono -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Fecha de Nacimiento -->
      <div>
        <label for="fechaNacimiento" class="block text-sm font-semibold text-gray-700 mb-2">
          Fecha de nacimiento <span class="text-red-500">*</span>
        </label>
        <DatePicker
          v-model="localFechaNacimiento"
          :max-date="maxDateObj"
          :min-date="minDateObj"
          placeholder="DD/MM/AAAA"
          :error="!!validationErrors.fechaNacimiento"
          @update:model-value="calculateAge"
        />
        <p v-if="validationErrors.fechaNacimiento" class="mt-1 text-sm text-red-600">
          {{ validationErrors.fechaNacimiento }}
        </p>
        <div v-else-if="calculatedAge" class="mt-2 flex items-center gap-2">
          <span class="text-sm font-medium text-primary">
            Edad: {{ calculatedAge }} años
          </span>
        </div>
        <p v-else class="mt-2 text-sm text-gray-500">
          {{ EDAD_MINIMA }}-{{ EDAD_MAXIMA }} años
        </p>
      </div>

      <!-- Teléfono con selector de país -->
      <div>
        <label for="telefono" class="block text-sm font-semibold text-gray-700 mb-2">
          Teléfono <span class="text-red-500">*</span>
        </label>
        <div class="flex gap-2">
          <!-- Selector de país -->
          <div class="shrink-0 w-28">
            <PhoneCountryCombobox
              v-model="localTelefonoCodigo"
              :options="phoneDropdownOptions"
            />
          </div>
          <!-- Input de teléfono -->
          <div class="flex-1">
            <input
              id="telefono"
              name="telefono"
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
          </div>
        </div>
        <p v-if="validationErrors.telefono" class="mt-1 text-sm text-red-600">
          {{ validationErrors.telefono }}
        </p>
        <!-- Hint del formato -->
        <p v-else-if="getPhoneFormat(localTelefonoCodigo.code)" class="mt-1 text-xs text-gray-500 font-mono">
          Formato: {{ getPhoneFormat(localTelefonoCodigo.code)?.format }}
        </p>
      </div>
    </div>

    <!-- Grid 2 columnas para Correo y País de Residencia -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Correo electrónico -->
      <div>
        <label for="correo" class="block text-sm font-semibold text-gray-700 mb-2">
          Correo electrónico <span class="text-red-500">*</span>
        </label>
        <input
          id="correo"
          name="correo"
          v-model="localCorreo"
          type="email"
          placeholder="Ej: tu@correo.com"
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

      <!-- País de Residencia -->
      <div>
        <label for="paisResidencia" class="block text-sm font-semibold text-gray-700 mb-2">
          País de residencia actual <span class="text-red-500">*</span>
        </label>
        <CountryCombobox
          v-model="localPaisResidencia"
          :options="paisesResidencia"
          placeholder="Selecciona tu país"
          :error="!!validationErrors.paisResidencia"
        />
        <p v-if="validationErrors.paisResidencia" class="mt-1 text-sm text-red-600">
          {{ validationErrors.paisResidencia }}
        </p>
      </div>
    </div>

    <!-- Tipo de Inmueble -->
    <div>
      <span id="tipo-inmueble-label" class="block text-sm font-semibold text-gray-700 mb-2">
        Tipo de inmueble <span class="text-red-500">*</span>
      </span>
      <div class="grid grid-cols-3 gap-2" role="group" aria-labelledby="tipo-inmueble-label">
        <button
          v-for="tipo in tiposInmueble"
          :key="tipo.value"
          type="button"
          @click="selectTipoInmueble(tipo.value)"
          class="px-3 py-2.5 rounded-lg border-2 transition-all flex items-center justify-center gap-2"
          :class="{
            'border-primary bg-primary/5 text-primary': localTipoInmueble === tipo.value,
            'border-gray-200 hover:border-gray-300': localTipoInmueble !== tipo.value,
            'border-red-500': validationErrors.tipoInmueble && !localTipoInmueble
          }"
        >
          <!-- Icono Nuevo: Edificio en construcción -->
          <svg v-if="tipo.icon === 'nuevo'" class="w-5 h-5 shrink-0" :class="localTipoInmueble === tipo.value ? 'text-primary' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <!-- Icono Usado: Casa -->
          <svg v-else-if="tipo.icon === 'usado'" class="w-5 h-5 shrink-0" :class="localTipoInmueble === tipo.value ? 'text-primary' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <!-- Icono Por definir: Interrogante -->
          <svg v-else class="w-5 h-5 shrink-0" :class="localTipoInmueble === tipo.value ? 'text-primary' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium text-sm">{{ tipo.label }}</span>
        </button>
      </div>
      <p v-if="validationErrors.tipoInmueble" class="mt-1 text-sm text-red-600">
        {{ validationErrors.tipoInmueble }}
      </p>
    </div>

    <!-- Tipo de Crédito -->
    <div>
      <span id="tipo-credito-label" class="block text-sm font-semibold text-gray-700 mb-3">
        Tipo de crédito que deseas <span class="text-red-500">*</span>
      </span>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-labelledby="tipo-credito-label">
        <!-- Hipotecario -->
        <button
          type="button"
          @click="selectTipoCredito('hipotecario')"
          class="relative px-4 py-3 border-2 rounded-xl transition-all duration-300 text-left"
          :class="{
            'border-primary bg-primary/5 shadow-md':
              localTipoCredito === 'hipotecario',
            'border-gray-300 hover:border-gray-400': localTipoCredito !== 'hipotecario'
          }"
        >
          <div class="flex items-center gap-3">
            <div
              class="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              :class="{
                'bg-primary':
                  localTipoCredito === 'hipotecario',
                'bg-gray-100': localTipoCredito !== 'hipotecario'
              }"
            >
              <svg
                class="w-5 h-5"
                :class="{
                  'text-white': localTipoCredito === 'hipotecario',
                  'text-gray-600': localTipoCredito !== 'hipotecario'
                }"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="font-semibold text-sm leading-tight"
                :class="{
                  'text-primary': localTipoCredito === 'hipotecario',
                  'text-gray-800': localTipoCredito !== 'hipotecario'
                }"
              >
                Crédito hipotecario
              </h3>
              <p class="text-xs text-gray-500">Hasta el 70%</p>
            </div>
          </div>
          <div
            v-if="localTipoCredito === 'hipotecario'"
            class="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
          >
            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </button>

        <!-- Leasing -->
        <button
          type="button"
          @click="selectTipoCredito('leasing')"
          class="relative px-4 py-3 border-2 rounded-xl transition-all duration-300 text-left"
          :class="{
            'border-primary bg-primary/5 shadow-md':
              localTipoCredito === 'leasing',
            'border-gray-300 hover:border-gray-400': localTipoCredito !== 'leasing'
          }"
        >
          <div class="flex items-center gap-3">
            <div
              class="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              :class="{
                'bg-primary':
                  localTipoCredito === 'leasing',
                'bg-gray-100': localTipoCredito !== 'leasing'
              }"
            >
              <svg
                class="w-5 h-5"
                :class="{
                  'text-white': localTipoCredito === 'leasing',
                  'text-gray-600': localTipoCredito !== 'leasing'
                }"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path fill-rule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="font-semibold text-sm leading-tight"
                :class="{
                  'text-primary': localTipoCredito === 'leasing',
                  'text-gray-800': localTipoCredito !== 'leasing'
                }"
              >
                Leasing habitacional
              </h3>
              <p class="text-xs text-gray-500">Hasta el 80%</p>
            </div>
          </div>
          <div
            v-if="localTipoCredito === 'leasing'"
            class="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
          >
            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </button>

        <!-- Remodelacion -->
        <button
          type="button"
          @click="selectTipoCredito('remodelacion')"
          class="relative px-4 py-3 border-2 rounded-xl transition-all duration-300 text-left"
          :class="{
            'border-primary bg-primary/5 shadow-md':
              localTipoCredito === 'remodelacion',
            'border-gray-300 hover:border-gray-400': localTipoCredito !== 'remodelacion'
          }"
        >
          <div class="flex items-center gap-3">
            <div
              class="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              :class="{
                'bg-primary':
                  localTipoCredito === 'remodelacion',
                'bg-gray-100': localTipoCredito !== 'remodelacion'
              }"
            >
              <svg
                class="w-5 h-5"
                :class="{
                  'text-white': localTipoCredito === 'remodelacion',
                  'text-gray-600': localTipoCredito !== 'remodelacion'
                }"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path fill-rule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="font-semibold text-sm leading-tight"
                :class="{
                  'text-primary': localTipoCredito === 'remodelacion',
                  'text-gray-800': localTipoCredito !== 'remodelacion'
                }"
              >
                Crédito de remodelación
              </h3>
              <p class="text-xs text-gray-500">Hasta el 70%</p>
            </div>
          </div>
          <div
            v-if="localTipoCredito === 'remodelacion'"
            class="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
          >
            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </button>

        <!-- Compra de Cartera -->
        <button
          type="button"
          @click="selectTipoCredito('compra_cartera')"
          class="relative px-4 py-3 border-2 rounded-xl transition-all duration-300 text-left"
          :class="{
            'border-primary bg-primary/5 shadow-md':
              localTipoCredito === 'compra_cartera',
            'border-gray-300 hover:border-gray-400': localTipoCredito !== 'compra_cartera'
          }"
        >
          <div class="flex items-center gap-3">
            <div
              class="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              :class="{
                'bg-primary':
                  localTipoCredito === 'compra_cartera',
                'bg-gray-100': localTipoCredito !== 'compra_cartera'
              }"
            >
              <svg
                class="w-5 h-5"
                :class="{
                  'text-white': localTipoCredito === 'compra_cartera',
                  'text-gray-600': localTipoCredito !== 'compra_cartera'
                }"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path fill-rule="evenodd" d="M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="font-semibold text-sm leading-tight"
                :class="{
                  'text-primary': localTipoCredito === 'compra_cartera',
                  'text-gray-800': localTipoCredito !== 'compra_cartera'
                }"
              >
                Compra de cartera
              </h3>
              <p class="text-xs text-gray-500">Hasta el 70%</p>
            </div>
          </div>
          <div
            v-if="localTipoCredito === 'compra_cartera'"
            class="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
          >
            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TipoCredito, TipoInmueble, CodigoPaisTelefono } from '~/types/simulador';
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
const localPaisResidencia = ref<string>(store.datosBien.paisResidencia || '');
const localTipoInmueble = ref<TipoInmueble | null>(store.datosBien.tipoInmueble);
const localTipoCredito = ref<TipoCredito | null>(store.datosPersonales.tipoCredito);
const calculatedAge = ref<number | null>(store.datosPersonales.edad);

// Lista de países de residencia común para colombianos en el exterior
const paisesResidencia = [
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: 'ES', name: 'España', flag: '🇪🇸' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'CA', name: 'Canadá', flag: '🇨🇦' },
  { code: 'PA', name: 'Panamá', flag: '🇵🇦' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'GB', name: 'Reino Unido', flag: '🇬🇧' },
  { code: 'DE', name: 'Alemania', flag: '🇩🇪' },
  { code: 'FR', name: 'Francia', flag: '🇫🇷' },
  { code: 'IT', name: 'Italia', flag: '🇮🇹' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AE', name: 'Emiratos Árabes Unidos', flag: '🇦🇪' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'OTHER', name: 'Otro país', flag: '🌍' }
];

// Opciones de tipo de inmueble
const tiposInmueble = [
  { value: 'nuevo' as TipoInmueble, label: 'Nuevo', icon: 'nuevo' },
  { value: 'usado' as TipoInmueble, label: 'Usado', icon: 'usado' },
  { value: 'por_definir' as TipoInmueble, label: 'Por definir', icon: 'por_definir' }
];

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
  correo: '',
  paisResidencia: '',
  tipoInmueble: ''
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
 * Selecciona el tipo de inmueble
 */
const selectTipoInmueble = (tipo: TipoInmueble) => {
  validationErrors.value.tipoInmueble = '';
  localTipoInmueble.value = tipo;
  store.updateDatosBien({ tipoInmueble: tipo });
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

// Watcher para el país de residencia
watch(localPaisResidencia, (value) => {
  if (value) {
    validationErrors.value.paisResidencia = '';
    store.updateDatosBien({ paisResidencia: value });
  }
});

// Cargar datos del store al montar y auto-detectar país
onMounted(async () => {
  localNombres.value = store.datosPersonales.nombres || '';
  localApellidos.value = store.datosPersonales.apellidos || '';
  localFechaNacimiento.value = store.datosPersonales.fechaNacimiento || '';
  localTelefono.value = store.datosPersonales.telefono || '';
  localTelefonoCodigo.value = store.datosPersonales.telefonoCodigo;
  localCorreo.value = store.datosPersonales.correo || '';
  localPaisResidencia.value = store.datosBien.paisResidencia || '';
  localTipoInmueble.value = store.datosBien.tipoInmueble;
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
    } catch {
      // Silent fail - use default country
    }
  }
});
</script>
