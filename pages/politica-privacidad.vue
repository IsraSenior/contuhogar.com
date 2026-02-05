<script setup lang="ts">
/**
 * Politica de Privacidad - Pagina legal con diseno moderno tipo Stripe/Notion
 * Conforme a la Ley 1581 de 2012 de Colombia
 */

const title = 'Politica de Privacidad | ConTuHogar'
const description = 'Conoce como ConTuHogar protege y trata tus datos personales. Politica de privacidad conforme a la Ley 1581 de 2012 de Colombia.'

useSeo({
  title,
  description,
  type: 'website'
})

const { isLoading } = useLoading(150)

// Definicion de secciones para el sidebar
const sections = [
  { id: 'introduccion', title: 'Introduccion', icon: 'heroicons:information-circle' },
  { id: 'responsable', title: 'Responsable del tratamiento', icon: 'heroicons:user-group' },
  { id: 'datos-recopilamos', title: 'Datos que recopilamos', icon: 'heroicons:clipboard-document-check' },
  { id: 'finalidad', title: 'Finalidad del tratamiento', icon: 'heroicons:cursor-arrow-rays' },
  { id: 'base-legal', title: 'Base legal', icon: 'heroicons:scale' },
  { id: 'tus-derechos', title: 'Tus derechos', icon: 'heroicons:shield-check' },
  { id: 'comparticion', title: 'Comparticion de datos', icon: 'heroicons:globe-alt' },
  { id: 'seguridad', title: 'Seguridad', icon: 'heroicons:lock-closed' },
  { id: 'cookies', title: 'Cookies', icon: 'heroicons:finger-print' },
  { id: 'retencion', title: 'Retencion de datos', icon: 'heroicons:clock' },
  { id: 'transferencias', title: 'Transferencias internacionales', icon: 'heroicons:globe-alt' },
  { id: 'cambios', title: 'Cambios a esta politica', icon: 'heroicons:document-text' },
  { id: 'contacto', title: 'Contacto', icon: 'heroicons:envelope' }
]
</script>

