<template>
  <div class="space-y-8">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="mt-4 text-gray-600">Calculando tu resultado...</p>
    </div>

    <!-- RESULTADO: APROBADO -->
    <div v-else-if="resultado?.resultado === 'aprobado'" class="animate-fade-in space-y-8">
      <!-- Header Simple y Limpio -->
      <div class="text-center py-6">
        <div class="text-6xl mb-4">🎉</div>
        <h2 class="text-3xl font-bold text-green-600 mb-2">
          ¡Felicitaciones!
        </h2>
        <p class="text-lg text-gray-600">
          Cumples con los requisitos iniciales para el crédito
        </p>
      </div>

      <!-- CTA Principal -->
      <div class="py-6 border-y border-gray-200">
        <div class="flex items-start gap-4">
          <svg class="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <div class="flex-1">
            <p class="text-sm text-gray-600 mb-4">
              Este es un resultado preliminar. <strong class="text-gray-900">Un asesor especializado revisará tu caso en detalle</strong> y te ayudará a completar tu solicitud.
            </p>
            <div class="flex flex-wrap gap-3">
              <NuxtLink
                to="/contacto"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Hablar con Asesor
              </NuxtLink>
              <a
                href="https://wa.me/573204955434?text=Hola,%20acabo%20de%20completar%20el%20simulador%20de%20crédito%20y%20me%20gustaría%20más%20información"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-all"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Tu Cuota Mensual (destacada) -->
      <div class="text-center py-4">
        <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
          Tu Cuota Mensual Estimada
        </p>
        <p class="text-5xl font-bold text-primary mb-1">
          {{ formatCurrency(resultado.cuotaMensual) }}
        </p>
        <p class="text-sm text-gray-500">
          Tasa {{ formatPercentage(resultado.tasaEA * 100) }} E.A.
        </p>
      </div>

      <!-- Detalles Limpios -->
      <div class="space-y-4">
        <h3 class="text-lg font-bold text-gray-800">
          Detalles de tu Simulación
        </h3>

        <div class="space-y-3">
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-gray-600">Monto solicitado</span>
            <span class="text-lg font-semibold text-gray-900">
              {{ formatCurrency(store.datosBien.montoSolicitado!) }}
            </span>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-gray-600">Plazo</span>
            <span class="text-lg font-semibold text-gray-900">
              {{ store.datosBien.plazoMeses }} meses ({{ Math.floor(store.datosBien.plazoMeses / 12) }} años)
            </span>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-gray-600">Financiación del bien</span>
            <span class="text-lg font-semibold text-gray-900">
              {{ formatPercentage(resultado.porcentajeFinanciacion) }}
            </span>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-gray-600">Compromiso de ingresos</span>
            <span class="text-lg font-semibold text-green-600">
              {{ formatPercentage(resultado.porcentajeCompromiso) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Análisis Inline -->
      <div class="flex items-start gap-3 py-4">
        <svg class="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        <div>
          <p class="text-sm font-semibold text-gray-800 mb-1">Análisis de Capacidad</p>
          <p class="text-sm text-gray-600">
            Tu cuota mensual de <strong class="text-gray-900">{{ formatCurrency(resultado.cuotaMensual) }}</strong>
            más tus obligaciones actuales representan
            <strong class="text-green-600">{{ formatPercentage(resultado.porcentajeCompromiso) }}</strong>
            de tus ingresos netos, lo cual está dentro del rango saludable (máximo 30%).
          </p>
        </div>
      </div>

      <!-- CTA Final -->
      <div class="text-center py-8 border-t border-gray-200">
        <h3 class="text-xl font-bold text-gray-900 mb-2">
          ¿Listo para hacer realidad tu proyecto?
        </h3>
        <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
          Nuestros asesores especializados te guiarán en el proceso completo de solicitud y resolverán todas tus dudas.
        </p>
        <NuxtLink
          to="/contacto"
          class="inline-block bg-secondary text-white px-8 py-4 rounded-lg font-bold hover:bg-secondary/90 transition-all hover:scale-105"
        >
          Iniciar mi Solicitud →
        </NuxtLink>
      </div>
    </div>

    <!-- RESULTADO: RECHAZADO -->
    <div v-else-if="resultado?.resultado === 'rechazado'" class="animate-fade-in space-y-8">
      <!-- Header Simple -->
      <div class="text-center py-6">
        <div class="text-6xl mb-4">😔</div>
        <h2 class="text-3xl font-bold text-red-600 mb-2">
          Lo sentimos
        </h2>
        <p class="text-lg text-gray-600">
          Actualmente no cumples con algunos requisitos
        </p>
      </div>

      <!-- CTA Asesor -->
      <div class="py-6 border-y border-gray-200">
        <div class="flex items-start gap-4">
          <svg class="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <div class="flex-1">
            <p class="text-sm text-gray-600 mb-4">
              <strong class="text-gray-900">No te preocupes.</strong> Un asesor puede revisar tu caso, ofrecerte alternativas personalizadas y ayudarte a mejorar tu perfil crediticio.
            </p>
            <div class="flex flex-wrap gap-3">
              <NuxtLink
                to="/contacto"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Consultar con Asesor
              </NuxtLink>
              <a
                href="https://wa.me/573204955434?text=Hola,%20completé%20el%20simulador%20pero%20no%20cumplí%20con%20algunos%20requisitos.%20¿Pueden%20ayudarme?"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-all"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Motivo del Rechazo Inline -->
      <div class="flex items-start gap-3 py-4">
        <svg class="w-6 h-6 text-red-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <div>
          <p class="text-sm font-semibold text-gray-800 mb-1">Motivo del rechazo</p>
          <p class="text-sm text-gray-600">
            {{ resultado.motivoRechazo }}
          </p>
        </div>
      </div>

      <!-- Recomendaciones Limpias -->
      <div v-if="resultado.recomendaciones && resultado.recomendaciones.length > 0" class="space-y-3">
        <h3 class="text-lg font-bold text-gray-800">
          Qué puedes hacer
        </h3>
        <ul class="space-y-3">
          <li v-for="(rec, index) in resultado.recomendaciones" :key="index" class="flex items-start gap-3 py-2">
            <span class="text-gray-400 font-bold flex-shrink-0">•</span>
            <span class="text-gray-700">{{ rec }}</span>
          </li>
        </ul>
      </div>

      <!-- CTA Final -->
      <div class="text-center py-8 border-t border-gray-200">
        <h3 class="text-xl font-bold text-gray-900 mb-2">
          ¿Quieres explorar otras opciones?
        </h3>
        <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
          Nuestros asesores conocen alternativas y pueden ayudarte a mejorar tu perfil crediticio.
        </p>
        <NuxtLink
          to="/contacto"
          class="inline-block bg-secondary text-white px-8 py-4 rounded-lg font-bold hover:bg-secondary/90 transition-all hover:scale-105"
        >
          Agendar Asesoría Gratuita →
        </NuxtLink>
      </div>
    </div>

    <!-- RESULTADO: ADVERTENCIA -->
    <div v-else-if="resultado?.resultado === 'advertencia'" class="animate-fade-in space-y-8">
      <!-- Header Simple -->
      <div class="text-center py-6">
        <div class="text-6xl mb-4">⚠️</div>
        <h2 class="text-3xl font-bold text-orange-600 mb-2">
          Ajuste Necesario
        </h2>
        <p class="text-lg text-gray-600">
          El monto solicitado supera tu capacidad de pago recomendada
        </p>
      </div>

      <!-- CTA Asesor -->
      <div class="py-6 border-y border-gray-200">
        <div class="flex items-start gap-4">
          <svg class="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <div class="flex-1">
            <p class="text-sm text-gray-600 mb-4">
              <strong class="text-gray-900">Un asesor puede ayudarte a ajustar los parámetros</strong> de tu solicitud y encontrar la mejor solución según tu capacidad de pago.
            </p>
            <div class="flex flex-wrap gap-3">
              <NuxtLink
                to="/contacto"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Hablar con Asesor
              </NuxtLink>
              <a
                href="https://wa.me/573204955434?text=Hola,%20necesito%20ayuda%20para%20ajustar%20mi%20solicitud%20de%20crédito"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-all"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Análisis Limpio -->
      <div class="space-y-4">
        <h3 class="text-lg font-bold text-gray-800">
          Análisis de tu Solicitud
        </h3>

        <div class="space-y-3">
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-gray-600">Cuota mensual calculada</span>
            <span class="text-lg font-semibold text-gray-900">
              {{ formatCurrency(resultado.cuotaMensual) }}
            </span>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-gray-600">Tus ingresos netos</span>
            <span class="text-lg font-semibold text-gray-900">
              {{ formatCurrency(resultado.ingresosNetos) }}
            </span>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-orange-300">
            <span class="text-gray-700 font-medium">Compromiso de ingresos</span>
            <span class="text-2xl font-bold text-orange-600">
              {{ formatPercentage(resultado.porcentajeCompromiso) }}
            </span>
          </div>
        </div>

        <!-- Problema Inline -->
        <div class="flex items-start gap-3 py-4">
          <svg class="w-6 h-6 text-red-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <div>
            <p class="text-sm font-semibold text-gray-800 mb-1">¿Por qué necesitas ajustar?</p>
            <p class="text-sm text-gray-600">
              El compromiso supera el <strong>30% recomendado</strong> para mantener estabilidad financiera.
              Te sugerimos reducir el monto o aumentar el plazo.
            </p>
          </div>
        </div>
      </div>

      <!-- Monto Máximo Viable Destacado -->
      <div v-if="resultado.montoMaximoViable" class="text-center py-6">
        <div class="flex items-center justify-center gap-2 mb-2">
          <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Monto Máximo Recomendado
          </p>
        </div>
        <p class="text-4xl font-bold text-green-600 mb-2">
          {{ formatCurrency(resultado.montoMaximoViable) }}
        </p>
        <p class="text-sm text-gray-600 max-w-md mx-auto">
          Con este monto, tu cuota se ajustaría al 30% de tus ingresos, garantizando estabilidad financiera.
        </p>
      </div>

      <!-- Recomendaciones Limpias -->
      <div v-if="resultado.recomendaciones" class="space-y-3">
        <h3 class="text-lg font-bold text-gray-800">
          ¿Qué puedes hacer?
        </h3>
        <ul class="space-y-3">
          <li v-for="(rec, index) in resultado.recomendaciones" :key="index" class="flex items-start gap-3 py-2">
            <span class="text-gray-400 font-bold flex-shrink-0">•</span>
            <span class="text-gray-700">{{ rec }}</span>
          </li>
        </ul>
      </div>

      <!-- CTA Final -->
      <div class="text-center py-8 border-t border-gray-200">
        <h3 class="text-xl font-bold text-gray-900 mb-2">
          ¿Necesitas ayuda personalizada?
        </h3>
        <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
          Nuestros asesores pueden revisar tu caso y ayudarte a encontrar la mejor configuración para tu crédito.
        </p>
        <NuxtLink
          to="/contacto"
          class="inline-block bg-secondary text-white px-8 py-4 rounded-lg font-bold hover:bg-secondary/90 transition-all hover:scale-105"
        >
          Ajustar con un Asesor →
        </NuxtLink>
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
    <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">
      <p>
        <strong>Nota importante:</strong> Este simulador es de carácter educativo e informativo.
        Los resultados son una estimación preliminar y no constituyen una oferta de crédito ni un
        compromiso por parte de ConTuHogar. La aprobación final está sujeta a evaluación detallada
        de documentos y análisis crediticio completo.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency, formatPercentage } from '~/utils/formatters';
import type { ResultadoCalculo } from '~/types/simulador';

const store = useSimuladorStore();
const { calculate } = useSimuladorCalculations();

const loading = ref(true);
const resultado = ref<ResultadoCalculo | null>(null);

const calcularResultado = () => {
  loading.value = true;

  // Simular un pequeño delay para dar sensación de procesamiento
  setTimeout(() => {
    resultado.value = calculate(store.$state);
    store.setResultado(resultado.value);
    loading.value = false;
  }, 1000);
};

const resetSimulador = () => {
  if (confirm('¿Estás seguro de que quieres reiniciar el simulador?')) {
    store.reset();
    store.goToStep(1);
  }
};

// Calcular resultado al montar
onMounted(() => {
  // Si ya existe un resultado guardado, usarlo
  if (store.resultado) {
    resultado.value = store.resultado;
    loading.value = false;
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
