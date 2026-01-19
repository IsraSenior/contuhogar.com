# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 4 application (v4.2.0) for ConTuHogar, a financial services company specializing in housing credit for Colombians living abroad. The application is built with Vue 3, Tailwind CSS 4, and integrates with Directus CMS for content management.

---

## FUNDAMENTAL PROJECT RULE: MANDATORY AGENT DELEGATION

**THIS IS A NON-NEGOTIABLE RULE FOR THIS PROJECT.**

ALL tasks in this codebase MUST be delegated to a specialized agent. Direct task execution is PROHIBITED.

| Task Type | Required Agent |
|-----------|----------------|
| UI/Components/Styling | `nuxt-ui-engineer` |
| Logic/API/Data | `nuxt-logic-architect` |
| SEO/Meta/Structured Data | `nuxt-seo-specialist` |
| CMS Content Operations | `directus-cms-operator` |
| Documentation | `context-steward` |
| Understanding Code | `Explore` |
| Planning Features | `Plan` |

**There are NO exceptions to this rule.** See the full "Specialized Agents" section below for detailed usage guidelines.

---

## Development Commands

```bash
# Install dependencies (using pnpm - see packageManager in package.json)
pnpm install

# Start development server (runs on http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Prepare Nuxt (runs automatically after install)
pnpm postinstall
```

## Architecture Overview

### Core Stack
- **Framework**: Nuxt 4.2.0 (with SSR enabled by default)
- **Styling**: Tailwind CSS 4 (via @tailwindcss/vite plugin)
- **State Management**: Pinia (stores in `stores/index.ts`)
- **CMS**: Directus (headless CMS for content)
- **Email**: Resend API
- **Analytics**: Google Tag Manager (GTM) and Google Analytics (gtag)

### Directory Structure

- `pages/` - File-based routing with:
  - Static pages: `index.vue`, `contacto.vue`, `nosotros.vue`, `faqs.vue`, `terminos-condiciones.vue`, `politica-privacidad.vue`
  - Dynamic routes: `blog/[slug].vue`, `servicios/[slug].vue`
  - Index pages: `blog/index.vue`, `servicios/index.vue`
  - Simulator pages: `simulador/credito/index.vue`, `simulador/credito/carta-preaprobacion.vue`

- `components/` - Global Vue components (auto-imported):
  - **Global**: `Header.vue`, `Footer.vue`, `Logo.vue`, `Whatsapp.vue`
  - **Cards**: `cards/BlogCard.vue`, `cards/ServiceCard.vue`
  - **Sections**: `sections/HeroSection.vue`, `sections/BankLogosSection.vue`, `sections/StatsSection.vue`, `sections/TestimonialMarquee.vue`, `sections/CTASection.vue`
  - **Sidebar**: `sidebar/ResourcesList.vue`, `sidebar/SidebarCTA.vue`
  - **UI**: `ui/Accordion.vue`, `ui/CategoryPills.vue`, `ui/SearchBar.vue`
  - **Inputs**: `CurrencyInput.vue`, `DatePicker.vue`, `PhoneCountryCombobox.vue`
  - **Simulador**: `simulador/SimuladorWizard.vue`, `simulador/steps/*` (5 step components), `simulador/ui/*` (4 UI components)

- `layouts/` - Layout templates:
  - `default.vue` - Main layout with Header, Footer, and Whatsapp components
  - `simulador.vue` - Minimal layout for simulator wizard (without header/footer)

- `composables/` - Composable functions:
  - `useDirectus.ts` - Helper for fetching Directus collections with `useDirectusItems<T>(collection, params)`
  - `useSimuladorCalculations.ts` - Financial calculations (PMT formula, DTI, LTV ratios)
  - `usePreApprovalPDF.ts` - PDF generation for pre-approval letters
  - `useSeo.ts` - SEO helpers with schema.org support
  - `useGeoLocation.ts` - IP-based country detection for phone formatting
  - `useRateLimit.ts` - Client-side rate limit tracking
  - `useTracking.ts` - GTM/GA4 event helpers

- `plugins/` - Nuxt plugins:
  - `directus.server.ts` - Server-side Directus client with admin token
  - `directus.client.ts` - Client-side Directus client with public token
  - `v-calendar.client.ts` - v-calendar date picker configuration

