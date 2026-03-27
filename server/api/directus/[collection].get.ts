import { createDirectus, rest, staticToken, readItems } from '@directus/sdk'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const collection = getRouterParam(event, 'collection')

  if (!collection) {
    throw createError({ statusCode: 400, statusMessage: 'Collection is required' })
  }

  // Whitelist de colecciones permitidas
  const allowed = ['posts', 'blog_categories', 'services', 'faqs', 'team', 'bank_logos', 'landing_pages', 'testimonials']
  if (!allowed.includes(collection)) {
    throw createError({ statusCode: 403, statusMessage: 'Collection not allowed' })
  }

  const query = getQuery(event)

  // Parsear parámetros JSON que vienen como strings
  const params: Record<string, unknown> = {}
  if (query.fields) params.fields = JSON.parse(query.fields as string)
  if (query.filter) params.filter = JSON.parse(query.filter as string)
  if (query.sort) params.sort = JSON.parse(query.sort as string)
  if (query.limit) params.limit = Number(query.limit)
  if (query.offset) params.offset = Number(query.offset)
  if (query.search) params.search = query.search as string
  if (query.deep) params.deep = JSON.parse(query.deep as string)
  if (query.page) params.page = Number(query.page)

  const directusUrl = config.DIRECTUS_URL as string

  const directus = createDirectus(directusUrl)
    .with(staticToken(config.DIRECTUS_ADMIN_TOKEN))
    .with(rest())

  const items = await directus.request(readItems(collection, params))

  // Campos de tipo file/image que necesitan resolución de URL
  const imageFields: Record<string, string[]> = {
    posts: ['featured_image', 'author_avatar'],
    team: ['image'],
    testimonials: ['avatar'],
  }

  const fieldsToResolve = imageFields[collection]
  if (fieldsToResolve && Array.isArray(items)) {
    return items.map((item: Record<string, unknown>) => {
      const resolved = { ...item }
      for (const field of fieldsToResolve) {
        if (resolved[field] && typeof resolved[field] === 'string') {
          resolved[field] = `${directusUrl}/assets/${resolved[field]}`
        }
      }
      return resolved
    })
  }

  return items
})