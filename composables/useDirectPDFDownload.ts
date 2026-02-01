// Composable para generar y descargar PDF directamente
// Usa html-to-image + jsPDF en el cliente
import type { SimuladorState } from '~/types/simulador';

// Tipo de error para manejar errores
type PDFErrorType = 'generic' | 'module_load' | null;

// Logo SVG inline (versión white para header)
const LOGO_SVG_WHITE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -40 847.26 181.29" style="height: 40px; width: auto;">
  <g>
    <path fill="white" d="M71.28,16.36c-5.2-2.52-11.98-3.47-19.55-3.47-22.87,0-35.95,16.87-35.95,43.52,0,25.23,14.03,46.52,42.1,46.52,6.78,0,13.4-1.73,17.35-5.36,3.94-3.15,7.73-8.52,11.83-15.45.79,0,3.47,1.42,3.78,2.52-1.58,6.78-8.36,19.08-11.98,21.29-4.57,1.58-14.51,3.94-24.13,3.94C19.55,109.87,0,90.63,0,57.83,0,40.8,7.73,23.77,25.07,14.47c8.36-4.57,18.61-7.25,32.01-7.25s23.97,2.68,31.07,3.15c-.95,5.52-2.37,17.19-2.52,24.28-.63.63-4.73,1.1-4.89.32-1.58-12.62-3.63-15.77-9.46-18.61Z"/>
    <path fill="white" d="M91.75,88.28c-7.51-8.03-10.76-18.27-10.76-29.03,0-9.22,2.73-17.59,8.03-24.08,7-9.22,19.98-15.37,34.16-15.37,25.62,0,39.11,18.62,39.11,38.43,0,10.59-2.56,18.27-7.86,25.11-8.03,11.1-20.15,16.05-33.47,16.05s-22.37-4.27-29.2-11.1ZM147.08,62.15c0-18.44-8.37-36.38-28.01-36.38-15.88,0-22.54,14.35-22.54,30.23,0,19.3,9.39,36.89,28.69,36.89,15.88,0,21.86-14.86,21.86-30.74Z"/>
    <path fill="white" d="M182.05,22.02c.51,1.37,1.37,2.56,4.61,6.66,12.64,15.71,35.18,42.87,41.16,49.7.17.17.34,0,.51-.17,0-16.74-.17-35.18-.51-43.72-.34-3.76-1.37-5.81-5.12-6.66-2.05-.51-5.47-.85-9.05-1.37-.68-.51-.51-4.44,0-4.95,3.07,0,10.42.51,18.1.51,7.17,0,13.83-.51,15.54-.51.68.51.51,4.44,0,4.95-2.56.17-5.64.68-7.17,1.2-3.25,1.2-3.93,3.07-4.1,6.32-.51,9.22-.68,30.57-.85,46.97,0,5.47.17,12.98.34,17.08-2.73-.34-8.2-.34-10.76,0-5.98-8.37-39.11-49.87-46.8-59.43-.17-.17-.51,0-.51,0-.17,12.64,0,38.6.34,45.6.17,4.78,1.88,5.81,5.12,7,1.71.51,4.95,1.02,8.03,1.37.68.51.51,4.27-.17,4.95-2.9,0-10.59-.51-17.42-.51-8.37,0-13.32.51-16.4.51-.85-.51-.85-4.27,0-4.95,2.39-.34,5.81-.51,8.03-1.37,2.9-1.03,3.93-3.07,4.27-6.66.51-6.32.85-23.57.85-49.53,0-2.05-.68-4.44-3.25-5.98-2.39-1.2-5.47-2.05-10.93-2.56-.68-.51-.51-4.44.17-4.95,3.93,0,10.76.51,17.76.51h8.2Z"/>
    <path fill="white" d="M271.62,91.36c3.93-.85,4.95-3.07,5.12-8.71.34-9.39.34-33.13.34-53.28,0-.34-.34-1.02-.68-1.02-2.22-.17-10.25,0-13.66.17-2.39.17-4.61,1.71-6.15,4.44-1.54,2.73-3.07,6.66-4.95,11.95-.85.51-4.61-.34-5.12-1.02,1.2-5.29,2.22-17.76,2.56-23.23.17-.17,1.71-.68,2.05-.34,2.73,1.2,5.47,1.71,10.08,1.71h48.68c4.61,0,7-.34,10.76-1.71.34-.17,1.71.34,1.71.85-1.2,4.61-2.22,17.08-2.73,23.57-.51.51-4.78.51-5.12,0-.68-4.61-1.71-9.22-2.73-11.95-1.2-2.9-2.9-4.1-5.63-4.27-4.27-.17-11.78-.17-14.52-.17-.51.17-.68.85-.68,1.2,0,17.93-.17,50.21.34,56.36.34,2.39,1.2,4.44,4.1,5.29,2.05.51,4.95.85,9.39,1.37.51.51.17,4.61-.51,4.95-5.29-.17-14.69-.51-21.69-.51-10.08,0-17.25.51-20.32.51-.51-.51-.51-4.44,0-4.95,3.93-.51,7.34-.85,9.39-1.2Z"/>
    <path fill="white" d="M322.93,21.51c2.22,0,8.2.51,18.27.51,7.34,0,14.86-.51,18.1-.51.51.85.51,4.27,0,4.95-2.56.17-5.29.68-6.83,1.02-2.9,1.02-3.76,2.05-3.93,6.15-.17,12.13-.17,26.3,0,32.62.34,5.47,1.02,9.56,2.39,12.13,2.22,6.83,8.71,12.47,19.81,12.47,9.56,0,18.96-3.07,20.15-21.52.68-9.22.68-21.18.17-33.82-.17-5.98-1.71-7.17-5.98-8.03-1.88-.51-4.27-.68-7-1.02-.85-.68-.85-4.44,0-4.95,2.05,0,9.39.51,17.42.51s12.98-.51,15.03-.51c.68.51.85,3.93,0,4.95-1.71.17-4.44.68-6.32,1.2-3.42.85-4.78,2.73-4.78,8.71-.68,25.62-.34,33.64-2.9,42.36-3.76,14.86-16.05,20.49-30.4,20.49-19.81,0-29.38-8.88-31.08-22.89-.85-7.86-.51-36.72-.85-42.7-.17-3.24-.85-5.12-3.59-5.81-1.37-.51-5.63-1.2-7.86-1.37-.51-.85-.68-4.44.17-4.95Z"/>
    <path fill="white" d="M530.84,88.28c-7.52-8.03-10.76-18.27-10.76-29.03,0-9.22,2.73-17.59,8.03-24.08,7-9.22,19.98-15.37,34.16-15.37,25.62,0,39.11,18.62,39.11,38.43,0,10.59-2.56,18.27-7.86,25.11-8.03,11.1-20.15,16.05-33.47,16.05s-22.37-4.27-29.2-11.1ZM586.17,62.15c0-18.44-8.37-36.38-28.01-36.38-15.88,0-22.54,14.35-22.54,30.23,0,19.3,9.39,36.89,28.69,36.89,15.88,0,21.86-14.86,21.86-30.74Z"/>
    <path fill="white" d="M679.57,94.6c-4.44,1.2-18.62,4.61-29.89,4.61-29.38,0-43.89-15.2-43.89-39.96,0-16.05,8.37-28.86,22.2-34.84,7-3.24,15.54-4.61,25.45-4.61,5.63,0,12.3.85,15.88,1.2,3.59.51,7.17,1.02,9.22,1.02-1.03,5.29-1.71,15.71-1.88,21.35-.34.68-4.27,1.02-4.95.34-1.37-8.03-2.73-12.47-6.66-15.03-3.76-2.22-8.71-3.42-16.22-3.42-18.96,0-27.5,13.66-27.5,32.62,0,21.35,11.61,35.86,31.94,35.86,3.42,0,5.98-.85,7.51-2.05,1.37-.85,2.05-2.56,2.22-3.93.34-3.59.17-8.03.17-12.13s-1.2-5.29-4.44-6.32c-2.22-.34-5.29-.85-8.88-1.37-.68-.51-.51-4.27,0-4.61,3.76,0,12.13.51,19.81.51s12.13-.34,14.52-.51c.51.68.68,4.27,0,4.78-1.54.17-3.25.68-4.27,1.02-2.56.68-3.07,2.05-3.24,5.64-.17,3.76-.34,10.76,0,12.98.17,1.71.68,2.39,3.24,3.42.34.68.17,2.9-.34,3.42Z"/>
    <path fill="white" d="M696.26,81.45c5.64-11.61,17.08-40.13,21.52-52.09.85-2.56,1.88-5.81,2.22-7.69.51.17,2.05.34,5.47.34s4.44-.17,5.12-.34c.51,1.71,1.54,4.61,2.39,6.83,2.56,7.34,16.74,44.4,21.18,54.31,3.76,7.69,4.78,8.37,14.86,9.74.68.51.17,4.27-.17,4.95-2.9,0-9.22-.51-17.59-.51-9.56,0-15.88.51-18.62.51-.51-.51-.68-4.44,0-4.95,2.05-.17,4.61-.51,6.32-1.02,2.05-.68,2.22-2.22,1.88-3.59-1.71-5.29-4.61-12.64-6.83-18.1-.17-.34-.85-.68-1.02-.68-1.88-.17-6.32-.17-12.13-.17-8.03,0-9.39,0-10.59.17-.68,0-1.54.85-1.54,1.2-2.56,6.49-5.47,13.83-5.81,16.4-.17,2.22-.17,3.76,3.59,4.78,1.54.34,3.93.68,6.49,1.02.51.51.34,4.1-.34,4.95-2.39,0-10.25-.51-17.59-.51s-12.3.51-14.52.51c-.68-.68-.51-4.44,0-4.95,9.39-1.37,11.44-1.88,15.71-11.1ZM712.32,61.3c0,.34.17.68.51.68,1.2.17,3.76.17,8.71.17,3.07,0,7.17,0,8.88-.17.17,0,.68-.34.51-.85-3.07-8.71-7-19.47-9.05-24.59-.17-.17-.51,0-.68.17-2.05,6.15-6.32,17.25-8.88,24.59Z"/>
    <path fill="white" d="M764.19,21.51c2.9,0,12.13.51,16.4.51,9.22,0,18.96-.17,24.08-.17,15.37,0,22.88,8.71,22.88,19.13s-7.34,16.4-14.69,19.3c-.34.34-.17.85-.17,1.02,4.27,6.83,14.17,19.47,20.49,25.62,4.44,4.61,7.17,5.12,13.83,6.15.51.34.17,4.61-.68,4.78-5.47.17-17.08,0-21.52-2.22-1.88-.85-3.93-2.22-6.15-4.78-4.78-5.47-12.98-17.59-17.59-24.25-.85-1.37-2.39-2.05-3.76-2.05-1.71-.17-5.12,0-7,0-.34,0-.51.51-.51.68,0,6.66,0,16.22.34,20.32.34,4.1,1.2,4.95,4.1,5.81,1.71.51,4.95,1.02,8.2,1.37.68.51.34,4.27-.17,4.78-3.07,0-11.44-.51-19.64-.51-7.17,0-16.05.51-18.79.51-.51-.68-.68-4.44,0-4.78,2.56-.34,6.49-.85,7.86-1.2,2.9-.85,4.27-2.22,4.44-6.83.17-2.73.34-17.42.34-24.08,0-12.98,0-24.08-.17-27.5-.17-3.42-1.2-4.78-4.1-5.47-2.22-.51-5.47-1.02-8.2-1.2-.68-.68-.34-4.61.17-4.95ZM789.98,29.7c-.17,4.27-.17,18.79-.17,27.67,0,.51.34,1.03.85,1.03,3.76.17,11.78.34,15.03-.68,4.27-1.2,8.37-5.12,8.37-13.32,0-11.61-6.66-16.91-18.45-16.91-1.02,0-3.24,0-4.61.68-.34,0-1.02,1.2-1.02,1.54Z"/>
  </g>
  <g>
    <circle fill="white" cx="479.96" cy="52.86" r="8.94" transform="translate(103.2 354.86) rotate(-45)"/>
    <g>
      <path fill="#ea6f00" d="M468.76,48.74c-.05,0-.1,0-.16,0-25.06,0-28.17-.17-29.38-.35-.52-.17-.86-1.04-.86-1.73,0-16.94-.17-25.75.17-32.15.17-5.53,1.38-6.91,4.84-7.95,1.9-.52,5.19-1.04,8.3-1.56.69-.52.69-3.97.17-4.84-4.84,0-10.02.52-21.6.52-9.33,0-17.98-.52-22.12-.52-.69.69-.86,4.15-.17,4.84,4.67.69,7.78,1.04,10.37,1.9,3.46.86,4.49,2.77,4.84,7.61.17,3.11.35,21.43.35,38.2,0,15.04-.17,29.73-.17,35.6-.52,7.95-1.04,11.06-6.05,12.62-2.42.52-5.19,1.04-9.33,1.56-.52.69-.52,4.32.17,5.01,3.46,0,12.79-.52,22.99-.52,11.06,0,19.18.52,22.47.52.69-.35,1.38-4.15.69-5.01-5.18-.69-7.78-1.38-10.37-2.07-4.32-1.21-5.01-3.63-5.36-9.51-.17-3.63-.17-23.51-.17-33.01,0-.17.17-1.04.52-1.04,1.73-.17,15.9-.17,29.38-.17h.4c-.41-1.21-.64-2.49-.64-3.83,0-1.45.27-2.83.75-4.12Z"/>
      <path fill="#ea6f00" d="M528.06,102.49c-5.36-.52-8.64-1.04-11.06-1.9-3.28-1.04-4.32-2.94-4.84-7.78-.35-5.88-.35-24.89-.35-39.93,0-20.57,0-30.76.35-36.81.35-6.22,1.04-8.12,4.84-9.33,2.25-.69,5.19-1.21,8.99-1.73.69-.69.52-4.15,0-4.84-2.77,0-12.79.52-21.43.52-9.16,0-17.63-.69-21.6-.69-.86.86-1.04,4.32-.17,5.01,4.49.52,7.6,1.04,10.2,1.9,2.42.86,3.29,2.94,3.46,5.7.35,6.22.35,25.75.35,34.74,0,.35-.52,1.04-1.04,1.04-.62.07-2.02.11-4.66.15.52,1.34.82,2.79.82,4.32,0,1.37-.24,2.68-.67,3.91,2.07.02,3.67.06,4.51.1.52,0,1.04.69,1.04,1.21,0,10.89,0,29.73-.17,34.74-.35,5.36-1.38,7.09-4.49,7.95-2.76.86-5.36,1.21-9.85,1.73-.69.86-.69,4.32,0,5.01,4.49-.17,13.14-.52,21.95-.52s17.98.52,23.16.52c1.04-.52,1.21-4.32.69-5.01Z"/>
    </g>
  </g>
