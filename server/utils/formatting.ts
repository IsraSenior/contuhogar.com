// server/utils/formatting.ts
// Utilidades de formateo para server routes

/**
 * Formatea un número como moneda colombiana (COP)
 * @param value - Valor numérico a formatear
 * @returns String formateado como moneda COP
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Formatea un número como porcentaje
 * @param value - Valor numérico (0-100)
 * @param decimals - Decimales a mostrar (default: 0)
 * @returns String formateado como porcentaje
 */
export const formatPercentage = (value: number, decimals: number = 0): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Formatea un número con separadores de miles
 * @param value - Valor numérico a formatear
 * @returns String formateado con separadores
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('es-CO').format(value);
};

/**
 * Obtiene emoji según resultado de simulación
 * @param resultado - 'aprobado' | 'rechazado' | 'advertencia'
 * @returns Emoji correspondiente
 */
export const getResultEmoji = (resultado: string): string => {
  switch (resultado) {
    case 'aprobado': return '\u2705'; // check mark
    case 'rechazado': return '\u274C'; // x mark
    case 'advertencia': return '\u26A0\uFE0F'; // warning
    default: return '\uD83D\uDCCA'; // chart
  }
};
