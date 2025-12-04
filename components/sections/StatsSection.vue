<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

interface Stat {
  value: string
  label: string
  description?: string
}

const props = defineProps({
  stats: {
    type: Array as PropType<Stat[]>,
    required: true
  },
  variant: {
    type: String as PropType<'white' | 'muted' | 'primary'>,
    default: 'white'
  },
  showBorder: {
    type: Boolean,
    default: true
  }
})

// Extraer numeros de los valores para animar
const parseValue = (value: string) => {
  const match = value.match(/[\d,]+/)
  if (!match) return { number: 0, prefix: '', suffix: value }

  const numberStr = match[0].replace(',', '')
  const number = parseInt(numberStr)
  const index = value.indexOf(match[0])
  const prefix = value.slice(0, index)
  const suffix = value.slice(index + match[0].length)

  return { number, prefix, suffix, hasComma: match[0].includes(',') }
}

// Estado para los valores animados
const animatedValues = ref<number[]>([])
const hasAnimated = ref(false)
const sectionRef = ref<HTMLElement | null>(null)

// Inicializar valores en 0
onMounted(() => {
  animatedValues.value = props.stats.map(() => 0)
})

// Funcion para animar el contador
const animateCounters = () => {
  if (hasAnimated.value) return
  hasAnimated.value = true

  const duration = 2000 // 2 segundos
  const steps = 60
  const stepDuration = duration / steps

  props.stats.forEach((stat, index) => {
    const { number } = parseValue(stat.value)
    const increment = number / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      // Easing: empieza rapido, termina lento
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      current = Math.round(number * eased)
      animatedValues.value[index] = current

      if (step >= steps) {
        animatedValues.value[index] = number
        clearInterval(timer)
      }
    }, stepDuration)
  })
}

// Observar cuando la seccion entra en viewport
useIntersectionObserver(
  sectionRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      animateCounters()
    }
  },
  { threshold: 0.3 }
)

// Formatear valor con coma si es necesario
const formatValue = (stat: Stat, index: number) => {
  const { prefix, suffix, hasComma } = parseValue(stat.value)
  let num = animatedValues.value[index] || 0

  // Formatear con coma si el valor original tenia coma
  const formattedNum = hasComma ? num.toLocaleString('es-CO') : num.toString()

  return `${prefix}${formattedNum}${suffix}`
}

// Clases segun variante
const sectionClasses = computed(() => {
  const base = 'py-12 lg:py-16'
  const variants = {
    white: 'bg-white',
    muted: 'bg-gray-50',
    primary: 'bg-primary'
  }
  const border = props.showBorder && props.variant !== 'primary' ? 'border-b border-gray-100' : ''
  return `${base} ${variants[props.variant]} ${border}`
})

const textClasses = computed(() => {
  if (props.variant === 'primary') {
    return {
      value: 'text-white',
      label: 'text-white/90',
      description: 'text-white/70'
    }
  }
  return {
    value: 'text-primary',
    label: 'text-gray-900',
    description: 'text-gray-500'
  }
})
</script>

<template>
  <section ref="sectionRef" :class="sectionClasses">
    <div class="mx-auto container px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(stat, index) in stats" :key="index" class="text-center">
          <p :class="['text-4xl lg:text-5xl font-bold', textClasses.value]">
            {{ formatValue(stat, index) }}
          </p>
          <p :class="['text-sm font-semibold mt-1', textClasses.label]">
            {{ stat.label }}
          </p>
          <p v-if="stat.description" :class="['text-xs', textClasses.description]">
            {{ stat.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
