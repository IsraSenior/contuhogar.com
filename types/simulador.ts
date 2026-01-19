// Tipos para el Simulador de Crédito ConTuHogar

export type TipoCredito = 'hipotecario' | 'leasing';

export type ResultadoSimulacion = 'aprobado' | 'rechazado' | 'advertencia';

export type TipoObligacion = 'tarjeta_credito' | 'hipotecaria_arriendo' | 'otra';

export interface ObligacionFinanciera {
  id: string;
  tipo: TipoObligacion;
  monto: number;
  descripcion?: string;
}

export interface CodigoPaisTelefono {
  flag: string;
  code: string;
}

export interface DatosPersonales {
  // Información de contacto
  nombres: string | null;
  apellidos: string | null;
  fechaNacimiento: string | null; // Formato: YYYY-MM-DD
  telefono: string | null;
  telefonoCodigo: CodigoPaisTelefono; // Código de país para teléfono
  correo: string | null;

  // Información del crédito
  edad: number | null; // Calculada desde fechaNacimiento
  tipoCredito: TipoCredito | null;
}

export interface DatosBien {
  valorBien: number | null;
  montoSolicitado: number | null;
  plazoMeses: number;
}

export interface DatosIngresos {
  ingresosFijos: number | null;
  ingresosVariables: number;
  deducciones: number;
  obligacionesFinancieras: ObligacionFinanciera[];
}

export interface DatosElegibilidad {
  statusMigratorio: boolean | null;
  reportesNegativos: boolean | null;
}

export interface ResultadoCalculo {
  resultado: ResultadoSimulacion;
  cuotaMensual: number;
  tasaEA: number;
  tasaMensual: number;
  ingresosNetos: number;
  porcentajeCompromiso: number;
  edadFinal: number;
  porcentajeFinanciacion: number;
  montoMaximoViable?: number;
  motivoRechazo?: string;
  recomendaciones?: string[];
}

export interface SimuladorState {
  pasoActual: number;
  datosPersonales: DatosPersonales;
  datosBien: DatosBien;
  datosIngresos: DatosIngresos;
  datosElegibilidad: DatosElegibilidad;
  resultado: ResultadoCalculo | null;
  completado: boolean;

  // Session tracking
  sessionId: string | null;
  sessionStarted: boolean;
}

export interface ValidacionResult {
  valido: boolean;
  errores: string[];
}
