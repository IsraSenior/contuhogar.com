<script setup>
import { useMainStore } from '@/stores/index'

const store = useMainStore()

const title = 'Servicios | ConTuHogar'
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

// Estadísticas de confianza
const trustStats = [
  { value: '1,500+', label: 'Familias', description: 'confían en nosotros' },
  { value: '16+', label: 'Años de experiencia', description: 'en el mercado' },
  { value: '24h', label: 'Respuesta', description: 'en preaprobación' },
  { value: '6', label: 'Bancos aliados', description: 'para mejores tasas' }
]

// Testimonios (reutilizados del home)
const testimonials = [
  {
    quote: 'Gracias a ConTuHogar pude comprar mi apartamento en Bogotá sin tener que viajar. Todo el proceso fue muy claro y profesional.',
    name: 'María González',
    avatar: '/testimonials/Maria.jpeg',
    location: 'Miami, FL - Estados Unidos'
  },
  {
    quote: 'Llevaba años queriendo invertir en Colombia pero no sabía cómo. El equipo de ConTuHogar me guió en cada paso.',
    name: 'Carlos Ramírez',
    avatar: '/testimonials/Carlos.jpeg',
    location: 'Madrid, España'
  },
  {
    quote: 'Excelente servicio. Me ayudaron a conseguir una tasa de interés muy competitiva para mi crédito hipotecario.',
    name: 'Ana Martínez',
    avatar: '/testimonials/Ana.jpeg',
    location: 'Toronto, Canadá'
  },
  {
    quote: 'El proceso de leasing habitacional fue mucho más sencillo de lo que esperaba. Muy recomendados.',
    name: 'Jorge Pérez',
    avatar: '/testimonials/Jorge.jpeg',
    location: 'Ciudad de México, México'
  },
  {
    quote: 'Profesionales y muy atentos. Respondieron todas mis dudas y me acompañaron hasta el desembolso.',
    name: 'Laura Sánchez',
    avatar: '/testimonials/Laura.jpeg',
    location: 'Londres, Reino Unido'
  },
  {
    quote: 'Después de buscar muchas opciones, ConTuHogar fue la única empresa que realmente entendió mis necesidades como colombiano en el exterior.',
    name: 'Pedro Hernández',
    avatar: '/testimonials/Pedro.jpeg',
    location: 'Santiago, Chile'
  },
  {
    quote: 'Increíble la rapidez con la que obtuve mi preaprobación. En menos de 48 horas ya tenía respuesta.',
    name: 'Claudia Vargas',
    avatar: '/testimonials/Claudia.jpeg',
    location: 'Nueva York, NY - Estados Unidos'
  },
  {
    quote: 'Mi familia y yo estamos muy agradecidos. Ahora tenemos nuestro hogar en Colombia gracias a su asesoría.',
    name: 'Roberto Gómez',
    avatar: '/testimonials/Roberto.jpeg',
    location: 'París, Francia'
  },
  {
    quote: 'Contraté el servicio de compra de cartera y logré reducir mi cuota mensual significativamente. Muy satisfecha.',
    name: 'Elena Díaz',
    avatar: '/testimonials/Elena.jpeg',
    location: 'Fort Myers, FL - Estados Unidos'
  }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      badge="Más de 1,500 colombianos confían en nosotros"
      badge-icon
      title="Soluciones de financiamiento para tu hogar en Colombia"
      subtitle="Desde el exterior, puedes acceder a crédito hipotecario, leasing habitacional y más. Te acompañamos en cada paso para hacer realidad tu proyecto de vivienda."
    />

    <!-- Estadísticas de confianza -->
    <StatsSection :stats="trustStats" variant="white" />

    <!-- Servicios principales -->
    <div class="bg-muted py-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
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
      </div>
    </div>

    <!-- Bancos Aliados -->
    <BankLogosSection />

    <!-- Testimonios -->
    <TestimonialMarquee
      title="Lo que dicen nuestros clientes"
      subtitle="Historias reales de colombianos que cumplieron su sueño de tener vivienda propia"
      :testimonials="testimonials"
    />

    <!-- CTA Final -->
    <CTASection
      title="Tu hogar en Colombia te está esperando"
      description="Da el primer paso hacia tu inversión inmobiliaria. Nuestro equipo está listo para asesorarte sin costo ni compromiso."
      :primary-cta="{ text: 'Simular mi crédito', to: '/simulador/credito' }"
      :secondary-cta="{ text: 'Hablar con un ejecutivo de crédito', to: '/contacto' }"
      :benefits="['Sin costo inicial', 'Respuesta en 24h', 'Proceso 100% remoto']"
    />
  </div>
</template>
