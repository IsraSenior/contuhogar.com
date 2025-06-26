<script setup>
const team = ref([
    {
        name: "Alejandra Pérez",
        email: "gerencia@contuhogar.net",
        title: "Gerente",
        image: "https://static.wixstatic.com/media/b4f6b9_1ce72466a9da41378f2270f92a80a759~mv2.jpg/v1/fill/w_854,h_850,al_c,q_85,enc_auto/b4f6b9_1ce72466a9da41378f2270f92a80a759~mv2.jpg"
    },
    {
        name: "Fernando Muñóz Tatar",
        email: "directorcomercial@contuhogar.net",
        title: "Director Operativo",
        image: "https://static.wixstatic.com/media/b4f6b9_d0c18f1dca334911a27916d9df2f63f4~mv2.png/v1/fill/w_845,h_795,al_c,q_90,enc_auto/b4f6b9_d0c18f1dca334911a27916d9df2f63f4~mv2.png"
    },
    {
        name: "Marly Sierra",
        email: "creditodevivienda05@contuhogar.net",
        title: "Ejecutiva de Crédito",
        image: "https://static.wixstatic.com/media/b4f6b9_86bd5973ddec4b2993355256b7c4c3ab~mv2.jpg/v1/fill/w_679,h_589,al_c,q_85,enc_auto/b4f6b9_86bd5973ddec4b2993355256b7c4c3ab~mv2.jpg"
    },
    {
        name: "Yeison Chavez",
        email: "ejecutivocomercial@contuhogar.net",
        title: "Ejecutiva de Crédito",
        image: ""
    },
    {
        name: "Carlos Garzón",
        email: "analistadecredito@contuhogar.net",
        title: "Analista de Crédito",
        image: ""
    },
    // {
    //     name: "Derly Plazas",
    // email: "",
    //     title: "Analista de Crédito",
    //     image: "https://static.wixstatic.com/media/b4f6b9_d546c693fe71466f8b183ccdd86bcdbf~mv2.jpg/v1/fill/w_854,h_804,al_c,q_85,enc_auto/b4f6b9_d546c693fe71466f8b183ccdd86bcdbf~mv2.jpg"
    // },
    {
        name: "Catalina Romero",
        email: "gestionhumana@contuhogar.net",
        title: "Directora de Gestión Humana",
        image: "https://static.wixstatic.com/media/b4f6b9_0858857fecb44815ba2d64c0a44aea07~mv2.jpg/v1/fill/w_514,h_536,al_c,lg_1,q_80,enc_auto/b4f6b9_0858857fecb44815ba2d64c0a44aea07~mv2.jpg"
    },
    {
        name: "Kelly Johanna Rojas",
        email: "asistentedegerencia@contuhogar.net",
        title: "Asistente de Gerencia",
        image: "https://static.wixstatic.com/media/11062b_9db578b244284d28a4833e20b4d0c6ff~mv2_d_7000_4667_s_4_2.jpg/v1/fill/w_2090,h_1393,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/11062b_9db578b244284d28a4833e20b4d0c6ff~mv2_d_7000_4667_s_4_2.jpg"
    },
    {
        name: "Diego Roojas",
        email: "contabilidad@contuhogar.net",
        title: "Contatador",
        image: "https://static.wixstatic.com/media/b4f6b9_ccda897c03c64584baeaf92e7720c4aa~mv2.jpg/v1/fill/w_545,h_485,al_c,lg_1,q_80,enc_auto/b4f6b9_ccda897c03c64584baeaf92e7720c4aa~mv2.jpg"
    },
])
</script>

