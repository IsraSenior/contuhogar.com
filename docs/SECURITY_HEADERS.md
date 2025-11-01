# Security Headers - Protección contra Vulnerabilidades Web

## Descripción

Los security headers (cabeceras de seguridad) HTTP son configuraciones que el servidor envía al navegador para indicarle cómo debe comportarse al renderizar el sitio web. Protegen contra:

- **XSS** (Cross-Site Scripting)
- **Clickjacking**
- **MIME-type sniffing**
- **Inyección de código**
- **Man-in-the-Middle attacks**
- **Información leaked**

## Headers Implementados

### 1. Strict-Transport-Security (HSTS)

**Qué hace:** Fuerza que todas las conexiones sean por HTTPS durante 2 años.

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

**Parámetros:**
- `max-age=63072000`: 2 años en segundos
- `includeSubDomains`: Aplica también a subdominios
- `preload`: Permite ser incluido en la lista HSTS preload de navegadores

**Protege contra:**
- Man-in-the-Middle attacks
- Protocol downgrade attacks
- Cookie hijacking

**Nota:** Solo funciona si el sitio ya está en HTTPS.

---

### 2. X-Content-Type-Options

**Qué hace:** Previene MIME-type sniffing.

```
X-Content-Type-Options: nosniff
```

**Protege contra:**
- Navegadores que "adivinen" el tipo de contenido
- Ejecución de scripts no intencionada
- Archivos ejecutados como diferentes tipos MIME

**Ejemplo de ataque prevenido:**
Un atacante sube un archivo `malicioso.jpg` que en realidad es JavaScript. Sin este header, algunos navegadores podrían ejecutarlo como script.

---

### 3. X-Frame-Options

**Qué hace:** Previene que tu sitio sea embebido en iframes.

```
X-Frame-Options: DENY
```

**Opciones:**
- `DENY`: Nunca permitir iframes
- `SAMEORIGIN`: Permitir solo en el mismo dominio
- `ALLOW-FROM uri`: Permitir solo desde URI específica (deprecated)

**Protege contra:**
- **Clickjacking:** Atacante crea iframe invisible con tu sitio y engaña al usuario para que haga clic.

**Nota:** Este header es legacy, pero aún útil. La versión moderna es `frame-ancestors` en CSP.

---

### 4. X-XSS-Protection

**Qué hace:** Habilita protección XSS integrada del navegador.

```
X-XSS-Protection: 1; mode=block
```

**Parámetros:**
- `1`: Habilitar protección
- `mode=block`: Bloquear página en lugar de sanitizar

**Nota:** Este header es legacy (navegadores modernos ignoran). CSP es el reemplazo moderno.

---

### 5. Referrer-Policy

**Qué hace:** Controla qué información del referrer se envía.

```
Referrer-Policy: strict-origin-when-cross-origin
```

**Comportamiento:**
- Mismo origen: Envía URL completa
- Cross-origin HTTPS→HTTPS: Solo envía origen (dominio)
- Cross-origin HTTPS→HTTP: No envía nada
- Cross-origin HTTP→cualquier: Solo envía origen

**Protege contra:**
- Leaked de información sensible en URLs
- Tracking no deseado

---

### 6. Permissions-Policy

**Qué hace:** Controla qué APIs del navegador pueden usarse.

```
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
```

**Políticas actuales:**
- `camera=()`: Deshabilitar cámara
- `microphone=()`: Deshabilitar micrófono
- `geolocation=()`: Deshabilitar geolocalización
- `interest-cohort=()`: Bloquear FLoC (tracking de Google)

**Otras opciones útiles:**
```
payment=()              # Desabilitar Payment API
usb=()                  # Deshabilitar USB API
magnetometer=()         # Deshabilitar magnetómetro
gyroscope=()            # Deshabilitar giroscopio
accelerometer=()        # Deshabilitar acelerómetro
```

**Habilitar para tu origen:**
```
camera=(self)           # Permitir cámara solo en tu dominio
```

---

### 7. Content-Security-Policy (CSP) ⭐ MÁS IMPORTANTE

**Qué hace:** Define qué recursos pueden cargarse y desde dónde.

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https: http:;
  ...
