<script setup>
const questions = ref([
    {
        question: "¿Qué es un Broker?",
        answer: `Es el canal de contacto entre usted y las entidades financieras para la obtención de un crédito de vivienda en Colombia desde el exterior.`
    },
    {
        question: "¿Cuál es la función de ContuHogar en mi solicitud de crédito?",
        answer: `Nos encargamos de asesorarle, recibir su documentación, filtrar sus posibilidades, verificar la información y acompañarle durante todo el proceso hasta asegurar la radicación que, en caso de ser aprobada, resultará en el desembolso del crédito, incluyendo servicio de posventa durante toda la vida del crédito.`
    },
    {
        question: "¿Cómo identifico el crédito que se ajuste a mi necesidad?",
        answer: `
        <ol class="list-decimal list-inside">
            <li>Con el crédito hipotecario usted podrá financiar el 70 % sobre el valor comercial del inmueble. Se escritura a su nombre y queda con una garantía en primer grado a favor del banco. </li>
            <li>Con el leasing habitacional no familiar usted podrá financiar hasta el 85 % sobre el valor comercial del inmueble. Se escritura a nombre del banco, y se usa la figura de contrato de arrendamiento financiero, donde usted será el locatario y tendrá la primera opción de compra. </li>
            <li>Con el crédito de remodelación usted podrá hacer mejoras, reparaciones, remodelación a su vivienda o incluso destinar ese dinero como un libre inversión. Se financia hasta el 50 %.</li>
            <li>Con la compra de cartera usted podrá mejorar las condiciones financieras del actual crédito, disminuyendo la tasa de interés y por ende el valor de la cuota mensual que contrato con el otro banco. El objetivo es brindarle la mejor opción financiera.  </li>  
        </ol>
        `
    },
    {
        question: "¿Quiénes pueden acceder a estos créditos?",
        answer: `Personas naturales colombianas con edades entre 18 y 74 años; que estén bien calificados ante las centrales de riesgo por sus buenos hábitos de pago; con capacidad de pago suficiente para atender la deuda; demostrando con soportes reales su estabilidad laboral y económica.`
    },
    {
        question: "¿Debo tener definida la compra de la vivienda para aplicar al crédito?",
        answer: `No. Se recomienda que usted inicie el proceso de estudio de crédito y una vez cuente con la aprobación por parte del banco pueda tranquilamente negociar la compra de su inmueble nuevo o usado, incluso sobre planos, asegurando de esta forma estos recursos.`
    },
    {
        question: "¿Cuánto dinero me pueden prestar?",
        answer: `En cuanto al monto a solicitar no existe un límite. Usted puede aplicar a uno o más cupos de crédito, todo depende de su capacidad de pago, es decir, de acuerdo con sus ingresos y gastos mensuales, se revisa su capacidad de pago y se determinará su nivel de endeudamiento. De no aplicar al valor que requiere se sugiere un cupo viable.`
    },
    {
        question: "Si no cuento con los requisitos y condiciones para aplicar, ¿qué podría hacer?",
        answer: `Nosotros estamos en capacidad de asesorarle certeramente para que en un futuro cumpla con los requerimientos y condiciones del banco. Nuestra asesoría es integral y nuestro afán es suplir su necesidad sea en el momento o a futuro.`
    },
    {
        question: "Si vivo en el exterior y no puedo viajar a Colombia para hacer el préstamo o elegir la vivienda ¿cómo podría hacer?",
        answer: `El colombiano residente en el exterior puede nombrar a un apoderado, quien será su representante en Colombia y se encargará de firmar los documentos exigidos por el banco y el vendedor (constructor o persona natural), a través de un poder especial, que para efectos del banco será diligenciado por ContuHogar o a través de un poder por escritura pública. <br/> <br/> El apoderado debe ser una persona de confianza y disponer de tiempo para los trámites. El apoderado no aparecerá en el crédito, ni en la compra, solo es un representante suyo.`
    },
])
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
                                class="font-semibold text-secondary hover:text-primary">nuestro equipo de soporte</a>.</p>
                        <img class="aspect-square w-full bg-gray-50 object-cover mt-10 rounded-3xl"
                            src="https://img.freepik.com/foto-gratis/adorables-padres-hijo-casa_23-2148392254.jpg?t=st=1746707746~exp=1746711346~hmac=c9d3039226a05d96e5d6a6e2c447beec5e55da8c40e072766106ec3da06d2b99&w=2000"
                            alt="">
                    </div>
                </div>
                <div class="mt-10 lg:col-span-7 lg:mt-0">
                    <dl class="space-y-10">
                        <div v-for="(item, index) in questions" :key="index">
                            <dt class="text-xl font-bold text-primary">{{ item?.question }}</dt>
                            <dd class="mt-2 text-lg text-gray-500" v-html="item?.answer"></dd>
                        </div>

                        <!-- More questions... -->
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