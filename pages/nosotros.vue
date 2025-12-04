<script setup lang="ts">
const store = useMainStore();
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
    { value: '16+', label: 'Años de experiencia', description: 'en el mercado colombiano' },
    { value: '1,500+', label: 'Familias', description: 'cumplieron su sueño' },
    { value: '6', label: 'Bancos aliados', description: 'para mejores tasas' },
    { value: '24h', label: 'Respuesta', description: 'en pre-aprobación' }
]

// Valores de la empresa con iconos SVG
const valores = [
    {
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        title: 'Compromiso',
        description: 'Cada cliente es único. Nos comprometemos a encontrar la mejor solución para tu situación específica.'
    },
    {
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
        title: 'Confianza',
        description: 'Transparencia total en cada paso del proceso. Sin letra pequeña, sin sorpresas.'
    },
    {
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        title: 'Agilidad',
        description: 'Procesos digitalizados para que gestiones tu crédito sin salir de tu país de residencia.'
    },
    {
        icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
        title: 'Excelencia',
        description: 'Más del 85% de nuestros clientes nos recomiendan. Tu satisfacción es nuestra meta.'
    }
]
</script>

<template>
    <!-- Hero Section -->
    <HeroSection
        badge="Desde 2009 conectando colombianos con su hogar"
        badge-icon
        title="Tu sueño de vivienda en Colombia, nuestra misión"
        subtitle="Más de 16 años de experiencia asesorando a colombianos en el exterior para que inviertan de forma segura en su país. Somos el puente entre tú y tu hogar."
    />

    <!-- Stats Section -->
    <StatsSection :stats="stats" variant="white" />

    <!-- Nuestra Historia -->
    <section class="bg-gray-50 py-16 lg:py-24">
        <div class="mx-auto container px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-base font-semibold text-secondary mb-2">Nuestra historia</h2>
                    <p class="text-3xl lg:text-4xl font-bold text-primary mb-6">
                        16 años construyendo el camino a tu hogar
                    </p>

                    <div class="space-y-6 text-gray-600">
                        <p class="text-lg font-medium text-secondary">
                            ContuHogar nació en 2009 con una misión clara: ayudar a los colombianos en el exterior a invertir en su país de manera segura y confiable.
                        </p>
                        <p>
                            Desde entonces, hemos acompañado a más de 1,500 familias a cumplir su sueño de tener vivienda propia en Colombia. Entendemos las dificultades de gestionar un crédito desde el exterior: la distancia, los trámites, la desconfianza.
                        </p>
                        <p>
                            Por eso, hemos construido alianzas estratégicas con los principales bancos de Colombia como BBVA, Banco de Occidente, Banco de Bogotá y Colpatria, para ofrecerte las mejores condiciones del mercado.
                        </p>
                    </div>

                    <div class="mt-8 flex items-center gap-4">
                        <NuxtLink
                            to="/contacto"
                            class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all"
                        >
                            Conoce a tu asesor
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
            <div class="text-center mb-12">
                <h2 class="text-base font-semibold text-secondary mb-2">Por qué elegirnos</h2>
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
        </div>
    </section>

    <!-- Bancos y Aliados -->
    <BankLogosSection
        title="Respaldados por los mejores"
        subtitle="Nuestras alianzas con los principales bancos de Colombia nos permiten ofrecerte las mejores tasas y condiciones del mercado."
        trust-message="Aliados estratégicos que garantizan seguridad y confianza en tu inversión"
    />

    <!-- Equipo -->
    <section class="bg-gray-900 py-16 lg:py-24">
        <div class="mx-auto container px-6 lg:px-8">
            <div class="text-center mb-12">

                <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm font-medium mb-6 text-white">
                    Nuestro equipo
                </div>
                <p class="text-3xl lg:text-4xl font-bold text-white mb-4">
                    Expertos dedicados a tu sueño
                </p>
                <p class="text-gray-400 max-w-2xl mx-auto">
                    Un equipo de profesionales apasionados por ayudarte a conseguir tu vivienda en Colombia. Cada uno con experiencia y dedicación para guiarte en cada paso.
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
                <p class="text-gray-400 mb-4">¿Listo para conocer a tu asesor personalizado?</p>
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
        </div>
    </section>

    <!-- CTA Final -->
    <CTASection
        title="Tu hogar en Colombia te esta esperando"
        description="Da el primer paso hacia tu inversion inmobiliaria. Nuestro equipo esta listo para asesorarte sin costo ni compromiso."
        :primary-cta="{ text: 'Simular mi credito', to: '/simulador/credito' }"
        :secondary-cta="{ text: 'Hablar con un asesor', to: '/contacto' }"
        :benefits="['Sin costo inicial', 'Respuesta en 24h', 'Proceso 100% remoto']"
        image="https://img.freepik.com/foto-gratis/mira-compramos-casa_637285-12424.jpg"
        image-alt="Familia feliz con su nueva casa"
    />
</template>
