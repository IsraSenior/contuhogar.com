<script setup lang="ts">
import { useMainStore } from '@/stores/index'

const { isLoading } = useLoading(150)
const store = useMainStore()

const title = 'Servicios | ContuHogar'
const description = 'Descubre nuestros servicios de financiamiento de vivienda para colombianos en el exterior: crédito hipotecario, leasing habitacional, compra de cartera y más.'

// SEO optimizado
useSeo({
  title: title,
  description: description,
  type: 'website'
})

// Breadcrumb Schema
useBreadcrumbSchema([
  { name: 'Inicio', url: 'https://contuhogar.com' },
  { name: 'Servicios', url: 'https://contuhogar.com/servicios' }
])

// CollectionPage schema for services listing
useCollectionPageSchema({
  name: title,
  description: description,
  url: 'https://contuhogar.com/servicios',
  items: store.services.map(s => ({
    name: s.title,
    url: `https://contuhogar.com/servicios/${s.slug}`
  }))
})

// Estadísticas de confianza
const trustStats = [
  { value: '3.000+', label: 'Familias', description: 'confían en nosotros' },
  { value: '16+', label: 'Años de experiencia', description: 'en el mercado' },
  { value: '24 h', label: 'Respuesta', description: 'en preaprobación' },
  { value: '6', label: 'Bancos aliados', description: 'para mejores tasas' }
]

// Feature flag: landing page links (solo desarrollo)
const config = useRuntimeConfig()
const enableLandingLinks = config.public.ENABLE_LANDING_LINKS

// Fetch landing pages (solo si feature flag activo)
const landingPages = ref<LandingPage[] | null>(null)
if (enableLandingLinks) {
  const { data } = await useAsyncData(
    'landing-pages-all',
    () => $fetch<LandingPage[]>('/api/landing-pages', {
      query: { sort: 'country' }
    })
  )
  landingPages.value = data.value
}

const countryFlag = (code: string) => {
  if (!code) return ''
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 127397 + c.charCodeAt(0)))
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SkeletonHeroSection v-if="isLoading" variant="primary" show-badge />
    <HeroSection
      v-else
      badge="Más de 3.000 colombianos confían en nosotros"
      badge-icon
      title="Soluciones de financiamiento para tu hogar en Colombia"
      subtitle="Desde el exterior, puedes acceder a crédito hipotecario, leasing habitacional y más. Te acompañamos en cada paso para hacer realidad tu proyecto de vivienda."
    />

    <!-- Estadísticas de confianza -->
    <template v-if="isLoading">
      <SkeletonStatsSection variant="white" />
    </template>
    <StatsSection v-else :stats="trustStats" variant="white" />

    <!-- Servicios principales -->
    <div class="bg-muted py-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <!-- Skeleton state -->
        <template v-if="isLoading">
          <div class="text-center mb-12">
            <div class="h-9 w-56 skeleton-shimmer rounded mx-auto mb-4" />
            <div class="space-y-2 max-w-2xl mx-auto">
              <div class="h-5 w-full skeleton-shimmer rounded" />
              <div class="h-5 w-3/4 skeleton-shimmer rounded mx-auto" />
            </div>
          </div>
          <div class="flex flex-wrap justify-center gap-8">
            <SkeletonServiceCard
              v-for="i in 6"
              :key="i"
              class="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
            />
          </div>
        </template>

        <!-- Contenido real -->
        <template v-else>
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Nuestros servicios
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos soluciones financieras especializadas para colombianos en el exterior que desean invertir en vivienda en Colombia
            </p>
          </div>

          <!-- Grid de servicios (flex para centrar última fila) -->
          <div class="flex flex-wrap justify-center gap-8">
            <ServiceCard
              v-for="service in store.services"
              :key="service.slug"
              :service="service"
              class="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
            />
          </div>
        </template>
      </div>
    </div>

    <!-- Servicios por país -->
    <section v-if="landingPages?.length" class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Invertir desde el exterior
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Información especializada según tu país de residencia
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <NuxtLink
            v-for="lp in landingPages"
            :key="lp.slug"
            :to="`/servicios/${lp.service_slug}/${lp.slug}`"
            class="flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-md transition-all group"
          >
            <span class="text-3xl">{{ countryFlag(lp.country_code || '') }}</span>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-900 group-hover:text-primary transition-colors">{{ lp.country }}</p>
              <p class="text-sm text-gray-500">{{ lp.title }}</p>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-primary shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Bancos Aliados -->
    <BankLogosSection />

    <!-- Testimonios -->
    <TestimonialMarquee
      title="Lo que dicen nuestros clientes"
      subtitle="Historias reales de colombianos que cumplieron su sueño de tener vivienda propia"
      :testimonials="store.testimonials"
    />

    <!-- CTA Final -->
    <CTASection
      title="Tu hogar en Colombia te está esperando"
      description="Da el primer paso hacia tu inversión inmobiliaria. Nuestro equipo está listo para asesorarte sin costo ni compromiso."
      :primary-cta="{ text: 'Simular mi crédito', to: '/simulador/credito' }"
      :secondary-cta="{ text: 'Hablar con un ejecutivo de crédito', to: '/contacto' }"
      :benefits="['Sin costo inicial', 'Respuesta en 24 h', 'Proceso 100 % remoto']"
    />
  </div>
</template>
