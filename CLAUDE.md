# CLAUDE.md

Guía para Claude Code (claude.ai/code) en este repositorio.

---

## Proyecto: ConTuHogar

**Tipo**: Nuxt 4 application para servicios financieros especializados en crédito habitacional para colombianos en el exterior.

**Quick Reference**:
- **Framework**: Nuxt 4.2.0 + Vue 3
- **CMS**: Directus (headless)
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm 9.15.0

---

## REGLA FUNDAMENTAL: DELEGACIÓN OBLIGATORIA

**TODA tarea en este codebase DEBE delegarse a un agente especializado.**

La ejecución directa está PROHIBIDA. Sin excepciones.

| Tipo de Tarea | Agente Requerido |
|---------------|------------------|
| Coordinación General | `project-orchestrator` |
| UI/Componentes/Styling | `nuxt-ui` |
| Lógica/API/Datos | `nuxt-logic` |
| SEO/Meta/Structured Data | `nuxt-seo` |
| CMS Content Operations | `directus-cms-operator` |
| Documentación | `context-keeper` |
| Entender Código | `Explore` (Task tool) |
| Planificar Features | `Plan` (Task tool) |

**Instrucción**: Siempre consulta a `project-orchestrator` para tareas complejas o multi-agente.

Ver guía completa de agentes: `.claude/context/agents.md`

---

## Contexto del Proyecto

Documentación modular ubicada en `.claude/context/`:

| Archivo | Contenido |
|---------|-----------|
| **agents.md** | Guía de agentes especializados, cuándo usar cada uno, workflows |
| **architecture.md** | Stack técnico, estructura de directorios, data flow, environment vars |
| **seo.md** | Implementación SEO actual, composables, gaps conocidos, validación |
| **simulador.md** | Wizard de crédito, cálculos financieros, persistencia, session tracking |
| **api-routes.md** | Endpoints server, validación, rate limiting, security |
| **directus.md** | Colecciones CMS, configuración MCP, plugins, best practices |

---

## Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Servidor desarrollo (http://localhost:3000)
pnpm dev

# Build producción
pnpm build

# Preview build
pnpm preview

# Prepare Nuxt (auto después de install)
pnpm postinstall

# Directus utilities
pnpm directus:schema   # Exportar schema
pnpm directus:types    # Generar TypeScript types
pnpm directus:snapshot # Crear snapshot
```

---

## Variables de Entorno Requeridas

Configurar en `.env`:

```bash
# Directus CMS
DIRECTUS_URL=
DIRECTUS_ADMIN_TOKEN=
DIRECTUS_PUBLIC_TOKEN=

# Email Service
RESEND_API_KEY=

# Telegram (opcional)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Cloudflare Turnstile
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

---

## Reglas Críticas del Proyecto

### 1. Delegación Obligatoria
NUNCA ejecutar tareas directamente. SIEMPRE usar el agente apropiado.

### 2. Styling System
- Usar SOLO Tailwind CSS 4
- NO agregar `<style>` en componentes Vue
- CSS custom va en `assets/css/main.css`
- Usar tokens de color definidos en Tailwind config

### 3. Data Management
- Server-side Directus: `$directusServer` (admin token)
- Client-side Directus: `useDirectusItems()` composable
- State global: Pinia stores (`stores/index.ts`, `stores/simulador.ts`)

### 4. Security
- Cloudflare Turnstile en todos los formularios públicos
- Rate limiting en todos los endpoints públicos
- Honeypot fields para spam protection
- Validación con Zod en server-side

### 5. SEO
- Usar composables de `useSeo.ts`
- Implementar structured data (JSON-LD)
- Canonical URLs siempre absolute

### 6. Simulador
- NO modificar constantes financieras sin aprobación
- Session tracking es non-blocking
- Datos sensibles NO van en localStorage

---

## Arquitectura Quick Reference

### Páginas Principales
- `/` - Homepage
- `/contacto` - Formulario contacto
- `/nosotros` - About page
- `/faqs` - Preguntas frecuentes
- `/blog` - Blog listing
- `/blog/[slug]` - Blog post detail
- `/servicios` - Services listing
- `/servicios/[slug]` - Service detail
- `/simulador/credito` - Credit simulator wizard

### Componentes Auto-Imported
Todos los componentes en `components/` son auto-imported (no necesitan import manual).

### API Routes
Ver `.claude/context/api-routes.md` para lista completa y documentación.

### Pinia Stores
- `stores/index.ts` - Services, team, FAQs, bank logos
- `stores/simulador.ts` - Simulator state, calculations, session tracking

---

## Workflows de Ejemplo

### Feature Nueva: "Newsletter Subscription"
1. `project-orchestrator` - Coordinar plan
2. `nuxt-logic` - API route + composable
3. `nuxt-ui` - Form component
4. `context-keeper` - Update docs

### Feature Nueva: "Blog Category con SEO"
1. `project-orchestrator` - Diseño general
2. `nuxt-logic` - Directus collection + composable
3. `nuxt-ui` - Category page UI
4. `nuxt-seo` - Meta tags + structured data + sitemap
5. `context-keeper` - Documentar

### Auditoría SEO
1. `Explore` - Analizar implementación actual
2. `nuxt-seo` - Fix gaps
3. `context-keeper` - Document changes

---

## Directus MCP

El proyecto tiene Directus MCP configurado para operaciones directas de CMS.

**Agente para MCP**: `directus-cms-operator`

**Setup**: Crear `.mcp.json` en root (ver `.claude/context/directus.md`)

**Tools disponibles**: `mcp__directus__*` (items, files, schema, collections, etc.)

---

## Notas Importantes

- Framework es **Nuxt 4.2.0** (NO Nuxt 3)
- Package manager es **pnpm 9.15.0** (especificado en package.json)
- Analytics/GTM solo enabled en producción
- Email sender: gerenciacomercial@contuhogar.com
- Target: Mercado colombiano + colombianos en exterior
- Store files son TypeScript (`.ts` no `.js`)

---

## Recordatorio Final

**Cada tarea DEBE delegarse a un agente especializado. SIN EXCEPCIONES.**

Antes de ejecutar cualquier trabajo, revisar la tabla de agentes arriba y `.claude/context/agents.md`.

Para tareas complejas, consultar PRIMERO a `project-orchestrator`.
