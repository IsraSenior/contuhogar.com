# contuhogar.com

<div align="center">

![Nuxt 4](https://img.shields.io/badge/Nuxt-4.2.0-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue.js-3.5.22-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.16-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Plataforma de asesoría financiera e inmobiliaria para colombianos en el exterior**

[Sitio Web](https://contuhogar.com) · [Reportar Bug](https://github.com/contuhogar/contuhogar.com/issues) · [Solicitar Feature](https://github.com/contuhogar/contuhogar.com/issues)

</div>

---

## Estado del Proyecto - Auditoría Técnica

**Puntuación Global: 7.9/10** ✅

| # | Aspecto | Puntuación | Estado |
|---|---------|------------|--------|
| 1 | Anti-Spam & Bot Detection | 9/10 | Excelente |
| 2 | Rate Limiting | 9/10 | Excelente* |
| 3 | State Management (Pinia) | 8.5/10 | Muy Bueno |
| 4 | TypeScript | 8.5/10 | Muy Bueno |
| 5 | Structured Data (JSON-LD) | 8.5/10 | Muy Bueno |
| 6 | SEO Meta Tags | 8.2/10 | Muy Bueno |
| 7 | Validación de Inputs (Zod) | 8/10 | Bueno |
| 8 | Security Headers | 8/10 | Bueno* |
| 9 | Styling (Tailwind) | 8/10 | Bueno |
| 10 | Sitemap & Robots | 8/10 | Bueno |
| 11 | Arquitectura Componentes | 7.5/10 | Bueno |
| 12 | Accesibilidad (A11y) | 7.5/10 | Bueno |
| 13 | Manejo de Errores | 7/10 | Aceptable |
| 14 | Performance | 7/10 | Aceptable |
| 15 | CSRF/CORS | 5/10 | Débil |

*Con advertencias para producción (ver sección de vulnerabilidades)

### Fortalezas
- Anti-spam: 6 capas de protección (Turnstile, honeypot, timing, rate limit, bot detection, Zod)
- SEO: 5 schemas JSON-LD implementados
- TypeScript: Sin uso de `any`
- State: Pinia con persistencia

### Vulnerabilidades Conocidas (Pre-Producción)
| Prioridad | Issue | Archivo | Estado |
|-----------|-------|---------|--------|
| 🔴 Crítico | CSP `unsafe-inline` | `server/plugins/securityHeaders.ts` | Pendiente |
| 🔴 Crítico | Rate limiting en memoria | `server/utils/rateLimit.ts` | Pendiente |
| 🔴 Crítico | Sin CSRF tokens | - | Pendiente |
| 🟠 Alto | Sitemap sin blog dinámico | `server/routes/sitemap.xml.ts` | Pendiente |
| 🟠 Alto | Simulador sin lazy loading | `components/simulador/` | Pendiente |

### Validadores Recomendados
- SEO: [Google Rich Results](https://search.google.com/test/rich-results) · [Schema Validator](https://validator.schema.org/)
- Seguridad: [Security Headers](https://securityheaders.com/) · [Mozilla Observatory](https://observatory.mozilla.org/)
- Performance: [PageSpeed](https://pagespeed.web.dev/) · Lighthouse

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Desarrollo](#-desarrollo)
- [Producción](#-producción)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Variables de Entorno](#-variables-de-entorno)
- [Integraciones](#-integraciones)
- [Scripts Disponibles](#-scripts-disponibles)
- [Análisis y Optimización](#-análisis-y-optimización)
- [Contribuir](#-contribuir)
- [Changelog](#-changelog)
- [Licencia](#-licencia)

---

## 🏠 Sobre el Proyecto

ContuHogar.com es una plataforma web diseñada para conectar a colombianos que viven en el exterior con oportunidades de inversión inmobiliaria y financiera en Colombia. La plataforma ofrece:

- ✅ Asesoría personalizada en créditos hipotecarios
- ✅ Información sobre leasing habitacional
- ✅ Opciones de remodelación y compra de cartera
- ✅ Gestión de declaración de renta (ConTuRenta)
- ✅ Blog informativo sobre el mercado inmobiliario colombiano
- ✅ Sistema de contacto y generación de leads
- ✅ **Simulador de crédito interactivo** con evaluación en 5 pasos

### Funcionalidades Principales

- **Simulador de Crédito**: Wizard interactivo de 5 pasos para evaluar elegibilidad crediticia con cálculos financieros en tiempo real (cuota mensual, DTI ratio, LTV, edad final)
- **Formularios de Contacto Optimizados**: Sistema con validación Zod, honeypot anti-spam, detección automática de país por IP, formato de teléfono dinámico según país, y notificaciones vía email (Resend) y Telegram
- **CMS Headless**: Integración con Directus para gestión de contenido dinámico
- **SEO Optimizado**: Meta tags configurables, sitemap generado, robots.txt
- **Analytics**: Google Analytics 4 y Google Tag Manager integrados
- **Responsive Design**: Diseño adaptativo con Tailwind CSS 4
- **SSR/SSG**: Renderizado del lado del servidor para mejor performance y SEO

---

## 🚀 Tecnologías

### Core

- **[Nuxt 4.2.0](https://nuxt.com/)** - Framework Vue.js full-stack
- **[Vue 3.5.22](https://vuejs.org/)** - Framework JavaScript progresivo
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript con tipado estático
- **[Vite 7.1.12](https://vitejs.dev/)** - Build tool ultrarrápido

### Styling

- **[Tailwind CSS 4.1.16](https://tailwindcss.com/)** - Framework CSS utility-first
- **[@tailwindcss/vite](https://tailwindcss.com/docs/installation/vite)** - Plugin de Vite para Tailwind

### State Management

- **[Pinia 3.0+](https://pinia.vuejs.org/)** - State management para Vue 3
- **[@pinia/nuxt](https://pinia.vuejs.org/ssr/nuxt.html)** - Módulo Nuxt para Pinia

### Content & Data

- **[Directus SDK 20.1.0](https://docs.directus.io/reference/sdk.html)** - SDK para headless CMS
- **[Zod 4.1.12](https://zod.dev/)** - Validación de esquemas TypeScript-first

### Comunicaciones

- **[Resend 6.4.0](https://resend.com/)** - API de envío de emails transaccionales
- **Telegram Bot API** - Notificaciones en tiempo real

### Analytics & Tracking

- **[nuxt-gtag 3.0.3](https://github.com/johannschopplich/nuxt-gtag)** - Google Analytics 4
- **[@saslavik/nuxt-gtm 0.1.3](https://github.com/saslavik/nuxt-gtm)** - Google Tag Manager (Nuxt 4 compatible)

### UI Components

- **[vue3-carousel-nuxt 1.1.6](https://github.com/ismail9k/vue3-carousel)** - Carrusel responsive

### UI & Security

- **[v-calendar 3.1.2](https://vcalendar.io/)** - Date picker component
- **[@nuxtjs/turnstile 1.1.1](https://github.com/nuxt-modules/turnstile)** - Cloudflare Turnstile CAPTCHA

### Client-side PDF Generation

- **[html-to-image 1.11.13](https://github.com/bubkoo/html-to-image)** - DOM to image conversion
- **[jsPDF 4.0.0](https://github.com/parallax/jsPDF)** - Client-side PDF generation

### Package Manager

- **[pnpm 9.15.0](https://pnpm.io/)** - Gestor de paquetes rápido y eficiente

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v18.0.0 o superior ([descargar](https://nodejs.org/))
- **pnpm**: v9.15.0 ([instalar](https://pnpm.io/installation))
- **Git**: Para clonar el repositorio

Verificar instalación:

```bash
node --version  # Debe ser >= v18.0.0
pnpm --version  # Debe ser 9.15.0
```

---

## ⚙️ Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/contuhogar/contuhogar.com.git
cd contuhogar.com
```

### 2. Instalar Dependencias

```bash
pnpm install
```

Este comando instalará todas las dependencias listadas en `package.json` y ejecutará automáticamente `pnpm postinstall` (que ejecuta `nuxt prepare` para generar tipos).

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en el ejemplo:

```bash
cp .env.example .env
```

Edita `.env` y configura las variables requeridas (ver sección [Variables de Entorno](#-variables-de-entorno)).

---

## 💻 Desarrollo

### Iniciar Servidor de Desarrollo

```bash
pnpm dev
```

El servidor de desarrollo se iniciará en `http://localhost:3000` con:

- ✅ Hot Module Replacement (HMR)
- ✅ Nuxt DevTools habilitado
- ✅ Auto-reload en cambios de archivos

### Comandos de Desarrollo Útiles

```bash
# Limpiar cache y archivos generados
rm -rf .nuxt .output

# Regenerar tipos de TypeScript
pnpm postinstall

# Verificar tipos de TypeScript
npx nuxi typecheck
```

---

## 🏗️ Producción

### Build para Producción

```bash
pnpm build
```

Este comando:
1. Compila el código optimizado para producción
2. Genera archivos estáticos en `.output/public`
3. Prepara el servidor Nitro en `.output/server`

### Preview de Build de Producción

```bash
pnpm preview
```

Inicia un servidor local para previsualizar el build de producción en `http://localhost:3000`.

### Generar Sitio Estático (SSG)

```bash
pnpm generate
```

Genera un sitio completamente estático en `.output/public` listo para ser desplegado en cualquier hosting estático.

### Deployment

El proyecto puede ser desplegado en:

- **Vercel**: `npx vercel deploy`
- **Netlify**: Drag & drop de `.output/public`
- **Node.js Server**: Ejecutar `.output/server/index.mjs`
- **Static Hosting**: Subir contenido de `.output/public`

Ver [documentación de deployment de Nuxt](https://nuxt.com/docs/getting-started/deployment) para más detalles.

---

## 📁 Estructura del Proyecto

```
contuhogar.com/
├── assets/                 # Assets no procesados (CSS, fuentes)
│   └── css/
│       └── main.css       # Configuración de Tailwind CSS
├── components/            # Componentes Vue reutilizables
│   ├── Header.vue        # Header principal con navegación
│   ├── Footer.vue        # Footer con links
│   ├── Logo.vue          # Componente de logo
│   ├── Whatsapp.vue      # Botón flotante de WhatsApp
│   ├── CurrencyInput.vue # Input para cantidades en COP
│   ├── DatePicker.vue    # Selector de fecha con v-calendar
│   ├── PhoneCountryCombobox.vue  # Selector de país + teléfono con formato
│   ├── cards/            # Componentes de tarjetas
│   │   ├── BlogCard.vue
│   │   └── ServiceCard.vue
│   ├── sections/         # Secciones de página
│   │   ├── BankLogosSection.vue
│   │   ├── CTASection.vue
│   │   ├── HeroSection.vue
│   │   ├── StatsSection.vue
│   │   └── TestimonialMarquee.vue
│   ├── sidebar/          # Componentes de sidebar
│   │   ├── ResourcesList.vue
│   │   └── SidebarCTA.vue
│   ├── ui/               # Componentes UI generales
│   │   ├── Accordion.vue
│   │   ├── CategoryPills.vue
│   │   └── SearchBar.vue
│   ├── skeleton/         # Componentes de carga (skeletons)
│   │   ├── SkeletonBox.vue           # Primitivo: caja rectangular
│   │   ├── SkeletonText.vue          # Primitivo: líneas de texto
│   │   ├── SkeletonCircle.vue        # Primitivo: círculo/avatar
│   │   ├── SkeletonImage.vue         # Primitivo: placeholder imagen
│   │   ├── SkeletonBlogCard.vue      # Card de blog
│   │   ├── SkeletonServiceCard.vue   # Card de servicio
│   │   ├── SkeletonTestimonialCard.vue
│   │   ├── SkeletonHeroHome.vue      # Hero del homepage
│   │   ├── SkeletonHeroSection.vue   # Hero genérico
│   │   ├── SkeletonStatsSection.vue  # Sección de stats
│   │   ├── SkeletonBankLogos.vue     # Logos de bancos
│   │   ├── SkeletonAccordion.vue     # Acordeón FAQ
│   │   ├── SkeletonBlogPost.vue      # Página de blog post
│   │   ├── SkeletonServicePage.vue   # Página de servicio
│   │   ├── SkeletonSimulador.vue     # Wizard del simulador
│   │   └── SkeletonLegalPage.vue     # Páginas legales
│   ├── legal/            # Componentes para páginas legales
│   │   ├── LegalPageLayout.vue       # Layout con sidebar + acordeones
│   │   └── LegalSection.vue          # Sección colapsable
│   └── simulador/        # Componentes del simulador
│       ├── SimuladorWizard.vue    # Wizard principal (5 pasos)
│       ├── steps/
│       │   ├── StepPersonalInfo.vue   # Paso 1: Datos personales
│       │   ├── StepPropertyInfo.vue   # Paso 2: Datos del bien
│       │   ├── StepIncomeInfo.vue     # Paso 3: Ingresos y gastos
│       │   ├── StepElegibility.vue    # Paso 4: Elegibilidad
│       │   └── StepResults.vue        # Paso 5: Resultados
│       └── ui/
│           ├── ProgressBar.vue         # Barra de progreso
│           ├── VerticalStepper.vue     # Indicador de pasos
│           ├── StepNavigation.vue      # Navegación entre pasos
│           └── ValidationMessage.vue   # Mensajes de validación
├── composables/          # Composables de Vue
│   ├── useDirectus.ts    # Helper para fetch de Directus
│   ├── useLoading.ts     # Estado de carga para skeletons
│   ├── useSeo.ts         # SEO metadata helpers
│   ├── useSimuladorCalculations.ts   # Cálculos financieros
│   └── usePreApprovalPDF.ts          # Generación de PDF
├── layouts/              # Layouts de página
│   ├── default.vue       # Layout por defecto
│   └── simulador.vue     # Layout para simulador (sin header/footer)
├── pages/                # Páginas (file-based routing)
│   ├── index.vue         # Homepage
│   ├── contacto.vue      # Formulario de contacto
│   ├── nosotros.vue      # Página "Sobre Nosotros"
│   ├── faqs.vue          # Preguntas frecuentes
│   ├── terminos-condiciones.vue
│   ├── politica-privacidad.vue  # Política de privacidad
│   ├── blog/
│   │   ├── index.vue     # Lista de artículos
│   │   └── [slug].vue    # Artículo individual
│   ├── servicios/
│   │   ├── index.vue     # Lista de servicios
│   │   └── [slug].vue    # Servicio individual
│   └── simulador/
│       └── credito/
│           ├── index.vue           # Simulador de crédito
│           └── carta-preaprobacion.vue  # Carta de preaprobación
├── plugins/              # Plugins de Nuxt
│   ├── directus.client.ts # Cliente Directus (navegador)
│   ├── directus.server.ts # Servidor Directus (SSR)
│   └── v-calendar.client.ts # Configuración de v-calendar
├── public/               # Assets estáticos
│   ├── logos/           # Logos de bancos y partners (WebP)
│   │   ├── amarilo-logo.webp
│   │   ├── banco-occidental.webp
│   │   ├── banco-union.webp
│   │   ├── colpatria-logo.webp
│   │   └── logo-banco-de-bogota.webp
│   ├── team/            # Fotos del equipo
│   ├── testimonials/    # Fotos de testimonios
│   ├── docs/            # Documentos PDF
│   ├── favicon.ico
│   └── robots.txt
├── server/               # API y server routes
│   ├── api/
│   │   ├── contact.post.ts      # Endpoint para guardar leads
│   │   ├── pdf/
│   │   │   └── pre-approval.post.ts  # Generación de PDF
│   │   └── send/
│   │       ├── lead.post.ts           # Envío de emails
│   │       └── simulator-lead.post.ts # Notificación de simulador
│   ├── plugins/
│   │   └── securityHeaders.ts
│   └── utils/
│       └── turnstile.ts              # Verificación de Turnstile
├── stores/               # Stores de Pinia
│   ├── index.ts         # Store principal con datos (TypeScript)
│   └── simulador.ts     # Store del simulador
├── types/                # Definiciones de TypeScript
│   └── simulador.ts     # Tipos del simulador
├── utils/                # Utilidades
│   └── formatters.ts    # Formateadores de moneda/números
├── .env                 # Variables de entorno (NO commit)
├── .env.example         # Template de variables de entorno
├── .gitignore           # Archivos ignorados por Git
├── CLAUDE.md            # Guía para Claude Code AI
├── nuxt.config.ts       # Configuración de Nuxt
├── package.json         # Dependencias del proyecto
├── README.md            # Este archivo
├── tsconfig.json        # Configuración de TypeScript
└── pnpm-lock.yaml       # Lock file de pnpm
```

### Directorio `pages/`

Nuxt utiliza file-based routing. Cada archivo `.vue` en `pages/` se convierte automáticamente en una ruta:

| Archivo | Ruta |
|---------|------|
| `pages/index.vue` | `/` |
| `pages/contacto.vue` | `/contacto` |
| `pages/nosotros.vue` | `/nosotros` |
| `pages/faqs.vue` | `/faqs` |
| `pages/terminos-condiciones.vue` | `/terminos-condiciones` |
| `pages/politica-privacidad.vue` | `/politica-privacidad` |
| `pages/simulador/credito/index.vue` | `/simulador/credito` |
| `pages/simulador/credito/carta-preaprobacion.vue` | `/simulador/credito/carta-preaprobacion` |
| `pages/blog/index.vue` | `/blog` |
| `pages/blog/[slug].vue` | `/blog/:slug` |
| `pages/servicios/index.vue` | `/servicios` |
| `pages/servicios/[slug].vue` | `/servicios/:slug` |

---

## 🔐 Variables de Entorno

### Variables Requeridas

Crea un archivo `.env` con las siguientes variables:

```bash
# Directus CMS
DIRECTUS_URL=https://tu-instancia.directus.app
DIRECTUS_ADMIN_TOKEN=tu_token_admin_aqui
DIRECTUS_PUBLIC_TOKEN=tu_token_publico_aqui

# Resend (Email)
RESEND_API_KEY=re_tu_api_key_aqui

# Cloudflare Turnstile (CAPTCHA)
TURNSTILE_SITE_KEY=tu_site_key_aqui
TURNSTILE_SECRET_KEY=tu_secret_key_aqui

# Telegram (Opcional)
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=-1001234567890

# Otros
NODE_ENV=development  # o 'production'
BASE_URL=https://contuhogar.com
```

### Descripción de Variables

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `DIRECTUS_URL` | URL de tu instancia de Directus CMS | ✅ Sí |
| `DIRECTUS_ADMIN_TOKEN` | Token de admin para operaciones del servidor | ✅ Sí |
| `DIRECTUS_PUBLIC_TOKEN` | Token público de solo lectura para el cliente | ✅ Sí |
| `RESEND_API_KEY` | API key de Resend para envío de emails | ✅ Sí |
| `TURNSTILE_SITE_KEY` | Site key de Cloudflare Turnstile (CAPTCHA invisible) | ✅ Sí |
| `TURNSTILE_SECRET_KEY` | Secret key de Cloudflare Turnstile | ✅ Sí |
| `TELEGRAM_BOT_TOKEN` | Token del bot de Telegram | ❌ Opcional |
| `TELEGRAM_CHAT_ID` | ID del chat/canal de Telegram | ❌ Opcional |
| `BASE_URL` | URL base del sitio (para meta tags) | ❌ Opcional |

### ⚠️ Seguridad

- **NUNCA** commits `.env` al repositorio (ya está en `.gitignore`)
- Rotar tokens periódicamente (especialmente `DIRECTUS_ADMIN_TOKEN`)
- Usar tokens de solo lectura para el cliente (`DIRECTUS_PUBLIC_TOKEN`)
- En producción, usar variables de entorno del sistema o servicios como Vault

---

## 🔌 Integraciones

### Directus CMS

El proyecto utiliza Directus como headless CMS para gestionar:

- Blog posts
- Servicios
- Configuraciones dinámicas
- Leads de contacto

**Composable** para fetch de datos:

```typescript
// composables/useDirectus.ts
const { data, error } = await useDirectusItems<T>('collection_name', {
  filter: { status: { _eq: 'published' } },
  sort: ['-date_created']
})
```

#### Directus MCP (Model Context Protocol)

El proyecto integra el servidor MCP de Directus para acceso directo al CMS desde Claude Code. Esto permite a los agentes de IA interactuar con las colecciones de Directus sin escribir codigo de API.

**Herramientas MCP disponibles:**
- `mcp__directus__items` - Operaciones CRUD en colecciones
- `mcp__directus__files` - Gestion de archivos
- `mcp__directus__schema` - Informacion del schema
- `mcp__directus__collections` - Metadata de colecciones
- `mcp__directus__flows` - Automatizaciones

**Configuracion para desarrolladores:**

1. Crea un archivo `.mcp.json` en la raiz del proyecto:

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

2. Reemplaza `TU_TOKEN_DIRECTUS` con tu token de Directus

**Seguridad:**
- El archivo `.mcp.json` esta en `.gitignore` - nunca hacer commit de credenciales
- Cada desarrollador debe crear su propio `.mcp.json` con su token personal
- Usar tokens con permisos apropiados segun el rol

### Resend (Email)

Envío de emails transaccionales cuando se recibe un lead:

- Email formateado HTML con información del contacto
- BCC automático a `israsenior.dev@gmail.com`
- Manejo de errores y retry logic

### Telegram Bot

Notificaciones en tiempo real de nuevos leads:

```
🆕 Nuevo lead
Nombre: Juan Pérez
Email: juan@example.com
Tel: +57 310 123 4567
Origen: /contacto
Mensaje:
Interesado en crédito hipotecario...
```

### Google Analytics & GTM

- **Google Analytics 4** (`G-1182NP1Z0D`): Tracking de eventos y pageviews
- **Google Tag Manager** (`GTM-WMQV4M3F`): Gestión de tags y conversiones
- Solo activos en `NODE_ENV=production`

---

## 💳 Simulador de Crédito

### Descripción

El simulador de crédito es un wizard interactivo de 5 pasos que permite a los usuarios evaluar su elegibilidad para créditos hipotecarios y leasing habitacional. Incluye validaciones en tiempo real, cálculos financieros precisos, y generación de carta de preaprobación en PDF.

### Características Principales

- **Wizard Multi-Paso**: Navegación fluida entre 5 pasos con validación progresiva
- **Cálculos Financieros Avanzados**:
  - Fórmula PMT para cuota mensual
  - Ratio DTI (Debt-to-Income) - máximo 30%
  - Ratio LTV (Loan-to-Value) - 70% hipotecario / 80% leasing
  - Validación de edad al final del plazo (máx. 84 años)
- **Validaciones Inteligentes**:
  - Edad + plazo ≤ 84 años
  - Capacidad de pago ≤ 30% de ingresos netos
  - Financiación: 70% (hipotecario) / 80% (leasing)
  - Status migratorio y reportes crediticios
- **Generación de PDF**: Carta de preaprobación profesional (client-side con html-to-image + jsPDF)
- **Persistencia**: Estado guardado en localStorage (sobrevive recargas)
- **Responsive**: Diseño adaptativo para móvil y desktop
- **Resultados Detallados**: Aprobado ✅, Rechazado ❌ o Advertencia ⚠️ con recomendaciones
- **Integración con Contacto**: Pre-rellena datos en formulario de contacto

### Pasos del Simulador

1. **Información Personal**:
   - Nombre completo, correo, teléfono con código de país
   - Fecha de nacimiento (validación de edad 18-74 años)
   - Tipo de crédito: Hipotecario o Leasing

2. **Información del Inmueble**:
   - Valor del inmueble (min: $50M, máx: $5.000M COP)
   - Monto solicitado (validación LTV según tipo)
   - Plazo en meses (12-240 meses / 1-20 años)

3. **Ingresos y Gastos**:
   - Ingresos fijos mensuales
   - Ingresos variables - adicionales (opcionales)
   - Deducciones (salud, pensión, etc.)
   - Obligaciones financieras actuales:
     - Tarjetas de crédito (se calcula 3% del cupo)
     - Arriendos, otros créditos, pensiones alimenticias

4. **Elegibilidad**:
   - Status migratorio válido (cédula extranjería, doble nacionalidad, visa temporal/permanente)
   - Reportes crediticios negativos en Colombia

5. **Resultados**:
   - Estado: Aprobado ✅ / Advertencia ⚠️ / Rechazado ❌
   - Cuota mensual estimada
   - Tasa de interés EA
   - Relación cuota/ingreso (DTI ratio)
   - Recomendaciones personalizadas
   - Opciones:
     - Descargar carta de preaprobación (PDF)
     - Enviar por WhatsApp
     - Solicitar asesoría (redirige a contacto)

### Estructura de Archivos

```
pages/simulador/credito/
├── index.vue                    // Página principal del simulador
└── carta-preaprobacion.vue      // Template de carta de preaprobación

components/simulador/
├── SimuladorWizard.vue          // Lógica principal del wizard
├── steps/                       // Componentes de cada paso
│   ├── StepPersonalInfo.vue
│   ├── StepPropertyInfo.vue
│   ├── StepIncomeInfo.vue
│   ├── StepElegibility.vue
│   └── StepResults.vue
└── ui/                          // Componentes de UI reutilizables
    ├── ProgressBar.vue
    └── VerticalStepper.vue

components/
├── CurrencyInput.vue            // Input para valores monetarios
└── DatePicker.vue               // Selector de fecha

stores/
└── simulador.ts                 // Store Pinia con estado del simulador

composables/
├── useSimuladorCalculations.ts  // Lógica de cálculos financieros
├── usePreApprovalPDF.ts         // Navegación a página de preaprobación
├── useDirectPDFDownload.ts      // Generación directa de PDF desde StepResults
└── useGeneratePDFFromElement.ts // Generación de PDF desde DOM element

server/api/
└── send/
    └── simulator-lead.post.ts   // Notificación de simulador

types/
└── simulador.ts                 // Tipos TypeScript

utils/
└── formatters.ts                // Helpers para formateo de moneda
```

### Ejemplo de Uso

```typescript
// En cualquier componente
import { useSimuladorStore } from '~/stores/simulador'
import { useSimuladorCalculations } from '~/composables/useSimuladorCalculations'

const store = useSimuladorStore()
const { calculate } = useSimuladorCalculations()

// Calcular resultado
const resultado = calculate({
  datosPersonales: store.datosPersonales,
  datosBien: store.datosBien,
  datosIngresos: store.datosIngresos,
  datosElegibilidad: store.datosElegibilidad
})

// Acceder al resultado almacenado
const status = store.resultado.estado // 'aprobado' | 'rechazado' | 'advertencia'

// Generar PDF (solo si está aprobado)
import { usePreApprovalPDF } from '~/composables/usePreApprovalPDF'
const { generatePDF, isGenerating, canGeneratePDF } = usePreApprovalPDF()

if (canGeneratePDF.value) {
  await generatePDF()
}

// Resetear simulador
store.resetearTodo()
```

### Constantes Financieras

```typescript
TASA_EA = 14%                          // Tasa Efectiva Anual
TASA_MENSUAL = 1.0975%                 // Calculada de EA
EDAD_FINAL_MAXIMA = 84 años
PLAZO_MINIMO = 12 meses (1 año)
PLAZO_MAXIMO = 240 meses (20 años)
PORCENTAJE_COMPROMISO_MAXIMO = 30%    // DTI Ratio
FINANCIACION_HIPOTECARIO = 70%        // LTV
FINANCIACION_LEASING = 80%            // LTV
```

---

## 📞 Formulario de Contacto Mejorado

### Características de Seguridad

- **Cloudflare Turnstile**: CAPTCHA invisible que protege contra bots sin afectar UX
- **Validación de Tiempo**: Mínimo 3 segundos desde que se abre el formulario
- **Honeypot Field**: Campo oculto para detectar bots
- **Rate Limiting**: Máximo 8 solicitudes cada 5 minutos por IP
- **Validación con Zod**: Esquemas TypeScript-first con mensajes claros

### Detección Automática de País

El formulario detecta automáticamente el país del usuario por IP y pre-selecciona el código de teléfono:

```typescript
// Usa servicio geojs.io para geolocalización
const dialCode = await detectDialCode() // "+57" para Colombia
```

### Formato de Teléfono Inteligente

Los números se formatean automáticamente según el país seleccionado con 30+ países soportados:

| País | Código | Formato | Ejemplo |
|------|--------|---------|---------|
| Colombia | +57 | XXX XXX XXXX | 300 123 4567 |
| Estados Unidos | +1 | (XXX) XXX-XXXX | (555) 123-4567 |
| España | +34 | XXX XX XX XX | 612 34 56 78 |
| México | +52 | XX XXXX XXXX | 55 1234 5678 |
| Argentina | +54 | XX XXXX-XXXX | 11 1234-5678 |

**Características**:
- Formateo en tiempo real mientras se escribe
- Placeholder dinámico según país
- Soporte para múltiples códigos (Rep. Dominicana: +1809/+1829/+1849)
- Preservación de posición del cursor
- Validación de longitud por país

### Pre-llenado desde Simulador

Cuando el usuario viene del simulador, el formulario se pre-rellena automáticamente con:
- Nombre completo
- Email
- Teléfono con código de país
- Resumen de simulación en el mensaje

### Integraciones del Endpoint `/api/contact`

El endpoint maneja todo en una sola llamada:

1. **Verificación de Turnstile** - Valida token de Cloudflare
2. **Validación de Datos** - Esquema Zod estricto
3. **Rate Limiting** - Control por IP con headers personalizados
4. **Guardado en Directus** - Colección `leads` con todos los datos
5. **Notificaciones Paralelas** (`Promise.allSettled`):
   - Email via Resend a gerenciacomercial@contuhogar.com
   - BCC automático a israsenior.dev@gmail.com
   - Telegram (opcional) con formato emoji-rich

### Campos del Formulario

| Campo | Tipo | Validación | Requerido |
|-------|------|------------|-----------|
| firstName | string | Min 2 caracteres | ✅ Sí |
| lastName | string | Min 2 caracteres | ❌ No |
| email | string | Email válido | ✅ Sí |
| dialCode | string | Código válido de país | ✅ Sí |
| phone | string | Según formato de país | ✅ Sí |
| message | string | Min 10 caracteres | ❌ No |
| source_page | string | URL de origen | ❌ No |
| simuladorInfo | object | Datos del simulador | ❌ No |
| cf-turnstile-response | string | Token de CAPTCHA | ✅ Sí |

---

## 📜 Scripts Disponibles

```json
{
  "dev": "nuxt dev",              // Iniciar servidor de desarrollo
  "build": "nuxt build",          // Build para producción
  "generate": "nuxt generate",    // Generar sitio estático
  "preview": "nuxt preview",      // Preview de build
  "postinstall": "nuxt prepare"   // Preparar tipos (auto-ejecutado)
}
```

### Scripts de Directus

```bash
# Exportar schema de Directus
pnpm directus:schema

# Generar tipos TypeScript desde Directus
pnpm directus:types

# Gestionar snapshots de Directus
pnpm directus:snapshot
pnpm directus:snapshot:create
pnpm directus:snapshot:list
```

### Comandos Adicionales Útiles

```bash
# Análisis de bundle
npx nuxi analyze

# Verificación de tipos
npx nuxi typecheck

# Limpiar cache
npx nuxi cleanup

# Info del proyecto
npx nuxi info

# Actualizar dependencias
pnpm update --interactive

# Auditoría de seguridad
pnpm audit

# Actualizar browserslist
npx update-browserslist-db@latest

# Ejecutar scripts personalizados
npx tsx [archivo.ts]
```

---

## 📊 Análisis y Optimización

### Performance Metrics

| Métrica | Target | Actual |
|---------|--------|--------|
| Largest Contentful Paint (LCP) | < 2.5s | 🟡 Optimizable |
| First Input Delay (FID) | < 100ms | ✅ Bueno |
| Cumulative Layout Shift (CLS) | < 0.1 | ✅ Bueno |
| Bundle Size (gzip) | < 200KB | ✅ ~72KB |

### Optimizaciones Implementadas

- ✅ SSR (Server-Side Rendering) para mejor SEO
- ✅ Code splitting automático por página
- ✅ Tree shaking de dependencias no utilizadas
- ✅ Compresión gzip/brotli en producción
- ✅ Lazy loading de imágenes
- ✅ Preconnect a recursos externos
- ✅ WebP para imágenes (reducción ~80% vs PNG)
- ✅ Cloudflare Turnstile para seguridad sin fricción
- ✅ Rate limiting por IP en endpoints sensibles
- ✅ Headers de seguridad configurados
- ✅ TypeScript en stores y composables
- ✅ PDF generation client-side (html-to-image + jsPDF)

### Mejoras Pendientes (Roadmap)

- 🔄 Implementar `@nuxt/image` para optimización automática
- 🔄 Agregar sitemap dinámico con `@nuxtjs/sitemap`
- 🔄 Agregar testing (Vitest + Vue Test Utils)
- 🔄 Implementar PWA con `@vite-pwa/nuxt`
- 🔄 Mejorar accesibilidad (ARIA labels, navegación por teclado)
- 🔄 Agregar i18n para inglés con `@nuxtjs/i18n`

---

## 👥 Contribuir

Contribuciones son bienvenidas. Por favor sigue estos pasos:

### 1. Fork del Proyecto

```bash
gh repo fork contuhogar/contuhogar.com
```

### 2. Crear Branch de Feature

```bash
git checkout -b feature/AmazingFeature
```

### 3. Commit de Cambios

```bash
git commit -m "Add: descripción del cambio"
```

Prefijos de commit recomendados:
- `Add:` Nueva funcionalidad
- `Fix:` Corrección de bug
- `Update:` Actualización de funcionalidad existente
- `Refactor:` Refactorización de código
- `Docs:` Cambios en documentación
- `Style:` Cambios de formato (sin afectar lógica)
- `Test:` Agregar o actualizar tests

### 4. Push al Branch

```bash
git push origin feature/AmazingFeature
```

### 5. Abrir Pull Request

Ve a GitHub y crea un Pull Request describiendo:
- Qué cambios realizaste
- Por qué son necesarios
- Cómo fueron testeados

---

## 📝 Changelog

### [2.2.0] - 2026-01-31

#### ✨ Nuevas Funcionalidades

- **Sistema de Skeletons Profesional**: Sistema completo de componentes de carga para eliminar FOUC
  - 4 primitivos base (Box, Text, Circle, Image) con animación shimmer
  - 4 skeletons de cards (Blog, Service, Testimonial, Accordion)
  - 4 skeletons de secciones (HeroHome, HeroSection, Stats, BankLogos)
  - 4 skeletons de página completa (BlogPost, ServicePage, Simulador, LegalPage)
  - Composable `useLoading(minDuration)` para control centralizado
  - Soporte para `prefers-reduced-motion` (accesibilidad)
  - Variantes light/dark para fondos oscuros

- **Rediseño de Páginas Legales**: Nueva UI estilo Stripe/Notion
  - Layout de 2 columnas con sidebar sticky
  - Navegación por anclas con detección de sección activa (Intersection Observer)
  - Secciones colapsables con acordeones
  - Dropdown de índice en móvil
  - Contenido simplificado y legible
  - Iconos SVG inline por sección

#### 📦 Nuevos Archivos

**Composables**:
- `composables/useLoading.ts` - Estado de carga con duración mínima

**Componentes Skeleton**:
- `components/skeleton/SkeletonBox.vue`
- `components/skeleton/SkeletonText.vue`
- `components/skeleton/SkeletonCircle.vue`
- `components/skeleton/SkeletonImage.vue`
- `components/skeleton/SkeletonBlogCard.vue`
- `components/skeleton/SkeletonServiceCard.vue`
- `components/skeleton/SkeletonTestimonialCard.vue`
- `components/skeleton/SkeletonHeroHome.vue`
- `components/skeleton/SkeletonHeroSection.vue`
- `components/skeleton/SkeletonStatsSection.vue`
- `components/skeleton/SkeletonBankLogos.vue`
- `components/skeleton/SkeletonAccordion.vue`
- `components/skeleton/SkeletonBlogPost.vue`
- `components/skeleton/SkeletonServicePage.vue`
- `components/skeleton/SkeletonSimulador.vue`
- `components/skeleton/SkeletonLegalPage.vue`

**Componentes Legal**:
- `components/legal/LegalPageLayout.vue`
- `components/legal/LegalSection.vue`

#### 🔧 Modificaciones

- `assets/css/main.css`: Animación shimmer y variante light
- `pages/index.vue`: Integración completa de skeletons
- `pages/blog/index.vue`: Skeletons para hero, featured, grid
- `pages/blog/[slug].vue`: SkeletonBlogPost
- `pages/servicios/index.vue`: Skeletons para secciones
- `pages/servicios/[slug].vue`: SkeletonServicePage
- `pages/simulador/credito/index.vue`: SkeletonSimulador
- `pages/faqs.vue`: Skeletons para hero y acordeones
- `pages/nosotros.vue`: Skeletons para todas las secciones
- `pages/contacto.vue`: Skeleton para formulario
- `pages/terminos-condiciones.vue`: Rediseño completo con LegalPageLayout
- `pages/politica-privacidad.vue`: Rediseño con 13 secciones colapsables

---

### [2.1.0] - 2025-01-12

#### ✨ Nuevas Funcionalidades

- **Simulador de Crédito Completo**: Wizard interactivo de 5 pasos con cálculos financieros en tiempo real y generación de PDF
  - Evaluación de elegibilidad para crédito hipotecario y leasing
  - Validación de edad + plazo (máx. 84 años), capacidad de pago (DTI ≤30%), y LTV (70%/80%)
  - Cálculo de cuota mensual usando fórmula PMT
  - Resultados detallados: Aprobado ✅, Rechazado ❌ o Advertencia ⚠️
  - **Generación de Carta de Preaprobación en PDF** usando Puppeteer
  - Persistencia de estado en localStorage
  - Pre-relleno de formulario de contacto desde simulador
  - Integración con Telegram para notificaciones de simulador
  - 25+ nuevos componentes y archivos (4000+ líneas de código)

- **Formulario de Contacto con Cloudflare Turnstile**:
  - **CAPTCHA invisible** usando Cloudflare Turnstile (sin fricción UX)
  - **Validación de tiempo** (mínimo 3 segundos antes de submit)
  - Detección automática de país por IP
  - Formato de teléfono dinámico en tiempo real (30+ países)
  - Rate limiting mejorado (8 requests/5min con feedback visual)
  - Soporte para múltiples códigos de área por país
  - API consolidada con ejecución paralela de notificaciones

- **Nuevas Páginas**:
  - `/politica-privacidad` - Política de privacidad (Ley 1581/2012 Colombia)
  - `/simulador/credito` - Simulador de crédito
  - `/simulador/credito/carta-preaprobacion` - Template de carta PDF

- **Componentes de UI Modernos**:
  - Cards (BlogCard, ServiceCard)
  - Sections (Hero, CTA, Stats, BankLogos, TestimonialMarquee)
  - Sidebar (ResourcesList, SidebarCTA)
  - UI generales (Accordion, SearchBar, CategoryPills)
  - Inputs especializados (CurrencyInput, DatePicker)

#### 📦 Nuevos Archivos Clave

**Stores (TypeScript)**:
- `stores/simulador.ts` - Store Pinia del simulador con localStorage
- `stores/index.ts` - Store principal migrado a TypeScript

**Composables**:
- `composables/useSimuladorCalculations.ts` - Cálculos financieros avanzados
- `composables/usePreApprovalPDF.ts` - Generación de PDF
- `composables/useSeo.ts` - Helpers para SEO

**Server Endpoints**:
- `server/api/pdf/pre-approval.post.ts` - Generación de PDF con Puppeteer
- `server/api/send/simulator-lead.post.ts` - Notificaciones de simulador
- `server/utils/turnstile.ts` - Verificación de Cloudflare Turnstile

**Tipos y Utilidades**:
- `types/simulador.ts` - Interfaces TypeScript completas
- `utils/formatters.ts` - Formateadores de moneda/números

**Layouts**:
- `layouts/simulador.vue` - Layout sin header/footer para experiencia fullscreen

**Plugins**:
- `plugins/v-calendar.client.ts` - Configuración de v-calendar

#### 🔧 Modificaciones Importantes

- `server/api/contact.post.ts`:
  - Integración de **Cloudflare Turnstile**
  - Validación de tiempo de formulario
  - Campos opcionales: lastName, message, simuladorInfo
  - Rate limit: 8 requests/5min (aumentado)
  - Ejecución paralela de notificaciones

- `components/Header.vue`: Botón CTA para simulador
- `nuxt.config.ts`: Módulo Turnstile agregado
- `package.json`: Nuevas dependencias (turnstile, puppeteer, v-calendar)
- Migración completa a `pnpm 9.15.0`

#### 🗑️ Archivos Eliminados

- `components/SimpleCaptcha.vue` → Reemplazado por Turnstile
- `components/simulador/SimuladorModal.vue` → Reestructurado
- `composables/useCaptcha.ts` → Obsoleto
- `composables/useSimuladorStore.ts` → Movido a `stores/simulador.ts`
- `pages/simulador/index.vue` → Reorganizado a `/credito/`
- Logos PNG/SVG → Convertidos a WebP (reducción 80% tamaño)

#### 🎨 Assets Optimizados

**Nuevos Logos WebP**:
- `amarilo-logo.webp` (11.6 KB)
- `banco-occidental.webp` (1.8 KB)
- `banco-union.webp` (3.8 KB)
- `colpatria-logo.webp` (2.4 KB)
- `logo-banco-de-bogota.webp` (13.9 KB)

#### 📚 Documentación

- Actualización masiva de README.md:
  - Sección completa de Simulador de Crédito
  - Documentación de Formulario de Contacto mejorado
  - Estructura de proyecto actualizada
  - Tabla de rutas completa
  - Variables de entorno (Turnstile)
  - Cambio de Yarn a pnpm en todos los comandos

### [2.0.0] - 2025-01-11

#### 🚀 Actualización Mayor: Nuxt 4

- **BREAKING**: Actualización de Nuxt 3.16.2 → 4.2.0
- **BREAKING**: Reemplazo de `@zadigetvoltaire/nuxt-gtm` → `@saslavik/nuxt-gtm`

#### ⬆️ Actualizaciones de Dependencias

- Nuxt: 3.16.2 → **4.2.0**
- Vue: 3.5.13 → 3.5.22
- Vite: 5.x → 7.1.12
- Tailwind CSS: 4.1.5 → 4.1.16
- @tailwindcss/vite: 4.1.5 → 4.1.16
- Directus SDK: 20.0.2 → 20.1.0
- Resend: 6.0.1 → 6.4.0
- Zod: 4.0.17 → 4.1.12
- Vue Router: 4.5.0 → 4.6.3
- vue3-carousel-nuxt: 1.1.5 → 1.1.6

#### 🐛 Correcciones

- Resolución de warnings de peer dependencies de Vite
- Actualización de browserslist database

#### 📚 Documentación

- Creación de `CLAUDE.md` para guía de desarrollo con IA
- Actualización completa de `README.md` con nueva estructura y badges
- Documentación de todas las integraciones

#### 🔒 Seguridad

- Identificación de token de admin expuesto al cliente (pendiente de corrección)
- Documentación de mejores prácticas de seguridad

---

## 📄 Licencia

Este proyecto es privado y pertenece a ContuHogar. Todos los derechos reservados.

---

## 📞 Contacto

- **Sitio Web**: [https://contuhogar.com](https://contuhogar.com)
- **Email**: gerenciacomercial@contuhogar.com
- **WhatsApp**: +57 315 054 0000

---

## 🙏 Agradecimientos

- [Nuxt Team](https://nuxt.com/) por el excelente framework
- [Directus](https://directus.io/) por el headless CMS
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de diseño
- [Vercel](https://vercel.com/) por el hosting y deployment

---

<div align="center">

**Hecho con ❤️ por el equipo de ContuHogar**

[⬆ Volver arriba](#contuhogarcom)

</div>
