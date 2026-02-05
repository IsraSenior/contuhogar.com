// Composable para cálculos del simulador de crédito
import type {
  SimuladorState,
  ResultadoCalculo,
  ValidacionResult,
  ObligacionFinanciera,
  TipoCredito
} from '~/types/simulador';

export const useSimuladorCalculations = () => {
  // Constantes financieras
  const TASA_EA = 0.14; // 14% Efectivo Anual
  const TASA_MENSUAL = Math.pow(1 + TASA_EA, 1/12) - 1;

  // Límites y restricciones
  const EDAD_MINIMA = 18;
  const EDAD_MAXIMA = 74;
  const EDAD_FINAL_MAXIMA = 84;
  const PLAZO_MINIMO = 12; // 1 año mínimo
  const PLAZO_MAXIMO = 240; // 20 años máximo
  const PORCENTAJE_COMPROMISO_MAXIMO = 30; // 30% de ingresos
  const PORCENTAJE_FINANCIACION_HIPOTECARIO = 70; // 70% del valor del bien
  const PORCENTAJE_FINANCIACION_LEASING = 80; // 80% del valor del bien

  /**
   * Calcula el monto mensual de una obligación según su tipo
   */
  const calcularMontoMensualObligacion = (obligacion: ObligacionFinanciera): number => {
    switch (obligacion.tipo) {
      case 'tarjeta_credito':
        // Para tarjetas de crédito, se considera el 3% del cupo utilizado
        return obligacion.monto * 0.03;
      case 'hipotecaria_arriendo':
      case 'otra':
        // Para hipotecaria, arriendo u otra, se considera el monto completo
        return obligacion.monto;
      default:
        return obligacion.monto;
    }
  };

  /**
   * Calcula el total de obligaciones mensuales
   */
  const calcularTotalObligacionesMensuales = (obligaciones: ObligacionFinanciera[]): number => {
    return obligaciones.reduce((total, obligacion) => {
      return total + calcularMontoMensualObligacion(obligacion);
    }, 0);
  };

  /**
   * Calcula la cuota mensual usando la fórmula PMT
   */
  const calcularCuota = (monto: number, plazoMeses: number, tasaMensual: number): number => {
    const r = tasaMensual;
    const n = plazoMeses;
    const numerador = monto * r * Math.pow(1 + r, n);
    const denominador = Math.pow(1 + r, n) - 1;
    return numerador / denominador;
  };

  /**
   * Calcula el monto máximo que puede solicitar según capacidad de pago
   */
  const calcularMontoMaximo = (
    ingresosNetos: number,
    otrasObligaciones: number,
    plazoMeses: number
  ): number => {
    const cuotaMaxima = (ingresosNetos * PORCENTAJE_COMPROMISO_MAXIMO / 100) - otrasObligaciones;

    if (cuotaMaxima <= 0) return 0;

    // Fórmula inversa del PMT para calcular el monto
    const r = TASA_MENSUAL;
    const n = plazoMeses;
    const denominador = r * Math.pow(1 + r, n);
    const numerador = Math.pow(1 + r, n) - 1;

    return (cuotaMaxima * numerador) / denominador;
  };

  /**
   * Valida que la edad + plazo no supere los 84 años
   */
  const validarEdadPlazo = (edad: number, plazoMeses: number): ValidacionResult => {
    const edadFinal = edad + (plazoMeses / 12);

    if (edadFinal > EDAD_FINAL_MAXIMA) {
      const plazoMaximo = Math.floor((EDAD_FINAL_MAXIMA - edad) * 12);
      return {
        valido: false,
        errores: [
          `La edad al finalizar el crédito sería ${Math.round(edadFinal)} años, superando el límite de ${EDAD_FINAL_MAXIMA} años.`,
          `El plazo máximo recomendado es ${plazoMaximo} meses (${Math.floor(plazoMaximo/12)} años).`
        ]
      };
    }

    return { valido: true, errores: [] };
  };

  /**
   * Valida el porcentaje de financiación según tipo de crédito
   */
  const validarFinanciacion = (
    valorBien: number,
    montoSolicitado: number,
    tipoCredito: TipoCredito
  ): ValidacionResult => {
    const porcentaje = (montoSolicitado / valorBien) * 100;
    const limiteMax = tipoCredito === 'leasing'
      ? PORCENTAJE_FINANCIACION_LEASING
      : PORCENTAJE_FINANCIACION_HIPOTECARIO;

    if (porcentaje > limiteMax) {
      const montoMaximo = (valorBien * limiteMax) / 100;
      return {
        valido: false,
        errores: [
          `El monto solicitado representa ${porcentaje.toFixed(1)}% del valor del bien.`,
          `Para crédito ${tipoCredito}, el máximo permitido es ${limiteMax}%.`,
          `Monto máximo: $${Math.floor(montoMaximo).toLocaleString('es-CO')}`
        ]
      };
    }

    return { valido: true, errores: [] };
  };

  /**
   * Valida la capacidad de pago (cuota ≤ 30% de ingresos)
   */
  const validarCapacidadPago = (
    cuotaMensual: number,
    ingresosNetos: number,
    otrasObligaciones: number
  ): ValidacionResult => {
    const totalObligaciones = cuotaMensual + otrasObligaciones;
    const porcentajeCompromiso = (totalObligaciones / ingresosNetos) * 100;

    if (porcentajeCompromiso > PORCENTAJE_COMPROMISO_MAXIMO) {
      return {
        valido: false,
        errores: [
          `La cuota más obligaciones representan ${porcentajeCompromiso.toFixed(1)}% de tus ingresos netos.`,
          `El máximo recomendado es ${PORCENTAJE_COMPROMISO_MAXIMO}% para mantener estabilidad financiera.`
        ]
      };
    }

    return { valido: true, errores: [] };
  };

  /**
   * Calcula el resultado completo de la simulación
   */
  const calculate = (state: SimuladorState): ResultadoCalculo => {
    const { datosPersonales, datosBien, datosIngresos, datosElegibilidad } = state;

    // Verificar elegibilidad básica
    if (datosElegibilidad.statusMigratorio === false) {
      return {
        resultado: 'rechazado',
        cuotaMensual: 0,
        tasaEA: TASA_EA,
        tasaMensual: TASA_MENSUAL,
        ingresosNetos: 0,
        porcentajeCompromiso: 0,
        edadFinal: 0,
        porcentajeFinanciacion: 0,
        motivoRechazo: 'Status migratorio no regular',
        recomendaciones: [
          'Debes tener un estatus migratorio definido y regular para trabajar.',
          'Contacta con las autoridades migratorias de tu país de residencia.',
          'Una vez regularizada tu situación, podrás aplicar a nuestros productos.'
        ]
      };
    }

    if (datosElegibilidad.reportesNegativos === true) {
      return {
        resultado: 'rechazado',
        cuotaMensual: 0,
        tasaEA: TASA_EA,
        tasaMensual: TASA_MENSUAL,
        ingresosNetos: 0,
        porcentajeCompromiso: 0,
        edadFinal: 0,
        porcentajeFinanciacion: 0,
        motivoRechazo: 'Reportes negativos en centrales de riesgo',
        recomendaciones: [
          'Necesitas sanear tu historial crediticio antes de aplicar.',
          'Contacta a las centrales de riesgo de tu país para conocer el estado de tus reportes.',
          'Considera trabajar en mejorar tu score crediticio durante los próximos 12-24 meses.',
          'ContuHogar podrá evaluar tu caso una vez mejore tu situación crediticia.'
        ]
      };
    }

    // Validar edad y plazo
    const validacionEdad = validarEdadPlazo(datosPersonales.edad!, datosBien.plazoMeses);
    if (!validacionEdad.valido) {
      return {
        resultado: 'rechazado',
        cuotaMensual: 0,
        tasaEA: TASA_EA,
        tasaMensual: TASA_MENSUAL,
        ingresosNetos: 0,
        porcentajeCompromiso: 0,
        edadFinal: datosPersonales.edad! + (datosBien.plazoMeses / 12),
        porcentajeFinanciacion: 0,
        motivoRechazo: 'Plazo excede límite de edad',
        recomendaciones: validacionEdad.errores
      };
    }

    // Validar financiación
    const validacionFinanc = validarFinanciacion(
      datosBien.valorBien!,
      datosBien.montoSolicitado!,
      datosPersonales.tipoCredito!
    );
    if (!validacionFinanc.valido) {
      return {
        resultado: 'rechazado',
        cuotaMensual: 0,
        tasaEA: TASA_EA,
        tasaMensual: TASA_MENSUAL,
        ingresosNetos: 0,
        porcentajeCompromiso: 0,
        edadFinal: datosPersonales.edad! + (datosBien.plazoMeses / 12),
        porcentajeFinanciacion: (datosBien.montoSolicitado! / datosBien.valorBien!) * 100,
        motivoRechazo: 'Porcentaje de financiación excede el límite',
        recomendaciones: validacionFinanc.errores
      };
    }

    // Calcular cuota
    const cuotaMensual = calcularCuota(
      datosBien.montoSolicitado!,
      datosBien.plazoMeses,
      TASA_MENSUAL
    );

    // Calcular ingresos netos
    const ingresosNetos =
      (datosIngresos.ingresosFijos || 0) +
      datosIngresos.ingresosVariables -
      datosIngresos.deducciones;

    // Calcular total de obligaciones financieras mensuales
    const totalObligacionesMensuales = calcularTotalObligacionesMensuales(
      datosIngresos.obligacionesFinancieras
    );

    // Validar capacidad de pago
    const totalObligaciones = cuotaMensual + totalObligacionesMensuales;
    const porcentajeCompromiso = (totalObligaciones / ingresosNetos) * 100;

    const validacionCapacidad = validarCapacidadPago(
      cuotaMensual,
      ingresosNetos,
      totalObligacionesMensuales
    );

    if (!validacionCapacidad.valido) {
      // Calcular monto máximo viable
      const montoMaximo = calcularMontoMaximo(
        ingresosNetos,
        totalObligacionesMensuales,
        datosBien.plazoMeses
      );

      return {
        resultado: 'advertencia',
        cuotaMensual,
        tasaEA: TASA_EA,
        tasaMensual: TASA_MENSUAL,
        ingresosNetos,
        porcentajeCompromiso,
        edadFinal: datosPersonales.edad! + (datosBien.plazoMeses / 12),
        porcentajeFinanciacion: (datosBien.montoSolicitado! / datosBien.valorBien!) * 100,
        montoMaximoViable: montoMaximo,
        motivoRechazo: 'Capacidad de pago insuficiente',
        recomendaciones: [
          ...validacionCapacidad.errores,
          `Monto máximo recomendado: $${Math.floor(montoMaximo).toLocaleString('es-CO')}`,
          'Considera aumentar el plazo para reducir la cuota mensual.',
          'O reduce el monto solicitado para ajustarlo a tu capacidad de pago.'
        ]
      };
    }

    // ¡APROBADO!
    return {
      resultado: 'aprobado',
      cuotaMensual,
      tasaEA: TASA_EA,
      tasaMensual: TASA_MENSUAL,
      ingresosNetos,
      porcentajeCompromiso,
      edadFinal: datosPersonales.edad! + (datosBien.plazoMeses / 12),
      porcentajeFinanciacion: (datosBien.montoSolicitado! / datosBien.valorBien!) * 100
    };
  };

  return {
    TASA_EA,
    TASA_MENSUAL,
    EDAD_MINIMA,
    EDAD_MAXIMA,
    EDAD_FINAL_MAXIMA,
    PLAZO_MINIMO,
    PLAZO_MAXIMO,
    PORCENTAJE_COMPROMISO_MAXIMO,
    PORCENTAJE_FINANCIACION_HIPOTECARIO,
    PORCENTAJE_FINANCIACION_LEASING,
    calcularCuota,
    calcularMontoMaximo,
    calcularMontoMensualObligacion,
    calcularTotalObligacionesMensuales,
    validarEdadPlazo,
    validarFinanciacion,
    validarCapacidadPago,
    calculate
  };
};
