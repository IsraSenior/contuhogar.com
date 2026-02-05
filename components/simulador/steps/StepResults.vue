<template>
  <div class="space-y-8">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="mt-4 text-gray-600">Calculando tu resultado...</p>
    </div>

    <!-- RESULTADO: APROBADO -->
    <div v-else-if="resultado?.resultado === 'aprobado'" class="animate-fade-in">

      <!-- Header con resultado -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>

        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-1">
          ¡Preaprobado!
        </h2>
        <p class="text-gray-500">
          Cumples con los requisitos iniciales
        </p>
        <!-- Auto-save indicator -->
        <p v-if="saveStatus === 'saved'" class="text-xs text-gray-400 mt-2">
          Simulación guardada
        </p>
      </div>

      <!-- Card principal con cifras destacadas -->
      <div class="bg-primary rounded-2xl p-6 mb-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center">
            <p class="text-xs text-white/70 uppercase tracking-wide mb-1">Monto preaprobado</p>
            <p class="text-2xl font-bold text-white">{{ formatCurrency(store.datosBien.montoSolicitado!) }}</p>
          </div>
          <div class="text-center border-l border-white/20">
            <p class="text-xs text-white/70 uppercase tracking-wide mb-1">Cuota mensual</p>
            <p class="text-2xl font-bold text-white">{{ formatCurrency(resultado.cuotaMensual) }}</p>
          </div>
        </div>
      </div>

      <!-- Tabla de detalles -->
      <div class="bg-gray-50 rounded-xl overflow-hidden mb-6">
        <div class="px-4 py-3 bg-gray-100 border-b border-gray-200">
          <h3 class="text-sm font-semibold text-gray-700">Detalles del crédito</h3>
        </div>
        <table class="w-full">
          <tbody class="divide-y divide-gray-200">
            <tr>
              <td class="px-4 py-3 text-sm text-gray-600">Plazo</td>
              <td class="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                {{ store.datosBien.plazoMeses }} meses ({{ Math.floor(store.datosBien.plazoMeses / 12) }} años)
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-sm text-gray-600">Tasa de interés (E.A.)</td>
              <td class="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                {{ formatPercentage(resultado.tasaEA * 100) }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-sm text-gray-600">Financiación del inmueble</td>
              <td class="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                {{ formatPercentageUp(resultado.porcentajeFinanciacion, 0) }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-sm text-gray-600">Compromiso de ingresos</td>
              <td class="px-4 py-3 text-sm font-medium text-right">
                <span class="inline-flex items-center gap-1 text-green-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  {{ formatPercentageUp(resultado.porcentajeCompromiso, 0) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Análisis breve -->
      <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8">
        <p class="text-sm text-blue-800">
          <strong>Tu capacidad de pago es saludable.</strong> La cuota representa el
          <strong>{{ formatPercentageUp(resultado.porcentajeCompromiso, 0) }}</strong> de tus ingresos,
          dentro del límite recomendado del 30%.
        </p>
      </div>

      <!-- CTA Section -->
      <div class="border-t border-gray-200 pt-6">
        <p class="text-sm text-gray-600 mb-4 text-center">
          Este es un resultado preliminar. Un asesor revisará tu caso y te ayudará a completar la solicitud.
        </p>

        <!-- Botones principales: PDF primero en mobile, lado a lado en desktop -->
        <div class="flex flex-col-reverse sm:flex-row gap-3 mb-4">
          <button
            @click="handleContactClick"
            class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contacta a tu ejecutivo de crédito
          </button>
          <button
            v-if="canDownloadPDF(resultado)"
            @click="handleDownloadPDF"
            :disabled="isGenerating"
            class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
          >
            <svg v-if="isGenerating" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {{ isGenerating ? 'Generando...' : 'Descargar tu preaprobación' }}
          </button>
        </div>

        <!-- Mensaje de error/límite del PDF -->
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <div
            v-if="pdfError"
            :class="[
              'flex items-start gap-3 p-4 rounded-xl mb-4',
              pdfErrorType === 'rate_limit'
                ? 'bg-amber-50 border border-amber-200'
                : pdfErrorType === 'module_load'
                ? 'bg-orange-50 border border-orange-200'
                : 'bg-red-50 border border-red-200'
            ]"
          >
            <svg
              v-if="pdfErrorType === 'rate_limit'"
              class="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
            <svg
              v-else-if="pdfErrorType === 'module_load'"
              class="w-5 h-5 text-orange-600 shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
            </svg>
            <svg
              v-else
              class="w-5 h-5 text-red-600 shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <div class="flex-1">
              <p :class="pdfErrorType === 'rate_limit' ? 'text-amber-800' : pdfErrorType === 'module_load' ? 'text-orange-800' : 'text-red-800'" class="text-sm font-medium">
                {{ pdfErrorType === 'rate_limit' ? 'Límite alcanzado' : pdfErrorType === 'module_load' ? 'Problema de carga' : 'Error' }}
              </p>
              <p :class="pdfErrorType === 'rate_limit' ? 'text-amber-700' : pdfErrorType === 'module_load' ? 'text-orange-700' : 'text-red-700'" class="text-sm mt-0.5">
                {{ pdfError }}
              </p>
              <button
                v-if="pdfErrorType === 'module_load'"
                @click="reloadPage"
                class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 text-white text-xs font-medium rounded-lg hover:bg-orange-700 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Recargar página
              </button>
            </div>
            <button
              @click="clearPdfError"
              :class="pdfErrorType === 'rate_limit' ? 'text-amber-500 hover:text-amber-700' : pdfErrorType === 'module_load' ? 'text-orange-500 hover:text-orange-700' : 'text-red-500 hover:text-red-700'"
              class="shrink-0"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </Transition>

        <!-- WhatsApp -->
        <button
          @click="handleWhatsAppClick(whatsAppUrlAprobado)"
          class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-all"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Contactar por WhatsApp
        </button>
      </div>
    </div>

    <!-- RESULTADO: RECHAZADO -->
    <div v-else-if="resultado?.resultado === 'rechazado'" class="animate-fade-in">

      <!-- Header con resultado -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-1">
          No cumples los requisitos
        </h2>
        <p class="text-gray-500">
          Pero hay opciones que podemos explorar
        </p>
        <!-- Auto-save indicator -->
        <p v-if="saveStatus === 'saved'" class="text-xs text-gray-400 mt-2">
          Simulación guardada
        </p>
      </div>

      <!-- Motivo del rechazo -->
      <div class="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
        <p class="text-sm font-semibold text-red-800 mb-1">Motivo</p>
        <p class="text-sm text-red-700">{{ resultado.motivoRechazo }}</p>
      </div>

      <!-- Recomendaciones -->
      <div v-if="resultado.recomendaciones && resultado.recomendaciones.length > 0" class="bg-gray-50 rounded-xl p-4 mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Qué puedes hacer</p>
        <ul class="space-y-2">
          <li v-for="(rec, index) in resultado.recomendaciones" :key="index" class="flex items-start gap-2 text-sm text-gray-600">
            <svg class="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>{{ rec }}</span>
          </li>
        </ul>
      </div>

      <!-- CTA Section -->
      <div class="border-t border-gray-200 pt-6">
        <p class="text-sm text-gray-600 mb-4 text-center">
          Un asesor puede revisar tu caso y ofrecerte alternativas personalizadas.
        </p>

        <div class="flex flex-col sm:flex-row gap-3">
          <button
            @click="handleContactClick"
            class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contacta a tu ejecutivo de crédito
          </button>
          <button
            @click="handleWhatsAppClick(whatsAppUrlRechazado)"
            class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-all"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </button>
        </div>
      </div>
    </div>

    <!-- RESULTADO: ADVERTENCIA -->
    <div v-else-if="resultado?.resultado === 'advertencia'" class="animate-fade-in">

      <!-- Header con resultado -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
          <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-1">
          Ajuste necesario
        </h2>
        <p class="text-gray-500">
          El monto supera tu capacidad de pago recomendada
        </p>
        <!-- Auto-save indicator -->
        <p v-if="saveStatus === 'saved'" class="text-xs text-gray-400 mt-2">
          Simulación guardada
        </p>
      </div>

      <!-- Card con problema -->
      <div class="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-6">
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <p class="text-xs text-orange-700/70 uppercase tracking-wide mb-1">Cuota</p>
            <p class="text-lg font-bold text-orange-800">{{ formatCurrency(resultado.cuotaMensual) }}</p>
          </div>
          <div class="border-x border-orange-200">
            <p class="text-xs text-orange-700/70 uppercase tracking-wide mb-1">Ingresos</p>
            <p class="text-lg font-bold text-orange-800">{{ formatCurrency(resultado.ingresosNetos) }}</p>
          </div>
          <div>
            <p class="text-xs text-orange-700/70 uppercase tracking-wide mb-1">Compromiso</p>
            <p class="text-lg font-bold text-orange-600">{{ formatPercentageUp(resultado.porcentajeCompromiso, 0) }}</p>
          </div>
        </div>
        <p class="text-xs text-orange-700 text-center mt-3 pt-3 border-t border-orange-200">
          El compromiso supera el <strong>30% recomendado</strong> para estabilidad financiera
        </p>
      </div>

      <!-- Monto máximo recomendado -->
      <div v-if="resultado.montoMaximoViable" class="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-green-700/70 uppercase tracking-wide mb-1">Monto máximo recomendado</p>
            <p class="text-xl font-bold text-green-700">{{ formatCurrency(resultado.montoMaximoViable) }}</p>
          </div>
          <svg class="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
        </div>
        <p class="text-xs text-green-700 mt-2">
          Con este monto tu cuota se ajustaría al 30% de tus ingresos
        </p>
      </div>

      <!-- Recomendaciones -->
      <div v-if="resultado.recomendaciones" class="bg-gray-50 rounded-xl p-4 mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Opciones disponibles</p>
        <ul class="space-y-2">
          <li v-for="(rec, index) in resultado.recomendaciones" :key="index" class="flex items-start gap-2 text-sm text-gray-600">
            <svg class="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>{{ rec }}</span>
          </li>
        </ul>
      </div>

      <!-- CTA Section -->
      <div class="border-t border-gray-200 pt-6">
        <p class="text-sm text-gray-600 mb-4 text-center">
          Un asesor puede ayudarte a ajustar los parámetros y encontrar la mejor solución.
        </p>

        <div class="flex flex-col sm:flex-row gap-3">
          <button
            @click="handleContactClick"
            class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contacta a tu ejecutivo de crédito
          </button>
          <button
            @click="handleWhatsAppClick(whatsAppUrlAdvertencia)"
            class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-all"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </button>
        </div>
      </div>
    </div>

    <!-- Botón Volver a Empezar -->
    <div class="text-center pt-6 border-t border-gray-200">
      <button
        @click="resetSimulador"
        class="text-gray-600 hover:text-primary font-medium transition-colors flex items-center gap-2 mx-auto"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Volver a empezar
      </button>
    </div>

    <!-- Disclaimer Legal -->
    <div class="flex items-start gap-3 py-4 border-t border-gray-200">
      <svg class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="text-sm text-gray-600">
        <strong class="text-gray-800">Nota importante:</strong> Este simulador es de carácter educativo e informativo.
        Los resultados son una estimación preliminar y no constituyen una oferta de crédito ni un
        compromiso por parte de ContuHogar. La aprobación final está sujeta a evaluación detallada
        de documentos y análisis crediticio completo.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency, formatPercentage, formatPercentageUp } from '~/utils/formatters';
