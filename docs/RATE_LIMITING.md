# Rate Limiting - Protección contra Abuso de API

## Descripción

El rate limiting (limitación de tasa) está implementado para proteger los endpoints de la API contra:
- Ataques DDoS (Distributed Denial of Service)
- Spam automatizado
- Fuerza bruta
- Abuso de recursos del servidor

## Configuración Actual

### Endpoint: `/api/contact`
**Límite:** 3 requests por 2 minutos (120 segundos)

**Justificación:** Este es el formulario de contacto principal. Un usuario legítimo no necesita enviar más de 3 mensajes en 2 minutos.

```typescript
await rateLimit(event, {
  maxRequests: 3,
  windowSeconds: 120,
  message: "Has enviado demasiados mensajes. Por favor, espera un momento antes de intentarlo de nuevo.",
});
```

### Endpoint: `/api/send/lead`
**Límite:** 5 requests por 5 minutos (300 segundos)

**Justificación:** Este endpoint maneja leads y notificaciones por email. Permite un poco más de flexibilidad pero sigue siendo restrictivo.

```typescript
await rateLimit(event, {
  maxRequests: 5,
  windowSeconds: 300,
  message: "Has enviado demasiados mensajes. Por favor, espera un momento antes de intentarlo de nuevo.",
});
```

## Cómo Funciona

### 1. Identificación de IP

El sistema identifica al cliente mediante su dirección IP, priorizando headers de proxy:

```typescript
const ip =
  getRequestHeader(event, "cf-connecting-ip") || // Cloudflare
  getRequestHeader(event, "x-real-ip") ||        // Nginx
  getRequestHeader(event, "x-forwarded-for")?.split(",")[0].trim() || // Proxies
  event.node.req.socket.remoteAddress ||         // Fallback
  "unknown";
```

### 2. Almacenamiento en Memoria

Los contadores se almacenan en memoria (RAM) del servidor:

```typescript
interface RateLimitEntry {
  count: number;      // Número de requests realizadas
  resetTime: number;  // Timestamp cuando se resetea el contador
}
```

**Ventajas:**
- ⚡ Extremadamente rápido (sin latencia de red)
- 🚀 No requiere servicios externos (Redis, etc.)
- 💰 Costo cero

**Limitaciones:**
- 🔄 Se resetea cuando el servidor se reinicia
- 📊 No compartido entre múltiples instancias del servidor

### 3. Limpieza Automática

Cada 10 minutos, el sistema limpia entradas expiradas:

```typescript
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);
```

## Headers HTTP

Cuando un cliente hace una request, recibe información sobre su límite:

| Header | Descripción | Ejemplo |
|--------|-------------|---------|
| `X-RateLimit-Limit` | Número máximo de requests permitidas | `3` |
| `X-RateLimit-Remaining` | Requests restantes en la ventana actual | `2` |
| `X-RateLimit-Reset` | Timestamp cuando se resetea el contador | `2025-11-01T14:30:00.000Z` |
| `Retry-After` | Segundos que debe esperar antes de reintentar (solo cuando se excede) | `45` |

### Ejemplo de Respuesta Exitosa

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 3
X-RateLimit-Remaining: 2
X-RateLimit-Reset: 2025-11-01T14:30:00.000Z
Content-Type: application/json

{ "ok": true, "id": "abc123" }
```

### Ejemplo de Respuesta cuando se Excede el Límite

```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 3
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 2025-11-01T14:30:00.000Z
Retry-After: 45
Content-Type: application/json

{
  "statusCode": 429,
  "statusMessage": "Too Many Requests",
  "message": "Has enviado demasiados mensajes. Por favor, espera un momento antes de intentarlo de nuevo.",
  "data": {
    "retryAfter": 45,
    "resetTime": "2025-11-01T14:30:00.000Z"
  }
}
```

## Uso en Nuevos Endpoints

Para proteger un nuevo endpoint:

```typescript
// server/api/mi-endpoint.post.ts
export default defineEventHandler(async (event) => {
  // Agregar rate limiting
  await rateLimit(event, {
    maxRequests: 10,        // Máximo de requests
    windowSeconds: 60,      // Ventana de tiempo en segundos
    message: "Mensaje personalizado para el usuario",
  });

  // Tu lógica aquí...
  const body = await readBody(event);
  // ...
});
```

### Recomendaciones por Tipo de Endpoint

| Tipo de Endpoint | maxRequests | windowSeconds | Justificación |
|------------------|-------------|---------------|---------------|
| **Formulario de contacto** | 3 | 120 | Usuarios legítimos envían 1-2 mensajes máximo |
| **Búsqueda/filtrado** | 30 | 60 | Permite interacción fluida del usuario |
| **Lectura de datos (GET)** | 60 | 60 | Alto volumen OK para lectura |
| **Creación de recursos (POST)** | 10 | 60 | Moderado para prevenir spam |
| **Login/Auth** | 5 | 300 | Estricto para prevenir fuerza bruta |
| **Reset de contraseña** | 3 | 600 | Muy estricto (10 minutos) |

## Funciones Auxiliares

### Obtener Información sin Incrementar Contador

```typescript
import { getRateLimitInfo } from '~/server/utils/rateLimit';

