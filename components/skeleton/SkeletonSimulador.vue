<script setup lang="ts">
/**
 * Skeleton para el simulador de credito (wizard multi-step)
 * Replica estructura de components/simulador/SimuladorWizard.vue
 * Incluye: sidebar con stepper, area de formulario, navegacion
 */
</script>

<template>
  <div class="relative h-screen flex flex-col lg:flex-row">
    <!-- Boton Cerrar skeleton -->
    <div class="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100">
      <div class="h-6 w-6 skeleton-shimmer rounded" />
    </div>

    <!-- Sidebar con Stepper (Desktop) -->
    <aside class="hidden lg:flex lg:w-[400px] xl:w-[450px] bg-gray-50 p-8 flex-col">
      <!-- Titulo -->
      <div class="mb-8">
        <div class="h-7 w-48 skeleton-shimmer rounded mb-2" />
        <div class="h-4 w-64 skeleton-shimmer rounded" />
      </div>

      <!-- Vertical Stepper skeleton -->
      <div class="flex-1 space-y-4">
        <div v-for="i in 5" :key="i" class="flex items-start gap-4">
          <!-- Step circle -->
          <div class="flex flex-col items-center">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center"
              :class="i === 1 ? 'bg-primary' : 'bg-gray-200'"
            >
              <div :class="['h-4 w-4 rounded', i === 1 ? 'skeleton-shimmer-light' : 'skeleton-shimmer']" />
            </div>
            <!-- Linea conectora -->
            <div v-if="i < 5" class="w-0.5 h-12 bg-gray-200 mt-2" />
          </div>
          <!-- Step content -->
          <div class="pt-2 flex-1">
            <div class="h-4 w-32 skeleton-shimmer rounded mb-1" />
            <div class="h-3 w-48 skeleton-shimmer rounded" />
          </div>
        </div>
      </div>

      <!-- Footer sidebar -->
      <div class="mt-auto py-4 border-t border-gray-200">
        <div class="h-3 w-full skeleton-shimmer rounded mb-2" />
        <div class="flex items-center gap-3">
          <div class="h-6 w-24 skeleton-shimmer rounded" />
          <div class="h-2 w-40 skeleton-shimmer rounded" />
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Header Mobile -->
      <div class="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
        <!-- Logo mobile -->
        <div class="mb-3">
          <div class="h-8 w-32 skeleton-shimmer rounded" />
        </div>
        <!-- Titulo paso -->
        <div class="h-5 w-48 skeleton-shimmer rounded mb-2" />
        <!-- Progress bar -->
        <div class="mt-2 flex gap-1">
          <div
            v-for="i in 5"
            :key="i"
            class="h-1 flex-1 rounded-full"
            :class="i === 1 ? 'bg-primary' : 'bg-gray-200'"
          />
        </div>
      </div>

      <!-- Content Container -->
      <div class="flex-1 overflow-y-auto">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
          <!-- Formulario skeleton -->
          <div class="space-y-8">
            <!-- Titulo del paso -->
            <div>
              <div class="h-8 w-64 skeleton-shimmer rounded mb-2" />
              <div class="h-4 w-96 max-w-full skeleton-shimmer rounded" />
            </div>

            <!-- Campos del formulario -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Campo 1 -->
              <div>
                <div class="h-4 w-24 skeleton-shimmer rounded mb-2" />
                <div class="h-12 w-full skeleton-shimmer rounded-lg" />
              </div>

              <!-- Campo 2 -->
              <div>
                <div class="h-4 w-28 skeleton-shimmer rounded mb-2" />
                <div class="h-12 w-full skeleton-shimmer rounded-lg" />
              </div>

              <!-- Campo 3 -->
              <div>
                <div class="h-4 w-32 skeleton-shimmer rounded mb-2" />
                <div class="h-12 w-full skeleton-shimmer rounded-lg" />
              </div>

              <!-- Campo 4 -->
              <div>
                <div class="h-4 w-20 skeleton-shimmer rounded mb-2" />
                <div class="h-12 w-full skeleton-shimmer rounded-lg" />
              </div>
            </div>

            <!-- Campo adicional full width -->
            <div>
              <div class="h-4 w-36 skeleton-shimmer rounded mb-2" />
              <div class="h-12 w-full skeleton-shimmer rounded-lg" />
            </div>

            <!-- Grupo de radio buttons / checkboxes -->
            <div>
              <div class="h-4 w-40 skeleton-shimmer rounded mb-4" />
              <div class="space-y-3">
                <div v-for="i in 3" :key="i" class="flex items-center gap-3">
                  <div class="h-5 w-5 skeleton-shimmer rounded" />
                  <div class="h-4 skeleton-shimmer rounded" :style="{ width: `${30 + (i % 3) * 15}%` }" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer con navegacion -->
      <div class="bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-12 py-4 lg:min-h-[88px] flex items-center">
        <div class="max-w-4xl mx-auto w-full">
          <div class="flex justify-end">
            <div class="h-12 w-32 skeleton-shimmer rounded-lg" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
