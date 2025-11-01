# Security Documentation

Documentación completa de las medidas de seguridad implementadas en ConTuHogar.com

## 📋 Índice

1. [Validaciones de Formularios](#validaciones-de-formularios)
2. [Rate Limiting](#rate-limiting)
3. [Security Headers](#security-headers)
4. [Gestión de Tokens](#gestión-de-tokens)
5. [Optimización de Imágenes](#optimización-de-imágenes)
6. [Mejores Prácticas](#mejores-prácticas)

---

## 🛡️ Validaciones de Formularios

### Validación con Zod

Todos los formularios usan **Zod** para validación de datos server-side.

#### Formulario de Contacto (`/server/api/contact.post.ts`)

```typescript
const schema = z.object({
  firstName: z.string().min(2).max(60),
  lastName: z.string().min(2).max(60),
  email: z.string().email(),
  dial: z.object({
    flag: z.string().min(1),
    code: z.string().min(1).max(6),
  }),
  phone: z.string().min(5).max(25),
  message: z.string().min(10).max(500),
  source_page: z.string().optional(),
  website: z.string().max(0).optional().or(z.literal("")), // Honeypot
})
```

**Protecciones:**
- ✅ Longitudes mínimas y máximas
- ✅ Validación de email RFC compliant
- ✅ Honeypot para detectar bots
- ✅ Validación de tipo de datos
- ✅ Sanitización automática

### Honeypot Field

Campo oculto `website` que debe permanecer vacío:

```typescript
// En el formulario (oculto)
<input type="text" name="website" v-model="form.website" class="hidden" tabindex="-1" autocomplete="off" />

// Validación
website: z.string().max(0).optional().or(z.literal(""))
```

**Protección contra:**
- Bots automatizados que llenan todos los campos
- Scripts de spam

### Content-Length Check

```typescript
const contentLength = Number(getRequestHeader(event, "content-length") || "0")
if (contentLength > 20_000) {
  throw createError({ statusCode: 413, statusMessage: "Payload too large" })
}
```

**Protección contra:**
- Payloads excesivamente grandes (DoS)
- Intentos de inyección de código

---

## ⏱️ Rate Limiting

Sistema de rate limiting basado en IP para prevenir abuso.

### Configuración Actual

**Formulario de Contacto:**
- **Límite:** 3 requests por 2 minutos
- **Implementación:** `/server/utils/rateLimit.ts`

**API de Leads:**
- **Límite:** 5 requests por 5 minutos

### Implementación

```typescript
await rateLimit(event, {
  maxRequests: 3,
  windowSeconds: 120,
  message: "Has enviado demasiados mensajes. Por favor, espera un momento.",
})
```

**Protección contra:**
- Spam automatizado
- Ataques de fuerza bruta
- DoS (Denial of Service)
- Abuso de API

### Storage

- Almacenamiento en memoria (Map)
- Limpieza automática cada 60 segundos
- No requiere base de datos

---

## 🔒 Security Headers

10 headers de seguridad configurados en `/server/plugins/securityHeaders.ts`

### Headers Implementados

```typescript
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Content-Security-Policy": "..."
}
```

### Content Security Policy (CSP)

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' data: https://fonts.gstatic.com;
img-src 'self' data: https: blob:;
connect-src 'self' https://www.google-analytics.com https://admin.contuhogar.com;
frame-src 'self' https://www.google.com;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
```

**Protección contra:**
- XSS (Cross-Site Scripting)
- Clickjacking
- MIME type sniffing
- Protocol downgrade attacks
- Iframe injection

---

## 🔐 Gestión de Tokens

### Separación de Tokens

**Token Público (Client-Side):**
```env
DIRECTUS_PUBLIC_TOKEN=<read-only-token>
```
- Solo permisos de lectura
- Expuesto al cliente de forma segura
- Usado en: `/plugins/directus.client.ts`

**Token Admin (Server-Side):**
```env
DIRECTUS_ADMIN_TOKEN=<admin-token>
```
- Permisos completos
- Solo accesible en server
- Usado en: `/plugins/directus.server.ts`, scripts de migración
- ⚠️ **NUNCA exponer al cliente**

### Configuración

```typescript
// ✅ CORRECTO: Client-side (solo lectura)
.with(staticToken(config.public.DIRECTUS_PUBLIC_TOKEN))

// ✅ CORRECTO: Server-side (admin)
.with(staticToken(config.DIRECTUS_ADMIN_TOKEN))

// ❌ INCORRECTO: Exponer admin token al cliente
.with(staticToken(config.public.DIRECTUS_ADMIN_TOKEN))
```

### Rotación de Tokens

**Documentación completa:** Ver `/SECURITY_ACTIONS_REQUIRED.md`

**Pasos:**
1. Crear nuevo token público en Directus con permisos de lectura
2. Actualizar variable `DIRECTUS_PUBLIC_TOKEN` en `.env`
3. Rotar token admin si fue comprometido
4. Actualizar en producción

---

## 🖼️ Optimización de Imágenes

Sistema de optimización con `@nuxt/image` para prevenir ataques y mejorar rendimiento.

### Configuración

```typescript
// nuxt.config.ts
image: {
  format: ['webp', 'avif'],
  quality: 80,
  domains: ['admin.contuhogar.com', 'amarilo.com.co'],
}
```

### Uso Seguro

```vue
<NuxtImg
  src="/path/to/image.jpg"
  format="webp"
  quality="80"
  sizes="sm:100vw lg:400px"
  loading="lazy"
/>
```

**Beneficios de Seguridad:**
- Validación automática de dominios permitidos
- Prevención de hot-linking
- Limitación de tamaños de imagen
- Conversión automática a formatos seguros

---

## ✅ Mejores Prácticas Implementadas

### 1. Input Sanitization

- ✅ Validación server-side con Zod
- ✅ Tipado TypeScript estricto
- ✅ No aceptar HTML en inputs
- ✅ Límites de caracteres en todos los campos

### 2. Output Encoding

- ✅ Vue.js escapa automáticamente HTML
- ✅ Uso de `v-text` en lugar de `v-html`
- ✅ Sanitización de URLs

### 3. Authentication & Authorization

- ✅ Tokens separados (público/admin)
- ✅ Permisos granulares en Directus
- ✅ No exponer tokens admin al cliente

### 4. Session Management

- ✅ No hay sesiones de usuario (formularios públicos)
- ✅ Rate limiting por IP
- ✅ Tokens stateless

### 5. Error Handling

- ✅ Mensajes de error genéricos para el usuario
- ✅ Logging detallado en servidor
- ✅ No exponer stack traces

```typescript
catch (e: any) {
  console.error("Directus error:", e?.message || e) // Log server-side
  throw createError({
    statusCode: 500,
    statusMessage: "No se pudo guardar el mensaje" // Generic user message
  })
}
```

### 6. HTTPS Only

- ✅ HSTS header configurado
- ✅ Strict-Transport-Security: max-age=31536000

### 7. Dependencies

- ✅ Dependencias actualizadas regularmente
- ✅ Auditoría de seguridad con `yarn audit`

---

## 🚨 Vulnerabilidades Corregidas

### 1. Token Admin Expuesto (CRÍTICO) ✅

**Fecha:** 2025-11-01
**Severidad:** Crítica
**Status:** Corregido

**Problema:**
```typescript
// ❌ ANTES: Token admin expuesto al cliente
const client = createDirectus(config.public.DIRECTUS_URL)
  .with(staticToken(config.public.DIRECTUS_ADMIN_TOKEN))
```

**Solución:**
```typescript
// ✅ DESPUÉS: Token público con permisos limitados
const client = createDirectus(config.public.DIRECTUS_URL)
  .with(staticToken(config.public.DIRECTUS_PUBLIC_TOKEN))
```

**Impacto:** Sin este fix, cualquier usuario podía acceder con permisos de administrador a Directus.

---

## 📝 Checklist de Seguridad

### Antes de Deployment

- [ ] Rotar tokens de Directus
- [ ] Verificar `.env` no commiteado
- [ ] Auditar dependencias (`yarn audit`)
- [ ] Verificar security headers en producción
- [ ] Probar rate limiting
- [ ] Verificar CSP no bloqueando recursos necesarios
- [ ] Backup de base de datos

### Monitoreo Continuo

- [ ] Logs de errores 4xx/5xx
- [ ] Intentos de rate limiting
- [ ] Alertas de Directus para cambios no autorizados
- [ ] Monitoreo de tráfico anómalo

---

## 🔗 Referencias

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Directus Security](https://docs.directus.io/self-hosted/security.html)
- [Nuxt Security](https://nuxt.com/docs/guide/going-further/security)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

## 📧 Reporte de Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad, por favor repórtala de forma responsable:

- **Email:** seguridad@contuhogar.net
- **No** crear issues públicos para vulnerabilidades
- Esperar respuesta antes de divulgación pública

---

**Última actualización:** 2025-11-01
**Próxima revisión:** 2025-12-01
