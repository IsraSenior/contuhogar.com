// Composable para generar carta de pre-aprobación en PDF
// Usa Puppeteer en el servidor para renderizar HTML con Tailwind
import type { SimuladorState, ResultadoCalculo } from '~/types/simulador';

export const usePreApprovalPDF = () => {
  const isGenerating = ref(false);
  const error = ref<string | null>(null);

  /**
   * Genera el PDF de pre-aprobación llamando al API del servidor
   */
  const generatePDF = async (state: SimuladorState): Promise<void> => {
    if (!state.resultado || state.resultado.resultado !== 'aprobado') {
      console.warn('Solo se puede generar PDF para resultados aprobados');
      return;
    }

    isGenerating.value = true;
    error.value = null;

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
      link.download = `Pre-Aprobacion_ConTuHogar_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Error generating PDF:', err);
      error.value = 'Error al generar el PDF. Por favor intenta de nuevo.';
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
    error
  };
};