- `server/api/` - Server API routes:
  - `contact.post.ts` - Saves leads to Directus with Turnstile validation and Zod schema
  - `send/lead.post.ts` - Sends lead notifications via Resend email and Telegram
  - `send/simulator-lead.post.ts` - Simulator-specific lead notifications
  - `pdf/pre-approval.post.ts` - PDF generation using Puppeteer
  - `simulador/save.post.ts` - Saves simulation results to Directus with Telegram notification
  - `simulador/session/start.post.ts` - Creates tracking session when user enters simulator
  - `simulador/session/update.post.ts` - Updates session progress as user navigates steps
  - `simulador/session/complete.post.ts` - Marks session complete and links to simulation

- `server/utils/` - Server utilities:
  - `rateLimit.ts` - Rate limiting utilities
  - `deviceDetection.ts` - Device type and browser detection from user agent

- `server/plugins/` - Server plugins:
  - `securityHeaders.ts` - Security headers configuration

- `stores/` - Pinia stores:
  - `index.ts` - Main store containing services data, team members, FAQs, and bank logos
  - `simulador.ts` - Simulator store with step data, calculations, localStorage persistence, and session tracking

- `docs/` - Extended documentation:
  - `simulador-save-implementation.md` - Complete implementation guide for simulator save functionality
  - `directus-simulaciones-credito-schema.md` - Directus collection schema documentation

- `types/` - TypeScript definitions:
  - `directus.ts` - Directus collection types
  - `simulador.ts` - Simulator interfaces (steps, results, calculations)

- `assets/css/` - Global CSS files (Tailwind imports)

- `public/` - Static assets:
  - `logos/` - Bank and partner logos
  - `testimonials/` - Customer testimonial images
  - `team/` - Team member photos
  - `docs/` - Documents

### Data Flow

1. **Content Management**: Directus CMS is used as headless CMS
   - Server plugin (`$directusServer`) uses admin token for server-side operations
   - Client plugin (`$directus`) uses public token for client-side data fetching
   - `useDirectusItems` composable provides typed data fetching with caching

2. **State Management**: Pinia store (`stores/index.ts`) contains:
   - Services array (credit products with slug, title, intro, content, image)
   - Team members (name, email, title, image)
   - FAQs (question/answer pairs)
   - Bank logos array

3. **Form Handling**:
   - Contact form posts to `/api/contact` which:
     - Validates Cloudflare Turnstile CAPTCHA token
     - Validates with Zod schema (firstName, lastName, email, phone with dial code, message)
     - Uses honeypot field (`website`) for spam protection
     - Validates minimum form time (3 seconds)
     - Rate limiting by IP: 8 requests per 5 minutes (cf-connecting-ip, x-forwarded-for headers)
     - Saves lead to Directus `leads` collection
     - Optional `simuladorInfo` field for simulator data
   - Lead notification via `/api/send/lead`:
     - Sends formatted email via Resend to gerenciacomercial@contuhogar.com (BCC: israsenior.dev@gmail.com)
     - Optional Telegram notification using bot API
     - Runs email and Telegram in parallel with `Promise.allSettled`

### Environment Variables

Required runtime config (set in `.env`):
- `DIRECTUS_URL` - Directus instance URL (public and private)
- `DIRECTUS_ADMIN_TOKEN` - Admin token for server operations
- `DIRECTUS_PUBLIC_TOKEN` - Public token for client operations
- `RESEND_API_KEY` - Resend email API key
- `TELEGRAM_BOT_TOKEN` - (Optional) Telegram bot token
- `TELEGRAM_CHAT_ID` - (Optional) Telegram chat/channel ID
- `TURNSTILE_SITE_KEY` - Cloudflare Turnstile site key (public)
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret key (server)

### Analytics & Tracking

Two analytics services are configured in `nuxt.config.ts`:
- **Google Analytics** (gtag): ID `G-1182NP1Z0D` (production only)
- **Google Tag Manager** (GTM): ID `GTM-WMQV4M3F` (production only, with router sync)

### Styling Notes

- Uses Tailwind CSS 4 with custom color scheme:
  - Primary color for main brand elements
  - Secondary color for accents
- Custom page transitions defined in `layouts/default.vue`:
  - Fade + blur effect (0.4s duration)
- Main content has `mt-[73px]` to account for fixed header height

### Third-Party Integrations

