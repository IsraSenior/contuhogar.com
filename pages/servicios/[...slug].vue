<script setup>
const store = useMainStore();
const route = useRoute();
const slug = computed(() => {
    return route.params.slug;
})

const currentService = computed(() => {
    const service = store.services.filter(x => x.slug === route.params.slug[0])

    return service?.[0]
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
        <li><small class="font-bold">(Si es crédito hipotecario)</small> financiación en crédito hipotecario:
            <ol class="list-disc list-inside pl-5">
                <li>Hasta el 70 % sobre el valor comercial del inmueble.</li>
                <li>En proyectos financiados hasta el 85 %.</li>
            </ol>
        </li>

       <li><small class="font-bold">(Si es leasing habitacional)</small> financiación en leasing habitacional familiar o no familiar:
            <ol class="list-disc list-inside pl-5">
                <li>Hasta el 85 % sobre el valor comercial del inmueble.</li>
                <li>En proyectos financiados podría estar hasta en el 90 %.   </li>
            </ol>    
        </li>

        <li><small class="font-bold">(Si es crédito de remodelación)</small>  financiación en crédito de remodelación:
            <ol class="list-disc list-inside pl-5">
                <li>Hasta el 50 % sobre el valor comercial del inmueble.</li>
            </ol>    
        </li>
    </ol>`,

    `<ol class="list-decimal list-inside">
        <li><small class="font-bold">(Si es crédito hipotecario o leasing habitacional)</small>  colombianos residentes en el exterior interesados en comprar vivienda nueva o usada en cualquier parte Colombia, dentro del casco urbano, no rural.</li>
        <li><small class="font-bold">(Si es compra de cartera o crédito de remodelación)</small> colombianos residentes en el exterior interesados en mejorar las condiciones actuales de tu préstamo de vivienda o del inmueble mediante adecuaciones.</li>
        <li>Extranjeros casados con colombiano (a) que se pueda evidenciar y así consolidar ingresos para acceder al préstamo.</li>
        <li>Edades entre 18 y 74 años.</li>
        <li>Este crédito no va dirigido a personas interesadas en compra de locales, lotes, fincas o construcción.</li>
    </ol>`,

    `<ol class="list-decimal list-inside">
        <li>Vigencia del crédito por seis (6) meses, una vez aprobado el estudio. Tiempo ideal para que defina la compra que realizará o la mejora que desea obtener.</li>
        <li>El producto permite realizar abonos parciales para disminuir el periodo de tu obligación o cancelar la deuda en cualquier momento, sin ningún tipo de sanción.</li>
        <li>Podrías obtener uno o más créditos en Colombia, dependiendo de tu capacidad de pago.</li>
        <li>En cuanto a tu historial crediticio tomas el crédito en Colombia y no afecta tu capacidad de pago en el país actual de residencia.</li>
        <li>Cuota fija en pesos durante la vida del crédito.</li>
        <li>Apertura de una cuenta de ahorros para el desembolso.</li>
        <li>Podrías aplicar a esta línea de crédito y tener un cupo aprobado incluso sin tener la compra definida.</li>
    </ol>`,

    `<ol class="list-decimal list-inside">
        <li>Tener estatus migratorio definido y debidamente soportado con tu residencia o visa de trabajo o naturalización.</li>
        <li>Contar con una permanencia mínima de trabajo entre uno y dos años.</li>
        <li>Los ingresos provenientes de tu actividad laboral deben estar debidamente soportados.</li>
        <li>No tener reportes negativos en las centrales de riesgo en Colombia; asimismo, se revisará tu endeudamiento actual y tu comportamiento crediticio en el exterior.</li>
        <li>Si desea aumentar tu capacidad de pago podrás aplicar con un familiar en Colombia o en el exterior.</li>
        <li>Contar con una persona de tu entera confianza en Colombia como apoderado.</li>
    </ol>`,

    `<ul class="list-disc list-inside">
        <li>Certificación laboral vigente (90 días).</li>
        <li>Comprobantes de pago de nómina correspondientes a los tres (3) últimos meses.</li>
        <li>Extractos bancarios de los últimos tres (3) meses de la cuenta donde te consignan tu salario.</li>
        <li>Declaración de renta del anterior año fiscal y/o certificado de ingresos y retenciones.</li>
        <li>Reporte vigente de crédito con buen hábito de pago (30 días).</li>
        <li>Ampliación de la cédula vigente colombiana al 150 %.</li>
        <li>Fotocopia del documento en el exterior: residencia, visa o ciudadanía, vigente.</li>
        <li>Cualquier otro ingreso demostrado: pensión, arriendos, contratos como profesional independiente, etc.</li>
        <li>Es necesario para completar la aplicación a tu crédito hipotecario, leer, diligenciar y firmar adecuadamente los formatos que lo requieran.</li>
    </ul>
    <p class="mt-6">Una vez aprobado tu crédito de vivienda, ContuHogar le brindará un acompañamiento integral en todo el proceso de legalización, incluyendo elaboración y envío del poder especial, hasta el desembolso del dinero por parte de la entidad financiera. También contarás con servicio de posventa.</p>
    `,

    `<p>Si desea aplicar a este crédito, descarga nuestros formularios, diligenciénsialos y envíalos al ejecutivo de crédito que esté llevando tu proceso: </p>


    <p class="font-semibold text-lg mt-12">​Formatos BBVA</p>
    <ul class="list-disc list-inside mt-6">
        <li>Autorización Centrales de Riesgo - <a href="#" class="text-primary hover:text-secondary">Descargar</a></li>
        <li>Solicitud de Vinculación BBVA - <a href="#" class="text-primary hover:text-secondary">Descargar</a></li>
        <li>Información sobre contacto en Colombia y Cuota Inicial - <a href="#" class="text-primary hover:text-secondary">Descargar</a></li>
        <li>Informe de visita a clientes - <a href="#" class="text-primary hover:text-secondary">Descargar</a></li>
    </ul>

    <p class="font-semibold text-lg mt-12">​Formatos Banco Unión</p>
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
    <div class="relative isolate overflow-hidden bg-muted px-6 py-24 sm:pt-32 lg:overflow-visible lg:px-0">
        <div class="container mx-auto">
            <div class="grid lg:grid-cols-5 gap-16">
                <div class="lg:col-span-3">
                    <div>
                        <h1
                            class="text-4xl font-semibold tracking-tight text-pretty text-primary leading-tight sm:text-5xl">
                            {{ currentService?.title }}
                        </h1>
                        <div class="mt-6 text-base/7 text-gris-aluminio font-normal space-y-6">

                            <p>{{ currentService?.content }}
                            </p>

                            <p class="font-bold">
                                Una vez aprobado tu crédito de vivienda, ContuHogar te brindará un acompañamiento integral en
                                todo el proceso de legalización, incluyendo elaboración y envío del poder especial, hasta el
                                desembolso del dinero por parte de la entidad financiera.
                            </p>

                            <div class="space-x-6 mt-16">
                                <NuxtLink :to="`/contacto?slug=${currentService?.slug}`" class="btn primary">
                                    Solicita
                                    nuestro servicio</NuxtLink>
                                <button @click.prevent="showMore = !showMore"
                                    class="text-sm/6 font-semibold text-secondary hover:text-primary">Leer {{ showMore ?
                                        "menos" : "más" }}</button>
                            </div>
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
                                                '!bg-secondary text-white ring-2 ring-secondary': currentStep === index,
                                                'text-secondary': currentStep !== index,
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

                <div class=" pb-16 px-5 lg:col-span-2 relative">
                    <img class="w-full max-w-none rounded-xl bg-primary shadow-xl shadow-primary/5 aspect-square object-center object-cover"
                        :src="currentService?.image" :alt="currentService?.title">

                    <!-- <div class="mt-6">
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
                    </div> -->
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
               >
                Otros servicios relacionadas
            </h6>
            <SliderServicesRelated class="pb-16" />
        </div> -->

</template>