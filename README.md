# contuhogar.com

<div align="center">

![Nuxt 4](https://img.shields.io/badge/Nuxt-4.2.0-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue.js-3.5.22-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.16-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Directus](https://img.shields.io/badge/Directus-CMS-6644FF?style=for-the-badge&logo=directus&logoColor=white)

**Plataforma de asesoria financiera e inmobiliaria para colombianos en el exterior**

[Sitio Web](https://contuhogar.com) · [Reportar Bug](https://github.com/contuhogar/contuhogar.com/issues) · [Solicitar Feature](https://github.com/contuhogar/contuhogar.com/issues)

</div>

---

## Tabla de Contenidos

- [Sobre el Proyecto](#sobre-el-proyecto)
- [Tecnologias](#tecnologias)
- [Requisitos Previos](#requisitos-previos)
- [Instalacion](#instalacion)
- [Desarrollo](#desarrollo)
- [Produccion](#produccion)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Rutas de la Aplicacion](#rutas-de-la-aplicacion)
- [Integraciones](#integraciones)
- [Simulador de Credito](#simulador-de-credito)
- [Formulario de Contacto](#formulario-de-contacto)
- [Landing Pages](#landing-pages)
- [Scripts Disponibles](#scripts-disponibles)
- [Performance y Optimizacion](#performance-y-optimizacion)
- [Contribuir](#contribuir)
- [Changelog](#changelog)
- [Licencia](#licencia)

---

## Sobre el Proyecto

ContuHogar.com es una plataforma web que conecta a colombianos en el exterior con oportunidades de inversion inmobiliaria y financiera en Colombia. Ofrece:

- Asesoria personalizada en creditos hipotecarios
- Informacion sobre leasing habitacional
- Opciones de remodelacion y compra de cartera
- Gestion de declaracion de renta (ConTuRenta)
- Blog informativo sobre el mercado inmobiliario colombiano
- Sistema de contacto y generacion de leads
- **Simulador de credito interactivo** con evaluacion en 5 pasos
- **Landing pages dinamicas** por servicio y mercado
- **Newsletter** con suscripcion desde Directus

### Funcionalidades Principales

- **Simulador de Credito**: Wizard interactivo de 5 pasos para evaluar elegibilidad crediticia con calculos financieros en tiempo real (cuota mensual, DTI ratio, LTV, edad final)
- **Formularios de Contacto Optimizados**: Validacion Zod, honeypot anti-spam, deteccion automatica de pais por IP, formato de telefono dinamico segun pais, notificaciones via Directus Flows + webhook
- **Landing Pages Dinamicas**: Paginas por servicio y mercado (`/lp/credito-hipotecario/espana`) con contenido desde Directus
- **CMS Headless**: Integracion con Directus para gestion de contenido dinamico (blog, servicios, equipo, testimonios, landing pages)
- **Meta Pixel + CAPI**: Tracking de conversiones client-side y server-side
- **SEO Optimizado**: Meta tags, sitemap dinamico, robots.txt, JSON-LD structured data
- **Analytics**: Google Analytics 4 + Google Tag Manager (solo produccion)
- **SSR con ISR**: Renderizado del lado del servidor con Incremental Static Regeneration por ruta

---

## Tecnologias

### Core

- **[Nuxt 4.2.0](https://nuxt.com/)** - Framework Vue.js full-stack
- **[Vue 3.5.22](https://vuejs.org/)** - Framework JavaScript progresivo
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript con tipado estatico

### Styling

- **[Tailwind CSS 4.1.16](https://tailwindcss.com/)** - Framework CSS utility-first
- **[@tailwindcss/vite](https://tailwindcss.com/docs/installation/vite)** - Plugin de Vite para Tailwind

### State Management

- **[Pinia 3.0+](https://pinia.vuejs.org/)** - State management para Vue 3
- **[@pinia/nuxt](https://pinia.vuejs.org/ssr/nuxt.html)** - Modulo Nuxt para Pinia

### Content & Data

- **[Directus SDK 20.1.0](https://docs.directus.io/reference/sdk.html)** - SDK para headless CMS
- **[Zod 4.1.12](https://zod.dev/)** - Validacion de esquemas TypeScript-first

### Comunicaciones

- **[Resend 6.4.0](https://resend.com/)** - API de envio de emails transaccionales
- **Telegram Bot API** - Notificaciones en tiempo real
- **Directus Flows + Webhook** - Notificaciones centralizadas

### Analytics & Tracking

- **[nuxt-gtag 3.0.3](https://github.com/johannschopplich/nuxt-gtag)** - Google Analytics 4
- **[@saslavik/nuxt-gtm 0.1.3](https://github.com/saslavik/nuxt-gtm)** - Google Tag Manager (Nuxt 4 compatible)
- **Meta Pixel + Conversions API** - Tracking de conversiones Facebook/Instagram

### UI Components & Libraries

- **[vue3-carousel-nuxt 1.1.6](https://github.com/ismail9k/vue3-carousel)** - Carrusel responsive
- **[v-calendar 3.1.2](https://vcalendar.io/)** - Date picker component
- **[@nuxt/image](https://image.nuxt.com/)** - Optimizacion automatica de imagenes (WebP, AVIF)
- **[@vueuse/core 14.1+](https://vueuse.org/)** - Utilidades de composicion para Vue
- **[@fingerprintjs/botd](https://github.com/nicedoc/fingerprint-pro-server-node-sdk)** - Deteccion de bots

### Client-side PDF Generation

- **[html-to-image 1.11.13](https://github.com/bubkoo/html-to-image)** - DOM to image conversion
- **[jsPDF 4.0.0](https://github.com/parallax/jsPDF)** - Generacion de PDF client-side

### Package Manager

- **[pnpm 9.15.0](https://pnpm.io/)** - Gestor de paquetes rapido y eficiente

---

## Requisitos Previos

- **Node.js**: v18.0.0 o superior ([descargar](https://nodejs.org/))
- **pnpm**: v9.15.0 ([instalar](https://pnpm.io/installation))
- **Git**: Para clonar el repositorio

```bash
node --version  # >= v18.0.0
pnpm --version  # 9.15.0
```

---

## Instalacion

### 1. Clonar el Repositorio

```bash
git clone https://github.com/contuhogar/contuhogar.com.git
cd contuhogar.com
```

### 2. Instalar Dependencias

```bash
pnpm install
```

Ejecuta automaticamente `nuxt prepare` via postinstall para generar tipos.

### 3. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Edita `.env` con las variables requeridas (ver seccion [Variables de Entorno](#variables-de-entorno)).

---

## Desarrollo

```bash
pnpm dev
```

Servidor de desarrollo en `http://localhost:3000` con:

- Hot Module Replacement (HMR)
- Nuxt DevTools habilitado
- Auto-reload en cambios de archivos

### Comandos utiles

```bash
# Limpiar cache y archivos generados
rm -rf .nuxt .output

# Regenerar tipos de TypeScript
pnpm postinstall

# Verificar tipos
npx nuxi typecheck
```

---

## Produccion

### Build

```bash
pnpm build
```

Genera archivos optimizados en `.output/` (public + server Nitro).

### Preview

```bash
pnpm preview
```

### Generar Sitio Estatico (SSG)

```bash
pnpm generate
```

### Deployment

- **Vercel**: `npx vercel deploy` (configuracion incluida)
- **Node.js Server**: Ejecutar `.output/server/index.mjs`
- **Static Hosting**: Subir `.output/public`

---

## Estructura del Proyecto

```
contuhogar.com/
├── assets/
│   └── css/
│       └── main.css                  # Tailwind CSS + animaciones custom
├── components/
│   ├── Header.vue                    # Header con navegacion
│   ├── Footer.vue                    # Footer con links
│   ├── Logo.vue                      # Logo SVG
│   ├── Whatsapp.vue                  # Boton flotante WhatsApp
│   ├── NewsletterForm.vue            # Formulario de suscripcion
│   ├── CountryCombobox.vue           # Selector de pais de residencia
│   ├── CurrencyInput.vue             # Input para montos en COP
│   ├── DatePicker.vue                # Selector de fecha (v-calendar)
│   ├── PhoneCountryCombobox.vue      # Selector pais + telefono
│   ├── cards/
│   │   ├── BlogCard.vue
│   │   └── ServiceCard.vue
│   ├── sections/
│   │   ├── BankLogosSection.vue
│   │   ├── CTASection.vue
│   │   ├── HeroSection.vue
│   │   ├── StatsSection.vue
│   │   └── TestimonialMarquee.vue
│   ├── sidebar/
│   │   ├── ResourcesList.vue
│   │   └── SidebarCTA.vue
│   ├── ui/
│   │   ├── Accordion.vue
│   │   ├── CategoryPills.vue
│   │   └── SearchBar.vue
│   ├── skeleton/                     # 16 componentes de carga (shimmer)
│   │   ├── SkeletonBox.vue           # Primitivo: caja
│   │   ├── SkeletonText.vue          # Primitivo: lineas de texto
│   │   ├── SkeletonCircle.vue        # Primitivo: circulo/avatar
│   │   ├── SkeletonImage.vue         # Primitivo: placeholder imagen
│   │   ├── SkeletonBlogCard.vue
│   │   ├── SkeletonServiceCard.vue
│   │   ├── SkeletonTestimonialCard.vue
│   │   ├── SkeletonHeroHome.vue
│   │   ├── SkeletonHeroSection.vue
│   │   ├── SkeletonStatsSection.vue
│   │   ├── SkeletonBankLogos.vue
│   │   ├── SkeletonAccordion.vue
│   │   ├── SkeletonBlogPost.vue
│   │   ├── SkeletonServicePage.vue
│   │   ├── SkeletonSimulador.vue
│   │   └── SkeletonLegalPage.vue
│   ├── legal/
│   │   ├── LegalPageLayout.vue       # Layout 2 columnas estilo Stripe
│   │   └── LegalSection.vue          # Seccion colapsable
│   ├── lp/                           # Componentes de Landing Pages
│   │   ├── LpCtaSticky.vue
│   │   ├── LpFooterMinimal.vue
│   │   ├── LpHero.vue
│   │   ├── LpLeadForm.vue
│   │   ├── LpNavbar.vue
│   │   ├── LpProcess.vue
│   │   ├── LpTestimonialQuote.vue
│   │   └── LpTrustBar.vue
│   └── simulador/
│       ├── SimuladorWizard.vue        # Wizard principal (5 pasos)
│       ├── steps/
│       │   ├── StepPersonalInfo.vue
│       │   ├── StepPropertyInfo.vue
│       │   ├── StepIncomeInfo.vue
│       │   ├── StepElegibility.vue
│       │   └── StepResults.vue
│       └── ui/
│           ├── ProgressBar.vue
│           ├── VerticalStepper.vue
│           ├── StepNavigation.vue
│           └── ValidationMessage.vue
├── composables/
│   ├── useAntiSpam.ts                # Proteccion anti-spam multi-capa
│   ├── useBotDetection.ts            # Deteccion de bots (fingerprintjs)
│   ├── useDirectPDFDownload.ts       # Generacion directa PDF desde StepResults
│   ├── useDirectus.ts                # Helper para fetch de Directus
│   ├── useGeneratePDFFromElement.ts  # PDF desde DOM element
│   ├── useGeoLocation.ts             # Geolocalizacion por IP
│   ├── useLoading.ts                 # Estado de carga para skeletons
│   ├── useMetaPixel.ts               # Meta Pixel tracking events
│   ├── usePreApprovalPDF.ts          # Navegacion a carta de preaprobacion
│   ├── useRateLimit.ts               # Rate limiting client-side
│   ├── useSeo.ts                     # SEO metadata helpers
│   ├── useSimuladorCalculations.ts   # Calculos financieros
│   └── useTracking.ts               # Tracking unificado (GA4 + Meta)
├── layouts/
│   ├── default.vue                   # Layout principal
│   ├── landing.vue                   # Layout para landing pages
│   └── simulador.vue                 # Layout simulador (sin header/footer)
├── pages/
│   ├── index.vue                     # Homepage
│   ├── contacto.vue                  # Formulario de contacto
│   ├── nosotros.vue                  # Sobre Nosotros
│   ├── faqs.vue                      # Preguntas frecuentes
│   ├── terminos-condiciones.vue      # Terminos y condiciones
│   ├── politica-privacidad.vue       # Politica de privacidad
│   ├── blog/
│   │   ├── index.vue                 # Lista de articulos
│   │   └── [slug].vue               # Articulo individual
│   ├── servicios/
│   │   ├── index.vue                 # Lista de servicios
│   │   ├── [slug].vue               # Servicio individual
│   │   └── [service]/
│   │       └── [market].vue          # Servicio por mercado
│   ├── lp/
│   │   └── [service]/
│   │       └── [market].vue          # Landing page por servicio y mercado
│   └── simulador/
│       └── credito/
│           ├── index.vue             # Simulador de credito
│           └── carta-preaprobacion.vue
├── plugins/
│   ├── directus.client.ts            # Cliente Directus (navegador)
│   ├── directus.server.ts            # Servidor Directus (SSR)
│   ├── meta-pixel.client.ts          # Meta Pixel initialization
│   └── v-calendar.client.ts          # Configuracion de v-calendar
├── public/
│   ├── *.avif                        # Imagenes de servicios (AVIF)
│   ├── images/                       # Imagenes generales (hero, etc.)
│   ├── logos/                        # Logos de bancos y partners (WebP)
│   ├── team/                         # Fotos del equipo
│   ├── testimonials/                 # Fotos de testimonios
│   ├── docs/                         # Documentos PDF (formatos bancarios)
│   ├── og-image.jpg                  # Open Graph image
│   ├── favicon.ico
│   └── robots.txt
├── server/
│   ├── api/
│   │   ├── contact.post.ts           # Guardar leads + notificaciones
│   │   ├── team.get.ts               # Equipo desde Directus
│   │   ├── testimonials.get.ts       # Testimonios desde Directus
│   │   ├── landing-pages.get.ts      # Landing pages desde Directus
│   │   ├── directus/
│   │   │   └── [collection].get.ts   # Proxy generico a Directus
│   │   ├── newsletter/
│   │   │   └── subscribe.post.ts     # Suscripcion newsletter
│   │   ├── simulador/
│   │   │   ├── action.post.ts        # Acciones del simulador
│   │   │   ├── save.post.ts          # Guardar simulacion
│   │   │   └── session/
│   │   │       ├── start.post.ts     # Iniciar sesion
│   │   │       ├── update.post.ts    # Actualizar sesion
│   │   │       └── complete.post.ts  # Completar sesion
│   │   └── webhooks/
│   │       └── notify.post.ts        # Webhook de notificaciones
│   ├── plugins/
│   │   └── securityHeaders.ts        # Headers de seguridad
│   ├── routes/
│   │   └── sitemap.xml.ts            # Sitemap dinamico
│   └── utils/
│       ├── deviceDetection.ts        # Deteccion de dispositivo
│       ├── duplicateDetection.ts     # Deteccion de duplicados
│       ├── formatting.ts             # Formateo de datos
│       ├── metaCapi.ts               # Meta Conversions API
│       ├── notificationTemplates.ts  # Templates de notificacion
│       └── rateLimit.ts              # Rate limiting por IP
├── stores/
│   ├── index.ts                      # Store principal (servicios, equipo, FAQs, logos)
│   └── simulador.ts                  # Store del simulador
├── types/
│   ├── directus.ts                   # Tipos de colecciones Directus
│   └── simulador.ts                  # Tipos del simulador
├── utils/
│   ├── creditTypeLabels.ts           # Labels de tipos de credito
│   ├── formatters.ts                 # Formateadores de moneda/numeros
│   └── phoneFormats.ts               # Formatos de telefono por pais
├── scripts/
│   ├── directus-schema-export.ts     # Exportar schema de Directus
│   ├── directus-generate-types.ts    # Generar tipos TypeScript
│   ├── directus-snapshot.ts          # Snapshots de Directus
│   └── generate-og-image.mjs        # Generador de OG image
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── CLAUDE.md                         # Guia para Claude Code AI
└── pnpm-lock.yaml
```

---

## Variables de Entorno

Crea un archivo `.env` basandote en `.env.example`:

```bash
# Directus CMS
DIRECTUS_URL=https://tu-instancia.directus.app
DIRECTUS_ADMIN_TOKEN=tu_token_admin
DIRECTUS_PUBLIC_TOKEN=tu_token_publico_solo_lectura

# Resend (Email)
RESEND_API_KEY=re_tu_api_key

# Cloudflare Turnstile (CAPTCHA)
TURNSTILE_SITE_KEY=tu_site_key
TURNSTILE_SECRET_KEY=tu_secret_key

# Telegram (Opcional)
TELEGRAM_BOT_TOKEN=123456:ABC-DEF
TELEGRAM_CHAT_ID=-1001234567890

# Meta Pixel + Conversions API (Opcional)
META_PIXEL_ID=tu_pixel_id
META_CAPI_ACCESS_TOKEN=tu_capi_token

# Webhook (Opcional)
WEBHOOK_SECRET=tu_webhook_secret

# Feature Flags
ENABLE_LANDING_LINKS=true
```

### Descripcion de Variables

| Variable | Descripcion | Requerida |
|----------|-------------|-----------|
| `DIRECTUS_URL` | URL de la instancia Directus CMS | Si |
| `DIRECTUS_ADMIN_TOKEN` | Token admin para operaciones server-side | Si |
| `DIRECTUS_PUBLIC_TOKEN` | Token de solo lectura para el cliente | Si |
| `RESEND_API_KEY` | API key de Resend para emails transaccionales | Si |
| `TURNSTILE_SITE_KEY` | Site key de Cloudflare Turnstile | Si |
| `TURNSTILE_SECRET_KEY` | Secret key de Cloudflare Turnstile | Si |
| `TELEGRAM_BOT_TOKEN` | Token del bot de Telegram | No |
| `TELEGRAM_CHAT_ID` | ID del chat/canal de Telegram | No |
| `META_PIXEL_ID` | ID del Meta Pixel (Facebook/Instagram) | No |
| `META_CAPI_ACCESS_TOKEN` | Token de acceso para Conversions API | No |
| `WEBHOOK_SECRET` | Secreto para verificar webhooks entrantes | No |
| `ENABLE_LANDING_LINKS` | Habilitar links a landing pages en el sitio | No |

### Seguridad

- **NUNCA** hacer commit de `.env` (esta en `.gitignore`)
- Rotar tokens periodicamente (especialmente `DIRECTUS_ADMIN_TOKEN`)
- Usar tokens de solo lectura para el cliente (`DIRECTUS_PUBLIC_TOKEN`)
- En produccion, usar variables de entorno del sistema

---

## Rutas de la Aplicacion

Nuxt utiliza file-based routing. Cada archivo `.vue` en `pages/` se convierte en una ruta:

| Archivo | Ruta | Descripcion |
|---------|------|-------------|
| `pages/index.vue` | `/` | Homepage |
| `pages/contacto.vue` | `/contacto` | Formulario de contacto |
| `pages/nosotros.vue` | `/nosotros` | Sobre Nosotros |
| `pages/faqs.vue` | `/faqs` | Preguntas frecuentes |
| `pages/terminos-condiciones.vue` | `/terminos-condiciones` | Terminos y condiciones |
| `pages/politica-privacidad.vue` | `/politica-privacidad` | Politica de privacidad |
| `pages/blog/index.vue` | `/blog` | Lista de articulos |
| `pages/blog/[slug].vue` | `/blog/:slug` | Articulo individual |
| `pages/servicios/index.vue` | `/servicios` | Lista de servicios |
| `pages/servicios/[slug].vue` | `/servicios/:slug` | Servicio individual |
| `pages/servicios/[service]/[market].vue` | `/servicios/:service/:market` | Servicio por mercado |
| `pages/lp/[service]/[market].vue` | `/lp/:service/:market` | Landing page |
| `pages/simulador/credito/index.vue` | `/simulador/credito` | Simulador de credito |
| `pages/simulador/credito/carta-preaprobacion.vue` | `/simulador/credito/carta-preaprobacion` | Carta preaprobacion PDF |

### Route Rules (ISR Caching)

```typescript
routeRules: {
  '/':              { isr: 3600 },   // 1 hora
  '/nosotros':      { isr: 86400 },  // 24 horas
  '/faqs':          { isr: 86400 },
  '/servicios':     { isr: 86400 },
  '/servicios/**':  { isr: 86400 },
  '/blog':          { isr: 3600 },
  '/blog/**':       { isr: 3600 },
}
```

---

## Integraciones

### Directus CMS

Headless CMS para gestionar todo el contenido dinamico:

- Blog posts y categorias
- Servicios
- Equipo (nosotros)
- Testimonios
- Landing pages
- Leads de contacto
- Simulaciones
- Newsletter subscribers

**Plugins**: `directus.client.ts` (navegador) y `directus.server.ts` (SSR con admin token)

**Composable** para fetch de datos:

```typescript
const { data } = await useDirectusItems<T>('collection_name', {
  filter: { status: { _eq: 'published' } },
  sort: ['-date_created']
})
```

#### Directus MCP (Model Context Protocol)

Integracion del servidor MCP de Directus para acceso directo al CMS desde Claude Code.

Crea `.mcp.json` en la raiz del proyecto:

```json
{
  "mcpServers": {
    "directus": {
      "url": "https://admin.contuhogar.com/mcp",
      "headers": {
        "Authorization": "Bearer TU_TOKEN_DIRECTUS"
      }
    }
  }
}
```

El archivo `.mcp.json` esta en `.gitignore`. Cada desarrollador crea el suyo.

### Resend (Email)

Emails transaccionales al recibir leads:

- Email HTML formateado con datos del contacto
- BCC automatico a `contudigital@contuhogar.net`
- Sender: `gerenciacomercial@contuhogar.com`

### Telegram Bot

Notificaciones en tiempo real de nuevos leads con formato rich text.

### Directus Flows + Webhook

Las notificaciones estan centralizadas via Directus Flows. El endpoint `webhooks/notify.post.ts` recibe eventos desde Directus y distribuye notificaciones.

### Meta Pixel + Conversions API

Tracking de conversiones dual:

- **Client-side**: Meta Pixel via `meta-pixel.client.ts` y `useMetaPixel.ts`
- **Server-side**: Conversions API via `server/utils/metaCapi.ts`
- Eventos: Lead, Subscribe, CompleteRegistration

### Google Analytics & GTM

- **Google Analytics 4** (`G-1182NP1Z0D`): Tracking de eventos y pageviews
- **Google Tag Manager** (`GTM-WMQV4M3F`): Gestion de tags y conversiones
- Solo activos en `NODE_ENV=production`
- Inicializacion manual (defer) para reducir TBT

---

## Simulador de Credito

Wizard interactivo de 5 pasos para evaluar elegibilidad en creditos hipotecarios y leasing habitacional.

### Pasos

1. **Informacion Personal**: Nombre, email, telefono, fecha de nacimiento, tipo de credito
2. **Informacion del Inmueble**: Valor del inmueble, monto solicitado, plazo
3. **Ingresos y Gastos**: Ingresos fijos/variables, deducciones, obligaciones financieras
4. **Elegibilidad**: Status migratorio, reportes crediticios
5. **Resultados**: Estado (Aprobado/Advertencia/Rechazado), cuota mensual, DTI ratio, recomendaciones

### Calculos Financieros

- Formula PMT para cuota mensual
- Ratio DTI (Debt-to-Income) - maximo 30%
- Ratio LTV (Loan-to-Value) - 70% hipotecario / 80% leasing
- Validacion de edad al final del plazo (max 84 anos)

### Constantes

```
TASA_EA = 14%
TASA_MENSUAL = 1.0975%
EDAD_FINAL_MAXIMA = 84 anos
PLAZO = 12-240 meses (1-20 anos)
DTI_MAXIMO = 30%
LTV_HIPOTECARIO = 70%
LTV_LEASING = 80%
```

### Funcionalidades

- Persistencia de estado en localStorage
- Generacion de carta de preaprobacion (PDF client-side con html-to-image + jsPDF)
- Pre-relleno del formulario de contacto desde resultados
- Session tracking (start/update/complete) guardado en Directus
- Creacion automatica de lead al completar

---

## Formulario de Contacto

### Seguridad (6 capas)

1. **Cloudflare Turnstile**: CAPTCHA invisible
2. **Honeypot Field**: Campo oculto para bots
3. **Validacion de Tiempo**: Minimo 3 segundos
4. **Rate Limiting**: 8 requests/5min por IP
5. **Bot Detection**: FingerprintJS BotD
6. **Validacion Zod**: Esquema TypeScript-first

### Deteccion Automatica de Pais

Detecta pais por IP (geojs.io) y pre-selecciona codigo telefonico. 30+ paises con formato dinamico.

| Pais | Codigo | Formato |
|------|--------|---------|
| Colombia | +57 | XXX XXX XXXX |
| Estados Unidos | +1 | (XXX) XXX-XXXX |
| Espana | +34 | XXX XX XX XX |
| Mexico | +52 | XX XXXX XXXX |

### Flujo del Endpoint `/api/contact`

1. Verificacion de Turnstile
2. Validacion de datos (Zod)
3. Rate limiting por IP
4. Guardado en Directus (coleccion `leads`)
5. Notificaciones paralelas (`Promise.allSettled`): Email (Resend), Telegram, Meta CAPI

---

## Landing Pages

Sistema de landing pages dinamicas por servicio y mercado, generadas desde Directus.

- Ruta: `/lp/:service/:market` (ej. `/lp/credito-hipotecario/espana`)
- Layout dedicado: `layouts/landing.vue`
- Componentes especializados en `components/lp/`
- Contenido gestionado desde coleccion `landing_pages` en Directus
- Feature flag: `ENABLE_LANDING_LINKS` controla visibilidad de links en el sitio

---

## Scripts Disponibles

### Desarrollo

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build produccion
pnpm generate     # Generar sitio estatico
pnpm preview      # Preview del build
pnpm postinstall  # Regenerar tipos (auto)
```

### Directus

```bash
pnpm directus:schema           # Exportar schema
pnpm directus:types            # Generar tipos TypeScript
pnpm directus:snapshot         # Ver snapshots
pnpm directus:snapshot:create  # Crear snapshot
pnpm directus:snapshot:list    # Listar snapshots
```

### Utilidades

```bash
npx nuxi analyze     # Analisis de bundle
npx nuxi typecheck   # Verificar tipos
npx nuxi cleanup     # Limpiar cache
npx nuxi info        # Info del proyecto
pnpm audit            # Auditoria de seguridad
```

---

## Performance y Optimizacion

### Optimizaciones Implementadas

- SSR (Server-Side Rendering) con ISR por ruta
- Code splitting automatico por pagina
- Manual chunks: `vendor-pdf` (jsPDF + html-to-image), `vendor-calendar` (v-calendar)
- `@nuxt/image` con formatos WebP/AVIF y responsive screens
- Imagenes de servicios en AVIF (reduccion significativa vs PNG)
- Logos en WebP
- Lazy loading de imagenes
- Defer de GA4 y GTM (initMode manual)
- Sourcemaps deshabilitados en produccion
- Headers de seguridad via server plugin
- Sistema de skeletons para eliminar FOUC
- Preconnect a recursos externos

### Validadores

- **SEO**: [Google Rich Results](https://search.google.com/test/rich-results) · [Schema Validator](https://validator.schema.org/)
- **Seguridad**: [Security Headers](https://securityheaders.com/) · [Mozilla Observatory](https://observatory.mozilla.org/)
- **Performance**: [PageSpeed](https://pagespeed.web.dev/) · Lighthouse

---

## Contribuir

### 1. Fork

```bash
gh repo fork contuhogar/contuhogar.com
```

### 2. Crear Branch

```bash
git checkout -b feature/mi-feature
```

### 3. Commit

```bash
git commit -m "feat: descripcion del cambio"
```

Prefijos: `feat:`, `fix:`, `perf:`, `refactor:`, `docs:`, `chore:`, `copy:`, `revert:`

### 4. Push y PR

```bash
git push origin feature/mi-feature
```

---

## Changelog

### [2.5.0] - 2026-03

- **Landing Pages Dinamicas**: Sistema de landing pages por servicio y mercado desde Directus
- **Layout Landing**: Layout dedicado para landing pages con componentes especializados
- **Feature Flag Landing Links**: `ENABLE_LANDING_LINKS` para controlar visibilidad
- **Performance LCP**: Optimizacion de Largest Contentful Paint, lazy-load de deps pesadas, cache headers ISR
- **Notificaciones via Directus Flows**: Centralizacion de notificaciones via webhook
- **Links a Landing Pages**: Panel de paises en homepage con feature flag

### [2.4.0] - 2026-02

- **Testimonios Dinamicos**: Testimonios desde Directus CMS
- **Equipo Dinamico**: Pagina nosotros con equipo desde Directus API
- **Proxy Directus**: Rutas client-side a traves de server API para evitar CORS
- **Imagenes Blog**: Resolucion server-side de asset URLs de Directus

### [2.3.0] - 2026-01

- **Meta Pixel + CAPI**: Tracking client-side y server-side de conversiones
- **Blog Directus**: Integracion completa de blog con Directus y `blog_categories`
- **Session Tracking Simulador**: Sesiones de simulador con start/update/complete
- **Lead en Simulacion**: Creacion automatica de lead al completar simulacion
- **Source Component**: Campo `source_component` en leads para rastrear origen
- **Notificaciones Diferenciadas**: Diferenciacion de fuente y links a Directus

### [2.2.5] - 2025-12

- **Newsletter**: Suscripcion a newsletter con endpoint dedicado
- **CountryCombobox**: Selector de pais de residencia (~195 paises)
- **Tipos de Credito Adicionales**: Remodelacion y compra de cartera + opcion "no se"
- **Estandarizacion Marca**: Nombre unificado "ContuHogar" en todo el sitio
- **Accesibilidad Formularios**: Labels, IDs, ARIA para form accessibility
- **OG Image**: Open Graph image y script generador
- **Sitemap Dinamico**: Server route para sitemap con contenido dinamico

### [2.2.0] - 2026-01-31

- **Sistema de Skeletons**: 16 componentes de carga con animacion shimmer
- **Paginas Legales**: Rediseno estilo Stripe/Notion con sidebar sticky y acordeones
- **Composable useLoading**: Control centralizado de estados de carga
- **PDF Client-Side**: Migracion de generacion PDF de server-side a client-side

### [2.1.0] - 2025-01-12

- **Simulador de Credito**: Wizard de 5 pasos con calculos financieros y PDF
- **Cloudflare Turnstile**: CAPTCHA invisible reemplazando captcha manual
- **Formulario Mejorado**: Deteccion de pais, formato de telefono, rate limiting
- **Pagina Politica Privacidad**: Ley 1581/2012 Colombia
- **Layout Simulador**: Layout fullscreen sin header/footer
- **Migracion pnpm**: De Yarn a pnpm 9.15.0

### [2.0.0] - 2025-01-11

- **BREAKING**: Nuxt 3.16.2 → 4.2.0
- **BREAKING**: GTM module reemplazado por `@saslavik/nuxt-gtm` (Nuxt 4 compatible)
- Actualizacion de todas las dependencias mayores
- Creacion de `CLAUDE.md`

---

## Licencia

Proyecto privado. Todos los derechos reservados por ContuHogar.

---

## Contacto

- **Sitio Web**: [https://contuhogar.com](https://contuhogar.com)
- **Email**: gerenciacomercial@contuhogar.com
- **WhatsApp**: +57 315 054 0000

---

<div align="center">

**Hecho con ❤️ por el equipo de ContuHogar**

[Volver arriba](#contuhogarcom)

</div>
