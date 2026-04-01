# HANDOFF — ContuHogar.com

**Fecha de cierre:** 31 de marzo de 2026 <br>
**Desarrollado por:** Israel Senior / [Neskeep](https://neskeep.com/) <br>
**Entregado a:** ContuHogar / Fernando Muñóz Tatar y Alejandra Pérez <br>

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
17. [Servicio de Estrategia de Redes Sociales](#17-servicio-de-estrategia-de-redes-sociales)
18. [Descargo de Responsabilidad y Condiciones Post-Entrega](#18-descargo-de-responsabilidad-y-condiciones-post-entrega)
19. [Firmas](#firmas)

---

## 1. Resumen Ejecutivo

ContuHogar.com es un sitio web institucional para un broker de crédito hipotecario especializado en colombianos residentes en el exterior. El proyecto fue desarrollado por Israel Senior / Neskeep según la propuesta escalonada original.

**Estado actual:** En producción, estable en [contuhogar.com](https://contuhogar.com) <br>
**Fecha de cierre de labores:** 31 de marzo de 2026

### Qué se construyó

Se desarrolló un sitio web completo con:

- Website institucional con SSR (renderizado del lado del servidor) e ISR (caché incremental por ruta)
- CMS headless con Directus para gestión del contenido dinámico en las colecciones establecidas (blog, servicios, equipo, FAQs, testimonios, leads, landing pages)
- Simulador de crédito interactivo con 5 pasos y generación de carta de preaprobación en PDF (client-side)
- Sistema de captación de leads con seguridad multicapa y notificaciones en tiempo real
- Tracking de conversiones completo: GA4 + GTM + Meta Pixel + Meta CAPI (server-side)
- Blog dinámico gestionado desde CMS
- Landing pages dinámicas por servicio y mercado (`/lp/:servicio/:mercado`)
- Newsletter integrado con endpoint dedicado
- Arreglos de DNS en dominios `.com` y `.net` vía GoDaddy
- Migración de cuentas de correo a Google Workspace
- Arreglos y ajustes vectoriales del logo corporativo

---

## 2. Entregables Completados

| Entregable | Estado | Notas |
|------------|--------|-------|
| Diseño moderno y responsive | ✅ Completado | Tailwind CSS 4, mobile-first |
| Contenido dinámico con CMS (colecciones establecidas) | ✅ Completado | Directus headless CMS |
| Estructura SEM (Meta Pixel + CAPI, GA4, GTM) | ✅ Completado | Implementado 2026-02-11 |
| Blog con contenido gestionable | ✅ Completado | Posts y categorías desde Directus |
| CRM integrado (Directus como repositorio de leads) | ✅ Completado | Colección `leads` en Directus |
| SEO y analítica | ✅ Completado | Sitemap, robots.txt, JSON-LD, GA4 |
| Simulador de crédito hipotecario | ✅ Completado | Wizard 5 pasos + PDF carta preaprobación |
| Newsletter | ✅ Completado | Suscripción con endpoint dedicado |
| Landing pages dinámicas por servicio y mercado | ✅ Completado | `/lp/:servicio/:mercado` desde Directus |
| Formulario de contacto con seguridad multicapa | ✅ Completado | 6 capas de seguridad |
| Arreglos DNS (dominios .com y .net) | ✅ Completado | Configuración en GoDaddy |
| Migración cuentas de correo a Google Workspace | ✅ Completado | admin@ y contudigital@ |
| Arreglos y ajustes vectoriales del logo | ✅ Completado | Logo.svg e Isotipo.svg |

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
| Hosting (sitio web) | Vercel (auto-deploy desde GitHub `main`) |
| Servidor VPS | Vultr — IP `45.77.95.16` |
| Directus CMS | Docker en VPS — `admin.contuhogar.com` |
| Base de datos | Supabase (PostgreSQL) — usada por Directus |
| Email transaccional | Resend (`gerenciacomercial@contuhogar.com`) |
| Dominio | GoDaddy (`contuhogar.com` + `contuhogar.net`) |

### Librerías Clave

| Librería | Versión | Uso |
|----------|---------|-----|
| @directus/sdk | 20.1.0 | SDK para Directus CMS |
| zod | 4.1.12 | Validación de datos server-side |
| resend | 6.0+ | Envío de emails transaccionales |
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
| `/contacto` | Formulario de contacto | SSR (sin caché) |
| `/faqs` | Preguntas frecuentes | 24 horas |
| `/servicios` | Lista de servicios | 24 horas |
| `/servicios/:slug` | Servicio individual | 24 horas |
| `/blog` | Lista de artículos | 1 hora |
| `/blog/:slug` | Artículo individual | 1 hora |
| `/terminos-condiciones` | Términos y condiciones | SSR |
| `/politica-privacidad` | Política de privacidad | SSR |

### Páginas Dinámicas / Especiales

| Ruta | Descripción | Notas |
|------|-------------|-------|
| `/simulador/credito` | Simulador de crédito (5 pasos) | Noindex, layout propio |
| `/simulador/credito/carta-preaprobacion` | Carta de preaprobación PDF | Noindex |
| `/lp/:service/:market` | Landing pages dinámicas | Ej: `/lp/credito-hipotecario/espana` |
| `/servicios/:service/:market` | Servicio por mercado | |

### Rutas del Servidor (API)

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/contact` | POST | Guardar lead + notificaciones |
| `/api/newsletter/subscribe` | POST | Suscripción newsletter |
| `/api/simulador/save` | POST | Guardar simulación |
| `/api/simulador/session/start` | POST | Iniciar sesión de simulador |
| `/api/simulador/session/update` | POST | Actualizar sesión |
| `/api/simulador/session/complete` | POST | Completar sesión |
| `/api/webhooks/notify` | POST | Receptor de notificaciones desde Directus Flows |
| `/sitemap.xml` | GET | Sitemap dinámico |

---

## 5. Credenciales y Accesos

> **IMPORTANTE:** Las credenciales completas se encuentran en el documento PDF entregado por separado.
>
> Las credenciales del sitio web permanecen bajo el desarrollo de Neskeep como desarrollador del proyecto hasta la entrega formal definida en el acuerdo de pagos (sección 16).
>
> **Recomendación de seguridad:** Cambiar TODAS las contraseñas y tokens inmediatamente después del handoff formal.

### Resumen de Servicios

| Servicio | URL / Acceso | Propósito |
|----------|--------------|-----------|
| **Vercel** | vercel.com | Hosting del sitio web (auto-deploy desde GitHub) |
| **Vultr** | vultr.com | Servidor VPS (IP: 45.77.95.16) — aloja Directus CMS |
| **Directus CMS** | admin.contuhogar.com | CMS, CRM de leads, gestión de contenido dinámico |
| **GitHub** | github.com/contuhogar/contuhogar.com | Repositorio del código fuente |
| **Resend** | resend.com | Envío de emails transaccionales |
| **Gmail Admin** | admin@contuhogar.net | Cuenta administrativa Google Workspace |
| **Gmail Marketing** | contudigital@contuhogar.net | Cuenta de redes sociales e Instagram |
| **GoDaddy** | godaddy.com | Gestión de dominios (`contuhogar.com` y `.net`) |
| **Supabase** | supabase.com | Base de datos PostgreSQL (usada por Directus) |
| **Cloudflare Turnstile** | dash.cloudflare.com | CAPTCHA de formularios |
| **Meta Business** | business.facebook.com | Meta Pixel y Conversions API |
| **Google Cloud (GCP)** | console.cloud.google.com | Proyecto `cth-web` — integraciones Google |

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

### Google Cloud / OAuth Apps

Proyecto GCP: `cth-web`

| Client | ID | Uso |
|--------|----|-----|
| GSC client | `163005177633-452pj10h8vf5lnoi3rvui2dvdnljo4bi` | Google Search Console OAuth |
| GA4 client | `163005177633-lpj5qd20j50k3ud0736a6pbfravo56m4` | Google Analytics OAuth |

---

## 7. Variables de Entorno

El archivo `.env.example` en el repositorio contiene la plantilla completa. El archivo `.env` real está configurado en Vercel (dashboard → Settings → Environment Variables) y **no está en el repositorio**.

| Variable | Requerida | Propósito |
|----------|-----------|-----------|
| `DIRECTUS_URL` | **Sí** | URL de la instancia Directus (`https://admin.contuhogar.com`) |
| `DIRECTUS_ADMIN_TOKEN` | **Sí** | Token de admin para operaciones server-side |
| `DIRECTUS_PUBLIC_TOKEN` | **Sí** | Token de solo lectura para el browser |
| `RESEND_API_KEY` | **Sí** | API key de Resend para emails transaccionales |
| `TELEGRAM_BOT_TOKEN` | No | Token del bot de Telegram para notificaciones |
| `TELEGRAM_CHAT_ID` | No | ID del chat/canal de Telegram |
| `META_PIXEL_ID` | No | ID del Meta Pixel (`795618300241488`) |
| `META_CAPI_ACCESS_TOKEN` | No | Token de acceso para Meta Conversions API |
| `WEBHOOK_SECRET` | No | Secreto para autenticar webhooks entrantes desde Directus |
| `ENABLE_LANDING_LINKS` | No | `true` para mostrar links a landing pages en el sitio |

> **Nota:** NUNCA hacer commit del archivo `.env`. Ya está en `.gitignore`.

---

## 8. CMS — Directus

### Acceso

- **URL Admin:** [admin.contuhogar.com](https://admin.contuhogar.com)
- Directus está instalado con Docker directamente en el VPS de Vultr (`45.77.95.16`)
- La base de datos es Supabase (PostgreSQL externo)

### Qué gestiona Directus

Directus gestiona únicamente el **contenido dinámico** del sitio, organizado en las siguientes colecciones:

| Colección | Descripción | Quién la gestiona |
|-----------|-------------|------------------|
| `posts` | Artículos del blog | Equipo de contenido |
| `blog_categories` | Categorías del blog | Equipo de contenido |
| `servicios` | Servicios ofrecidos | Administrador |
| `leads` | Leads del formulario de contacto y simulador | Equipo comercial |
| `simulaciones_credito` | Resultados del simulador de crédito | Solo lectura |
| `simulador_sesiones` | Sesiones de uso del simulador | Solo lectura |
| `team` | Miembros del equipo (página Nosotros) | Administrador |
| `faqs` | Preguntas frecuentes | Administrador |
| `testimonials` | Testimonios de clientes | Administrador |
| `bank_logos` | Logos de bancos aliados | Administrador |
| `landing_pages` | Contenido de landing pages dinámicas | Equipo de marketing |

### Cómo funcionan los Directus Flows (Notificaciones)

Los **Flows** son automatizaciones configuradas dentro de Directus que se disparan ante eventos en las colecciones. El proyecto tiene el siguiente flujo implementado:

**Trigger:** Cuando se crea un nuevo item en `leads` o `simulaciones_credito`

**Acción:** Directus hace un `HTTP Request` (webhook) al endpoint `/api/webhooks/notify` del sitio, enviando los datos del nuevo registro junto con un `WEBHOOK_SECRET` en el header de autorización.

**El endpoint `/api/webhooks/notify` recibe la llamada y:**
1. Valida el secret de autorización
2. Identifica si viene de `leads` o de `simulaciones_credito`
3. Dispara en paralelo (`Promise.allSettled`):
   - **Email** vía Resend a `gerenciacomercial@contuhogar.com` (con BCC a `contudigital@contuhogar.net`)
   - **Mensaje Telegram** al canal configurado
4. Los errores de notificación son silenciosos — no afectan al usuario final

**Para configurar o revisar los Flows:**
→ Directus Admin → Settings → Flows

**Para que funcionen correctamente se necesitan estas variables de entorno activas:**
- `WEBHOOK_SECRET` (coincide entre Directus Flow y el `.env` del sitio)
- `RESEND_API_KEY`
- `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` (opcionales)

### Cómo Gestionar Contenido

**Publicar un artículo de blog:**
1. Ingresar a admin.contuhogar.com
2. Ir a `posts` → "Create Item"
3. Completar: título, slug, contenido (rich text), imagen destacada, categoría
4. Cambiar status de `draft` a `published`
5. El sitio actualiza la caché ISR en máximo 1 hora (o hacer redeploy en Vercel para actualización inmediata)

**Ver leads y simulaciones:**
1. Colección `leads` — todos los contactos del formulario y simulador
2. Colección `simulaciones_credito` — resultados detallados del simulador
3. Los registros incluyen: nombre, email, teléfono, país, servicio de interés, datos financieros y fecha

**Actualizar equipo (Nosotros):**
1. Colección `team` → subir foto, nombre, cargo → publicar
2. Aparece en `/nosotros` automáticamente

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

- Persistencia de estado en `localStorage` (solo datos no sensibles)
- Generación de carta de preaprobación en PDF completamente en el navegador (html-to-image + jsPDF)
- Pre-relleno automático del formulario de contacto desde los resultados
- Session tracking guardado en Directus (`simulador_sesiones`)
- Creación automática de lead al completar el paso 5

---

## 10. Seguridad Implementada

El formulario de contacto y los endpoints públicos tienen 5 capas de protección:

| Capa | Tecnología | Descripción |
|------|-----------|-------------|
| 1 | Honeypot fields | Campos ocultos (estáticos y dinámicos con nombre rotativo por hora) — los bots los llenan, los humanos no |
| 2 | Validación de comportamiento | Mide interacciones reales del usuario: mínimo 2 campos distintos tocados, 3 interacciones, 1.5 segundos de actividad |
| 3 | Rate limiting | 8 requests / 5 minutos por IP (in-memory) |
| 4 | Bot Detection | FingerprintJS BotD detecta browsers automatizados |
| 5 | Validación Zod | Esquema estricto server-side en todos los endpoints |

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

- El simulador (`/simulador/*`) está marcado con `noindex` — no aparece en Google (intencional)
- El sitemap incluye posts y servicios dinámicos desde Directus y se actualiza automáticamente

---

## 12. Assets de Marca

### Ubicación

Los assets de marca están en la carpeta `ASSETS/Branding/` (entregados fuera del repositorio git):

| Asset | Archivo | Formato |
|-------|---------|---------|
| Logo principal (ajustado vectorialmente) | `Logo.svg` | SVG vectorial |
| Isotipo (icono) | `Isotipo.svg` | SVG vectorial |
| Tipografía | `demo-tipografia.pdf` | PDF referencia |

### Colores Corporativos

Los tokens de color están definidos en `assets/css/main.css` y en el config de Tailwind (`nuxt.config.ts`). La paleta usa tonos de azul/verde que representan confianza y finanzas.

### Assets en el Repositorio

- `public/og-image.jpg` — Imagen Open Graph para redes sociales
- `public/logos/` — Logos de bancos aliados (WebP)
- `public/team/` — Fotos del equipo
- `public/images/` — Imágenes del hero y secciones generales
- `public/*.avif` — Imágenes de servicios en formato AVIF (alta compresión)

---

## 13. Base de Leads Actual

A la fecha de cierre (31/03/2026), la base de leads capturados incluye:

- Leads del formulario de contacto (`/contacto`)
- Leads generados desde el simulador de crédito
- Leads capturados por landing pages

Todos los leads están almacenados en Directus CMS (colección `leads`) con los siguientes datos por registro:
- Nombre completo, email, teléfono con código de país
- País de residencia, servicio de interés, mensaje
- Fecha de creación, componente de origen (`source_component`)
- Datos del simulador adjuntos cuando aplica (`simuladorInfo`)

Los leads actuales a la fecha de cierre son parte del convenio comercial vigente entre **Israel Senior** y ContuHogar, según lo estipulado en el acuerdo de pagos (sección 16).

---

## 14. Guía de Mantenimiento para Nueva Agencia

### Deployment

El sitio está en **Vercel** con auto-deploy desde la rama `main` de GitHub:

1. Cualquier push a `main` dispara automáticamente un nuevo deploy en Vercel
2. Vercel construye el proyecto Nuxt y lo publica
3. Las variables de entorno están configuradas en el dashboard de Vercel (Settings → Environment Variables)
4. No se requiere acceso al servidor VPS para deployments del sitio web

**Directus CMS** corre por separado en Docker directamente en el VPS de Vultr y no forma parte del proceso de deploy del sitio.

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
4. La caché ISR se actualiza automáticamente en ~1 hora, o redeploy desde Vercel para inmediato

### Ver y Gestionar Leads

1. Acceder a [admin.contuhogar.com](https://admin.contuhogar.com)
2. Colección `leads` para ver todos los contactos
3. Colección `simulaciones_credito` para simulaciones completadas
4. Cada lead incluye: nombre, email, teléfono, país, servicio de interés, fecha, datos del simulador

### Notificaciones de Nuevos Leads

Las notificaciones están gestionadas vía **Directus Flows** (ver sección 8 para detalle completo):
- Email a `gerenciacomercial@contuhogar.com` via Resend
- Notificación en Telegram (si está configurado)
- Evento a Meta CAPI (Lead)

Si las notificaciones dejan de llegar, revisar:
1. Directus Admin → Settings → Flows — verificar que el Flow esté activo
2. Variables de entorno en Vercel — verificar `WEBHOOK_SECRET`, `RESEND_API_KEY`
3. Logs del sitio en Vercel dashboard → Functions → Logs

---

## 15. Issues Conocidos / Deuda Técnica

| Issue | Severidad | Descripción |
|-------|-----------|-------------|
| CSP con `unsafe-inline`/`unsafe-eval` | Media | Requerido por GTM y Meta Pixel. Ideal migrar a nonces en una iteración futura. |
| Rate limiting in-memory | Baja | No persiste entre reinicios. Para escalar a múltiples instancias, migrar a Redis. |
| Sin CSRF tokens explícitos | Baja | Los endpoints públicos están protegidos por honeypots, bot detection y rate limiting. Bajo riesgo. |
| SEO gaps menores | Baja | Falta `CollectionPage` schema en el blog. El simulador tiene `noindex` (intencional). |

---

## 16. Acuerdo de Pagos

> Esta sección es de referencia informativa sobre el acuerdo establecido entre Israel Senior y ContuHogar.

### Estructura de Pagos Acordada

| Tramo | Porcentaje | Condición |
|-------|-----------|-----------|
| Primer pago | 20% | Fecha pendiente de confirmación — Fernando Muñóz Tatar |
| Segundo pago | 30% | Contra entrega de credenciales a ContuHogar |
| Pagos restantes | 50% | A medida que se den desembolsos de leads actuales |

### Condición de Entrega de Credenciales

- Las credenciales del servidor, Directus y todos los servicios son entregadas a ContuHogar al recibir el 30% correspondiente
- El compromiso de Israel Senior es con ContuHogar como empresa
- **Plazo máximo para el 50% restante:** diciembre 2026

### Leads Actuales

- Los leads existentes a la fecha de cierre (31/03/2026) son parte del convenio vigente
- Los excedentes de conversión de estos leads corresponden a **Israel Senior** según el acuerdo
- Los nuevos leads generados post-handoff pertenecen completamente a ContuHogar

---

## 17. Servicio de Estrategia de Redes Sociales

### Estado del Servicio

A partir del mes de **febrero de 2026**, Israel Senior / Neskeep prestó a ContuHogar el servicio de **Estrategia de Redes Sociales** bajo una gestión mensual recurrente con un valor de **$450.000 COP / mes**.

| Concepto | Detalle |
|----------|---------|
| Servicio | Estrategia de redes sociales |
| Valor mensual | $450.000 COP |
| Inicio | Febrero 2026 |
| Estado de pagos | Al día a la fecha de cierre |
| Cierre del servicio | 31 de marzo de 2026 |

### Cierre

El servicio se da por terminado en la misma fecha que el proyecto web — **31 de marzo de 2026**. Los pagos correspondientes a los meses de febrero y marzo de 2026 se encuentran cancelados en su totalidad. No quedan saldos pendientes por este concepto.

---

## 18. Descargo de Responsabilidad y Condiciones Post-Entrega

### Alcance de la Entrega

Este documento formaliza el cierre de la relación de desarrollo y servicios entre **Israel Senior / Neskeep** y **ContuHogar**. A partir de la entrega formal de credenciales y la firma del presente documento:

1. Israel Senior / Neskeep queda exento de toda responsabilidad sobre el funcionamiento, disponibilidad, seguridad y continuidad del sitio web contuhogar.com y sus servicios asociados.
2. Cualquier modificación, intervención o configuración realizada por terceros (nueva agencia, personal interno u otros proveedores) sobre el código, infraestructura o servicios entregados, libera completamente a Israel Senior / Neskeep de responsabilidad sobre los resultados derivados.
3. La información y credenciales contenidas en este documento pasan a ser responsabilidad exclusiva de ContuHogar a partir del momento de su recepción.

### Servicios Futuros

Cualquier requerimiento, consulta técnica, soporte, ajuste o desarrollo adicional solicitado a Israel Senior / Neskeep **con posterioridad a la firma de este documento** será considerado un servicio nuevo e independiente, sujeto a cotización y facturación conforme a las tarifas vigentes de Neskeep en el momento de la solicitud.

Esto incluye, de manera enunciativa y no limitativa:
- Corrección de errores o bugs introducidos por terceros
- Actualizaciones de dependencias o framework
- Nuevas funcionalidades o páginas
- Soporte técnico o consultoría
- Capacitación a nuevo personal o agencia
- Cualquier intervención sobre el servidor, CMS o servicios de terceros

---

## Firmas

Al suscribir este documento, las partes declaran haber leído, comprendido y aceptado la totalidad de su contenido, incluidos los entregables, el estado de pagos, el descargo de responsabilidad y las condiciones post-entrega aquí establecidas.

<br>

**Por ContuHogar**

_______________________________________________
Fernando Muñóz Tatar
Director / Representante Legal — ContuHogar
Fecha: ______ / ______ / 2026

<br>

_______________________________________________
Alejandra Pérez
Representante — ContuHogar
Fecha: ______ / ______ / 2026

<br>
<br>

**Por Neskeep / Proveedor**

_______________________________________________
Israel Senior
Desarrollador — Neskeep
Fecha: ______ / ______ / 2026

---

*Documento preparado por Israel Senior / Neskeep — 31 de marzo de 2026*
*Web: [neskeep.com](https://neskeep.com/)*
