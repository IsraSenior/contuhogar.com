// Composable para generar carta de preaprobación en PDF
// Usa Puppeteer en el servidor para renderizar HTML con Tailwind
import type { SimuladorState, ResultadoCalculo } from '~/types/simulador';

// Tipo de error para manejar rate limit
type PDFErrorType = 'rate_limit' | 'generic' | null;

export const usePreApprovalPDF = () => {
  const isGenerating = ref(false);
  const error = ref<string | null>(null);
  const errorType = ref<PDFErrorType>(null);

  // Auto-clear error después de 8 segundos
  const clearErrorAfterDelay = () => {
    setTimeout(() => {
      error.value = null;
      errorType.value = null;
    }, 8000);
  };

  // Limpiar error manualmente
  const clearError = () => {
    error.value = null;
    errorType.value = null;
  };

  /**
   * Genera el PDF de preaprobación llamando al API del servidor
   */
  const generatePDF = async (state: SimuladorState): Promise<void> => {
    if (!state.resultado || state.resultado.resultado !== 'aprobado') {
      console.warn('Solo se puede generar PDF para resultados aprobados');
      return;
    }

    isGenerating.value = true;
    error.value = null;
    errorType.value = null;

    try {
      // Preparar datos para el API
      const payload = {
        datosPersonales: {
          nombres: state.datosPersonales.nombres,
          apellidos: state.datosPersonales.apellidos,
          correo: state.datosPersonales.correo,
          telefono: state.datosPersonales.telefono,
          tipoCredito: state.datosPersonales.tipoCredito
        },
        datosBien: {
          valorBien: state.datosBien.valorBien,
          montoSolicitado: state.datosBien.montoSolicitado,
          plazoMeses: state.datosBien.plazoMeses
        },
        resultado: {
          cuotaMensual: state.resultado.cuotaMensual,
          tasaEA: state.resultado.tasaEA,
          porcentajeFinanciacion: state.resultado.porcentajeFinanciacion,
          porcentajeCompromiso: state.resultado.porcentajeCompromiso
        }
      };

      // Llamar al API para generar el PDF
      const response = await $fetch('/api/pdf/pre-approval', {
        method: 'POST',
        body: payload,
        responseType: 'blob'
      });

      // Crear URL del blob y descargar
      const blob = new Blob([response as BlobPart], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `preaprobación_ConTuHogar_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (err: any) {
      // Detectar error de rate limit (429)
      const statusCode = err?.response?.status || err?.statusCode || err?.data?.statusCode;

      if (statusCode === 429) {
        errorType.value = 'rate_limit';
        error.value = 'Has alcanzado el límite de descargas. Por favor espera unos minutos antes de intentarlo de nuevo.';
      } else {
        errorType.value = 'generic';
        error.value = 'Error al generar el PDF. Por favor intenta de nuevo.';
        console.error('Error generating PDF:', err);
      }

      clearErrorAfterDelay();
    } finally {
      isGenerating.value = false;
    }
  };

  /**
   * Verifica si se puede generar PDF
   */
  const canGeneratePDF = (resultado: ResultadoCalculo | null): boolean => {
    return resultado?.resultado === 'aprobado';
  };

  return {
    generatePDF,
    canGeneratePDF,
    isGenerating,
    error,
    errorType,
    clearError
  };
};
