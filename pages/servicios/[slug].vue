<script setup lang="ts">
const { isLoading } = useLoading(150)
const store = useMainStore();
const route = useRoute();
const router = useRouter();

const currentService = computed(() => {
  const service = store.services.filter(x => x.slug === route.params.slug)
  return service?.[0]
})

// SEO optimizado con datos del servicio
watchEffect(() => {
  if (currentService.value) {
    useSeo({
      title: currentService.value.title,
      description: currentService.value.description,
      image: `https://contuhogar.com${currentService.value.image}`,
      type: 'website'
    })

    // Breadcrumb para mejor SEO
    useBreadcrumbSchema([
      { name: 'Inicio', url: 'https://contuhogar.com' },
      { name: 'Servicios', url: 'https://contuhogar.com/servicios' },
      { name: currentService.value.title, url: `https://contuhogar.com/servicios/${currentService.value.slug}` }
    ])

    // Service schema para producto financiero
    useServiceSchema({
      name: currentService.value.title,
      description: currentService.value.description,
      url: `https://contuhogar.com/servicios/${currentService.value.slug}`,
      category: 'Crédito de Vivienda',
      image: `https://contuhogar.com${currentService.value.image}`
    })
  }
})

// Función para obtener contenido dinámico según el servicio
function getServiceContent(slug) {
  const commonDocuments = {
    title: 'Documentos requeridos',
    icon: 'document',
    content: `<p class="mb-6">Para solicitar este servicio, necesitarás preparar la siguiente documentación:</p>
    <ul class="list-disc list-inside space-y-2">
      <li>Certificación laboral vigente (no mayor a 90 días).</li>
      <li>Comprobantes de pago de nómina de los últimos tres (3) meses.</li>
      <li>Extractos bancarios de los últimos tres (3) meses donde recibes tu salario.</li>
      <li>Declaración de renta del año fiscal anterior y/o certificado de ingresos y retenciones.</li>
      <li>Reporte de crédito vigente con buen historial de pago (no mayor a 30 días).</li>
      <li>Copia ampliada de la cédula colombiana al 150%.</li>
      <li>Copia del documento migratorio vigente: residencia, visa de trabajo o ciudadanía.</li>
      <li>Soportes de ingresos adicionales: pensión, arriendos, honorarios, etc. (si aplica).</li>
    </ul>
    <p class="mt-6 font-semibold text-lg">Formatos bancarios para descargar:</p>
    <p class="mt-4 text-sm text-gray-600">Una vez inicies tu proceso, te compartiremos los formatos específicos del banco con el que trabajaremos tu solicitud.</p>`
  }

  const contentByService = {
    'credito-hipotecario': [
      {
        title: 'Características del crédito',
        icon: 'clipboard',
        content: `<p class="mb-4">El crédito hipotecario es la opción más tradicional y segura para adquirir vivienda en Colombia desde el exterior. Te conviertes en propietario desde el primer día.</p>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Plazo:</strong> entre 5 y 20 años, adaptándose a tu capacidad de pago.</li>
          <li><strong>Tasa de interés:</strong> competitiva, fija en pesos colombianos durante toda la vida del crédito.</li>
          <li><strong>Financiación:</strong> hasta el 70% del valor comercial del inmueble. Si tienes un requerimiento de mayor porcentaje, pregúntanos cómo.</li>
          <li><strong>Cuota inicial:</strong> desde el 30% del valor del inmueble.</li>
          <li><strong>Vigencia de la aprobación:</strong> 6 meses para que encuentres el inmueble perfecto.</li>
          <li><strong>Montos:</strong> sin límite máximo, sujeto a tu capacidad de pago y avalúo del inmueble.</li>
        </ul>
        <p class="mt-4"><strong>Importante:</strong> ContuHogar te acompaña en todo el proceso de legalización, elaboración de poderes y hasta el desembolso del crédito.</p>`
      },
      {
        title: '¿A quién va dirigido el crédito?',
        icon: 'users',
        content: `<p class="mb-4">Este producto financiero está especialmente diseñado para:</p>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Colombianos residentes en el exterior</strong> que desean comprar vivienda nueva o usada en zonas urbanas de Colombia.</li>
          <li><strong>Profesionales con estabilidad laboral</strong> que lleven al menos 1-2 años trabajando en el exterior.</li>
          <li><strong>Personas entre 18 y 74 años</strong> con capacidad de pago demostrable.</li>
          <li><strong>Extranjeros casados con colombianos</strong> que puedan consolidar ingresos mediante unión marital comprobable.</li>
          <li><strong>Inversores que buscan patrimonio</strong> en Colombia sin afectar su cupo crediticio en el país de residencia.</li>
        </ul>
        <p class="mt-4 text-sm text-gray-600"><em>Nota: Este crédito no aplica para compra de locales comerciales, lotes sin construir, fincas rurales o proyectos de construcción.</em></p>`
      },
      {
        title: 'Beneficios exclusivos',
        icon: 'sparkles',
        content: `<ul class="list-disc list-inside space-y-2">
          <li><strong>Eres propietario desde el día uno:</strong> el inmueble queda a tu nombre con garantía hipotecaria que se levanta al pagar.</li>
          <li><strong>Cuota fija en pesos:</strong> te proteges de la volatilidad del peso colombiano, ideal si tus ingresos son en moneda extranjera.</li>
          <li><strong>Preaprobación sin inmueble definido:</strong> asegura tu cupo y negocia con respaldo financiero.</li>
          <li><strong>Flexibilidad de pago:</strong> realiza abonos anticipados sin penalización y reduce el plazo de tu crédito.</li>
          <li><strong>No afecta tu historial en el exterior:</strong> el crédito solo reporta en Colombia bajo la Ley 546 de 1999.</li>
          <li><strong>Múltiples créditos posibles:</strong> adquiere una o más propiedades según tu capacidad de pago.</li>
          <li><strong>Cuenta de ahorros incluida:</strong> para el desembolso y manejo de tu crédito.</li>
          <li><strong>Acompañamiento integral:</strong> desde la solicitud hasta el desembolso y posventa.</li>
        </ul>`
      },
      {
        title: 'Requisitos y condiciones',
        icon: 'check',
        content: `<p class="mb-4">Para acceder a este crédito hipotecario, debes cumplir con:</p>
        <h4 class="font-semibold text-lg mb-3">Estatus migratorio y laboral</h4>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Estatus migratorio legal y vigente (residencia permanente, visa de trabajo o naturalización).</li>
          <li>Mínimo 1-2 años de antigüedad laboral en tu empleo actual.</li>
          <li>Ingresos demostrables y estables mediante certificaciones y comprobantes de pago.</li>
        </ul>
        <h4 class="font-semibold text-lg mb-3">Perfil crediticio</h4>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Sin reportes negativos vigentes en centrales de riesgo de Colombia.</li>
          <li>Buen comportamiento crediticio en el país de residencia.</li>
          <li>Capacidad de pago que permita cumplir con la cuota mensual.</li>
        </ul>
        <h4 class="font-semibold text-lg mb-3">Apoyo adicional</h4>
        <ul class="list-disc list-inside space-y-2">
          <li>Posibilidad de consolidar ingresos con un co-deudor en Colombia o en el exterior.</li>
          <li>Apoderado de confianza en Colombia para trámites legales y notariales.</li>
        </ul>`
      },
      commonDocuments
    ],
    'leasing-habitacional': [
      {
        title: 'Características del leasing',
        icon: 'clipboard',
        content: `<p class="mb-4">El leasing habitacional combina lo mejor del arriendo y la compra: vives en tu vivienda desde el primer día y al final del contrato la adquieres a un precio preferencial.</p>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Plazo:</strong> entre 5 y 20 años de contrato de arrendamiento financiero.</li>
          <li><strong>Cuota inicial más baja:</strong> desde 15% del valor del inmueble (vs. 30% del crédito hipotecario).</li>
          <li><strong>Financiación:</strong> hasta el 80% del valor comercial del inmueble. Si tienes un requerimiento de mayor porcentaje, pregúntanos cómo.</li>
          <li><strong>Opción de compra:</strong> al finalizar el contrato, ejerces tu derecho de compra por un valor residual bajo (típicamente 1-5%).</li>
          <li><strong>Beneficios tributarios:</strong> deducciones fiscales en Colombia durante la vigencia del contrato.</li>
          <li><strong>Vigencia de aprobación:</strong> 6 meses para definir tu inmueble ideal.</li>
        </ul>
        <p class="mt-4"><strong>¿Cómo funciona?</strong> durante el contrato, el banco es el propietario legal y tú eres el locatario. Al cumplir con los pagos y ejercer la opción de compra, la propiedad pasa a tu nombre.</p>`
      },
      {
        title: '¿Para quién es ideal el leasing?',
        icon: 'users',
        content: `<p class="mb-4">El leasing habitacional es perfecto para:</p>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Profesionales con menor capital inicial</strong> que prefieren una cuota de entrada más accesible.</li>
          <li><strong>Colombianos en el exterior con ingresos altos</strong> que buscan beneficios tributarios en Colombia.</li>
          <li><strong>Inversionistas estratégicos</strong> que valoran la flexibilidad financiera y los beneficios fiscales.</li>
          <li><strong>Personas entre 18 y 74 años</strong> con capacidad de pago verificable.</li>
          <li><strong>Parejas binacionales</strong> (colombiano-extranjero) que pueden consolidar ingresos.</li>
          <li><strong>Quienes buscan proteger capital</strong> mientras construyen patrimonio en Colombia.</li>
        </ul>
        <p class="mt-4 text-sm text-gray-600"><em>Ideal si tienes excelente capacidad de pago pero prefieres conservar liquidez para otras inversiones.</em></p>`
      },
      {
        title: 'Ventajas del leasing habitacional',
        icon: 'sparkles',
        content: `<ul class="list-disc list-inside space-y-2">
          <li><strong>Menor cuota inicial:</strong> requiere menos capital de entrada comparado con el crédito hipotecario tradicional.</li>
          <li><strong>Beneficios tributarios:</strong> deduce un porcentaje de tus cuotas mensuales en tu declaración de renta colombiana.</li>
          <li><strong>Vives tu vivienda desde el inicio:</strong> no esperas a ser dueño para habitarla.</li>
          <li><strong>Opción de compra al final:</strong> decides si ejerces tu derecho a comprar a un valor preferencial (típicamente 1-5% del valor inicial).</li>
          <li><strong>Cuotas fijas en pesos:</strong> certeza financiera durante toda la vigencia del contrato.</li>
          <li><strong>Prepagos sin penalización:</strong> acelera tu plan de adquisición cuando quieras.</li>
          <li><strong>Historial crediticio independiente:</strong> no afecta tu cupo en el país donde resides.</li>
          <li><strong>Asesoría personalizada:</strong> te acompañamos en cada etapa del proceso.</li>
        </ul>`
      },
      {
        title: 'Requisitos y condiciones',
        icon: 'check',
        content: `<p class="mb-4">Para acceder al leasing habitacional necesitas:</p>
        <h4 class="font-semibold text-lg mb-3">Perfil migratorio y laboral</h4>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Estatus migratorio definido y documentado (residencia, visa de trabajo o naturalización).</li>
          <li>Antigüedad laboral mínima de 1-2 años en tu empleo actual.</li>
          <li>Ingresos regulares y demostrables mediante certificaciones oficiales.</li>
          <li>Capacidad de pago suficiente para cubrir la cuota mensual del leasing.</li>
        </ul>
        <h4 class="font-semibold text-lg mb-3">Historial financiero</h4>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Sin reportes negativos activos en centrales de riesgo colombianas.</li>
          <li>Buen comportamiento crediticio verificable en el país de residencia.</li>
          <li>Capacidad de ahorro demostrada para la cuota inicial.</li>
        </ul>
        <h4 class="font-semibold text-lg mb-3">Apoyo y representación</h4>
        <ul class="list-disc list-inside space-y-2">
          <li>Opción de sumar ingresos con co-deudor (en Colombia o exterior).</li>
          <li>Apoderado confiable en Colombia para firma de documentos y escrituración.</li>
        </ul>`
      },
      commonDocuments
    ],
    'credito-de-remodelacion': [
      {
        title: 'Características del crédito',
        icon: 'clipboard',
        content: `<p class="mb-4">El crédito de remodelación con garantía hipotecaria te permite transformar tu vivienda en Colombia sin afectar tus ahorros, con condiciones mucho más favorables que un crédito de libre inversión.</p>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Plazo:</strong> hasta 15 años para pagar tu remodelación.</li>
          <li><strong>Tasa preferencial:</strong> mucho más baja que un crédito de consumo gracias a la garantía hipotecaria.</li>
          <li><strong>Financiación:</strong> hasta el 70% del valor comercial actual de tu inmueble. Si tienes un requerimiento de mayor porcentaje, pregúntanos cómo.</li>
          <li><strong>Flexibilidad:</strong> funciona incluso si tu vivienda ya tiene hipoteca vigente.</li>
          <li><strong>Uso del dinero:</strong> remodelaciones, ampliaciones, mejoras estructurales, acabados, etc.</li>
          <li><strong>Cuota fija:</strong> en pesos colombianos durante toda la vida del crédito.</li>
        </ul>
        <p class="mt-4"><strong>Casos de uso:</strong> ampliar habitaciones, renovar cocina/baños, mejorar fachada, instalar pisos, cambiar ventanas, actualizar instalaciones eléctricas o de plomería.</p>`
      },
      {
        title: '¿Para quién es este crédito?',
        icon: 'users',
        content: `<p class="mb-4">Este crédito de remodelación es ideal para:</p>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Propietarios de vivienda en Colombia</strong> que desean mejorar o ampliar su inmueble.</li>
          <li><strong>Colombianos en el exterior</strong> que tienen casa propia en Colombia (libre de hipoteca o con saldo por pagar).</li>
          <li><strong>Inversionistas que buscan valorizar</strong> su propiedad antes de vender o arrendar.</li>
          <li><strong>Familias que necesitan adaptar espacios</strong> para nuevos integrantes o para padres mayores.</li>
          <li><strong>Personas entre 18 y 74 años</strong> con capacidad de pago demostrable.</li>
          <li><strong>Quienes prefieren no tocar sus ahorros</strong> y financiar las mejoras a largo plazo con cuotas cómodas.</li>
        </ul>
        <p class="mt-4 text-sm text-gray-600"><em>Ideal para aumentar el valor de tu patrimonio mientras mejoras la calidad de vida de tu familia en Colombia.</em></p>`
      },
      {
        title: 'Beneficios de remodelar con crédito',
        icon: 'sparkles',
        content: `<ul class="list-disc list-inside space-y-2">
          <li><strong>Tasa de interés preferencial:</strong> mucho menor que créditos de consumo o tarjetas de crédito.</li>
          <li><strong>Plazos cómodos:</strong> hasta 15 años para pagar, con cuotas que se ajustan a tu presupuesto.</li>
          <li><strong>Conservas tu liquidez:</strong> no gastas tus ahorros de golpe, mantienes tu fondo de emergencias intacto.</li>
          <li><strong>Incremento del valor de tu inmueble:</strong> las remodelaciones bien hechas aumentan significativamente el valor comercial.</li>
          <li><strong>Cuota fija en pesos:</strong> estabilidad financiera durante toda la vigencia del crédito.</li>
          <li><strong>Prepagos sin penalización:</strong> paga más cuando puedas, sin costos adicionales.</li>
          <li><strong>Funciona con hipoteca vigente:</strong> no necesitas tener tu casa libre de deudas.</li>
          <li><strong>No afecta crédito en el exterior:</strong> solo se reporta en Colombia.</li>
          <li><strong>Asesoría profesional incluida:</strong> te acompañamos en todo el proceso de solicitud y desembolso.</li>
        </ul>`
      },
      {
        title: 'Requisitos y condiciones',
        icon: 'check',
        content: `<p class="mb-4">Para acceder al crédito de remodelación necesitas:</p>
        <h4 class="font-semibold text-lg mb-3">Sobre la propiedad</h4>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Ser propietario de una vivienda en zona urbana de Colombia.</li>
          <li>La propiedad puede estar libre de gravámenes o tener hipoteca vigente.</li>
          <li>El inmueble debe tener un valor comercial que permita el porcentaje de financiación solicitado.</li>
        </ul>
        <h4 class="font-semibold text-lg mb-3">Perfil del solicitante</h4>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Estatus migratorio legal y vigente si resides en el exterior.</li>
          <li>Antigüedad laboral mínima de 1-2 años.</li>
          <li>Ingresos estables y demostrables.</li>
          <li>Capacidad de pago para la nueva cuota (o cuota adicional si ya tienes hipoteca).</li>
        </ul>
        <h4 class="font-semibold text-lg mb-3">Historial crediticio</h4>
        <ul class="list-disc list-inside space-y-2">
          <li>Sin reportes negativos en Colombia.</li>
          <li>Buen comportamiento en obligaciones financieras actuales.</li>
          <li>Apoderado en Colombia para firmas y trámites notariales.</li>
        </ul>`
      },
      commonDocuments
    ],
    'compra-de-cartera': [
      {
        title: 'Características de la compra de cartera',
        icon: 'clipboard',
        content: `<p class="mb-4">La compra de cartera te permite trasladar tu crédito hipotecario actual a un banco con mejores condiciones, reduciendo tu cuota mensual y mejorando tu flujo de caja.</p>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Reducción de cuota:</strong> la reducción en tu cuota mensual depende de la tasa de interés vigente. <a href="/contacto" class="text-primary hover:underline font-medium">Contáctanos</a> para conocer las condiciones actuales.</li>
          <li><strong>Tasas más competitivas:</strong> aprovecha las mejores tasas del mercado actual.</li>
          <li><strong>Sin penalizaciones:</strong> la Ley 546 de 1999 te permite cambiar de banco en cualquier momento.</li>
          <li><strong>Plazo flexible:</strong> puedes mantener el plazo original o extenderlo para reducir aún más la cuota.</li>
          <li><strong>Misma garantía:</strong> se mantiene la hipoteca sobre tu inmueble, solo cambia la entidad financiera.</li>
          <li><strong>Proceso ágil:</strong> en promedio toma 30-45 días completar el traslado.</li>
        </ul>
        <p class="mt-4"><strong>¿Cuándo tiene sentido?</strong> si las tasas actuales son al menos 1-2 puntos porcentuales más bajas que tu tasa actual, o si tus ingresos han mejorado y calificas para mejores condiciones.</p>`
      },
      {
        title: '¿Para quién es este servicio?',
        icon: 'users',
        content: `<p class="mb-4">La compra de cartera es perfecta para:</p>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Propietarios con hipoteca vigente</strong> que pagan tasas de interés altas.</li>
          <li><strong>Colombianos en el exterior</strong> cuyos ingresos han mejorado desde que adquirieron su crédito original.</li>
          <li><strong>Personas que buscan alivio financiero</strong> reduciendo su cuota mensual significativamente.</li>
          <li><strong>Deudores hipotecarios que quieren mejor servicio</strong> de su entidad financiera.</li>
          <li><strong>Quienes están al día con sus pagos</strong> y tienen buen historial crediticio.</li>
          <li><strong>Propietarios estratégicos</strong> que monitorean el mercado financiero para optimizar costos.</li>
        </ul>
        <p class="mt-4 text-sm text-gray-600"><em>¿No sabes si te conviene? Realiza una proyección gratuita con nosotros y compara tu cuota actual vs. la nueva cuota.</em></p>`
      },
      {
        title: 'Beneficios de comprar tu cartera',
        icon: 'sparkles',
        content: `<ul class="list-disc list-inside space-y-2">
          <li><strong>Ahorro inmediato:</strong> reduce tu cuota mensual desde el primer pago en el nuevo banco.</li>
          <li><strong>Tasa de interés más baja:</strong> accede a las tasas competitivas actuales del mercado.</li>
          <li><strong>Mejor flujo de caja:</strong> libera dinero mensual para otras necesidades o inversiones.</li>
          <li><strong>Derecho legal:</strong> la Ley 546 de 1999 protege tu derecho a cambiar de banco cuando quieras.</li>
          <li><strong>Sin penalidades:</strong> no pagas multas por cancelar anticipadamente con tu banco actual.</li>
          <li><strong>Posible ampliación del plazo:</strong> extiende el tiempo de pago si necesitas reducir aún más la cuota.</li>
          <li><strong>Mejora tu perfil crediticio:</strong> menor endeudamiento mensual mejora tu capacidad de pago para futuros créditos.</li>
          <li><strong>Proyección gratuita:</strong> calculamos tu nueva cuota antes de comprometerte.</li>
          <li><strong>Gestión completa:</strong> nos encargamos de todo el papeleo entre bancos.</li>
        </ul>`
      },
      {
        title: 'Requisitos y proceso',
        icon: 'check',
        content: `<p class="mb-4">Para trasladar tu crédito hipotecario a mejores condiciones necesitas:</p>
        <h4 class="font-semibold text-lg mb-3">Condiciones del crédito actual</h4>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Tener un crédito hipotecario vigente en Colombia.</li>
          <li>Estar al día en tus pagos (sin cuotas en mora).</li>
          <li>Que la tasa del nuevo banco sea al menos 1% más baja que tu tasa actual.</li>
        </ul>
        <h4 class="font-semibold text-lg mb-3">Perfil del solicitante</h4>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Buen historial de pagos en tu crédito actual (mínimo 6-12 meses).</li>
          <li>Sin reportes negativos en centrales de riesgo.</li>
          <li>Ingresos estables y demostrables.</li>
          <li>Capacidad de pago para la nueva cuota.</li>
        </ul>
        <h4 class="font-semibold text-lg mb-3">El proceso</h4>
        <ol class="list-decimal list-inside space-y-2">
          <li><strong>Proyección gratuita:</strong> calculamos tu nueva cuota y el ahorro mensual.</li>
          <li><strong>Solicitud:</strong> presentamos tu caso al nuevo banco.</li>
          <li><strong>Aprobación:</strong> el banco estudia y aprueba las nuevas condiciones.</li>
          <li><strong>Traslado:</strong> se cancela el crédito anterior y se abre el nuevo.</li>
          <li><strong>Ahorro:</strong> comienzas a pagar menos desde el siguiente mes.</li>
        </ol>`
      },
      commonDocuments
    ],
    'conturenta': [
      {
        title: 'Sobre el servicio ConTuRenta',
        icon: 'clipboard',
        content: `<p class="mb-4">ConTuRenta es tu aliado para cumplir con tus obligaciones tributarias en Colombia, sin importar dónde vivas. Te ayudamos a determinar si estás obligado a declarar renta y te conectamos con expertos contables certificados.</p>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Evaluación inicial gratuita:</strong> determinamos si estás o no obligado a declarar renta en Colombia.</li>
          <li><strong>Conexión con expertos:</strong> te ponemos en contacto con contadores certificados especializados en tributación internacional.</li>
          <li><strong>Declaración completa:</strong> preparación y presentación de tu declaración de renta según normativa colombiana vigente.</li>
          <li><strong>Asesoría integral:</strong> te explicamos tus obligaciones tributarias de forma clara y sencilla.</li>
          <li><strong>Atención desde el exterior:</strong> todo el proceso se hace online, sin necesidad de viajar a Colombia.</li>
          <li><strong>Seguimiento completo:</strong> hasta la confirmación de tu declaración ante la DIAN.</li>
        </ul>
        <p class="mt-4"><strong>¿Por qué es importante?</strong> declarar renta correctamente te permite solicitar créditos hipotecarios, evita sanciones de la DIAN y mantiene tu historial financiero limpio en Colombia.</p>`
      },
      {
        title: '¿Quién debe declarar renta en Colombia?',
        icon: 'users',
        content: `<p class="mb-4">Este servicio es especialmente importante si:</p>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Eres colombiano en el exterior</strong> y conservas ingresos o activos en Colombia.</li>
          <li><strong>Tienes propiedades en arriendo</strong> en Colombia que generan ingresos.</li>
          <li><strong>Realizaste ventas de activos</strong> (inmuebles, vehículos, acciones) en Colombia.</li>
          <li><strong>Tienes inversiones en Colombia</strong> que generan rendimientos financieros.</li>
          <li><strong>Cumples con topes de ingresos, patrimonio o consumos</strong> establecidos por la DIAN.</li>
          <li><strong>Planeas solicitar un crédito hipotecario</strong> en Colombia (la declaración de renta es un requisito).</li>
          <li><strong>Quieres regularizar tu situación tributaria</strong> antes de regresar a Colombia.</li>
        </ul>
        <p class="mt-4 text-sm text-gray-600"><em>No estés seguro si debes declarar? Contáctanos para una evaluación gratuita de tu caso particular.</em></p>`
      },
      {
        title: 'Beneficios de declarar con ConTuRenta',
        icon: 'sparkles',
        content: `<ul class="list-disc list-inside space-y-2">
          <li><strong>Cumplimiento legal:</strong> evita sanciones, multas e intereses moratorios de la DIAN.</li>
          <li><strong>Requisito para créditos:</strong> la declaración de renta es obligatoria para solicitar créditos hipotecarios en Colombia.</li>
          <li><strong>Historial financiero limpio:</strong> mantén tu perfil crediticio en óptimas condiciones.</li>
          <li><strong>Asesoría especializada:</strong> contadores expertos en tributación internacional y residentes en el exterior.</li>
          <li><strong>Proceso 100 % digital:</strong> todo se hace online, sin necesidad de viajar a Colombia.</li>
          <li><strong>Máximas deducciones:</strong> aprovechamos todas las deducciones y beneficios a los que tienes derecho.</li>
          <li><strong>Tranquilidad:</strong> duerme tranquilo sabiendo que cumples con tus obligaciones tributarias.</li>
          <li><strong>Ahorro de tiempo:</strong> nos encargamos de todo el papeleo y trámites ante la DIAN.</li>
          <li><strong>Precios transparentes:</strong> costos claros sin sorpresas.</li>
        </ul>`
      },
      {
        title: 'Proceso y documentación',
        icon: 'check',
        content: `<h4 class="font-semibold text-lg mb-3">¿Cómo funciona el proceso?</h4>
        <ol class="list-decimal list-inside space-y-2 mb-6">
          <li><strong>Evaluación inicial:</strong> revisamos tu caso y determinamos si estás obligado a declarar.</li>
          <li><strong>Cotización:</strong> te informamos el costo del servicio según la complejidad de tu declaración.</li>
          <li><strong>Recolección de documentos:</strong> te indicamos qué documentos necesitamos.</li>
          <li><strong>Preparación:</strong> nuestros contadores elaboran tu declaración de renta.</li>
          <li><strong>Revisión:</strong> te mostramos la declaración antes de presentarla para tu aprobación.</li>
          <li><strong>Presentación:</strong> radicamos ante la DIAN en las fechas establecidas.</li>
          <li><strong>Seguimiento:</strong> te entregamos copia de la declaración y soportes.</li>
        </ol>
        <h4 class="font-semibold text-lg mb-3">Documentos generalmente requeridos</h4>
        <ul class="list-disc list-inside space-y-2">
          <li>Cédula de ciudadanía colombiana.</li>
          <li>Certificados de ingresos del año fiscal a declarar.</li>
          <li>Certificados bancarios (cuentas de ahorro, CDTs, inversiones).</li>
          <li>Certificados de aportes a pensión y salud.</li>
          <li>Soportes de propiedades en Colombia (certificados de tradición, impuesto predial).</li>
          <li>Contratos de arrendamiento si tienes inmuebles en arriendo.</li>
          <li>Facturas de compra/venta de activos si aplica.</li>
          <li>Declaración del año anterior (si aplica).</li>
        </ul>
        <p class="mt-4 text-sm text-gray-600"><em>Nota: Los documentos específicos varían según tu situación particular. Te indicaremos exactamente qué necesitas después de la evaluación inicial.</em></p>`
      }
    ]
  }

  return contentByService[slug] || contentByService['credito-hipotecario']
}