- **vue3-carousel-nuxt**: Carousel component for services display on homepage
- **Directus SDK**: Content management with typed collections
- **Resend**: Transactional email service
- **Telegram Bot API**: Optional real-time lead notifications
- **Cloudflare Turnstile**: Invisible CAPTCHA for bot protection
- **Puppeteer**: Server-side PDF generation for pre-approval letters
- **v-calendar**: Date picker component for forms
- **@vueuse/core**: Vue composition utilities

### Directus MCP Integration

The project uses the Directus MCP (Model Context Protocol) server for direct CMS access from Claude Code. This enables agents to interact with Directus collections without writing API code.

**Configuration File:** `.mcp.json` (in `.gitignore` for security)

**MCP Endpoint:** `https://admin.contuhogar.com/mcp`

#### Available MCP Tools

| Tool | Description |
|------|-------------|
| `mcp__directus__system-prompt` | Get Directus system context |
| `mcp__directus__items` | CRUD operations on collections |
| `mcp__directus__files` | File management |
| `mcp__directus__folders` | Folder management |
| `mcp__directus__assets` | Asset retrieval |
| `mcp__directus__flows` | Automation flows |
| `mcp__directus__trigger-flow` | Trigger automation flows |
| `mcp__directus__operations` | Flow operations |
| `mcp__directus__schema` | Schema information |
| `mcp__directus__collections` | Collection metadata |
| `mcp__directus__fields` | Field definitions |
| `mcp__directus__relations` | Relationship definitions |

#### MCP Setup for Developers

Create `.mcp.json` in the project root (this file is gitignored):

```json
{
  "mcpServers": {
    "directus": {
      "url": "https://admin.contuhogar.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_DIRECTUS_ADMIN_TOKEN"
      }
    }
  }
}
```

**Security Notes:**
- `.mcp.json` is in `.gitignore` - never commit credentials
- Each developer must create their own `.mcp.json` with their token
- Use a token with appropriate permissions for your role

## Development Guidelines

### Adding New Services
Services are managed in `stores/index.ts` in the `services` array. Each service needs:
- `slug` (for routing)
- `title`, `intro`, `content`, `description`
- `image` (path to public asset)
- `icon` (emoji or icon identifier)

Service detail pages use dynamic route `pages/servicios/[slug].vue`

### Adding Team Members
Team members are in `stores/index.ts` in the `team` array with:
- `name`, `email`, `title`, `image`

### Forms and Validation
- Use Zod for server-side validation
- Include honeypot fields for spam protection
- Check IP-based rate limiting for public endpoints
- Always validate and sanitize user input

### Content from Directus
Use the `useDirectusItems` composable for fetching Directus collections:
```typescript
const { data, error } = await useDirectusItems<YourType>('collection_name', {
  // Directus query params
})
```

### API Routes
- Server routes in `server/api/` use h3 utilities
- Always use `defineEventHandler` for route handlers
- Use `readBody` for POST request data
- Use `useRuntimeConfig()` for environment variables
- Handle errors with `createError` from h3

## Common Patterns

### SEO Meta Tags
Pages use `useSeoMeta()` composable for SEO:
```typescript
useSeoMeta({
  title: 'Page Title',
  description: 'Page description',
  ogTitle: 'OG Title',
  ogDescription: 'OG Description',
  ogUrl: 'https://contuhogar.com/path',
  twitterCard: 'summary'
})
```

### Navigation
Use `<NuxtLink>` for internal links with hash navigation support:
```vue
<NuxtLink :to="{ path: '/', hash: '#section' }">Link</NuxtLink>
```

### Component Auto-Import
Components in `components/` directory are auto-imported - no need for manual imports.

### Accessing Directus
- Server-side: Use `$directusServer` from plugin context
- Client-side: Use `$directus` from plugin context or `useDirectusItems` composable

## Simulador de Credito

The credit simulator is a 5-step interactive wizard that helps users evaluate their mortgage/leasing eligibility.

### Simulator Steps

1. **Personal Info** (`StepPersonalInfo.vue`): Name, email, phone, birthdate, credit type (hipotecario/leasing)
2. **Property Info** (`StepPropertyInfo.vue`): Property value, requested amount, loan term
3. **Income Info** (`StepIncomeInfo.vue`): Fixed/variable income, deductions, financial obligations
4. **Eligibility** (`StepElegibility.vue`): Immigration status, credit reports
5. **Results** (`StepResults.vue`): Approval status, monthly payment, recommendations

### Financial Constants

