<script setup>
const store = useMainStore()
const route = useRoute()

// Estado del menú
const megaMenuOpen = ref(false)
const mobileMenuOpen = ref(false)

// Funciones para determinar estado activo
const isActive = (path) => route.path === path
const isServiceActive = computed(() => route.path.startsWith('/servicios'))
const isBlogActive = computed(() => route.path.startsWith('/blog'))

// Clases para estados activo/inactivo
const getLinkClasses = (path) => {
  const base = 'text-sm font-semibold transition-colors duration-200 relative'
  const active = 'text-primary after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full'
  const inactive = 'text-gray-700 hover:text-primary'
  return `${base} ${isActive(path) ? active : inactive}`
}

const getDropdownTriggerClasses = computed(() => {
  const base = 'group flex items-center gap-1 text-sm font-semibold transition-colors duration-200 relative'
  const active = 'text-primary after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full'
  const inactive = 'text-gray-700 hover:text-primary'
  return `${base} ${isServiceActive.value ? active : inactive}`
})

// Cerrar mega menu
const closeMegaMenuInstant = () => {
  megaMenuOpen.value = false
}

// Cerrar menús cuando cambia la ruta
watch(() => route.path, () => {
  mobileMenuOpen.value = false
  megaMenuOpen.value = false
})

// Cerrar mega menu con Escape
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      megaMenuOpen.value = false
      mobileMenuOpen.value = false
    }
  }
  document.addEventListener('keydown', handleEscape)
  onUnmounted(() => document.removeEventListener('keydown', handleEscape))
})

// Iconos para cada servicio
const serviceIcons = {
  'credito-hipotecario': `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />`,
  'leasing-habitacional': `<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />`,
  'credito-de-remodelacion': `<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />`,
  'compra-de-cartera': `<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />`,
  'conturenta': `<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />`
}
</script>

