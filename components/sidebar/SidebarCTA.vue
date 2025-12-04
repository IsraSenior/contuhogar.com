<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'secondary', // 'primary' | 'secondary'
    validator: (value) => ['primary', 'secondary'].includes(value)
  },
  icon: {
    type: String,
    default: 'question' // 'question' | 'calculator' | 'resources'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  ctaText: {
    type: String,
    required: true
  },
  ctaLink: {
    type: String,
    required: true
  },
  badge: {
    type: String,
    default: ''
  },
  badgeIcon: {
    type: Boolean,
    default: false
  }
})

const variantClasses = computed(() => {
  return props.variant === 'primary'
    ? 'bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20'
    : 'bg-gradient-to-br from-secondary/5 to-secondary/10 border-2 border-secondary/20'
})

const iconBgClasses = computed(() => {
  return props.variant === 'primary'
    ? 'bg-primary/10'
    : 'bg-secondary/10'
})

const iconColorClasses = computed(() => {
  return props.variant === 'primary'
    ? 'text-primary'
    : 'text-secondary'
})

const buttonClasses = computed(() => {
  return props.variant === 'primary'
    ? 'bg-primary hover:bg-primary/90'
    : 'bg-secondary hover:bg-secondary/90'
})

const iconPaths = {
  question: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  calculator: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  resources: 'M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z'
}
</script>

<template>
  <div :class="['rounded-2xl p-6', variantClasses]">
    <div class="text-center">
      <!-- Icon -->
      <div :class="['inline-flex items-center justify-center w-14 h-14 rounded-full mb-4', iconBgClasses]">
        <svg :class="['w-7 h-7', iconColorClasses]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPaths[icon]"/>
        </svg>
      </div>

      <!-- Title -->
      <h3 class="text-xl font-bold text-gray-900 mb-2">
        <slot name="title">{{ title }}</slot>
      </h3>

      <!-- Description -->
      <p v-if="description || $slots.description" class="text-sm text-gray-600 mb-6">
        <slot name="description">{{ description }}</slot>
      </p>

      <!-- CTA Button -->
      <NuxtLink
        :to="ctaLink"
        :class="['block w-full px-4 py-3 text-white font-semibold rounded-lg transition-colors shadow-md', buttonClasses]"
      >
        {{ ctaText }}
      </NuxtLink>

      <!-- Badge/Timestamp -->
      <p v-if="badge || $slots.badge" class="mt-3 text-xs text-gray-500 flex items-center justify-center gap-1">
        <svg v-if="badgeIcon" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
        </svg>
        <slot name="badge">{{ badge }}</slot>
      </p>
    </div>
  </div>
</template>
