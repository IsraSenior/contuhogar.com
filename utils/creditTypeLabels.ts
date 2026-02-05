import type { TipoCredito } from '~/types/simulador';

export const CREDIT_TYPE_LABELS: Record<TipoCredito, string> = {
  hipotecario: 'Crédito Hipotecario',
  leasing: 'Leasing Habitacional',
  remodelacion: 'Crédito de Remodelación',
  compra_cartera: 'Compra de Cartera',
};

export const getCreditTypeLabel = (tipo: TipoCredito | null | undefined): string => {
  return tipo ? CREDIT_TYPE_LABELS[tipo] ?? 'N/D' : 'N/D';
};