```

#### Directivas Implementadas

| Directiva | Configuración | Propósito |
|-----------|---------------|-----------|
| `default-src` | `'self'` | Fallback por defecto: solo mismo origen |
| `script-src` | `'self' 'unsafe-inline' 'unsafe-eval' Google` | Scripts desde tu dominio + Google Analytics/GTM |
| `style-src` | `'self' 'unsafe-inline'` | Estilos inline necesarios para Tailwind |
| `img-src` | `'self' data: https: http:` | Imágenes desde cualquier HTTPS (Freepik, Directus, etc.) |
| `font-src` | `'self' data:` | Fuentes locales o data URIs |
| `connect-src` | `'self' Directus Google Telegram` | APIs permitidas |
| `frame-src` | `'self' Google` | iframes solo de Google (Maps, etc.) |
| `frame-ancestors` | `'none'` | NO permitir ser embebido en iframe |
| `object-src` | `'none'` | NO permitir Flash/plugins |
| `base-uri` | `'self'` | Tag `<base>` solo mismo origen |
| `form-action` | `'self' Google` | Forms solo a tu dominio o Google |
| `upgrade-insecure-requests` | (producción) | Upgrade HTTP→HTTPS automáticamente |

#### Palabras Clave Especiales

- `'self'`: Mismo origen (protocolo + dominio + puerto)
- `'none'`: Nada permitido
- `'unsafe-inline'`: Permite estilos/scripts inline (⚠️ menos seguro, pero necesario para frameworks modernos)
- `'unsafe-eval'`: Permite `eval()` (⚠️ necesario para GTM y algunas librerías)
- `data:`: Permite data URIs
- `https:`: Cualquier origen HTTPS
- `http:`: Cualquier origen HTTP (⚠️ menos seguro)

#### Protege contra:

- XSS (Cross-Site Scripting) ✅
- Inyección de código malicioso ✅
- Carga de recursos no autorizados ✅
- Clickjacking (via `frame-ancestors`) ✅
- Man-in-the-Middle (via `upgrade-insecure-requests`) ✅

---

### 8. Cross-Origin-Embedder-Policy (COEP)

**Qué hace:** Controla cómo se cargan recursos cross-origin.

```
Cross-Origin-Embedder-Policy: unsafe-none
```

**Opciones:**
- `unsafe-none`: No requiere CORS explícito (valor actual)
- `require-corp`: Requiere `Cross-Origin-Resource-Policy` en todos los recursos

**Nota:** Configurado como `unsafe-none` porque imágenes de terceros (Freepik) no envían CORP.

---

### 9. Cross-Origin-Opener-Policy (COOP)

**Qué hace:** Aísla el contexto de navegación de otros sitios.

```
Cross-Origin-Opener-Policy: same-origin-allow-popups
```

**Opciones:**
- `same-origin`: Solo mismo origen puede acceder
- `same-origin-allow-popups`: Permite popups (como OAuth)
- `unsafe-none`: Sin aislamiento

**Protege contra:**
- Sitios maliciosos accediendo a `window.opener`
- XS-Leaks (cross-site leaks)

---

### 10. Cross-Origin-Resource-Policy (CORP)

**Qué hace:** Controla qué orígenes pueden cargar este recurso.

```
Cross-Origin-Resource-Policy: cross-origin
```

**Opciones:**
- `same-origin`: Solo mismo origen
- `same-site`: Mismo sitio (incluye subdominios)
- `cross-origin`: Cualquier origen (valor actual)

**Nota:** Configurado como `cross-origin` para permitir imágenes en CDNs.

---

## Verificación

### Herramientas Online

1. **SecurityHeaders.com**
   ```
   https://securityheaders.com/?q=https://contuhogar.com
   ```

2. **Mozilla Observatory**
   ```
   https://observatory.mozilla.org/analyze/contuhogar.com
   ```

3. **CSP Evaluator (Google)**
   ```
   https://csp-evaluator.withgoogle.com/
   ```

### Verificación Manual con cURL

```bash
curl -I https://contuhogar.com
```

Busca todos los headers:
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
Content-Security-Policy: default-src 'self'; script-src ...
```

### Verificación en DevTools

1. Abre DevTools (F12)
2. Ve a **Network**
3. Recarga la página
4. Click en la primera request (documento HTML)
5. Busca en **Response Headers**

---

## Calificación Esperada

Con estos headers, deberías obtener:

- **SecurityHeaders.com:** A o A+
- **Mozilla Observatory:** B+ a A
- **CSP Evaluator:** Warnings por `unsafe-inline` y `unsafe-eval` (inevitable con Tailwind/GTM)

---

## Ajustes para Casos Específicos

### Si agregas un nuevo dominio externo (ej: Stripe)

Actualiza CSP en `server/plugins/securityHeaders.ts`:

```typescript
const cspDirectives = [
  // ...
  "script-src 'self' 'unsafe-inline' https://js.stripe.com",
  "connect-src 'self' https://api.stripe.com",
  "frame-src 'self' https://js.stripe.com",
  // ...
];
```

### Si quieres embedder tu sitio en otro dominio

Cambia `frame-ancestors`:

```typescript
"frame-ancestors 'self' https://ejemplo.com",
```

O en X-Frame-Options:

```typescript
headers.setHeader("X-Frame-Options", "ALLOW-FROM https://ejemplo.com");
```

