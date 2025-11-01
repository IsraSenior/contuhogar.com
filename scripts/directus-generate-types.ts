#!/usr/bin/env tsx
/**
 * Script para generar tipos de TypeScript desde el schema de Directus
 * Genera tipos seguros para todas las colecciones y campos
 *
 * Uso: npx tsx scripts/directus-generate-types.ts
 */

import { createDirectus, rest, staticToken, readCollections, readFields } from '@directus/sdk'
import { writeFileSync } from 'fs'
import { config } from 'dotenv'

// Cargar variables de entorno
config()

const DIRECTUS_URL = process.env.DIRECTUS_URL!
const DIRECTUS_ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN!

// Crear cliente de Directus
const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_ADMIN_TOKEN))
  .with(rest())

// Mapeo de tipos de Directus a TypeScript
const typeMap: Record<string, string> = {
  'string': 'string',
  'text': 'string',
  'integer': 'number',
  'bigInteger': 'number',
  'float': 'number',
  'decimal': 'number',
  'boolean': 'boolean',
  'date': 'string',
  'time': 'string',
  'datetime': 'string',
  'timestamp': 'string',
  'json': 'any',
  'csv': 'string[]',
  'uuid': 'string',
  'hash': 'string',
}

function mapFieldType(field: any): string {
  // Si es una relación many-to-one
  if (field.meta?.interface === 'm2o') {
    return 'string | null' // Foreign key
  }

  // Si es una relación one-to-many o many-to-many
  if (field.meta?.interface === 'o2m' || field.meta?.interface === 'm2m') {
    return 'any[]' // Array de relaciones
  }

  // Tipo base
  let tsType = typeMap[field.type] || 'any'

  // Si permite null
  if (!field.meta?.required && !field.schema?.is_nullable === false) {
    tsType += ' | null'
  }

  return tsType
}

async function generateTypes() {
  try {
    console.log('🔄 Generando tipos de TypeScript desde Directus...\n')

    // Obtener colecciones
    const allCollections = await client.request(readCollections())
    const collections = allCollections.filter(c => !c.collection.startsWith('directus_'))

    // Obtener todos los campos
    const allFields = await client.request(readFields())

    let typesContent = `/**
 * Tipos de TypeScript auto-generados desde Directus
 * Generado: ${new Date().toISOString()}
 * No editar manualmente - usar: npx tsx scripts/directus-generate-types.ts
 */

`

    // Generar tipos para cada colección
    collections.forEach(collection => {
      const collectionName = collection.collection
      const fields = allFields.filter(f => f.collection === collectionName)

      console.log(`📦 Generando tipo para: ${collectionName} (${fields.length} campos)`)

      // Nombre del tipo (PascalCase)
      const typeName = collectionName
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')

      typesContent += `/**\n * Colección: ${collectionName}\n`
      if (collection.meta?.note) {
        typesContent += ` * ${collection.meta.note}\n`
      }
      typesContent += ` */\n`
      typesContent += `export interface ${typeName} {\n`

      // Generar campos
      fields.forEach(field => {
        const fieldName = field.field
        const tsType = mapFieldType(field)
        const isRequired = field.meta?.required ? '' : '?'

        // Agregar comentario si existe
        if (field.meta?.note) {
          typesContent += `  /** ${field.meta.note} */\n`
        }

        typesContent += `  ${fieldName}${isRequired}: ${tsType}\n`
      })

      typesContent += `}\n\n`
    })

    // Agregar tipo union de todas las colecciones
    typesContent += `/**\n * Union type de todas las colecciones\n */\n`
    typesContent += `export type DirectusCollections = {\n`
    collections.forEach(collection => {
      const collectionName = collection.collection
      const typeName = collectionName
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
      typesContent += `  ${collectionName}: ${typeName}\n`
    })
    typesContent += `}\n`

    // Guardar tipos
    const typesPath = './types/directus.ts'
    writeFileSync(typesPath, typesContent)
    console.log(`\n✅ Tipos generados en: ${typesPath}`)

    return typesContent

  } catch (error: any) {
    console.error('\n❌ Error al generar tipos:', error.message)
    process.exit(1)
  }
}

// Ejecutar generación
generateTypes()
