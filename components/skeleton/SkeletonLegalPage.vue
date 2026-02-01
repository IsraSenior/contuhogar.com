<script setup lang="ts">
/**
 * Skeleton para paginas legales modernas (Terminos y Condiciones, Politica de Privacidad)
 * Replica el nuevo layout tipo Stripe/Notion con:
 * - Hero compacto en bg-white
 * - Layout 2 columnas (sidebar sticky + acordeones)
 * - Mobile: indice dropdown
 */
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero compacto skeleton -->
    <div class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-12 lg:py-16">
        <div class="max-w-3xl">
          <!-- Badge "Legal" -->
          <div class="h-4 w-12 skeleton-shimmer rounded mb-3" />

          <!-- Titulo principal -->
          <div class="h-10 sm:h-12 w-72 sm:w-96 skeleton-shimmer rounded" />

          <!-- Descripcion -->
          <div class="mt-4 space-y-2">
            <div class="h-5 w-full skeleton-shimmer rounded" />
            <div class="h-5 w-4/5 skeleton-shimmer rounded" />
          </div>

          <!-- Fecha de actualizacion -->
          <div class="h-4 w-48 skeleton-shimmer rounded mt-4" />
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="container mx-auto px-4 py-8 lg:py-12">
      <!-- Indice mobile (dropdown) skeleton -->
      <div class="lg:hidden mb-6">
        <div class="w-full h-12 bg-white rounded-xl border border-gray-200 shadow-sm skeleton-shimmer" />
      </div>

      <!-- Layout 2 columnas desktop -->
      <div class="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
        <!-- Sidebar desktop skeleton -->
        <aside class="hidden lg:block">
          <div class="sticky top-24">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
              <!-- Titulo "Contenidos" -->
              <div class="h-3 w-20 skeleton-shimmer rounded mb-4 mx-2" />

              <!-- Items del sidebar -->
              <div class="space-y-2">
                <div class="flex items-center gap-2 px-3 py-2">
                  <div class="w-1.5 h-1.5 skeleton-shimmer rounded-full" />
                  <div class="h-4 w-28 skeleton-shimmer rounded" />
                </div>
                <div class="flex items-center gap-2 px-3 py-2">
                  <div class="w-1.5 h-1.5 skeleton-shimmer rounded-full" />
                  <div class="h-4 w-36 skeleton-shimmer rounded" />
                </div>
                <div class="flex items-center gap-2 px-3 py-2">
                  <div class="w-1.5 h-1.5 skeleton-shimmer rounded-full" />
                  <div class="h-4 w-32 skeleton-shimmer rounded" />
                </div>
                <div class="flex items-center gap-2 px-3 py-2">
                  <div class="w-1.5 h-1.5 skeleton-shimmer rounded-full" />
                  <div class="h-4 w-24 skeleton-shimmer rounded" />
                </div>
                <div class="flex items-center gap-2 px-3 py-2">
                  <div class="w-1.5 h-1.5 skeleton-shimmer rounded-full" />
                  <div class="h-4 w-40 skeleton-shimmer rounded" />
                </div>
                <div class="flex items-center gap-2 px-3 py-2">
                  <div class="w-1.5 h-1.5 skeleton-shimmer rounded-full" />
                  <div class="h-4 w-36 skeleton-shimmer rounded" />
                </div>
                <div class="flex items-center gap-2 px-3 py-2">
                  <div class="w-1.5 h-1.5 skeleton-shimmer rounded-full" />
                  <div class="h-4 w-28 skeleton-shimmer rounded" />
                </div>
                <div class="flex items-center gap-2 px-3 py-2">
                  <div class="w-1.5 h-1.5 skeleton-shimmer rounded-full" />
                  <div class="h-4 w-20 skeleton-shimmer rounded" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Acordeones skeleton -->
        <main class="space-y-4">
          <!-- Acordeon 1 (expandido) -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="px-5 py-4 flex items-center justify-between bg-primary/5">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 skeleton-shimmer rounded-lg" />
                <div class="h-5 w-32 skeleton-shimmer rounded" />
              </div>
              <div class="w-5 h-5 skeleton-shimmer rounded" />
            </div>
            <div class="px-5 py-4 border-t border-gray-100">
              <div class="space-y-3">
                <div class="h-4 w-full skeleton-shimmer rounded" />
                <div class="h-4 w-full skeleton-shimmer rounded" />
                <div class="h-4 w-3/4 skeleton-shimmer rounded" />
                <div class="h-4 w-full skeleton-shimmer rounded" />
                <div class="h-4 w-5/6 skeleton-shimmer rounded" />
              </div>
            </div>
          </div>

          <!-- Acordeon 2 (colapsado) -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="px-5 py-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 skeleton-shimmer rounded-lg" />
                <div class="h-5 w-40 skeleton-shimmer rounded" />
              </div>
              <div class="w-5 h-5 skeleton-shimmer rounded" />
            </div>
          </div>

          <!-- Acordeon 3 (colapsado) -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="px-5 py-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 skeleton-shimmer rounded-lg" />
                <div class="h-5 w-36 skeleton-shimmer rounded" />
              </div>
              <div class="w-5 h-5 skeleton-shimmer rounded" />
            </div>
          </div>

          <!-- Acordeon 4 (colapsado) -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="px-5 py-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 skeleton-shimmer rounded-lg" />
                <div class="h-5 w-28 skeleton-shimmer rounded" />
              </div>
              <div class="w-5 h-5 skeleton-shimmer rounded" />
            </div>
          </div>

          <!-- Acordeon 5 (colapsado) -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="px-5 py-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 skeleton-shimmer rounded-lg" />
                <div class="h-5 w-44 skeleton-shimmer rounded" />
              </div>
              <div class="w-5 h-5 skeleton-shimmer rounded" />
            </div>
          </div>

          <!-- Acordeon 6 (colapsado) -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="px-5 py-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 skeleton-shimmer rounded-lg" />
                <div class="h-5 w-40 skeleton-shimmer rounded" />
              </div>
              <div class="w-5 h-5 skeleton-shimmer rounded" />
            </div>
          </div>

          <!-- Acordeon 7 (colapsado) -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="px-5 py-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 skeleton-shimmer rounded-lg" />
                <div class="h-5 w-32 skeleton-shimmer rounded" />
              </div>
              <div class="w-5 h-5 skeleton-shimmer rounded" />
            </div>
          </div>

          <!-- Acordeon 8 (colapsado) -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="px-5 py-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 skeleton-shimmer rounded-lg" />
                <div class="h-5 w-24 skeleton-shimmer rounded" />
              </div>
              <div class="w-5 h-5 skeleton-shimmer rounded" />
            </div>
          </div>

          <!-- Footer link skeleton -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <div class="h-4 w-full max-w-md skeleton-shimmer rounded" />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
