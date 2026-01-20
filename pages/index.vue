<script setup>
const store = useMainStore();
const title = `ConTuHogar | Crédito de vivienda en Colombia para colombianos en el exterior`;
const description = "ConTuHogar: Más de 16 años ayudando a colombianos en el exterior a obtener crédito hipotecario en Colombia. Asesoría gratuita, preaprobación en 24 horas."

// SEO optimizado
useSeo({
    title: title,
    description: description,
    type: 'website'
})

// Structured data para la pagina principal
useLocalBusinessSchema()

// Configuracion del carrusel de servicios
const carouselConfig = {
    itemsToShow: 4,
    gap: 5,
    autoplay: 2000,
    snapAlign: "center",
    wrapAround: true,
    pauseAutoplayOnHover: true,
    breakpointMode: 'carousel',
    breakpoints: {
        300: {
            itemsToShow: 1,
            snapAlign: 'center',
        },
        640: {
            itemsToShow: 2,
            snapAlign: 'center',
        },
        1080: {
            itemsToShow: 4,
            snapAlign: 'center',
        },
    }
}

// Estadisticas de confianza
const trustStats = [
    { value: '16 +', label: 'Años de experiencia', description: 'en el mercado colombiano' },
    { value: '3,000 +', label: 'Familias', description: 'cumplieron su sueño' },
    { value: '4', label: 'Bancos aliados', description: 'para mejores tasas de interés' },
    { value: '24 h', label: 'Respuesta', description: 'en preaprobación' }
]

// Beneficios de trabajar con ConTuHogar
const benefits = [
    {
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        title: 'Seguridad garantizada',
        description: 'Trabajamos con los bancos más sólidos de Colombia. Tu inversión está protegida.'
    },
    {
        icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
        title: 'Proceso 100 % remoto',
        description: 'Gestiona tu crédito desde cualquier país. Sin viajes, sin filas.'
    },
    {
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        title: 'Mejores tasas de interés',
        description: 'Comparamos entre 4 bancos para conseguirte las condiciones más favorables.'
    },
    {
        icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
        title: 'Asesoría personalizada',
        description: 'Un ejecutivo dedicado te acompaña desde la solicitud hasta el desembolso.'
    }
]

// Testimonios para el componente marquee
const testimonials = [
    {
        quote: 'Hice el proceso con ContuHogar de una compra de vivienda desde el extranjero y la verdad fue súper fácil, nos fue muy bien, pudimos adquirir el inmueble y también me están ayudando para otro. La asesoría, todo el proceso de principio a fin súper bien. La verdad súper recomendado.',
        name: 'Juan Camilo Manrique Olave',
        handle: '@juancamilolave',
        avatar: '/testimonials/juancamilolave.jpeg',
        location: 'Estados Unidos'
    },
    {
        quote: 'Quiero agradecer a CONTUHOGAR por todo el acompañamiento que me brindaron, la asesoría fue excelente, te resuelven todas las inquietudes permitiéndome hacer el proceso mucho más fácil y seguro. Los recomiendo al 100, una empresa muy responsable y confiable.',
        name: 'Ingrid Yurley Fajardo Contreras',
        handle: '@nafyc_moda',
        avatar: '/testimonials/nafyc_moda.jpeg',
        location: 'España'
    },
    {
        quote: 'Tuve una excelente experiencia con Contuhogar. Me ayudaron a gestionar un crédito hipotecario desde Suiza para comprar un inmueble en Colombia, y todo el proceso fue rápido, claro y exitoso. Son muy atentos, profesionales y se nota que tienen el conocimiento y la experiencia para lograr la aprobación del banco sin complicaciones. Muy feliz con el resultado y los recomiendo totalmente!',
        name: 'German Enrique Cortes Hernandez',
        handle: '@Gecortes92',
        avatar: '/testimonials/Gecortes92.jpeg',
        location: 'Suiza'
    },
    {
        quote: 'Vivo en Estados Unidos y mi experiencia con ContuHogar ha sido excelente. Marly me acompañó en todo el proceso y en solo un mes ya tenía aprobado mi préstamo en Colombia. Es una herramienta muy útil para quienes vivimos fuera del país. Estoy muy agradecida, 100 de 10!',
        name: 'Bibiana Patricia Velasquez Velasquez',
        avatar: '/testimonials/bibiana.jpeg',
        location: 'Estados Unidos'
    },
    {
        quote: 'Muy buenos días, mi nombre es Cindy Sanchez y tuve una excelente experiencia con el crédito y CONTUHOGAR. El acompañamiento fue muy agradable porque no me dejaron sola en este proceso y hoy ya puedo disfrutar de mi nuevo apartamento en Medellín. Muchas gracias por la excelencia que tuvieron con mi caso.',
        name: 'Cindy Sanchez',
        handle: '@milufitoficial',
        avatar: '/testimonials/milufitoficial.jpeg',
        location: 'Estados Unidos'
    },
    {
        quote: 'En Contuhogar obtuve todo el apoyo y la guía para poder realizar el estudio de crédito desde un lugar fuera de Colombia. La paciencia, la constancia y dedicación que ustedes me brindaron paso a paso me hicieron sentir protegido. Ustedes hicieron posible que yo tenga un lugar para vivir propio en mi amada Colombia. Gracias mil veces por su apoyo incondicional.',
        name: 'Diana Piedrahita',
        handle: '@dmilenep',
        avatar: '/testimonials/dmilenep.jpeg',
        location: 'Europa'
    },
    {
        quote: 'Mi nombre es Elena M. Quiroga, resido en la ciudad de Fort Myers Fl, Estados Unidos, les comparto mi experiencia con Contuhogar, la cual fue excelente, el personal muy amable, la señora Marly y el señor Carlos me apoyaron y estuvieron siempre pendientes hasta el final del proceso con el préstamo. Realmente excelentes personas y muy profesionales, los recomiendo.',
        name: 'Elena Marcela Quiroga Imparato',
        avatar: '/testimonials/Elena.jpeg',
        location: 'Fort Myers, FL - Estados Unidos'
    }
]
</script>

