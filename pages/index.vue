<script setup>
const store = useMainStore();
const carouselConfig = {
    itemsToShow: 4,
    gap: 5,
    autoplay: 2000,
    snapAlign: "start",
    wrapAround: false,
    pauseAutoplayOnHover: true,
    breakpointMode: 'carousel',

    // Breakpoints are mobile-first
    // Any settings not specified will fall back to the carousel's default settings
    breakpoints: {
        // 300px and up
        300: {
            itemsToShow: 1,
            snapAlign: 'center',
        },

        1080: {
            itemsToShow: 4,
            snapAlign: 'center',
        },


    }
}
</script>

<template>
    <section class="relative bg-white">
        <div class="mx-auto container lg:grid lg:grid-cols-12 lg:gap-x-20 lg:px-8">
            <div
                class="px-5 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 xl:col-span-6 h-[75vh] flex items-center justify-center">
                <div class="mx-auto max-w-2xl lg:mx-0 mt-16">
                    <div class="hidden lg:block max-w-md">
                        <div
                            class="relative flex items-center justify-between rounded-full px-3 py-1 text-sm text-gray-500 ring-1 ring-primary/10 hover:ring-primary/20">
                            Mantente al día con las últimas noticias<NuxtLink to="/blog"
                                class="font-semibold whitespace-nowrap text-secondary hover:text-primary"><span
                                    class="absolute inset-0" aria-hidden="true"></span> Infórmate ahora <span
                                    aria-hidden="true">&rarr;</span></NuxtLink>
                        </div>
                    </div>
                    <h1
                        class="md:mt-24 text-3xl font-semibold tracking-tight text-pretty text-primary sm:mt-10 sm:text-6xl">
                        Tu crédito de vivienda en
                        Colombia empieza aquí, estés donde estés</h1>
                    <p class="mt-8">Más de 16 años
                        de experiencia guiando a colombianos en el exterior hacia inversiones inmobiliarias seguras
                        y créditos adaptados a sus necesidades. Tu patrimonio en Colombia, en las mejores manos.</p>
                    <div class="mt-10 flex items-center gap-x-6">
                        <NuxtLink to="/contacto" class="btn primary">Contáctanos</NuxtLink>
                        <NuxtLink :to="{ path: '/', hash: '#servicios' }"
                            class="text-sm/6 font-semibold text-secondary hover:text-primary">Conoce
                            nuestros servicios <span aria-hidden="true">→</span></NuxtLink>
                    </div>
                </div>
            </div>
            <div
                class="relative lg:col-span-5 sm:rounded-bl-3xl overflow-hidden lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
                <img class="aspect-3/2 w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                    src="/2148392254.jpg" alt="">
            </div>
        </div>
    </section>

    <section class="bg-white py-16 md:py-24">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-lg sm:max-w-2xl flex gap-10 items-center justify-center">
                <div class="w-2/3">
                    <span class="w-full font-bold text-base">Banco BBVA</span>
                </div>
                <div v-for="(client, index) in store.logos" :key="index" class="w-1/3">
                    <img class="h-full w-full object-contain max-h-12" :src="client" alt="">
                </div>
            </div>

            <div class="mt-16 flex justify-center">
                <p
                    class="relative rounded-3xl bg-gray-50 px-4 py-1.5 text-sm text-gray-500 ring-1 ring-primary/5 ring-inset">
                    <span class="hidden md:inline">Trabajamos con los bancos y constructoras más reconocidas de
                        Colombia para brindarte soluciones confiables y seguras.</span>
                    <NuxtLink :to="{ path: '/', hash: '#testimonios' }"
                        class="font-semibold text-secondary hover:text-primary"><span class="absolute inset-0"
                            aria-hidden="true"></span> Testimonios de nuestros clientes
                        <span aria-hidden="true">&rarr;</span>
                    </NuxtLink>
                </p>
            </div>
        </div>
    </section>

    <section class="overflow-hidden bg-white py-16 md:py-24">
        <div class="mx-auto container px-6 lg:px-8">
            <div
                class="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div class="lg:pt-4 lg:pr-8">
                    <div class="lg:max-w-2xl">
                        <h2 class="text-base/7 font-semibold text-secondary">¿Por qué ContuHogar?</h2>
                        <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-primary sm:text-5xl">
                            Tu oportunidad está a un paso</p>
                        <p class="mt-6">Desde 2009, conectamos a colombianos en el exterior
                            con oportunidades inmobiliarias y financieras en su país. Te asesoramos paso a paso para
                            que inviertas desde cualquier lugar del mundo.</p>
                        <dl class="mt-10 max-w-xl space-y-8 text-base/7 lg:max-w-none">
                            <div class="relative pl-9">
                                <dt class="inline font-semibold text-primary text-base">
                                    <svg class="absolute top-1 left-1 size-5 text-secondary"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                                        <path
                                            d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                                    </svg>

                                    Asesoría personalizada
                                </dt>
                                <dd class="inline text-base">No todos tienen las mismas metas ni oportunidades. Por
                                    eso,
                                    diseñamos un plan a tu medida: analizamos tu perfil, tus necesidades y te
                                    guiamos paso a paso para que compres, inviertas o financies tu propiedad en
                                    Colombia sin sorpresas ni trámites innecesarios.
                                </dd>
                            </div>
                            <div class="relative pl-9">
                                <dt class="inline font-semibold text-primary text-base">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="absolute top-1 left-1 size-5 text-secondary">
                                        <path fill-rule="evenodd"
                                            d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                            clip-rule="evenodd" />
                                    </svg>

                                    Aliados confiables
                                </dt>
                                <dd class="inline text-base">Trabajamos con bancos, constructoras y expertos legales
                                    en
                                    Colombia para garantizarte opciones seguras, tasas competitivas y transparencia
                                    en cada proceso. Tu patrimonio está respaldado por los mejores.</dd>
                            </div>
                            <div class="relative pl-9">
                                <dt class="inline font-semibold text-primary text-base">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="absolute top-1 left-1 size-5 text-secondary">
                                        <path
                                            d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                    </svg>

                                    Facilidad de trámites desde el exterior
                                </dt>
                                <dd class="inline text-base">Digitalizamos todo el proceso: firmas electrónicas,
                                    videollamadas
                                    y gestión remota. Sin filas, sin viajes y con actualizaciones en tiempo real.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div class="lg:pr-4 flex items-center">
                    <div
                        class="relative overflow-hidden rounded-3xl bg-primary px-6 pt-64 pb-9 shadow-2xl shadow-primary/5 sm:px-12 lg:px-8 lg:pb-8 xl:px-10 xl:pb-10 h-full w-full">
                        <!-- <img class="absolute inset-0 size-full object-cover brightness-125 saturate-0"
                            src="https://img.freepik.com/fotos-premium/retrato-familia-llaves-su-nueva-casa-dia-mudanza_1218270-5812.jpg?w=2000"
                            alt=""> -->
                        <img class="absolute inset-0 size-full object-cover"
                            src="https://img.freepik.com/fotos-premium/retrato-familia-llaves-su-nueva-casa-dia-mudanza_1218270-5812.jpg"
                            alt="">
                        <!-- <div class="absolute inset-0 bg-primary mix-blend-multiply"></div>
                        <div class="absolute top-1/2 left-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                            aria-hidden="true">
                            <div class="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-secondary to-primary opacity-40"
                                style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
                            </div>
                        </div>
                        <figure class="relative isolate">
                            <svg viewBox="0 0 162 128" fill="none" aria-hidden="true"
                                class="absolute -top-4 -left-2 -z-10 h-32 stroke-white/10">
                                <path id="0ef284b8-28c2-426e-9442-8655d393522e"
                                    d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z" />
                                <use href="#0ef284b8-28c2-426e-9442-8655d393522e" x="86" />
                            </svg>
                            <blockquote class="text-xl/8 font-semibold">
                                <p class="text-white">“Amet amet eget scelerisque tellus sit neque faucibus non
                                    eleifend. Integer eu
                                    praesent at a. Ornare arcu gravida natoque erat et cursus tortor.”</p>
                            </blockquote>
                            <figcaption class="mt-6 text-sm/6 text-white"><strong
                                    class="font-semibold text-white">Fernando Muñoz,</strong> CEO at ConTuHogar
                            </figcaption>
                        </figure> -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="servicios" class="bg-gray-50 mx-auto py-16 md:py-24 px-6 lg:px-8">
        <div class="mx-auto max-w-7xl text-center">
            <h2 class="text-base/7 font-semibold text-secondary">Nuestros servicios</h2>
            <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-primary sm:text-5xl">
                Invierte en Colombia desde cualquier lugar del mundo</p>
            <p class="mt-6 text-lg/8">Entendemos que tomar decisiones desde el exterior puede ser
                complejo. Por eso te ofrecemos un portafolio completo de servicios financieros e inmobiliarios
                diseñados para facilitar cada paso del proceso de inversión en finca raíz en Colombia.</p>
        </div>
        <Carousel v-bind="carouselConfig" class="mt-16">
            <Slide v-for="(n, index) in store.services" :key="index" class="pb-8 px-1 md:px-0">
                <div class="max-w-sm rounded-3xl overflow-hidden shadow-lg shadow-primary/5">
                    <img class="w-full h-52 object-center object-cover" :src="n.image" alt="">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2 text-primary">{{ n.title }}</div>
                        <p class="text-base line-clamp-3">{{ n.intro }}</p>
                    </div>
                    <div class="px-6 pt-4 pb-4 flex justify-end">
                        <NuxtLink :to="`/servicios/${n.slug}`"
                            class="text-sm/6 font-semibold text-secondary hover:text-primary">Leer más <span
                                aria-hidden="true">→</span></NuxtLink>
                    </div>
                </div>
            </Slide>
        </Carousel>
    </section>

    <section class="bg-white py-24">
        <div class="mx-auto container px-6 lg:px-8">
            <div class="max-w-5xl mx-auto lg:mx-0">
                <h2 class="text-base/7 font-semibold text-secondary">Actualidad inmobiliaria</h2>
                <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-primary sm:text-5xl">
                    Artículos que impulsan tu inversión</p>
                <p class="mt-6 text-xl/8">Mantente al día con las últimas tendencias del mercado,
                    cambios en créditos hipotecarios y oportunidades exclusivas para colombianos en el exterior.
                    Aquí encontrarás información clave para tomar decisiones inteligentes sobre tu propiedad en
                    Colombia.</p>
            </div>
            <div
                class="mx-auto flex max-w-2xl mt-16 flex-col items-start justify-around gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
                <div class="w-full lg:max-w-xl lg:flex-auto">

                    <img src="https://img.freepik.com/fotos-premium/gente-sentada-acera-texto-fondo_1048944-7461820.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
                        alt=""
                        class="aspect-6/5 w-full rounded-2xl bg-gray-50 object-cover object-right lg:aspect-auto lg:h-[34.5rem]">
                </div>
                <div class="w-full lg:max-w-2xl">
                    <h3 class="sr-only">Artículos</h3>
                    <ul class="-my-8 divide-y divide-gray-100">
                        <li class="py-8">
                            <dl class="relative flex flex-wrap gap-x-3 group">
                                <dt class="sr-only">Título</dt>
                                <dd
                                    class="w-full flex-none text-lg font-semibold tracking-tight text-primary hover:text-secondary">
                                    <NuxtLink to="blog/el-momento-es-ahora">
                                        Aprovecha el poder de las tasas de cambio a tu favor.
                                        <span class="absolute inset-0" aria-hidden="true"></span>
                                    </NuxtLink>
                                </dd>
                                <dt class="sr-only">Descripción</dt>
                                <dd class="mt-2 w-full flex-none text-base/7">En los últimos años, la devaluación del
                                    peso colombiano ha dificultado que muchas familias en el país puedan acceder a una
                                    vivienda propia, ya sea mediante pagos de contado o a través de créditos
                                    hipotecarios.</dd>
                                <!-- <dt class="sr-only">Salary</dt> -->
                                <!-- <dd class="mt-4 text-base/7 font-semibold text-primary">$75,000 USD</dd> -->
                                <dt class="sr-only">Date</dt>
                                <dd class="mt-4 flex items-center gap-x-3 text-base/7 text-gray-500">
                                    <svg viewBox="0 0 2 2" class="size-0.5 flex-none fill-gray-300" aria-hidden="true">
                                        <circle cx="1" cy="1" r="1" />
                                    </svg>
                                    24/07/2025
                                </dd>
                            </dl>
                        </li>
                    </ul>
                    <div class="mt-8 flex border-t border-gray-100 pt-8">
                        <NuxtLink to="/blog" class="text-sm/6 font-semibold text-secondary hover:text-primary">Ver todos
                            los artículos <span aria-hidden="true">&rarr;</span></NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-white">
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
                    <img class="absolute top-0 left-0 w-[46rem] max-w-none object-center object-cover rounded-md bg-white/5 ring-1 ring-white/10"
                        src="https://img.freepik.com/foto-gratis/mira-compramos-casa_637285-12424.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
                        alt="App screenshot">
                </div>
            </div>
        </div>
    </section>

    <section id="testimonios" class="relative isolate bg-white py-16 md:py-24">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-5xl text-center">
                <h2 class="text-base/7 font-semibold text-secondary">Testimonios</h2>
                <p class="mt-2 text-4xl font-semibold tracking-tight text-balance text-primary sm:text-5xl">Estas
                    son algunas de nuestras historias, contadas en sus propias palabras</p>
            </div>
            <div
                class="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-primary sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
                <figure
                    class="rounded-2xl bg-white shadow-lg ring-1 ring-primary/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
                    <blockquote class="p-6 text-lg font-semibold tracking-tight text-primary sm:p-12 sm:text-xl/8">
                        <p>“Hice el proceso con ContuHogar de una compra de vivienda desde el extranjero y la verdad fue
                            súper fácil, nos fue muy bien, pudimos adquirir el inmueble y también me están ayudando para
                            otro. La asesoría, todo el proceso de principio a fin super bien. La verdad súper
                            recomendado.”</p>
                    </blockquote>
                    <figcaption
                        class="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-primary/10 px-6 py-4 sm:flex-nowrap">
                        <img class="size-10 flex-none rounded-full bg-gray-50" src="/testimonials/juancamilolave.jpeg"
                            alt="Ingrid Yurley Fajardo Contreras">
                        <div class="flex-auto">
                            <div class="font-semibold">Juan Camilo Manrique Olave</div>
                            <div class="text-gray-500">@juancamilolave</div>
                        </div>
                        <!-- <img class="h-10 w-auto flex-none"
                            src="/testimonials/ingrid-yurley.jpeg" alt="Ingrid Yurley Fajardo Contreras"> -->
                    </figcaption>
                </figure>
                <div class="space-y-8 xl:contents xl:space-y-0">
                    <div class="space-y-8 xl:row-span-2">
                        <figure class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-primary/5">
                            <blockquote class="text-primary">
                                <p>“Quiero agradecer a CONTUHOGAR por todo el acompañamiento que me brindaron, la
                                    asesoría fue excelente, te resuelven todas las inquietudes permitiéndome hacer el
                                    proceso mucho más fácil y seguro. Los recomiendo al 100, una empresa muy responsable
                                    y confiable.”</p>
                            </blockquote>
                            <figcaption class="mt-6 flex items-center gap-x-4">
                                <img class="size-10 rounded-full bg-gray-50" src="/testimonials/nafyc_moda.jpeg" alt="">
                                <div>
                                    <div class="font-semibold">Ingrid Yurley Fajardo Contreras</div>
                                    <div class="text-gray-500">@nafyc_moda</div>
                                </div>
                            </figcaption>
                        </figure>
                        <figure class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-primary/5">
                            <blockquote class="text-primary">
                                <p>“Vivo en Estados Unidos y mi experiencia con ContuHogar ha sido excelente. Marly me
                                    acompañó en todo el proceso y en solo un mes ya tenía aprobado mi préstamo en
                                    Colombia. Es una herramienta muy útil para quienes vivimos fuera del país. Estoy muy
                                    agradecida, ¡100 de 10!”</p>
                            </blockquote>
                            <figcaption class="mt-6 flex items-center gap-x-4">
                                <img class="size-10 rounded-full bg-gray-50" src="/testimonials/bibiana.jpeg" alt="">
                                <div>
                                    <div class="font-semibold">Bibiana Patricia Velásquez Velásquez</div>
                                    <!-- <div class="text-gray-500">@Gecortes92</div> -->
                                </div>
                            </figcaption>
                        </figure>

                        <!-- More testimonials... -->
                    </div>
                    <div class="space-y-8 xl:row-start-1">
                        <figure class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-primary/5">
                            <blockquote class="text-primary">
                                <p>“Tuve una excelente experiencia con Contuhogar. Me ayudaron a gestionar un crédito
                                    hipotecario desde Suiza para comprar un inmueble en Colombia, y todo el proceso fue
                                    rápido, claro y exitoso. Son muy atentos, profesionales y se nota que tienen el
                                    conocimiento y la experiencia para lograr la aprobación del banco sin
                                    complicaciones. ¡Muy feliz con el resultado y los recomiendo totalmente!”</p>
                            </blockquote>
                            <figcaption class="mt-6 flex items-center gap-x-4">
                                <img class="size-10 rounded-full bg-gray-50" src="/testimonials/Gecortes92.jpeg" alt="">
                                <div>
                                    <div class="font-semibold">German Enrique Cortés Hernández</div>
                                    <div class="text-gray-500">@Gecortes92</div>
                                </div>
                            </figcaption>
                        </figure>

                        <!-- More testimonials... -->
                    </div>
                </div>
                <div class="space-y-8 xl:contents xl:space-y-0">
                    <div class="space-y-8 xl:row-start-1">
                        <figure class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-primary/5">
                            <blockquote class="text-primary">
                                <p>“Muy buenos días, mi nombre es Cindy Sanchez y tuve una excelente experiencia con el
                                    crédito y CONTUHOGAR . El acompañamiento fue muy agradable porque no me dejaron sola
                                    en este proceso y hoy ya puedo disfrutar de mi nuevo apartamento en Medellín. Muchas
                                    gracias por la excelencia que tuvieron con mi caso.⭐️”</p>
                            </blockquote>
                            <figcaption class="mt-6 flex items-center gap-x-4">
                                <img class="size-10 rounded-full bg-gray-50" src="/testimonials/milufitoficial.jpeg"
                                    alt="">
                                <div>
                                    <div class="font-semibold">Cindy Sánchez</div>
                                    <div class="text-gray-500">@milufitoficial</div>
                                </div>
                            </figcaption>
                        </figure>
                        <!-- <figure class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-primary/5">
                            <blockquote class="text-primary">
                                <p>“Voluptas”</p>
                            </blockquote>
                            <figcaption class="mt-6 flex items-center gap-x-4">
                                <img class="size-10 rounded-full bg-gray-50"
                                    src="/testimonials/"
                                    alt="">
                                <div>
                                    <div class="font-semibold">Tom</div>
                                    <div class="text-gray-500">@tomcook</div>
                                </div>
                            </figcaption>
                        </figure> -->

                        <!-- More testimonials... -->
                    </div>
                    <div class="space-y-8 xl:row-span-2">
                        <figure class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-primary/5">
                            <blockquote class="text-primary">
                                <p>“En Contuhogar obtuve todo el apoyo y la guía para poder realizar el estudio de
                                    crédito desde un lugar fuera de Colombia. La paciencia, la constancia y dedicación
                                    que ustedes me brindaron paso a paso me hicieron sentir protegido como una madre con
                                    su hijo. Quiero agradecerles por tanto.
                                    Ustedes hicieron posible que yo tenga un lugar para vivir propio en mi amada
                                    Colombia.
                                    Gracias mil veces por su apoyo incondicional.”</p>
                            </blockquote>
                            <figcaption class="mt-6 flex items-center gap-x-4">
                                <img class="size-10 rounded-full bg-gray-50" src="/testimonials/dmilenep.jpeg" alt="">
                                <div>
                                    <div class="font-semibold">Diana Piedrahíta</div>
                                    <div class="text-gray-500">@leonardkrasner</div>
                                </div>
                            </figcaption>
                        </figure>

                        <figure class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-primary/5">
                            <blockquote class="text-primary">
                                <p>“Mi nombre es Elena M. Quiroga, resido en la ciudad de Fort Myers Fl, Estados Unidos,
                                    les comparto mi experiencia con Contuhogar, la cual fue excelente, el personal muy
                                    amable, la señora Marly y el señor Carlos me apoyaron y estuvieron siempre
                                    pendientes hasta el final del proceso con el préstamo. Realmente excelentes personas
                                    y muy profesionales, los recomiendo.”</p>
                            </blockquote>
                            <figcaption class="mt-6 flex items-center gap-x-4">
                                <img class="size-10 rounded-full bg-gray-50" src="/testimonials/Elena.jpeg" alt="">
                                <div>
                                    <div class="font-semibold">Elena Marcela Quiroga Imparato</div>
                                    <!-- <div class="text-gray-500">@leonardkrasner</div> -->
                                </div>
                            </figcaption>
                        </figure>

                        <!-- More testimonials... -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
