<script setup lang="ts">
/**
 * Terminos y Condiciones - Pagina legal con diseno moderno tipo Stripe/Notion
 * Contenido simplificado y accesible
 */

const title = 'Terminos y Condiciones | ContuHogar'
const description = 'Lee los terminos y condiciones de uso de los servicios de asesoria financiera e inmobiliaria de ContuHogar. Conoce tus derechos y obligaciones.'

useSeo({
  title,
  description,
  type: 'website'
})

const { isLoading } = useLoading(150)

// Definicion de secciones para el sidebar
const sections = [
  { id: 'introduccion', title: 'Introduccion', icon: 'heroicons:information-circle' },
  { id: 'definiciones', title: 'Definiciones clave', icon: 'heroicons:book-open' },
  { id: 'uso-servicio', title: 'Uso del servicio', icon: 'heroicons:cursor-arrow-rays' },
  { id: 'tus-derechos', title: 'Tus derechos', icon: 'heroicons:shield-check' },
  { id: 'nuestras-obligaciones', title: 'Nuestras obligaciones', icon: 'heroicons:clipboard-document-check' },
  { id: 'tratamiento-datos', title: 'Tratamiento de datos', icon: 'heroicons:lock-closed' },
  { id: 'limitaciones', title: 'Limitaciones', icon: 'heroicons:scale' },
  { id: 'contacto', title: 'Contacto', icon: 'heroicons:envelope' }
]
</script>

