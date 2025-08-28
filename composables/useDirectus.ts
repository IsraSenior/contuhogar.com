import { readItems } from '@directus/sdk'

export const useDirectusItems = async <T>(collection: string, params: any = {}) => {
  const {$directus} = useNuxtApp()
  return await useAsyncData(
    `${collection}:${JSON.stringify(params)}`,
    () => $directus.request(readItems(collection, params)),
    { server: true, transform: (d)=>d }
  )
}