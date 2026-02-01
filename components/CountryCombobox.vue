<script setup lang="ts">
interface CountryOption {
  code: string
  name: string
  flag: string
}

interface Props {
  modelValue: string
  options: CountryOption[]
  placeholder?: string
  error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Selecciona un país',
  error: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const searchQuery = ref('')
const comboboxRef = ref<HTMLDivElement>()
const searchInputRef = ref<HTMLInputElement>()
const highlightedIndex = ref(0)

// Obtener el país seleccionado
const selectedCountry = computed(() => {
  return props.options.find(opt => opt.code === props.modelValue)
})

// Filtrar opciones basado en la búsqueda
const filteredOptions = computed(() => {
  if (!searchQuery.value.trim()) {
    return props.options
  }

  const query = searchQuery.value.toLowerCase().trim()

  return props.options.filter(option => {
    const countryName = option.name.toLowerCase()
    const code = option.code.toLowerCase()

    return code.includes(query) || countryName.includes(query)
  })
})

// Abrir/cerrar el combobox
const toggleOpen = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
    highlightedIndex.value = 0
    // Focus en el input cuando se abre
    setTimeout(() => {
      searchInputRef.value?.focus()
    }, 10)
  }
}

// Seleccionar una opción
const selectOption = (option: CountryOption) => {
  emit('update:modelValue', option.code)
  isOpen.value = false
  searchQuery.value = ''
}

// Cerrar al hacer clic fuera
const handleClickOutside = (event: MouseEvent) => {
  if (comboboxRef.value && !comboboxRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

// Navegación con teclado
const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    toggleOpen()
    return
  }

  if (!isOpen.value) return

  switch (event.key) {
    case 'Escape':
      isOpen.value = false
      break
    case 'ArrowDown':
      event.preventDefault()
      highlightedIndex.value = Math.min(highlightedIndex.value + 1, filteredOptions.value.length - 1)
      scrollToHighlighted()
      break
    case 'ArrowUp':
      event.preventDefault()
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
      scrollToHighlighted()
      break
    case 'Enter':
      event.preventDefault()
      if (filteredOptions.value[highlightedIndex.value]) {
        selectOption(filteredOptions.value[highlightedIndex.value])
      }
      break
  }
}

// Scroll al elemento resaltado
const scrollToHighlighted = () => {
  setTimeout(() => {
    const highlighted = document.getElementById(`country-option-${highlightedIndex.value}`)
    if (highlighted) {
      highlighted.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, 0)
}

// Watch para resetear el índice cuando cambia el filtro
watch(filteredOptions, () => {
  highlightedIndex.value = 0
})

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="comboboxRef" class="relative">
    <!-- Botón que muestra la selección actual -->
    <button
      type="button"
      @click="toggleOpen"
      @keydown="handleKeydown"
      class="flex items-center justify-between w-full px-4 py-3 border rounded-lg bg-white transition-all outline-none text-left"
      :class="{
        'border-primary ring-2 ring-primary/20': isOpen,
        'border-red-500 ring-2 ring-red-200': error && !isOpen,
        'border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent': !isOpen && !error
      }"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
    >
      <span v-if="selectedCountry" class="flex items-center gap-2">
        <span class="text-xl">{{ selectedCountry.flag }}</span>
        <span class="text-gray-900">{{ selectedCountry.name }}</span>
      </span>
      <span v-else class="text-gray-400">{{ placeholder }}</span>
      <svg
        class="w-5 h-5 text-gray-400 transition-transform shrink-0"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="isOpen"
        class="absolute z-[100] mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
      >
        <!-- Input de búsqueda -->
        <div class="p-2 border-b border-gray-100">
          <div class="relative">
            <label for="country-search" class="sr-only">Buscar pais</label>
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              id="country-search"
              name="country-search"
              ref="searchInputRef"
              v-model="searchQuery"
              type="text"
              placeholder="Buscar país..."
              class="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              @keydown="handleKeydown"
            />
          </div>
        </div>

        <!-- Lista de opciones -->
        <ul
          role="listbox"
          class="max-h-60 overflow-y-auto py-1"
        >
          <li
            v-for="(option, index) in filteredOptions"
            :key="option.code"
            :id="`country-option-${index}`"
            role="option"
            :aria-selected="option.code === modelValue"
            class="px-3 py-2.5 cursor-pointer flex items-center justify-between gap-2 hover:bg-primary/5 transition-colors"
            :class="{
              'bg-primary/10': index === highlightedIndex,
              'bg-primary/5': option.code === modelValue && index !== highlightedIndex,
            }"
            @click="selectOption(option)"
            @mouseenter="highlightedIndex = index"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl shrink-0">{{ option.flag }}</span>
              <span class="text-gray-900 text-base">{{ option.name }}</span>
            </div>
            <svg
              v-if="option.code === modelValue"
              class="w-5 h-5 text-primary shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </li>

          <!-- No hay resultados -->
          <li v-if="filteredOptions.length === 0" class="px-3 py-6 text-center text-sm text-gray-500">
            No se encontraron países
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
