import { readItems } from '@directus/sdk'
import type { DirectusCollections } from '@/types/directus'

/**
 * Composable tipado para obtener items de Directus
 *
 * @example
 * // Con tipo específico
 * const { data } = await useDirectusItems<Leads>('leads')
 *
 * // Con parámetros de filtrado
 * const { data } = await useDirectusItems<Leads>('leads', {
 *   filter: { email: { _eq: 'test@example.com' } }
 * })
 */
export const useDirectusItems = async <T = any>(
  collection: keyof DirectusCollections | string,
  params: any = {}
) => {
  const { $directus } = useNuxtApp()

  return await useAsyncData(
    `${collection}:${JSON.stringify(params)}`,
    () => $directus.request(readItems(collection as string, params)),
    { server: true, transform: (d) => d as T[] }
  )
}