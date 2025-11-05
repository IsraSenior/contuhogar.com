// composables/useCaptcha.ts
import { ref, computed } from 'vue'

export interface CaptchaQuestion {
  question: string
  answer: number
}

/**
 * Composable para generar y validar CAPTCHAs matemáticos simples
 * Ayuda a prevenir spam de bots sin usar servicios externos
 */
export const useCaptcha = () => {
  const captchaAnswer = ref<number>(0)
  const userAnswer = ref<string>('')
  const captchaError = ref<string>('')

  /**
   * Genera una pregunta matemática simple
   * Tipos: suma, resta, multiplicación
   */
  const generateCaptcha = (): CaptchaQuestion => {
    const operations = [
      { type: 'sum', symbol: '+' },
      { type: 'subtract', symbol: '-' },
      { type: 'multiply', symbol: '×' }
    ]

    const operation = operations[Math.floor(Math.random() * operations.length)]

    let num1: number
    let num2: number
    let answer: number
    let question: string

    switch (operation.type) {
      case 'sum':
        num1 = Math.floor(Math.random() * 15) + 1 // 1-15
        num2 = Math.floor(Math.random() * 15) + 1 // 1-15
        answer = num1 + num2
        question = `¿Cuánto es ${num1} ${operation.symbol} ${num2}?`
        break

      case 'subtract':
        num1 = Math.floor(Math.random() * 20) + 10 // 10-29
        num2 = Math.floor(Math.random() * 10) + 1  // 1-10
        answer = num1 - num2
        question = `¿Cuánto es ${num1} ${operation.symbol} ${num2}?`
        break

      case 'multiply':
        num1 = Math.floor(Math.random() * 10) + 1 // 1-10
        num2 = Math.floor(Math.random() * 5) + 2  // 2-6
        answer = num1 * num2
        question = `¿Cuánto es ${num1} ${operation.symbol} ${num2}?`
        break

      default:
        num1 = 2
        num2 = 2
        answer = 4
        question = `¿Cuánto es ${num1} ${operation.symbol} ${num2}?`
    }

    captchaAnswer.value = answer
    return { question, answer }
  }

  /**
   * Valida la respuesta del usuario
   */
  const validateCaptcha = (): boolean => {
    const userValue = parseInt(userAnswer.value.trim())

    if (isNaN(userValue)) {
      captchaError.value = 'Por favor ingresa un número válido'
      return false
    }

    if (userValue !== captchaAnswer.value) {
      captchaError.value = 'Respuesta incorrecta. Intenta de nuevo.'
      return false
    }

    captchaError.value = ''
    return true
  }

  /**
   * Resetea el CAPTCHA (útil después de un error)
   */
  const resetCaptcha = () => {
    userAnswer.value = ''
    captchaError.value = ''
    return generateCaptcha()
  }

  /**
   * Limpia solo la respuesta del usuario
   */
  const clearAnswer = () => {
    userAnswer.value = ''
    captchaError.value = ''
  }

  /**
   * Estado de validez del CAPTCHA
   */
  const isValid = computed(() => {
    return userAnswer.value.trim() !== '' &&
           parseInt(userAnswer.value) === captchaAnswer.value
  })

  return {
    captchaAnswer,
    userAnswer,
    captchaError,
    isValid,
    generateCaptcha,
    validateCaptcha,
    resetCaptcha,
    clearAnswer
  }
}
