<script setup>
const carouselConfig = {
    itemsToShow: 4,
    gap: 5,
    autoplay: 2000,
    snapAlign: "start",
    wrapAround: false,
    pauseAutoplayOnHover: true,
}

const testimonialsCarouselConfig = {
    itemsToShow: 2,
    gap: 5,
    autoplay: 2000,
    snapAlign: "center",
    wrapAround: false,
    pauseAutoplayOnHover: true,
}

const services = ref([
    {
        title: "🏦 Crédito Hipotecario",
        description: "Te ayudamos a gestionar tu crédito hipotecario con las principales entidades financieras del país, como BBVA Colombia y Giros y Finanzas. Puedes financiar hasta el 70% del valor del inmueble, con condiciones diseñadas para colombianos que viven en el exterior. Nosotros te guiamos en todo el proceso, desde la solicitud hasta el desembolso.",
        image: "https://img.freepik.com/foto-gratis/agente-inmobiliario-trabajo-que-muestra-casa-hace-negocios_23-2150164731.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
    },
    {
        title: "🏘️ Leasing Habitacional",
        description: "Ideal para quienes no tienen historial crediticio en Colombia o desean una vía distinta a la hipoteca tradicional. Con el leasing habitacional puedes financiar hasta el 85% del valor de la vivienda y optar por la compra del inmueble al finalizar el contrato. Es una opción muy usada por residentes en el exterior que desean facilidad y flexibilidad.",
        image: "https://img.freepik.com/foto-gratis/arriba-pareja-contrato-hipoteca_23-2147797656.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
    },
    {
        title: "🛠️ Crédito para Remodelación",
        description: "Si ya tienes vivienda en Colombia pero necesita mejoras, te asesoramos en la gestión de créditos para remodelación. Puedes financiar hasta el 50% del valor del inmueble para adecuaciones, ampliaciones o mejoras estructurales, todo con aliados que entienden tu condición de residente en el exterior.",
        image: "https://img.freepik.com/fotos-premium/imagen-recortada-arquitecto-sosteniendo-casco-trabajo-mesa-oficina_1048944-25215908.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
    },
    {
        title: "💳 Compra de Cartera",
        description: "¿Ya tienes un crédito hipotecario vigente? Te ayudamos a trasladarlo a otra entidad financiera que te ofrezca mejores tasas, plazos o condiciones de pago. Esta opción puede generar ahorros significativos en el largo plazo y la puedes gestionar desde el exterior, con nuestro acompañamiento completo.",
        image: "https://img.freepik.com/foto-gratis/gente-negocios-dandose-mano-terminando-reunion_1150-37745.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
    },
    {
        title: "🏡 Compra y Venta de Inmuebles",
        description: "Contamos con presencia en Bogotá y otras ciudades clave, ofreciéndote un catálogo actualizado de inmuebles nuevos y usados. Si estás vendiendo, publicamos y promovemos tu propiedad. Si estás comprando, buscamos las mejores opciones según tus necesidades. Todo con asesoría profesional y personalizada.",
        image: "https://img.freepik.com/foto-gratis/gente-grabando-su-visita-casa_23-2151139108.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
    },
])
</script>

