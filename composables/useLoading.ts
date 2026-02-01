export function useLoading(minDuration = 150) {
  const isLoading = ref(true)
  const startTime = Date.now()

  onMounted(() => {
    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, minDuration - elapsed)
    setTimeout(() => { isLoading.value = false }, remaining)
  })

  return { isLoading }
}
