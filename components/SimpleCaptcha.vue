<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  modelValue: string
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'refresh': []
}>()

const { generateCaptcha } = useCaptcha()
const captchaQuestion = ref<string>('')

onMounted(() => {
  refreshCaptcha()
})

const refreshCaptcha = () => {
  const { question } = generateCaptcha()
  captchaQuestion.value = question
  emit('refresh')
}

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="captcha-container">
    <label class="block text-sm font-semibold text-primary mb-2">
      Verificación anti-spam
    </label>

    <div class="flex items-center gap-2">
      <!-- Pregunta del CAPTCHA -->
      <div class="flex-1 bg-gray-100 rounded-md px-4 py-3 border border-gray-300">
        <p class="text-base font-medium text-primary">{{ captchaQuestion }}</p>
      </div>

      <!-- Botón de refrescar -->
      <button
        type="button"
        @click="refreshCaptcha"
        class="p-3 rounded-md bg-gray-100 border border-gray-300 hover:bg-gray-200 transition-colors"
        title="Generar nueva pregunta"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-primary">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </button>
    </div>

    <!-- Input para la respuesta -->
    <div class="mt-2">
      <input
        type="text"
        :value="modelValue"
        @input="updateValue"
        inputmode="numeric"
        pattern="[0-9]*"
        placeholder="Tu respuesta"
        class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
        :class="{ 'outline-red-500': error }"
        required
      />
      <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.captcha-container {
  margin-top: 1rem;
}
</style>
