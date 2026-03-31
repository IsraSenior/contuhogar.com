<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'es-CO'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/ico',
      href: '/favicon.ico'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <LpNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <LpFooterMinimal />
  </div>
</template>
