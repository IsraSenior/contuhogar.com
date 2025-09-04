// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://contuhogar.com" },
        { rel: "dns-prefetch", href: "https://contuhogar.com" },
      ],
      meta: [
        {
          name: "facebook-domain-verification",
          content: "laxxnwfhgho03ihik0ayykj7ds2xk6",
        },
      ],
    },
  },

  runtimeConfig: {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    DIRECTUS_URL: process.env.DIRECTUS_URL,
    DIRECTUS_ADMIN_TOKEN: process.env.DIRECTUS_ADMIN_TOKEN,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    public: {
      DIRECTUS_URL: process.env.DIRECTUS_URL,
      DIRECTUS_PUBLIC_TOKEN: process.env.DIRECTUS_ADMIN_TOKEN,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // app: {
  //   pageTransition: { name: "page", mode: "out-in" },
  // },

  modules: [
    "vue3-carousel-nuxt",
    "@pinia/nuxt",
    "nuxt-gtag",
    "@zadigetvoltaire/nuxt-gtm",
  ],

  gtag: {
    enabled: process.env.NODE_ENV === "production",
    // Your primary Google tag ID
    id: "G-1182NP1Z0D",
    // Additional configuration for this tag ID
    config: {},
  },

  gtm: {
    id: "GTM-WMQV4M3F",
    enabled: process.env.NODE_ENV === "production",
    enableRouterSync: true, // auto pageviews en SPA
    debug: false, // útil en dev
  },
});
