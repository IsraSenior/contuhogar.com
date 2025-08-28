<script setup>
const store = useMainStore();
const current = ref(0);

const title = `ConTuHogar | FAQ`;
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
    <div class="bg-muted">
        <div class="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
            <div class="lg:grid lg:grid-cols-12 lg:gap-20">
                <div class="lg:col-span-5 relative">
                    <div class="lg:sticky lg:top-[164px]">
                        <h2 class="text-3xl font-semibold tracking-tight text-pretty text-primary sm:text-4xl">
                            Preguntas más frecuentes
                        </h2>
                        <p class="mt-4 text-base/7 text-pretty text-gray-500">¿No encuentras la respuesta que buscas?
                            Ponte en contacto con <a href="#"
                                class="font-semibold text-secondary hover:text-primary">nuestro equipo de soporte</a>.
                        </p>
                        <img class="aspect-square w-full bg-gray-50 object-cover mt-10 rounded-3xl"
                            src="https://img.freepik.com/foto-gratis/colegas-trabajando-juntos-oficina_23-2148738270.jpg"
                            alt="">
                    </div>
                </div>
                <div class="mt-10 lg:col-span-7 lg:mt-0">
                    <dl class="space-y-6">
                        <div v-for="(item, index) in store.questions" :key="index">
                            <dt :class="[
                                'text-base font-bold cursor-pointer px-2 py-1.5 rounded-lg flex justify-between items-start',
                                current === index ? 'bg-primary text-white' : 'bg-muted border border-primary text-primary hover:bg-primary hover:text-white'
                            ]" @click="current = index">
                                <span class="flex-1">{{ item?.question }}</span>
                                <span class="pl-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>

                                </span>
                            </dt>
                            <dd v-if="current === index" class="mt-2 text-lg text-gray-500 px-5" v-html="item?.answer">
                            </dd>
                        </div>
                    </dl>
                </div>
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
                    <img class="absolute top-0 left-0 w-[46rem] max-w-none object-center object-cover rounded-md bg-white/5 ring-1 ring-white/10"
                        src="https://img.freepik.com/foto-gratis/mira-compramos-casa_637285-12424.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
                        alt="">
                </div>
            </div>
        </div>
    </div>

</template>