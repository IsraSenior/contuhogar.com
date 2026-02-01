<script setup lang="ts">
/**
 * Skeleton para pagina de servicio individual
 * Replica estructura de pages/servicios/[slug].vue
 * Incluye: hero, imagen, contenido principal, acordeon, sidebar
 */
</script>

<template>
  <div>
    <!-- Hero Section Skeleton -->
    <SkeletonHeroSection show-badge variant="primary" />

    <!-- Contenido principal -->
    <div class="bg-muted">
      <div class="mx-auto container px-6 lg:px-8 py-16">
        <div class="lg:grid lg:grid-cols-12 lg:gap-12">

          <!-- Columna izquierda: Contenido del servicio -->
          <article class="lg:col-span-8">
            <!-- Imagen destacada -->
            <div class="relative aspect-video mb-8 overflow-hidden rounded-2xl shadow-lg">
              <div class="absolute inset-0 skeleton-shimmer" />
            </div>

            <!-- Contenido principal -->
            <div class="bg-white rounded-2xl p-8 lg:p-12 shadow-sm mb-8">
              <!-- Titulo de seccion -->
              <div class="h-7 w-64 skeleton-shimmer rounded mb-4" />

              <!-- Parrafo descriptivo -->
              <div class="space-y-2 mb-8">
                <div class="h-4 w-full skeleton-shimmer rounded" />
                <div class="h-4 w-full skeleton-shimmer rounded" />
                <div class="h-4 w-11/12 skeleton-shimmer rounded" />
                <div class="h-4 w-3/4 skeleton-shimmer rounded" />
              </div>

              <!-- Boton de accion -->
              <div class="h-12 w-48 skeleton-shimmer rounded-lg" />
            </div>

            <!-- Acordeon de informacion detallada -->
            <SkeletonAccordion :count="5" />
          </article>

          <!-- Columna derecha: Sidebar -->
          <aside class="lg:col-span-4 mt-12 lg:mt-0">
            <div class="lg:sticky lg:top-24 space-y-6">

              <!-- CTA Simulador (primary) -->
              <div class="bg-primary rounded-2xl p-6">
                <div class="h-6 w-6 skeleton-shimmer-light rounded mb-4" />
                <div class="h-5 w-2/3 skeleton-shimmer-light rounded mb-2" />
                <div class="space-y-1.5 mb-4">
                  <div class="h-3 w-full skeleton-shimmer-light rounded" />
                  <div class="h-3 w-4/5 skeleton-shimmer-light rounded" />
                </div>
                <div class="h-10 w-full skeleton-shimmer-light rounded-lg" />
              </div>

              <!-- CTA Contacto (secondary) -->
              <div class="bg-white rounded-2xl p-6 shadow-sm">
                <div class="h-6 w-6 skeleton-shimmer rounded mb-4" />
                <div class="h-5 w-3/4 skeleton-shimmer rounded mb-2" />
                <div class="space-y-1.5 mb-4">
                  <div class="h-3 w-full skeleton-shimmer rounded" />
                  <div class="h-3 w-5/6 skeleton-shimmer rounded" />
                </div>
                <div class="h-10 w-full skeleton-shimmer rounded-lg" />
                <!-- Badge -->
                <div class="mt-3 flex items-center gap-2">
                  <div class="h-4 w-4 skeleton-shimmer rounded" />
                  <div class="h-3 w-40 skeleton-shimmer rounded" />
                </div>
              </div>

              <!-- Recursos utiles -->
              <div class="bg-white rounded-2xl p-6 shadow-sm">
                <div class="h-5 w-32 skeleton-shimmer rounded mb-4" />
                <div class="space-y-3">
                  <div v-for="i in 3" :key="i" class="flex items-center gap-2">
                    <div class="h-4 w-4 skeleton-shimmer rounded" />
                    <div class="h-4 skeleton-shimmer rounded" :style="{ width: `${45 + (i % 3) * 20}%` }" />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>

    <!-- Bank Logos Section Skeleton -->
    <SkeletonBankLogos />

    <!-- CTA Section Skeleton -->
    <div class="bg-primary py-16 lg:py-24">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <div class="h-8 lg:h-10 w-3/4 mx-auto skeleton-shimmer-light rounded mb-4" />
        <div class="space-y-2 max-w-2xl mx-auto mb-8">
          <div class="h-4 w-full skeleton-shimmer-light rounded mx-auto" />
          <div class="h-4 w-2/3 skeleton-shimmer-light rounded mx-auto" />
        </div>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <div class="h-12 w-48 skeleton-shimmer-light rounded-lg" />
          <div class="h-12 w-56 skeleton-shimmer-light rounded-lg" />
        </div>
        <div class="flex flex-wrap justify-center gap-4">
          <div v-for="i in 3" :key="i" class="h-5 w-28 skeleton-shimmer-light rounded" />
        </div>
      </div>
    </div>
  </div>
</template>
