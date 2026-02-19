import { defineEventHandler, sendRedirect, getRequestURL } from 'h3'

/**
 * Server middleware para redirects de URLs malformadas
 * GA4 muestra sesiones llegando a /https:/www.contuhogar.com/faqs con 0% engagement
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const path = url.pathname

  // Redirect malformed URLs like /https:/www.contuhogar.com/faqs → /faqs
  if (path.startsWith('/https:') || path.startsWith('/http:')) {
    const match = path.match(/\/https?:\/[^/]+(.*)/)
    if (match && match[1]) {
      return sendRedirect(event, match[1] || '/', 301)
    }
    return sendRedirect(event, '/', 301)
  }
})
