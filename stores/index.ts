import { defineStore } from 'pinia'

/**
 * Interfaz para servicios financieros
 */
export interface Service {
  slug: string
  href: string
  title: string
  intro: string
  content: string
  description: string
  image: string
}

/**
 * Interfaz para miembros del equipo
 */
export interface TeamMember {
  name: string
  email: string
  title: string
  image: string
}

/**
 * Interfaz para preguntas frecuentes
 */
export interface Question {
  question: string
  answer: string
}

/**
 * Interfaz para logos de bancos y aliados
 */
export interface PartnerLogo {
  type: 'image' | 'text'
  category: 'banco' | 'constructora'
  value: string
  name: string
}

/**
 * Interfaz para datos pre-llenados de contacto
 * Se usa para pasar datos entre páginas sin exponerlos en URL
 */
export interface ContactPrefill {
  source: 'simulador' | 'servicio' | null
  nombres?: string
  apellidos?: string
  email?: string
  telefono?: string
  telefonoCodigo?: string
  servicioSlug?: string
  servicioNombre?: string
  simulador?: {
    tipoCredito?: string
    valorBien?: number
    montoSolicitado?: number
    plazoMeses?: number
    resultado?: string
    cuotaMensual?: number
    porcentajeCompromiso?: number
  }
}

/**
 * Interfaz del estado del store principal
 */
export interface MainStoreState {
  services: Service[]
  logos: PartnerLogo[]
  team: TeamMember[]
  questions: Question[]
  contactPrefill: ContactPrefill | null
}

/**
 * Store principal de la aplicación
 * Contiene servicios, equipo, logos de partners y FAQs
 */
