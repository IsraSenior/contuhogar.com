// Server API endpoint para generar PDF del plan de redes sociales usando Puppeteer
// Navega a la página de preview y genera un PDF multi-página
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { existsSync } from 'node:fs';
import {
  defineEventHandler,
  getRequestHost,
  setResponseHeaders,
  createError,
} from 'h3';

export default defineEventHandler(async (event) => {
  let browser = null;

  try {
    // Obtener la URL base del servidor
    const host = getRequestHost(event, { xForwardedHost: true });
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    // URL de la página de preview (contenido estático)
    const previewUrl = `${baseUrl}/plan-redes-sociales-preview?pdf=1`;
    console.log('Navigating to preview page:', previewUrl);

    // Detectar si estamos en Vercel (serverless)
    const isVercel = !!process.env.VERCEL;

    console.log('Environment:', {
      isVercel,
      nodeEnv: process.env.NODE_ENV,
      platform: process.platform
    });

    // Configuración de Puppeteer según el entorno
    if (isVercel) {
      console.log('Using @sparticuz/chromium for serverless environment');
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      // Desarrollo local: puppeteer-core requiere executablePath explícito
      const localChromePaths = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // macOS
        '/usr/bin/google-chrome', // Linux
        '/usr/bin/chromium-browser', // Linux (Chromium)
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Windows
      ];
      const executablePath = localChromePaths.find((p) => existsSync(p));

      if (!executablePath) {
        throw new Error('No se encontró Chrome/Chromium instalado localmente. Instala Google Chrome para generar PDFs en desarrollo.');
      }

      console.log('Using local Chrome:', executablePath);
      browser = await puppeteer.launch({
        headless: true,
        executablePath,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    const page = await browser.newPage();

    // Configurar viewport para A4 (210mm x 297mm a 96 DPI)
    await page.setViewport({
      width: 794,   // 210mm at 96 DPI
      height: 1123, // 297mm at 96 DPI
      deviceScaleFactor: 2 // Alta resolución
    });

    // Navegar a la página de preview
    await page.goto(previewUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Esperar a que el contenedor esté disponible
    await page.waitForSelector('#pdf-container', { timeout: 10000 });

    // Generar PDF multi-página (8 páginas con page breaks de CSS)
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: true  // Respeta page breaks de CSS
    });

    console.log('PDF generated successfully:', {
      size: pdfBuffer.length,
      timestamp: new Date().toISOString()
    });

    const fileName = 'plan-redes-sociales-febrero-2026-contuhogar.pdf';

    setResponseHeaders(event, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': pdfBuffer.length.toString()
    });

    return pdfBuffer;

  } catch (error) {
    console.error('Error generating PDF:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });

    throw createError({
      statusCode: 500,
      message: 'Error al generar el PDF del plan de redes sociales',
      data: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    // Asegurar que el browser se cierre siempre
    if (browser) {
      try {
        await browser.close();
        console.log('Browser closed successfully');
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }
  }
});
