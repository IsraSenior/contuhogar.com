# Directus Collection: simulaciones_credito

## Overview
This collection stores credit simulation data from the ConTuHogar mortgage/leasing simulator. Each record represents a completed simulation with all user inputs and calculated results.

## Collection Configuration

**Collection Name:** `simulaciones_credito`

**Icon:** `calculate` or `assessment`

**Note Template:** `{{nombres}} {{apellidos}} - {{tipo_credito}} - {{resultado_simulacion}}`

## Fields Schema

### System Fields (Auto-created by Directus)
- `id` (UUID, Primary Key)
- `date_created` (DateTime, Auto-generated)
- `date_updated` (DateTime, Auto-updated)
- `user_created` (User, Auto-generated)
- `user_updated` (User, Auto-updated)

### Personal Information Fields

| Field | Type | Interface | Required | Note |
|-------|------|-----------|----------|------|
| `nombres` | String | Input | Yes | First name(s) |
| `apellidos` | String | Input | Yes | Last name(s) |
| `fecha_nacimiento` | Date | Date | Yes | Birthdate (YYYY-MM-DD) |
| `telefono` | String | Input | Yes | Phone with country code (e.g., "+57 3001234567") |
| `correo` | String | Input | Yes | Email address |
| `edad` | Integer | Input (Number) | Yes | Age in years (18-84) |
| `tipo_credito` | String | Dropdown | Yes | Options: `hipotecario`, `leasing` |

### Property Information Fields

| Field | Type | Interface | Required | Note |
|-------|------|-----------|----------|------|
| `valor_bien` | Decimal | Input (Number) | Yes | Property value in COP |
| `monto_solicitado` | Decimal | Input (Number) | Yes | Requested loan amount in COP |
| `plazo_meses` | Integer | Input (Number) | Yes | Loan term in months (12-240) |

### Income Information Fields

| Field | Type | Interface | Required | Note |
|-------|------|-----------|----------|------|
| `ingresos_fijos` | Decimal | Input (Number) | Yes | Fixed monthly income in COP |
| `ingresos_variables` | Decimal | Input (Number) | No | Variable monthly income in COP (default: 0) |
| `deducciones` | Decimal | Input (Number) | No | Monthly deductions in COP (default: 0) |
| `obligaciones_financieras` | Decimal | Input (Number) | No | Total financial obligations in COP |
| `detalle_obligaciones` | JSON | Input (Code) | No | Detailed array of obligations |

**`detalle_obligaciones` JSON Structure:**
```json
[
  {
    "id": "uuid-string",
    "tipo": "tarjeta_credito|hipotecaria_arriendo|otra",
    "monto": 500000,
    "descripcion": "Optional description"
  }
]
```

### Eligibility Fields

| Field | Type | Interface | Required | Note |
|-------|------|-----------|----------|------|
| `status_migratorio` | Boolean | Toggle | Yes | Immigration status valid |
| `reportes_negativos` | Boolean | Toggle | Yes | Has negative credit reports |

### Simulation Results Fields

| Field | Type | Interface | Required | Note |
|-------|------|-----------|----------|------|
| `resultado_simulacion` | String | Dropdown | Yes | Options: `aprobado`, `rechazado`, `advertencia` |
| `cuota_mensual` | Decimal | Input (Number) | Yes | Estimated monthly payment in COP |
| `tasa_ea` | Decimal | Input (Number) | Yes | Annual effective rate (%) |
| `tasa_mensual` | Decimal | Input (Number) | Yes | Monthly interest rate (%) |
| `ingresos_netos` | Decimal | Input (Number) | Yes | Net monthly income in COP |
| `porcentaje_compromiso` | Decimal | Input (Number) | Yes | DTI ratio (%) |
| `edad_final` | Integer | Input (Number) | Yes | Age at loan end |
| `porcentaje_financiacion` | Decimal | Input (Number) | Yes | LTV ratio (%) |
| `monto_maximo_viable` | Decimal | Input (Number) | No | Maximum viable loan amount |
| `motivo_rechazo` | String | Input (Text Area) | No | Rejection reason if applicable |
| `recomendaciones` | JSON | Input (Code) | No | Array of recommendation strings |

**`recomendaciones` JSON Structure:**
```json
[
  "Increase your down payment by 10%",
  "Extend the loan term to reduce monthly payment",
  "Consider a different property value range"
]
```

### Metadata Fields (for tracking and security)

| Field | Type | Interface | Required | Note |
|-------|------|-----------|----------|------|
| `ip_address` | String | Input | No | Client IP address |
| `user_agent` | String | Input (Text Area) | No | Browser user agent |
| `status` | String | Dropdown | Yes | Lead status. Options: `nuevo`, `contactado`, `en_proceso`, `aprobado`, `rechazado`, `archivado` |