<template>
    <div>
        <div class="relative bg-white mt-[84px]">
            <div class="mx-auto container lg:grid lg:grid-cols-12 lg:gap-x-20 lg:px-8">
                <div class="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-40 lg:pb-48 xl:col-span-6">
                    <div class="mx-auto max-w-2xl lg:mx-0">
                        <div class="hidden lg:block max-w-md">
                            <div
                                class="relative flex items-center justify-between rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                Mantente al día con las últimas noticias<a href="#"
                                    class="font-semibold whitespace-nowrap text-indigo-600"><span
                                        class="absolute inset-0" aria-hidden="true"></span> Infórmate ahora <span
                                        aria-hidden="true">&rarr;</span></a>
                            </div>
                        </div>
                        <h1
                            class="mt-24 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:mt-10 sm:text-6xl">
                            Tu vivienda en Colombia empieza aquí, <br><span class="text-indigo-600"> estés donde
                                estés.</span></h1>
                        <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Más de 15 años
                            de experiencia guiando a colombianos en el exterior hacia inversiones inmobiliarias seguras
                            y créditos adaptados a sus necesidades. Tu patrimonio en Colombia, en las mejores manos.</p>
                        <div class="mt-10 flex items-center gap-x-6">
                            <a href="#"
                                class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Contáctanos</a>
                            <a href="#" class="text-sm/6 font-semibold text-gray-900">Conoce nuestros servicios <span
                                    aria-hidden="true">→</span></a>
                        </div>
                    </div>
                </div>
                <div
                    class="relative lg:col-span-5 sm:rounded-bl-3xl overflow-hidden lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
                    <img class="aspect-3/2 w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                        src="https://img.freepik.com/foto-gratis/adorables-padres-hijo-casa_23-2148392254.jpg?t=st=1746707746~exp=1746711346~hmac=c9d3039226a05d96e5d6a6e2c447beec5e55da8c40e072766106ec3da06d2b99&w=2000"
                        alt="">
                </div>
            </div>
        </div>

        <div class="bg-white py-24 sm:py-32">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div
                    class="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="https://www.bbva.com.co/content/dam/library/logos/logo-bbva.svg"
                        alt="Transistor" width="158" height="48">
                    <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="https://www.bancounion.com/wps/wcm/connect/bancounion/af747ad5-c387-42b8-9504-1138245e5f31/BU-logo-desktop-2023.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_JG94HO40NGHTC068N5QRH11000-af747ad5-c387-42b8-9504-1138245e5f31-ooEdamZ" alt="Reform"
                        width="158" height="48">
                    <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="/logo-bolivar_scroll.svg" alt="Tuple"
                        width="158" height="48">
                    <img class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                        src="https://amarilo.com.co/images/logo.svg"
                        alt="SavvyCal" width="158" height="48">
                    <img class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                        src="https://gruposancarlos.com/assets/images/logo-gsc-v1.svg"
                        alt="Statamic" width="158" height="48">
                </div>
                <div class="mt-16 flex justify-center">
                    <p
                        class="relative rounded-3xl bg-gray-50 px-4 py-1.5 text-sm/6 text-gray-600 ring-1 ring-gray-900/5 ring-inset">
                        <span class="hidden md:inline">Trabajamos con los bancos y constructoras más reconocidas de
                            Colombia para brindarte soluciones confiables y seguras.</span>
                        <a href="#" class="font-semibold text-indigo-600"><span class="absolute inset-0"
                                aria-hidden="true"></span> Testimonios de nuestros clientes <span
                                aria-hidden="true">&rarr;</span></a>
                    </p>
                </div>
            </div>
        </div>

        <div class="overflow-hidden bg-white py-24 sm:py-32">
            <div class="mx-auto container px-6 lg:px-8">
                <div
                    class="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div class="lg:pt-4 lg:pr-8">
                        <div class="lg:max-w-2xl">
                            <h2 class="text-base/7 font-semibold text-indigo-600">¿Por qué ContuHogar?</h2>
                            <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                Tu oportunidad está a un paso</p>
                            <p class="mt-6 text-lg/8 text-gray-600">Desde 2009, conectamos a colombianos en el exterior
                                con oportunidades inmobiliarias y financieras en su país. Te asesoramos paso a paso para
                                que inviertas desde cualquier lugar del mundo.</p>
                            <dl class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                                <div class="relative pl-9">
                                    <dt class="inline font-semibold text-gray-900">
                                        <svg class="absolute top-1 left-1 size-5 text-indigo-600"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path
                                                d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                                            <path
                                                d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                                        </svg>

                                        Asesoría personalizada
                                    </dt>
                                    <dd class="inline">No todos tienen las mismas metas ni oportunidades. Por eso,
                                        diseñamos un plan a tu medida: analizamos tu perfil, tus necesidades y te
                                        guiamos paso a paso para que compres, inviertas o financies tu propiedad en
                                        Colombia sin sorpresas ni trámites innecesarios.
                                    </dd>
                                </div>
                                <div class="relative pl-9">
                                    <dt class="inline font-semibold text-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="absolute top-1 left-1 size-5 text-indigo-600">
                                            <path fill-rule="evenodd"
                                                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                                clip-rule="evenodd" />
                                        </svg>

                                        Aliados confiables
                                    </dt>
                                    <dd class="inline">Trabajamos con bancos, constructoras y expertos legales en
                                        Colombia para garantizarte opciones seguras, tasas competitivas y transparencia
                                        en cada proceso. Tu patrimonio está respaldado por los mejores.</dd>
                                </div>
                                <div class="relative pl-9">
                                    <dt class="inline font-semibold text-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="absolute top-1 left-1 size-5 text-indigo-600">
                                            <path
                                                d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                        </svg>

                                        Facilidad de trámites desde el exterior
                                    </dt>
                                    <dd class="inline">Digitalizamos todo el proceso: firmas electrónicas, videollamadas
                                        y gestión remota. Sin filas, sin viajes y con actualizaciones en tiempo real.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div class="lg:pr-4 flex items-center">
                        <div
                            class="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pt-64 pb-9 shadow-2xl sm:px-12 lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                            <img class="absolute inset-0 size-full object-cover brightness-125 saturate-0"
                                src="https://img.freepik.com/fotos-premium/retrato-familia-llaves-su-nueva-casa-dia-mudanza_1218270-5812.jpg?w=2000"
                                alt="">
                            <div class="absolute inset-0 bg-gray-900 mix-blend-multiply"></div>
                            <div class="absolute top-1/2 left-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                                aria-hidden="true">
                                <div class="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-40"
                                    style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
                                </div>
                            </div>
                            <figure class="relative isolate">
                                <svg viewBox="0 0 162 128" fill="none" aria-hidden="true"
                                    class="absolute -top-4 -left-2 -z-10 h-32 stroke-white/20">
                                    <path id="0ef284b8-28c2-426e-9442-8655d393522e"
                                        d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z" />
                                    <use href="#0ef284b8-28c2-426e-9442-8655d393522e" x="86" />
                                </svg>
                                <blockquote class="text-xl/8 font-semibold text-white">
                                    <p>“Amet amet eget scelerisque tellus sit neque faucibus non eleifend. Integer eu
                                        praesent at a. Ornare arcu gravida natoque erat et cursus tortor.”</p>
                                </blockquote>
                                <figcaption class="mt-6 text-sm/6 text-gray-300"><strong
                                        class="font-semibold text-white">Fernando Muñoz,</strong> CEO at ConTuHogar
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mx-auto py-24 sm:py-32 px-6 lg:px-8">
            <div class="mx-auto max-w-7xl text-center">
                <h2 class="text-base/7 font-semibold text-indigo-600">Nuestros servicios</h2>
                <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                    Invierte en Colombia desde cualquier lugar del mundo</p>
                <p class="mt-6 text-lg/8 text-gray-600">Entendemos que tomar decisiones desde el exterior puede ser
                    complejo. Por eso te ofrecemos un portafolio completo de servicios financieros e inmobiliarios
                    diseñados para facilitar cada paso del proceso de inversión en finca raíz en Colombia.</p>
            </div>
            <Carousel v-bind="carouselConfig" class="mt-16">
                <Slide v-for="(n, index) in services" :key="index" class="pb-8">
                    <div class="max-w-sm sm:rounded-3xl overflow-hidden shadow-lg">
                        <img class="w-full h-52 object-center object-cover" :src="n.image" alt="Sunset in the mountains">
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">{{ n.title }}</div>
                            <p class="text-gray-700 text-base line-clamp-6">{{ n.description }}</p>
                        </div>
                        <div class="px-6 pt-4 pb-4 flex justify-end">
                            <a href="#" class="text-sm/6 font-semibold text-gray-900">Leer más <span
                                    aria-hidden="true">→</span></a>
                        </div>
                    </div>
                </Slide>
            </Carousel>
        </div>

        <div class="bg-white py-32">
            <div class="mx-auto container px-6 lg:px-8">
                <div class="max-w-5xl mx-auto lg:mx-0">
                    <h2 class="text-base/7 font-semibold text-indigo-600">Actualidad inmobiliaria</h2>
                        <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                            Noticias que impulsan tu inversión</p>
                        <p class="mt-6 text-xl/8 text-gray-600">Mantente al día con las últimas tendencias del mercado, cambios en créditos hipotecarios y oportunidades exclusivas para colombianos en el exterior. Aquí encontrarás información clave para tomar decisiones inteligentes sobre tu propiedad en Colombia.</p>
                </div>
                <div
                    class="mx-auto flex max-w-2xl mt-16 flex-col items-start justify-around gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
                    <div class="w-full lg:max-w-xl lg:flex-auto">
                        
                        <img src="https://img.freepik.com/fotos-premium/gente-sentada-acera-texto-fondo_1048944-7461820.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
                            alt=""
                            class="aspect-6/5 w-full rounded-2xl bg-gray-50 object-cover object-right lg:aspect-auto lg:h-[34.5rem]">
                    </div>
                    <div class="w-full lg:max-w-2xl">
                        <h3 class="sr-only">News</h3>
                        <ul class="-my-8 divide-y divide-gray-100">
                            <li class="py-8">
                                <dl class="relative flex flex-wrap gap-x-3">
                                    <dt class="sr-only">Title</dt>
                                    <dd class="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                                        <a href="#">
                                            ¡Nuevas tasas de interés! Bancos lanzan beneficios especiales para colombianos en el exterior
                                            <span class="absolute inset-0" aria-hidden="true"></span>
                                        </a>
                                    </dd>
                                    <dt class="sr-only">Description</dt>
                                    <dd class="mt-2 w-full flex-none text-base/7 text-gray-600">A partir de julio 2025, entran en vigor condiciones preferenciales para financiar vivienda en Colombia. Te explicamos cómo acceder a estas tasas reducidas y qué requisitos debes cumplir desde tu país de residencia.</dd>
                                    <!-- <dt class="sr-only">Salary</dt> -->
                                    <!-- <dd class="mt-4 text-base/7 font-semibold text-gray-900">$75,000 USD</dd> -->
                                    <dt class="sr-only">Date</dt>
                                    <dd class="mt-4 flex items-center gap-x-3 text-base/7 text-gray-500">
                                        <svg viewBox="0 0 2 2" class="size-0.5 flex-none fill-gray-300"
                                            aria-hidden="true">
                                            <circle cx="1" cy="1" r="1" />
                                        </svg>
                                        25/04/2025
                                    </dd>
                                </dl>
                            </li>
                            <li class="py-8">
                                <dl class="relative flex flex-wrap gap-x-3">
                                    <dt class="sr-only">Title</dt>
                                    <dd class="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                                        <a href="#">
                                            Inversión en Bogotá vs. Medellín: ¿Dónde conviene comprar propiedad en 2025?
                                            <span class="absolute inset-0" aria-hidden="true"></span>
                                        </a>
                                    </dd>
                                    <dt class="sr-only">Description</dt>
                                    <dd class="mt-2 w-full flex-none text-base/7 text-gray-600">Analizamos proyecciones de rentabilidad, plusvalía y demanda en las dos ciudades más atractivas para colombianos en el exterior. Descubre datos clave antes de tomar tu decisión.</dd>
                                    <!-- <dt class="sr-only">Salary</dt> -->
                                    <!-- <dd class="mt-4 text-base/7 font-semibold text-gray-900">$75,000 USD</dd> -->
                                    <dt class="sr-only">Date</dt>
                                    <dd class="mt-4 flex items-center gap-x-3 text-base/7 text-gray-500">
                                        <svg viewBox="0 0 2 2" class="size-0.5 flex-none fill-gray-300"
                                            aria-hidden="true">
                                            <circle cx="1" cy="1" r="1" />
                                        </svg>
                                        30/04/2025
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                        <div class="mt-8 flex border-t border-gray-100 pt-8">
                            <a href="#" class="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500">Ver todas las noticias <span aria-hidden="true">&rarr;</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white">
            <div class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                <div
                    class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <svg viewBox="0 0 1024 1024"
                        class="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                        aria-hidden="true">
                        <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                            fill-opacity="0.7" />
                        <defs>
                            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                <stop stop-color="#7775D6" />
                                <stop offset="1" stop-color="#E935C1" />
                            </radialGradient>
                        </defs>
                    </svg>
                    <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 class="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">¿Listo para invertir en tu futuro en Colombia?</h2>
                        <p class="mt-6 text-lg/8 text-pretty text-gray-300"> Nuestro equipo está listo para escucharte, orientarte y ayudarte a tomar la mejor decisión.</p>
                        <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <a href="#"
                                class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Contáctanos</a>
                            <a href="#" class="text-sm/6 font-semibold text-white">Conocer más <span
                                    aria-hidden="true">→</span></a>
                        </div>
                    </div>
                    <div class="relative mt-16 h-80 lg:mt-8">
                        <img class="absolute top-0 left-0 w-[46rem] max-w-none object-center object-cover rounded-md bg-white/5 ring-1 ring-white/10"
                            src="https://img.freepik.com/foto-gratis/mira-compramos-casa_637285-12424.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
                            alt="App screenshot">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
