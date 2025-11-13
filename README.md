# ConTuHogar.com

<div align="center">

![Nuxt 4](https://img.shields.io/badge/Nuxt-4.2.0-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue.js-3.5.22-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.16-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Plataforma de asesoría financiera e inmobiliaria para colombianos en el exterior**

[Sitio Web](https://contuhogar.com) · [Reportar Bug](https://github.com/contuhogar/contuhogar.com/issues) · [Solicitar Feature](https://github.com/contuhogar/contuhogar.com/issues)

</div>

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

ConTuHogar.com es una plataforma web diseñada para conectar a colombianos que viven en el exterior con oportunidades de inversión inmobiliaria y financiera en Colombia. La plataforma ofrece:

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

### Package Manager

- **[Yarn 1.22.22](https://classic.yarnpkg.com/)** - Gestor de paquetes

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v18.0.0 o superior ([descargar](https://nodejs.org/))
- **Yarn**: v1.22.22 ([instalar](https://classic.yarnpkg.com/en/docs/install))
- **Git**: Para clonar el repositorio

Verificar instalación:

```bash
node --version  # Debe ser >= v18.0.0
yarn --version  # Debe ser 1.22.22
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
yarn install
```

Este comando instalará todas las dependencias listadas en `package.json` y ejecutará automáticamente `yarn postinstall` (que ejecuta `nuxt prepare` para generar tipos).

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
yarn dev
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
yarn postinstall

# Verificar tipos de TypeScript
npx nuxi typecheck
```

---

## 🏗️ Producción

### Build para Producción

```bash
yarn build
```

Este comando:
1. Compila el código optimizado para producción
2. Genera archivos estáticos en `.output/public`
3. Prepara el servidor Nitro en `.output/server`

### Preview de Build de Producción

```bash
yarn preview
```

Inicia un servidor local para previsualizar el build de producción en `http://localhost:3000`.

### Generar Sitio Estático (SSG)

```bash
yarn generate
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
│   ├── PhoneCountryCombobox.vue  # Selector de país con búsqueda
│   └── simulador/        # Componentes del simulador
│       ├── SimuladorModal.vue     # Modal del simulador
│       ├── SimuladorWizard.vue    # Wizard principal
│       ├── steps/
│       │   ├── StepPersonalInfo.vue   # Paso 1: Datos personales
│       │   ├── StepPropertyInfo.vue   # Paso 2: Datos del bien
│       │   ├── StepIncomeInfo.vue     # Paso 3: Ingresos y gastos
│       │   ├── StepElegibility.vue    # Paso 4: Elegibilidad
│       │   └── StepResults.vue        # Paso 5: Resultados
│       └── ui/
│           ├── ProgressBar.vue         # Barra de progreso
│           ├── StepNavigation.vue      # Navegación entre pasos
│           ├── ValidationMessage.vue   # Mensajes de validación
│           └── VerticalStepper.vue     # Indicador de pasos
├── composables/          # Composables de Vue
│   ├── useDirectus.ts    # Helper para fetch de Directus
│   ├── useGeoLocation.ts # Detección de país por IP
│   ├── useSimuladorStore.ts          # Store del simulador
│   └── useSimuladorCalculations.ts   # Cálculos financieros
├── layouts/              # Layouts de página
│   └── default.vue       # Layout por defecto
├── pages/                # Páginas (file-based routing)
│   ├── index.vue         # Homepage
│   ├── contacto.vue      # Formulario de contacto
│   ├── nosotros.vue      # Página "Sobre Nosotros"
│   ├── faqs.vue          # Preguntas frecuentes
│   ├── terminos-condiciones.vue
│   ├── blog/
│   │   ├── index.vue     # Lista de artículos
│   │   └── [slug].vue    # Artículo individual
│   ├── servicios/
│   │   ├── index.vue     # Lista de servicios
│   │   └── [slug].vue    # Servicio individual
│   └── simulador/
│       └── index.vue     # Simulador de crédito
├── plugins/              # Plugins de Nuxt
│   ├── directus.client.ts # Cliente Directus (navegador)
│   └── directus.server.ts # Servidor Directus (SSR)
├── public/               # Assets estáticos
│   ├── logos/           # Logos de bancos y partners
│   ├── team/            # Fotos del equipo
│   ├── testimonials/    # Fotos de testimonios
│   ├── docs/            # Documentos PDF
│   ├── favicon.ico
│   └── robots.txt
├── server/               # API y server routes
│   └── api/
│       ├── contact.post.ts      # Endpoint para guardar leads
│       └── send/
│           └── lead.post.ts     # Endpoint para enviar emails
├── stores/               # Stores de Pinia
│   └── index.js         # Store principal con datos
├── types/                # Definiciones de TypeScript
│   └── simulador.ts     # Tipos del simulador
├── utils/                # Utilidades
│   ├── formatters.ts    # Formateadores de moneda/números
│   └── phoneFormats.ts  # Formatos de teléfono por país
├── db/                   # Datos estáticos JSON
│   └── tlf-dial.json    # Códigos de país (30+ países)
├── .env                 # Variables de entorno (NO commit)
├── .env.example         # Template de variables de entorno
├── .gitignore           # Archivos ignorados por Git
├── CLAUDE.md            # Guía para Claude Code AI
├── nuxt.config.ts       # Configuración de Nuxt
├── package.json         # Dependencias del proyecto
├── README.md            # Este archivo
├── tsconfig.json        # Configuración de TypeScript
└── yarn.lock            # Lock file de Yarn
```

### Directorio `pages/`

Nuxt utiliza file-based routing. Cada archivo `.vue` en `pages/` se convierte automáticamente en una ruta:

| Archivo | Ruta |
|---------|------|
| `pages/index.vue` | `/` |
| `pages/contacto.vue` | `/contacto` |
| `pages/simulador/index.vue` | `/simulador` |
| `pages/blog/index.vue` | `/blog` |
| `pages/blog/[slug].vue` | `/blog/:slug` |
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

**Composable** para fetch de datos:

```typescript
// composables/useDirectus.ts
const { data, error } = await useDirectusItems<T>('collection_name', {
  filter: { status: { _eq: 'published' } },
  sort: ['-date_created']
})
```

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

El simulador de crédito es un wizard interactivo de 5 pasos que permite a los usuarios evaluar su elegibilidad para créditos hipotecarios y leasing habitacional. Incluye validaciones en tiempo real y cálculos financieros precisos.

### Características

- **Wizard Multi-Paso**: Navegación fluida entre 5 pasos con validación progresiva
- **Cálculos Financieros**: Fórmula PMT para cuota mensual, ratios DTI y LTV
- **Validaciones Inteligentes**:
  - Edad + plazo ≤ 84 años
  - Capacidad de pago ≤ 30% de ingresos netos
  - Financiación: 70% (hipotecario) / 80% (leasing)
- **Persistencia**: Estado guardado en localStorage
- **Responsive**: Diseño adaptativo para móvil y desktop
- **Resultados Detallados**: Aprobado, Rechazado o Advertencia con recomendaciones

### Pasos del Simulador

1. **Información Personal**: Edad y tipo de crédito (hipotecario/leasing)
2. **Información del Bien**: Valor del bien, monto solicitado, plazo
3. **Ingresos y Gastos**: Ingresos fijos/variables, deducciones, obligaciones
4. **Elegibilidad**: Status migratorio, reportes crediticios
5. **Resultados**: Evaluación completa con cuota mensual y recomendaciones

### Estructura de Archivos

```typescript
components/simulador/
├── SimuladorModal.vue        // Modal contenedor
├── SimuladorWizard.vue       // Lógica principal del wizard
├── steps/                    // Componentes de cada paso
│   ├── StepPersonalInfo.vue
│   ├── StepPropertyInfo.vue
│   ├── StepIncomeInfo.vue
│   ├── StepElegibility.vue
│   └── StepResults.vue
└── ui/                       // Componentes de UI reutilizables
    ├── ProgressBar.vue
    ├── StepNavigation.vue
    ├── ValidationMessage.vue
    └── VerticalStepper.vue

composables/
├── useSimuladorStore.ts           // Store Pinia con estado del simulador
└── useSimuladorCalculations.ts   // Lógica de cálculos financieros

types/
└── simulador.ts              // Tipos TypeScript

utils/
└── formatters.ts             // Helpers para formateo de moneda
```

### Ejemplo de Uso

```typescript
// En cualquier componente
import { useSimuladorStore } from '~/composables/useSimuladorStore'

const store = useSimuladorStore()

// Acceder al resultado
const resultado = store.resultado // 'aprobado' | 'rechazado' | 'advertencia'

// Resetear simulador
store.resetSimulador()
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

## 📞 Optimizaciones del Formulario de Contacto

### Detección Automática de País

El formulario detecta automáticamente el país del usuario usando su dirección IP:

```typescript
// composables/useGeoLocation.ts
const { detectCountry } = useGeoLocation()

onMounted(async () => {
  const country = await detectCountry() // "CO", "US", "ES", etc.
  // Pre-selecciona el código de país correspondiente
})
```

### Formato de Teléfono Dinámico

Los números de teléfono se formatean automáticamente según el país seleccionado:

```typescript
// utils/phoneFormats.ts
const phoneFormats: Record<string, PhoneFormat> = {
  '+57': { format: 'XXX XXX XXXX', placeholder: '300 123 4567', mask: '### ### ####' },
  '+1': { format: '(XXX) XXX-XXXX', placeholder: '(555) 123-4567', mask: '(###) ###-####' },
  '+34': { format: 'XXX XX XX XX', placeholder: '612 34 56 78', mask: '### ## ## ##' },
  // ... 30+ países más
}
```

**Características**:
- Formateo en tiempo real mientras el usuario escribe
- Placeholder dinámico según país seleccionado
- Soporte para países con múltiples códigos de área (República Dominicana: +1809, +1829, +1849)
- Preservación de posición del cursor

### Selector de País Mejorado

Componente **PhoneCountryCombobox.vue** con:
- Búsqueda interna por nombre de país o código
- Navegación por teclado (↑↓, Enter, Esc)
- Display de formato de teléfono en cada opción
- Manejo de países con múltiples códigos de área

### API Consolidada

El endpoint `/api/contact` ahora maneja:
1. Validación con Zod
2. Guardado en Directus
3. Envío de email (Resend)
4. Notificación Telegram (opcional)

Todo en una sola llamada, con ejecución en paralelo de notificaciones usando `Promise.allSettled()`.

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
yarn upgrade-interactive

# Auditoría de seguridad
yarn audit

# Actualizar browserslist
npx update-browserslist-db@latest
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

### Mejoras Pendientes (Roadmap)

- 🔄 Migrar `stores/index.js` a TypeScript
- 🔄 Implementar `@nuxt/image` para optimización de imágenes
- 🔄 Agregar sitemap dinámico con `@nuxtjs/sitemap`
- 🔄 Implementar rate limiting con `nuxt-rate-limit`
- 🔄 Configurar headers de seguridad
- 🔄 Agregar testing (Vitest)

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

### [2.1.0] - 2025-01-12

#### ✨ Nuevas Funcionalidades

- **Simulador de Crédito Completo**: Wizard interactivo de 5 pasos con cálculos financieros en tiempo real
  - Evaluación de elegibilidad para crédito hipotecario y leasing
  - Validación de edad + plazo, capacidad de pago (DTI), y porcentaje de financiación (LTV)
  - Cálculo de cuota mensual usando fórmula PMT
  - Resultados detallados: Aprobado, Rechazado o Advertencia con recomendaciones personalizadas
  - Persistencia de estado en localStorage
  - 17 nuevos componentes y archivos (3292+ líneas de código)

- **Optimizaciones del Formulario de Contacto**:
  - Detección automática de país por IP usando geojs.io API
  - Formato de teléfono dinámico en tiempo real (30+ países soportados)
  - Selector de país mejorado con búsqueda interna (PhoneCountryCombobox)
  - Soporte para países con múltiples códigos de área (RD: +1809/+1829/+1849, PR: +1787/+1939)
  - Placeholder dinámico según país seleccionado
  - API consolidada: guardado + notificaciones en un solo endpoint

#### 📦 Nuevos Archivos

**Componentes**:
- `components/PhoneCountryCombobox.vue` - Selector de país con búsqueda
- `components/simulador/SimuladorModal.vue` - Modal del simulador
- `components/simulador/SimuladorWizard.vue` - Wizard principal (6163 bytes)
- `components/simulador/steps/` - 5 componentes de pasos
- `components/simulador/ui/` - 4 componentes de UI

**Composables**:
- `composables/useGeoLocation.ts` - Detección de país por IP
- `composables/useSimuladorStore.ts` - Store Pinia del simulador
- `composables/useSimuladorCalculations.ts` - Cálculos financieros

**Tipos y Utilidades**:
- `types/simulador.ts` - Definiciones TypeScript
- `utils/formatters.ts` - Formateadores de moneda/números
- `utils/phoneFormats.ts` - Formatos de teléfono por país

**Páginas**:
- `pages/simulador/index.vue` - Página del simulador

**Datos**:
- `db/tlf-dial.json` - Códigos de país actualizados (múltiples códigos para RD y PR)

#### 🔧 Modificaciones

- `components/Header.vue`: Agregado botón "Simular Crédito" que abre modal
- `server/api/contact.post.ts`:
  - Campos lastName y message ahora opcionales
  - Rate limit aumentado de 3 a 8 requests/5min
  - Integración de notificaciones (Resend + Telegram) en endpoint consolidado
  - Ejecución paralela de notificaciones con `Promise.allSettled()`

#### 📚 Documentación

- Actualización completa de README.md con:
  - Documentación del simulador de crédito
  - Guía de optimizaciones del formulario de contacto
  - Estructura de archivos actualizada
  - Nuevas rutas en tabla de routing

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

Este proyecto es privado y pertenece a ConTuHogar. Todos los derechos reservados.

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

**Hecho con ❤️ por el equipo de ConTuHogar**

[⬆ Volver arriba](#contuhogarcom)

</div>
