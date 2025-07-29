<script setup>
const services = {
    "credito-hipotecario": {
        title: "Crédito Hipotecario",
        intro: "Es un préstamo destinado a la compra de vivienda, sujeto a que el aspirante cumpla con las condiciones y requisitos establecidos por la entidad financiera. Una vez aprobado, la propiedad del inmueble queda a nombre del comprador con una garantía hipotecaria en primer grado a favor del banco, hasta que se cancele la totalidad del crédito."
    },
    "leasing-habitacional": {
        title: "Leasing Habitacional",
        intro: "Es otra buena alternativa de financiamiento para adquirir vivienda, similar al crédito hipotecario, y dirigida a quienes cumplan con los requisitos y condiciones definidas por la entidad financiera. No obstante, la principal diferencia es que, durante la vigencia del contrato, el inmueble permanece a nombre del banco, mientras el cliente lo habita como locatario. Al finalizar el plazo y cumplir con la obligación de pago, será el más opcionado de adquirir la propiedad del inmueble."
    },
    "compra-de-cartera": {
        title: "Compra de Cartera",
        intro: "Es una línea hipotecaria diseñada para ofrecer mejores condiciones financieras que las que actualmente un cliente tiene con su banco. Al trasladar el crédito a otra entidad financiera, se reduce el valor de la cuota mensual y se optimiza el flujo de caja. Gracias a la Ley 546 de 1999, los deudores hipotecarios tienen la posibilidad de cambiar de entidad financiera en cualquier momento, siempre que la nueva entidad ofrezca una tasa de interés más baja."
    },
    "credito-de-remodelacion": {
        title: "Crédito de Remodelación",
        intro: "Se trata de una línea de crédito con garantía hipotecaria, dirigida a financiar mejoras, reparaciones o remodelaciones en una vivienda. El inmueble puede estar totalmente libre de deuda o aún tener una hipoteca vigente. En ambos casos, este crédito funciona de manera similar a un crédito de libre inversión, pero con condiciones más favorables en plazo, tasas de interés, entre otras, gracias a la garantía hipotecaria."
    },
    "conturenta": {
        title: "ConTuRenta",
        intro: "es un servicio que en primera medida le permite conocer si usted está o no obligado a declarar renta en Colombia, residiendo en Colombia o en el exterior. Si está obligado a declarar, a través de expertos contables, realizamos su declaración de renta de acuerdo con las leyes colombianas. Pregúntenos cómo."
    }
}

const route = useRoute()
const slug = computed(() => {
    return route.params.slug;
})

const currentStep = ref(0);
const steps = ref([
    'Información general',
    'Dirigido a',
    'Beneficios',
    'Condiciones',
    'Requisitos',
    'Documentos',
]);

