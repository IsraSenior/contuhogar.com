# Configuración de Directus - Tokens de Seguridad

## 🔐 Problema de Seguridad Crítico Resuelto

Anteriormente, el token de **administrador** de Directus estaba expuesto al cliente, lo que permitía acceso total a la base de datos desde el navegador. Esto ha sido corregido.

---

## 📋 Configuración de Tokens

Tu proyecto necesita **2 tokens diferentes**:

### 1. Token de Administrador (Servidor)
- **Uso**: Operaciones del servidor (crear leads, enviar emails)
- **Permisos**: Lectura + Escritura
- **Exposición**: ❌ **NUNCA** expuesto al cliente
- **Variable**: `DIRECTUS_ADMIN_TOKEN`

### 2. Token Público (Cliente)
- **Uso**: Lectura de contenido desde el navegador
- **Permisos**: Solo lectura (colecciones públicas)
- **Exposición**: ✅ Seguro exponer al cliente
- **Variable**: `DIRECTUS_PUBLIC_TOKEN`

---

## 🛠️ Cómo Crear el Token Público

### Paso 1: Acceder a Directus

1. Ingresa a tu panel de Directus: `https://tu-instancia.directus.app`
2. Inicia sesión con tus credenciales de administrador

### Paso 2: Crear un Rol de Solo Lectura

1. Ve a **Settings** (⚙️) → **Access Control** → **Roles**
2. Haz clic en **"Create Role"**
3. Configura el rol:
   ```
   Nombre: Public Read Only
   Descripción: Token de solo lectura para el cliente web
   App Access: ❌ Deshabilitado
   Admin Access: ❌ Deshabilitado
   ```

4. **Configurar Permisos** (muy importante):

   Para cada colección que necesites en el cliente:
   - `blogs` (artículos del blog)
   - `services` (servicios si los tienes en Directus)
   - Otras colecciones públicas

   Configura los permisos así:
   ```
   ✅ Read (leer)
   ❌ Create (crear)
   ❌ Update (actualizar)
   ❌ Delete (eliminar)
   ```

5. **Restricciones adicionales** (recomendado):
   - Solo permitir lectura de items con `status = "published"`
   - Filtrar por `{ "status": { "_eq": "published" } }`

### Paso 3: Crear el Token

1. Ve a **Settings** (⚙️) → **Access Control** → **Tokens**
2. Haz clic en **"Create Token"**
3. Configura el token:
   ```
   Name: Public Web Token
   Role: Public Read Only (el rol que creaste)
   Type: Static Token
   ```
4. Copia el token generado (solo se mostrará una vez)

### Paso 4: Actualizar Variables de Entorno

1. Edita tu archivo `.env`:
   ```bash
   # Token de administrador (YA EXISTENTE - mantener secreto)
   DIRECTUS_ADMIN_TOKEN=tu_token_admin_actual

   # Token público (NUEVO - agregar aquí)
   DIRECTUS_PUBLIC_TOKEN=el_nuevo_token_publico_aqui
   ```

2. **En producción** (Vercel/Netlify):
   - Agregar `DIRECTUS_PUBLIC_TOKEN` a las variables de entorno
   - Verificar que `DIRECTUS_ADMIN_TOKEN` esté configurado

---

## ✅ Verificación de Seguridad

### Comprobar que el Token Público Funciona

```bash
# Probar desde terminal (reemplaza con tu token y URL)
curl "https://tu-instancia.directus.app/items/blogs?access_token=TU_TOKEN_PUBLICO"

# Debe retornar los blogs publicados
# Si retorna error 401/403, revisar permisos del rol
```

### Comprobar que el Cliente Usa el Token Correcto

1. Abre las **DevTools** del navegador (F12)
2. Ve a la pestaña **Network**
3. Recarga la página
4. Busca peticiones a Directus
5. Verifica en los headers que se usa `DIRECTUS_PUBLIC_TOKEN` y NO `DIRECTUS_ADMIN_TOKEN`

**Ejemplo correcto**:
```
Request URL: https://directus.app/items/blogs
Request Headers:
  Authorization: Bearer [token_publico_aquí]
```

**❌ INCORRECTO** (si ves el token admin aquí):
```
Authorization: Bearer [token_admin_aquí]  ← VULNERABILIDAD!
```

---

## 🔒 Mejores Prácticas de Seguridad

### 1. Rotar Tokens Periódicamente

```bash
# Cada 3-6 meses o si hay sospecha de compromiso
1. Crear nuevo token público
2. Actualizar .env y producción
3. Desplegar cambios
4. Eliminar token antiguo en Directus
```

### 2. Monitorear Uso de Tokens

En Directus:
- **Settings** → **Access Control** → **Activity**
- Revisar logs de acceso
- Detectar patrones anormales

### 3. Permisos Mínimos

Solo dar permisos de lectura a las colecciones **estrictamente necesarias**:
- ✅ Blogs públicos
- ✅ Servicios públicos
- ❌ Leads (información sensible)
- ❌ Usuarios
- ❌ Configuraciones

### 4. Filtros de Seguridad

Configurar filtros a nivel de permisos del rol:
```json
{
  "status": {
    "_eq": "published"
  },
  "_and": [
    {
      "date_published": {
        "_lte": "$NOW"
      }
    }
  ]
}
```

Esto asegura que solo se puedan leer items:
- Con status "published"
- Con fecha de publicación menor o igual a ahora

---

## 🚨 Qué Hacer en Caso de Compromiso

Si sospechas que el token de administrador fue expuesto:

1. **Inmediatamente** ir a Directus → Settings → Tokens
2. **Revocar** el token comprometido
3. **Crear** nuevo token de administrador
4. **Actualizar** `.env` local
5. **Actualizar** variables de entorno en producción
6. **Desplegar** cambios
7. **Revisar** logs de Directus para actividad sospechosa
8. **Cambiar** contraseñas de usuarios admin si es necesario

---

## 📞 Soporte

Si tienes problemas con la configuración:
1. Verifica que el rol tiene los permisos correctos
2. Verifica que el token está asociado al rol correcto
3. Revisa los logs de Directus para errores específicos
4. Consulta la [documentación oficial de Directus](https://docs.directus.io/reference/authentication.html)

---

## ✅ Checklist de Seguridad

- [ ] Token público creado en Directus
- [ ] Rol de solo lectura configurado
- [ ] Permisos configurados (solo read en colecciones públicas)
- [ ] `DIRECTUS_PUBLIC_TOKEN` agregado a `.env`
- [ ] Variable de entorno actualizada en producción
- [ ] Build local exitoso
- [ ] Verificado en DevTools que se usa el token correcto
- [ ] Token de admin NO expuesto al cliente
- [ ] Documentación actualizada

---

**Última actualización**: Noviembre 2025
**Versión**: 2.0.0 (Nuxt 4)