import type { ResultadoCalculo } from '~/types/simulador';
import { useDirectPDFDownload } from '~/composables/useDirectPDFDownload';
import { getCreditTypeLabel } from '~/utils/creditTypeLabels';

const store = useSimuladorStore();
const mainStore = useMainStore();
const router = useRouter();
const { downloadPDF, canDownloadPDF, isGenerating, error: pdfError, errorType: pdfErrorType, clearError: clearPdfError } = useDirectPDFDownload();
const { calculate } = useSimuladorCalculations();

const loading = ref(true);
const resultado = ref<ResultadoCalculo | null>(null);

// Auto-save state tracking
const saveStatus = ref<'idle' | 'saving' | 'saved' | 'error'>('idle');
const hasSaved = ref(false);

// Número de WhatsApp de ContuHogar
const WHATSAPP_NUMBER = '573150540000';

// Auto-save simulation to Directus (runs once when results are displayed)
const autoSaveSimulation = async () => {
  // Prevent duplicate saves
  if (hasSaved.value || saveStatus.value === 'saving') {
    return;
  }

  saveStatus.value = 'saving';

  try {
    const result = await store.guardarSimulacion();

    if (result.ok) {
      saveStatus.value = 'saved';
      hasSaved.value = true;
    } else {
      saveStatus.value = 'error';
    }
  } catch {
    saveStatus.value = 'error';
  }
};

