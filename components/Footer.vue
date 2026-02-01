<script setup>
const store = useMainStore()
const route = useRoute()
const currentYear = new Date().getFullYear()

// Active link detection
const isActive = (path) => route.path === path
const isServiceActive = (href) => route.path === `/servicios${href}`

// Contact info
const contactInfo = {
  phone: '+57 310 819 2877',
  email: 'info@contuhogar.com',
  address: 'Bogotá, Colombia'
}

// Social links
const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/contuhogar',
    icon: `<path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />`
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/contuhogar_oficial',
    icon: `<path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />`
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/contuhogar',
    icon: `<path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />`
  }
]
</script>

<template>
  <footer id="site-footer" class="bg-gray-900">
    <!-- Main Footer Content -->
    <div class="mx-auto container px-6 pt-16 pb-12 lg:px-8 lg:pt-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        <!-- Links Columns (IZQUIERDA) -->
        <div class="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8 order-2 lg:order-1">
          <!-- Servicios -->
          <div>
            <h3 class="text-sm font-semibold text-white uppercase tracking-wider">
              Servicios
            </h3>
            <ul class="mt-4 space-y-3">
              <li v-for="service in store.services" :key="service.slug">
                <NuxtLink
                  :to="`/servicios${service.href}`"
                  :class="[
                    'text-sm transition-colors',
                    isServiceActive(service.href) ? 'text-white font-medium' : 'text-gray-400 hover:text-white'
                  ]"
                >
                  {{ service.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Empresa -->
          <div>
            <h3 class="text-sm font-semibold text-white uppercase tracking-wider">
              Empresa
            </h3>
            <ul class="mt-4 space-y-3">
              <li>
                <NuxtLink to="/nosotros" :class="['text-sm transition-colors', isActive('/nosotros') ? 'text-white font-medium' : 'text-gray-400 hover:text-white']">
                  Sobre nosotros
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/servicios" :class="['text-sm transition-colors', isActive('/servicios') ? 'text-white font-medium' : 'text-gray-400 hover:text-white']">
                  Todos los servicios
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/blog" :class="['text-sm transition-colors', route.path.startsWith('/blog') ? 'text-white font-medium' : 'text-gray-400 hover:text-white']">
                  Blog
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Legal y Soporte -->
          <div>
            <h3 class="text-sm font-semibold text-white uppercase tracking-wider">
              Soporte
            </h3>
            <ul class="mt-4 space-y-3">
              <li>
                <NuxtLink to="/contacto" :class="['text-sm transition-colors', isActive('/contacto') ? 'text-white font-medium' : 'text-gray-400 hover:text-white']">
                  Contacto
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/faqs" :class="['text-sm transition-colors', isActive('/faqs') ? 'text-white font-medium' : 'text-gray-400 hover:text-white']">
                  Preguntas frecuentes
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contact Column (CENTRO) -->
        <div class="lg:col-span-3 order-3 lg:order-2">
          <!-- Contact Info -->
          <div>
            <h3 class="text-sm font-semibold text-white uppercase tracking-wider">
              Contáctanos
            </h3>
            <ul class="mt-4 space-y-3">
              <li>
                <a
                  :href="`tel:${contactInfo.phone.replace(/\s/g, '')}`"
                  class="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                  <span class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  {{ contactInfo.phone }}
                </a>
              </li>
              <li>
                <a
                  :href="`mailto:${contactInfo.email}`"
                  class="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                  <span class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  {{ contactInfo.email }}
                </a>
              </li>
              <li>
                <div class="flex items-center gap-3 text-sm text-gray-400">
                  <span class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  {{ contactInfo.address }}
                </div>
              </li>
            </ul>

            <!-- Social Links -->
            <div class="mt-6 flex gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-200"
              >
                <span class="sr-only">{{ social.name }}</span>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" v-html="social.icon" />
              </a>
            </div>
          </div>
        </div>

        <!-- Company Info Column (DERECHA) -->
        <div class="lg:col-span-4 order-1 lg:order-3">
          <!-- Logo -->
          <NuxtLink to="/" class="inline-block" aria-label="ConTuHogar - Ir al inicio">
            <Logo class="h-10 w-auto brightness-0 invert" aria-hidden="true" />
          </NuxtLink>

          <!-- Tagline -->
          <p class="mt-4 text-gray-400 text-sm leading-relaxed max-w-md">
            Tu aliado estratégico para hacer realidad el sueño de tener vivienda propia en Colombia desde cualquier parte del mundo.
          </p>

          <!-- Newsletter -->
          <div class="mt-10">
            <h3 class="text-sm font-semibold text-white mb-3">
              Suscribete al boletin
            </h3>

            <NewsletterForm
              variant="inline"
              :show-title="false"
              button-text="Suscribirme"
              :dark="true"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/10">
      <div class="mx-auto container px-6 py-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
          <!-- Links -->
          <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <NuxtLink to="/simulador/credito" class="hover:text-gray-300 transition-colors">
              Simulador de crédito
            </NuxtLink>
            <span class="hidden sm:inline text-gray-700">·</span>
            <NuxtLink to="/terminos-condiciones" class="hover:text-gray-300 transition-colors">
              Términos
            </NuxtLink>
            <span class="hidden sm:inline text-gray-700">·</span>
            <NuxtLink to="/politica-privacidad" class="hover:text-gray-300 transition-colors">
              Privacidad
            </NuxtLink>
            <span class="hidden sm:inline text-gray-700">·</span>
            <a
              href="https://wa.me/573108192877"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          <!-- Copyright & Credits -->
          <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-gray-500 text-center">
            <span>&copy; {{ currentYear }} ConTuHogar. Todos los derechos reservados.</span>
            <span class="hidden sm:inline text-gray-700">·</span>
            <span class="flex gap-1">
              Desarrollado por
              <a
                href="https://neskeep.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-gray-300 transition-colors"
              >
                Neskeep
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
