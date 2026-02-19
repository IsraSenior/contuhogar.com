import { createDirectus, rest, staticToken, readItems } from '@directus/sdk'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig()

  const directus = createDirectus(config.DIRECTUS_URL as string)
    .with(staticToken(config.DIRECTUS_ADMIN_TOKEN as string))
    .with(rest())

  const filter: Record<string, unknown> = { status: { _eq: 'published' } }

  if (query.service_slug) {
    filter.service_slug = { _eq: query.service_slug }
  }
  if (query.slug) {
    filter.slug = { _eq: query.slug }
  }

  const items = await directus.request(readItems('landing_pages', {
    filter,
    ...(query.limit ? { limit: Number(query.limit) } : {}),
    ...(query.sort ? { sort: [String(query.sort)] } : {})
  }))

  return items
})