```typescript
TASA_EA = 14%                          // Annual Effective Rate
TASA_MENSUAL = 1.0975%                 // Monthly rate (calculated from EA)
EDAD_FINAL_MAXIMA = 84                 // Maximum age at loan end
PLAZO_MINIMO = 12 meses                // Minimum term (1 year)
PLAZO_MAXIMO = 240 meses               // Maximum term (20 years)
PORCENTAJE_COMPROMISO_MAXIMO = 30%     // Max DTI ratio
FINANCIACION_HIPOTECARIO = 70%         // LTV for mortgage
FINANCIACION_LEASING = 80%             // LTV for leasing
```

### Calculation Flow

1. Calculate monthly payment using PMT formula
2. Calculate net income (fixed + variable - deductions)
3. Calculate DTI ratio (monthly payment / net income)
4. Calculate available capacity after obligations
5. Validate: DTI <= 30%, age + term <= 84 years, LTV limits

### PDF Generation

Pre-approval letters are generated server-side using Puppeteer:
- Endpoint: `POST /api/pdf/pre-approval`
- Template: `pages/simulador/credito/carta-preaprobacion.vue`
- Returns: Base64 encoded PDF

### State Persistence

Simulator state is persisted in localStorage to survive page reloads.
Store: `stores/simulador.ts` with Pinia.

### Data Persistence (Directus)

When users complete the simulator, their data is saved to Directus for lead tracking and analytics.

#### Directus Collections

| Collection | Purpose |
|------------|---------|
| `simulaciones_credito` | Stores complete simulation data when user reaches results |
| `simulador_sesiones` | Tracks user progress step-by-step through the funnel |

**Detailed schema documentation:** See `/docs/directus-simulaciones-credito-schema.md`

#### API Endpoints

| Endpoint | Method | Purpose | Rate Limit |
|----------|--------|---------|------------|
| `/api/simulador/save` | POST | Save complete simulation to Directus | 10/5min |
| `/api/simulador/session/start` | POST | Create new tracking session | 20/5min |
| `/api/simulador/session/update` | POST | Update session with step progress | 50/5min |
| `/api/simulador/session/complete` | POST | Link session to simulation, calculate total time | 10/5min |

#### Store Actions (Session Tracking)

The `simulador.ts` store includes these session tracking actions:

```typescript
// Initialize or restore session ID from localStorage
initSession(): string

// Start tracking session (called on SimuladorWizard mount)
async startSession(): Promise<void>

// Track step navigation with partial data (non-blocking)
async trackStep(paso: number, datosPasoAnterior?: object, pasoAnterior?: number): Promise<void>

// Complete session and link to simulation (called after save)
async completeSession(simulacionId: string): Promise<void>

// Save simulation to Directus (returns { ok, id?, error? })
async guardarSimulacion(): Promise<{ ok: boolean; id?: string | number; error?: string }>
```

#### Data Flow

```
User enters simulator → SimuladorWizard.vue calls startSession()
         ↓
Session created in Directus (simulador_sesiones)
         ↓
User navigates steps → trackStep() updates session progress
         ↓
User reaches results → StepResults.vue calls guardarSimulacion()
         ↓
Simulation saved (simulaciones_credito) + Telegram notification
         ↓
completeSession() links session to simulation, calculates total time
```

#### Key Features

- **Step-by-step funnel tracking**: Each step captures partial data for dropout analysis
- **Automatic save on results**: Simulation saved when user reaches step 5
- **Telegram notifications**: Real-time alerts when simulations complete
- **Session persistence**: Session ID stored in localStorage survives page reloads
- **Non-blocking tracking**: Session updates don't block user navigation
- **Rate limiting**: All endpoints have rate limits to prevent abuse
- **Device detection**: Tracks device type (mobile/tablet/desktop) and browser

**Complete implementation guide:** See `/docs/simulador-save-implementation.md`

## SEO Implementation Guide

This section documents the SEO infrastructure for the `nuxt-seo-specialist` agent.

### SEO Composable (`composables/useSeo.ts`)

The project has a centralized SEO composable with the following functions:

#### `useSeo(options: SeoOptions)`
Main function for configuring page SEO. Handles meta tags, Open Graph, Twitter Cards, and canonical URLs.

