<script setup lang="ts">
const { isLoading } = useLoading(150)
const route = useRoute()
const store = useMainStore()

// Fetch landing page via server API (usa admin token server-side)
const { data: pageData } = await useAsyncData(
  `landing-page-${route.params.service}-${route.params.market}`,
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
  throw createError({ statusCode: 404, statusMessage: 'Página no encontrada' })
}

// Servicio padre desde el store
const parentService = computed(() => store.getServiceBySlug(route.params.service as string))

// SEO completo
const pageUrl = `https://contuhogar.com/servicios/${route.params.service}/${route.params.market}`

useSeo({
  title: page.value.meta_title || page.value.title || '',
  description: page.value.meta_description || page.value.hero_subtitle || '',
  url: pageUrl,
  image: page.value.featured_image || undefined,
  type: 'website'
})

useBreadcrumbSchema([
  { name: 'Inicio', url: 'https://contuhogar.com' },
  { name: 'Servicios', url: 'https://contuhogar.com/servicios' },
  { name: parentService.value?.title || (route.params.service as string), url: `https://contuhogar.com/servicios/${route.params.service}` },
  { name: page.value.title || '', url: pageUrl }
])

useServiceSchema({
  name: page.value.hero_title || page.value.title || '',
  description: page.value.meta_description || '',
  url: pageUrl,
  category: 'Crédito de Vivienda',
  image: page.value.featured_image || undefined
})

if (page.value.faqs?.length) {
  useFAQSchema(page.value.faqs)
}

// Recursos útiles para sidebar
const usefulResources = [
  { label: 'Simulador de crédito', to: '/simulador/credito' },
  { label: 'Preguntas frecuentes', to: '/faqs' },
  { label: 'Blog', to: '/blog' }
]
</script>

<template>
  <div>
    <!-- Skeleton durante carga -->
    <template v-if="isLoading">
      <SkeletonHeroSection variant="primary" show-badge />
      <div class="bg-muted py-16">
        <div class="mx-auto container px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-8 space-y-8">
              <div class="h-64 skeleton-shimmer rounded-2xl" />
              <div class="h-96 skeleton-shimmer rounded-2xl" />
            </div>
            <div class="lg:col-span-4 mt-12 lg:mt-0 space-y-6">
              <div class="h-48 skeleton-shimmer rounded-2xl" />
              <div class="h-48 skeleton-shimmer rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Contenido real -->
    <template v-else-if="page">
      <!-- Hero Section -->
      <HeroSection
        :badge="parentService?.title || 'Servicios financieros'"
        badge-icon
        :title="page.hero_title || page.title || ''"
        :subtitle="page.hero_subtitle || ''"
      />

      <!-- Contenido principal -->
      <div class="bg-muted">
        <div class="mx-auto container px-6 lg:px-8 py-16">
          <div class="lg:grid lg:grid-cols-12 lg:gap-12">

            <!-- Columna izquierda: Contenido -->
            <article class="lg:col-span-8">
              <!-- Imagen destacada -->
              <div v-if="page.featured_image" class="relative aspect-video mb-8 overflow-hidden rounded-2xl shadow-lg">
                <NuxtImg
                  :src="page.featured_image"
                  :alt="page.hero_title || page.title || ''"
                  class="w-full h-full object-cover"
                  format="webp"
                  quality="85"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>

              <!-- Contenido principal -->
              <div v-if="page.content" class="bg-white rounded-2xl p-8 lg:p-12 shadow-sm mb-8">
                <div class="prose prose-lg max-w-none" v-html="page.content"></div>
              </div>

              <!-- Stats section -->
              <div v-if="page.stats?.length" class="mb-8">
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div
                    v-for="(stat, index) in page.stats"
                    :key="index"
                    class="bg-white rounded-2xl p-6 shadow-sm text-center"
                  >
                    <p class="text-3xl font-bold text-primary">{{ stat.value }}</p>
                    <p class="text-sm font-semibold text-gray-900 mt-1">{{ stat.label }}</p>
                    <p v-if="stat.description" class="text-xs text-gray-500 mt-1">{{ stat.description }}</p>
                  </div>
                </div>
              </div>

              <!-- CTA inline -->
              <div class="bg-primary/5 border border-primary/10 rounded-2xl p-6 lg:p-8 mb-8">
                <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div class="text-center sm:text-left">
                    <h3 class="text-lg font-bold text-primary mb-1">¿Listo para dar el primer paso?</h3>
                    <p class="text-gray-600">Descubre en minutos cuánto puedes financiar</p>
                  </div>
                  <div class="flex flex-col sm:flex-row gap-3">
                    <NuxtLink
                      to="/simulador/credito"
                      class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors text-sm"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Simular mi crédito
                    </NuxtLink>
                    <NuxtLink
                      to="/contacto"
                      class="inline-flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors text-sm"
                    >
                      Hablar con un asesor
                    </NuxtLink>
                  </div>
                </div>
              </div>

              <!-- FAQs section -->
              <div v-if="page.faqs?.length" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
                <Accordion
                  :items="page.faqs.map(faq => ({ title: faq.question, content: faq.answer }))"
                  :multiple="true"
                  :default-open="0"
                />
              </div>
            </article>

            <!-- Columna derecha: Sidebar -->
            <aside class="lg:col-span-4 mt-12 lg:mt-0">
              <div class="lg:sticky lg:top-24 space-y-6">

                <!-- CTA Simulador -->
                <SidebarCTA
                  variant="primary"
                  icon="calculator"
                  title="Simula tu crédito"
                  description="Descubre en minutos cuánto puedes solicitar y cuál sería tu cuota mensual"
                  cta-text="Ir al simulador"
                  cta-link="/simulador/credito"
                />

                <!-- CTA Contacto -->
                <SidebarCTA
                  variant="secondary"
                  icon="question"
                  title="¿Tienes dudas, preguntas o inquietudes?"
                  description="Nuestro equipo humano está listo para ayudarte con tu solicitud."
                  cta-text="Habla con un ejecutivo de crédito"
                  cta-link="/contacto"
                  badge="Respuesta en menos de 24 horas"
                  :badge-icon="true"
                />

                <!-- Recursos útiles -->
                <ResourcesList
                  title="Recursos útiles"
                  :resources="usefulResources"
                />
              </div>
            </aside>
          </div>
        </div>
      </div>

      <!-- Bancos Aliados -->
      <BankLogosSection />

      <!-- CTA Final -->
      <CTASection
        title="Tu hogar en Colombia te está esperando"
        description="Da el primer paso hacia tu inversión inmobiliaria. Nuestro equipo está listo para asesorarte sin costo ni compromiso."
        :primary-cta="{ text: 'Simular mi crédito', to: '/simulador/credito' }"
        :secondary-cta="{ text: 'Hablar con un ejecutivo de crédito', to: '/contacto' }"
        :benefits="['Sin costo inicial', 'Respuesta en 24 h', 'Proceso 100 % remoto']"
      />
    </template>
  </div>
</template>
