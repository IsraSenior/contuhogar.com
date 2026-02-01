// Composable para generar carta de preaprobación en PDF
// Usa html2canvas + jsPDF en el cliente (no requiere servidor)
import type { SimuladorState, ResultadoCalculo } from '~/types/simulador';

// Tipo de error para manejar errores
type PDFErrorType = 'generic' | null;

export const usePreApprovalPDF = () => {
  const isGenerating = ref(false);
  const error = ref<string | null>(null);
  const errorType = ref<PDFErrorType>(null);
  const router = useRouter();

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
   * Genera el PDF de preaprobación navegando a la página de preview
   * y usando html2canvas + jsPDF para capturar el contenido
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
      // Preparar datos para pasar a la página de preview
      const queryData = {
        nombres: state.datosPersonales.nombres || '',
        apellidos: state.datosPersonales.apellidos || '',
        tipoCredito: state.datosPersonales.tipoCredito || 'hipotecario',
        montoSolicitado: state.datosBien.montoSolicitado || 0,
        cuotaMensual: state.resultado.cuotaMensual,
        plazoMeses: state.datosBien.plazoMeses,
        tasaEA: state.resultado.tasaEA,
        porcentajeFinanciacion: state.resultado.porcentajeFinanciacion,
        porcentajeCompromiso: state.resultado.porcentajeCompromiso
      };

      const encodedData = encodeURIComponent(JSON.stringify(queryData));

      // Navegar a la página de preview con parámetro para auto-descargar
      router.push({
        path: '/simulador/credito/carta-preaprobacion',
        query: {
          data: encodedData,
          download: '1' // Flag para auto-descargar
        }
      });

    } catch (err: unknown) {
      errorType.value = 'generic';
      error.value = 'Error al preparar el PDF. Por favor intenta de nuevo.';
      console.error('Error preparing PDF:', err);
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
