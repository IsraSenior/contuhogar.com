// server/utils/rateLimit.ts
import { createError, getRequestHeader } from "h3";
import type { H3Event } from "h3";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// En producción, considera usar Redis o similar para múltiples instancias
const rateLimitStore = new Map<string, RateLimitEntry>();

// Limpieza automática cada 10 minutos
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

interface RateLimitOptions {
  /**
   * Número máximo de requests permitidos en la ventana de tiempo
   * @default 5
   */
  maxRequests?: number;

  /**
   * Ventana de tiempo en segundos
   * @default 60 (1 minuto)
   */
  windowSeconds?: number;

  /**
   * Mensaje personalizado cuando se excede el límite
   */
  message?: string;
}

/**
 * Obtiene la IP del cliente desde varios headers posibles
 * Prioriza Cloudflare, luego proxies estándar
 */
export function getClientIP(event: H3Event): string {
  const ip =
    getRequestHeader(event, "cf-connecting-ip") || // Cloudflare
    getRequestHeader(event, "x-real-ip") || // Nginx
    getRequestHeader(event, "x-forwarded-for")?.split(",")[0].trim() || // Proxies
    event.node.req.socket.remoteAddress || // Fallback
    "unknown";

  return ip;
}

/**
 * Middleware de rate limiting basado en IP
 *
 * @example
 * ```ts
 * export default defineEventHandler(async (event) => {
 *   // Límite: 5 requests por minuto
 *   await rateLimit(event, { maxRequests: 5, windowSeconds: 60 });
 *
 *   // Tu lógica aquí...
 * });
 * ```
 */
export async function rateLimit(
  event: H3Event,
  options: RateLimitOptions = {}
): Promise<void> {
  // En desarrollo, ser más permisivo (10x más requests)
  const isDev = process.env.NODE_ENV === 'development';
  const multiplier = isDev ? 10 : 1;

  const {
    maxRequests = 5,
    windowSeconds = 60,
    message = "Demasiadas solicitudes. Por favor, intenta de nuevo más tarde.",
  } = options;

  const effectiveMaxRequests = maxRequests * multiplier;

  const ip = getClientIP(event);

  // Si no podemos identificar la IP, bloqueamos por seguridad
  if (!ip || ip === "unknown") {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "No se pudo identificar el origen de la solicitud",
    });
  }

  const now = Date.now();
  const key = `ratelimit:${ip}`;
  const entry = rateLimitStore.get(key);

  if (!entry) {
    // Primera request en esta ventana
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowSeconds * 1000,
    });

    // Headers informativos
    event.node.res.setHeader("X-RateLimit-Limit", effectiveMaxRequests.toString());
    event.node.res.setHeader("X-RateLimit-Remaining", (effectiveMaxRequests - 1).toString());
    event.node.res.setHeader(
      "X-RateLimit-Reset",
      new Date(now + windowSeconds * 1000).toISOString()
    );

    return;
  }

  // Verificar si la ventana expiró
  if (now > entry.resetTime) {
    // Resetear contador
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowSeconds * 1000,
    });

    event.node.res.setHeader("X-RateLimit-Limit", effectiveMaxRequests.toString());
    event.node.res.setHeader("X-RateLimit-Remaining", (effectiveMaxRequests - 1).toString());
    event.node.res.setHeader(
      "X-RateLimit-Reset",
      new Date(now + windowSeconds * 1000).toISOString()
    );

    return;
  }

  // Incrementar contador
  entry.count++;

  // Verificar si se excedió el límite
  if (entry.count > effectiveMaxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);

    event.node.res.setHeader("X-RateLimit-Limit", effectiveMaxRequests.toString());
    event.node.res.setHeader("X-RateLimit-Remaining", "0");
    event.node.res.setHeader("X-RateLimit-Reset", new Date(entry.resetTime).toISOString());
    event.node.res.setHeader("Retry-After", retryAfter.toString());

    throw createError({
      statusCode: 429,
      statusMessage: "Too Many Requests",
      message,
      data: {
        retryAfter,
        resetTime: new Date(entry.resetTime).toISOString(),
      },
    });
  }

  // Headers informativos
  const remaining = Math.max(0, effectiveMaxRequests - entry.count);
  event.node.res.setHeader("X-RateLimit-Limit", effectiveMaxRequests.toString());
  event.node.res.setHeader("X-RateLimit-Remaining", remaining.toString());
  event.node.res.setHeader("X-RateLimit-Reset", new Date(entry.resetTime).toISOString());
}

/**
 * Función para limpiar manualmente una IP del rate limit
 * Útil para testing o casos especiales
 */
export function clearRateLimit(ip: string): void {
  rateLimitStore.delete(`ratelimit:${ip}`);
}

/**
 * Obtener información del rate limit para una IP sin incrementar contador
 */
export function getRateLimitInfo(ip: string): {
  count: number;
  remaining: number;
  resetTime: Date | null;
} | null {
  const entry = rateLimitStore.get(`ratelimit:${ip}`);

  if (!entry) {
    return null;
  }

  return {
    count: entry.count,
    remaining: Math.max(0, 5 - entry.count), // Asume límite por defecto
    resetTime: new Date(entry.resetTime),
  };
}
