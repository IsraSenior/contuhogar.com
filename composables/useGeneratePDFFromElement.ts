// Composable para generar PDF desde un elemento HTML
// Usa html-to-image + jsPDF en el cliente

export const useGeneratePDFFromElement = () => {
  const isGenerating = ref(false);
  const error = ref<string | null>(null);

  const generatePDF = async (elementId: string, filename: string): Promise<boolean> => {
    if (!import.meta.client) {
      console.warn('PDF generation only works on client side');
      return false;
    }

    isGenerating.value = true;
    error.value = null;

    try {
      // Importar dinámicamente las librerías (solo en cliente)
      const [htmlToImage, jsPDFModule] = await Promise.all([
        import('html-to-image'),
        import('jspdf')
      ]);

      const { jsPDF } = jsPDFModule;

      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Elemento no encontrado');
      }

      // Capturar elemento como PNG usando html-to-image
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });

      // Crear PDF A4
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Dimensiones A4 en mm
      const pdfWidth = 210;
      const pdfHeight = 297;

      // Agregar imagen al PDF
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Guardar PDF
      pdf.save(filename);

      return true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error generando PDF';
      console.error('Error generating PDF:', e);
      return false;
    } finally {
      isGenerating.value = false;
    }
  };

  return { generatePDF, isGenerating, error };
};
