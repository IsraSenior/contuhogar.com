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
 * En SSR usa el SDK de Directus directamente con admin token.
 * En cliente usa /api/directus/[collection] para evitar CORS.
 */
export const useDirectusItems = async <T = unknown>(
  collection: keyof DirectusCollections | string,
  params: DirectusQueryParams<T> = {}
) => {
  const nuxtApp = useNuxtApp()

  return await useAsyncData(
    `${collection}:${JSON.stringify(params)}`,
    () => {
      if (import.meta.server) {
        // SSR: usar SDK directamente con admin token
        const client = nuxtApp.$directusServer
        return client.request(readItems(collection as string, params))
      }

      // Cliente: proxy a través de server API route
      const query: Record<string, string | number> = {}
      if (params.fields) query.fields = JSON.stringify(params.fields)
      if (params.filter) query.filter = JSON.stringify(params.filter)
      if (params.sort) query.sort = JSON.stringify(params.sort)
      if (params.limit) query.limit = params.limit
      if (params.offset) query.offset = params.offset
      if (params.search) query.search = params.search
      if (params.deep) query.deep = JSON.stringify(params.deep)
      if (params.page) query.page = params.page

      return $fetch(`/api/directus/${collection}`, { query })
    },
    { server: true, transform: (d) => d as T[] }
  )
}