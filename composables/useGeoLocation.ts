import { ref } from 'vue'

/**
 * Composable para detectar la ubicación del usuario basado en su IP
 * Usa el servicio gratuito geojs.io para obtener el código de país
 */
export const useGeoLocation = () => {
  const countryCode = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Detecta el país del usuario usando su IP
   * @returns El código de país de 2 letras (ej: "CO", "US", "ES")
   */
  const detectCountry = async (): Promise<string | null> => {
    isLoading.value = true
    error.value = null

    try {
      // Usar geojs.io - servicio gratuito sin necesidad de API key
      const response = await fetch('https://get.geojs.io/v1/ip/country.json', {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch location')
      }

      const data = await response.json()
      countryCode.value = data.country // "CO", "US", "ES", etc.
      return data.country
    } catch (e: any) {
      error.value = e.message || 'Error detecting location'
      console.warn('GeoLocation detection failed:', e.message)
      // Si falla, retornar Colombia como país por defecto
      countryCode.value = 'CO'
      return 'CO'
    } finally {
      isLoading.value = false
    }
  }

  return {
    countryCode,
    isLoading,
    error,
    detectCountry,
  }
}
