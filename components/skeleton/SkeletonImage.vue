<script setup lang="ts">
interface Props {
  aspectRatio?: 'video' | 'square' | '4/3' | '3/2'
  rounded?: string
  light?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  aspectRatio: 'video',
  rounded: 'rounded-xl',
  light: false
})

const aspectClass = computed(() => {
  const map: Record<string, string> = {
    'video': 'aspect-video',
    'square': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]'
  }
  return map[props.aspectRatio] || 'aspect-video'
})
</script>

<template>
  <div
    :class="[
      light ? 'skeleton-shimmer-light' : 'skeleton-shimmer',
      aspectClass,
      rounded,
      'w-full'
    ]"
  />
</template>