// Notificar lead al servidor (Telegram) - with deduplication
const notifySimulatorLead = async (action: 'whatsapp' | 'pdf' | 'contact') => {
  // Check if this action was already notified
  if (store.fueAccionNotificada(action)) {
    return;
  }

  try {
    await $fetch('/api/send/simulator-lead', {
      method: 'POST',
      body: {
        action,
        datosPersonales: store.datosPersonales,
        datosBien: store.datosBien,
        resultado: resultado.value,
        sessionId: store.sessionId // Include sessionId for server-side deduplication
      }
    });

    // Mark this action as notified to prevent duplicates
    store.marcarAccionNotificada(action);
  } catch {
    // Silent fail - notification is non-critical
  }
};

// Construir mensaje de WhatsApp con detalles del simulador
const buildWhatsAppMessage = (tipo: 'aprobado' | 'rechazado' | 'advertencia'): string => {
  const { datosPersonales, datosBien } = store;
  const res = resultado.value;
  const fullName = [datosPersonales.nombres, datosPersonales.apellidos].filter(Boolean).join(' ');
  const tipoCredito = getCreditTypeLabel(datosPersonales.tipoCredito);

  let message = `Hola, soy *${fullName}*.

Acabo de completar el simulador de crédito:

📋 *Datos de la simulación:*
• Tipo: ${tipoCredito}
• Valor inmueble: ${formatCurrency(datosBien.valorBien || 0)}
• Monto solicitado: ${formatCurrency(datosBien.montoSolicitado || 0)}
• Plazo: ${datosBien.plazoMeses} meses (${Math.floor(datosBien.plazoMeses / 12)} años)
`;

  if (tipo === 'aprobado' && res) {
    message += `
✅ *Resultado: PREAPROBADO*
• Cuota mensual: ${formatCurrency(res.cuotaMensual)}
• Tasa EA: ${(res.tasaEA * 100).toFixed(2)}%
• Financiación: ${Math.ceil(res.porcentajeFinanciacion)}%
• Compromiso: ${Math.ceil(res.porcentajeCompromiso)}%

Me gustaría continuar con el proceso.`;
  } else if (tipo === 'rechazado' && res) {
    message += `
❌ *Resultado: No cumplí los requisitos*
Motivo: ${res.motivoRechazo || 'N/A'}

¿Pueden ayudarme a encontrar alternativas?`;
  } else if (tipo === 'advertencia' && res) {
    message += `
⚠️ *Resultado: Ajuste necesario*
• Cuota: ${formatCurrency(res.cuotaMensual)}
• Compromiso: ${Math.ceil(res.porcentajeCompromiso)}%
${res.montoMaximoViable ? `• Monto máx. viable: ${formatCurrency(res.montoMaximoViable)}` : ''}

Necesito ayuda para ajustar mi solicitud.`;
  }

  const tel = datosPersonales.telefono ? `${datosPersonales.telefonoCodigo?.code || ''} ${datosPersonales.telefono}`.trim() : '';
  message += `

📞 *Mi contacto:*
• Email: ${datosPersonales.correo || 'N/A'}${tel ? `\n• Tel: ${tel}` : ''}`;

  return encodeURIComponent(message);
};

