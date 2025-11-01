# Directus Schema Management

Sistema de gestión de schema de Directus con sincronización bilateral, control de versiones y generación automática de tipos TypeScript.

## 📂 Estructura

```
directus/
├── README.md                    # Esta documentación
├── schema.json                  # Schema completo exportado (no editar)
├── snapshots/                   # Snapshots del schema para migraciones
│   └── initial-schema.json      # Snapshot inicial
└── migrations/                  # Migraciones personalizadas (futuro)
```

## 🛠️ Scripts Disponibles

### 1. Exportar Schema Completo

Exporta todas las colecciones, campos y relaciones de Directus a `directus/schema.json`:

```bash
npx tsx scripts/directus-schema-export.ts
```

**Cuándo usar:**
- Para backup completo del schema
- Para análisis detallado de la estructura
- Para documentación

### 2. Generar Tipos TypeScript

Genera tipos TypeScript seguros desde el schema de Directus:

```bash
npx tsx scripts/directus-generate-types.ts
```

**Output:** `types/directus.ts`

**Características:**
- ✅ Tipos automáticos para todas las colecciones
- ✅ Mapeo correcto de tipos de Directus a TypeScript
- ✅ Soporte para relaciones (m2o, o2m, m2m)
- ✅ Campos opcionales/requeridos
- ✅ Union type de todas las colecciones

**Ejemplo de uso:**

```typescript
import type { Leads, DirectusCollections } from '@/types/directus'

// Tipo específico
const lead: Leads = {
  name: 'Juan',
  lastname: 'Pérez',
  email: 'juan@example.com',
  phone: '+573001234567'
}

// Acceso tipado
const { data } = await useDirectusItems<Leads>('leads')
```

### 3. Snapshots del Schema

Sistema de snapshots para control de versiones y migraciones seguras.

#### Crear Snapshot

```bash
# Snapshot con nombre automático
npx tsx scripts/directus-snapshot.ts create

# Snapshot con nombre personalizado
npx tsx scripts/directus-snapshot.ts create "before-blog-migration"
```

#### Listar Snapshots

```bash
npx tsx scripts/directus-snapshot.ts list
```

#### Ver Diferencias

Compara un snapshot con el schema actual:

```bash
npx tsx scripts/directus-snapshot.ts diff initial-schema.json
```

#### Aplicar Snapshot

**⚠️ ADVERTENCIA:** Esta operación modifica el schema de Directus. Siempre haz backup primero.

```bash
# Desarrollo
npx tsx scripts/directus-snapshot.ts apply initial-schema.json

# Producción (requiere confirmación)
FORCE=true npx tsx scripts/directus-snapshot.ts apply initial-schema.json
```

## 🔄 Flujo de Trabajo Recomendado

### Para Desarrollo Local

1. **Antes de hacer cambios en Directus:**
   ```bash
   # Crear snapshot del estado actual
   npx tsx scripts/directus-snapshot.ts create "before-changes"
   ```

2. **Hacer cambios en Directus Admin:**
   - Agregar/modificar colecciones
   - Agregar/modificar campos
   - Configurar relaciones

3. **Después de los cambios:**
   ```bash
   # Regenerar tipos TypeScript
   npx tsx scripts/directus-generate-types.ts

   # Crear snapshot del nuevo estado
   npx tsx scripts/directus-snapshot.ts create "after-changes"

   # Commitear cambios
   git add types/directus.ts directus/snapshots/
   git commit -m "feat: update Directus schema - [descripción]"
   ```

### Para Producción

1. **En desarrollo, después de finalizar cambios:**
   ```bash
   # Crear snapshot final
   npx tsx scripts/directus-snapshot.ts create "production-ready-$(date +%Y%m%d)"
   ```

2. **En producción:**
   ```bash
   # Ver diferencias antes de aplicar
   npx tsx scripts/directus-snapshot.ts diff production-ready-20240115.json

   # Si todo está bien, aplicar
   FORCE=true npx tsx scripts/directus-snapshot.ts apply production-ready-20240115.json
   ```

## 📝 Colecciones Actuales

