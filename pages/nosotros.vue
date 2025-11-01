<script setup>
const store = useMainStore();
const title = `ConTuHogar | Nosotros`;
const description = "ContuHogar es una empresa con amplia experiencia y trayectoria en la prestación de servicios de asesoría en el sector financiero e inmobiliario, dirigido a todos los mercados, principalmente a residentes en el exterior."

useSeoMeta({
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    // ogImage: '[og:image]',
    ogUrl: "https://contuhogar.com",
    twitterTitle: title,
    twitterDescription: description,
    // twitterImage: '[twitter:image]',
    twitterCard: 'summary'
})
</script>

<template>
    <div class="bg-muted py-16 md:py-24">
        <div class="mx-auto container lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <h2 class="text-4xl font-semibold tracking-tight text-pretty text-primary sm:text-5xl">Nuestra historia
                </h2>
                <div class="mt-6 flex flex-col gap-x-8 gap-20 lg:flex-row">
                    <div class="lg:w-full lg:max-w-4xl lg:flex-auto text-justify">
                        <p class="font-bold text-secondary">ContuHogar es una empresa con amplia experiencia y
                            trayectoria en la prestación de
                            servicios de asesoría en el sector financiero e inmobiliario, dirigido a todos los
                            mercados, principalmente a residentes en el exterior.</p>
                        <div class="mt-6 space-y-6 max-w-3xl">
                            <p>Desde su creación en el 2009, ContuHogar ha sido una empresa que se esfuerza por
                                ofrecer una alternativa única en incentivar a los clientes a creer en nuestro país e
                                invertir en finca raíz, asegurando desde ya un sitio donde vivir en Colombia, bien sea
                                en el corto o largo plazo, para apoyar a sus familias e incluso como inversión.</p>
                            <p>Trabajamos de la mano con varias entidades financieras como BBVA Colombia,
                                Banco de Occidente y Banco Unión, al igual que con varias constructoras e
                                inmobiliarias en toda Colombia.</p>
                        </div>
                    </div>
                    <!-- <div class="lg:flex lg:flex-auto lg:justify-center">
                        <dl class="w-64 space-y-8 xl:w-80">
                            <div class="flex flex-col-reverse gap-y-4">
                                <dt class="text-base/7 text-gray-500">Transacciones cada año</dt>
                                <dd class="text-5xl font-semibold tracking-tight text-primary">1,000</dd>
                            </div>
                            <div class="flex flex-col-reverse gap-y-4">
                                <dt class="text-base/7 text-gray-500">En créditos aprobados</dt>
                                <dd class="text-5xl font-semibold tracking-tight text-primary">$119 MM</dd>
                            </div>
                            <div class="flex flex-col-reverse gap-y-4">
                                <dt class="text-base/7 text-gray-500">Colombianos invitirtiendo en tu país</dt>
                                <dd class="text-5xl font-semibold tracking-tight text-primary">2,000</dd>
                            </div>
                        </dl>
                    </div> -->
                    <div class="relative w-full">
                        <NuxtImg class="w-full max-w-none rounded-xl bg-primary shadow-xl shadow-primary/5 aspect-square object-top object-cover max-h-[400px]"
                            src="https://img.freepik.com/foto-gratis/retrato-nina-linda-que-pone-dinero-alcancia-rosa-ahorrar-juguete-nuevo-ella-su-hermano-pequeno_662251-568.jpg"
                            alt="Niña ahorrando dinero en alcancía"
                            format="webp"
                            quality="80"
                            sizes="sm:100vw md:50vw lg:400px"
                            loading="lazy" />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">

                    <div class="block p-6 rounded-lg shadow-sm  bg-gray-900">

                        <h5 class="mb-6 text-2xl font-bold tracking-tight text-white">Propósito</h5>
                        <p class="font-normal text-white">Ayudar a las personas a cumplir su sueño
                            de tener vivienda propia en Colombia,
                            aunque vivan en el exterior. Brindar otros servicios relacionados con este tipo de
                            inversión para presentarles una oferta integral..</p>
                    </div>

                    <div class="block p-6 rounded-lg shadow-sm  bg-white">

                        <h5 class="mb-6 text-2xl font-bold tracking-tight text-primary">Misión</h5>
                        <p class="font-normal text-primary">Asesorar y ayudar a las personas a
                            obtener financiación para finca raíz en Colombia
                            desde el exterior de forma oportuna, ágil y eficiente, así como en otros servicios
                            propios a esta inversión.</p>
                    </div>

                    <div class="block p-6 rounded-lg shadow-sm  bg-gray-900">

                        <h5 class="mb-6 text-2xl font-bold tracking-tight text-white">Visión</h5>
                        <p class="font-normal text-white">Posicionarnos como una de las empresas
                            más influyentes y preferidas como bróker
                            inmobiliario, asegurando el manejo correcto de las inversiones de vivienda de
                            nuestros clientes y todo lo referente a los servicios que lo complementen.</p>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="bg-gray-900 py-16 md:py-24">
        <div class="mx-auto container lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0">
                <h2 class="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                    Respaldados por los mejores
                </h2>
                <p class="mt-6 text-white">
                    Somos un grupo dinámico de personas apasionadas por lo que hacemos y dedicadas a ofrecer los mejores
                    resultados a nuestros clientes.
                </p>
            </div>
            <ul role="list"
                class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
                <li v-for="(staff, index) in store.team" :key="index">
                    <NuxtImg class="aspect-14/13 w-full rounded-2xl object-cover object-top bg-muted" :src="staff?.image"
                        :alt="staff?.name"
                        format="webp"
                        quality="75"
                        sizes="sm:100vw md:50vw lg:300px"
                        loading="lazy" />
                    <h3 class="mt-6 text-lg/8 font-semibold tracking-tight text-white">{{ staff?.name }}</h3>
                    <p class="text-base/7 text-gray-500">{{ staff?.title }}</p>
                    <!-- <p class="text-sm/6 text-gray-500">Toronto, Canada</p> -->
                </li>
            </ul>
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