<template>
  <div>
    <SkeletonLegalPage v-if="isLoading" />

    <LegalPageLayout
      v-else
      title="Politica de Privacidad"
      description="En ConTuHogar nos comprometemos a proteger tu privacidad y tus datos personales. Esta politica describe como recopilamos, usamos y protegemos tu informacion."
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
          En <strong>CONTUHOGAR S.A.S.</strong> (en adelante "ConTuHogar") nos comprometemos a proteger tu privacidad
          y tus datos personales.
        </p>
        <p class="mb-4">
          Esta Politica de Privacidad describe como recopilamos, usamos, almacenamos y protegemos la informacion
          que nos proporcionas cuando utilizas nuestro sitio web
          <a href="https://contuhogar.com" class="text-primary hover:text-secondary underline">contuhogar.com</a>
          y nuestros servicios de asesoria financiera e inmobiliaria.
        </p>
        <p>
          Al usar nuestros servicios, aceptas las practicas descritas en esta politica.
          Te recomendamos leerla completamente.
        </p>
      </LegalSection>

      <!-- 2. Responsable del tratamiento -->
      <LegalSection
        id="responsable"
        title="2. Responsable del tratamiento"
        icon="heroicons:user-group"
      >
        <p class="mb-4">La entidad responsable del tratamiento de tus datos personales es:</p>

        <div class="bg-gray-50 rounded-lg p-5 space-y-2">
          <p>
            <strong class="text-gray-900">Razon social:</strong>
            CONTUHOGAR S.A.S.
          </p>
          <p>
            <strong class="text-gray-900">NIT:</strong>
            900.289.766-1
          </p>
          <p>
            <strong class="text-gray-900">Direccion:</strong>
            Carrera 54 # 105 - 20, Bogota D.C., Colombia
          </p>
          <p>
            <strong class="text-gray-900">Correo electronico:</strong>
            <a href="mailto:gerenciacomercial@contuhogar.com" class="text-primary hover:text-secondary">gerenciacomercial@contuhogar.com</a>
          </p>
          <p>
            <strong class="text-gray-900">Telefono:</strong>
            <a href="tel:+573208033672" class="text-primary hover:text-secondary">+57 320 803 3672</a>
          </p>
        </div>
      </LegalSection>

      <!-- 3. Datos que recopilamos -->
      <LegalSection
        id="datos-recopilamos"
        title="3. Datos que recopilamos"
        icon="heroicons:clipboard-document-check"
      >
        <p class="mb-4">Recopilamos los siguientes tipos de informacion:</p>

        <div class="space-y-5">
          <div>
            <p class="font-semibold text-gray-900 mb-2">Datos de identificacion</p>
            <ul class="space-y-1">
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
                <span>Nombres y apellidos</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
                <span>Numero de documento de identidad</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
                <span>Correo electronico</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
                <span>Numero de telefono</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
                <span>Pais de residencia</span>
              </li>
            </ul>
          </div>

          <div>
            <p class="font-semibold text-gray-900 mb-2">Datos financieros</p>
            <ul class="space-y-1">
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-secondary rounded-full mt-2 shrink-0"></span>
                <span>Informacion de ingresos</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-secondary rounded-full mt-2 shrink-0"></span>
                <span>Historial crediticio (cuando autorizas su consulta)</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-secondary rounded-full mt-2 shrink-0"></span>
                <span>Informacion sobre propiedades de interes</span>
              </li>
            </ul>
          </div>

          <div>
            <p class="font-semibold text-gray-900 mb-2">Datos de navegacion</p>
            <ul class="space-y-1">
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></span>
                <span>Direccion IP</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></span>
                <span>Tipo de navegador</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></span>
                <span>Paginas visitadas</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></span>
                <span>Tiempo de permanencia en el sitio</span>
              </li>
            </ul>
          </div>
        </div>
      </LegalSection>

      <!-- 4. Finalidad del tratamiento -->
      <LegalSection
        id="finalidad"
        title="4. Finalidad del tratamiento"
        icon="heroicons:cursor-arrow-rays"
      >
        <p class="mb-4">Utilizamos tus datos personales para:</p>

        <ul class="space-y-3">
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Brindarte asesoria personalizada sobre creditos hipotecarios y productos financieros</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Gestionar tu solicitud de preaprobacion de credito</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Comunicarnos contigo sobre el estado de tu solicitud</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Enviarte informacion relevante sobre nuestros servicios (con tu consentimiento)</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Mejorar nuestros servicios y la experiencia del usuario</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Cumplir con obligaciones legales y regulatorias</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Prevenir fraudes y garantizar la seguridad de nuestros servicios</span>
          </li>
        </ul>
      </LegalSection>

      <!-- 5. Base legal -->
      <LegalSection
        id="base-legal"
        title="5. Base legal"
        icon="heroicons:scale"
      >
        <p class="mb-4">
          El tratamiento de tus datos personales se realiza conforme a la <strong>Ley 1581 de 2012</strong>
          (Ley de Proteccion de Datos Personales de Colombia) y sus decretos reglamentarios.
        </p>

        <p class="mb-4">La base legal para el tratamiento incluye:</p>

        <div class="space-y-3">
          <div class="border-l-4 border-primary pl-4">
            <p class="font-semibold text-gray-900 mb-1">Tu consentimiento</p>
            <p class="text-sm">Cuando nos autorizas expresamente el tratamiento de tus datos.</p>
          </div>

          <div class="border-l-4 border-primary pl-4">
            <p class="font-semibold text-gray-900 mb-1">Ejecucion de un contrato</p>
            <p class="text-sm">Para prestarte los servicios que solicitas.</p>
          </div>

          <div class="border-l-4 border-primary pl-4">
            <p class="font-semibold text-gray-900 mb-1">Obligacion legal</p>
            <p class="text-sm">Para cumplir con requerimientos de autoridades competentes.</p>
          </div>

          <div class="border-l-4 border-primary pl-4">
            <p class="font-semibold text-gray-900 mb-1">Interes legitimo</p>
            <p class="text-sm">Para mejorar nuestros servicios y prevenir fraudes.</p>
          </div>
        </div>
      </LegalSection>

      <!-- 6. Tus derechos -->
      <LegalSection
        id="tus-derechos"
        title="6. Tus derechos"
        icon="heroicons:shield-check"
      >
        <p class="mb-4">Como titular de los datos personales, tienes derecho a:</p>

        <div class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="font-semibold text-gray-900 mb-1">Conocer</p>
            <p class="text-sm">Acceder a tus datos personales que tengamos almacenados.</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="font-semibold text-gray-900 mb-1">Actualizar</p>
            <p class="text-sm">Solicitar la correccion de datos inexactos o desactualizados.</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="font-semibold text-gray-900 mb-1">Rectificar</p>
            <p class="text-sm">Modificar informacion incorrecta o incompleta.</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="font-semibold text-gray-900 mb-1">Suprimir</p>
            <p class="text-sm">Solicitar la eliminacion de tus datos cuando no sean necesarios.</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="font-semibold text-gray-900 mb-1">Revocar</p>
            <p class="text-sm">Retirar tu consentimiento para el tratamiento de datos.</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="font-semibold text-gray-900 mb-1">Oponerte</p>
            <p class="text-sm">Al uso de tus datos para fines especificos.</p>
          </div>
        </div>

        <div class="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p class="text-sm text-blue-800">
            Para ejercer estos derechos, puedes contactarnos en
            <a href="mailto:gerenciacomercial@contuhogar.com" class="font-semibold underline hover:text-blue-600">gerenciacomercial@contuhogar.com</a>
          </p>
        </div>
      </LegalSection>

      <!-- 7. Comparticion de datos -->
      <LegalSection
        id="comparticion"
        title="7. Comparticion de datos"
        icon="heroicons:globe-alt"
      >
        <p class="mb-4">Podemos compartir tus datos personales con:</p>

        <div class="space-y-4">
          <div class="border-l-4 border-secondary pl-4">
            <p class="font-semibold text-gray-900 mb-1">Entidades financieras</p>
            <p class="text-sm">Bancos aliados para la gestión de tu crédito (BBVA, Banco de Bogotá, Banco de Occidente, Banco Unión).</p>
          </div>

          <div class="border-l-4 border-secondary pl-4">
            <p class="font-semibold text-gray-900 mb-1">Proveedores de servicios</p>
            <p class="text-sm">Empresas que nos ayudan a operar nuestro negocio.</p>
          </div>

          <div class="border-l-4 border-secondary pl-4">
            <p class="font-semibold text-gray-900 mb-1">Autoridades</p>
            <p class="text-sm">Cuando sea requerido por ley o proceso judicial.</p>
          </div>
        </div>

        <div class="mt-6 bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-700 font-medium">
            No vendemos ni alquilamos tus datos personales a terceros para fines de marketing.
          </p>
        </div>
      </LegalSection>

      <!-- 8. Seguridad -->
      <LegalSection
        id="seguridad"
        title="8. Seguridad de los datos"
        icon="heroicons:lock-closed"
      >
        <p class="mb-4">
          Implementamos medidas de seguridad tecnicas, administrativas y fisicas para proteger
          tus datos personales contra acceso no autorizado, perdida, alteracion o divulgacion.
        </p>

        <p class="mb-4">Estas medidas incluyen:</p>

        <ul class="space-y-2">
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></span>
            <span>Encriptacion de datos en transito (SSL/TLS)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></span>
            <span>Control de acceso basado en roles</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></span>
            <span>Monitoreo de seguridad continuo</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></span>
            <span>Capacitacion al personal sobre proteccion de datos</span>
          </li>
        </ul>
      </LegalSection>

      <!-- 9. Cookies -->
      <LegalSection
        id="cookies"
        title="9. Cookies y tecnologias similares"
        icon="heroicons:finger-print"
      >
        <p class="mb-4">
          Nuestro sitio web utiliza cookies y tecnologias similares para mejorar tu experiencia.
          Las cookies nos permiten:
        </p>

        <ul class="space-y-2 mb-6">
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
            <span>Recordar tus preferencias</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
            <span>Analizar el uso del sitio web</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
            <span>Personalizar el contenido que te mostramos</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
            <span>Medir la efectividad de nuestras campanas</span>
          </li>
        </ul>

        <p class="text-sm text-gray-500">
          Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar
          algunas funcionalidades del sitio.
        </p>
      </LegalSection>

      <!-- 10. Retencion de datos -->
      <LegalSection
        id="retencion"
        title="10. Retencion de datos"
        icon="heroicons:clock"
      >
        <p class="mb-4">
          Conservamos tus datos personales durante el tiempo necesario para cumplir con las
          finalidades descritas en esta politica, o segun lo requieran las obligaciones legales aplicables.
        </p>

        <div class="bg-orange-50 border border-orange-100 rounded-lg p-4">
          <p class="text-sm text-orange-800">
            <strong>Periodo de retencion:</strong> Generalmente conservamos los datos de clientes durante
            10 anos despues de finalizada la relacion comercial, conforme a la normativa colombiana.
          </p>
        </div>
      </LegalSection>

      <!-- 11. Transferencias internacionales -->
      <LegalSection
        id="transferencias"
        title="11. Transferencias internacionales"
        icon="heroicons:globe-alt"
      >
        <p class="mb-4">
          Dado que atendemos a colombianos en el exterior, algunos de tus datos pueden ser
          procesados fuera de Colombia.
        </p>

        <p>
          En estos casos, nos aseguramos de que existan garantias adecuadas para la proteccion
          de tus datos, conforme a la legislacion aplicable.
        </p>
      </LegalSection>

      <!-- 12. Cambios a esta politica -->
      <LegalSection
        id="cambios"
        title="12. Cambios a esta politica"
        icon="heroicons:document-text"
      >
        <p class="mb-4">
          Podemos actualizar esta Politica de Privacidad ocasionalmente.
        </p>

        <p class="mb-4">
          Te notificaremos sobre cambios significativos a traves de nuestro sitio web o por correo electronico.
        </p>

        <p class="text-sm text-gray-500">
          Te recomendamos revisar esta pagina periodicamente para estar informado sobre como
          protegemos tus datos.
        </p>
      </LegalSection>

      <!-- 13. Contacto -->
      <LegalSection
        id="contacto"
        title="13. Contacto"
        icon="heroicons:envelope"
      >
        <p class="mb-4">
          Si tienes preguntas sobre esta Politica de Privacidad o sobre el tratamiento de tus
          datos personales, puedes contactarnos:
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
      </LegalSection>

      <!-- Link a Terminos y Condiciones -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <p class="text-gray-500">
          Para mas informacion sobre nuestras politicas de tratamiento de datos, consulta tambien nuestros
          <NuxtLink to="/terminos-condiciones" class="text-primary hover:text-secondary font-medium underline">
            Terminos y Condiciones
          </NuxtLink>.
        </p>
      </div>
    </LegalPageLayout>
  </div>
</template>
