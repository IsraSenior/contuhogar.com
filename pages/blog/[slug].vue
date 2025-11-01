<script setup>
const route = useRoute()

// Datos del artículo (en el futuro vendrán de Directus o CMS)
const articleData = {
    title: 'Aprovecha el poder de las tasas de cambio a tu favor',
    subtitle: 'El momento es ahora',
    description: 'Descubre cómo los colombianos en el exterior pueden aprovechar las tasas de cambio para invertir en vivienda propia en Colombia con mejores condiciones.',
    author: 'Alejandra Pérez C.',
    publishedDate: '2024-01-15',
    modifiedDate: '2024-01-15',
    slug: route.params.slug
}

// SEO optimizado para artículo
useSeo({
    title: `${articleData.title} | Blog ConTuHogar`,
    description: articleData.description,
    type: 'article',
    article: {
        publishedTime: articleData.publishedDate,
        modifiedTime: articleData.modifiedDate,
        author: articleData.author,
        section: 'Inversión Inmobiliaria',
        tags: ['Inversión', 'Vivienda', 'Tasas de Cambio', 'Colombianos en el Exterior']
    }
})

// Structured data para artículo
useArticleSchema({
    title: articleData.title,
    description: articleData.description,
    image: 'https://contuhogar.com/og-image.jpg', // Agregar imagen específica del artículo
    datePublished: articleData.publishedDate,
    dateModified: articleData.modifiedDate,
    author: articleData.author,
    url: `https://contuhogar.com/blog/${articleData.slug}`
})

// Breadcrumb para mejor SEO
useBreadcrumbSchema([
    { name: 'Inicio', url: 'https://contuhogar.com' },
    { name: 'Blog', url: 'https://contuhogar.com/blog' },
    { name: articleData.title, url: `https://contuhogar.com/blog/${articleData.slug}` }
])
</script>

<template>
    <div class="bg-muted px-6 py-24 lg:px-8">
        <div class="mx-auto max-w-5xl text-base/7 text-gray-500">
            <p class="text-base/7 font-semibold text-secondary">El momento es ahora</p>
            <h1 class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-primary sm:text-5xl">Aprovecha el
                poder de las tasas de cambio a tu favor.</h1>
            <div class="space-y-6 text-xl/8 mt-6">
                <p>En los últimos años, la devaluación del peso colombiano ha dificultado que
                    muchas familias en el país puedan acceder a una vivienda propia, ya sea mediante pagos de contado
                    o a través de créditos hipotecarios. Sin embargo, esta realidad ha generado una gran
                    oportunidad para los colombianos residentes en el exterior quienes reciben ingresos en
                    monedas fuertes como el dólar, el euro u otras fuertes divisas.</p>

                <p>Hoy, los colombianos quienes trabajan y residen en algunos países del exterior tienen una
                    ventaja única, tu dinero vale más en Colombia. Esta diferencia les permite invertir de forma
                    más estratégica, segura y rentable, incluso en mejores condiciones que en tu país de
                    residencia.</p>

                <p>La finca raíz continúa siendo una de las formas más estables y sólidas de inversión en el
                    mundo. No solo incrementa el patrimonio, sino que también brinda seguridad y estabilidad
                    financiera. Contar con ingresos en una moneda fuerte y acceder a créditos en pesos
                    colombianos ofrece beneficios como cuotas más asequibles, posibilidad de hacer abonos a
                    capital y, en muchos casos, pagar el préstamo en menos tiempo del previsto.</p>

                <p> Hoy es el momento ideal para invertir en tu país, aplica a un crédito de vivienda y compra
                    tu propiedad ya, o ayuda a tu familia a cumplir ese sueño que la economía local ha hecho
                    difícil. La diferencia la haces tú. Tus buenas decisiones pueden convertirse en un hogar
                    para ti o los tuyos en Colombia.</p>

                <p class="font-bold">Alejandra Pérez C.</p>
            </div>
        </div>
    </div>

    <div class="bg-white">
        <div class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div
                class="relative isolate overflow-hidden bg-secondary px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                    <h2 class="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">¿Listo
                        para invertir en tu futuro en Colombia?</h2>
                    <p class="mt-6 text-lg/8 text-pretty text-white"> Nuestro equipo está listo para escucharte,
                        orientarte y ayudarte a tomar la mejor decisión.</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <NuxtLink to="/contacto" class=" rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-xs
                            shadow-primary/5 hover:bg-primary hover:text-white focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-white">Contáctanos</NuxtLink>
                        <NuxtLink to="/nosotros" class="text-sm/6 font-semibold text-white hover:text-primary">
                            Conocer más <span aria-hidden="true">→</span></NuxtLink>
                    </div>
                </div>
                <div class="relative mt-16 h-full lg:mt-8">
                    <NuxtImg class="absolute top-0 left-0 w-[46rem] max-w-none object-center object-cover rounded-md bg-white/5 ring-1 ring-white/10"
                        src="https://img.freepik.com/foto-gratis/mira-compramos-casa_637285-12424.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
                        alt="Familia feliz celebrando compra de casa"
                        format="webp"
                        quality="80"
                        sizes="sm:100vw lg:736px"
                        loading="lazy" />
                </div>
            </div>
        </div>
    </div>
</template>