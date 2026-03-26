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

  const directus = createDirectus(config.DIRECTUS_URL)
    .with(staticToken(config.DIRECTUS_ADMIN_TOKEN))
    .with(rest())

  return await directus.request(readItems(collection, params))
})