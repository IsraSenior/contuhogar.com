<script setup lang="ts">
/**
 * Skeleton para el Hero de la Homepage
 * Replica exacta de la estructura del hero con fondo primary (oscuro)
 * Usa skeleton-shimmer-light para contraste apropiado
 */
</script>

<template>
  <section class="bg-primary">
    <div class="mx-auto container px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-24">
        <!-- Contenido izquierdo -->
        <div>
          <!-- Badge de confianza -->
          <div class="h-8 w-48 skeleton-shimmer-light rounded-lg mb-8" />

          <!-- Titulo h1 (3 lineas, escala responsive) -->
          <div class="space-y-3">
            <div class="h-10 sm:h-12 xl:h-14 skeleton-shimmer-light rounded-lg w-full" />
            <div class="h-10 sm:h-12 xl:h-14 skeleton-shimmer-light rounded-lg w-11/12" />
            <div class="h-10 sm:h-12 xl:h-14 skeleton-shimmer-light rounded-lg w-3/4" />
          </div>

          <!-- Parrafo descripcion (2 lineas) -->
          <div class="mt-6 space-y-2">
            <div class="h-5 skeleton-shimmer-light rounded w-full" />
            <div class="h-5 skeleton-shimmer-light rounded w-4/5" />
          </div>

          <!-- CTAs (2 botones) -->
          <div class="mt-10 flex flex-col sm:flex-row gap-4">
            <div class="h-12 w-48 skeleton-shimmer-light rounded-xl" />
            <div class="h-12 w-64 skeleton-shimmer-light rounded-xl" />
          </div>

          <!-- Beneficios rapidos (3 checkmarks) -->
          <div class="mt-10 flex flex-wrap gap-6">
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 skeleton-shimmer-light rounded-full" />
              <div class="h-4 w-24 skeleton-shimmer-light rounded" />
            </div>
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 skeleton-shimmer-light rounded-full" />
              <div class="h-4 w-28 skeleton-shimmer-light rounded" />
            </div>
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 skeleton-shimmer-light rounded-full" />
              <div class="h-4 w-24 skeleton-shimmer-light rounded" />
            </div>
          </div>
        </div>

        <!-- Imagen hero (solo visible en lg:) -->
        <div class="relative hidden lg:block">
          <div class="aspect-4/3 rounded-2xl overflow-hidden">
            <div class="w-full h-full skeleton-shimmer-light" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
