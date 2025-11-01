#!/usr/bin/env tsx
/**
 * Script para crear snapshots del schema de Directus
 * Permite control de versiones y migraciones seguras
 *
 * Uso:
 *   npx tsx scripts/directus-snapshot.ts create [nombre]  - Crear snapshot
 *   npx tsx scripts/directus-snapshot.ts apply [archivo]  - Aplicar snapshot
 *   npx tsx scripts/directus-snapshot.ts diff [archivo]   - Ver diferencias
 */

import { createDirectus, rest, staticToken, schemaSnapshot, schemaDiff, schemaApply } from '@directus/sdk'
import { writeFileSync, readFileSync, existsSync, readdirSync } from 'fs'
import { config } from 'dotenv'
import { resolve } from 'path'

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

const SNAPSHOTS_DIR = './directus/snapshots'

async function createSnapshot(name?: string) {
  try {
    const snapshotName = name || `snapshot-${new Date().toISOString().split('T')[0]}-${Date.now()}`
    const filename = `${snapshotName}.json`
    const filepath = resolve(SNAPSHOTS_DIR, filename)

    console.log('📸 Creando snapshot del schema actual...\n')

    // Crear snapshot usando la API de Directus
    const snapshot = await client.request(schemaSnapshot())

    // Guardar snapshot
    writeFileSync(filepath, JSON.stringify(snapshot, null, 2))

    console.log(`✅ Snapshot creado exitosamente:`)
    console.log(`📁 ${filepath}`)
    console.log(`\n💡 Para aplicar este snapshot usa:`)
    console.log(`   npx tsx scripts/directus-snapshot.ts apply ${filename}`)

    return snapshot

  } catch (error: any) {
    console.error('❌ Error al crear snapshot:', error.message)
    process.exit(1)
  }
}

async function applySnapshot(filename: string) {
  try {
    const filepath = resolve(SNAPSHOTS_DIR, filename)

    if (!existsSync(filepath)) {
      console.error(`❌ Error: Snapshot no encontrado: ${filepath}`)
      process.exit(1)
    }

    console.log(`🔄 Aplicando snapshot: ${filename}\n`)

    // Leer snapshot
    const snapshot = JSON.parse(readFileSync(filepath, 'utf-8'))

    // Obtener diferencias primero
    console.log('📊 Calculando diferencias...\n')
    const diff = await client.request(schemaDiff(snapshot))

    if (!diff || (diff.collections.length === 0 && diff.fields.length === 0 && diff.relations.length === 0)) {
      console.log('✅ No hay cambios que aplicar. El schema ya está sincronizado.')
      return
    }

    // Mostrar cambios
    console.log('📋 Cambios a aplicar:')
    console.log('━'.repeat(50))

    if (diff.collections && diff.collections.length > 0) {
      console.log(`\n📦 Colecciones: ${diff.collections.length} cambios`)
      diff.collections.forEach((col: any) => {
        console.log(`   ${col.diff[0] === '+' ? '✨' : '🗑️ '} ${col.collection}`)
      })
    }

    if (diff.fields && diff.fields.length > 0) {
      console.log(`\n📋 Campos: ${diff.fields.length} cambios`)
      diff.fields.slice(0, 10).forEach((field: any) => {
        const action = field.diff[0] === '+' ? '✨' : field.diff[0] === '-' ? '🗑️ ' : '🔄'
        console.log(`   ${action} ${field.collection}.${field.field}`)
      })
      if (diff.fields.length > 10) {
        console.log(`   ... y ${diff.fields.length - 10} más`)
      }
    }

    if (diff.relations && diff.relations.length > 0) {
      console.log(`\n🔗 Relaciones: ${diff.relations.length} cambios`)
      diff.relations.forEach((rel: any) => {
        console.log(`   ${rel.diff[0] === '+' ? '✨' : '🗑️ '} ${rel.collection}.${rel.field}`)
      })
    }

    console.log('\n━'.repeat(50))

    // Confirmar aplicación
    console.log('\n⚠️  ADVERTENCIA: Esta operación modificará el schema de Directus')
    console.log('   Asegúrate de tener un backup antes de continuar.\n')

    // En producción, requerir confirmación manual
    if (process.env.NODE_ENV === 'production') {
      console.log('❌ Operación cancelada: No se permite aplicar snapshots en producción sin confirmación manual.')
      console.log('   Usa FORCE=true para forzar la aplicación.')
      if (process.env.FORCE !== 'true') {
        process.exit(1)
      }
    }

    console.log('🔄 Aplicando cambios...')

    // Aplicar snapshot
    await client.request(schemaApply(snapshot))

    console.log('\n✅ Snapshot aplicado exitosamente!')
    console.log('💡 Regenera los tipos con: npx tsx scripts/directus-generate-types.ts')

  } catch (error: any) {
    console.error('\n❌ Error al aplicar snapshot:', error.message)
    if (error.errors) {
      console.error('Detalles:', JSON.stringify(error.errors, null, 2))
    }
    process.exit(1)
  }
}