const content = ref([
    `<ol class="list-decimal list-inside">
        <li>Los plazos van desde los 5 hasta los 20 años.</li>
        <li>La tasa de interés será la vigente en el momento del desembolso. ¡Pregúntenos!</li>
        <li>Financiación en crédito hipotecario:
            <ol class="list-disc list-inside pl-5">
                <li>Hasta el 70 % sobre el valor comercial del inmueble.</li>
                <li>En proyectos financiados hasta el 85 %.</li>
            </ol>
        </li>

        <li>Financiación en leasing habitacional familiar o no familiar:
            <ol class="list-disc list-inside pl-5">
                <li>Hasta el 85 % sobre el valor comercial del inmueble.</li>
                <li>En proyectos financiados podría estar hasta en el 90 %.   </li>
            </ol>    
        </li>

        <li>Financiación en crédito de remodelación:
            <ol class="list-disc list-inside pl-5">
                <li>Hasta el 50 % sobre el valor comercial del inmueble.</li>
            </ol>    
        </li>
    </ol>`,

    `<ol class="list-decimal list-inside">
        <li>Colombianos residentes en el exterior interesados en comprar vivienda nueva o usada en cualquier parte Colombia, dentro del casco urbano, no rural.</li>
        <li>Colombianos residentes en el exterior interesados en mejorar las condiciones actuales de su préstamo de vivienda o del inmueble mediante adecuaciones.</li>
        <li>Extranjeros casados con colombiano (a) que se pueda evidenciar y así consolidar ingresos para acceder al préstamo.</li>
        <li>Edades entre 18 y 74 años.</li>
        <li>Este crédito no va dirigido a personas interesadas en compra de locales, lotes, fincas o construcción.</li>
    </ol>`,

    `<ol class="list-decimal list-inside">
        <li>Vigencia del crédito por seis (6) meses, una vez aprobado el estudio. Tiempo ideal para que defina la compra que realizará o la mejora que desea obtener.</li>
        <li>El producto permite realizar abonos parciales para disminuir el periodo de su obligación o cancelar la deuda en cualquier momento, sin ningún tipo de sanción.</li>
        <li>Usted puede obtener uno o más créditos en Colombia, dependiendo de su capacidad de pago.</li>
        <li>En cuanto a su historial crediticio usted toma el crédito en Colombia y no afecta su capacidad de pago en el país actual de residencia.</li>
        <li>Cuota fija en pesos durante la vida del crédito.</li>
        <li>Apertura de una cuenta de ahorros para el desembolso.</li>
        <li>Usted puede aplicar a esta línea de crédito y tener un cupo aprobado incluso sin tener la compra definida.</li>
    </ol>`,

    `<ol class="list-decimal list-inside">
        <li>Tener estatus migratorio definido y debidamente soportado con su residencia o visa de trabajo o naturalización.</li>
        <li>Contar con una permanencia mínima de trabajo entre uno y dos años.</li>
        <li>Los ingresos provenientes de su actividad laboral deben estar debidamente soportados.</li>
        <li>No tener reportes negativos en las Centrales de Riesgo en Colombia; asimismo, se revisará su endeudamiento actual y su comportamiento en el exterior.</li>
        <li>Si desea aumentar su capacidad de pago podrá aplicar con un familiar en Colombia o en el exterior.</li>
        <li>Contar con una persona de su entera confianza en Colombia como apoderado.</li>
    </ol>`,

    `<ul class="list-disc list-inside">
        <li>Certificación laboral vigente (90 días).</li>
        <li>Comprobantes de pago de nómina correspondientes a los tres (3) últimos meses.</li>
        <li>Extractos bancarios de los últimos tres (3) meses de la cuenta donde le consignan su salario.</li>
        <li>Declaración de renta del anterior año fiscal y/o certificado de ingresos y retenciones.</li>
        <li>Reporte vigente de crédito con buen hábito de pago (30 días).</li>
        <li>Fotocopia de la cédula vigente colombiana al 150%.</li>
        <li>Fotocopia del documento en el exterior: residencia, visa o ciudadanía, vigente.</li>
        <li>Cualquier otro ingreso demostrado: pensión, arriendos, contratos como profesional independiente, etc.</li>
        <li>Es necesario para completar la aplicación a su crédito hipotecario, leer, diligenciar y firmar adecuadamente los formatos que lo requieran.</li>
    </ul>
    <p class="mt-6">Una vez aprobado su crédito, ContuHogar le brindará un acompañamiento integral en todo el proceso de legalización, incluyendo elaboración y envío del poder especial, hasta el desembolso del dinero por parte de la entidad financiera. También contará con servicio de posventa./p>
    `,

    `<p>Si desea aplicar a este crédito, descargue nuestros formularios, diligenciarlos y enviarlos a <a href="mailto:gerencia@contuhogar.net" class="text-primary hover:text-secondary">gerencia@contuhogar.net</a> o al correo <a href="mailto:gerenciacomercial@contuhogar.net" class="text-primary hover:text-secondary">gerenciacomercial@contuhogar.net</a> o al ejecutivo de crédito que esté llevando su proceso:</p>


    <p class="font-semibold text-lg mt-12">​Formatos BBVA</p>
    <ul class="list-disc list-inside mt-6">
        <li>Autorización Centrales de Riesgo - <a href="#" class="text-primary hover:text-secondary">Descargar</a></li>
        <li>Solicitud de Vinculación BBVA - <a href="#" class="text-primary hover:text-secondary">Descargar</a></li>
        <li>Información sobre contacto en Colombia y Cuota Inicial - <a href="#" class="text-primary hover:text-secondary">Descargar</a></li>
        <li>Informe de visita a clientes - <a href="#" class="text-primary hover:text-secondary">Descargar</a></li>
    </ul>

    <p class="font-semibold text-lg mt-12">​Formatos Giros y Finanzas</p>
    <ul class="list-disc list-inside mt-6">
        <li>Formato de solicitud de vinculación crédito de vivienda exterior - <a href="#" class="text-primary hover:text-secondary">Descargar</a></li>
        <li>Formato de información apoderado crédito de vivienda exterior - <a href="#" class="text-primary hover:text-secondary">Descargar</a></li>
        <li>Formato de asegurabilidad Vida Allianz - <a href="#" class="text-primary hover:text-secondary">Descargar</a></li>
    </ul>
    `
])

const showMore = ref(false)
</script>

