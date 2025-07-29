// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  // app: {
  //   pageTransition: { name: "page", mode: "out-in" },
  // },

  modules: ["vue3-carousel-nuxt", "nuxt-umami", "@pinia/nuxt"],

  umami: {
    enabled: true,
    id: "3ecdb795-e836-4157-891c-cfc1d759864a",
    host: "https://umami.contuhogar.com",
    autoTrack: true,
    // proxy: 'cloak',
    useDirective: true,
    ignoreLocalhost: false,
    // excludeQueryParams: false,
    // domains: ["contuhogar.com"],
    // customEndpoint: '/my-custom-endpoint',
    // logErrors: true,
  },
});