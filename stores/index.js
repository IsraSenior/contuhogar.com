import { defineStore } from 'pinia';

export const useMainStore = defineStore('index', {
    state: () => ({
        services: [
            {
                icon: "🏦",
                slug: "credito-hipotecario",
                href: "/credito-hipotecario",
                title: "Crédito Hipotecario",
                intro: "Haz la mejor inversión en tu país para toda una vida. Recuerda, tu lugar está donde esté tu hogar, haz realidad tu sueño de tener vivienda propia en Colombia o para tu familia.",
                content: "Es un préstamo destinado a la compra de vivienda, sujeto a que el aspirante cumpla con las condiciones y requisitos establecidos por la entidad financiera. Una vez aprobado, la propiedad del inmueble queda a nombre del comprador con una garantía hipotecaria en primer grado a favor del banco, hasta que se cancele la totalidad del crédito.",
                description: "Construye desde ya tu historia bajo tu propio techo con el crédito de vivienda más tradicional del mercado. Tú serás el dueño, y el banco te respaldará.",
                image: "https://img.freepik.com/foto-gratis/agente-inmobiliario-trabajo-que-muestra-casa-hace-negocios_23-2150164731.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
            },
            {
                icon: "🏘️",
                slug: "leasing-habitacional",
                href: "/leasing-habitacional",
                title: "Leasing Habitacional",
                intro: "El leasing habitacional une la comodidad del arriendo con el beneficio de convertirte en propietario. Es una alternativa moderna, flexible y más accesible para tener vivienda propia.",
                content: "Es otra buena alternativa de financiamiento para adquirir vivienda, similar al crédito hipotecario, y dirigida a quienes cumplan con los requisitos y condiciones definidas por la entidad financiera. No obstante, la principal diferencia es que, durante la vigencia del contrato, el inmueble permanece a nombre del banco, mientras el cliente lo habita como locatario. Al finalizar el plazo y cumplir con la obligación de pago, será el más opcionado de adquirir la propiedad del inmueble.",
                description: "Financia tu vivienda con baja cuota inicial y disfruta de los beneficios tributarios. ¡Vívela desde hoy y hazla tuya mañana!",
                image: "https://img.freepik.com/foto-gratis/arriba-pareja-contrato-hipoteca_23-2147797656.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
            },
            {
                icon: "🛠️",
                slug: "credito-de-remodelacion",
                href: "/credito-de-remodelacion",
                title: "Crédito de Remodelación",
                intro: "Convierte tu casa en el hogar que siempre soñaste, con el respaldo y la flexibilidad del crédito de remodelación.",
                content: "Se trata de una línea de crédito con garantía hipotecaria, dirigida a financiar mejoras, reparaciones o remodelaciones en una vivienda. El inmueble puede estar totalmente libre de deuda o aún tener una hipoteca vigente. En ambos casos, este crédito funciona de manera similar a un crédito de libre inversión, pero con condiciones más favorables en plazo, tasas de interés, entre otras, gracias a la garantía hipotecaria.",
                description: "Renueva, remodela o restaura tu casa ya, sin sacrificar tus ahorros. Haz hoy todas las mejoras y paga mañana, y de paso aumenta tu patrimonio viviendo más feliz.",
                image: "https://img.freepik.com/fotos-premium/imagen-recortada-arquitecto-sosteniendo-casco-trabajo-mesa-oficina_1048944-25215908.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
            },
            {
                icon: "💳",
                slug: "compra-de-cartera",
                href: "/compra-de-cartera",
                title: "Compra de Cartera",
                intro: "Renueva, remodela o restaura tu casa ya. No esperes más para hacer de tu vivienda en Colombia la más linda y valorizada en el tiempo.",
                content: "Es una línea hipotecaria diseñada para ofrecer mejores condiciones financieras que las que actualmente un cliente tiene con su banco. Al trasladar el crédito a otra entidad financiera, se reduce el valor de la cuota mensual y se optimiza el flujo de caja. Gracias a la Ley 546 de 1999, los deudores hipotecarios tienen la posibilidad de cambiar de entidad financiera en cualquier momento, siempre que la nueva entidad ofrezca una tasa de interés más baja.",
                description: "Reduce tu cuota hipotecaria y vive con mayor tranquilidad. Haz que tu vivienda cueste menos en el tiempo. ¡Proyecta gratis con nosotros tu nueva cuota!",
                image: "https://img.freepik.com/foto-gratis/gente-negocios-dandose-mano-terminando-reunion_1150-37745.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
            },
            {
                icon: "🏡",
                slug: "conturenta",
                href: "/conturenta",
                title: "ConTuRenta",
                intro: "Contamos con presencia en Bogotá y otras ciudades clave, ofreciéndote un catálogo actualizado de inmuebles nuevos y usados.",
                content: "Es un servicio que en primera medida le permite conocer si usted está o no obligado a declarar renta en Colombia, residiendo en Colombia o en el exterior. Si está obligado a declarar, a través de expertos contables, realizamos su declaración de renta de acuerdo con las leyes colombianas. Pregúntenos cómo.",
                description: "Contamos con presencia en Bogotá y otras ciudades clave, ofreciéndote un catálogo actualizado de inmuebles nuevos y usados.",
                image: "https://img.freepik.com/foto-gratis/gente-grabando-su-visita-casa_23-2151139108.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
            },
        ]
    }),
    getters: {
        // variableGetter: state => state.variable
    },
    actions: {
        actionFunction() {
            this.variable
        },
    },
});