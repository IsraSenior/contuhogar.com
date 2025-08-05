<script setup>
const services = [
    {
        icon: "🏦",
        href: "/credito-hipotecario",
        title: "Crédito Hipotecario",
        description: "Te ayudamos a gestionar tu crédito hipotecario con las principales entidades financieras del país.",
        image: "https://img.freepik.com/foto-gratis/agente-inmobiliario-trabajo-que-muestra-casa-hace-negocios_23-2150164731.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
    },
    {
        icon: "🏘️",
        href: "/leasing-habitacional",
        title: "Leasing Habitacional",
        description: "Ideal para quienes no tienen historial crediticio en Colombia o desean una vía distinta a la hipoteca tradicional.",
        image: "https://img.freepik.com/foto-gratis/arriba-pareja-contrato-hipoteca_23-2147797656.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
    },
    {
        icon: "🛠️",
        href: "/credito-de-remodelacion",
        title: "Crédito de Remodelación",
        description: "Si ya tienes vivienda en Colombia pero necesita mejoras, te asesoramos en la gestión de créditos para remodelación.",
        image: "https://img.freepik.com/fotos-premium/imagen-recortada-arquitecto-sosteniendo-casco-trabajo-mesa-oficina_1048944-25215908.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
    },
    {
        icon: "💳",
        href: "/compra-de-cartera",
        title: "Compra de Cartera",
        description: "Te ayudamos a trasladarlo a otra entidad financiera que te ofrezca mejores tasas, plazos o condiciones de pago. ",
        image: "https://img.freepik.com/foto-gratis/gente-negocios-dandose-mano-terminando-reunion_1150-37745.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
    },
    {
        icon: "🏡",
        href: "/conturenta",
        title: "ConTuRenta",
        description: "Contamos con presencia en Bogotá y otras ciudades clave, ofreciéndote un catálogo actualizado de inmuebles nuevos y usados.",
        image: "https://img.freepik.com/foto-gratis/gente-grabando-su-visita-casa_23-2151139108.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
    },
]
</script>


<template>
    <footer class="bg-gray-900">
        <div class="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
            <div class="xl:grid xl:grid-cols-3 xl:gap-8">
                <div class="grid grid-cols-2 gap-8 xl:col-span-2">
                    <div class="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 class="text-base font-semibold text-white">Servicios</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li v-for="(s, index) in services" :key="index">
                                    <NuxtLink :to="`/servicios${s.href}`" class="text-sm/6 text-white hover:text-secondary">{{ s.title
                                        }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="text-base mt-10 md:mt-0 font-semibold text-white">ConTuHogar</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <NuxtLink to="/nosotros" class="text-sm/6 text-white hover:text-secondary">Nosotros
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink :to="{ path: '/', hash: '#testimonios' }"
                                        class="text-sm/6 text-white hover:text-secondary">Testimonios</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/blog" class="text-sm/6 text-white hover:text-secondary">Blog
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 class="text-basefont-semibold text-white">Soporte</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <NuxtLink to="/contacto" class="text-sm/6 text-white hover:text-secondary">Contacto
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/faqs" class="text-sm/6 text-white hover:text-secondary">Preguntas
                                        frecuentes</NuxtLink>
                                </li>
                            </ul>
                        </div>
                        <div class="mt-10 md:mt-0">
                            <h3 class="text-base font-semibold text-white">Legal</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <NuxtLink to="terminos-condiciones"
                                        class="text-sm/6 text-white hover:text-secondary">Términos y
                                        condiciones</NuxtLink>
                                </li>
                                <!-- <li>
                                    <a href="#" class="text-sm/6 text-white hover:text-secondary">Políticas de
                                        privacidad</a>
                                </li> -->
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="mt-10 xl:mt-0">
                    <h3 class="text-sm font-semibold text-white">Suscríbete a nuestro boletín</h3>
                    <p class="mt-2 text-sm text-white">Las últimas noticias, artículos y recursos, enviados a tu
                        bandeja de entrada mensualmente.</p>
                    <form class="mt-6 sm:flex sm:max-w-md">
                        <label for="email-address" class="sr-only">Correo electrónico</label>
                        <input type="email" name="email-address" id="email-address" autocomplete="email" required
                            class="w-full min-w-0 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-white focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:w-64 sm:text-sm/6 xl:w-full"
                            placeholder="Ingresa tu correo electrónico">
                        <div class="mt-4 sm:mt-0 sm:ml-4 sm:shrink-0">
                            <button type="submit" class="btn secondary">Suscríbete</button>
                        </div>
                    </form>
                </div>
            </div>
            <div
                class="mt-16 border-t border-white/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
                <div class="flex gap-x-6 md:order-2">
                    <a href="https://www.facebook.com/contuhogar" target="_blank"
                        class="text-white hover:text-secondary">
                        <span class="sr-only">Facebook</span>
                        <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/contuhogar" target="_blank"
                        class="text-white hover:text-secondary">
                        <span class="sr-only">Instagram</span>
                        <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a href="https://x.com/contuhogar" target="_blank" class="text-white hover:text-secondary">
                        <span class="sr-only">X</span>
                        <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                        </svg>
                    </a>
                    <!-- <a href="#" target="_blank" class="text-white hover:text-secondary">
                        <span class="sr-only">YouTube</span>
                        <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                                clip-rule="evenodd" />
                        </svg>
                    </a> -->
                </div>
                <p class="mt-8 text-sm/6 text-white md:order-1 md:mt-0">&copy; 2025 ConTuHogar, Todos los derechos
                    reservados.</p>
            </div>
        </div>
    </footer>
</template>