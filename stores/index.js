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
                content: "Es un servicio que en primera medida te permitirá conocer si estás o no obligado a declarar renta en Colombia, bien sea viviendo en Colombia o en el exterior. Si está obligado a declarar, a través de expertos contables, realiza tu declaración de renta de acuerdo con las leyes colombianas.",
                description: "Contamos con presencia en Bogotá y otras ciudades clave, ofreciéndote un catálogo actualizado de inmuebles nuevos y usados.",
                image: "https://img.freepik.com/foto-gratis/gente-grabando-su-visita-casa_23-2151139108.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
            },
        ],
        logos: [
            "/logos/banco-occidental.png",
            "/logos/banco-union.png",
            "https://amarilo.com.co/images/logo.svg",
            "https://constructoracolpatria.com/site/assets/img/constructora-colpatria.png",
            "https://marval.com.co/wp-content/uploads/2022/03/Grupo-429.png"
        ],
        team: [
            {
                name: "Alejandra Pérez",
                email: "gerencia@contuhogar.net",
                title: "Gerente",
                image: "/team/alejandra-perez.avif"
            },
            {
                name: "Fernando Muñóz Tatar",
                email: "directorcomercial@contuhogar.net",
                title: "Director operativo",
                image: "/team/fernando-munoz.avif"
            },
            {
                name: "Marly Sierra",
                email: "creditodevivienda05@contuhogar.net",
                title: "Ejecutiva de crédito",
                image: "/team/marly-sierra.avif"
            },
            {
                name: "Yeison Chaves",
                email: "ejecutivocomercial@contuhogar.net",
                title: "Ejecutivo de crédito",
                image: "/team/yeison-chaves.jpeg"
            },
            {
                name: "Carlos Garzón",
                email: "analistadecredito@contuhogar.net",
                title: "Analista de crédito",
                image: "/team/carlos-garzon.jpeg"
            },
            {
                name: "Kelly Johanna Rojas",
                email: "asistentedegerencia@contuhogar.net",
                title: "Asistente de gerencia",
                image: "/team/kelly-rojas.jpeg"
            },
            {
                name: "Catalina Romero",
                email: "gestionhumana@contuhogar.net",
                title: "Directora de gestión humana",
                image: "/team/catalina-romero.avif"
            },
            {
                name: "Diego Rojas",
                email: "contabilidad@contuhogar.net",
                title: "Contatador",
                image: "/team/diego-rojas.avif"
            },
        ],
        questions: [
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
        ]
    }),
    getters: {
        // variableGetter: state => state.variable
    },
    actions: {
        // actionFunction() {
        //     this.variable
        // },
    },
});