<template>
  <div>
    <SkeletonLegalPage v-if="isLoading" />

    <LegalPageLayout
      v-else
      title="Terminos y Condiciones"
      description="Estos terminos regulan el uso de nuestros servicios de asesoria financiera e inmobiliaria. Los hemos escrito de forma clara para que entiendas tus derechos y nuestras responsabilidades."
      last-updated="Enero 2025"
      :sections="sections"
    >
      <!-- 1. Introduccion -->
      <LegalSection
        id="introduccion"
        title="1. Introduccion"
        icon="heroicons:information-circle"
        :default-open="true"
      >
        <p class="mb-4">
          Bienvenido a <strong>ContuHogar</strong>. Somos una empresa colombiana especializada en ayudar a colombianos
          en el exterior a conseguir credito hipotecario para comprar vivienda en Colombia.
        </p>
        <p class="mb-4">
          Estos Terminos y Condiciones establecen las reglas para usar nuestro sitio web
          <a href="https://contuhogar.com" class="text-primary hover:text-secondary underline">contuhogar.com</a>
          y nuestros servicios de asesoria. Al usar nuestros servicios, aceptas estos terminos.
        </p>
        <p>
          Si tienes alguna duda, puedes contactarnos en cualquier momento. Queremos que te sientas seguro
          y bien informado durante todo el proceso.
        </p>
      </LegalSection>

      <!-- 2. Definiciones -->
      <LegalSection
        id="definiciones"
        title="2. Definiciones clave"
        icon="heroicons:book-open"
      >
        <p class="mb-4">Para que este documento sea claro, aqui explicamos algunos terminos importantes:</p>

        <ul class="space-y-3">
          <li>
            <strong class="text-gray-900">ContuHogar:</strong>
            CONTUHOGAR S.A.S., la empresa que te brinda el servicio de asesoria.
          </li>
          <li>
            <strong class="text-gray-900">Usuario o Tu:</strong>
            Cualquier persona que use nuestro sitio web o solicite nuestros servicios.
          </li>
          <li>
            <strong class="text-gray-900">Servicios:</strong>
            Asesoria en credito hipotecario, simulacion de credito, acompanamiento en el proceso de compra de vivienda.
          </li>
          <li>
            <strong class="text-gray-900">Datos personales:</strong>
            Informacion que nos proporcionas y que permite identificarte (nombre, email, telefono, etc.).
          </li>
          <li>
            <strong class="text-gray-900">Entidades financieras:</strong>
            Bancos y entidades con las que trabajamos para gestionar tu crédito (BBVA, Banco de Bogotá, Banco de Occidente, Banco Unión).
          </li>
        </ul>
      </LegalSection>

      <!-- 3. Uso del servicio -->
      <LegalSection
        id="uso-servicio"
        title="3. Uso del servicio"
        icon="heroicons:cursor-arrow-rays"
      >
        <p class="mb-4">Nuestros servicios incluyen:</p>

        <ul class="space-y-2 mb-6">
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
            <span>Simulador de credito hipotecario para calcular tu capacidad de endeudamiento</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
            <span>Asesoria personalizada sobre opciones de financiacion</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
            <span>Gestion de tu solicitud ante entidades financieras</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
            <span>Acompanamiento durante todo el proceso de compra</span>
          </li>
        </ul>

        <p class="mb-4"><strong class="text-gray-900">Al usar nuestros servicios, te comprometes a:</strong></p>

        <ul class="space-y-2">
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-secondary rounded-full mt-2 shrink-0"></span>
            <span>Proporcionar informacion veraz y actualizada</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-secondary rounded-full mt-2 shrink-0"></span>
            <span>No usar el sitio para fines ilegales o no autorizados</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-secondary rounded-full mt-2 shrink-0"></span>
            <span>Mantener la confidencialidad de cualquier informacion que te proporcionemos</span>
          </li>
        </ul>
      </LegalSection>

      <!-- 4. Tus derechos -->
      <LegalSection
        id="tus-derechos"
        title="4. Tus derechos"
        icon="heroicons:shield-check"
      >
        <p class="mb-4">Como usuario de ContuHogar, tienes derecho a:</p>

        <div class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="font-semibold text-gray-900 mb-1">Informacion clara</p>
            <p class="text-sm">Recibir explicaciones claras sobre nuestros servicios, costos y el proceso de credito.</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="font-semibold text-gray-900 mb-1">Proteccion de datos</p>
            <p class="text-sm">Que tus datos personales sean tratados de forma segura y conforme a la ley colombiana.</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="font-semibold text-gray-900 mb-1">Acceso y correccion</p>
            <p class="text-sm">Conocer, actualizar o eliminar los datos personales que tenemos sobre ti.</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="font-semibold text-gray-900 mb-1">Desistimiento</p>
            <p class="text-sm">Cancelar el servicio en cualquier momento sin penalidades, antes de la formalizacion del credito.</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="font-semibold text-gray-900 mb-1">Reclamacion</p>
            <p class="text-sm">Presentar quejas o reclamos si consideras que no hemos cumplido con nuestras obligaciones.</p>
          </div>
        </div>
      </LegalSection>

      <!-- 5. Nuestras obligaciones -->
      <LegalSection
        id="nuestras-obligaciones"
        title="5. Nuestras obligaciones"
        icon="heroicons:clipboard-document-check"
      >
        <p class="mb-4">ContuHogar se compromete a:</p>

        <ul class="space-y-3">
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Brindarte asesoria profesional, honesta y transparente</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Proteger tus datos personales con las medidas de seguridad apropiadas</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Mantener la confidencialidad de tu informacion financiera</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Responder tus consultas y reclamos en los tiempos establecidos por la ley</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Informarte sobre cualquier cambio en las condiciones del servicio</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Actuar como intermediarios de buena fe entre tu y las entidades financieras</span>
          </li>
        </ul>
      </LegalSection>

      <!-- 6. Tratamiento de datos -->
      <LegalSection
        id="tratamiento-datos"
        title="6. Tratamiento de datos"
        icon="heroicons:lock-closed"
      >
        <p class="mb-4">
          Tus datos personales son importantes para nosotros. Los recopilamos y tratamos de acuerdo con la
          <strong>Ley 1581 de 2012</strong> (Ley de Proteccion de Datos de Colombia).
        </p>

        <p class="mb-4">En resumen:</p>

        <ul class="space-y-2 mb-6">
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
            <span>Solo recopilamos los datos necesarios para prestarte el servicio</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
            <span>Compartimos informacion con bancos aliados solo con tu autorizacion</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
            <span>Implementamos medidas de seguridad para proteger tus datos</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
            <span>Puedes solicitar acceso, correccion o eliminacion de tus datos</span>
          </li>
        </ul>

        <div class="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p class="text-sm text-blue-800">
            Para conocer todos los detalles sobre como manejamos tus datos, consulta nuestra
            <NuxtLink to="/politica-privacidad" class="font-semibold underline hover:text-blue-600">
              Politica de Privacidad
            </NuxtLink>.
          </p>
        </div>
      </LegalSection>

      <!-- 7. Limitaciones -->
      <LegalSection
        id="limitaciones"
        title="7. Limitaciones"
        icon="heroicons:scale"
      >
        <p class="mb-4">Es importante que sepas que:</p>

        <div class="space-y-4">
          <div class="border-l-4 border-orange-400 pl-4">
            <p class="font-semibold text-gray-900 mb-1">No somos un banco</p>
            <p class="text-sm">Somos asesores. La decision final de otorgar un credito corresponde a la entidad financiera.</p>
          </div>

          <div class="border-l-4 border-orange-400 pl-4">
            <p class="font-semibold text-gray-900 mb-1">Resultados del simulador</p>
            <p class="text-sm">Las simulaciones son estimaciones. El monto final del credito depende del analisis del banco.</p>
          </div>

          <div class="border-l-4 border-orange-400 pl-4">
            <p class="font-semibold text-gray-900 mb-1">Tasas de interes</p>
            <p class="text-sm">Las tasas pueden variar. Las que mostramos son referenciales basadas en condiciones del mercado.</p>
          </div>

          <div class="border-l-4 border-orange-400 pl-4">
            <p class="font-semibold text-gray-900 mb-1">Disponibilidad</p>
            <p class="text-sm">Nuestro sitio web puede tener interrupciones por mantenimiento. No somos responsables por danos derivados de la indisponibilidad temporal.</p>
          </div>
        </div>
      </LegalSection>

      <!-- 8. Contacto -->
      <LegalSection
        id="contacto"
        title="8. Contacto"
        icon="heroicons:envelope"
      >
        <p class="mb-4">
          Si tienes preguntas sobre estos Terminos y Condiciones, o si deseas ejercer alguno de tus derechos,
          puedes contactarnos:
        </p>

        <div class="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span>
              <strong class="text-gray-900">Email:</strong>
              <a href="mailto:gerenciacomercial@contuhogar.com" class="text-primary hover:text-secondary ml-1">gerenciacomercial@contuhogar.com</a>
            </span>
          </div>

          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span>
              <strong class="text-gray-900">Telefono:</strong>
              <a href="tel:+573208033672" class="text-primary hover:text-secondary ml-1">+57 320 803 3672</a>
            </span>
          </div>

          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>
              <strong class="text-gray-900">Direccion:</strong>
              <span class="ml-1">Carrera 54 # 105 - 20, Bogota D.C., Colombia</span>
            </span>
          </div>
        </div>

        <p class="mt-6 text-sm text-gray-500">
          Responderemos tus consultas en un plazo maximo de 10 dias habiles, conforme a la normativa colombiana.
        </p>
      </LegalSection>

      <!-- Link a Politica de Privacidad -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <p class="text-gray-500">
          Para mas informacion sobre como tratamos tus datos personales, consulta nuestra
          <NuxtLink to="/politica-privacidad" class="text-primary hover:text-secondary font-medium underline">
            Politica de Privacidad
          </NuxtLink>.
        </p>
      </div>
    </LegalPageLayout>
  </div>
</template>