## Field Configuration Details

### Dropdown Options

**tipo_credito:**
- Value: `hipotecario` | Text: Crédito Hipotecario
- Value: `leasing` | Text: Leasing Habitacional

**resultado_simulacion:**
- Value: `aprobado` | Text: ✅ Aprobado
- Value: `rechazado` | Text: ❌ Rechazado
- Value: `advertencia` | Text: ⚠️ Advertencia

**status:**
- Value: `nuevo` | Text: 🆕 Nuevo
- Value: `contactado` | Text: 📞 Contactado
- Value: `en_proceso` | Text: ⏳ En Proceso
- Value: `aprobado` | Text: ✅ Aprobado
- Value: `rechazado` | Text: ❌ Rechazado
- Value: `archivado` | Text: 📦 Archivado

### Numeric Field Configurations

**Decimal Fields (use `decimal` type with appropriate precision):**
- Financial amounts (valor_bien, monto_solicitado, ingresos_*, obligaciones_*): Precision 15,2
- Percentages (tasa_*, porcentaje_*): Precision 10,4

**Integer Fields:**
- edad: Min 18, Max 84
- plazo_meses: Min 12, Max 240
- edad_final: Min 18, Max 84

### Validation Rules

Apply these validation rules in Directus:

1. **Email validation:** Use email format validator on `correo`
2. **Phone validation:** Regex pattern for phone with country code
3. **Date validation:** `fecha_nacimiento` must be in the past
4. **Age consistency:** `edad` should match `fecha_nacimiento`
5. **LTV validation:**
   - If `tipo_credito` = "hipotecario": `monto_solicitado` / `valor_bien` <= 0.70
   - If `tipo_credito` = "leasing": `monto_solicitado` / `valor_bien` <= 0.80

## Display Templates

### List View Configuration
Show these columns:
1. `date_created`
2. `nombres` + `apellidos` (combined)
3. `correo`
4. `tipo_credito`
5. `resultado_simulacion`
6. `monto_solicitado`
7. `status`

Sort by: `date_created` DESC

### Detail View Layout

**Section 1: Información Personal**
- nombres, apellidos
- fecha_nacimiento, edad
- correo, telefono

**Section 2: Tipo de Crédito**
- tipo_credito

**Section 3: Información del Bien**
- valor_bien
- monto_solicitado
- plazo_meses

**Section 4: Información de Ingresos**
- ingresos_fijos
- ingresos_variables
- deducciones
- obligaciones_financieras
- detalle_obligaciones (JSON display)

**Section 5: Elegibilidad**
- status_migratorio
- reportes_negativos

**Section 6: Resultados de la Simulación**
- resultado_simulacion
- cuota_mensual
- tasa_ea, tasa_mensual
- ingresos_netos
- porcentaje_compromiso
- edad_final
- porcentaje_financiacion
- monto_maximo_viable
- motivo_rechazo
- recomendaciones (JSON display)

**Section 7: Metadata**
- ip_address
- user_agent
- status
- date_created, date_updated

## Permissions

### Public Role
- **Create:** No
- **Read:** No
- **Update:** No
- **Delete:** No

### Authenticated Users
- **Create:** No (only API with admin token can create)
- **Read:** Yes (filtered by user_created = $CURRENT_USER)
- **Update:** No
- **Delete:** No

### Administrator
- **Create:** Yes
- **Read:** Yes
- **Update:** Yes
- **Delete:** Yes

## Indexes for Performance

Recommended indexes:
1. `correo` (for searching by email)
2. `date_created` (for sorting/filtering)
3. `resultado_simulacion` (for filtering by result)
4. `status` (for filtering by status)
5. `tipo_credito` (for filtering by credit type)

## Related Collections

This collection can be related to:
- `leads` (if a simulation converts to a lead, link via `correo` field)

## API Endpoint

**POST** `/api/simulador/save`

This endpoint validates and saves simulation data to this collection using the Directus server client with admin token.

## Post-Creation Steps

After creating this collection in Directus:

1. Run the type generation script:
   ```bash
   pnpm directus:types
   ```

2. Update `types/directus.ts` to include the new collection interface

3. Test the API endpoint:
   ```bash
   curl -X POST http://localhost:3000/api/simulador/save \
     -H "Content-Type: application/json" \
     -d @test-payload.json
   ```

4. Verify data appears correctly in Directus admin panel

## Notes

- All currency values are in Colombian Pesos (COP)
- Interest rates are stored as percentages (e.g., 14.00 means 14%)
- The `status` field allows tracking the lead lifecycle
- IP and User Agent are stored for security/audit purposes
- JSON fields allow flexible storage of complex data structures