```typescript
interface SeoOptions {
  title: string           // Page title (brand suffix added automatically)
  description: string     // Meta description
  image?: string          // OG image URL (defaults to /og-image.jpg)
  url?: string            // Canonical URL (defaults to current route)
  type?: 'website' | 'article'  // OG type
  article?: {             // Article-specific metadata
    publishedTime?: string
    modifiedTime?: string
    author?: string
    section?: string
    tags?: string[]
  }
}

// Usage example
useSeo({
  title: 'Crédito Hipotecario',
  description: 'Financiamiento para tu vivienda en Colombia',
  type: 'website'
})
```

**Features:**
- Automatic brand suffix: `${title} | ConTuHogar`
- Default OG image fallback: `/og-image.jpg`
- Canonical URL generation from route
- Open Graph locale: `es_CO`
- Twitter Card: `summary_large_image`
- HTML lang attribute: `es-CO`
- Robots directive: `index, follow`

#### `useLocalBusinessSchema()`
Generates JSON-LD for FinancialService/LocalBusiness schema. Use on homepage, contact, and about pages.

```typescript
// Automatically injects:
// - Business name, description, logo
// - Contact phones (Colombia, USA, Spain)
// - Physical address with geo coordinates
// - Opening hours (Mon-Fri 8am-6pm)
// - Service catalog (4 financial products)

useLocalBusinessSchema()
```

#### `useBreadcrumbSchema(items)`
Generates BreadcrumbList JSON-LD for navigation.

```typescript
useBreadcrumbSchema([
  { name: 'Inicio', url: 'https://contuhogar.com' },
  { name: 'Servicios', url: 'https://contuhogar.com/servicios' },
  { name: 'Crédito Hipotecario', url: 'https://contuhogar.com/servicios/credito-hipotecario' }
])
```

#### `useArticleSchema(article)`
Generates Article JSON-LD for blog posts.

```typescript
useArticleSchema({
  title: 'Guía de Crédito Hipotecario',
  description: 'Todo lo que necesitas saber...',
  image: 'https://contuhogar.com/blog/guia.jpg',
  datePublished: '2024-01-15',
  dateModified: '2024-02-01',
  author: 'ConTuHogar',
  url: 'https://contuhogar.com/blog/guia-credito'
})
```

#### `useFAQSchema(faqs)`
Generates FAQPage JSON-LD for FAQ sections.

```typescript
useFAQSchema([
  { question: '¿Qué es un crédito hipotecario?', answer: 'Es un préstamo...' },
  { question: '¿Cuáles son los requisitos?', answer: 'Los requisitos incluyen...' }
])
```

### Current SEO Implementation by Page

| Page | SEO Function | Schema | Status |
|------|--------------|--------|--------|
| `/` (Home) | `useSeo()` + `useLocalBusinessSchema()` | LocalBusiness + OfferCatalog | ✅ Complete |
| `/blog` | `useSeo()` | None | ⚠️ Missing CollectionPage |
| `/blog/[slug]` | `useSeo()` + `useArticleSchema()` + `useBreadcrumbSchema()` | Article + Breadcrumb | ✅ Complete |
| `/servicios` | `useSeo()` | None | ⚠️ Missing CollectionPage |
| `/servicios/[slug]` | `useSeo()` + `useBreadcrumbSchema()` | Breadcrumb | ⚠️ Missing Service |
| `/faqs` | `useSeo()` + `useFAQSchema()` | FAQPage | ✅ Complete |
| `/contacto` | `useSeo()` + `useLocalBusinessSchema()` | LocalBusiness | ✅ Complete |
| `/nosotros` | `useSeo()` + `useLocalBusinessSchema()` | LocalBusiness | ✅ Complete |
| `/simulador/*` | Basic `useSeoMeta()` | None | ⚠️ Consider noindex |

### SEO Gaps to Address

**Priority 1 (Critical):**
1. Create `public/og-image.jpg` (1200x630px) - default OG image referenced but missing
2. Add sitemap generation (`server/routes/sitemap.xml.ts` or `@nuxtjs/sitemap`)
3. Update `public/robots.txt` to include sitemap reference

**Priority 2 (Important):**
4. Add CollectionPage schema for `/blog` and `/servicios` indices
5. Add Service schema for individual service pages
6. Configure robots meta for simulator pages (`noindex`)
7. Add Google Search Console verification meta tag

**Priority 3 (Enhancement):**
8. Add Organization schema globally
9. Implement PWA meta tags (theme-color, apple-mobile-web-app)
10. Add structured data for testimonials (Review/AggregateRating)

### Data Sources for SEO

SEO data can come from two sources:

