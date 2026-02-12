// plugins/meta-pixel.client.ts
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const pixelId = config.public.META_PIXEL_ID as string | undefined
  const router = useRouter()

  if (!pixelId) {
    // Development/no pixel: stub that logs to console
    if (process.dev) {
      window.fbq = ((...args: any[]) => {
        console.log('[Meta Pixel Stub]', ...args)
      }) as any
    }
    return
  }

  // Production: load Meta Pixel script
  const script = document.createElement('script')
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
  `
  document.head.appendChild(script)

  // Initialize pixel
  window.fbq('init', pixelId)
  window.fbq('track', 'PageView')

  // Track PageView on SPA route changes
  router.afterEach(() => {
    window.fbq('track', 'PageView')
  })
})

// Type declarations for fbq
declare global {
  interface Window {
    fbq: (...args: any[]) => void
    _fbq: any
  }
}