### `leads`
**Descripción:** Almacena leads generados desde formularios de contacto

**Campos:**
- `id` (uuid): Identificador único
- `status` (string): Estado del lead (draft, published, archived)
- `date_created` (timestamp): Fecha de creación
- `date_updated` (timestamp): Fecha de última actualización
- `name` (string): Nombre del contacto
- `lastname` (string): Apellido del contacto
- `email` (string): Correo electrónico
- `phone` (string): Teléfono con código de país
- `message` (text): Mensaje del contacto
- `source_page` (string): URL de origen del lead

**Uso en la aplicación:**
- Formulario de contacto: `/pages/contacto.vue`
- Widget de WhatsApp: `/components/Whatsapp.vue`
- API endpoint: `/server/api/contact.post.ts`

## 🔐 Seguridad

### Tokens de Acceso

El proyecto usa dos tipos de tokens:

1. **DIRECTUS_ADMIN_TOKEN** (server-side)
   - Permisos completos
   - Solo para scripts de migración y server
   - ⚠️ NUNCA exponer al cliente

2. **DIRECTUS_PUBLIC_TOKEN** (client-side)
   - Solo lectura
   - Para consultas públicas desde el frontend
   - Configurado en `plugins/directus.client.ts`

### Configuración en `.env`

```env
DIRECTUS_URL=https://admin.contuhogar.com
DIRECTUS_ADMIN_TOKEN=dbCXUIzMY9rnkbXYctxJfyyRbTWGW8us
DIRECTUS_PUBLIC_TOKEN=<token-publico-read-only>
```

## 🚀 Expandir el Proyecto

### Agregar Nueva Colección

1. **En Directus Admin:**
   - Crear nueva colección
   - Configurar campos
   - Definir permisos

2. **En el proyecto:**
   ```bash
   # Regenerar tipos
   npx tsx scripts/directus-generate-types.ts

   # Crear snapshot
   npx tsx scripts/directus-snapshot.ts create "add-[nombre-coleccion]"
   ```

3. **Usar en código:**
   ```typescript
   import type { NombreColeccion } from '@/types/directus'

   const { data } = await useDirectusItems<NombreColeccion>('nombre_coleccion')
   ```

### Modificar Colección Existente

1. **Crear snapshot de seguridad:**
   ```bash
   npx tsx scripts/directus-snapshot.ts create "before-modify-[coleccion]"
   ```

2. **Hacer cambios en Directus Admin**

3. **Verificar diferencias:**
   ```bash
   npx tsx scripts/directus-snapshot.ts diff before-modify-[coleccion].json
   ```

4. **Si todo está bien:**
   ```bash
   # Regenerar tipos
   npx tsx scripts/directus-generate-types.ts

   # Nuevo snapshot
   npx tsx scripts/directus-snapshot.ts create "after-modify-[coleccion]"
   ```

## 🔧 Troubleshooting

### Error: "DIRECTUS_URL y DIRECTUS_ADMIN_TOKEN son requeridos"

**Solución:** Verifica que el archivo `.env` existe y contiene las variables correctas.

### Error al aplicar snapshot en producción

**Solución:** Usa `FORCE=true` para forzar la aplicación:
```bash
FORCE=true npx tsx scripts/directus-snapshot.ts apply [archivo]
```

### Tipos TypeScript no se actualizan

**Solución:** Regenera los tipos y reinicia el servidor de desarrollo:
```bash
npx tsx scripts/directus-generate-types.ts
yarn dev
```

## 📚 Recursos

- [Directus SDK Documentation](https://docs.directus.io/guides/sdk/)
- [Directus Schema API](https://docs.directus.io/reference/system/schema.html)
- [TypeScript Type Safety](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

## 🤝 Contribuir

Al hacer cambios en el schema de Directus:

1. ✅ Siempre crear snapshot antes de cambios
2. ✅ Documentar cambios en commits
3. ✅ Regenerar tipos TypeScript
4. ✅ Probar en desarrollo antes de producción
5. ✅ Commitear snapshots junto con código

---

**Última actualización:** 2025-11-01
**Versión del sistema:** 1.0.0
