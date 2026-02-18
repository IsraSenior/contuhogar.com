import { readItems } from '@directus/sdk'
import type { Query } from '@directus/sdk'
import type { DirectusCollections } from '@/types/directus'

/**
 * Parametros de query para Directus
 * Basado en el tipo Query del SDK de Directus
 */
export interface DirectusQueryParams<T = unknown> {
  /** Campos a retornar */
  readonly fields?: Query<DirectusCollections, T>['fields']
  /** Filtros de busqueda */
  filter?: Query<DirectusCollections, T>['filter']
  /** Busqueda de texto */
  search?: string
  /** Ordenamiento */
  sort?: string | string[]
  /** Limite de resultados */
  limit?: number
  /** Offset para paginacion */
  offset?: number
  /** Numero de pagina */
  page?: number
  /** Deep filtering para relaciones */
  deep?: Record<string, unknown>
}

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
export const useDirectusItems = async <T = unknown>(
  collection: keyof DirectusCollections | string,
  params: DirectusQueryParams<T> = {}
) => {
  const nuxtApp = useNuxtApp()
  const client = import.meta.server ? nuxtApp.$directusServer : nuxtApp.$directus

  return await useAsyncData(
    `${collection}:${JSON.stringify(params)}`,
    () => client.request(readItems(collection as string, params)),
    { server: true, transform: (d) => d as T[] }
  )
}