async function showDiff(filename: string) {
  try {
    const filepath = resolve(SNAPSHOTS_DIR, filename)

    if (!existsSync(filepath)) {
      console.error(`❌ Error: Snapshot no encontrado: ${filepath}`)
      process.exit(1)
    }

    console.log(`📊 Comparando snapshot: ${filename}\n`)

    // Leer snapshot
    const snapshot = JSON.parse(readFileSync(filepath, 'utf-8'))

    // Obtener diferencias
    const diff = await client.request(schemaDiff(snapshot))

    if (!diff || (diff.collections.length === 0 && diff.fields.length === 0 && diff.relations.length === 0)) {
      console.log('✅ No hay diferencias. El schema está sincronizado.')
      return
    }

    console.log('📋 Diferencias encontradas:')
    console.log('━'.repeat(50))
    console.log(JSON.stringify(diff, null, 2))
    console.log('━'.repeat(50))

  } catch (error: any) {
    console.error('❌ Error al comparar:', error.message)
    process.exit(1)
  }
}

function listSnapshots() {
  if (!existsSync(SNAPSHOTS_DIR)) {
    console.log('📁 No hay snapshots disponibles.')
    return
  }

  const files = readdirSync(SNAPSHOTS_DIR).filter(f => f.endsWith('.json'))

  if (files.length === 0) {
    console.log('📁 No hay snapshots disponibles.')
    return
  }

  console.log('📸 Snapshots disponibles:\n')
  files.forEach(file => {
    const filepath = resolve(SNAPSHOTS_DIR, file)
    const stats = require('fs').statSync(filepath)
    console.log(`   📄 ${file}`)
    console.log(`      Creado: ${stats.mtime.toISOString()}`)
    console.log(`      Tamaño: ${(stats.size / 1024).toFixed(2)} KB\n`)
  })
}

// CLI
const command = process.argv[2]
const arg = process.argv[3]

switch (command) {
  case 'create':
    createSnapshot(arg)
    break
  case 'apply':
    if (!arg) {
      console.error('❌ Error: Debes especificar el archivo del snapshot')
      console.log('Uso: npx tsx scripts/directus-snapshot.ts apply <archivo>')
      process.exit(1)
    }
    applySnapshot(arg)
    break
  case 'diff':
    if (!arg) {
      console.error('❌ Error: Debes especificar el archivo del snapshot')
      console.log('Uso: npx tsx scripts/directus-snapshot.ts diff <archivo>')
      process.exit(1)
    }
    showDiff(arg)
    break
  case 'list':
    listSnapshots()
    break
  default:
    console.log('📸 Directus Snapshot Manager\n')
    console.log('Comandos disponibles:')
    console.log('  create [nombre]  - Crear nuevo snapshot del schema actual')
    console.log('  apply <archivo>  - Aplicar snapshot al schema')
    console.log('  diff <archivo>   - Mostrar diferencias entre snapshot y schema actual')
    console.log('  list             - Listar snapshots disponibles')
    console.log('\nEjemplos:')
    console.log('  npx tsx scripts/directus-snapshot.ts create')
    console.log('  npx tsx scripts/directus-snapshot.ts create "before-migration"')
    console.log('  npx tsx scripts/directus-snapshot.ts apply snapshot-2024-01-15.json')
    console.log('  npx tsx scripts/directus-snapshot.ts diff snapshot-2024-01-15.json')
    break
}