<template>
    <div class="relative isolate overflow-hidden bg-muted px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div class="container mx-auto">
            <div class="grid lg:grid-cols-5 gap-16">
                <div class="lg:col-span-3">
                    <div>
                        <h1 class="text-4xl font-semibold tracking-tight text-pretty text-primary leading-tight sm:text-5xl">
                            {{ services?.[slug[0]]?.title }}
                        </h1>
                        <div class="mt-6 text-base/7 text-gris-aluminio font-normal space-y-6">

                            <p>{{ services?.[slug[0]]?.intro }}
                            </p>
                            <!-- <p>
                                <b>Plazos:</b> los plazos van desde los 5 hasta los 15 años, aunque usted puede
                                hacer
                                abonos
                                parciales o el pago total de la deuda en el momento que desee sin penalidad alguna.
                                La
                                tasa
                                de interés será la vigente en el momento del desembolso.
                            </p> -->
                            <!-- <p>
                                <b>Dirigido a:</b> clientes interesados en compra de vivienda nueva o usada en
                                cualquier
                                parte de
                                Colombia. Usted puede definir su compra sobre planos, lista para la entrega o un
                                inmueble
                                usado. Este crédito no va dirigido a compra de locales, lotes, fincas o
                                construcción,
                                usted
                                puede definir su compra sobre planos, lista para la entrega o un inmueble usado. Las
                                entidades financieras que representamos en Colombia son las responsables del estudio
                                de
                                su
                                solicitud, al ser ellos quienes proveen los recursos a través de la documentación,
                                información y verificación que nosotros como su bróker le suministramos.

                            </p> -->
                            <p>
                                Una vez aprobado su crédito, ContuHogar le brindará un acompañamiento integral en
                                todo
                                el
                                proceso de legalización, incluyendo elaboración y envío del poder especial, hasta el
                                desembolso del dinero por parte de la entidad financiera.
                            </p>

                            <button @click.prevent="showMore = !showMore" class="text-sm/6 font-semibold text-secondary hover:text-primary">Leer {{showMore ? "menos": "más"}}</button>
                        </div>

                        <div v-if="showMore" class="mt-16">
                            <div>
                                <span class="isolate inline-flex rounded-md shadow-xs">
                                    <button type="button" v-for="(step, index) in steps" :key="index"
                                        @click="currentStep = index" :class="[
                                            'relative inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-primary-100 ring-inset hover:bg-gray-50 focus:z-10',
                                            {
                                                'rounded-r-md': index === steps.length - 1,
                                                'rounded-l-md': index === 0,
                                                '!bg-primary text-white ring-2 ring-primary': currentStep === index,
                                                'text-primary': currentStep !== index,
                                                'hover:bg-muted': currentStep !== index,
                                                'focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-secondary':
                                                    currentStep !== index
                                            }]">{{ step }}</button>
                                </span>

                            </div>

                            <div class="space-y-6 mt-8">
                                <div v-html="content[currentStep]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class=" pb-16 px-5 lg:sticky lg:top-[144px] lg:overflow-hidden lg:col-span-2">
                    <img class="w-full max-w-none rounded-xl bg-primary shadow-xl shadow-primary/5"
                        src="/2148392254.jpg" alt="">

                    <!-- <iframe width="100%" height="450" v-/2148392254.jpg
                        src="https://www.youtube.com/embed/QjtQiIq0Jdk?si=X5kV6GvABwE5vu0M" title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                        class="rounded-xl bg-primary-50 shadow-xl ring-1 ring-primary-50"></iframe> -->

                    <div class="mt-6" v-/2148392254.jpg :delay="900">
                        <div
                            class="relative isolate overflow-hidden px-6 py-12 text-center shadow-lg shadow-primary/5 sm:rounded-3xl sm:px-16 bg-white">
                            <h2 class="text-2xl font-semibold tracking-tight text-balance text-primary sm:text-3xl">
                                Aumente su productividad hoy mismo</h2>
                            <div class="mt-10 flex items-center justify-center gap-x-6">
                                <NuxtLink to="/contacto" class="btn primary">
                                    Solicita
                                    nuestro servicio</NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <!-- <div class="relative overflow-hidden">
            <div class="mx-auto container px-5">
                <img class="mb-[-12%] w-full rounded-xl shadow-2xl ring-1 ring-primary/5"
                    src="/2148392254.jpg" alt="">
                <div class="relative" aria-hidden="true">
                    <div class="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white pt-[7%]"></div>
                </div>
            </div>
        </div> -->

    <!-- <div class="container mx-auto">
            <h6 class="mt-12 text-xl font-semibold tracking-tight text-pretty text-secondary leading-tight sm:text-2xl"
                v-/2148392254.jpg>
                Otros servicios relacionadas
            </h6>
            <SliderServicesRelated class="pb-16" v-/2148392254.jpg />
        </div> -->

</template>