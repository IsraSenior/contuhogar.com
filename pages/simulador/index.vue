<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
    <!-- Hero Section -->
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Simulador de Crédito Hipotecario
        </h1>
        <p class="text-xl sm:text-2xl mb-4 text-white/90 max-w-3xl mx-auto">
          Descubre si eres sujeto de crédito en solo 5 pasos
        </p>
        <p class="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
          Evaluación rápida y gratuita para colombianos que viven en el exterior
          y desean comprar vivienda en Colombia
        </p>
      </div>
    </section>

    <!-- Información rápida -->
    <section class="py-8 sm:py-12 bg-white border-b">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="text-center p-6 bg-primary/5 rounded-xl">
            <div class="text-4xl mb-3">⚡</div>
            <h3 class="font-bold text-gray-800 mb-2">Rápido</h3>
            <p class="text-sm text-gray-600">Solo 5 minutos para completar</p>
          </div>
          <div class="text-center p-6 bg-primary/5 rounded-xl">
            <div class="text-4xl mb-3">🔒</div>
            <h3 class="font-bold text-gray-800 mb-2">Seguro</h3>
            <p class="text-sm text-gray-600">Tu información es confidencial</p>
          </div>
          <div class="text-center p-6 bg-primary/5 rounded-xl">
            <div class="text-4xl mb-3">💯</div>
            <h3 class="font-bold text-gray-800 mb-2">Gratuito</h3>
            <p class="text-sm text-gray-600">Sin costo ni compromiso</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Wizard del Simulador -->
    <section class="py-12 sm:py-16">
      <SimuladorWizard />
    </section>

    <!-- Información adicional -->
    <section class="py-12 sm:py-16 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">
          ¿Cómo funciona?
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-xl shadow-sm border">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 class="font-bold text-gray-800 mb-2">Completa tus datos</h3>
                <p class="text-sm text-gray-600">
                  Información personal, del inmueble y tus ingresos actuales
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 class="font-bold text-gray-800 mb-2">Evaluación automática</h3>
                <p class="text-sm text-gray-600">
                  Nuestro sistema analiza tu capacidad de pago y elegibilidad
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 class="font-bold text-gray-800 mb-2">Resultado inmediato</h3>
                <p class="text-sm text-gray-600">
                  Conoce si calificas y cuál sería tu cuota mensual estimada
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 class="font-bold text-gray-800 mb-2">Asesoría personalizada</h3>
                <p class="text-sm text-gray-600">
                  Si calificas, te contactamos para iniciar el proceso
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQs -->
    <section class="py-12 sm:py-16 bg-white">
      <div class="max-w-3xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">
          Preguntas Frecuentes
        </h2>

        <div class="space-y-4">
          <details class="group bg-gray-50 rounded-lg p-6 border border-gray-200">
            <summary class="font-bold text-gray-800 cursor-pointer list-none flex justify-between items-center">
              ¿Es vinculante el resultado del simulador?
              <span class="transition group-open:rotate-180">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p class="mt-4 text-gray-600 text-sm">
              No, el simulador es una herramienta informativa que te da una estimación preliminar.
              La aprobación final depende de la evaluación completa de documentos y análisis crediticio.
            </p>
          </details>

          <details class="group bg-gray-50 rounded-lg p-6 border border-gray-200">
            <summary class="font-bold text-gray-800 cursor-pointer list-none flex justify-between items-center">
              ¿Qué tasa de interés se usa en el cálculo?
              <span class="transition group-open:rotate-180">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p class="mt-4 text-gray-600 text-sm">
              El simulador usa una tasa de interés del 14% E.A. (Efectivo Anual) como referencia.
              La tasa final puede variar según el análisis de tu perfil crediticio.
            </p>
          </details>

          <details class="group bg-gray-50 rounded-lg p-6 border border-gray-200">
            <summary class="font-bold text-gray-800 cursor-pointer list-none flex justify-between items-center">
              ¿Puedo volver a hacer el simulador con otros datos?
              <span class="transition group-open:rotate-180">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p class="mt-4 text-gray-600 text-sm">
              Sí, puedes usar el simulador las veces que quieras y probar diferentes escenarios.
              Tu progreso se guarda automáticamente en tu navegador.
            </p>
          </details>

          <details class="group bg-gray-50 rounded-lg p-6 border border-gray-200">
            <summary class="font-bold text-gray-800 cursor-pointer list-none flex justify-between items-center">
              ¿Qué hago si el resultado es "Rechazado"?
              <span class="transition group-open:rotate-180">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p class="mt-4 text-gray-600 text-sm">
              El simulador te dará recomendaciones específicas para mejorar tu situación.
              También puedes contactarnos para explorar alternativas o ajustar los parámetros de tu solicitud.
            </p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-12 sm:py-16 bg-primary text-white">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          ¿Tienes dudas?
        </h2>
        <p class="text-lg sm:text-xl mb-8 text-white/90">
          Nuestro equipo de asesores está listo para ayudarte
        </p>
        <NuxtLink
          to="/contacto"
          class="inline-block bg-white text-primary px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all hover:scale-105"
        >
          Contáctanos
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SimuladorWizard from '~/components/simulador/SimuladorWizard.vue';

// SEO Meta Tags
useSeoMeta({
  title: 'Simulador de Crédito Hipotecario | ConTuHogar',
  description:
    'Simula tu crédito hipotecario en 5 minutos. Descubre si eres sujeto de crédito y calcula tu cuota mensual. Para colombianos en el exterior que desean comprar vivienda en Colombia.',
  ogTitle: 'Simulador de Crédito Hipotecario | ConTuHogar',
  ogDescription:
    'Evalúa tu capacidad de crédito de forma rápida, segura y gratuita. Ideal para colombianos en el exterior.',
  ogUrl: 'https://contuhogar.com/simulador',
  ogType: 'website',
  ogImage: 'https://contuhogar.com/og-simulador.jpg',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Simulador de Crédito Hipotecario | ConTuHogar',
  twitterDescription: 'Simula tu crédito hipotecario en 5 minutos. Rápido, seguro y gratuito.',
  twitterImage: 'https://contuhogar.com/og-simulador.jpg'
});

// Structured Data (JSON-LD)
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Simulador de Crédito Hipotecario ConTuHogar',
        description:
          'Simula tu crédito hipotecario en 5 minutos. Descubre si eres sujeto de crédito y calcula tu cuota mensual.',
        url: 'https://contuhogar.com/simulador',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'COP'
        }
      })
    }
  ]
});
</script>
