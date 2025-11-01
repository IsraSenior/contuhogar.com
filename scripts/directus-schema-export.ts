#!/usr/bin/env tsx
/**
 * Script para exportar el schema completo de Directus
 * Incluye colecciones, campos, relaciones y configuraciones
 *
 * Uso: npx tsx scripts/directus-schema-export.ts
 */

import { createDirectus, rest, staticToken, readCollections, readFields, readRelations } from '@directus/sdk'
import { writeFileSync } from 'fs'
import { config } from 'dotenv'

// Cargar variables de entorno
config()

const DIRECTUS_URL = process.env.DIRECTUS_URL!
const DIRECTUS_ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN!

if (!DIRECTUS_URL || !DIRECTUS_ADMIN_TOKEN) {
  console.error('❌ Error: DIRECTUS_URL y DIRECTUS_ADMIN_TOKEN son requeridos en .env')
  process.exit(1)
}

// Crear cliente de Directus
const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_ADMIN_TOKEN))
  .with(rest())

interface DirectusSchema {
  version: string
  exportedAt: string
  directusUrl: string
  collections: any[]
  fields: any[]
  relations: any[]
}

async function exportSchema() {
  try {
    console.log('🔄 Conectando a Directus...')
    console.log(`📍 URL: ${DIRECTUS_URL}`)

    // Obtener colecciones
    console.log('\n📦 Obteniendo colecciones...')
    const collections = await client.request(readCollections())
    console.log(`✅ ${collections.length} colecciones encontradas`)

    // Obtener campos
    console.log('\n📋 Obteniendo campos...')
    const fields = await client.request(readFields())
    console.log(`✅ ${fields.length} campos encontrados`)

    // Obtener relaciones
    console.log('\n🔗 Obteniendo relaciones...')
    const relations = await client.request(readRelations())
    console.log(`✅ ${relations.length} relaciones encontradas`)

    // Crear objeto de schema
    const schema: DirectusSchema = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      directusUrl: DIRECTUS_URL,
      collections,
      fields,
      relations
    }

    // Guardar schema completo
    const schemaPath = './directus/schema.json'
    writeFileSync(schemaPath, JSON.stringify(schema, null, 2))
    console.log(`\n✅ Schema completo exportado a: ${schemaPath}`)

    // Generar resumen
    console.log('\n📊 Resumen del Schema:')
    console.log('━'.repeat(50))

    // Filtrar colecciones del sistema
    const userCollections = collections.filter(c => !c.collection.startsWith('directus_'))
    console.log(`\n📦 Colecciones de usuario: ${userCollections.length}`)
    userCollections.forEach(col => {
      const collectionFields = fields.filter(f => f.collection === col.collection)
      console.log(`   - ${col.collection} (${collectionFields.length} campos)`)
    })

    // Mostrar relaciones
    const userRelations = relations.filter(r => !r.collection?.startsWith('directus_'))
    console.log(`\n🔗 Relaciones: ${userRelations.length}`)
    userRelations.forEach(rel => {
      console.log(`   - ${rel.collection}.${rel.field} → ${rel.related_collection}`)
    })

    console.log('\n━'.repeat(50))
    console.log('✅ Exportación completada exitosamente!')

    return schema

  } catch (error: any) {
    console.error('\n❌ Error al exportar schema:', error.message)
    if (error.errors) {
      console.error('Detalles:', error.errors)
    }
    process.exit(1)
  }
}

// Ejecutar exportación
exportSchema()