**1. Static Data (Pinia Store)**
```typescript
// From stores/index.ts
const store = useMainStore()
const services = store.services  // For service pages
const faqs = store.faqs          // For FAQ schema
```

**2. Dynamic Data (Directus CMS)**
```typescript
// From Directus collections
const { data: blogPost } = await useDirectusItems<BlogPost>('posts', {
  filter: { slug: { _eq: slug } },
  fields: ['title', 'excerpt', 'featured_image', 'date_created', 'date_updated']
})

// Use for SEO
useSeo({
  title: blogPost.title,
  description: blogPost.excerpt,
  image: `${config.public.directusUrl}/assets/${blogPost.featured_image}`,
  type: 'article',
  article: {
    publishedTime: blogPost.date_created,
    modifiedTime: blogPost.date_updated
  }
})
```

### Sitemap Implementation Guide

Create `server/routes/sitemap.xml.ts`:

```typescript
export default defineEventHandler(async (event) => {
  const baseUrl = 'https://contuhogar.com'

  // Static pages
  const staticPages = [
    '', '/contacto', '/nosotros', '/faqs',
    '/servicios', '/blog', '/simulador/credito'
  ]

  // Dynamic pages from store or Directus
  const services = ['credito-hipotecario', 'leasing-habitacional', ...]
  const blogSlugs = await fetchBlogSlugsFromDirectus()

  const urls = [
    ...staticPages.map(p => `${baseUrl}${p}`),
    ...services.map(s => `${baseUrl}/servicios/${s}`),
    ...blogSlugs.map(s => `${baseUrl}/blog/${s}`)
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`

  setHeader(event, 'content-type', 'application/xml')
  return sitemap
})
```

### Validation Tools

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/
- **Open Graph Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator

## Specialized Agents (MANDATORY)

---

### CRITICAL: MANDATORY DELEGATION POLICY

**THIS SECTION DEFINES A NON-NEGOTIABLE PROJECT REQUIREMENT.**

In this project, ALL tasks MUST be delegated to a specialized agent. This is not a suggestion or best practice - it is a MANDATORY rule with ZERO exceptions.

#### What This Means

- **NEVER** execute tasks directly in this codebase
- **NEVER** modify files without using the appropriate agent
- **NEVER** bypass agent delegation for "simple" or "quick" tasks
- **ALWAYS** identify the correct agent BEFORE starting any work
- **ALWAYS** delegate to the specialized agent for that task type

#### Why This Rule Exists

1. **Specialization**: Each agent has domain expertise and specific tooling
2. **Consistency**: Ensures uniform code quality and patterns across the project
3. **Traceability**: Agent-based work is easier to audit and review
4. **Quality**: Specialized agents produce better results in their domain

---

### Available Agents

| Agent | Use Case | Tools Available |
|-------|----------|-----------------|
| **nuxt-ui-engineer** | UI components, styling, visual consistency, Tailwind CSS | All tools + Playwright MCP |
| **nuxt-logic-architect** | Business logic, composables, services, API routes, Directus integration | All tools |
| **nuxt-seo-specialist** | SEO implementation, meta tags, structured data, sitemaps, Open Graph | All tools + Playwright MCP |
| **directus-cms-operator** | Direct CMS content operations via MCP (CRUD, schema, files) | All tools + Directus MCP |
| **context-steward** | Documentation updates (CLAUDE.md, README.md, /doc/*) | All tools |
| **Explore** | Codebase exploration, file search, understanding architecture | Read-only tools |
| **Plan** | Implementation planning, architectural decisions | Read-only tools |

### When to Use Each Agent

#### nuxt-ui-engineer
Use for ANY frontend/visual work:
- Creating or modifying Vue components
- Styling with Tailwind CSS (must use tokens from `main.css`)
- Responsive design implementation
- Visual validation with Playwright
- Adding new UI sections or cards

```
Example: "Add a new testimonial card component"
→ Use nuxt-ui-engineer agent
```

#### nuxt-logic-architect
Use for ANY business logic or data work:
- Creating/modifying composables
- Server API routes (`server/api/`)
- Directus data fetching and mutations
- Pinia store logic
- Form validation and processing
- Financial calculations (simulator)

```
Example: "Add a new API endpoint for newsletter subscription"
→ Use nuxt-logic-architect agent
```

#### nuxt-seo-specialist
Use for ANY SEO-related work:
- Implementing meta tags on pages
- Creating/modifying structured data (JSON-LD)
- Setting up Open Graph and Twitter Cards
- Generating dynamic sitemaps
- Configuring robots.txt
- Optimizing for Core Web Vitals
- SEO audits and improvements
- Canonical URLs and hreflang tags
- Schema.org markup implementation
- Fetching SEO data from Directus

```
Example: "Add structured data to the blog pages"
→ Use nuxt-seo-specialist agent

