<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  rounded?: string
  light?: boolean
}

withDefaults(defineProps<Props>(), {
  rounded: 'rounded',
  light: false
})
</script>

<template>
  <div
    :class="[
      light ? 'skeleton-shimmer-light' : 'skeleton-shimmer',
      rounded
    ]"
    :style="{
      width: width,
      height: height
    }"
  />
</template>
