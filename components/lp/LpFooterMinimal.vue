<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-white border-t border-gray-200 py-6">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-400">
        <span>&copy; {{ currentYear }} ContuHogar</span>
        <span class="hidden sm:inline" aria-hidden="true">&middot;</span>
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/terminos-condiciones"
            class="hover:text-gray-700 transition-colors focus:outline-none focus:underline"
          >
            Términos y condiciones
          </NuxtLink>
          <span aria-hidden="true">&middot;</span>
          <NuxtLink
            to="/politica-privacidad"
            class="hover:text-gray-700 transition-colors focus:outline-none focus:underline"
          >
            Política de privacidad
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
