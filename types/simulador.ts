// Tipos para el Simulador de Crédito ConTuHogar

export type TipoCredito = 'hipotecario' | 'leasing';

export type ResultadoSimulacion = 'aprobado' | 'rechazado' | 'advertencia';

export interface DatosPersonales {
  edad: number | null;
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
  otrasObligaciones: number;
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
}

export interface ValidacionResult {
  valido: boolean;
  errores: string[];
}
