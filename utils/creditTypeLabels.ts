import type { TipoCredito } from '~/types/simulador';

export const CREDIT_TYPE_LABELS: Record<TipoCredito, string> = {
  hipotecario: 'Credito Hipotecario',
  leasing: 'Leasing Habitacional',
  remodelacion: 'Credito de Remodelacion',
  compra_cartera: 'Compra de Cartera',
};

export const getCreditTypeLabel = (tipo: TipoCredito | null | undefined): string => {
  return tipo ? CREDIT_TYPE_LABELS[tipo] ?? 'N/D' : 'N/D';
};
