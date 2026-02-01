// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    "@fontsource/roboto/latin-400.css",
    "@fontsource/roboto/latin-500.css",
    "@fontsource/roboto/latin-700.css",
    "~/assets/css/main.css"
  ],

  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://contuhogar.com" },
        { rel: "dns-prefetch", href: "https://contuhogar.com" },
        // Preload hero image for better LCP
        {
          rel: "preload",
          href: "/2148392254.jpg",
          as: "image",
          type: "image/jpeg",
          fetchpriority: "high",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  runtimeConfig: {
    // Variables privadas del servidor (NO expuestas al cliente)
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    DIRECTUS_URL: process.env.DIRECTUS_URL,
    DIRECTUS_ADMIN_TOKEN: process.env.DIRECTUS_ADMIN_TOKEN,
    RESEND_API_KEY: process.env.RESEND_API_KEY,

    // Variables públicas (expuestas al cliente)
    public: {
      DIRECTUS_URL: process.env.DIRECTUS_URL,
      // ⚠️ IMPORTANTE: Usar un token de SOLO LECTURA para el cliente
      DIRECTUS_PUBLIC_TOKEN: process.env.DIRECTUS_PUBLIC_TOKEN,
    },
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-pdf': ['jspdf', 'html-to-image'],
            'vendor-calendar': ['v-calendar'],
          },
        },
      },
    },
  },

  modules: [
    "vue3-carousel-nuxt",
    "@pinia/nuxt",
    "nuxt-gtag",
    "@saslavik/nuxt-gtm",
    "@nuxt/image",
  ],

  // Configuración de componentes - sin prefijo de subdirectorio
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // Configuración de @nuxt/image
  image: {
    // Formatos de salida optimizados
    format: ['webp', 'avif'],
    // Calidad por defecto
    quality: 80,
    // Tamaños responsivos
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  gtag: {
    enabled: process.env.NODE_ENV === "production",
    // Your primary Google tag ID
    id: "G-1182NP1Z0D",
    // Defer initialization to reduce TBT
    initMode: "manual",
    // Additional configuration for this tag ID
    config: {},
  },

  gtm: {
    id: "GTM-WMQV4M3F",
    enabled: process.env.NODE_ENV === "production",
    enableRouterSync: true, // auto pageviews en SPA
    debug: false, // útil en dev
    defer: true, // Defer script loading to reduce TBT
  },
});
