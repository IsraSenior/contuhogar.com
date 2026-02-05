<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">
        Preguntas de elegibilidad
      </h2>
      <p class="text-gray-600">
        Estas preguntas son cruciales para determinar si puedes aplicar al crédito.
      </p>
    </div>

    <!-- Accordion Container -->
    <div class="space-y-4">
      <!-- Pregunta 1: Status Migratorio -->
      <div
        class="border-2 rounded-xl overflow-hidden transition-all"
        :class="{
          'border-gray-200': localStatusMigratorio === null || localStatusMigratorio === true,
          'border-red-300 bg-red-50/30': localStatusMigratorio === false
        }"
      >
        <!-- Header -->
        <button
          type="button"
          @click="toggleQuestion(1)"
          class="w-full p-6 bg-white hover:bg-gray-50 transition-colors text-left"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3">
                <!-- Status Icon -->
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  :class="{
                    'bg-green-500 text-white': localStatusMigratorio === true,
                    'bg-red-500 text-white': localStatusMigratorio === false,
                    'bg-gray-200 text-gray-500': localStatusMigratorio === null
                  }"
                >
                  <span v-if="localStatusMigratorio === true">✓</span>
                  <span v-else-if="localStatusMigratorio === false">✗</span>
                  <span v-else>?</span>
                </div>
                <div class="flex-1">
                  <h3 class="text-base font-semibold text-gray-800">
                    ¿Tienes estatus migratorio definido y regular para trabajar?
                    <span class="text-red-500">*</span>
                  </h3>
                  <!-- Respuesta seleccionada cuando está cerrado -->
                  <p
                    v-if="openQuestion !== 1 && localStatusMigratorio !== null"
                    class="text-sm mt-1"
                    :class="{
                      'text-green-600': localStatusMigratorio === true,
                      'text-red-600': localStatusMigratorio === false
                    }"
                  >
                    {{ localStatusMigratorio ? 'Sí, tengo estatus migratorio regular' : 'No, no tengo estatus migratorio regular' }}
                  </p>
                </div>
              </div>
            </div>
            <!-- Chevron Icon -->
            <svg
              class="w-5 h-5 text-gray-500 transition-transform duration-200 shrink-0 ml-3"
              :class="{ 'rotate-180': openQuestion === 1 }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        <!-- Content -->
        <Transition name="accordion">
          <div v-if="openQuestion === 1" class="px-6 pb-6 bg-white">
            <p class="text-sm text-gray-600 mb-4">
              Necesitas tener documentos legales que te permitan trabajar regularmente.
            </p>

            <div class="space-y-3">
              <button
                type="button"
                @click="selectStatusMigratorio(true)"
                class="w-full p-4 border-2 rounded-lg transition-all duration-300 text-left flex items-center justify-between"
                :class="{
                  'border-green-500 bg-green-50': localStatusMigratorio === true,
                  'border-gray-300 hover:border-gray-400': localStatusMigratorio !== true
                }"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    :class="{
                      'bg-green-500 text-white': localStatusMigratorio === true,
                      'bg-gray-100': localStatusMigratorio !== true
                    }"
                  >
                    ✓
                  </div>
                  <span class="font-medium text-gray-800">
                    Sí, tengo estatus migratorio regular
                  </span>
                </div>
              </button>

              <button
                type="button"
                @click="selectStatusMigratorio(false)"
                class="w-full p-4 border-2 rounded-lg transition-all duration-300 text-left flex items-center justify-between"
                :class="{
                  'border-red-500 bg-red-50': localStatusMigratorio === false,
                  'border-gray-300 hover:border-gray-400': localStatusMigratorio !== false
                }"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    :class="{
                      'bg-red-500 text-white': localStatusMigratorio === false,
                      'bg-gray-100': localStatusMigratorio !== false
                    }"
                  >
                    ✗
                  </div>
                  <span class="font-medium text-gray-800">
                    No, no tengo estatus migratorio regular
                  </span>
                </div>
              </button>
            </div>

            <!-- Blocked Message Inline -->
            <div v-if="localStatusMigratorio === false" class="mt-4 flex items-start gap-3 py-3">
              <svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <div class="flex-1">
                <p class="text-sm font-semibold text-red-600 mb-1">
                  No puedes continuar con la solicitud
                </p>
                <p class="text-sm text-gray-600 mb-3">
                  Sin estatus migratorio regular no podemos procesar tu solicitud actualmente. Sin embargo, nuestros asesores pueden ayudarte a explorar opciones alternativas.
                </p>
                <NuxtLink
                  to="/contacto"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contacta a tu ejecutivo de crédito
                </NuxtLink>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Pregunta 2: Reportes Negativos -->
      <div
        class="border-2 rounded-xl overflow-hidden transition-all"
        :class="{
          'border-gray-200': localReportesNegativos === null || localReportesNegativos === false,
          'border-red-300 bg-red-50/30': localReportesNegativos === true,
          'opacity-50 pointer-events-none': localStatusMigratorio === false
        }"
      >
        <!-- Header -->
        <button
          type="button"
          @click="toggleQuestion(2)"
          :disabled="localStatusMigratorio === false"
          class="w-full p-6 bg-white hover:bg-gray-50 transition-colors text-left disabled:cursor-not-allowed"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3">
                <!-- Status Icon -->
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  :class="{
                    'bg-green-500 text-white': localReportesNegativos === false,
                    'bg-red-500 text-white': localReportesNegativos === true,
                    'bg-gray-200 text-gray-500': localReportesNegativos === null
                  }"
                >
                  <span v-if="localReportesNegativos === false">✓</span>
                  <span v-else-if="localReportesNegativos === true">✗</span>
                  <span v-else>?</span>
                </div>
                <div class="flex-1">
                  <h3 class="text-base font-semibold text-gray-800">
                    ¿Tienes reportes negativos en centrales de riesgo?
                    <span class="text-red-500">*</span>
                  </h3>
                  <!-- Respuesta seleccionada cuando está cerrado -->
                  <p
                    v-if="openQuestion !== 2 && localReportesNegativos !== null"
                    class="text-sm mt-1"
                    :class="{
                      'text-green-600': localReportesNegativos === false,
                      'text-red-600': localReportesNegativos === true
                    }"
                  >
                    {{ localReportesNegativos ? 'Sí, tengo reportes negativos' : 'No, no tengo reportes negativos' }}
                  </p>
                </div>
              </div>
            </div>
            <!-- Chevron Icon -->
            <svg
              class="w-5 h-5 text-gray-500 transition-transform duration-200 shrink-0 ml-3"
              :class="{ 'rotate-180': openQuestion === 2 }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        <!-- Content -->
        <Transition name="accordion">
          <div v-if="openQuestion === 2" class="px-6 pb-6 bg-white">
            <p class="text-sm text-gray-600 mb-4">
              Nos referimos a mora en créditos, tarjetas de crédito u otras obligaciones financieras.
            </p>

            <div class="space-y-3">
              <button
                type="button"
                @click="selectReportesNegativos(false)"
                class="w-full p-4 border-2 rounded-lg transition-all duration-300 text-left flex items-center justify-between"
                :class="{
                  'border-green-500 bg-green-50': localReportesNegativos === false,
                  'border-gray-300 hover:border-gray-400': localReportesNegativos !== false
                }"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    :class="{
                      'bg-green-500 text-white': localReportesNegativos === false,
                      'bg-gray-100': localReportesNegativos !== false
                    }"
                  >
                    ✓
                  </div>
                  <span class="font-medium text-gray-800">
                    No, no tengo reportes negativos
                  </span>
                </div>
              </button>

              <button
                type="button"
                @click="selectReportesNegativos(true)"
                class="w-full p-4 border-2 rounded-lg transition-all duration-300 text-left flex items-center justify-between"
                :class="{
                  'border-red-500 bg-red-50': localReportesNegativos === true,
                  'border-gray-300 hover:border-gray-400': localReportesNegativos !== true
                }"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    :class="{
                      'bg-red-500 text-white': localReportesNegativos === true,
                      'bg-gray-100': localReportesNegativos !== true
                    }"
                  >
                    ✗
                  </div>
                  <span class="font-medium text-gray-800">
                    Sí, tengo reportes negativos
                  </span>
                </div>
              </button>
            </div>

            <!-- Blocked Message Inline -->
            <div v-if="localReportesNegativos === true" class="mt-4 flex items-start gap-3 py-3">
              <svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <div class="flex-1">
                <p class="text-sm font-semibold text-red-600 mb-1">
                  No puedes continuar con la solicitud
                </p>
                <p class="text-sm text-gray-600 mb-3">
                  Con reportes negativos activos no podemos procesar tu crédito. Te recomendamos sanear tu historial crediticio y contactar a nuestros asesores para evaluar tu caso.
                </p>
                <NuxtLink
                  to="/contacto"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contacta a tu ejecutivo de crédito
                </NuxtLink>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Help Message Inline -->
    <div v-if="hasBlockingIssue" class="flex items-start gap-3 py-4 border-t border-gray-200 mt-6 pt-6">
      <svg class="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
      </svg>
      <div>
        <p class="text-sm font-semibold text-gray-800 mb-1">
          ¿Necesitas ayuda personalizada?
        </p>
        <p class="text-sm text-gray-600 mb-3">
          Aunque tu situación actual no te permite acceder a un crédito directamente, nuestros asesores especializados pueden ofrecerte alternativas y ayudarte a mejorar tu perfil crediticio.
        </p>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            to="/contacto"
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Agendar asesoría gratuita
          </NuxtLink>
          <a
            href="https://wa.me/573150540000?text=Hola,%20necesito%20ayuda%20con%20mi%20solicitud%20de%20crédito"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>

    <!-- Info Message Inline -->
    <div v-else class="flex items-start gap-3 py-4 border-t border-gray-200 mt-6 pt-6">
      <svg class="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="text-sm text-gray-600">
        <strong class="text-gray-800">Información:</strong> Estas respuestas son determinantes para tu elegibilidad. Si tienes dudas, te recomendamos contactar a nuestros asesores antes de continuar.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useSimuladorStore();