<template>
  <header class="bg-white/95 backdrop-blur-md fixed inset-x-0 top-0 z-50 border-b border-gray-100">
    <nav class="mx-auto flex container items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
      <!-- Logo -->
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5 transition-transform hover:scale-105">
          <span class="sr-only">ConTuHogar</span>
          <Logo class="h-10 xl:h-11 w-auto" />
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden xl:flex items-center gap-x-8">
        <NuxtLink
          to="/nosotros"
          :class="getLinkClasses('/nosotros')"
        >
          Nosotros
        </NuxtLink>

        <!-- Mega Menu Trigger -->
        <div
          class="relative"
        >
          <button
            type="button"
            :class="getDropdownTriggerClasses"
            @click="megaMenuOpen = !megaMenuOpen"
            :aria-expanded="megaMenuOpen"
            aria-controls="mega-menu-panel"
            aria-haspopup="true"
          >
            Servicios
            <svg
              class="w-4 h-4 transition-transform duration-300"
              :class="{ 'rotate-180': megaMenuOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Mega Menu Panel -->
          <Transition
            enter-active-class="transition duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            enter-from-class="opacity-0 translate-y-2 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-2 scale-95"
          >
            <div
              v-if="megaMenuOpen"
              id="mega-menu-panel"
              role="menu"
              class="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-screen max-w-4xl"
            >
              <div class="bg-white rounded-2xl shadow-2xl ring-1 ring-gray-900/5 overflow-hidden">
                <!-- Header del mega menu -->
                <div class="bg-gray-50 px-8 py-5 border-b border-gray-100">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-lg font-bold text-gray-900">Nuestros servicios</h3>
                      <p class="text-sm text-gray-500 mt-0.5">Soluciones financieras para tu vivienda en Colombia</p>
                    </div>
                    <NuxtLink
                      to="/servicios"
                      @click="closeMegaMenuInstant"
                      class="text-sm font-semibold text-primary hover:text-secondary transition-colors flex items-center gap-1"
                    >
                      Ver todos
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </NuxtLink>
                  </div>
                </div>

                <!-- Grid de servicios -->
                <div class="p-6">
                  <div class="grid grid-cols-2 gap-4">
                    <NuxtLink
                      v-for="service in store.services"
                      :key="service.slug"
                      :to="`/servicios${service.href}`"
                      @click="closeMegaMenuInstant"
                      :class="[
                        'group flex gap-4 p-4 rounded-xl transition-all duration-200',
                        route.path === `/servicios${service.href}` ? 'bg-primary/5 ring-1 ring-primary/20' : 'hover:bg-gray-50'
                      ]"
                    >
                      <!-- Icono/Imagen -->
                      <div class="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-200">
                        <svg
                          class="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          viewBox="0 0 24 24"
                          v-html="serviceIcons[service.slug] || serviceIcons['credito-hipotecario']"
                        />
                      </div>

                      <!-- Contenido -->
                      <div class="flex-1 min-w-0">
                        <h4 class="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          {{ service.title }}
                        </h4>
                        <p class="text-xs text-gray-500 mt-1 line-clamp-2">
                          {{ service.description }}
                        </p>
                      </div>

                      <!-- Flecha -->
                      <div class="shrink-0 self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </NuxtLink>
                  </div>
                </div>

                <!-- Footer del mega menu con CTA -->
                <div class="bg-gray-50 px-8 py-4 flex items-center justify-between">
                  <div class="flex items-center gap-3 text-sm text-gray-600">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>¿No sabes cuál es el mejor para ti?</span>
                  </div>
                  <NuxtLink
                    to="/contacto"
                    @click="closeMegaMenuInstant"
                    class="btn primary"
                  >
                    Hablar con un ejecutivo de crédito
                  </NuxtLink>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <NuxtLink
          to="/faqs"
          :class="getLinkClasses('/faqs')"
        >
          Preguntas frecuentes
        </NuxtLink>

        <NuxtLink
          to="/blog"
          :class="[
            'text-sm font-semibold transition-colors duration-200 relative',
            isBlogActive
              ? 'text-primary after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full'
              : 'text-gray-700 hover:text-primary'
          ]"
        >
          Blog
        </NuxtLink>
      </div>

      <!-- Desktop CTAs -->
      <div class="hidden xl:flex flex-1 items-center justify-end gap-x-3">
        <NuxtLink
          to="/contacto"
          :class="[
            'text-sm font-semibold transition-colors px-4 py-2 relative',
            isActive('/contacto')
              ? 'text-primary after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:rounded-full'
              : 'text-gray-700 hover:text-primary'
          ]"
        >
          Contáctanos
        </NuxtLink>

        <NuxtLink
          to="/simulador/credito"
          class="btn primary"
        >
          Simular crédito
        </NuxtLink>
      </div>

      <!-- Mobile menu button -->
      <div class="flex xl:hidden">
        <button
          type="button"
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="p-2 -m-2 text-gray-700 hover:text-primary transition-colors"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu-panel"
        >
          <span class="sr-only">{{ mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú' }}</span>
          <!-- Icono de menú hamburguesa -->
          <svg v-if="!mobileMenuOpen" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <!-- Icono de X para cerrar -->
          <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Backdrop para mega menu -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="megaMenuOpen"
          class="fixed inset-0 z-40 bg-black/20"
          @click="closeMegaMenuInstant"
          role="presentation"
          aria-hidden="true"
        />
      </Transition>
    </Teleport>

    <!-- Mobile Menu -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="mobileMenuOpen"
          class="fixed inset-0 z-50 xl:hidden"
        >
          <!-- Backdrop -->
          <div
            class="fixed inset-0 bg-black/50 backdrop-blur-sm"
            @click="mobileMenuOpen = false"
          />

          <!-- Panel -->
          <Transition
            appear
            enter-active-class="transition duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <div
              v-if="mobileMenuOpen"
              id="mobile-menu-panel"
              class="fixed inset-y-0 right-0 w-full bg-white shadow-2xl flex flex-col"
            >
              <!-- Header -->
              <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <Logo class="h-8 w-auto" />
                <button
                  type="button"
                  @click="mobileMenuOpen = false"
                  class="p-2 -m-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <span class="sr-only">Cerrar menú</span>
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Navigation -->
              <div class="flex-1 overflow-y-auto py-6 px-6">
                <!-- Main Links -->
                <div class="space-y-1">
                  <NuxtLink
                    to="/nosotros"
                    @click="mobileMenuOpen = false"
                    :class="[
                      'block px-4 py-3 rounded-lg text-base font-semibold transition-colors',
                      isActive('/nosotros')
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    Nosotros
                  </NuxtLink>

                  <NuxtLink
                    to="/faqs"
                    @click="mobileMenuOpen = false"
                    :class="[
                      'block px-4 py-3 rounded-lg text-base font-semibold transition-colors',
                      isActive('/faqs')
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    Preguntas frecuentes
                  </NuxtLink>

                  <NuxtLink
                    to="/blog"
                    @click="mobileMenuOpen = false"
                    :class="[
                      'block px-4 py-3 rounded-lg text-base font-semibold transition-colors',
                      isBlogActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    Blog
                  </NuxtLink>

                  <NuxtLink
                    to="/contacto"
                    @click="mobileMenuOpen = false"
                    :class="[
                      'block px-4 py-3 rounded-lg text-base font-semibold transition-colors',
                      isActive('/contacto')
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    Contacto
                  </NuxtLink>
                </div>

                <!-- Services Section -->
                <div class="mt-8">
                  <div class="flex items-center justify-between px-4 mb-3">
                    <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Servicios</h3>
                    <NuxtLink
                      to="/servicios"
                      @click="mobileMenuOpen = false"
                      class="text-xs font-semibold text-primary hover:text-secondary"
                    >
                      Ver todos →
                    </NuxtLink>
                  </div>

                  <div class="space-y-1">
                    <NuxtLink
                      v-for="service in store.services"
                      :key="service.slug"
                      :to="`/servicios${service.href}`"
                      @click="mobileMenuOpen = false"
                      :class="[
                        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                        isActive(`/servicios${service.href}`)
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 hover:bg-gray-50'
                      ]"
                    >
                      <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <svg
                          class="w-4 h-4 text-primary"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          viewBox="0 0 24 24"
                          v-html="serviceIcons[service.slug] || serviceIcons['credito-hipotecario']"
                        />
                      </div>
                      <span class="text-sm font-medium">{{ service.title }}</span>
                    </NuxtLink>
                  </div>
                </div>
              </div>

              <!-- Footer CTA -->
              <div class="px-6 py-4 border-t border-gray-100 bg-gray-50 space-y-3">
                <NuxtLink
                  to="/simulador/credito"
                  @click="mobileMenuOpen = false"
                  class="flex w-full items-center justify-center gap-2 btn primary"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                  Simular mi crédito
                </NuxtLink>
                <NuxtLink
                  to="/contacto"
                  @click="mobileMenuOpen = false"
                  class="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors"
                >
                  Hablar con un ejecutivo de crédito
                </NuxtLink>
                <p class="text-xs text-center text-gray-500">
                  Respuesta en menos de 24 horas
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
