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

  modules: ["vue3-carousel-nuxt", "@pinia/nuxt", "nuxt-gtag"],

  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    // Your primary Google tag ID
    id: 'G-1182NP1Z0D',
    // Additional configuration for this tag ID
    config: {
    },
  }
});