### Si necesitas CORS más estricto

Para APIs públicas:

```typescript
// server/plugins/securityHeaders.ts
if (event.path?.startsWith("/api/")) {
  headers.setHeader("Cross-Origin-Resource-Policy", "same-origin");
}
```

---

## CSP en Modo Report-Only

Para testing sin romper el sitio:

```typescript
// Cambiar esta línea:
headers.setHeader("Content-Security-Policy", cspDirectives);

// Por esta:
headers.setHeader("Content-Security-Policy-Report-Only", cspDirectives);
```

Luego monitorea la consola del navegador para ver qué se bloquearía.

---

## Problemas Comunes

### 1. Imágenes externas no cargan

**Síntoma:** Imágenes de Freepik/URLs externas aparecen rotas.

**Solución:** Verifica que `img-src` incluya `https:`:
```typescript
"img-src 'self' data: https: http:",
```

### 2. Google Analytics/GTM no funciona

**Síntoma:** No se rastrean eventos, errores en consola.

**Solución:** Agrega dominios de Google a `script-src` y `connect-src`:
```typescript
"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
"connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
```

### 3. Estilos inline no funcionan

**Síntoma:** Componentes Vue pierden estilos, Tailwind no aplica.

**Solución:** Requiere `'unsafe-inline'` en `style-src` (inevitable con frameworks modernos):
```typescript
"style-src 'self' 'unsafe-inline'",
```

### 4. Formularios no envían a API externa

**Síntoma:** Error al enviar form a dominio externo.

**Solución:** Agrega dominio a `form-action`:
```typescript
"form-action 'self' https://api-externa.com",
```

---

## Compatibilidad con Navegadores

| Header | Chrome | Firefox | Safari | Edge |
|--------|--------|---------|--------|------|
| HSTS | ✅ | ✅ | ✅ | ✅ |
| X-Content-Type-Options | ✅ | ✅ | ✅ | ✅ |
| X-Frame-Options | ✅ | ✅ | ✅ | ✅ |
| X-XSS-Protection | ⚠️ (ignorado) | ⚠️ (ignorado) | ⚠️ (ignorado) | ⚠️ (ignorado) |
| Referrer-Policy | ✅ | ✅ | ✅ | ✅ |
| Permissions-Policy | ✅ | ⚠️ (parcial) | ⚠️ (parcial) | ✅ |
| CSP | ✅ | ✅ | ✅ | ✅ |
| COEP | ✅ | ✅ | ⚠️ (parcial) | ✅ |
| COOP | ✅ | ✅ | ✅ | ✅ |
| CORP | ✅ | ✅ | ✅ | ✅ |

---

## Mejores Prácticas

1. **Empieza con CSP en Report-Only**
   - Implementa sin bloquear
   - Monitorea violations
   - Ajusta política
   - Activa enforcement

2. **Usa nonces para scripts inline**
   ```html
   <script nonce="random-string-per-request">
     // código inline
   </script>
   ```
   ```typescript
   "script-src 'self' 'nonce-random-string-per-request'",
   ```

3. **Minimiza 'unsafe-inline' y 'unsafe-eval'**
   - Ideal: eliminarlos completamente
   - Realidad: necesarios para muchas librerías

4. **Actualiza CSP cuando agregues servicios**
   - Nueva CDN de fonts → `font-src`
   - Nueva API → `connect-src`
   - Nuevo iframe → `frame-src`

5. **Testea en todos los navegadores**
   - Chrome
   - Firefox
   - Safari
   - Mobile browsers

---

## Monitoreo de Violaciones CSP

Puedes recibir reportes de violaciones:

```typescript
const cspDirectives = [
  // ... otras directivas
  "report-uri https://tu-dominio.com/api/csp-report",
  "report-to csp-endpoint",
];
```

Endpoint de ejemplo:

```typescript
// server/api/csp-report.post.ts
export default defineEventHandler(async (event) => {
  const report = await readBody(event);
  console.error("[CSP Violation]", JSON.stringify(report, null, 2));

  // Enviar a servicio de logging (Sentry, LogRocket, etc.)

  return { ok: true };
});
```

---

## Resumen

✅ **10 security headers implementados**
✅ **Protección contra XSS, Clickjacking, MIME sniffing**
✅ **CSP configurado para Nuxt + Google Analytics + GTM**
✅ **Compatible con imágenes externas (Freepik, Directus)**
✅ **HTTPS forzado en producción**
✅ **Aislamiento de contexto cross-origin**

⚠️ **Trade-offs necesarios:**
- `unsafe-inline` para Tailwind CSS y Vue
- `unsafe-eval` para Google Tag Manager
- `https:` amplio para imágenes de terceros

---

**Última actualización:** Noviembre 2025
**Versión:** 1.0.0
