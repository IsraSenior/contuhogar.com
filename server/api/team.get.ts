import { createDirectus, rest, staticToken, readItems } from '@directus/sdk'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const directusUrl = config.DIRECTUS_URL as string

  const directus = createDirectus(directusUrl)
    .with(staticToken(config.DIRECTUS_ADMIN_TOKEN as string))
    .with(rest())

  const items = await directus.request(readItems('team', {
    filter: { status: { _eq: 'published' } },
    sort: ['sort'],
    fields: ['id', 'name', 'title', 'email', 'image', 'sort']
  }))

  return items.map((item: Record<string, unknown>) => ({
    ...item,
    image: item.image ? `${directusUrl}/assets/${item.image}` : null
  }))
})
