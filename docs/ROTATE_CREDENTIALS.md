# 🔄 Guía de Rotación de Credenciales

## ⚠️ ACCIÓN INMEDIATA REQUERIDA

Como se identificó en el análisis de seguridad, el token de administrador de Directus estaba expuesto al cliente. **Debes rotar TODAS las credenciales inmediatamente**.

---

## 📋 Checklist de Rotación

### 1. Directus - Token de Administrador ⚠️ CRÍTICO

**Status**: 🔴 **COMPROMETIDO - Rotar inmediatamente**

#### Pasos:

1. **Acceder a Directus**:
   ```
   URL: https://tu-instancia.directus.app
   Ir a: Settings → Access Control → Tokens
   ```

2. **Revocar token actual**:
   - Buscar el token actual (comienza con el valor en tu .env)
   - Click en "Delete" o "Revoke"

3. **Crear nuevo token**:
   - Click en "Create Token"
   - Name: `Admin Server Token - $(date +%Y-%m-%d)`
   - Role: Administrator
   - Type: Static Token
   - Copiar el nuevo token

4. **Actualizar `.env` local**:
   ```bash
   # Reemplazar con el nuevo token
   DIRECTUS_ADMIN_TOKEN=nuevo_token_aqui
   ```

5. **Actualizar producción**:
   ```bash
   # Vercel
   vercel env add DIRECTUS_ADMIN_TOKEN production
   # Pegar el nuevo token cuando se solicite

   # Netlify
   # Ir a: Site settings → Environment variables
   # Editar DIRECTUS_ADMIN_TOKEN
   ```

6. **Desplegar**:
   ```bash
   git push origin main
   # O manualmente en Vercel/Netlify: "Deploy"
   ```

---

### 2. Directus - Token Público 🆕 CREAR NUEVO

**Status**: 🟡 **Crear token (no existía antes)**

#### Pasos:

Seguir la guía completa en: [`docs/DIRECTUS_SETUP.md`](./DIRECTUS_SETUP.md)

Resumen:
1. Crear rol "Public Read Only" con permisos mínimos
2. Crear token asociado a ese rol
3. Agregar a `.env`:
   ```bash
   DIRECTUS_PUBLIC_TOKEN=nuevo_token_publico_aqui
   ```
4. Actualizar en producción
5. Desplegar

---

### 3. Resend API Key 🟡 ROTAR (Precaución)

**Status**: 🟡 **Rotar por precaución**

Aunque no estaba expuesto, es buena práctica rotar después de un incidente de seguridad.

#### Pasos:

1. **Acceder a Resend**:
   ```
   URL: https://resend.com/api-keys
   ```

2. **Crear nueva API key**:
   - Click en "Create API Key"
   - Name: `ConTuHogar Production - $(date +%Y-%m-%d)`
   - Permission: Full Access (o Send only si prefieres)
   - Copiar la nueva key

3. **Actualizar `.env` local**:
   ```bash
   RESEND_API_KEY=re_nuevo_key_aqui
   ```

4. **Actualizar producción**:
   ```bash
   # Vercel
   vercel env add RESEND_API_KEY production

   # Netlify
   # Site settings → Environment variables → Edit RESEND_API_KEY
   ```

5. **Verificar funcionamiento**:
   - Enviar formulario de contacto de prueba
   - Verificar que el email llega correctamente

6. **Eliminar key antigua** (después de verificar):
   - Volver a https://resend.com/api-keys
   - Eliminar la key antigua

---

### 4. Telegram Bot Token 🟢 REVISAR

**Status**: 🟢 **Bajo riesgo (servidor only)**

Este token nunca estuvo expuesto al cliente. Solo rotar si sospechas compromiso.

#### Si decides rotar:

1. **Crear nuevo bot** (o regenerar token):
   ```
   Telegram: Buscar @BotFather
   Comando: /revoke (para bot existente)
   O comando: /newbot (para crear nuevo)
   ```

2. **Actualizar `.env` y producción** (mismo proceso que antes)

3. **Actualizar chat_id** si creaste nuevo bot

---

## 🔐 Verificación Post-Rotación

### Checklist de Verificación:

- [ ] Nuevos tokens generados en Directus
- [ ] Tokens antiguos revocados en Directus
- [ ] `.env` local actualizado con nuevos valores
- [ ] Variables de entorno actualizadas en producción (Vercel/Netlify)
- [ ] Cambios desplegados
- [ ] Build exitoso en producción
- [ ] Formulario de contacto funciona (prueba)
- [ ] Email de notificación llega (prueba)
- [ ] Telegram notificación llega (prueba - opcional)
- [ ] Contenido de Directus se carga en el sitio
- [ ] DevTools muestra token público (no admin) en peticiones

---

## 🧪 Tests de Seguridad

### Test 1: Verificar Token Público en Cliente

```bash
# Abrir DevTools (F12) → Network → Recargar página
# Buscar peticiones a Directus
# Verificar Authorization header

# ✅ Correcto:
Authorization: Bearer [token_publico]

# ❌ Incorrecto:
Authorization: Bearer [token_admin]
```

### Test 2: Intentar Escritura con Token Público

```bash
# Desde consola del navegador:
const config = useRuntimeConfig()
console.log(config.public.DIRECTUS_PUBLIC_TOKEN)

# Intentar crear un item (debe fallar):
fetch('https://directus.app/items/leads', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${config.public.DIRECTUS_PUBLIC_TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ test: 'data' })
})

# Debe retornar error 403 (Forbidden)
# Si retorna 200/201 → Token tiene permisos incorrectos ⚠️
```

### Test 3: Verificar Token Admin NO Expuesto

```bash
# En DevTools → Console:
const config = useRuntimeConfig()

// Esto debe ser undefined (o generar error):
console.log(config.DIRECTUS_ADMIN_TOKEN)

// Si muestra el token → PROBLEMA CRÍTICO ⚠️
```

---

## 📅 Calendario de Rotación

Establece un calendario regular de rotación de credenciales:

| Credencial | Frecuencia | Último Cambio | Próximo Cambio |
|------------|------------|---------------|----------------|
| DIRECTUS_ADMIN_TOKEN | 3 meses | 2025-11-01 | 2026-02-01 |
| DIRECTUS_PUBLIC_TOKEN | 6 meses | 2025-11-01 | 2026-05-01 |
| RESEND_API_KEY | 6 meses | 2025-11-01 | 2026-05-01 |
| TELEGRAM_BOT_TOKEN | 12 meses | - | - |

**Tip**: Configurar recordatorios en el calendario.

---

## 🚨 Procedimiento de Emergencia

Si detectas actividad sospechosa:

1. **INMEDIATO** (dentro de 5 minutos):
   ```
   - Revocar TODOS los tokens en Directus
   - Deshabilitar API keys en Resend
   - Poner sitio en "modo mantenimiento" si es necesario
   ```

2. **URGENTE** (dentro de 1 hora):
   ```
   - Revisar logs de Directus para actividad anormal
   - Revisar logs de Resend para emails no autorizados
   - Cambiar contraseñas de cuentas admin
   ```

3. **IMPORTANTE** (dentro de 24 horas):
   ```
   - Generar nuevas credenciales
   - Actualizar sistema
   - Documentar incidente
   - Notificar a stakeholders si hubo compromiso de datos
   ```

---

## 📝 Registro de Cambios

Mantén un log de rotaciones:

```
# docs/CREDENTIAL_ROTATION_LOG.md

## 2025-11-01
- Tipo: Rotación de emergencia
- Motivo: Token admin expuesto al cliente
- Credenciales rotadas:
  - DIRECTUS_ADMIN_TOKEN ✅
  - DIRECTUS_PUBLIC_TOKEN ✅ (nuevo)
  - RESEND_API_KEY ✅
- Realizado por: [nombre]
- Verificado por: [nombre]
- Incidentes: Ninguno

## [Próxima entrada...]
```

---

## ✅ Confirmación Final

Una vez completada la rotación, confirmar:

```bash
# Test completo del flujo:
1. Visitar https://contuhogar.com
2. Llenar formulario de contacto
3. Verificar email recibido
4. Verificar notificación Telegram
5. Verificar que blog carga correctamente
6. Verificar DevTools (token correcto)

# Si TODO funciona → Rotación exitosa ✅
```

---

**Importante**: Guarda esta guía para futuras rotaciones. La rotación de credenciales debe ser un proceso regular, no solo reactivo.

**Última actualización**: Noviembre 2025