<template>
    <div class="relative bg-white">
        <div class="mx-auto container lg:grid lg:grid-cols-12 lg:gap-x-20 lg:px-8">
            <div class="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-40 lg:pb-48 xl:col-span-6">
                <div class="mx-auto max-w-2xl lg:mx-0">
                    <h1
                        class="md:mt-24 text-5xl font-semibold tracking-tight text-pretty text-primary sm:mt-10 sm:text-6xl">
                        Conectamos a colombianos en el exterior con oportunidades reales en su país
                    </h1>
                    <p class="mt-8">
                        Llevamos más de 15 años acompañando a familias y personas que viven fuera de Colombia a invertir
                        con seguridad y confianza en el mercado inmobiliario y financiero del país.</p>
                    <div class="mt-10 flex items-center gap-x-6">
                        <a href="#" class="btn primary">Conoce más</a>
                        <a href="#" class="text-sm/6 font-semibold text-secondary hover:text-primary">Nuestro equipo
                            <span aria-hidden="true">→</span></a>
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
                    src="https://www.bbva.com.co/content/dam/library/logos/logo-bbva.svg" alt="Transistor" width="158"
                    height="48">
                <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    src="https://www.bancounion.com/wps/wcm/connect/bancounion/af747ad5-c387-42b8-9504-1138245e5f31/BU-logo-desktop-2023.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_JG94HO40NGHTC068N5QRH11000-af747ad5-c387-42b8-9504-1138245e5f31-ooEdamZ"
                    alt="Reform" width="158" height="48">
                <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="/logo-bolivar_scroll.svg"
                    alt="Tuple" width="158" height="48">
                <img class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                    src="https://amarilo.com.co/images/logo.svg" alt="SavvyCal" width="158" height="48">
                <img class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                    src="https://gruposancarlos.com/assets/images/logo-gsc-v1.svg" alt="Statamic" width="158"
                    height="48">
            </div>
            <div class="mt-16 flex justify-center">
                <p
                    class="relative rounded-3xl bg-gray-50 px-4 py-1.5 text-sm text-gray-500 ring-1 ring-primary/5 ring-inset">
                    <span class="hidden md:inline">Trabajamos con los bancos y constructoras más reconocidas de
                        Colombia para brindarte soluciones confiables y seguras.</span>
                    <a href="#" class="font-semibold text-secondary hover:text-primary"><span class="absolute inset-0"
                            aria-hidden="true"></span> Testimonios de nuestros clientes
                        <span aria-hidden="true">&rarr;</span></a>
                </p>
            </div>
        </div>
    </div>

    <div class="bg-muted py-24 sm:py-32">
        <div class="mx-auto container lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <h2 class="text-4xl font-semibold tracking-tight text-pretty text-primary sm:text-5xl">Nuestra historia
                </h2>
                <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                    <div class="lg:w-full lg:max-w-4xl lg:flex-auto">
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
                    <div class="lg:flex lg:flex-auto lg:justify-center">
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
                                <dt class="text-base/7 text-gray-500">Colombianos invitirtiendo en su país</dt>
                                <dd class="text-5xl font-semibold tracking-tight text-primary">2,000</dd>
                            </div>
                        </dl>
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

                    <div class="block p-6 rounded-lg shadow-sm  bg-secondary">

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

    <div class="bg-gray-900 py-24 sm:py-32">
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
                <li v-for="(staff, index) in team" :key="index">
                    <img class="aspect-14/13 w-full rounded-2xl object-cover bg-muted" :src="staff?.image"
                        :alt="staff?.name">
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
                        <a href="#"
                            class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-xs shadow-primary/5 hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Contáctanos</a>
                        <a href="#" class="text-sm/6 font-semibold text-white hover:text-primary">Conocer más <span
                                aria-hidden="true">→</span></a>
                    </div>
                </div>
                <div class="relative mt-16 h-full lg:mt-8">
                    <img class="absolute top-0 left-0 w-[46rem] max-w-none object-center object-cover rounded-md bg-white/5 ring-1 ring-white/10"
                        src="https://img.freepik.com/foto-gratis/mira-compramos-casa_637285-12424.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
                        alt="App screenshot">
                </div>
            </div>
        </div>
    </div>
</template>