</svg>`;

// Helper para detectar si es un error de carga de módulo dinámico
const isModuleLoadError = (e: unknown): boolean => {
  if (e instanceof Error) {
    const message = e.message.toLowerCase();
    return (
      message.includes('failed to fetch dynamically imported module') ||
      message.includes('loading chunk') ||
      message.includes('loading css chunk') ||
      message.includes('failed to load') ||
      message.includes('dynamically imported module')
    );
  }
  return false;
};

// Helper para importar módulos con retry
const importWithRetry = async <T>(
  importFn: () => Promise<T>,
  retries = 2,
  delay = 1000
): Promise<T> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await importFn();
    } catch (e) {
      if (attempt === retries) {
        throw e;
      }
      // Si es error de módulo, esperar antes de reintentar
      if (isModuleLoadError(e)) {
        console.warn(`[PDF] Module load failed, retrying in ${delay}ms... (attempt ${attempt + 1}/${retries + 1})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        // Incrementar delay para siguiente intento
        delay *= 1.5;
      } else {
        // Si no es error de módulo, lanzar inmediatamente
        throw e;
      }
    }
  }
  throw new Error('Max retries exceeded');
};

export const useDirectPDFDownload = () => {
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
   * Convierte una imagen a base64
   */
  const imageToBase64 = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } else {
          reject(new Error('No canvas context'));
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = url;
    });
  };

  /**
   * Genera y descarga el PDF directamente sin navegar
   */
  const downloadPDF = async (state: SimuladorState): Promise<boolean> => {
    if (!import.meta.client) {
      console.warn('PDF generation only works on client side');
      return false;
    }

    if (!state.resultado || state.resultado.resultado !== 'aprobado') {
      console.warn('Solo se puede generar PDF para resultados aprobados');
      return false;
    }

    isGenerating.value = true;
    error.value = null;
    errorType.value = null;

    let container: HTMLDivElement | null = null;

    try {
      // Cargar imagen de Fernando como base64
      let fernandoImageBase64 = '';
      try {
        fernandoImageBase64 = await imageToBase64('/team/fernando-munoz.avif');
      } catch (e) {
        console.warn('Could not load Fernando image, using placeholder');
      }

      // Importar dinámicamente las librerías con retry para manejar errores de cache/red
      const [htmlToImage, jsPDFModule] = await Promise.all([
        importWithRetry(() => import('html-to-image')),
        importWithRetry(() => import('jspdf'))
      ]);

      const { jsPDF } = jsPDFModule;

      // Preparar datos para el template
      const data = {
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

      // Generar número de documento
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const random = Math.random().toString(36).substring(2, 8).toUpperCase();
      const docNumber = `CTH-${year}${month}${day}-${random}`;

      // Formatear fechas
      const currentDate = date.toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const expirationDate = new Date(date);
      expirationDate.setDate(expirationDate.getDate() + 30);
      const expirationDateStr = expirationDate.toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      // Crear contenedor offscreen con el template HTML
      container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: 794px;
        height: 1123px;
        background: white;
        font-family: system-ui, -apple-system, sans-serif;
      `;

      // Formatear moneda
      const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      };

      // Tipo de crédito label
      const tipoCreditoLabel = data.tipoCredito === 'hipotecario'
        ? 'Crédito Hipotecario'
        : 'Leasing Habitacional';

      // Nombre completo
      const nombreCompleto = `${data.nombres} ${data.apellidos}`.trim() || 'Estimado Cliente';

      // Imagen de Fernando (base64 o placeholder)
      const fernandoImage = fernandoImageBase64
        ? `<img src="${fernandoImageBase64}" alt="Fernando Muñoz Tatar" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover;"/>`
        : `<div style="width: 40px; height: 40px; background: #374151; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">FM</div>`;

      // Colores correctos del brand
      const PRIMARY = '#0f172b';  // Dark blue from main.css
      const SECONDARY = '#ea6f00'; // Orange from Logo.vue
      const GREEN = '#16a34a';    // Green for positive indicators

      // Template HTML con estilos inline (sin oklch)
      container.innerHTML = `
        <div style="width: 794px; height: 1123px; background: white; position: relative; overflow: hidden; font-family: system-ui, -apple-system, sans-serif;">
          <!-- Header -->
          <div style="background: ${PRIMARY}; padding: 20px 32px; display: flex; justify-content: space-between; align-items: center;">
            ${LOGO_SVG_WHITE}
            <div style="text-align: right;">
              <p style="font-size: 10px; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 1px; margin: 0;">Carta de preaprobación</p>
              <p style="font-size: 12px; font-weight: 500; color: white; margin: 4px 0 0 0;">${docNumber}</p>
              <p style="font-size: 10px; color: rgba(255,255,255,0.7); margin: 2px 0 0 0;">${currentDate}</p>
            </div>
          </div>

          <!-- Main Content -->
          <div style="padding: 20px 32px;">
            <!-- Título -->
            <div style="text-align: center; margin-bottom: 40px; margin-top: 20px;">
              <h1 style="font-size: 28px; font-weight: bold; color: ${PRIMARY}; margin: 0 0 4px 0;">¡Felicitaciones, ${nombreCompleto}!</h1>
              <p style="color: #6b7280; margin: 0;">Has sido preaprobado para tu crédito de vivienda en Colombia</p>
            </div>

            <!-- Datos principales -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
              <div style="background: ${PRIMARY}; border-radius: 8px; padding: 16px;">
                <p style="font-size: 11px; color: rgba(255,255,255,0.9); font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0;">Monto preaprobado</p>
                <p style="font-size: 22px; font-weight: bold; color: white; margin: 0;">${formatCurrency(data.montoSolicitado)}</p>
              </div>
              <div style="background: ${GREEN}; border-radius: 8px; padding: 16px;">
                <p style="font-size: 11px; color: rgba(255,255,255,0.9); font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0;">Cuota mensual estimada</p>
                <p style="font-size: 22px; font-weight: bold; color: white; margin: 0;">${formatCurrency(data.cuotaMensual)}</p>
              </div>
            </div>

            <!-- Tabla de detalles -->
            <div style="background: #f3f4f6; border-radius: 8px; overflow: hidden; margin-bottom: 40px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; border-bottom: 1px solid rgba(15,23,43,0.1);">
                <span style="color: ${PRIMARY}; font-size: 14px;">Modalidad de crédito</span>
                <span style="font-weight: 500; color: ${PRIMARY}; font-size: 14px;">${tipoCreditoLabel}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; border-bottom: 1px solid rgba(15,23,43,0.1);">
                <span style="color: ${PRIMARY}; font-size: 14px;">Plazo del crédito</span>
                <span style="font-weight: 500; color: ${PRIMARY}; font-size: 14px;">${data.plazoMeses} meses (${Math.floor(data.plazoMeses / 12)} años)</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; border-bottom: 1px solid rgba(15,23,43,0.1);">
                <span style="color: ${PRIMARY}; font-size: 14px;">Tasa de interés (E.A.)</span>
                <span style="font-weight: 500; color: ${PRIMARY}; font-size: 14px;">${(data.tasaEA * 100).toFixed(2)}%</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; border-bottom: 1px solid rgba(15,23,43,0.1);">
                <span style="color: ${PRIMARY}; font-size: 14px;">Financiación del inmueble</span>
                <span style="font-weight: 500; color: ${PRIMARY}; font-size: 14px;">${Math.ceil(data.porcentajeFinanciacion)}%</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 16px;">
                <span style="color: ${PRIMARY}; font-size: 14px;">Compromiso de ingresos</span>
                <span style="font-weight: 500; color: ${GREEN}; font-size: 14px;">${Math.ceil(data.porcentajeCompromiso)}%</span>
              </div>
              ${data.tipoCredito === 'leasing' ? `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; border-top: 1px solid rgba(15,23,43,0.1);">
                <span style="color: ${PRIMARY}; font-size: 14px;">Opción de compra</span>
                <span style="font-weight: 500; color: ${PRIMARY}; font-size: 14px;">10% del valor del inmueble</span>
              </div>
              ` : ''}
            </div>

            <!-- Condiciones -->
            <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px; margin-bottom: 40px;">
              <div style="display: flex; align-items: flex-start; gap: 8px;">
                <svg style="width: 16px; height: 16px; color: #d97706; flex-shrink: 0; margin-top: 2px;" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                <div>
                  <h4 style="font-weight: 600; color: ${PRIMARY}; font-size: 16px; margin: -4px 0 4px 0;">Condiciones y vigencia</h4>
                  <ul style="margin: 0; padding: 0; list-style: none;">
                    <li style="font-size: 13px; color: ${PRIMARY}; margin-bottom: 2px;">• <strong>Vigencia:</strong> válida hasta el ${expirationDateStr} (30 días).</li>
                    <li style="font-size: 13px; color: ${PRIMARY}; margin-bottom: 2px;">• Sujeta a verificación de documentos y análisis crediticio.</li>
                    <li style="font-size: 13px; color: ${PRIMARY};">• Este simulador tiene fines exclusivamente informativos y no constituye una oferta ni aprobación de crédito. La entidad financiera que usted elija será la única responsable de realizar el estudio, evaluación y aprobación definitiva de su solicitud.</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- CTA y Asesor -->
            <div style="background: ${PRIMARY}; border-radius: 8px; padding: 16px; margin-bottom: 40px;">
              <div style="text-align: center; margin-bottom: 12px;">
                <h3 style="font-size: 18px; font-weight: bold; color: white; margin: 0 0 2px 0;">¿Listo para continuar?</h3>
                <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 0;">Contacta a tu asesor asignado para completar tu solicitud</p>
              </div>
              <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 12px;">
                ${fernandoImage}
                <div style="flex: 1;">
                  <p style="font-weight: 600; color: white; font-size: 14px; margin: 0;">Fernando Muñoz Tatar</p>
                  <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 0;">Director Comercial</p>
                </div>
                <div style="text-align: right;">
                  <p style="color: white; font-size: 13px; margin: 0;">directorcomercial@contuhogar.com</p>
                  <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 0;">COL: +57 301 241 8074 | USA: +1 718 521 4701</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: ${PRIMARY}; padding: 20px 32px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <p style="font-size: 9px; color: white; margin: 0;">www.contuhogar.com</p>
              <p style="font-size: 9px; color: white; margin: 0;">Especialistas en crédito de vivienda para colombianos en el exterior</p>
              <p style="font-size: 9px; color: white; margin: 0;">© ${new Date().getFullYear()} ConTuHogar</p>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(container);

      // Esperar a que el DOM se actualice
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capturar como PNG usando html-to-image (sin cargar fuentes externas)
      const dataUrl = await htmlToImage.toPng(container.firstElementChild as HTMLElement, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        skipFonts: true // Evitar error de CSP con Google Fonts
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

      // Generar nombre del archivo
      const filename = `preaprobación_ConTuHogar_${new Date().toISOString().split('T')[0]}.pdf`;

      // Guardar PDF
      pdf.save(filename);

      return true;
    } catch (e) {
      console.error('Error generating PDF:', e);

      // Detectar si es error de carga de módulo dinámico
      if (isModuleLoadError(e)) {
        errorType.value = 'module_load';
        error.value = 'Error al cargar los recursos. Por favor, recarga la página e intenta de nuevo.';
      } else {
        errorType.value = 'generic';
        error.value = e instanceof Error ? e.message : 'Error generando PDF';
      }

      clearErrorAfterDelay();
      return false;
    } finally {
      // Limpiar el contenedor
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
      isGenerating.value = false;
    }
  };

  /**
   * Verifica si se puede generar PDF
   */
  const canDownloadPDF = (resultado: SimuladorState['resultado']): boolean => {
    return resultado?.resultado === 'aprobado';
  };

  return {
    downloadPDF,
    canDownloadPDF,
    isGenerating,
    error,
    errorType,
    clearError
  };
};
