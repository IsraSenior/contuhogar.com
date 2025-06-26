<script setup>
const questions = ref([
    {
        question: "¿Qué es un bróker?",
        answer: `Es el canal de contacto entre usted y las entidades financieras para la obtención de un crédito de vivienda en Colombia desde el exterior.`
    },
    {
        question: "¿Puedo pedir un préstamo de vivienda en Colombia a pesar de vivir en el exterior?",
        answer: `Sí. Toda vez que cumpla con los requisitos que exige la entidad financiera, usted podrá presentar la documentación que justifique su estabilidad tanto laboral como económica, entre otros.`
    },
    {
        question: "¿Cuál es la función de ContuHogar en mi solicitud de crédito?",
        answer: `Nos encargamos de asesorarle, recibir su documentación, filtrar sus posibilidades, verificar la información y acompañarle durante todo el proceso hasta asegurar la radicación que, en caso de ser aprobada, podrá resultar en el desembolso del crédito.`
    },
    {
        question: "¿Si tengo reportes negativos en Colombia o en el exterior puedo aplicar a un préstamo?",
        answer: `Depende. Para cualquiera de los dos casos usted debe presentar paz y salvo de la deuda, dependiendo del tipo de reporte y la cuantía, requerirá una excepción especial. En caso de un reporte castigado, deberá estudiarse individualmente su situación.`
    },
    {
        question: "¿Mi crédito en el exterior se verá afectado con el préstamo que haga en Colombia?",
        answer: `No. El préstamo de vivienda en Colombia será únicamente reportado en Colombia bajo la Ley 546 de 1999, también conocida como la Ley de Vivienda.`
    },
    {
        question: "Mi pareja es extranjero, ¿él puede pedir un préstamo conmigo para la compra de vivienda en Colombia?",
        answer: `Si usted ha validado esta unión mediante un documento legal podrá consolidar ingresos con su cónyuge. Él como extranjero se deberá presentar con el pasaporte.`
    },
    {
        question: "¿Debo tener definida la compra de la vivienda para aplicar al crédito?",
        answer: `No. Se recomienda que usted inicie el proceso de estudio de crédito y una vez cuente con la aprobación pueda tranquilamente negociar la compra de su inmueble nuevo o usado, incluso sobre planos, asegurando de esta forma estos recursos.`
    },
    {
        question: "¿Cuánto dinero me pueden prestar?",
        answer: `En cuanto al monto a solicitar no existe un límite. Usted puede aplicar a uno o más cupos de crédito, todo depende de su capacidad de pago. Validaremos sus ingresos frente a sus gastos. De no aplicar al valor que requiere se sugiere un cupo viable.`
    },
    {
        question: "Si no cuento con los requisitos y condiciones para aplicar, ¿qué podría hacer?",
        answer: `Nosotros estamos en capacidad de asesorarle certeramente para que en un futuro cumpla con los requerimientos y condiciones del banco. Nuestra asesoría es integral y nuestro afán es suplir su necesidad sea en el momento o a futuro.`
    }
]);

const current = ref(0);
</script>

<template>
    <div class="bg-muted">
        <div class="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
            <div class="lg:grid lg:grid-cols-12 lg:gap-20">
                <div class="lg:col-span-5 relative">
                    <div class="lg:sticky lg:top-[164px]">
                        <h2 class="text-3xl font-semibold tracking-tight text-pretty text-primary sm:text-4xl">
                            Preguntas más frecuentes
                        </h2>
                        <p class="mt-4 text-base/7 text-pretty text-gray-500">¿No encuentra la respuesta que busca?
                            Póngase en contacto con <a href="#"
                                class="font-semibold text-secondary hover:text-primary">nuestro equipo de soporte</a>.
                        </p>
                        <img class="aspect-square w-full bg-gray-50 object-cover mt-10 rounded-3xl"
                            src="https://img.freepik.com/foto-gratis/adorables-padres-hijo-casa_23-2148392254.jpg?t=st=1746707746~exp=1746711346~hmac=c9d3039226a05d96e5d6a6e2c447beec5e55da8c40e072766106ec3da06d2b99&w=2000"
                            alt="">
                    </div>
                </div>
                <div class="mt-10 lg:col-span-7 lg:mt-0">
                    <dl class="space-y-6">
                        <div v-for="(item, index) in questions" :key="index">
                            <dt :class="[
                                'text-base font-bold cursor-pointer px-2 py-1.5 rounded-lg flex justify-between items-start',
                                current === index ? 'bg-primary text-white' : 'bg-muted border border-primary text-primary hover:bg-primary hover:text-white'
                            ]" @click="current = index">
                                <span class="flex-1">{{ item?.question }}</span>
                                <span class="pl-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>

                                </span>
                            </dt>
                            <dd v-if="current === index" class="mt-2 text-lg text-gray-500 px-5" v-html="item?.answer">
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white">
        <div class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div
                class="relative isolate overflow-hidden bg-secondary px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                    <h2 class="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">¿Listo
                        para invertir en tu futuro en Colombia?</h2>
                    <p class="mt-6 text-lg/8 text-pretty text-white"> Nuestro equipo está listo para escucharte,
                        orientarte y ayudarte a tomar la mejor decisión.</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <a href="#"
                            class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-xs shadow-primary/5 hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Contáctanos</a>
                        <a href="#" class="text-sm/6 font-semibold text-white hover:text-primary">Conocer más <span
                                aria-hidden="true">→</span></a>
                    </div>
                </div>
                <div class="relative mt-16 h-full lg:mt-8">
                    <img class="absolute top-0 left-0 w-[46rem] max-w-none object-center object-cover rounded-md bg-white/5 ring-1 ring-white/10"
                        src="https://img.freepik.com/foto-gratis/mira-compramos-casa_637285-12424.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
                        alt="App screenshot">
                </div>
            </div>
        </div>
    </div>

</template>