<script setup lang="ts">
interface Props {
  size?: string
  light?: boolean
}

withDefaults(defineProps<Props>(), {
  size: '40px',
  light: false
})
</script>

<template>
  <div
    :class="[
      light ? 'skeleton-shimmer-light' : 'skeleton-shimmer',
      'rounded-full shrink-0'
    ]"
    :style="{
      width: size,
      height: size
    }"
  />
</template>