<template>
    <!-- Hero Section -->
    <section class="bg-primary">
        <div class="mx-auto container px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-24">
                <!-- Contenido izquierdo -->
                <div>
                    <!-- Badge de confianza -->
                    <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm text-white font-medium mb-8 border border-white/20">
                        <svg class="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        Más de 16 años de experiencia
                    </div>

                    <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl leading-tight">
                        Tu crédito de vivienda en Colombia, desde cualquier lugar del mundo
                    </h1>

                    <p class="mt-6 text-lg text-white/90 leading-relaxed">
                        Somos la empresa líder en asesoría financiera para colombianos en el exterior. Te acompañamos en todo el proceso para que inviertas en tu patrimonio de forma segura y confiable.
                    </p>

                    <!-- CTAs prominentes -->
                    <div class="mt-10 flex flex-col sm:flex-row gap-4">
                        <NuxtLink
                            to="/simulador/credito"
                            class="inline-flex items-center justify-center gap-2 px-6 py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-all shadow-lg"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Simular mi crédito
                        </NuxtLink>
                        <NuxtLink
                            to="/contacto"
                            class="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary transition-all"
                        >
                            Hablar con un ejecutivo de crédito
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </NuxtLink>
                    </div>

                    <!-- Beneficios rapidos -->
                    <div class="mt-10 flex flex-wrap gap-6 text-sm text-white/90">
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            Sin costo inicial
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            Respuesta en 24 h
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            100% remoto
                        </div>
                    </div>
                </div>

                <!-- Imagen hero -->
                <div class="relative hidden lg:block">
                    <div class="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
                        <NuxtImg
                            src="/2148392254.jpg"
                            alt="Familia feliz con las llaves de su nueva casa"
                            class="w-full h-full object-cover"
                            format="webp"
                            quality="85"
                            sizes="sm:100vw lg:600px"
                            loading="eager"
                            fetchpriority="high"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Bancos aliados (segunda seccion) -->
    <BankLogosSection
        title="Respaldados por los principales bancos de Colombia"
        subtitle="Nuestras alianzas estratégicas te garantizan las mejores tasas y condiciones del mercado."
        trust-message="Trabajamos exclusivamente con entidades reguladas por la Superintendencia Financiera de Colombia"
        :logos="store.bankLogos"
    />

    <!-- Por que elegirnos -->
    <section class="bg-white py-20 lg:py-28">
        <div class="mx-auto container px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <!-- Contenido -->
                <div>
                    <h2 class="text-base font-semibold text-secondary mb-3">¿Por qué ContuHogar?</h2>
                    <p class="text-3xl lg:text-4xl font-bold text-primary mb-6">
                        La confianza de más de 1.500 familias nos respalda.
                    </p>
                    <p class="text-lg text-gray-600 mb-10">
                        Desde 2009, hemos construido relaciones sólidas con los principales bancos de Colombia para ofrecerte un servicio integral, seguro y transparente.
                    </p>

                    <div class="grid sm:grid-cols-2 gap-6">
                        <div v-for="(benefit, index) in benefits" :key="index" class="flex gap-4">
                            <div class="shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="benefit.icon" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900 mb-1">{{ benefit.title }}</h3>
                                <p class="text-sm text-gray-600">{{ benefit.description }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-10">
                        <NuxtLink
                            to="/nosotros"
                            class="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
                        >
                            Conoce nuestra historia
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </NuxtLink>
                    </div>
                </div>

                <!-- Imagen -->
                <div class="relative">
                    <div class="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
                        <NuxtImg
                            src="https://img.freepik.com/fotos-premium/retrato-familia-llaves-su-nueva-casa-dia-mudanza_1218270-5812.jpg"
                            alt="Familia recibiendo las llaves de su nueva casa"
                            class="w-full h-full object-cover"
                            format="webp"
                            quality="85"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section (debajo de Por que ConTuHogar) -->
    <StatsSection :stats="trustStats" variant="muted" />

    <!-- Servicios (Carrusel infinito) -->
    <section id="servicios" class="bg-white py-20 lg:py-28">
        <div class="mx-auto container px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-base font-semibold text-secondary mb-3">Nuestros servicios</h2>
                <p class="text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Soluciones financieras a tu medida
                </p>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    Ofrecemos un portafolio completo de productos financieros para que inviertas en finca raiz en Colombia desde cualquier lugar del mundo.
                </p>
            </div>
        </div>

        <Carousel v-bind="carouselConfig" class="py-4">
            <Slide v-for="(n, index) in store.services" :key="index" class="px-2 py-4">
                <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg shadow-primary/5 bg-white">
                    <NuxtImg
                        class="w-full h-52 object-center object-cover"
                        :src="n.image"
                        :alt="n.title"
                        format="webp"
                        quality="80"
                        sizes="sm:100vw md:400px"
                        loading="lazy"
                    />
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2 text-primary">{{ n.title }}</div>
                        <p class="text-base line-clamp-3 text-gray-600">{{ n.intro }}</p>
                    </div>
                    <div class="px-6 pt-2 pb-4 flex justify-end">
                        <NuxtLink
                            :to="`/servicios/${n.slug}`"
                            class="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:text-primary transition-colors"
                        >
                            Leer más
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </NuxtLink>
                    </div>
                </div>
            </Slide>
        </Carousel>
    </section>

    <!-- CTA intermedio -->
    <section class="bg-primary py-16 lg:py-20">
        <div class="mx-auto container px-6 lg:px-8">
            <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div class="text-center lg:text-left">
                    <h2 class="text-2xl lg:text-3xl font-bold text-white mb-2">
                        Recibe tu preaprobación en 24 horas
                    </h2>
                    <p class="text-white/80">
                        Descubre cuánto puedes financiar hoy.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-4">
                    <NuxtLink
                        to="/simulador/credito"
                        class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Simular ahora
                    </NuxtLink>
                    <NuxtLink
                        to="/contacto"
                        class="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
                    >
                        Contactar ejecutivo de crédito
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonios (sin modificar) -->
    <TestimonialMarquee
        id="testimonios"
        title="Lo que dicen nuestros clientes"
        subtitle="Historias reales de colombianos que cumplieron su sueño de tener vivienda propia"
        :testimonials="testimonials"
    />

    <!-- Blog / Articulos -->
    <section class="bg-white py-20 lg:py-28">
        <div class="mx-auto container px-6 lg:px-8">
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                <div>
                    <h2 class="text-base font-semibold text-secondary mb-3">Actualidad inmobiliaria</h2>
                    <p class="text-3xl lg:text-4xl font-bold text-primary">
                        Artículos que impulsan tu inversión
                    </p>
                </div>
                <NuxtLink
                    to="/blog"
                    class="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
                >
                    Ver todos los artículos
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </NuxtLink>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="order-2 lg:order-1">
                    <NuxtImg
                        src="https://img.freepik.com/fotos-premium/gente-sentada-acera-texto-fondo_1048944-7461820.jpg"
                        alt="Personas leyendo información sobre inversiones"
                        class="w-full aspect-4/3 object-cover rounded-2xl shadow-lg"
                        format="webp"
                        quality="80"
                        loading="lazy"
                    />
                </div>
                <div class="order-1 lg:order-2 space-y-8">
                    <!-- Articulo destacado -->
                    <article class="group">
                        <NuxtLink to="/blog/el-momento-es-ahora" class="block">
                            <h3 class="text-xl font-bold text-primary group-hover:text-secondary transition-colors mb-3">
                                Aprovecha el poder de las tasas de cambio a tu favor
                            </h3>
                            <p class="text-gray-600 mb-4 line-clamp-3">
                                En los últimos años, la devaluación del peso colombiano ha dificultado que muchas familias en el país puedan acceder a una vivienda propia. Sin embargo, para los colombianos en el exterior, esta situación representa una oportunidad única de inversión.
                            </p>
                            <div class="flex items-center gap-4 text-sm text-gray-500">
                                <span>24 Jul 2025</span>
                                <span class="inline-flex items-center gap-1 text-primary font-semibold group-hover:text-secondary transition-colors">
                                    Leer más
                                    <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </div>
                        </NuxtLink>
                    </article>

                    <div class="h-px bg-gray-100"></div>

                    <p class="text-gray-600">
                        Mantente al día con las últimas tendencias del mercado, cambios en créditos hipotecarios y oportunidades exclusivas para colombianos en el exterior.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Final -->
    <CTASection
        title="Tu hogar en Colombia te está esperando"
        description="Da el primer paso hacia tu inversión inmobiliaria con el respaldo de un equipo que te asesorará sin costo inicial y sin ningún compromiso."
        :primary-cta="{ text: 'Simular mi crédito', to: '/simulador/credito' }"
        :secondary-cta="{ text: 'Hablar con un ejecutivo de crédito', to: '/contacto' }"
        :benefits="['Sin costo inicial', 'Respuesta en 24 h', 'Proceso 100 % remoto']"
        image="https://img.freepik.com/foto-gratis/mira-compramos-casa_637285-12424.jpg"
        image-alt="Familia feliz con su nueva casa"
    />
</template>
