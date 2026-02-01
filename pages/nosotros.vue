<script setup lang="ts">
const store = useMainStore();
const { isLoading } = useLoading(150)
const title = `ConTuHogar | Nosotros`;
const description = "Conoce a ConTuHogar: más de 16 años ayudando a colombianos en el exterior a invertir en vivienda en Colombia. Aliados con los principales bancos del país."

// SEO optimizado
useSeo({
    title: title,
    description: description,
    type: 'website'
})

// Structured data
useLocalBusinessSchema()

// Estadísticas de la empresa
const stats = [
    { value: '16 +', label: 'Años de experiencia', description: 'en el mercado colombiano' },
    { value: '3.000 +', label: 'Familias', description: 'cumplieron su sueño' },
    { value: '4', label: 'Bancos aliados', description: 'para mejores tasas de interés' },
    { value: '24 h', label: 'Respuesta', description: 'en preaprobación' }
]

// Valores de la empresa con iconos SVG
const valores = [
    {
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        title: 'Compromiso',
        description: 'Cada cliente y cada inversión son únicos. Por eso, nos comprometemos a encontrar la mejor solución, diseñada y evaluada según tu situación específica.'
    },
    {
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
        title: 'Confianza',
        description: 'Transparencia total en cada paso del proceso. Sin letra pequeña, sin sorpresas.'
    },
    {
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        title: 'Agilidad',
        description: 'Procesos digitalizados para que gestiones tu crédito sin salir de tu país de residencia, de forma fácil y rápida.'
    },
    {
        icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
        title: 'Excelencia',
        description: 'Más del 85% de nuestros clientes nos recomiendan. Tu satisfacción es nuestra meta.'
    }
]
</script>

