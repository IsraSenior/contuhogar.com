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
 * Siempre usa /api/directus/[collection] como proxy para:
 * - Evitar CORS en navegación client-side
 * - Resolver URLs de assets (imágenes) de forma consistente
 */
export const useDirectusItems = async <T = unknown>(
  collection: keyof DirectusCollections | string,
  params: DirectusQueryParams<T> = {}
) => {
  return await useAsyncData(
    `${collection}:${JSON.stringify(params)}`,
    () => {
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