// URLs de WhatsApp según el resultado
const whatsAppUrlAprobado = computed(() => `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage('aprobado')}`);
const whatsAppUrlRechazado = computed(() => `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage('rechazado')}`);
const whatsAppUrlAdvertencia = computed(() => `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage('advertencia')}`);

// Handler para click en WhatsApp
const handleWhatsAppClick = (url: string) => {
  notifySimulatorLead('whatsapp');
  // Track action in Directus (non-blocking)
  store.trackAccionUsuario('whatsapp', 'resultados');
  window.open(url, '_blank', 'noopener,noreferrer');
};

// Handler para descargar PDF
const handleDownloadPDF = async () => {
  notifySimulatorLead('pdf');
  // Track action in Directus (non-blocking)
  store.trackAccionUsuario('pdf', 'resultados');
  await downloadPDF(store.$state);
};

// Handler para recargar la página (cuando hay error de carga de módulo)
const reloadPage = () => {
  window.location.reload();
};

// Handler para ir a contacto con datos pre-llenados
const handleContactClick = () => {
  notifySimulatorLead('contact');
  // Track action in Directus (non-blocking)
  store.trackAccionUsuario('contact', 'resultados');

  // Guardar datos en el store principal (no expuestos en URL)
  // Include flags to skip duplicate Telegram notification in contact form
  mainStore.setContactPrefill({
    source: 'simulador',
    nombres: store.datosPersonales.nombres || '',
    apellidos: store.datosPersonales.apellidos || '',
    email: store.datosPersonales.correo || '',
    telefono: store.datosPersonales.telefono || '',
    telefonoCodigo: store.datosPersonales.telefonoCodigo?.code || '+57',
    simulador: {
      tipoCredito: store.datosPersonales.tipoCredito || undefined,
      valorBien: store.datosBien.valorBien || undefined,
      montoSolicitado: store.datosBien.montoSolicitado || undefined,
      plazoMeses: store.datosBien.plazoMeses,
      resultado: resultado.value?.resultado,
      cuotaMensual: resultado.value?.cuotaMensual,
      porcentajeCompromiso: resultado.value?.porcentajeCompromiso
    },
    // Skip Telegram in contact form since we already sent notification
    skipTelegramNotification: true,
    simuladorSessionId: store.sessionId || undefined
  });

  router.push('/contacto');
};

const calcularResultado = () => {
  loading.value = true;

  // Simular un pequeño delay para dar sensación de procesamiento
  setTimeout(async () => {
    resultado.value = calculate(store.$state);
    store.setResultado(resultado.value);
    loading.value = false;

    // Auto-save after calculation completes (non-blocking)
    await autoSaveSimulation();
  }, 1000);
};

const resetSimulador = () => {
  if (confirm('¿Estás seguro de que quieres reiniciar el simulador?')) {
    store.reset();
    store.goToStep(1);
  }
};

// Calcular resultado al montar
onMounted(async () => {
  // Si ya existe un resultado guardado, usarlo
  if (store.resultado) {
    resultado.value = store.resultado;
    loading.value = false;

    // Auto-save existing result (non-blocking)
    await autoSaveSimulation();
  } else {
    calcularResultado();
  }
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
