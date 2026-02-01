# Simulador Save Implementation

## Overview
This document describes the implementation of the credit simulator save functionality, which allows users to save their simulation results to the Directus CMS.

## Implementation Summary

### 1. API Endpoint Created

**File:** `/Users/israsenior/Desktop/ConTuHogar/contuhogar.com/server/api/simulador/save.post.ts`

**Features:**
- ✅ Zod validation for all simulation data
- ✅ Rate limiting (3 saves per 5 minutes)
- ✅ Payload size validation (max 50KB)
- ✅ Client IP and User Agent tracking for security/audit
- ✅ Total obligations calculation
- ✅ Comprehensive error handling
- ✅ Saves to Directus `simulaciones_credito` collection

**Validation Schema:**
```typescript
- Personal data: nombres, apellidos, fecha_nacimiento, telefono, correo, edad, tipo_credito
- Property data: valor_bien, monto_solicitado, plazo_meses
- Income data: ingresos_fijos, ingresos_variables, deducciones, obligaciones_financieras[]
- Eligibility: status_migratorio, reportes_negativos
- Results: resultado object with all calculated fields
```

**Rate Limiting:**
- 3 saves per 5 minutes per IP address
- Uses existing `rateLimit()` utility
- Prevents abuse while allowing legitimate retries

**Security:**
- Content-Length validation (max 50KB)
- IP tracking via Cloudflare headers (cf-connecting-ip, x-real-ip, x-forwarded-for)
- User-Agent tracking
- All input sanitized via Zod schemas

### 2. Store Action Added

**File:** `/Users/israsenior/Desktop/ConTuHogar/contuhogar.com/stores/simulador.ts`

**New Action:** `guardarSimulacion()`

**Features:**
- ✅ Validates simulation is complete before saving
- ✅ Validates all steps are valid
- ✅ Collects all data from store state
- ✅ Calls `/api/simulador/save` endpoint
- ✅ Returns structured response: `{ ok: boolean; id?: string | number; error?: string }`
- ✅ Comprehensive error handling with user-friendly messages

**Usage Example:**
```typescript
const simuladorStore = useSimuladorStore()

// After completing all steps
const result = await simuladorStore.guardarSimulacion()

if (result.ok) {
  console.log('Simulation saved with ID:', result.id)
  // Show success message to user
} else {
  console.error('Error:', result.error)
  // Show error message to user
}
```

## Data Flow

```
User completes simulation
         ↓
StepResults.vue calls store.guardarSimulacion()
         ↓
Store validates all steps
         ↓
Store prepares payload with all simulation data
         ↓
Store calls POST /api/simulador/save
         ↓
API validates with Zod schema
         ↓
API checks rate limits
         ↓
API saves to Directus simulaciones_credito collection
         ↓
API returns { ok: true, id: "uuid" }
         ↓
Store returns success response to component
         ↓
Component shows success message to user
```

## Required Directus Collection Setup

**⚠️ IMPORTANT:** The Directus collection `simulaciones_credito` must be created before this functionality will work.

**Complete schema documentation:** See `/docs/directus-simulaciones-credito-schema.md`

**Quick Setup Steps:**

1. Log into Directus admin panel
2. Create new collection: `simulaciones_credito`
3. Add all fields as documented in the schema file
4. Set up permissions (API uses admin token, so public role should have no access)
5. Run type generation:
   ```bash
   pnpm directus:types
   ```

**Collection Fields Summary:**
- **Personal Info:** nombres, apellidos, fecha_nacimiento, telefono, correo, edad, tipo_credito
- **Property Info:** valor_bien, monto_solicitado, plazo_meses
- **Income Info:** ingresos_fijos, ingresos_variables, deducciones, obligaciones_financieras, detalle_obligaciones (JSON)
- **Eligibility:** status_migratorio, reportes_negativos
- **Results:** resultado_simulacion, cuota_mensual, tasa_ea, tasa_mensual, ingresos_netos, porcentaje_compromiso, edad_final, porcentaje_financiacion, monto_maximo_viable, motivo_rechazo, recomendaciones (JSON)
- **Metadata:** ip_address, user_agent, status

## Testing

### Manual Testing Steps

1. **Create Collection in Directus** (if not done yet)
   - Follow schema in `/docs/directus-simulaciones-credito-schema.md`

2. **Test API Endpoint**
   ```bash
   # Create a test payload file
   cat > test-simulation.json << 'EOF'
   {
     "nombres": "Juan",
     "apellidos": "Pérez García",
     "fechaNacimiento": "1985-05-15",
     "telefono": "3001234567",
     "telefonoCodigo": { "flag": "🇨🇴", "code": "+57" },
     "correo": "juan.perez@example.com",
     "edad": 38,
     "tipoCredito": "hipotecario",
     "valorBien": 300000000,
     "montoSolicitado": 210000000,
     "plazoMeses": 180,
     "ingresosFijos": 8000000,
     "ingresosVariables": 1000000,
     "deducciones": 500000,
     "obligacionesFinancieras": [
       {
         "id": "1",
         "tipo": "tarjeta_credito",
         "monto": 200000,
         "descripcion": "Tarjeta Visa"
       }
     ],
     "statusMigratorio": true,
     "reportesNegativos": false,
     "resultado": {
       "resultado": "aprobado",
       "cuotaMensual": 2850000,
       "tasaEA": 14.0,
       "tasaMensual": 1.0975,
       "ingresosNetos": 8500000,
       "porcentajeCompromiso": 33.5,
       "edadFinal": 53,
       "porcentajeFinanciacion": 70.0,
       "recomendaciones": []
     }
   }
   EOF

   # Test the endpoint
   curl -X POST http://localhost:3000/api/simulador/save \
     -H "Content-Type: application/json" \
     -d @test-simulation.json
   ```

