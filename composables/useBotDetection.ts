// composables/useBotDetection.ts
import { ref, onMounted } from 'vue'
import { load, type BotDetectionResult, type BotKind } from '@fingerprintjs/botd'

interface BotDetectionState {
  isBot: boolean
  botKind: BotKind | null
  isLoading: boolean
  error: string | null
  detectionTimestamp: number | null
}

export const useBotDetection = () => {
  const state = ref<BotDetectionState>({
    isBot: false,
    botKind: null,
    isLoading: true,
    error: null,
    detectionTimestamp: null
  })

  const detectBot = async (): Promise<BotDetectionResult | null> => {
    if (!import.meta.client) return null

    state.value.isLoading = true
    state.value.error = null

    try {
      const botd = await load()
      const result = await botd.detect()

      state.value.isBot = result.bot
      state.value.botKind = result.bot ? result.botKind : null
      state.value.detectionTimestamp = Date.now()
      state.value.isLoading = false

      if (result.bot) {
        console.warn(`[BotD] Bot detected: ${result.botKind}`)
      }

      return result
    } catch (e) {
      console.error('[BotD] Detection error:', e)
      state.value.error = e instanceof Error ? e.message : 'Detection failed'
      state.value.isLoading = false
      return null
    }
  }

  // Auto-detect on mount
  onMounted(() => {
    detectBot()
  })

  const getBotDetectionPayload = () => ({
    _botDetected: state.value.isBot,
    _botKind: state.value.botKind,
    _botDetectionTimestamp: state.value.detectionTimestamp
  })

  return {
    state,
    isBot: computed(() => state.value.isBot),
    isLoading: computed(() => state.value.isLoading),
    detectBot,
    getBotDetectionPayload
  }
}
