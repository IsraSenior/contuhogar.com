# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 application for ConTuHogar, a financial services company specializing in housing credit for Colombians living abroad. The application is built with Vue 3, Tailwind CSS 4, and integrates with Directus CMS for content management.

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
- **Framework**: Nuxt 3 (with SSR enabled by default)
- **Styling**: Tailwind CSS 4 (via @tailwindcss/vite plugin)
- **State Management**: Pinia (stores in `stores/index.js`)
- **CMS**: Directus (headless CMS for content)
- **Email**: Resend API
- **Analytics**: Google Tag Manager (GTM) and Google Analytics (gtag)

### Directory Structure

- `pages/` - File-based routing with:
  - Static pages: `index.vue`, `contacto.vue`, `nosotros.vue`, `faqs.vue`, `terminos-condiciones.vue`
  - Dynamic routes: `blog/[slug].vue`, `servicios/[slug].vue`
  - Index pages: `blog/index.vue`, `servicios/index.vue`

- `components/` - Global Vue components (auto-imported):
  - `Header.vue`, `Footer.vue`, `Logo.vue`, `Whatsapp.vue`

- `layouts/` - Layout templates:
  - `default.vue` - Main layout with Header, Footer, and Whatsapp components

- `composables/` - Composable functions:
  - `useDirectus.ts` - Helper for fetching Directus collections with `useDirectusItems<T>(collection, params)`

- `plugins/` - Nuxt plugins:
  - `directus.server.ts` - Server-side Directus client with admin token
  - `directus.client.ts` - Client-side Directus client with public token

- `server/api/` - Server API routes:
  - `contact.post.ts` - Saves leads to Directus with validation (uses Zod schema, honeypot field)
  - `send/lead.post.ts` - Sends lead notifications via Resend email and Telegram

- `stores/` - Pinia stores:
  - `index.js` - Main store containing services data, team members, FAQs, and bank logos

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

2. **State Management**: Pinia store (`stores/index.js`) contains:
   - Services array (credit products with slug, title, intro, content, image)
   - Team members (name, email, title, image)
   - FAQs (question/answer pairs)
   - Bank logos array

3. **Form Handling**:
   - Contact form posts to `/api/contact` which:
     - Validates with Zod schema (firstName, lastName, email, phone with dial code, message)
     - Uses honeypot field (`website`) for spam protection
     - Rate limiting by IP (cf-connecting-ip, x-forwarded-for headers)
     - Saves lead to Directus `leads` collection
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
- Main content has `mt-[84px]` to account for fixed header height

### Third-Party Integrations

- **vue3-carousel-nuxt**: Carousel component for services display on homepage
- **Directus SDK**: Content management with typed collections
- **Resend**: Transactional email service
- **Telegram Bot API**: Optional real-time lead notifications

## Development Guidelines

### Adding New Services
Services are managed in `stores/index.js` in the `services` array. Each service needs:
- `slug` (for routing)
- `title`, `intro`, `content`, `description`
- `image` (path to public asset)
- `icon` (emoji or icon identifier)

Service detail pages use dynamic route `pages/servicios/[slug].vue`

### Adding Team Members
Team members are in `stores/index.js` in the `team` array with:
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

## Important Notes

- The package manager is **pnpm 9.15.0** (specified in `package.json`)
- Store file migrated to TypeScript (`stores/index.ts`)
- Analytics/GTM only enabled in production (`NODE_ENV === "production"`)
- Email sender is "admin@contuhogar.com" with BCC to developer email
- Website targets Colombian market and Colombians living abroad