3. **Test via Frontend**
   - Navigate to simulator: http://localhost:3000/simulador/credito
   - Complete all 5 steps
   - In StepResults component, call `await simuladorStore.guardarSimulacion()`
   - Check browser console for response
   - Verify record appears in Directus

4. **Verify Rate Limiting**
   - Try saving 4 times rapidly
   - 4th attempt should return 429 Too Many Requests

### Expected Responses

**Success Response:**
```json
{
  "ok": true,
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Simulación guardada exitosamente"
}
```

**Validation Error:**
```json
{
  "statusCode": 400,
  "statusMessage": "Bad Request",
  "message": "Errores de validación en los datos de simulación",
  "data": {
    "fieldErrors": {
      "correo": ["Invalid email"]
    }
  }
}
```

**Rate Limit Error:**
```json
{
  "statusCode": 429,
  "statusMessage": "Too Many Requests",
  "message": "Has guardado demasiadas simulaciones recientemente. Por favor, espera unos minutos.",
  "data": {
    "retryAfter": 180,
    "resetTime": "2025-01-18T15:30:00.000Z"
  }
}
```

## Frontend Integration

To integrate this into the UI (this should be done by the `nuxt-ui-engineer` agent):

### 1. Add Save Button to StepResults Component

```vue
<!-- components/simulador/steps/StepResults.vue -->
<script setup lang="ts">
const simuladorStore = useSimuladorStore()
const saving = ref(false)
const saveError = ref<string | null>(null)
const saveSuccess = ref(false)

async function handleSaveSimulation() {
  saving.value = true
  saveError.value = null
  saveSuccess.value = false

  try {
    const result = await simuladorStore.guardarSimulacion()

    if (result.ok) {
      saveSuccess.value = true
      // Optionally show success toast/modal
      console.log('Simulation saved with ID:', result.id)
    } else {
      saveError.value = result.error || 'Error al guardar la simulación'
    }
  } catch (error) {
    saveError.value = 'Error inesperado al guardar'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <!-- Add to the results UI -->
  <div class="mt-8">
    <button
      @click="handleSaveSimulation"
      :disabled="saving"
      class="btn-primary"
    >
      {{ saving ? 'Guardando...' : 'Guardar Simulación' }}
    </button>

    <div v-if="saveSuccess" class="success-message">
      ✅ Simulación guardada exitosamente
    </div>

    <div v-if="saveError" class="error-message">
      ❌ {{ saveError }}
    </div>
  </div>
</template>
```

### 2. Optional: Add to Contact Form Flow

If you want to save the simulation when the user submits the contact form:

```typescript
// Before or after sending contact form
const simulationResult = await simuladorStore.guardarSimulacion()
if (simulationResult.ok) {
  // Include simulation ID in contact form
  contactForm.simulationId = simulationResult.id
}
```

## Architectural Notes

### Type Safety
- The API endpoint uses Zod for runtime validation
- The store is already typed with TypeScript
- After creating the Directus collection, run `pnpm directus:types` to generate TypeScript interfaces

### Error Handling
- API validates all inputs with detailed error messages
- Store validates state before sending
- Both layers return user-friendly error messages
- Errors are logged to console for debugging

### Data Consistency
- The store validates all steps before allowing save
- The API re-validates to prevent tampering
- Obligation totals are calculated server-side
- Metadata (IP, User Agent) added server-side for security

### Performance
- Rate limiting prevents abuse
- Payload size limited to 50KB
- In-memory rate limit store (consider Redis for production scaling)
- Optional: Add caching for repeated saves (though not recommended for simulations)

### Security
- Only server-side API can write to Directus (uses admin token)
- Client IP and User Agent tracked
- All inputs sanitized via Zod
- Rate limiting per IP
- No public access to collection (permissions: admin only)

## Future Enhancements

1. **Email Notification:** Send email to sales team when simulation is saved (similar to contact form)
2. **Simulation ID in State:** Add `simulacionId` to store state after successful save
3. **Save on Navigation:** Auto-save when user navigates away from results
4. **Duplicate Detection:** Prevent saving identical simulations within 24 h
5. **Analytics:** Track save conversion rate
6. **Export PDF:** Allow user to download PDF with simulation ID
7. **Resume Simulation:** Allow users to load saved simulations by ID

## Checklist for Deployment

- [ ] Create `simulaciones_credito` collection in Directus (follow schema doc)
- [ ] Configure collection permissions (admin only)
- [ ] Run `pnpm directus:types` to generate types
- [ ] Test API endpoint with sample data
- [ ] Add save button to StepResults component (UI engineer)
- [ ] Test complete flow in development
- [ ] Configure email notifications (optional)
- [ ] Test rate limiting
- [ ] Deploy and test in production
- [ ] Monitor Directus for incoming simulations

## Files Modified/Created

**Created:**
- `/server/api/simulador/save.post.ts` - API endpoint
- `/docs/directus-simulaciones-credito-schema.md` - Directus schema documentation
- `/docs/simulador-save-implementation.md` - This file

**Modified:**
- `/stores/simulador.ts` - Added `guardarSimulacion()` action

**To Be Modified (by UI engineer):**
- `/components/simulador/steps/StepResults.vue` - Add save button and UI

## Support

For questions about this implementation:
- See code comments in `/server/api/simulador/save.post.ts`
- Review Directus schema doc for collection setup
- Check existing `/server/api/contact.post.ts` for similar patterns

---

**Implementation Date:** 2025-01-18
**Agent:** nuxt-logic-architect
**Status:** ✅ Complete (awaiting Directus collection setup)
