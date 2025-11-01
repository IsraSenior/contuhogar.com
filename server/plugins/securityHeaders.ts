// server/plugins/securityHeaders.ts
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("beforeResponse", (event) => {
    const headers = event.node.res;

    // Strict-Transport-Security (HSTS)
    // Fuerza HTTPS durante 2 años
    headers.setHeader(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );

    // X-Content-Type-Options
    // Previene MIME-type sniffing
    headers.setHeader("X-Content-Type-Options", "nosniff");

    // X-Frame-Options
    // Previene clickjacking
    headers.setHeader("X-Frame-Options", "DENY");

    // X-XSS-Protection
    // Habilita protección XSS del navegador (legacy, pero no hace daño)
    headers.setHeader("X-XSS-Protection", "1; mode=block");

    // Referrer-Policy
    // Controla qué información de referrer se envía
    headers.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

    // Permissions-Policy (antes Feature-Policy)
    // Controla qué APIs del navegador pueden usarse
    headers.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), interest-cohort=()"
    );

    // Content-Security-Policy (CSP)
    // Política de seguridad de contenido - la más importante
    const cspDirectives = [
      "default-src 'self'",
      // Scripts: 'self', Google Analytics, GTM, inline scripts necesarios
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.google.com",
      // Estilos: 'self', inline styles (necesario para Tailwind/Vue)
      "style-src 'self' 'unsafe-inline'",
      // Imágenes: 'self', data URIs, Directus, Freepik, Wikipedia
      "img-src 'self' data: https: http:",
      // Fonts: 'self', data URIs
      "font-src 'self' data:",
      // Conexiones: API propias, Directus, Google Analytics, Telegram
      "connect-src 'self' https://contuhogar.com https://*.directus.app https://www.google-analytics.com https://www.googletagmanager.com https://api.telegram.org",
      // Frames: solo mismo origen (previene clickjacking)
      "frame-src 'self' https://www.google.com https://www.googletagmanager.com",
      // Frame ancestors: DENY (equivalente a X-Frame-Options)
      "frame-ancestors 'none'",
      // Object/Embed: ninguno (previene Flash/plugins antiguos)
      "object-src 'none'",
      // Base URI: solo mismo origen
      "base-uri 'self'",
      // Form actions: solo mismo origen y Google
      "form-action 'self' https://www.google.com",
      // Upgrade insecure requests en producción
      process.env.NODE_ENV === "production" ? "upgrade-insecure-requests" : "",
    ]
      .filter(Boolean)
      .join("; ");

    headers.setHeader("Content-Security-Policy", cspDirectives);

    // Cross-Origin-Embedder-Policy
    // Aísla el contexto de ejecución
    headers.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");

    // Cross-Origin-Opener-Policy
    // Previene que otros sitios puedan referenciar tu ventana
    headers.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");

    // Cross-Origin-Resource-Policy
    // Controla qué recursos pueden cargarse cross-origin
    headers.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  });
});