export const useMainStore = defineStore('main', {
  state: (): MainStoreState => ({
    contactPrefill: null,
    services: [
      {
        slug: 'credito-hipotecario',
        href: '/credito-hipotecario',
        title: 'Crédito hipotecario',
        intro:
          'Haz la mejor inversión en tu país para toda la vida. Recuerda: tu lugar está donde esté tu hogar. Haz realidad tu sueño de tener vivienda propia en Colombia, para ti o para tu familia.',
        content:
          'Es un préstamo destinado a la compra de vivienda, sujeto a que el aspirante cumpla con las condiciones y requisitos establecidos por la entidad financiera. Una vez aprobado, la propiedad del inmueble queda a nombre del comprador con una garantía hipotecaria en primer grado a favor del banco, hasta que se cancele la totalidad del crédito.',
        description:
          'Construye desde ya tu historia bajo tu propio techo con el crédito de vivienda más tradicional del mercado. Tú serás el dueño, y el banco te respaldará.',
        image: '/credito-hipotecario.avif',
      },
      {
        slug: 'leasing-habitacional',
        href: '/leasing-habitacional',
        title: 'Leasing habitacional',
        intro:
          'El leasing habitacional une la comodidad del arriendo con el beneficio de convertirte en propietario. Es una alternativa moderna, flexible y más accesible para tener vivienda propia.',
        content:
          'Es otra buena alternativa de financiamiento para adquirir vivienda, similar al crédito hipotecario, y dirigida a quienes cumplan con los requisitos y condiciones definidas por la entidad financiera. No obstante, la principal diferencia es que, durante la vigencia del contrato, el inmueble permanece a nombre del banco, mientras el cliente lo habita como locatario. Al finalizar el plazo y cumplir con la obligación de pago, será el más opcionado de adquirir la propiedad del inmueble.',
        description:
          'Financia tu vivienda con baja cuota inicial y disfruta de los beneficios tributarios. ¡Vívela desde hoy y hazla tuya mañana!',
        image: '/leasing-habitacional.avif',
      },
      {
        slug: 'credito-de-remodelacion',
        href: '/credito-de-remodelacion',
        title: 'Crédito de remodelación',
        intro:
          'Convierte tu casa en el hogar que siempre soñaste, con un préstamo de remodelación respaldado por el banco que mejor se ajuste a tus necesidades, ofreciéndote flexibilidad y apoyo financiero.',
        content:
          'Se trata de una línea de crédito con garantía hipotecaria, dirigida a financiar mejoras, reparaciones o remodelaciones en una vivienda. El inmueble puede estar totalmente libre de deuda o aún tener una hipoteca vigente. En ambos casos, este crédito funciona de manera similar a un crédito de libre inversión, pero con condiciones más favorables en plazo, tasas de interés, entre otras, gracias a la garantía hipotecaria.',
        description:
          'Renueva, remodela o restaura tu casa ya, sin sacrificar tus ahorros. Haz hoy todas las mejoras y paga mañana, y de paso aumenta tu patrimonio viviendo más feliz.',
        image: '/credito-de-remodelacion.avif',
      },
      {
        slug: 'compra-de-cartera',
        href: '/compra-de-cartera',
        title: 'Compra de cartera',
        intro:
          'Renueva, remodela o restaura tu casa ya. No esperes más para hacer de tu vivienda en Colombia la más linda y valorizada en el tiempo.',
        content:
          'Es una línea hipotecaria diseñada para ofrecer mejores condiciones financieras que las que actualmente un cliente tiene con tu banco. Al trasladar el crédito a otra entidad financiera, se reduce el valor de la cuota mensual y se optimiza el flujo de caja. Gracias a la Ley 546 de 1999, los deudores hipotecarios tienen la posibilidad de cambiar de entidad financiera en cualquier momento, siempre que la nueva entidad ofrezca una tasa de interés más baja.',
        description:
          'Reduce tu cuota hipotecaria y vive con mayor tranquilidad. Haz que tu vivienda cueste menos en el tiempo. ¡Proyecta gratis con nosotros tu nueva cuota!',
        image: '/compra-de-cartera.avif',
      },
      {
        slug: 'conturenta',
        href: '/conturenta',
        title: 'ConTuRenta',
        intro:
          'Revisemos y validemos si estás obligado a declarar renta en Colombia por ingresos o patrimonio, y si es el caso, nosotros te decimos cómo resolverlo.',
        content:
          'Es un servicio que en primera medida te permitirá conocer si estás o no obligado a declarar renta en Colombia, bien sea viviendo en Colombia o en el exterior. Si está obligado a declarar, a través de expertos contables, realiza tu declaración de renta de acuerdo con las leyes colombianas.',
        description:
          'Revisemos y validemos si estás obligado a declarar renta en Colombia por ingresos o patrimonio, y si es el caso, nosotros te decimos cómo resolverlo.',
        image: '/conturenta.avif',
      },
    ],
    logos: [
      { type: 'text', category: 'banco', value: 'BBVA', name: 'BBVA Colombia' },
      { type: 'image', category: 'banco',  value: '/logos/banco-occidental.webp', name: 'Banco de Occidente' },
      { type: 'image', category: 'banco',  value: '/logos/logo-banco-de-bogota.webp', name: 'Banco de Bogotá' },
      { type: 'image', category: 'banco',  value: '/logos/banco-union.webp', name: 'Banco Unión' },
      { type: 'image', category: 'constructora',  value: '/logos/colpatria-logo.webp', name: 'Colpatria' },
      { type: 'image', category: 'constructora',  value: '/logos/amarilo-logo.webp', name: 'Amarilo' },
    ],
    team: [
      {
        name: 'Alejandra Pérez',
        email: 'gerencia@contuhogar.net',
        title: 'Gerente',
        image: '/team/alejandra-perez.avif',
      },
      {
        name: 'Fernando Muñóz Tatar',
        email: 'directorcomercial@contuhogar.net',
        title: 'Director operativo',
        image: '/team/fernando-munoz.avif',
      },
      {
        name: 'Marly Sierra',
        email: 'creditodevivienda05@contuhogar.net',
        title: 'Ejecutiva de crédito',
        image: '/team/marly-sierra.avif',
      },
      {
        name: 'Yeison Chaves',
        email: 'ejecutivocomercial@contuhogar.net',
        title: 'Ejecutivo de crédito',
        image: '/team/yeison-chaves.jpeg',
      },
      {
        name: 'Carlos Garzón',
        email: 'analistadecredito@contuhogar.net',
        title: 'Analista de crédito',
        image: '/team/carlos-garzon.jpeg',
      },
      {
        name: 'Kelly Johanna Rojas',
        email: 'asistentedegerencia@contuhogar.net',
        title: 'Asistente de gerencia',
        image: '/team/kelly-rojas.jpeg',
      },
      {
        name: 'Catalina Romero',
        email: 'gestionhumana@contuhogar.net',
        title: 'Directora de gestión humana',
        image: '/team/catalina-romero.avif',
      },
      {
        name: 'Diego Rojas',
        email: 'contabilidad@contuhogar.net',
        title: 'Contador',
        image: '/team/diego-rojas.avif',
      },
      // {
      //   name: 'Juan David Medrano',
      //   email: 'ejecutivo.juanm@contuhogar.net',
      //   title: 'Ejecutivo de crédito',
      //   image: '/team/juan-david-medrano.webp',
      // },
    ],
    questions: [
      {
        question: '¿Qué es un bróker?',
        answer:
          'Es el canal de contacto que te conecta con las entidades financieras para la obtención de un crédito de vivienda en Colombia desde el exterior.',
      },
      {
        question:
          '¿Puedo pedir un préstamo de vivienda en Colombia a pesar de vivir en el exterior?',
        answer:
          'Sí. Toda vez que cumplas con los requisitos que exige la entidad financiera, podrás presentar la documentación que justifique tu estabilidad tanto laboral como económico, entre otros.',
      },
      {
        question: '¿Cuál es la función de ContuHogar en mi solicitud de crédito?',
        answer:
          'Nos encargamos de asesorarte, recibir tu documentación, filtrar tus posibilidades, verificar la información y acompañarte durante todo el proceso hasta asegurar la radicación que, en caso de ser aprobada, podrá resultar en el desembolso del crédito.',
      },
      {
        question:
          '¿Si tengo reportes negativos en Colombia o en el exterior puedo aplicar a un préstamo?',
        answer:
          'Depende. Para cualquiera de los dos casos deberás presentar el paz y salvo de la deuda y, dependiendo del tipo de reporte y la cuantía, requerirá una excepción especial. En caso de un reporte castigado, deberá estudiarse individualmente tu situación.',
      },
      {
        question:
          '¿Mi crédito en el exterior se verá afectado con el préstamo que haga en Colombia?',
        answer:
          'No. El préstamo de vivienda en Colombia será únicamente reportado en Colombia bajo la Ley 546 de 1999, también conocida como la Ley de Vivienda.',
      },
      {
        question:
          'Mi pareja es extranjero, ¿él puede pedir un préstamo conmigo para la compra de vivienda en Colombia?',
        answer:
          'Si has validado esta unión mediante un documento legal podrás consolidar ingresos con tu cónyuge. Él como extranjero se deberá presentar con el pasaporte.',
      },
      {
        question: '¿Debo tener definida la compra de la vivienda para aplicar al crédito?',
        answer:
          'No. Se recomienda que inicies el proceso de estudio de crédito y una vez cuentes con la aprobación puedas tranquilamente negociar la compra de tu inmueble nuevo o usado, incluso sobre planos, asegurando de esta forma estos recursos.',
      },
      {
        question: '¿Cuánto dinero me pueden prestar?',
        answer:
          'En cuanto al monto a solicitar no existe un límite. Puedes aplicar a uno o más cupos de crédito, todo depende de tu capacidad de pago. Validaremos tus ingresos frente a tus gastos. De no aplicar al valor que requieres te sugeriremos un cupo viable.',
      },
      {
        question:
          'Si no cuento con los requisitos y condiciones para aplicar, ¿qué podría hacer?',
        answer:
          'Nosotros estamos en capacidad de asesorarte certeramente para que en un futuro cumplas con los requerimientos y condiciones del banco. Nuestra asesoría es integral y nuestro afán es suplir tu necesidad sea en el momento o a futuro.',
      },
    ],
  }),

  getters: {
    /**
     * Obtiene un servicio por su slug
     */
    getServiceBySlug: (state) => {
      return (slug: string): Service | undefined => {
        return state.services.find((service) => service.slug === slug)
      }
    },

    /**
     * Obtiene un miembro del equipo por email
     */
    getTeamMemberByEmail: (state) => {
      return (email: string): TeamMember | undefined => {
        return state.team.find((member) => member.email === email)
      }
    },

    /**
     * Cantidad total de servicios
     */
    servicesCount: (state): number => {
      return state.services.length
    },

    /**
     * Cantidad total de miembros del equipo
     */
    teamCount: (state): number => {
      return state.team.length
    },

    /**
     * Cantidad total de preguntas frecuentes
     */
    questionsCount: (state): number => {
      return state.questions.length
    },

    /**
     * Obtiene logos filtrados por categoría
     */
    getLogosByCategory: (state) => {
      return (category: 'banco' | 'constructora'): PartnerLogo[] => {
        return state.logos.filter((logo) => logo.category === category)
      }
    },

    /**
     * Obtiene solo logos de bancos
     */
    bankLogos: (state): PartnerLogo[] => {
      return state.logos.filter((logo) => logo.category === 'banco')
    },

    /**
     * Obtiene solo logos de constructoras
     */
    constructoraLogos: (state): PartnerLogo[] => {
      return state.logos.filter((logo) => logo.category === 'constructora')
    },
  },

  actions: {
    /**
     * Agrega un nuevo servicio (para futuras expansiones)
     */
    addService(service: Service) {
      this.services.push(service)
    },

    /**
     * Actualiza un servicio existente
     */
    updateService(slug: string, updates: Partial<Service>) {
      const index = this.services.findIndex((s) => s.slug === slug)
      if (index !== -1) {
        this.services[index] = { ...this.services[index], ...updates }
      }
    },

    /**
     * Agrega un nuevo miembro al equipo
     */
    addTeamMember(member: TeamMember) {
      this.team.push(member)
    },

    /**
     * Actualiza un miembro del equipo
     */
    updateTeamMember(email: string, updates: Partial<TeamMember>) {
      const index = this.team.findIndex((m) => m.email === email)
      if (index !== -1) {
        this.team[index] = { ...this.team[index], ...updates }
      }
    },

    /**
     * Agrega una nueva pregunta frecuente
     */
    addQuestion(question: Question) {
      this.questions.push(question)
    },

    /**
     * Filtra servicios por término de búsqueda
     */
    searchServices(searchTerm: string): Service[] {
      const term = searchTerm.toLowerCase()
      return this.services.filter(
        (service) =>
          service.title.toLowerCase().includes(term) ||
          service.description.toLowerCase().includes(term) ||
          service.content.toLowerCase().includes(term)
      )
    },

    /**
     * Establece los datos pre-llenados para la página de contacto
     * Usado para pasar datos entre páginas sin exponer en URL
     */
    setContactPrefill(data: ContactPrefill) {
      this.contactPrefill = data
    },

    /**
     * Limpia los datos pre-llenados de contacto
     * Debe llamarse después de usar los datos
     */
    clearContactPrefill() {
      this.contactPrefill = null
    },
  },
})
