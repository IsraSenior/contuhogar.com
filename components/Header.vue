<script setup>
const store = useMainStore();
const servicesDropdown = ref(false);
const openMenu = ref(false);
</script>

<template>
    <header class="bg-white fixed inset-x-0 top-0 z-20">
        <nav class="mx-auto flex container items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <NuxtLink to="/" class="-m-1.5 p-1.5">
                    <span class="sr-only">ConTuHogar</span>
                    <Logo class="h-10 xl:h-12 w-auto" />
                </NuxtLink>
            </div>
            <div class="hidden xl:flex gap-x-6 xl:gap-x-12">
                <NuxtLink to="/nosotros" @click.native="servicesDropdown = false"
                    class="text-base font-semibold text-gray-600 hover:text-secondary">Sobre nosotros</NuxtLink>

                <div class="relative">
                    <button @click.prevent="servicesDropdown = !servicesDropdown" type="button"
                        class="flex items-center gap-x-1 text-base font-semibold text-gray-600 hover:text-secondary"
                        aria-expanded="false">
                        Nuestros servicios
                        <svg class="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                            aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>

                    <Transition enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition ease-in duration-150"
                        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                        <div v-if="servicesDropdown"
                            class="absolute top-full -left-1/2 z-10 mt-5 w-screen max-w-3xl overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-600/5">
                            <div class="p-4 overflow-y-scroll max-h-[75vh]">
                                <div v-for="(s, index) in store.services" :key="index"
                                    class="group relative flex gap-x-6 rounded-lg p-4 text-base hover:bg-gray-50">
                                    <div
                                        class="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <span class=" text-gray-600 group-hover:text-indigo-600 text-center text-xl">
                                            {{ s.icon }}
                                        </span>
                                    </div>
                                    <div class="flex-auto">
                                        <NuxtLink :to="`/servicios${s.href}`" @click.native="servicesDropdown = false"
                                            class="block font-semibold text-gray-600 text-base">
                                            {{ s.title }}
                                            <span class="absolute inset-0"></span>
                                        </NuxtLink>
                                        <p class="mt-1 text-gray-600 text-base">{{ s.description }}</p>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="grid grid-cols-2 divide-x divide-gray-600/5 bg-gray-50">
                                <a href="#"
                                    class="flex items-center justify-center gap-x-2.5 p-3 text-sm lg:text-base font-semibold text-gray-600 hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="size-5 flex-none text-gray-400">
                                        <path fill-rule="evenodd"
                                            d="M6.32 1.827a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V4.757c0-1.47 1.073-2.756 2.57-2.93ZM7.5 11.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H8.25Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75H8.25Zm1.748-6a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.007Zm-.75 3a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.007Zm1.754-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.008Zm1.748-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-8.25-6A.75.75 0 0 1 8.25 6h7.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75v-.75Zm9 9a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-2.25Z"
                                            clip-rule="evenodd" />
                                    </svg>

                                    Calculadora
                                </a>
                                <a href="#"
                                    class="flex items-center justify-center gap-x-2.5 p-3 text-sm lg:text-base font-semibold text-gray-600 hover:bg-gray-100">
                                    <svg class="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true" data-slot="icon">
                                        <path fill-rule="evenodd"
                                            d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    Contáctanos
                                </a>
                            </div> -->
                        </div>
                    </Transition>
                </div>

                <NuxtLink to="/faqs" @click.native="servicesDropdown = false"
                    class="text-base font-semibold text-gray-600 hover:text-secondary">Preguntas frecuentes</NuxtLink>
                <NuxtLink to="/blog" @click.native="servicesDropdown = false"
                    class="text-base font-semibold text-gray-600 hover:text-secondary">Blog</NuxtLink>
                <!-- <NuxtLink to="/noticias" class="text-base font-semibold text-gray-600 hover:text-secondary">Noticias</NuxtLink> -->
            </div>

            <div class="flex flex-1 items-center justify-end gap-x-6">
                <NuxtLink to="/contacto" @click.native="servicesDropdown = false" class="hidden md:flex btn secondary"
                    v-umami="{ name: 'contact-button-header-desktop' }">Contáctanos</NuxtLink>

                <button type="button" @click.prevent="openMenu = true"
                    class="-m-2.5 inline-flex xl:hidden items-center justify-center rounded-md p-2.5 text-gray-700">
                    <span class="sr-only">Open main menu</span>
                    <svg class="size-10" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

        </nav>

        <!-- Mobile menu, show/hide based on menu open state. -->
        <div v-if="openMenu" class="xl:hidden" role="dialog" aria-modal="true">
            <!-- Background backdrop, show/hide based on slide-over state. -->
            <div class="fixed inset-0 z-10 bg-primary/50"></div>
            <div
                class="fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-600/10">
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <!-- <a href="#" class="-m-1.5 p-1.5">
                            <span class="sr-only">Your Company</span>
                            <img class="h-8 w-auto"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                alt="">
                        </a> -->
                        <span></span>
                        <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700"
                            @click.prevent="openMenu = false">
                            <span class="sr-only">Close menu</span>
                            <svg class="size-10" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="mt-6 flow-root">
                        <div class="-my-6 divide-y divide-gray-500/10">

                            <div class="space-y-2 py-6 text-center">
                                <NuxtLink to="/nosotros" @click.native="openMenu = false"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-600 hover:bg-gray-50">
                                    Sobre nosotros</NuxtLink>

                                <NuxtLink to="/faqs" @click.native="openMenu = false"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-600 hover:bg-gray-50">
                                    Preguntas frecuentes</NuxtLink>

                                <NuxtLink :to="`/servicios${s.href}`" v-for="(s, index) in store.services" :key="index" @click.native="openMenu = false"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-600 hover:bg-gray-50">
                                    {{ s.title }}
                                </NuxtLink>

                                <NuxtLink to="/blog" @click.native="openMenu = false"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-600 hover:bg-gray-50">
                                    Blog</NuxtLink>
                            </div>
                            <div class="py-6">

                                <NuxtLink to="/contacto" @click.native="openMenu = false"
                                    class="flex btn secondary items-center justify-center text-center">Contáctanos
                                </NuxtLink>
                                <!-- <a href="#"
                                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-600 hover:bg-gray-50">Log
                                    in</a> -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="sticky bottom-0 grid grid-cols-2 divide-x divide-gray-600/5 bg-gray-50 text-center">
                    <a href="#" class="p-3 text-base/7 font-semibold text-gray-600 hover:bg-gray-100">Watch demo</a>
                    <a href="#" class="p-3 text-base/7 font-semibold text-gray-600 hover:bg-gray-100">Contact sales</a>
                </div> -->
            </div>
        </div>
    </header>
</template>