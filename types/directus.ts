/**
 * Tipos de TypeScript auto-generados desde Directus
 * Generado: 2025-11-01T17:20:55.961Z
 * No editar manualmente - usar: npx tsx scripts/directus-generate-types.ts
 */

/**
 * Colección: leads
 */
export interface Leads {
  id?: string
  status?: string
  sort?: number | null
  date_created?: string | null
  date_updated?: string | null
  name?: string | null
  lastname?: string | null
  email?: string | null
  phone?: string | null
  message?: string | null
  source_page?: string | null
}

/**
 * Union type de todas las colecciones
 */
export type DirectusCollections = {
  leads: Leads
}
