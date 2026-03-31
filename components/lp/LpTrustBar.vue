<script setup lang="ts">
interface TrustItem {
  icon: string
  text: string
}

interface Props {
  items?: TrustItem[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [
    { icon: 'check', text: 'Sin costo para el cliente' },
    { icon: 'clock', text: 'Preaprobación en 24 h' },
    { icon: 'globe', text: '100% remoto' },
    { icon: 'shield', text: '+16 años de experiencia' }
  ]
})

const iconPaths: Record<string, string> = {
  check: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  globe: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
}
</script>

<template>
  <section class="bg-primary/5 py-6 border-y border-primary/10">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex items-center gap-2 text-sm text-gray-700"
        >
          <svg class="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPaths[item.icon] || iconPaths.check" />
          </svg>
          <span class="font-medium">{{ item.text }}</span>

          <!-- Separator dot (not on last item) -->
          <span
            v-if="index < items.length - 1"
            class="hidden md:inline text-gray-300 ml-4"
            aria-hidden="true"
          >
            &middot;
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
