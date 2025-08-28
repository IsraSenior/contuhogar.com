import { createDirectus, rest, staticToken } from '@directus/sdk'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const client = createDirectus(config.public.DIRECTUS_URL)
    .with(staticToken(config.public.DIRECTUS_ADMIN_TOKEN))
    .with(rest())
  return { provide: { directus: client } }
})