<template>
    <div>
    <!-- Hero Section -->
    <SkeletonHeroSection v-if="isLoading" variant="primary" show-badge />
    <HeroSection
        v-else
        badge="Desde 2009 conectando colombianos con su hogar"
        badge-icon
        title="Tu sueño de vivienda en Colombia, nuestra misión"
        subtitle="Más de 16 años de experiencia asesorando a colombianos en el exterior para que inviertan de forma segura en su país. Somos el puente entre tú y tu hogar."
    />

    <!-- Stats Section -->
    <SkeletonStatsSection v-if="isLoading" :count="4" variant="white" />
    <StatsSection v-else :stats="stats" variant="white" />

    <!-- Nuestra Historia -->
    <section class="bg-gray-50 py-16 lg:py-24">
        <div class="mx-auto container px-6 lg:px-8">
            <!-- Skeleton State -->
            <template v-if="isLoading">
              <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="space-y-6">
                  <div class="skeleton-shimmer h-5 w-32 rounded" />
                  <div class="skeleton-shimmer h-10 w-full rounded-lg" />
                  <div class="skeleton-shimmer h-10 w-3/4 rounded-lg" />
                  <div class="space-y-3 mt-6">
                    <div class="skeleton-shimmer h-4 w-full rounded" />
                    <div class="skeleton-shimmer h-4 w-full rounded" />
                    <div class="skeleton-shimmer h-4 w-5/6 rounded" />
                  </div>
                  <div class="space-y-3">
                    <div class="skeleton-shimmer h-4 w-full rounded" />
                    <div class="skeleton-shimmer h-4 w-full rounded" />
                    <div class="skeleton-shimmer h-4 w-4/5 rounded" />
                  </div>
                  <div class="skeleton-shimmer h-12 w-64 rounded-lg mt-4" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-4">
                    <div class="skeleton-shimmer rounded-2xl h-40" />
                    <div class="skeleton-shimmer rounded-2xl h-48" />
                  </div>
                  <div class="space-y-4 pt-8">
                    <div class="skeleton-shimmer rounded-2xl h-48" />
                    <div class="skeleton-shimmer rounded-2xl h-40" />
                  </div>
                </div>
              </div>
            </template>

            <!-- Real Content -->
            <div v-else class="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-base font-semibold text-secondary mb-2">Nuestra historia</h2>
                    <p class="text-3xl lg:text-4xl font-bold text-primary mb-6">
                        16 años construyendo el camino a tu hogar
                    </p>

                    <div class="space-y-6 text-gray-600">
                        <p class="text-lg font-medium text-secondary">
                            ConTuHogar nació en 2009 con una misión clara: ayudar a los colombianos en el exterior a invertir en su país de manera segura y confiable.
                        </p>
                        <p>
                            Desde entonces, hemos acompañado a más de 3.000 familias a cumplir su sueño de tener vivienda propia en Colombia. Entendemos las dificultades de gestionar un crédito desde el exterior: la distancia, los trámites, la desconfianza, entre otras.
                        </p>
                        <p>
                            Por eso, hemos construido alianzas estratégicas con los principales bancos de Colombia: BBVA, Banco de Bogotá, Banco de Occidente y Banco Unión, para ofrecerte las mejores condiciones del mercado.
                        </p>
                    </div>

                    <div class="mt-8 flex items-center gap-4">
                        <NuxtLink
                            to="/contacto"
                            class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all"
                        >
                            Conoce a tu ejecutivo de crédito
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </NuxtLink>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-4">
                        <div class="bg-primary rounded-2xl p-6 text-white">
                            <h3 class="text-xl font-bold mb-2">Propósito</h3>
                            <p class="text-sm text-white/80">
                                Ayudar a las personas a cumplir su sueño de tener vivienda propia en Colombia, aunque vivan en el exterior.
                            </p>
                        </div>
                        <NuxtImg
                            src="https://img.freepik.com/fotos-premium/retrato-familia-llaves-su-nueva-casa-dia-mudanza_1218270-5812.jpg"
                            alt="Familia con llaves de su casa"
                            class="rounded-2xl w-full h-48 object-cover"
                            format="webp"
                            quality="80"
                            loading="lazy"
                        />
                    </div>
                    <div class="space-y-4 pt-8">
                        <NuxtImg
                            src="https://img.freepik.com/foto-gratis/mira-compramos-casa_637285-12424.jpg"
                            alt="Pareja celebrando compra de casa"
                            class="rounded-2xl w-full h-48 object-cover"
                            format="webp"
                            quality="80"
                            loading="lazy"
                        />
                        <div class="bg-secondary rounded-2xl p-6 text-white">
                            <h3 class="text-xl font-bold mb-2">Misión</h3>
                            <p class="text-sm text-white/80">
                                Asesorar y ayudar a obtener financiación para finca raíz en Colombia desde el exterior de forma oportuna, ágil y eficiente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Nuestros Valores -->
    <section class="bg-white py-16 lg:py-24">
        <div class="mx-auto container px-6 lg:px-8">
            <!-- Skeleton State -->
            <template v-if="isLoading">
              <div class="text-center mb-12">
                <div class="skeleton-shimmer h-5 w-40 mx-auto rounded mb-2" />
                <div class="skeleton-shimmer h-10 w-80 mx-auto rounded-lg" />
              </div>
              <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="i in 4" :key="i" class="bg-gray-50 rounded-2xl p-6">
                  <div class="skeleton-shimmer w-12 h-12 rounded-xl mb-4" />
                  <div class="skeleton-shimmer h-5 w-24 rounded mb-2" />
                  <div class="space-y-2">
                    <div class="skeleton-shimmer h-3 w-full rounded" />
                    <div class="skeleton-shimmer h-3 w-5/6 rounded" />
                    <div class="skeleton-shimmer h-3 w-4/5 rounded" />
                  </div>
                </div>
              </div>
            </template>

            <!-- Real Content -->
            <template v-else>
              <div class="text-center mb-12">
                  <h2 class="text-base font-semibold text-secondary mb-2">¿Por qué elegirnos?</h2>
                  <p class="text-3xl lg:text-4xl font-bold text-primary">
                      Lo que nos hace diferentes
                  </p>
              </div>

              <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div v-for="(valor, index) in valores" :key="index" class="group">
                      <div class="bg-gray-50 rounded-2xl p-6 h-full hover:bg-primary hover:shadow-xl transition-all duration-300">
                          <div class="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors">
                              <svg class="w-6 h-6 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="valor.icon" />
                              </svg>
                          </div>
                          <h3 class="text-lg font-bold text-primary group-hover:text-white mb-2 transition-colors">
                              {{ valor.title }}
                          </h3>
                          <p class="text-sm text-gray-600 group-hover:text-white/80 transition-colors">
                              {{ valor.description }}
                          </p>
                      </div>
                  </div>
              </div>
            </template>
        </div>
    </section>

    <!-- Bancos y Aliados -->
    <SkeletonBankLogos v-if="isLoading" />
    <BankLogosSection
        v-else
        title="Respaldados por los mejores"
        subtitle="Nuestras alianzas con los principales bancos de Colombia y constructoras nos permiten ofrecerte las mejores tasas de interés y condiciones del mercado."
        trust-message="Aliados estratégicos que garantizan seguridad y confianza en tu inversión"
    />

    <!-- Equipo -->
    <section class="bg-gray-900 py-16 lg:py-24">
        <div class="mx-auto container px-6 lg:px-8">
            <!-- Skeleton State -->
            <template v-if="isLoading">
              <div class="text-center mb-12">
                <div class="skeleton-shimmer-light h-8 w-40 mx-auto rounded-lg mb-6" />
                <div class="skeleton-shimmer-light h-10 w-96 max-w-full mx-auto rounded-lg mb-4" />
                <div class="space-y-2 max-w-2xl mx-auto">
                  <div class="skeleton-shimmer-light h-4 w-full rounded" />
                  <div class="skeleton-shimmer-light h-4 w-5/6 mx-auto rounded" />
                </div>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div v-for="i in 8" :key="i" class="bg-gray-800 rounded-2xl overflow-hidden">
                  <div class="skeleton-shimmer-light aspect-square" />
                  <div class="p-4 space-y-2">
                    <div class="skeleton-shimmer-light h-5 w-3/4 rounded" />
                    <div class="skeleton-shimmer-light h-4 w-1/2 rounded" />
                  </div>
                </div>
              </div>
              <div class="mt-12 text-center space-y-4">
                <div class="skeleton-shimmer-light h-4 w-80 max-w-full mx-auto rounded" />
                <div class="skeleton-shimmer-light h-12 w-56 mx-auto rounded-xl" />
              </div>
            </template>

            <!-- Real Content -->
            <template v-else>
              <div class="text-center mb-12">

                  <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm font-medium mb-6 text-white">
                      Nuestro equipo
                  </div>
                  <p class="text-3xl lg:text-4xl font-bold text-white mb-4">
                      Tu sueño, en manos de expertos
                  </p>
                  <p class="text-gray-400 max-w-2xl mx-auto">
                      Un equipo de profesionales integrales y apasionados por ayudarte a conseguir tu vivienda en Colombia. Cada uno con gran experiencia y dedicación para guiarte en cada paso.
                  </p>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <div v-for="(staff, index) in store.team" :key="index" class="group">
                      <div class="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-700 transition-all">
                          <NuxtImg
                              class="w-full aspect-square object-cover object-top"
                              :src="staff?.image"
                              :alt="staff?.name"
                              format="webp"
                              quality="75"
                              loading="lazy"
                          />
                          <div class="p-4">
                              <h3 class="font-semibold text-white">{{ staff?.name }}</h3>
                              <p class="text-sm text-gray-400">{{ staff?.title }}</p>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- CTA dentro del equipo -->
              <div class="mt-12 text-center">
                  <p class="text-gray-400 mb-4">¿Listo para conocer a tu ejecutivo de crédito personalizado?</p>
                  <NuxtLink
                      to="/contacto"
                      class="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-all"
                  >
                      Agenda tu consulta gratuita
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                  </NuxtLink>
              </div>
            </template>
        </div>
    </section>

    <!-- CTA Final -->
    <CTASection
        title="Tu hogar en Colombia te está esperando"
        description="Da el primer paso hacia tu inversión inmobiliaria. Nuestro equipo está listo para asesorarte sin costo ni compromiso."
        :primary-cta="{ text: 'Simular mi crédito', to: '/simulador/credito' }"
        :secondary-cta="{ text: 'Hablar con un ejecutivo de crédito', to: '/contacto' }"
        :benefits="['Sin costo inicial', 'Respuesta en 24 h', 'Proceso 100 % remoto']"
        image="https://img.freepik.com/foto-gratis/mira-compramos-casa_637285-12424.jpg"
        image-alt="Familia feliz con su nueva casa"
    />
    </div>
</template>