const info = getRateLimitInfo("192.168.1.1");
console.log(info);
// {
//   count: 2,
//   remaining: 3,
//   resetTime: Date(...)
// }
```

### Limpiar Manualmente un IP

Útil para testing o casos especiales:

```typescript
import { clearRateLimit } from '~/server/utils/rateLimit';

clearRateLimit("192.168.1.1");
```

### Obtener IP del Cliente

```typescript
import { getClientIP } from '~/server/utils/rateLimit';

export default defineEventHandler(async (event) => {
  const ip = getClientIP(event);
  console.log(`Request from: ${ip}`);
});
```

## Monitoreo y Logs

Para monitorear intentos bloqueados, agrega logging:

```typescript
export default defineEventHandler(async (event) => {
  try {
    await rateLimit(event, { maxRequests: 5, windowSeconds: 60 });
  } catch (error) {
    if (error.statusCode === 429) {
      const ip = getClientIP(event);
      console.warn(`[RATE LIMIT] IP ${ip} excedió el límite`);
    }
    throw error;
  }

  // Tu lógica...
});
```

## Escalabilidad

### Problema: Múltiples Instancias

Si despliegas en múltiples servidores (load balancing), cada instancia tiene su propio store en memoria. Esto significa que un atacante podría enviar 3 requests a cada servidor.

### Solución: Redis

Para producción a gran escala, considera migrar a Redis:

```typescript
// server/utils/rateLimitRedis.ts (ejemplo futuro)
import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });

export async function rateLimit(event, options) {
  const ip = getClientIP(event);
  const key = `ratelimit:${ip}`;

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, options.windowSeconds);
  }

  if (count > options.maxRequests) {
    throw createError({ statusCode: 429, ... });
  }
}
```

**Ventajas de Redis:**
- ✅ Compartido entre múltiples instancias
- ✅ Persiste entre reinicios
- ✅ Comandos atómicos (INCR + EXPIRE)

**Cuándo migrar a Redis:**
- Cuando tengas más de 1 instancia del servidor
- Cuando necesites persistencia del rate limit
- Cuando el tráfico supere 10,000 requests/día

## Testing

### Test Manual con cURL

```bash
# Primera request (OK)
curl -X POST https://contuhogar.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@test.com","phone":"123","dial":{"code":"+1","flag":"🇺🇸"},"message":"Test message","website":""}'

# Segunda request (OK)
curl -X POST https://contuhogar.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@test.com","phone":"123","dial":{"code":"+1","flag":"🇺🇸"},"message":"Test message","website":""}'

# Tercera request (OK)
curl -X POST https://contuhogar.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@test.com","phone":"123","dial":{"code":"+1","flag":"🇺🇸"},"message":"Test message","website":""}'

# Cuarta request (429 Too Many Requests) ❌
curl -X POST https://contuhogar.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@test.com","phone":"123","dial":{"code":"+1","flag":"🇺🇸"},"message":"Test message","website":""}'
```

### Verificar Headers

```bash
curl -I -X POST https://contuhogar.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@test.com","phone":"123","dial":{"code":"+1","flag":"🇺🇸"},"message":"Test message","website":""}'
```

Busca:
```
X-RateLimit-Limit: 3
X-RateLimit-Remaining: 2
X-RateLimit-Reset: 2025-11-01T14:30:00.000Z
```

## Mejoras Futuras

### 1. Rate Limiting por Endpoint + IP

Actualmente, el contador es global por IP. Podrías querer límites diferentes por endpoint:

```typescript
const key = `ratelimit:${ip}:${event.path}`;
```

### 2. Whitelist de IPs

Para IPs confiables (oficina, testing):

```typescript
const WHITELIST = ['192.168.1.100', '10.0.0.5'];

export async function rateLimit(event, options) {
  const ip = getClientIP(event);

  if (WHITELIST.includes(ip)) {
    return; // No aplicar rate limit
  }

  // Continuar con lógica normal...
}
```

### 3. Diferentes Límites por Usuario Autenticado

```typescript
export async function rateLimit(event, options) {
  const user = await getUserFromSession(event);

  // Usuarios premium tienen límites más altos
  if (user?.tier === 'premium') {
    options.maxRequests *= 3;
  }

  // Continuar...
}
```

## Preguntas Frecuentes

### ¿El rate limit se aplica a GET requests?

No, actualmente solo a los endpoints POST que hemos configurado. Los endpoints GET de lectura pública no tienen rate limit.

### ¿Qué pasa si mi IP cambia?

Cada nueva IP tiene su propio contador. Si estás en una red con IP dinámica, tu límite se reseteará cuando cambies de IP.

### ¿Cómo afecta esto a usuarios detrás de un NAT?

Múltiples usuarios detrás del mismo NAT (misma IP pública) compartirán el mismo contador. Esto es una limitación conocida del rate limiting basado en IP.

**Solución:** Usar rate limiting basado en sesiones/cookies para usuarios autenticados.

### ¿El rate limit afecta el desarrollo local?

No debería. Tu IP local (127.0.0.1 o localhost) tiene su propio contador independiente de producción.

## Resumen

- ✅ Rate limiting implementado en `/api/contact` y `/api/send/lead`
- ✅ Protección contra spam y DDoS
- ✅ Headers informativos para clientes
- ✅ Mensajes de error claros en español
- ✅ Limpieza automática de entradas expiradas
- ⚠️ Almacenamiento en memoria (considera Redis para escala)

---

**Última actualización:** Noviembre 2025
**Versión:** 1.0.0
