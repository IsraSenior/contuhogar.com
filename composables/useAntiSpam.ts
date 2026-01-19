// composables/useAntiSpam.ts
import { ref, computed, onMounted } from 'vue'

interface FieldInteraction {
  fieldName: string
  timestamp: number
  type: 'focus' | 'blur' | 'input'
}

interface AntiSpamState {
  sessionId: string
  fieldInteractions: FieldInteraction[]
  firstInteractionTime: number | null
  lastInteractionTime: number | null
  honeypotValues: Record<string, string>
}

// Generate a deterministic but unpredictable honeypot field name based on current hour
// This changes every hour, making it harder for bots to adapt
const generateHoneypotName = (salt: string): string => {
  if (!import.meta.client) return 'field_hp'

  const hour = new Date().getHours()
  const day = new Date().getDate()
  const base = `${salt}_${hour}_${day}`

  // Simple hash function to generate a consistent name
  let hash = 0
  for (let i = 0; i < base.length; i++) {
    const char = base.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }

  // Return a realistic-looking field name that changes hourly
  const prefixes = ['contact', 'user', 'form', 'input', 'field', 'data']
  const suffixes = ['url', 'link', 'site', 'address', 'company', 'fax']

  const prefixIndex = Math.abs(hash) % prefixes.length
  const suffixIndex = Math.abs(hash >> 4) % suffixes.length

  return `${prefixes[prefixIndex]}_${suffixes[suffixIndex]}`
}

export const useAntiSpam = () => {
  // Generate session ID only on client
  const sessionId = ref('')

  const state = ref<AntiSpamState>({
    sessionId: '',
    fieldInteractions: [],
    firstInteractionTime: null,
    lastInteractionTime: null,
    honeypotValues: {}
  })

  // Generate multiple honeypot field names
  const honeypotFieldName1 = computed(() => generateHoneypotName('hp1'))
  const honeypotFieldName2 = computed(() => generateHoneypotName('hp2'))

  // Reactive honeypot values
  const honeypot1Value = ref('')
  const honeypot2Value = ref('')

  // Initialize session on mount
  onMounted(() => {
    // Generate unique session ID
    sessionId.value = crypto.randomUUID()
    state.value.sessionId = sessionId.value

    // Store session start time
    state.value.firstInteractionTime = null
    state.value.lastInteractionTime = null
  })

  // Track field interaction
  const trackInteraction = (fieldName: string, type: 'focus' | 'blur' | 'input') => {
    const now = Date.now()

    state.value.fieldInteractions.push({
      fieldName,
      timestamp: now,
      type
    })

    if (!state.value.firstInteractionTime) {
      state.value.firstInteractionTime = now
    }
    state.value.lastInteractionTime = now
  }

  // Get unique fields that were interacted with
  const uniqueFieldsInteracted = computed(() => {
    const fields = new Set<string>()
    state.value.fieldInteractions.forEach(interaction => {
      fields.add(interaction.fieldName)
    })
    return fields.size
  })

  // Get total interaction count
  const totalInteractions = computed(() => state.value.fieldInteractions.length)

  // Check if honeypot was triggered (any honeypot field has content)
  const honeypotTriggered = computed(() => {
    return honeypot1Value.value.length > 0 || honeypot2Value.value.length > 0
  })

  // Calculate interaction time (time between first and last interaction)
  const interactionDuration = computed(() => {
    if (!state.value.firstInteractionTime || !state.value.lastInteractionTime) {
      return 0
    }
    return state.value.lastInteractionTime - state.value.firstInteractionTime
  })

  // Check if session looks legitimate (minimum interactions and time)
  const isLegitimateSession = computed(() => {
    const MIN_UNIQUE_FIELDS = 2  // Must interact with at least 2 different fields
    const MIN_TOTAL_INTERACTIONS = 3  // Must have at least 3 interactions total
    const MIN_INTERACTION_DURATION = 1500  // At least 1.5 seconds between first and last interaction

    return (
      uniqueFieldsInteracted.value >= MIN_UNIQUE_FIELDS &&
      totalInteractions.value >= MIN_TOTAL_INTERACTIONS &&
      interactionDuration.value >= MIN_INTERACTION_DURATION &&
      !honeypotTriggered.value
    )
  })

  // Get the anti-spam payload to send with form submission
  const getAntiSpamPayload = () => ({
    _sessionId: sessionId.value,
    _fieldInteractions: totalInteractions.value,
    _uniqueFields: uniqueFieldsInteracted.value,
    _interactionDuration: interactionDuration.value,
    _honeypot1Name: honeypotFieldName1.value,
    _honeypot1Value: honeypot1Value.value,
    _honeypot2Name: honeypotFieldName2.value,
    _honeypot2Value: honeypot2Value.value,
    _sessionStartTime: state.value.firstInteractionTime
  })

  // Reset the anti-spam state (after successful submission)
  const reset = () => {
    sessionId.value = crypto.randomUUID()
    state.value = {
      sessionId: sessionId.value,
      fieldInteractions: [],
      firstInteractionTime: null,
      lastInteractionTime: null,
      honeypotValues: {}
    }
    honeypot1Value.value = ''
    honeypot2Value.value = ''
  }

  return {
    sessionId,
    honeypotFieldName1,
    honeypotFieldName2,
    honeypot1Value,
    honeypot2Value,
    trackInteraction,
    uniqueFieldsInteracted,
    totalInteractions,
    interactionDuration,
    honeypotTriggered,
    isLegitimateSession,
    getAntiSpamPayload,
    reset
  }
}
