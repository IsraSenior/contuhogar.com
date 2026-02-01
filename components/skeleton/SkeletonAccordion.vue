<script setup lang="ts">
/**
 * Skeleton para Accordion/FAQ items
 * Replica estructura de acordeones cerrados
 * Props: count (default 5)
 */

interface Props {
  count?: number
}

withDefaults(defineProps<Props>(), {
  count: 5
})
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="i in count"
      :key="i"
      class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
    >
      <div class="px-6 py-5 flex items-center gap-4">
        <!-- Icon placeholder -->
        <div class="skeleton-shimmer w-10 h-10 rounded-lg shrink-0" />

        <!-- Title placeholder (variable width 60%-80%) -->
        <div
          class="skeleton-shimmer h-5 rounded flex-1"
          :style="{ maxWidth: `${60 + (i % 3) * 10}%` }"
        />

        <!-- Chevron/Plus icon placeholder -->
        <div class="skeleton-shimmer w-5 h-5 rounded shrink-0" />
      </div>
    </div>
  </div>
</template>
