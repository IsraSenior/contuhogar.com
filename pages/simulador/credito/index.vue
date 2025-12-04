<script setup>
definePageMeta({
  layout: 'simulador'
})

// SEO optimizado
useSeoMeta({
  title: 'Simulador de crédito | ConTuHogar',
  description: 'Simula tu crédito hipotecario desde el exterior. Descubre cuánto puedes solicitar y cuál sería tu cuota mensual en minutos.',
  ogTitle: 'Simulador de crédito | ConTuHogar',
  ogDescription: 'Simula tu crédito hipotecario desde el exterior. Descubre cuánto puedes solicitar y cuál sería tu cuota mensual en minutos.',
  ogUrl: 'https://contuhogar.com/simulador/credito',
  twitterCard: 'summary'
})
</script>

<template>
  <div>
    <SimuladorWizard />
  </div>
</template>
