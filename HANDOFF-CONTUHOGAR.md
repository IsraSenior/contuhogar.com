# HANDOFF — ContuHogar.com

**Fecha de cierre:** 31 de marzo de 2026
**Desarrollado por:** [Neskeep](https://neskeep.com/) — Israel Senior
**Entregado a:** ContuHogar / Fernando Muñóz Tatar

---

## Tabla de Contenidos

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Entregables Completados](#2-entregables-completados)
3. [Stack Técnico](#3-stack-técnico)
4. [Arquitectura de URLs y Páginas](#4-arquitectura-de-urls-y-páginas)
5. [Credenciales y Accesos](#5-credenciales-y-accesos)
6. [Tracking y Analytics](#6-tracking-y-analytics)
7. [Variables de Entorno](#7-variables-de-entorno)
8. [CMS — Directus](#8-cms--directus)
9. [Simulador de Crédito](#9-simulador-de-crédito)
10. [Seguridad Implementada](#10-seguridad-implementada)
11. [SEO](#11-seo)
12. [Assets de Marca](#12-assets-de-marca)
13. [Base de Leads Actual](#13-base-de-leads-actual)
14. [Guía de Mantenimiento para Nueva Agencia](#14-guía-de-mantenimiento-para-nueva-agencia)
15. [Issues Conocidos / Deuda Técnica](#15-issues-conocidos--deuda-técnica)
16. [Acuerdo de Pagos](#16-acuerdo-de-pagos)

---

## 1. Resumen Ejecutivo

ContuHogar.com es una plataforma web full-stack para asesoría de crédito habitacional dirigida a colombianos en el exterior. El proyecto fue desarrollado por Neskeep según la propuesta escalonada original de Zunami.

**Estado actual:** En producción, estable en [contuhogar.com](https://contuhogar.com)
**Fecha de cierre de labores:** 31 de marzo de 2026

### Qué se construyó

Se desarrolló un sitio web completo con:

- Plataforma institucional con SSR (renderizado del lado del servidor) e ISR (caché incremental por ruta)
- CMS headless con Directus para gestión total de contenido sin código
- Simulador de crédito interactivo con 5 pasos y generación de carta de preaprobación en PDF
- Sistema de captación de leads con seguridad multicapa y notificaciones en tiempo real
- Tracking de conversiones completo: GA4 + GTM + Meta Pixel + Meta CAPI (server-side)
- Blog dinámico gestionado desde CMS
- Landing pages dinámicas por servicio y mercado
- Newsletter integrado
- CRM básico (Directus como repositorio de leads y simulaciones)

---

## 2. Entregables Completados

Comparativo contra la propuesta original de Zunami (`OLD/Propuesta Escalonada - ConTuHogar.pdf`):

| Entregable | Estado | Notas |
|------------|--------|-------|
| Diseño moderno y responsive | ✅ Completado | Tailwind CSS 4, mobile-first |
| Contenido dinámico con CMS | ✅ Completado | Directus headless CMS |
| Estructura SEM (Meta Pixel + CAPI, GA4, GTM) | ✅ Completado | Implementado 2026-02-11 |
| Blog con contenido gestionable | ✅ Completado | Posts, categorías desde Directus |
| CRM integrado | ✅ Completado | Directus como repositorio de leads |
| SEO y analítica | ✅ Completado | Sitemap, robots.txt, JSON-LD, GA4 |
| Simulador de crédito hipotecario | ✅ Completado | Wizard 5 pasos + PDF preaprobación |
| Newsletter | ✅ Completado | Suscripción con endpoint dedicado |
| Landing pages dinámicas | ✅ Completado | `/lp/:servicio/:mercado` desde CMS |
| Formulario de contacto seguro | ✅ Completado | 6 capas de seguridad |

---

## 3. Stack Técnico

### Frontend / Framework

| Tecnología | Versión | Rol |
|------------|---------|-----|
| Nuxt | 4.2.0 | Framework full-stack (SSR + ISR) |
| Vue.js | 3.5.22 | Framework UI progresivo |
| TypeScript | 5.0+ | Tipado estático |
| Tailwind CSS | 4.1.16 | Estilos utility-first |
| Pinia | 3.0+ | State management global |

### Backend / Infraestructura

| Componente | Valor |
|------------|-------|
| Servidor | Vultr VM — IP `45.77.95.16` |
| Deployment | Dokploy (auto-deploy desde GitHub `main`) |
| Base de datos | Supabase (PostgreSQL) |
| CMS | Directus (headless) en `admin.contuhogar.com` |
| Email transaccional | Resend |
| Dominio | GoDaddy (`contuhogar.com` + `contuhogar.net`) |

### Librerías Clave

| Librería | Versión | Uso |
|----------|---------|-----|
| @directus/sdk | 20.1.0 | SDK para Directus CMS |
| zod | 4.1.12 | Validación de datos server-side |
| resend | 6.0+ | Envío de emails |
| jsPDF + html-to-image | 4.0.0 / 1.11.13 | Generación de PDF client-side |
| @fingerprintjs/botd | — | Detección de bots |
| nuxt-gtag | 3.0.3 | Google Analytics 4 |
| @saslavik/nuxt-gtm | 0.1.3 | Google Tag Manager |

### Package Manager

**pnpm 9.15.0** — especificado en `package.json`. No usar `npm` ni `yarn`.

---

## 4. Arquitectura de URLs y Páginas

### Páginas Públicas

| Ruta | Descripción | Caché ISR |
|------|-------------|-----------|
| `/` | Homepage | 1 hora |
| `/nosotros` | Página Sobre Nosotros | 24 horas |
| `/contacto` | Formulario de contacto | Sin caché (SSR) |
| `/faqs` | Preguntas frecuentes | 24 horas |
| `/servicios` | Lista de servicios | 24 horas |
| `/servicios/:slug` | Servicio individual | 24 horas |
| `/blog` | Lista de artículos | 1 hora |
| `/blog/:slug` | Artículo individual | 1 hora |
| `/terminos-condiciones` | Términos y condiciones | Sin caché |
| `/politica-privacidad` | Política de privacidad | Sin caché |

### Páginas Dinámicas / Especiales

| Ruta | Descripción | Notas |
|------|-------------|-------|
| `/simulador/credito` | Simulador de crédito (5 pasos) | Sin indexar, layout propio |
| `/simulador/credito/carta-preaprobacion` | Carta de preaprobación PDF | Sin indexar |
| `/lp/:service/:market` | Landing pages dinámicas | Ej: `/lp/credito-hipotecario/espana` |
| `/servicios/:service/:market` | Servicio por mercado | Variante de landing |

### Rutas del Servidor (API)

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/contact` | POST | Guardar lead + notificaciones |
| `/api/newsletter/subscribe` | POST | Suscripción newsletter |
| `/api/simulador/save` | POST | Guardar simulación |
| `/api/simulador/session/start` | POST | Iniciar sesión de simulador |
| `/api/simulador/session/update` | POST | Actualizar sesión |
| `/api/simulador/session/complete` | POST | Completar sesión |
| `/api/webhooks/notify` | POST | Notificaciones desde Directus Flows |
| `/sitemap.xml` | GET | Sitemap dinámico |

---

## 5. Credenciales y Accesos

> **IMPORTANTE:** Las credenciales completas están en el documento PDF:
> `CREDENTIALS/Creadentials-2025101520153427.pdf`
>
> **Recomendación de seguridad:** Cambiar TODAS las contraseñas y tokens inmediatamente después del handoff.

### Resumen de Servicios

| Servicio | URL / Acceso | Propósito |
|----------|--------------|-----------|
| **Vultr** | vultr.com | Servidor VPS (IP: 45.77.95.16) |
| **Dokploy** | `45.77.95.16:3000` | Panel de deployment y gestión de contenedores |
| **Directus CMS** | admin.contuhogar.com | CMS, CRM de leads, gestión de contenido |
| **Umami Analytics** | umami.contuhogar.com | Analytics propio (alternativa a GA4) |
| **GitHub** | github.com/contuhogar/contuhogar.com | Repositorio del código fuente |
| **Resend** | resend.com | Envío de emails transaccionales |
| **Gmail Admin** | admin@contuhogar.net | Cuenta administrativa Google |
| **Gmail Marketing** | contudigital@contuhogar.net | Cuenta de redes sociales e Instagram |
| **GoDaddy** | godaddy.com | Gestión de dominios (`contuhogar.com` y `.net`) |
| **Supabase** | supabase.com | Base de datos PostgreSQL (Directus) |
| **Cloudflare Turnstile** | dash.cloudflare.com | CAPTCHA de formularios |
| **Meta Business** | business.facebook.com | Meta Pixel y CAPI |
| **Google Cloud (GCP)** | console.cloud.google.com | Proyecto `cth-web` (GA4 + GSC OAuth) |

### Documentación Adicional de Credenciales

- `CREDENTIALS/CTH-meta-pixel-events.pdf` — Documentación de eventos Meta Pixel
- `CREDENTIALS/client_secret_*.json` — OAuth credentials para GSC y GA4

---

## 6. Tracking y Analytics

### Google Analytics 4

- **Property ID:** `G-1182NP1Z0D`
- **GTM Container:** `GTM-WMQV4M3F`
- Solo activo en `NODE_ENV=production` (no en desarrollo local)
- Inicialización diferida (defer) para mejor rendimiento

### Meta Pixel + Conversions API (CAPI)

- **Pixel ID:** `795618300241488`
- **Implementado:** 2026-02-11
- Arquitectura dual (client-side + server-side) para máxima confiabilidad:

| Capa | Eventos |
|------|---------|
| **Pixel automático** | PageView |
| **Pixel + CAPI (deduplicados)** | Lead, Subscribe, CompleteRegistration |
| **Client-side únicamente** | InitiateCheckout, Contact |
| **Custom (simulador)** | SimuladorStart, SimuladorStep, DownloadPDF |

- Deduplicación Pixel/CAPI implementada con `event_id` único por evento

### Umami Analytics

- **URL:** umami.contuhogar.com
- Analytics self-hosted como alternativa/complemento a GA4

### Google Cloud / OAuth Apps

Proyecto GCP: `cth-web`

| Client | ID | Uso |
|--------|----|-----|
| GSC client | `163005177633-452pj10h8vf5lnoi3rvui2dvdnljo4bi` | Google Search Console OAuth |
| GA4 client | `163005177633-lpj5qd20j50k3ud0736a6pbfravo56m4` | Google Analytics OAuth |

---

## 7. Variables de Entorno

El archivo `.env.example` contiene la plantilla completa. El archivo `.env` real está en el servidor (Dokploy) y NO está en el repositorio.

| Variable | Requerida | Propósito |
|----------|-----------|-----------|
| `DIRECTUS_URL` | **Sí** | URL de la instancia Directus (`https://admin.contuhogar.com`) |
| `DIRECTUS_ADMIN_TOKEN` | **Sí** | Token de admin para operaciones server-side |
| `DIRECTUS_PUBLIC_TOKEN` | **Sí** | Token de solo lectura para el cliente browser |
| `RESEND_API_KEY` | **Sí** | API key de Resend para emails transaccionales |
| `TURNSTILE_SITE_KEY` | **Sí** | Site key de Cloudflare Turnstile (CAPTCHA) |
| `TURNSTILE_SECRET_KEY` | **Sí** | Secret key de Cloudflare Turnstile |
| `TELEGRAM_BOT_TOKEN` | No | Token del bot de Telegram para notificaciones |
| `TELEGRAM_CHAT_ID` | No | ID del chat/canal de Telegram |
| `META_PIXEL_ID` | No | ID del Meta Pixel (795618300241488) |
| `META_CAPI_ACCESS_TOKEN` | No | Token de acceso para Meta Conversions API |
| `WEBHOOK_SECRET` | No | Secreto para verificar webhooks de Directus |
| `ENABLE_LANDING_LINKS` | No | `true` para mostrar links a landing pages en el sitio |

> **Nota:** NUNCA hacer commit del archivo `.env`. Ya está en `.gitignore`.

---

## 8. CMS — Directus

### Acceso

- **URL Admin:** [admin.contuhogar.com](https://admin.contuhogar.com)
- **Credenciales:** Ver `CREDENTIALS/Creadentials-2025101520153427.pdf`

### Colecciones Principales

| Colección | Descripción | Quién la gestiona |
|-----------|-------------|------------------|
| `posts` | Artículos del blog | Equipo de contenido |
| `blog_categories` | Categorías del blog | Equipo de contenido |
| `servicios` | Servicios ofrecidos | Administrador |
| `leads` | Leads del formulario de contacto | Equipo comercial |
| `simulaciones_credito` | Resultados del simulador | Solo lectura |
| `simulador_sesiones` | Sesiones de uso del simulador | Solo lectura |
| `team` | Miembros del equipo (página Nosotros) | Administrador |
| `faqs` | Preguntas frecuentes | Administrador |
| `testimonials` | Testimonios de clientes | Administrador |
| `bank_logos` | Logos de bancos aliados | Administrador |
| `landing_pages` | Contenido de landing pages dinámicas | Equipo de marketing |

### Cómo Gestionar Contenido

**Publicar un artículo de blog:**
1. Ingresar a admin.contuhogar.com
2. Ir a `posts` → "Create Item"
3. Completar: título, slug, contenido (rich text), imagen destacada, categoría
4. Cambiar status de `draft` a `published`
5. El sitio actualiza la caché ISR en máximo 1 hora (o hacer redeploy para actualización inmediata)

**Ver leads y simulaciones:**
1. Ir a colección `leads` para ver contactos del formulario
2. Ir a `simulaciones_credito` para ver resultados del simulador
3. Los registros incluyen nombre, email, teléfono, país, servicio de interés y fecha

**Actualizar equipo (Nosotros):**
1. Ir a colección `team`
2. Subir foto, nombre, cargo
3. Publicar — aparece en `/nosotros` automáticamente

---

## 9. Simulador de Crédito

### Flujo del Wizard (5 Pasos)

| Paso | Nombre | Datos recopilados |
|------|--------|------------------|
| 1 | Información Personal | Nombre, email, teléfono, fecha de nacimiento, tipo de crédito |
| 2 | Información del Inmueble | Valor del inmueble, monto solicitado, plazo en meses |
| 3 | Ingresos y Gastos | Ingresos fijos/variables, deducciones, obligaciones financieras |
| 4 | Elegibilidad | Status migratorio, reportes crediticios negativos |
| 5 | Resultados | Estado (Aprobado / Advertencia / Rechazado), cuota mensual, DTI, recomendaciones |

### Constantes Financieras

> **IMPORTANTE:** No modificar estas constantes sin revisión y aprobación del equipo financiero.

```
TASA_EA = 14%
TASA_MENSUAL = 1.0975%
EDAD_FINAL_MÁXIMA = 84 años
PLAZO = 12–240 meses (1–20 años)
DTI_MÁXIMO = 30%
LTV_HIPOTECARIO = 70%
LTV_LEASING = 80%
```

Ubicadas en: `composables/useSimuladorCalculations.ts`

### Funcionalidades del Simulador

- Persistencia de estado en `localStorage` (datos no sensibles)
- Generación de carta de preaprobación en PDF client-side (html-to-image + jsPDF)
- Pre-relleno automático del formulario de contacto desde los resultados
- Session tracking guardado en Directus (`simulador_sesiones`)
- Creación automática de lead al completar el paso 5

### Carta de Preaprobación

- Generada completamente en el navegador del usuario (sin servidor)
- Código: `composables/usePreApprovalPDF.ts` y `useDirectPDFDownload.ts`
- Página: `/simulador/credito/carta-preaprobacion`

---

## 10. Seguridad Implementada

El formulario de contacto (y endpoints públicos) tienen 6 capas de protección:

| Capa | Tecnología | Descripción |
|------|-----------|-------------|
| 1 | Cloudflare Turnstile | CAPTCHA invisible, verificado server-side |
| 2 | Honeypot fields | Campo oculto en formulario — los bots lo llenan, los humanos no |
| 3 | Validación de tiempo | Mínimo 3 segundos desde que se carga el formulario |
| 4 | Rate limiting | 8 requests / 5 minutos por IP (in-memory) |
| 5 | Bot Detection | FingerprintJS BotD detecta browsers automatizados |
| 6 | Validación Zod | Esquema estricto server-side en todos los endpoints |

### Security Headers

Configurados en `server/plugins/securityHeaders.ts`:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

---

## 11. SEO

### Implementación

| Componente | Ubicación | Estado |
|------------|-----------|--------|
| Meta tags (title, description, OG) | `composables/useSeo.ts` | ✅ Implementado |
| Structured data JSON-LD | `composables/useSeo.ts` | ✅ Implementado |
| Sitemap dinámico | `server/routes/sitemap.xml.ts` | ✅ Implementado |
| robots.txt | `public/robots.txt` | ✅ Implementado |
| Canonical URLs (absolutas) | `useSeo.ts` | ✅ Implementado |
| ISR caching por ruta | `nuxt.config.ts` routeRules | ✅ Implementado |

### Notas Importantes

- El simulador (`/simulador/*`) está marcado con `noindex` — no debe aparecer en Google
- El sitemap incluye posts y servicios dinámicos desde Directus
- Google Search Console: configurar con el OAuth client del proyecto `cth-web`

---

## 12. Assets de Marca

### Ubicación

Todos los assets de marca están en la carpeta `ASSETS/` (fuera del repositorio git):

| Asset | Ruta | Formato |
|-------|------|---------|
| Logo principal | `ASSETS/Branding/Logo.svg` | SVG vectorial |
| Isotipo (icono) | `ASSETS/Branding/Isotipo.svg` | SVG vectorial |
| Tipografía | `ASSETS/Branding/demo-tipografia.pdf` | PDF |

### Colores Corporativos

Los tokens de color están definidos en `assets/css/main.css` y el config de Tailwind (`nuxt.config.ts`). La paleta principal usa tonos de azul/verde que representan confianza y finanzas.

### Assets en el Repositorio

- `public/og-image.jpg` — Imagen Open Graph para redes sociales
- `public/logos/` — Logos de bancos aliados (WebP)
- `public/team/` — Fotos del equipo
- `public/images/` — Imágenes del hero y secciones generales
- `public/*.avif` — Imágenes de servicios en formato AVIF (alta compresión)

---

## 13. Base de Leads Actual

- **Archivo:** `BASE CONTUDIGITAL 2026 - MARZO (1).xlsx` (en la carpeta del proyecto, fuera del repo)
- Los leads actuales en este archivo son parte del **convenio comercial vigente** entre Neskeep y ContuHogar
- Los excedentes de conversión de estos leads están cubiertos por el acuerdo de pagos descrito en la sección 16
- Los nuevos leads generados post-handoff pertenecen completamente a ContuHogar
- Los leads también están almacenados en Directus CMS (`leads`) con todos los datos de contacto y seguimiento

---

## 14. Guía de Mantenimiento para Nueva Agencia

### Deployment

El proyecto usa **Dokploy** con auto-deploy desde la rama `main` de GitHub:

1. Cualquier push a `main` dispara automáticamente un nuevo deploy
2. Dokploy construye la imagen Docker y reemplaza el contenedor
3. No se requiere acceso SSH para deploys normales

**Fix conocido — si el sitio da error 404 después de un deploy:**
```bash
# Conectarse al servidor vía SSH y ejecutar:
docker system prune -a
# Luego redeploy desde Dokploy
```

### Comandos de Desarrollo Local

```bash
# Requisito: Node.js >= 18 y pnpm 9.15.0

# 1. Clonar repositorio
git clone https://github.com/contuhogar/contuhogar.com.git
cd contuhogar.com

# 2. Instalar dependencias
pnpm install

# 3. Configurar entorno
cp .env.example .env
# Editar .env con las credenciales reales

# 4. Iniciar servidor de desarrollo
pnpm dev
# → http://localhost:3000

# 5. Build de producción
pnpm build

# 6. Preview del build
pnpm preview
```

### Actualizar Dependencias

```bash
# Ver dependencias desactualizadas
pnpm outdated

# Actualizar dependencias menores/patch (seguro)
pnpm update

# ⚠️ Actualización de Nuxt o Vue requiere pruebas exhaustivas antes de deploy
```

### Comandos de Directus

```bash
pnpm directus:schema    # Exportar schema del CMS
pnpm directus:types     # Generar tipos TypeScript desde Directus
pnpm directus:snapshot  # Crear snapshot del schema
```

### Agregar Contenido al Blog

1. Acceder a [admin.contuhogar.com](https://admin.contuhogar.com)
2. Colección `posts` → "Create Item"
3. Completar campos requeridos: título, slug único, contenido, imagen, categoría, status = `published`
4. El caché ISR se actualiza automáticamente en ~1 hora

### Ver y Gestionar Leads

1. Acceder a [admin.contuhogar.com](https://admin.contuhogar.com)
2. Colección `leads` para ver todos los contactos
3. Colección `simulaciones_credito` para simulaciones completadas
4. Cada lead incluye: nombre, email, teléfono, país, servicio de interés, fecha, notas

### Notificaciones de Nuevos Leads

Las notificaciones de nuevos leads están configuradas vía **Directus Flows**:
- Email a `gerenciacomercial@contuhogar.com` (via Resend)
- Notificación en Telegram (si está configurado)
- Evento a Meta CAPI (Lead)

Si las notificaciones dejan de funcionar, revisar los Flows en Directus Admin → Settings → Flows.

---

## 15. Issues Conocidos / Deuda Técnica

Aspectos técnicos conocidos que la nueva agencia debería considerar:

| Issue | Severidad | Descripción |
|-------|-----------|-------------|
| CSP con `unsafe-inline`/`unsafe-eval` | Media | El Content Security Policy actual requiere estas directivas por dependencias de terceros (GTM, Meta Pixel). Ideal migrar a nonces. |
| Rate limiting in-memory | Baja | El rate limiting no persiste entre reinicios del servidor ni entre múltiples instancias. Para escalar, migrar a Redis. |
| Sin CSRF tokens explícitos | Baja | Los endpoints públicos usan Turnstile como protección. Bajo riesgo pero se podría fortalecer. |
| SEO gaps menores | Baja | Falta `CollectionPage` schema en blog, el simulador tiene `noindex` (intencional pero podría revisarse estratégicamente). |
| Landing pages sin git tracking | Baja | Los componentes `lp/` y la página `pages/lp/` fueron creados recientemente y están como "untracked" en git. |
| Plan de redes sociales | N/A | Archivos de plan de redes sociales (marzo 2026) generados pero no versionados en git. |

---

## 16. Acuerdo de Pagos

> Esta sección es de referencia informativa. El acuerdo completo fue establecido verbalmente y por escrito entre las partes.

### Estructura de Pagos Acordada

| Tramo | Porcentaje | Condición |
|-------|-----------|-----------|
| Primer pago | 20% | Fecha pendiente de confirmación (Fernando Muñóz Tatar) |
| Segundo pago | 30% | Contra entrega de credenciales (Israel Senior) con verificación de nueva agencia |
| Pagos restantes | 50% | A medida que se den desembolsos de leads actuales |

### Condición de Entrega de Credenciales

- Las credenciales del servidor, Directus y servicios son entregadas al recibir el 30% correspondiente
- La verificación debe ser realizada por la nueva agencia antes de confirmar el pago
- **Plazo máximo:** diciembre 2026 para los pagos restantes del 50%

### Leads Actuales

- Los leads existentes a la fecha de cierre (31/03/2026) son parte del convenio vigente
- Los excedentes de conversión de estos leads benefician a Neskeep según el acuerdo
- Los nuevos leads generados post-handoff pertenecen completamente a ContuHogar

---

## Archivos de Referencia

| Archivo | Descripción |
|---------|-------------|
| `CREDENTIALS/Creadentials-2025101520153427.pdf` | Credenciales completas de todos los servicios |
| `CREDENTIALS/CTH-meta-pixel-events.pdf` | Documentación de eventos del Meta Pixel |
| `CREDENTIALS/client_secret_*.json` | OAuth credentials GCP (GSC + GA4) |
| `ASSETS/Branding/` | Logo, isotipo y tipografía de marca |
| `BASE CONTUDIGITAL 2026 - MARZO (1).xlsx` | Base de leads activos (parte del convenio) |
| `OLD/Propuesta Escalonada - ConTuHogar.pdf` | Propuesta original de Zunami (referencia) |
| `.env.example` | Template de variables de entorno |
| `README.md` | Documentación técnica completa del proyecto |
| `.claude/context/` | Documentación modular técnica (para agencias/devs) |

---

*Documento preparado por Israel Senior / Neskeep — 31 de marzo de 2026*
*Para consultas técnicas post-handoff: [neskeep.com](https://neskeep.com/)*
