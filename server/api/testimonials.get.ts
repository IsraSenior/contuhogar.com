import { createDirectus, rest, staticToken, readItems } from '@directus/sdk'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const directusUrl = config.DIRECTUS_URL as string

  const directus = createDirectus(directusUrl)
    .with(staticToken(config.DIRECTUS_ADMIN_TOKEN as string))
    .with(rest())

  const items = await directus.request(readItems('testimonials', {
    filter: { status: { _eq: 'published' } },
    sort: ['-date_created'],
    fields: ['id', 'name', 'quote', 'handle', 'location', 'avatar', 'sort', 'date_created']
  }))

  return items.map((item: Record<string, unknown>) => ({
    ...item,
    avatar: item.avatar ? `${directusUrl}/assets/${item.avatar}` : null
  }))
})
