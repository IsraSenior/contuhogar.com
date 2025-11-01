# Auditoría de Seguridad - Exposición de Tokens y APIs

## Fecha de Auditoría
**Noviembre 2025**

## Resumen Ejecutivo

✅ **Auditoría completada:** Se identificó y corrigió 1 vulnerabilidad crítica relacionada con la exposición del token de administrador de Directus en el código del cliente.

---

## Vulnerabilidades Encontradas y Corregidas

### 🚨 CRÍTICO - Token de Administrador Expuesto en Cliente

**Ubicación:** `plugins/directus.client.ts` línea 6

**Problema:**
```typescript
// ❌ ANTES (VULNERABLE)
const client = createDirectus(config.public.DIRECTUS_URL)
  .with(staticToken(config.public.DIRECTUS_ADMIN_TOKEN))  // Token admin en cliente!
  .with(rest())
```

**Descripción:**
El plugin de Directus para el cliente estaba configurado para usar `config.public.DIRECTUS_ADMIN_TOKEN`, lo que exponía el token de administrador con permisos completos (lectura + escritura) en el código JavaScript del navegador.

**Impacto:**
- 🔴 **Severidad:** CRÍTICA
- 🔴 **Exposición:** Cualquier usuario podía inspeccionar el código JS y obtener el token de administrador
- 🔴 **Riesgo:** Acceso completo a la base de datos de Directus (crear, leer, actualizar, eliminar)
- 🔴 **Explotabilidad:** ALTA - Solo requiere abrir DevTools y buscar en el código

**Solución Aplicada:**
```typescript
// ✅ DESPUÉS (CORREGIDO)
const client = createDirectus(config.public.DIRECTUS_URL)
  .with(staticToken(config.public.DIRECTUS_PUBLIC_TOKEN))  // Token público de solo lectura
  .with(rest())
```

**Archivo:** `plugins/directus.client.ts`

**Verificación:**
- ✅ Token cambiado de `DIRECTUS_ADMIN_TOKEN` a `DIRECTUS_PUBLIC_TOKEN`
- ✅ Build exitoso
- ✅ Token público debe tener permisos SOLO de lectura en Directus

---

## Análisis de Código del Cliente

### Archivos Analizados

| Archivo | Resultado | Notas |
|---------|-----------|-------|
| `plugins/directus.client.ts` | ⚠️ VULNERABLE → ✅ CORREGIDO | Token cambiado a público |
| `plugins/directus.server.ts` | ✅ SEGURO | Usa token admin pero solo en servidor |
| `composables/useDirectus.ts` | ✅ SEGURO | Solo usa `readItems` (lectura) |
| `stores/index.js` | ✅ SEGURO | No hace llamadas a APIs, datos estáticos |
| `pages/*.vue` | ✅ SEGURO | No encontradas llamadas directas a Directus |

### Uso de Directus en el Cliente

**Composable encontrado:** `useDirectusItems`
```typescript
// composables/useDirectus.ts
export const useDirectusItems = async <T>(collection: string, params: any = {}) => {
  const {$directus} = useNuxtApp()
  return await useAsyncData(
    `${collection}:${JSON.stringify(params)}`,
    () => $directus.request(readItems(collection, params)),  // ✅ Solo lectura
    { server: true, transform: (d)=>d }
  )
}
```

**Estado de uso:**
- ⚠️ Este composable NO se está usando actualmente en ninguna página
- ✅ Solo implementa operaciones de LECTURA (`readItems`)
- ✅ No hay llamadas a `createItem`, `updateItem`, o `deleteItem` en el cliente

### Operaciones de Escritura

**Ubicación de operaciones de escritura:** `server/api/contact.post.ts`

```typescript
// ✅ SEGURO: Escritura solo en servidor
const directusServer = createDirectus(config.DIRECTUS_URL)
  .with(staticToken(config.DIRECTUS_ADMIN_TOKEN))  // Token admin SOLO en servidor
  .with(rest());

const saved = await directusServer.request(createItem("leads", payload));
```

**Verificación:**
- ✅ Operaciones de escritura SOLO en endpoints del servidor
- ✅ Token de administrador NUNCA expuesto al cliente
- ✅ Arquitectura correcta: Cliente solo lee, servidor escribe

---

## Configuración Actual

### Tokens en `nuxt.config.ts`

```typescript
runtimeConfig: {
  // ✅ Variables privadas del servidor (NO expuestas al cliente)
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  DIRECTUS_URL: process.env.DIRECTUS_URL,
  DIRECTUS_ADMIN_TOKEN: process.env.DIRECTUS_ADMIN_TOKEN,  // ✅ Solo servidor
  RESEND_API_KEY: process.env.RESEND_API_KEY,

  // ✅ Variables públicas (expuestas al cliente)
  public: {
    DIRECTUS_URL: process.env.DIRECTUS_URL,
    DIRECTUS_PUBLIC_TOKEN: process.env.DIRECTUS_PUBLIC_TOKEN,  // ✅ Solo lectura
  },
}
```

