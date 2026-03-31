<script setup lang="ts">
definePageMeta({ layout: 'landing' })

const { isLoading } = useLoading(150)
const route = useRoute()

// Fetch landing page via server API (usa admin token server-side)
const { data: pageData } = await useAsyncData(
  `lp-${route.params.service}-${route.params.market}`,
  () => $fetch<LandingPage[]>('/api/landing-pages', {
    query: {
      service_slug: route.params.service,
      slug: route.params.market,
      limit: 1
    }
  })
)

const page = computed(() => pageData.value?.[0] || null)

// 404 si no existe
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Pagina no encontrada' })
}

// SEO - noindex for ad landing pages
const pageUrl = `https://contuhogar.com/lp/${route.params.service}/${route.params.market}`

useSeo({
  title: page.value.meta_title || page.value.title || '',
  description: page.value.meta_description || page.value.hero_subtitle || '',
  url: pageUrl,
  image: page.value.featured_image || undefined,
  type: 'website'
})

// Override robots to noindex for campaign landing pages
useSeoMeta({
  robots: 'noindex, nofollow'
})

// FAQ schema if available
if (page.value.faqs?.length) {
  useFAQSchema(page.value.faqs)
}

// Process steps (static)
const processSteps = [
  {
    number: 1,
    title: 'Simula tu crédito',
    description: 'En 5 minutos sabes cuánto puedes financiar y cuál sería tu cuota mensual'
  },
  {
    number: 2,
    title: 'Preaprobación en 24 h',
    description: 'Nuestro equipo evalúa tu perfil sin compromiso ni costo'
  },
  {
    number: 3,
    title: 'Elige tu vivienda',
    description: 'Nueva, usada, en planos — en cualquier ciudad de Colombia'
  },
  {
    number: 4,
    title: 'Firma y celebra',
    description: 'Todo el proceso es 100% en línea desde donde estés'
  }
]
</script>

<template>
  <div>
    <!-- Skeleton durante carga -->
    <template v-if="isLoading">
      <div class="bg-primary min-h-[70vh] flex items-center">
        <div class="container mx-auto px-4 lg:px-8 py-16">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div class="lg:col-span-7 space-y-6">
              <div class="h-8 w-64 skeleton-shimmer-light rounded-full" />
              <div class="h-14 w-full skeleton-shimmer-light rounded-xl" />
              <div class="h-14 w-4/5 skeleton-shimmer-light rounded-xl" />
              <div class="h-6 w-3/4 skeleton-shimmer-light rounded-lg" />
              <div class="flex gap-4 mt-8">
                <div class="h-14 w-48 skeleton-shimmer-light rounded-xl" />
                <div class="h-14 w-48 skeleton-shimmer-light rounded-xl" />
              </div>
            </div>
            <div class="lg:col-span-5">
              <div class="h-80 w-full skeleton-shimmer-light rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Contenido real -->
    <template v-else-if="page">
      <!-- 1. Hero (CTA -> scroll a #lead-form) -->
      <LpHero
        :headline="page.hero_title || page.title || ''"
        :subheadline="page.hero_subtitle || ''"
        :urgency-text="page.country ? `Solo para colombianos en ${page.country}` : 'Solo para colombianos en el exterior'"
        image="/images/familia-nueva-casa.jpg"
        :simulator-slug="route.params.market as string"
      />

      <!-- 2. Stats Section -->
      <StatsSection
        v-if="page.stats?.length"
        :stats="page.stats"
        variant="white"
        :show-border="false"
      />

      <!-- 4. Process Section (incluye re-engagement → #lead-form) -->
      <LpProcess :steps="processSteps" />

      <!-- 5. Content HTML + FAQs fusionados -->
      <section v-if="page.content || page.faqs?.length" class="bg-gray-50 py-16 lg:py-24">
        <div class="container mx-auto px-4 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            <!-- Contenido HTML (col izquierda) -->
            <div v-if="page.content" class="lg:col-span-7">
              <div class="prose prose-lg max-w-none" v-html="page.content" />
            </div>

            <!-- FAQs (col derecha o full-width si no hay content) -->
            <div
              v-if="page.faqs?.length"
              :class="page.content ? 'lg:col-span-5' : 'lg:col-span-12 max-w-3xl mx-auto w-full'"
            >
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
              <Accordion
                :items="page.faqs.map(f => ({ title: f.question, content: f.answer }))"
                :multiple="true"
                :default-open="0"
              />

              <!-- CTA debajo de FAQs -->
              <div class="mt-8 pt-8 border-t border-gray-200">
                <p class="text-gray-600 text-base mb-4">¿Todo claro? Da el primer paso sin compromiso.</p>
                <button
                  type="button"
                  class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-secondary text-white rounded-xl font-bold text-base hover:bg-secondary/90 transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 shadow-lg shadow-secondary/25"
                  @click="document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })"
                >
                  Solicitar asesoría gratuita
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 6. Bank Logos -->
      <BankLogosSection />

      <!-- 7. Lead Form — único punto de captura, al final -->
      <LpLeadForm
        form-id="lead-form"
        title="Da el primer paso hoy"
        subtitle="Completa el formulario y un asesor especializado te contactará en menos de 24 h. Sin compromiso."
        :simulator-slug="route.params.market as string"
      />

      <!-- 9. Sticky CTA mobile (→ scroll a #lead-form) -->
      <LpCtaSticky />
    </template>
  </div>
</template>
