<script setup lang="ts">
interface Props {
  lines?: number
  lastLineWidth?: string
  light?: boolean
}

withDefaults(defineProps<Props>(), {
  lines: 3,
  lastLineWidth: '75%',
  light: false
})
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="i in lines"
      :key="i"
      :class="[
        light ? 'skeleton-shimmer-light' : 'skeleton-shimmer',
        'h-4 rounded'
      ]"
      :style="{
        width: i === lines ? lastLineWidth : '100%'
      }"
    />
  </div>
</template>