Example: "Implement sitemap for all dynamic routes"
→ Use nuxt-seo-specialist agent

Example: "Audit SEO implementation and fix gaps"
→ Use nuxt-seo-specialist agent
```

#### directus-cms-operator
Use for ANY direct CMS content operations:
- Creating, reading, updating, deleting Directus items
- Managing files and assets in Directus
- Querying schema, collections, and field definitions
- Triggering Directus automation flows
- Bulk content operations

```
Example: "Create a new blog post in Directus"
→ Use directus-cms-operator agent

Example: "List all leads from the last week"
→ Use directus-cms-operator agent

Example: "Update the schema for the services collection"
→ Use directus-cms-operator agent
```

**Note:** This agent uses the Directus MCP tools. Ensure `.mcp.json` is configured before using.

#### context-steward
Use for ANY documentation work:
- Updating CLAUDE.md after changes
- Updating README.md
- Creating technical documentation
- Resolving documentation inconsistencies

```
Example: "Update docs after adding new feature"
→ Use context-steward agent
```

#### Explore
Use for understanding the codebase:
- Finding files by pattern
- Searching for code implementations
- Understanding how features work
- Answering questions about architecture

```
Example: "How does the contact form validation work?"
→ Use Explore agent
```

#### Plan
Use for planning implementations:
- Designing new features
- Planning refactoring
- Architectural decisions
- Multi-file changes

```
Example: "Plan adding a new credit product type"
→ Use Plan agent
```

### Agent Usage Rules (STRICTLY ENFORCED)

1. **MANDATORY: Delegate ALL tasks to agents** - Direct execution is PROHIBITED, regardless of task complexity
2. **NO EXCEPTIONS** - Even "simple" or "trivial" tasks MUST use the appropriate agent
3. **Choose the right agent** - Match the task type to the agent specialty
4. **One agent per task type** - Don't mix UI and logic in same agent call
5. **Update documentation** - After significant changes, use context-steward
6. **Parallel agents** - Launch multiple agents in parallel when tasks are independent

#### Violation of These Rules

If you find yourself about to:
- Edit a file directly without an agent
- Make a "quick fix" without delegation
- Skip agent usage for any reason

**STOP. This violates the fundamental project rule. Use the appropriate agent.**

### Example Workflows

**Feature: "Add newsletter subscription"**
1. **Plan agent** → Design the implementation approach
2. **nuxt-logic-architect** → Create API route and composable
3. **nuxt-ui-engineer** → Create subscription form component
4. **context-steward** → Update documentation

**Feature: "Add new blog category with proper SEO"**
1. **Plan agent** → Design the implementation approach
2. **nuxt-logic-architect** → Set up Directus collection and composable
3. **nuxt-ui-engineer** → Create category page UI
4. **nuxt-seo-specialist** → Implement meta tags, structured data, sitemap entry
5. **context-steward** → Update documentation

**SEO Audit: "Improve search visibility"**
1. **Explore agent** → Analyze current SEO implementation
2. **nuxt-seo-specialist** → Fix gaps (sitemap, missing schemas, OG images)
3. **context-steward** → Document changes

## Important Notes

- The framework is **Nuxt 4.2.0** (NOT Nuxt 3)
- The package manager is **pnpm 9.15.0** (specified in `package.json`)
- Store files are TypeScript (`stores/index.ts`, `stores/simulador.ts`)
- Analytics/GTM only enabled in production (`NODE_ENV === "production"`)
- Email sender is "admin@contuhogar.com" with BCC to developer email
- Website targets Colombian market and Colombians living abroad
- Cloudflare Turnstile CAPTCHA is required for all public forms
- Directus scripts available: `pnpm directus:schema`, `pnpm directus:types`, `pnpm directus:snapshot`

---

## REMINDER: MANDATORY AGENT DELEGATION

**Every task in this project MUST be delegated to a specialized agent. NO EXCEPTIONS.**

This is the fundamental operational rule for this codebase. Review the "Specialized Agents (MANDATORY)" section above before performing any work.