const localStatusMigratorio = ref<boolean | null>(store.datosElegibilidad.statusMigratorio);
const localReportesNegativos = ref<boolean | null>(store.datosElegibilidad.reportesNegativos);
const openQuestion = ref<number | null>(1); // Primera pregunta abierta por defecto

const hasBlockingIssue = computed(() => {
  return localStatusMigratorio.value === false || localReportesNegativos.value === true;
});

const toggleQuestion = (questionNumber: number) => {
  // No permitir cambiar de pregunta si hay respuesta bloqueante en la pregunta actual
  if (questionNumber === 1 && localStatusMigratorio.value === false) {
    return; // Mantener la pregunta 1 abierta
  }
  if (questionNumber === 2 && localReportesNegativos.value === true) {
    return; // Mantener la pregunta 2 abierta
  }

  // Si la pregunta ya está abierta, NO permitir cerrarla (siempre debe haber una abierta)
  if (openQuestion.value === questionNumber) {
    return; // No hacer nada - mantener al menos una pregunta abierta
  } else {
    // Si no, abrimos la nueva pregunta
    openQuestion.value = questionNumber;
  }
};

const selectStatusMigratorio = (value: boolean) => {
  localStatusMigratorio.value = value;
  store.updateDatosElegibilidad({ statusMigratorio: value });

  if (value === true) {
    // Si es positivo, avanzar a la siguiente pregunta
    openQuestion.value = 2;
  } else {
    // Si es negativo, mantener el accordion abierto para mostrar el mensaje de bloqueo
    openQuestion.value = 1;
  }
};

const selectReportesNegativos = (value: boolean) => {
  localReportesNegativos.value = value;
  store.updateDatosElegibilidad({ reportesNegativos: value });

  if (value === false) {
    // Si es positivo (no tiene reportes), cerrar accordion
    openQuestion.value = null;
  } else {
    // Si es negativo (sí tiene reportes), mantener accordion abierto
    openQuestion.value = 2;
  }
};

// Cargar datos al montar
onMounted(() => {
  localStatusMigratorio.value = store.datosElegibilidad.statusMigratorio;
  localReportesNegativos.value = store.datosElegibilidad.reportesNegativos;

  // Si ya hay respuestas, determinar qué abrir
  if (localStatusMigratorio.value === false) {
    openQuestion.value = 1; // Mantener pregunta 1 abierta si es bloqueante
  } else if (localReportesNegativos.value === true) {
    openQuestion.value = 2; // Mantener pregunta 2 abierta si es bloqueante
  } else if (localStatusMigratorio.value !== null && localReportesNegativos.value !== null) {
    openQuestion.value = null; // Cerrar todo si ambas están respondidas positivamente
  }
});
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 600px;
  opacity: 1;
}
</style>