// Obtener contenido dinámico según el servicio
const accordionItems = computed(() => {
  if (!currentService.value) return []
  return getServiceContent(currentService.value.slug)
})

// Genera el título de la sección "¿Qué es...?" con el artículo correcto (RAE)
const whatIsTitle = computed(() => {
  if (!currentService.value) return '¿Qué es?'
  // Mapeo directo del título formateado según RAE (minúsculas después de artículo)
  const titles = {
    'credito-hipotecario': '¿Qué es un crédito hipotecario?',
    'leasing-habitacional': '¿Qué es el leasing habitacional?',
    'credito-de-remodelacion': '¿Qué es un crédito de remodelación?',
    'compra-de-cartera': '¿Qué es la compra de cartera?',
    'conturenta': '¿Qué es ConTuRenta?'
  }
  return titles[currentService.value.slug] ?? '¿Qué es?'
})

// Anchor navigation state
const activeSection = ref(0)
const accordionRef = ref()

const scrollToSection = (index: number) => {
  activeSection.value = index
  // Abrir la sección en el acordeón si no está abierta
  if (accordionRef.value && !accordionRef.value.isOpen(index)) {
    accordionRef.value.toggleSection(index)
  }
  nextTick(() => {
    const accordionContainer = document.querySelector('.accordion-container')
    if (accordionContainer) {
      const items = accordionContainer.querySelectorAll(':scope > div > div')
      const target = items[index]
      if (target) {
        const offset = 140
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  })
}

// Recursos útiles para sidebar
const usefulResources = [
  { label: 'Simulador de crédito', to: '/simulador/credito' },
  { label: 'Preguntas frecuentes', to: '/faqs' },
  { label: 'Blog', to: '/blog' }
]

// Feature flag: landing page links (solo desarrollo)
const config = useRuntimeConfig()
const enableLandingLinks = config.public.ENABLE_LANDING_LINKS

// Fetch landing pages para este servicio (solo si feature flag activo)
const landingPages = ref<LandingPage[] | null>(null)
if (enableLandingLinks) {
  const { data } = await useDirectusItems<LandingPage>('landing_pages', {
    filter: {
      service_slug: { _eq: route.params.slug as string },
      status: { _eq: 'published' }
    }
  })
  landingPages.value = data.value
}

// Helper para convertir country_code (ISO 3166-1 alpha-2) a emoji de bandera
const countryFlag = (code: string) => {
  if (!code) return ''
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 127397 + c.charCodeAt(0)))
}

