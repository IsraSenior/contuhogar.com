// Server API endpoint para generar PDF de preaprobación usando Puppeteer
// Navega a la página de preview y captura solo el contenedor A4
import puppeteer from 'puppeteer';
import { z } from 'zod';
import {
  defineEventHandler,
  readBody,
  getRequestHost,
  setResponseHeaders,
  createError,
} from 'h3';

// Schema de validación para los datos del PDF
const PreApprovalDataSchema = z.object({
  datosPersonales: z.object({
    nombres: z.string().nullable(),
    apellidos: z.string().nullable(),
    correo: z.string().nullable(),
    telefono: z.string().nullable(),
    tipoCredito: z.enum(['hipotecario', 'leasing']).nullable()
  }),
  datosBien: z.object({
    valorBien: z.number().nullable(),
    montoSolicitado: z.number().nullable(),
    plazoMeses: z.number()
  }),
  resultado: z.object({
    cuotaMensual: z.number(),
    tasaEA: z.number(),
    porcentajeFinanciacion: z.number(),
    porcentajeCompromiso: z.number()
  })
});

type PreApprovalData = z.infer<typeof PreApprovalDataSchema>;

/**
 * Construye la URL de la página de preview con los datos
 */
const buildPreviewUrl = (data: PreApprovalData, baseUrl: string): string => {
  // Preparar datos para pasar a la página
  const queryData = {
    nombres: data.datosPersonales.nombres || '',
    apellidos: data.datosPersonales.apellidos || '',
    tipoCredito: data.datosPersonales.tipoCredito || 'hipotecario',
    montoSolicitado: data.datosBien.montoSolicitado || 0,
    cuotaMensual: data.resultado.cuotaMensual,
    plazoMeses: data.datosBien.plazoMeses,
    tasaEA: data.resultado.tasaEA,
    porcentajeFinanciacion: data.resultado.porcentajeFinanciacion,
    porcentajeCompromiso: data.resultado.porcentajeCompromiso
  };

  const encodedData = encodeURIComponent(JSON.stringify(queryData));
  return `${baseUrl}/simulador/credito/carta-preaprobacion?pdf=1&data=${encodedData}`;
};

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const data = PreApprovalDataSchema.parse(body);

    // Obtener la URL base del servidor
    const host = getRequestHost(event, { xForwardedHost: true });
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    // Construir URL de la página de preview
    const previewUrl = buildPreviewUrl(data, baseUrl);
    console.log('Navigating to preview page:', previewUrl);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Configurar viewport para A4 (210mm x 297mm a 96 DPI)
    await page.setViewport({
      width: 794, // 210mm at 96 DPI
      height: 1123, // 297mm at 96 DPI
      deviceScaleFactor: 2 // Alta resolución
    });

    // Navegar a la página de preview
    await page.goto(previewUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Esperar a que el contenedor A4 esté disponible
    await page.waitForSelector('#pdf-container', { timeout: 10000 });

    // Obtener el elemento contenedor A4
    const pdfContainer = await page.$('#pdf-container');

    if (!pdfContainer) {
      throw new Error('No se encontró el contenedor PDF');
    }

    // Generar PDF del elemento específico
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });

    await browser.close();

    const fileName = `preaprobación_ConTuHogar_${new Date().toISOString().split('T')[0]}.pdf`;

    setResponseHeaders(event, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': pdfBuffer.length.toString()
    });

    return pdfBuffer;

  } catch (error) {
    console.error('Error generating PDF:', error);

    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: 'Datos inválidos para generar el PDF'
      });
    }

    throw createError({
      statusCode: 500,
      message: 'Error al generar el PDF'
    });
  }
});