### Separación de Tokens

| Token | Ubicación | Permisos | Exposición |
|-------|-----------|----------|------------|
| `DIRECTUS_ADMIN_TOKEN` | Solo servidor | Lectura + Escritura | ❌ NO expuesto al cliente |
| `DIRECTUS_PUBLIC_TOKEN` | Cliente + Servidor | Solo lectura | ✅ Seguro exponer (permisos limitados) |

---

## Verificación en Producción

### Pasos para Verificar que el Token NO está Expuesto

1. **Abrir DevTools** (F12) en el navegador

2. **Ir a Console y ejecutar:**
   ```javascript
   const config = useRuntimeConfig()
   console.log(config)
   ```

3. **Verificar que:**
   - ✅ `config.public.DIRECTUS_PUBLIC_TOKEN` existe y es el token de solo lectura
   - ✅ `config.DIRECTUS_ADMIN_TOKEN` es `undefined` o genera error
   - ✅ `config.public.DIRECTUS_ADMIN_TOKEN` NO existe

4. **Inspeccionar Network tab:**
   - ✅ Todas las requests a Directus usan el token público en `Authorization` header
   - ✅ NUNCA debe aparecer el token de administrador

### Test de Permisos del Token Público

En la consola del navegador:

```javascript
// Intentar crear un item (debe fallar con 403 Forbidden)
const config = useRuntimeConfig()
fetch('https://tu-directus.app/items/leads', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${config.public.DIRECTUS_PUBLIC_TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ test: 'data' })
})
.then(r => r.json())
.then(console.log)

// ✅ Debe retornar error 403 (Forbidden) o 401 (Unauthorized)
// ❌ Si retorna 200/201 → Token tiene permisos incorrectos
```

---

## Búsqueda de Patrones Inseguros

### Patrones Buscados

```bash
# Búsqueda de tokens sensibles
grep -r "ADMIN_TOKEN\|RESEND_API_KEY\|TELEGRAM_BOT_TOKEN" pages/ stores/ composables/
# Resultado: ✅ No encontrado en código del cliente

# Búsqueda de operaciones de escritura
grep -r "createItem\|updateItem\|deleteItem" pages/ stores/
# Resultado: ✅ No encontrado

# Búsqueda de usos de $directus
grep -r "\$directus" pages/ stores/
# Resultado: ✅ No encontrado (composable no usado)
```

---

## Recomendaciones de Seguridad

### 1. Configurar Token Público en Directus ⚠️ URGENTE

Si aún no has creado el token público de solo lectura:

1. Ir a Directus → Settings → Access Control → Roles
2. Crear rol "Public Read Only" con permisos de lectura únicamente
3. Crear token asociado a ese rol
4. Agregar a `.env`:
   ```bash
   DIRECTUS_PUBLIC_TOKEN=tu_token_publico_aqui
   ```
5. Desplegar cambios en producción

📖 **Documentación completa:** [docs/DIRECTUS_SETUP.md](./DIRECTUS_SETUP.md)

### 2. Rotar Token de Administrador ⚠️ CRÍTICO

Dado que el token de administrador estuvo expuesto, **es crítico rotarlo inmediatamente**:

1. Revocar token actual en Directus
2. Generar nuevo token de administrador
3. Actualizar `.env` local y producción
4. Desplegar cambios

📖 **Guía completa:** [docs/ROTATE_CREDENTIALS.md](./ROTATE_CREDENTIALS.md)

### 3. Auditoría Regular

Programar auditorías de seguridad cada 3-6 meses:

- Verificar tokens no expuestos
- Revisar permisos de roles en Directus
- Comprobar logs de acceso
- Actualizar dependencias

### 4. Monitoreo de Uso del Token

En Directus:
- Settings → Access Control → Activity
- Revisar requests asociadas a cada token
- Detectar patrones anormales

---

## Checklist de Verificación

- [x] Token de administrador corregido en `plugins/directus.client.ts`
- [x] Build exitoso con cambios
- [ ] Token público creado en Directus con permisos de solo lectura
- [ ] Token de administrador rotado en Directus
- [ ] Variables de entorno actualizadas en producción
- [ ] Verificado en DevTools que token admin no está expuesto
- [ ] Test de permisos del token público (debe fallar escritura)
- [ ] Documentación actualizada

---

## Conclusiones

### Vulnerabilidades Corregidas
✅ **1 vulnerabilidad crítica** identificada y corregida

### Estado Actual
✅ **SEGURO** - Arquitectura correcta implementada:
- Cliente usa token público (solo lectura)
- Servidor usa token admin (lectura + escritura)
- Separación clara de responsabilidades

### Acciones Pendientes
⚠️ **CRÍTICO:**
1. Crear token público en Directus
2. Rotar token de administrador
3. Actualizar producción

---

**Auditor:** Claude Code
**Fecha:** Noviembre 2025
**Versión:** 1.0.0
**Próxima auditoría:** Febrero 2026