// Handler para solicitar servicio - guarda datos en store y navega a contacto
const handleSolicitarServicio = () => {
  if (!currentService.value) return

  store.setContactPrefill({
    source: 'servicio',
    servicioSlug: currentService.value.slug,
    servicioNombre: currentService.value.title
  })

  router.push('/contacto')
}
</script>

<template>
  <div>
    <!-- Skeleton durante carga -->
    <SkeletonServicePage v-if="isLoading" />

    <!-- Contenido real -->
    <template v-else-if="currentService">
    <!-- Hero del servicio -->
    <HeroSection
      badge="Servicios financieros"
      badge-icon
      :title="currentService.title"
      :subtitle="currentService.intro"
    />

    <!-- Anchor navigation -->
    <nav class="sticky top-[73px] z-30 bg-white border-b border-gray-200 shadow-sm">
      <div class="mx-auto container px-6 lg:px-8">
        <div class="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          <button
            v-for="(item, index) in accordionItems"
            :key="index"
            @click="scrollToSection(index)"
            class="shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
            :class="[
              activeSection === index
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            ]"
          >
            {{ item.title }}
          </button>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <div class="bg-muted">
      <div class="mx-auto container px-6 lg:px-8 py-16">
        <div class="lg:grid lg:grid-cols-12 lg:gap-12">

          <!-- Columna izquierda: Contenido del servicio -->
          <article class="lg:col-span-8">
            <!-- Imagen destacada -->
            <div class="relative aspect-video mb-8 overflow-hidden rounded-2xl shadow-lg">
              <NuxtImg
                :src="currentService.image"
                :alt="currentService.title"
                class="w-full h-full object-cover"
                format="webp"
                quality="85"
                loading="eager"
                fetchpriority="high"
              />
            </div>

            <!-- Contenido principal -->
            <div class="bg-white rounded-2xl p-8 lg:p-12 shadow-sm mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ whatIsTitle }}</h2>
              <div class="prose prose-lg max-w-none text-gray-600">
                <p>{{ currentService.content }}</p>
              </div>

              <!-- Botón de acción -->
              <div class="mt-8">
                <button
                  @click="handleSolicitarServicio"
                  class="btn primary inline-block"
                >
                  Solicitar este servicio
                </button>
              </div>
            </div>

            <!-- CTA inline -->
            <div class="bg-primary/5 border border-primary/10 rounded-2xl p-6 lg:p-8 mb-8">
              <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div class="text-center sm:text-left">
                  <h3 class="text-lg font-bold text-primary mb-1">¿Listo para dar el primer paso?</h3>
                  <p class="text-gray-600">Descubre en minutos cuánto puedes financiar</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                  <NuxtLink
                    to="/simulador/credito"
                    class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors text-sm"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Simular mi crédito
                  </NuxtLink>
                  <NuxtLink
                    to="/contacto"
                    class="inline-flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors text-sm"
                  >
                    Hablar con un asesor
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Mercados disponibles para este servicio -->
            <div v-if="landingPages?.length" class="bg-white rounded-2xl p-8 lg:p-12 shadow-sm mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Disponible en tu país</h2>
              <p class="text-gray-600 mb-6">Conoce las condiciones específicas para tu lugar de residencia</p>
              <div class="grid sm:grid-cols-2 gap-4">
                <NuxtLink
                  v-for="lp in landingPages"
                  :key="lp.slug"
                  :to="`/servicios/${currentService.slug}/${lp.slug}`"
                  class="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-colors group"
                >
                  <span class="text-3xl">{{ countryFlag(lp.country_code || '') }}</span>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-900 group-hover:text-primary transition-colors">{{ lp.country }}</p>
                    <p class="text-sm text-gray-500 truncate">{{ lp.hero_subtitle || `${currentService.title} en ${lp.country}` }}</p>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-primary shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>
            </div>

            <!-- Información detallada (acordeón siempre visible) -->
            <div>
              <!-- <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Todo lo que necesitas saber</h2>
                <p class="mt-2 text-gray-600">Explora cada sección para conocer todos los detalles de este servicio</p>
              </div> -->

              <div class="accordion-container">
                <Accordion
                  ref="accordionRef"
                  :items="accordionItems"
                  :multiple="true"
                  :default-open="0"
                />
              </div>
            </div>
          </article>

          <!-- Columna derecha: Sidebar -->
          <aside class="lg:col-span-4 mt-12 lg:mt-0">
            <div class="lg:sticky lg:top-[140px] space-y-6">

              <!-- CTA Simulador -->
              <SidebarCTA
                variant="primary"
                icon="calculator"
                title="Simula tu crédito"
                description="Descubre en minutos cuánto puedes solicitar y cuál sería tu cuota mensual"
                cta-text="Ir al simulador"
                cta-link="/simulador/credito"
              />

              <!-- CTA Contacto -->
              <SidebarCTA
                variant="secondary"
                icon="question"
                title="¿Tienes dudas, preguntas o inquietudes?"
                description="Nuestros equipo humano está listo para ayudarte con tu solicitud."
                cta-text="Habla con un ejecutivo de crédito."
                cta-link="/contacto"
                badge="Respuesta en menos de 24 horas"
                :badge-icon="true"
              />

              <!-- Recursos útiles -->
              <ResourcesList
                title="Recursos útiles"
                :resources="usefulResources"
              />
            </div>
          </aside>
        </div>
      </div>
    </div>

    <!-- Bancos Aliados -->
    <BankLogosSection />

    <!-- CTA Final -->
    <CTASection
      title="Tu hogar en Colombia te está esperando"
      description="Da el primer paso hacia tu inversión inmobiliaria. Nuestro equipo está listo para asesorarte sin costo ni compromiso."
      :primary-cta="{ text: 'Simular mi crédito', to: '/simulador/credito' }"
      :secondary-cta="{ text: 'Hablar con un ejecutivo de crédito', to: '/contacto' }"
      :benefits="['Sin costo inicial', 'Respuesta en 24 h', 'Proceso 100 % remoto']"
    />
    </template>
  </div>
</template>
