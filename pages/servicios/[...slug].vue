<script setup>
const currentStep = ref(0);
const steps = ref([
    'Beneficios',
    'Condiciones',
    'Requisitos',
    'Documentos',
]);
const content = ref([
    `<ol class="list-decimal list-inside">
        <li>
Vigencia del crédito por seis (6) meses una vez aprobado, tiempo ideal para que defina la compra que realizará.</li>
        <li>El producto permite realizar abonos parciales para disminuir el periodo de su obligación o cancelar la deuda en cualquier momento, sin ningún tipo de sanción por parte de BBVA.</li>
        <li>Usted puede obtener uno o más créditos en Colombia, dependiendo de su capacidad de pago.</li>
        <li>En cuanto a su historial crediticio usted toma el crédito en Colombia y no afecta su capacidad de pago en el país actual de residencia. El pago de la cuota se hace en pesos, en Colombia.</li>
        <li>Apertura de cuenta de ahorros para el desembolso, a través de esta, podrá realizar el pago de su cuota mensual por giros o transferencias desde su país de residencia. </li>
        <li>
Aplica algunas coberturas del Gobierno, <a href="/contacto" class="text-primary hover:text-secondary">pregúntanos cómo</a>.</li>
    </ol>`,

    `<ol class="list-decimal list-inside">
        <li>Su estatus migratorio esté definido (visa de residente; trabajo o nacionalizado).</li>
        <li>Deberá contar con una permanencia mínima entre uno y dos años. Puede haber continuidad laboral entre un trabajo y otro.</li>
        <li>Los ingresos provenientes de su actividad laboral deben estar debidamente soportados.</li>
        <li>No debe presentar reportes negativos en las Centrales de Riesgo en Colombia; asimismo, se revisará su endeudamiento actual y su comportamiento (score), el cual tampoco debe tener reportes negativos. </li>
        <li>Si desea aumentar su capacidad de pago podrá aplicar con un familiar en Colombia o en el exterior, pregúntenos cómo.</li>
        <li>Debe contar con una persona de su entera confianza en Colombia como apoderada para cualquier trámite legal. Esta persona no contraerá la obligación financiera, ni será propietario del inmueble.</li>
    </ol>`,

    `<ul class="list-disc list-inside">
        <li>Certificación laboral vigente (80 días).</li>
        <li>Comprobantes de pago por nómina correspondientes a los tres (3) últimos meses.</li>
        <li>Extractos bancarios de los últimos tres (3) meses de la cuenta donde consignan su salario.</li>
        <li>Declaración de renta del anterior año fiscal y/o certificado de ingresos y retenciones.</li>
        <li>Reporte vigente de crédito con buen hábito de pago (25 días). </li>
        <li>Fotocopia de la cédula vigente colombiana al 150%.</li>
        <li>Fotocopia del documento en el exterior: residencia, visa o ciudadanía vigentes. </li>
        <li>Cualquier otro ingreso demostrado: pensión, arriendos, contratos como profesional independiente, etc.</li>
    </ul>
    <p class="mt-6">Es necesario para completar la aplicación a su crédito hipotecario, leer, diligenciar y firmar adecuadamente los formatos que lo requieran, así como colocar la huella dactilar de su índice derecho de forma muy legible.</p>
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
</script>

<template>
    <div class="relative isolate overflow-hidden bg-muted px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div
            class="mx-auto grid container grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div
                class="lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
                <div class="lg:pr-4">
                    <div class="">
                        <h1 class="mt-8 text-4xl font-semibold tracking-tight text-pretty text-primary leading-tight sm:text-5xl"
                            v-motion-fadein-up-once :delay="300">
                            Crédito hipotecario
                        </h1>
                        <div class="mt-6 text-base/7 text-gris-aluminio font-normal space-y-6" v-motion-fadein-up-once>

                            <p><b>Características:</b> línea de crédito para compra de vivienda en Colombia sólo para
                                casco
                                urbano, no rural. Permite financiar hasta el 70 % sobre el valor comercial de un
                                inmueble.
                                El inmueble para comprar podrá ser nuevo o usado y podrá estar ubicado en cualquier
                                parte de
                                Colombia. El 30 % restante es la cuota inicial, la cual usted debe cubrir con recursos
                                propios, debe negociarla con el vendedor. Usted puede aplicar a esta línea de crédito y
                                tener un cupo aprobado incluso sin tener la compra definida.</p>
                            <p>
                                <b>Plazos:</b> los plazos van desde los 5 hasta los 15 años, aunque usted puede hacer
                                abonos
                                parciales o el pago total de la deuda en el momento que desee sin penalidad alguna. La
                                tasa
                                de interés será la vigente en el momento del desembolso.
                            </p>
                            <p>
                                <b>Dirigido a:</b> clientes interesados en compra de vivienda nueva o usada en cualquier
                                parte de
                                Colombia. Usted puede definir su compra sobre planos, lista para la entrega o un
                                inmueble
                                usado. Este crédito no va dirigido a compra de locales, lotes, fincas o construcción,
                                usted
                                puede definir su compra sobre planos, lista para la entrega o un inmueble usado. Las
                                entidades financieras que representamos en Colombia son las responsables del estudio de
                                su
                                solicitud, al ser ellos quienes proveen los recursos a través de la documentación,
                                información y verificación que nosotros como su bróker le suministramos.

                            </p>
                            <p>
                                Una vez aprobado su crédito, ContuHogar le brindará un acompañamiento integral en todo
                                el
                                proceso de legalización, incluyendo elaboración y envío del poder especial, hasta el
                                desembolso del dinero por parte de la entidad financiera. También contará con servicio
                                de
                                postventa.
                            </p>

                            <div class="mt-12">
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
                                            }]" v-motion-fadein-up-once :delay="index * 100" v-tooltip="{
                                                content: step,
                                                placement: 'top',
                                                trigger: 'hover focus',
                                                theme: 'dark',
                                                delay: { show: 100, hide: 100 },
                                                offset: [0, 8],
                                                arrow: true,
                                                arrowSize: 6,
                                                arrowOffset: 8,
                                                arrowColor: '#000000',
                                                arrowClass: 'tooltip-arrow',
                                                delay: { show: 100, hide: 100 },
                                            }
                                                ">{{ step }}</button>
                                </span>

                            </div>

                            <div class="space-y-6">
                                <div v-html="content[currentStep]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="-mt-12 pb-16 px-5 lg:sticky lg:top-[144px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                <img class="w-full max-w-none rounded-xl bg-primary shadow-xl shadow-primary/5"
                    src="https://img.freepik.com/foto-gratis/adorables-padres-hijo-casa_23-2148392254.jpg?t=st=1746707746~exp=1746711346~hmac=c9d3039226a05d96e5d6a6e2c447beec5e55da8c40e072766106ec3da06d2b99&w=2000"
                    alt="">

                <!-- <iframe width="100%" height="450" v-motion-fadein-up-once
                        src="https://www.youtube.com/embed/QjtQiIq0Jdk?si=X5kV6GvABwE5vu0M" title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                        class="rounded-xl bg-primary-50 shadow-xl ring-1 ring-primary-50"></iframe> -->

                <div class="mt-6" v-motion-fadein-up-once :delay="900">
                    <div
                        class="relative isolate overflow-hidden px-6 py-12 text-center shadow-lg shadow-primary/5 sm:rounded-3xl sm:px-16 bg-white">
                        <h2 class="text-2xl font-semibold tracking-tight text-balance text-primary sm:text-3xl">
                            Aumente su productividad hoy mismo</h2>
                        <div class="mt-10 flex items-center justify-center gap-x-6">
                            <a href="#" class="btn primary">
                                Solicita
                                nuestro servicio</a>
                            <a href="https://www.softexpert.com/" target="_blank" rel="noopener noreferrer"
                                class="text-secondary hover:text-primary">Contáctanos
                                <span aria-hidden="true">→</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <!-- <div class="relative overflow-hidden">
            <div class="mx-auto container px-5">
                <img class="mb-[-12%] w-full rounded-xl shadow-2xl ring-1 ring-primary/5"
                    src="https://img.freepik.com/foto-gratis/adorables-padres-hijo-casa_23-2148392254.jpg?t=st=1746707746~exp=1746711346~hmac=c9d3039226a05d96e5d6a6e2c447beec5e55da8c40e072766106ec3da06d2b99&w=2000" alt="">
                <div class="relative" aria-hidden="true">
                    <div class="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white pt-[7%]"></div>
                </div>
            </div>
        </div> -->

    <!-- <div class="container mx-auto">
            <h6 class="mt-12 text-xl font-semibold tracking-tight text-pretty text-secondary leading-tight sm:text-2xl"
                v-motion-fadein-up-once>
                Otros servicios relacionadas
            </h6>
            <SliderServicesRelated class="pb-16" v-motion-fadein-up-once />
        </div> -->

</template>