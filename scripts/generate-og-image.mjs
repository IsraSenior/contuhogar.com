/**
 * Script para generar la imagen OG (Open Graph) para ContuHogar
 * Dimensiones: 1200x630px (estandar OG)
 * Formato: JPG
 *
 * Uso: node scripts/generate-og-image.mjs
 */

import puppeteer from 'puppeteer-core';
import { existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, '..', 'public', 'og-image.jpg');

// Colores de la marca ContuHogar (extraidos de main.css y Logo.vue)
const COLORS = {
  primary: '#0f172b',    // Navy oscuro (cls-2 del logo)
  secondary: '#ea6f00',  // Naranja (cls-1 del logo)
  white: '#ffffff',
  gray: '#64748b'
};

// HTML template para la imagen OG
const htmlTemplate = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      width: 1200px;
      height: 630px;
      font-family: 'Roboto', system-ui, sans-serif;
      background: linear-gradient(135deg, ${COLORS.primary} 0%, #1e293b 50%, ${COLORS.primary} 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 60px;
      position: relative;
      overflow: hidden;
    }

    /* Decorative elements */
    .decoration-circle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.1;
    }

    .circle-1 {
      width: 400px;
      height: 400px;
      background: ${COLORS.secondary};
      top: -100px;
      right: -100px;
    }

    .circle-2 {
      width: 300px;
      height: 300px;
      background: ${COLORS.secondary};
      bottom: -80px;
      left: -80px;
    }

    .circle-3 {
      width: 200px;
      height: 200px;
      background: white;
      bottom: 100px;
      right: 150px;
      opacity: 0.05;
    }

    /* Orange accent bar */
    .accent-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      background: ${COLORS.secondary};
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      z-index: 10;
    }

    /* Logo SVG */
    .logo {
      width: 400px;
      height: auto;
      margin-bottom: 40px;
    }

    .logo .cls-1 {
      fill: ${COLORS.secondary};
    }

    .logo .cls-2 {
      fill: ${COLORS.white};
    }

    .tagline {
      font-size: 42px;
      font-weight: 700;
      color: ${COLORS.white};
      margin-bottom: 20px;
      line-height: 1.2;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .subtitle {
      font-size: 26px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: 40px;
    }

    .highlight {
      color: ${COLORS.secondary};
      font-weight: 700;
    }

    /* Bottom section with services */
    .services {
      display: flex;
      gap: 30px;
      margin-top: 20px;
    }

    .service-badge {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 12px 24px;
      border-radius: 30px;
      color: ${COLORS.white};
      font-size: 16px;
      font-weight: 500;
      backdrop-filter: blur(10px);
    }

    /* Website URL */
    .url {
      position: absolute;
      bottom: 30px;
      font-size: 20px;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 500;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <!-- Decorative elements -->
  <div class="decoration-circle circle-1"></div>
  <div class="decoration-circle circle-2"></div>
  <div class="decoration-circle circle-3"></div>
  <div class="accent-bar"></div>

  <div class="content">
    <!-- Logo ContuHogar SVG -->
    <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 847.26 181.29">
      <g>
        <g>
          <g>
            <path class="cls-2" d="M71.28,16.36c-5.2-2.52-11.98-3.47-19.55-3.47-22.87,0-35.95,16.87-35.95,43.52,0,25.23,14.03,46.52,42.1,46.52,6.78,0,13.4-1.73,17.35-5.36,3.94-3.15,7.73-8.52,11.83-15.45.79,0,3.47,1.42,3.78,2.52-1.58,6.78-8.36,19.08-11.98,21.29-4.57,1.58-14.51,3.94-24.13,3.94C19.55,109.87,0,90.63,0,57.83,0,40.8,7.73,23.77,25.07,14.47c8.36-4.57,18.61-7.25,32.01-7.25s23.97,2.68,31.07,3.15c-.95,5.52-2.37,17.19-2.52,24.28-.63.63-4.73,1.1-4.89.32-1.58-12.62-3.63-15.77-9.46-18.61Z"/>
            <path class="cls-2" d="M91.75,88.28c-7.51-8.03-10.76-18.27-10.76-29.03,0-9.22,2.73-17.59,8.03-24.08,7-9.22,19.98-15.37,34.16-15.37,25.62,0,39.11,18.62,39.11,38.43,0,10.59-2.56,18.27-7.86,25.11-8.03,11.1-20.15,16.05-33.47,16.05s-22.37-4.27-29.2-11.1ZM147.08,62.15c0-18.44-8.37-36.38-28.01-36.38-15.88,0-22.54,14.35-22.54,30.23,0,19.3,9.39,36.89,28.69,36.89,15.88,0,21.86-14.86,21.86-30.74Z"/>
            <path class="cls-2" d="M182.05,22.02c.51,1.37,1.37,2.56,4.61,6.66,12.64,15.71,35.18,42.87,41.16,49.7.17.17.34,0,.51-.17,0-16.74-.17-35.18-.51-43.72-.34-3.76-1.37-5.81-5.12-6.66-2.05-.51-5.47-.85-9.05-1.37-.68-.51-.51-4.44,0-4.95,3.07,0,10.42.51,18.1.51,7.17,0,13.83-.51,15.54-.51.68.51.51,4.44,0,4.95-2.56.17-5.64.68-7.17,1.2-3.25,1.2-3.93,3.07-4.1,6.32-.51,9.22-.68,30.57-.85,46.97,0,5.47.17,12.98.34,17.08-2.73-.34-8.2-.34-10.76,0-5.98-8.37-39.11-49.87-46.8-59.43-.17-.17-.51,0-.51,0-.17,12.64,0,38.6.34,45.6.17,4.78,1.88,5.81,5.12,7,1.71.51,4.95,1.02,8.03,1.37.68.51.51,4.27-.17,4.95-2.9,0-10.59-.51-17.42-.51-8.37,0-13.32.51-16.4.51-.85-.51-.85-4.27,0-4.95,2.39-.34,5.81-.51,8.03-1.37,2.9-1.03,3.93-3.07,4.27-6.66.51-6.32.85-23.57.85-49.53,0-2.05-.68-4.44-3.25-5.98-2.39-1.2-5.47-2.05-10.93-2.56-.68-.51-.51-4.44.17-4.95,3.93,0,10.76.51,17.76.51h8.2Z"/>
            <path class="cls-2" d="M271.62,91.36c3.93-.85,4.95-3.07,5.12-8.71.34-9.39.34-33.13.34-53.28,0-.34-.34-1.02-.68-1.02-2.22-.17-10.25,0-13.66.17-2.39.17-4.61,1.71-6.15,4.44-1.54,2.73-3.07,6.66-4.95,11.95-.85.51-4.61-.34-5.12-1.02,1.2-5.29,2.22-17.76,2.56-23.23.17-.17,1.71-.68,2.05-.34,2.73,1.2,5.47,1.71,10.08,1.71h48.68c4.61,0,7-.34,10.76-1.71.34-.17,1.71.34,1.71.85-1.2,4.61-2.22,17.08-2.73,23.57-.51.51-4.78.51-5.12,0-.68-4.61-1.71-9.22-2.73-11.95-1.2-2.9-2.9-4.1-5.63-4.27-4.27-.17-11.78-.17-14.52-.17-.51.17-.68.85-.68,1.2,0,17.93-.17,50.21.34,56.36.34,2.39,1.2,4.44,4.1,5.29,2.05.51,4.95.85,9.39,1.37.51.51.17,4.61-.51,4.95-5.29-.17-14.69-.51-21.69-.51-10.08,0-17.25.51-20.32.51-.51-.51-.51-4.44,0-4.95,3.93-.51,7.34-.85,9.39-1.2Z"/>
            <path class="cls-2" d="M322.93,21.51c2.22,0,8.2.51,18.27.51,7.34,0,14.86-.51,18.1-.51.51.85.51,4.27,0,4.95-2.56.17-5.29.68-6.83,1.02-2.9,1.02-3.76,2.05-3.93,6.15-.17,12.13-.17,26.3,0,32.62.34,5.47,1.02,9.56,2.39,12.13,2.22,6.83,8.71,12.47,19.81,12.47,9.56,0,18.96-3.07,20.15-21.52.68-9.22.68-21.18.17-33.82-.17-5.98-1.71-7.17-5.98-8.03-1.88-.51-4.27-.68-7-1.02-.85-.68-.85-4.44,0-4.95,2.05,0,9.39.51,17.42.51s12.98-.51,15.03-.51c.68.51.85,3.93,0,4.95-1.71.17-4.44.68-6.32,1.2-3.42.85-4.78,2.73-4.78,8.71-.68,25.62-.34,33.64-2.9,42.36-3.76,14.86-16.05,20.49-30.4,20.49-19.81,0-29.38-8.88-31.08-22.89-.85-7.86-.51-36.72-.85-42.7-.17-3.24-.85-5.12-3.59-5.81-1.37-.51-5.63-1.2-7.86-1.37-.51-.85-.68-4.44.17-4.95Z"/>
            <path class="cls-2" d="M530.84,88.28c-7.52-8.03-10.76-18.27-10.76-29.03,0-9.22,2.73-17.59,8.03-24.08,7-9.22,19.98-15.37,34.16-15.37,25.62,0,39.11,18.62,39.11,38.43,0,10.59-2.56,18.27-7.86,25.11-8.03,11.1-20.15,16.05-33.47,16.05s-22.37-4.27-29.2-11.1ZM586.17,62.15c0-18.44-8.37-36.38-28.01-36.38-15.88,0-22.54,14.35-22.54,30.23,0,19.3,9.39,36.89,28.69,36.89,15.88,0,21.86-14.86,21.86-30.74Z"/>
            <path class="cls-2" d="M679.57,94.6c-4.44,1.2-18.62,4.61-29.89,4.61-29.38,0-43.89-15.2-43.89-39.96,0-16.05,8.37-28.86,22.2-34.84,7-3.24,15.54-4.61,25.45-4.61,5.63,0,12.3.85,15.88,1.2,3.59.51,7.17,1.02,9.22,1.02-1.03,5.29-1.71,15.71-1.88,21.35-.34.68-4.27,1.02-4.95.34-1.37-8.03-2.73-12.47-6.66-15.03-3.76-2.22-8.71-3.42-16.22-3.42-18.96,0-27.5,13.66-27.5,32.62,0,21.35,11.61,35.86,31.94,35.86,3.42,0,5.98-.85,7.51-2.05,1.37-.85,2.05-2.56,2.22-3.93.34-3.59.17-8.03.17-12.13s-1.2-5.29-4.44-6.32c-2.22-.34-5.29-.85-8.88-1.37-.68-.51-.51-4.27,0-4.61,3.76,0,12.13.51,19.81.51s12.13-.34,14.52-.51c.51.68.68,4.27,0,4.78-1.54.17-3.25.68-4.27,1.02-2.56.68-3.07,2.05-3.24,5.64-.17,3.76-.34,10.76,0,12.98.17,1.71.68,2.39,3.24,3.42.34.68.17,2.9-.34,3.42Z"/>
            <path class="cls-2" d="M696.26,81.45c5.64-11.61,17.08-40.13,21.52-52.09.85-2.56,1.88-5.81,2.22-7.69.51.17,2.05.34,5.47.34s4.44-.17,5.12-.34c.51,1.71,1.54,4.61,2.39,6.83,2.56,7.34,16.74,44.4,21.18,54.31,3.76,7.69,4.78,8.37,14.86,9.74.68.51.17,4.27-.17,4.95-2.9,0-9.22-.51-17.59-.51-9.56,0-15.88.51-18.62.51-.51-.51-.68-4.44,0-4.95,2.05-.17,4.61-.51,6.32-1.02,2.05-.68,2.22-2.22,1.88-3.59-1.71-5.29-4.61-12.64-6.83-18.1-.17-.34-.85-.68-1.02-.68-1.88-.17-6.32-.17-12.13-.17-8.03,0-9.39,0-10.59.17-.68,0-1.54.85-1.54,1.2-2.56,6.49-5.47,13.83-5.81,16.4-.17,2.22-.17,3.76,3.59,4.78,1.54.34,3.93.68,6.49,1.02.51.51.34,4.1-.34,4.95-2.39,0-10.25-.51-17.59-.51s-12.3.51-14.52.51c-.68-.68-.51-4.44,0-4.95,9.39-1.37,11.44-1.88,15.71-11.1ZM712.32,61.3c0,.34.17.68.51.68,1.2.17,3.76.17,8.71.17,3.07,0,7.17,0,8.88-.17.17,0,.68-.34.51-.85-3.07-8.71-7-19.47-9.05-24.59-.17-.17-.51,0-.68.17-2.05,6.15-6.32,17.25-8.88,24.59Z"/>
            <path class="cls-2" d="M764.19,21.51c2.9,0,12.13.51,16.4.51,9.22,0,18.96-.17,24.08-.17,15.37,0,22.88,8.71,22.88,19.13s-7.34,16.4-14.69,19.3c-.34.34-.17.85-.17,1.02,4.27,6.83,14.17,19.47,20.49,25.62,4.44,4.61,7.17,5.12,13.83,6.15.51.34.17,4.61-.68,4.78-5.47.17-17.08,0-21.52-2.22-1.88-.85-3.93-2.22-6.15-4.78-4.78-5.47-12.98-17.59-17.59-24.25-.85-1.37-2.39-2.05-3.76-2.05-1.71-.17-5.12,0-7,0-.34,0-.51.51-.51.68,0,6.66,0,16.22.34,20.32.34,4.1,1.2,4.95,4.1,5.81,1.71.51,4.95,1.02,8.2,1.37.68.51.34,4.27-.17,4.78-3.07,0-11.44-.51-19.64-.51-7.17,0-16.05.51-18.79.51-.51-.68-.68-4.44,0-4.78,2.56-.34,6.49-.85,7.86-1.2,2.9-.85,4.27-2.22,4.44-6.83.17-2.73.34-17.42.34-24.08,0-12.98,0-24.08-.17-27.5-.17-3.42-1.2-4.78-4.1-5.47-2.22-.51-5.47-1.02-8.2-1.2-.68-.68-.34-4.61.17-4.95ZM789.98,29.7c-.17,4.27-.17,18.79-.17,27.67,0,.51.34,1.03.85,1.03,3.76.17,11.78.34,15.03-.68,4.27-1.2,8.37-5.12,8.37-13.32,0-11.61-6.66-16.91-18.45-16.91-1.02,0-3.24,0-4.61.68-.34,0-1.02,1.2-1.02,1.54Z"/>
          </g>
          <!-- Tagline omitido para simplificar -->
          <rect class="cls-1" y="120.17" width="847.26" height="9.24"/>
          <g>
            <circle class="cls-2" cx="479.96" cy="52.86" r="8.94" transform="translate(103.2 354.86) rotate(-45)"/>
            <g>
              <path class="cls-1" d="M468.76,48.74c-.05,0-.1,0-.16,0-25.06,0-28.17-.17-29.38-.35-.52-.17-.86-1.04-.86-1.73,0-16.94-.17-25.75.17-32.15.17-5.53,1.38-6.91,4.84-7.95,1.9-.52,5.19-1.04,8.3-1.56.69-.52.69-3.97.17-4.84-4.84,0-10.02.52-21.6.52-9.33,0-17.98-.52-22.12-.52-.69.69-.86,4.15-.17,4.84,4.67.69,7.78,1.04,10.37,1.9,3.46.86,4.49,2.77,4.84,7.61.17,3.11.35,21.43.35,38.2,0,15.04-.17,29.73-.17,35.6-.52,7.95-1.04,11.06-6.05,12.62-2.42.52-5.19,1.04-9.33,1.56-.52.69-.52,4.32.17,5.01,3.46,0,12.79-.52,22.99-.52,11.06,0,19.18.52,22.47.52.69-.35,1.38-4.15.69-5.01-5.18-.69-7.78-1.38-10.37-2.07-4.32-1.21-5.01-3.63-5.36-9.51-.17-3.63-.17-23.51-.17-33.01,0-.17.17-1.04.52-1.04,1.73-.17,15.9-.17,29.38-.17h.4c-.41-1.21-.64-2.49-.64-3.83,0-1.45.27-2.83.75-4.12Z"/>
              <path class="cls-1" d="M528.06,102.49c-5.36-.52-8.64-1.04-11.06-1.9-3.28-1.04-4.32-2.94-4.84-7.78-.35-5.88-.35-24.89-.35-39.93,0-20.57,0-30.76.35-36.81.35-6.22,1.04-8.12,4.84-9.33,2.25-.69,5.19-1.21,8.99-1.73.69-.69.52-4.15,0-4.84-2.77,0-12.79.52-21.43.52-9.16,0-17.63-.69-21.6-.69-.86.86-1.04,4.32-.17,5.01,4.49.52,7.6,1.04,10.2,1.9,2.42.86,3.29,2.94,3.46,5.7.35,6.22.35,25.75.35,34.74,0,.35-.52,1.04-1.04,1.04-.62.07-2.02.11-4.66.15.52,1.34.82,2.79.82,4.32,0,1.37-.24,2.68-.67,3.91,2.07.02,3.67.06,4.51.1.52,0,1.04.69,1.04,1.21,0,10.89,0,29.73-.17,34.74-.35,5.36-1.38,7.09-4.49,7.95-2.76.86-5.36,1.21-9.85,1.73-.69.86-.69,4.32,0,5.01,4.49-.17,13.14-.52,21.95-.52s17.98.52,23.16.52c1.04-.52,1.21-4.32.69-5.01Z"/>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <h1 class="tagline">Tu Credito de Vivienda en <span class="highlight">Colombia</span></h1>
    <p class="subtitle">Desde cualquier parte del mundo</p>

    <div class="services">
      <span class="service-badge">Credito Hipotecario</span>
      <span class="service-badge">Leasing Habitacional</span>
      <span class="service-badge">Compra de Cartera</span>
    </div>
  </div>

  <span class="url">contuhogar.com</span>
</body>
</html>
`;

async function generateOgImage() {
  console.log('Generating OG image for ContuHogar...');
  console.log('Output path:', outputPath);

  // Buscar Chrome local
  const localChromePaths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // macOS
    '/usr/bin/google-chrome', // Linux
    '/usr/bin/chromium-browser', // Linux (Chromium)
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Windows
  ];

  const executablePath = localChromePaths.find((p) => existsSync(p));

  if (!executablePath) {
    console.error('Error: No se encontro Chrome/Chromium instalado.');
    console.error('Por favor instala Google Chrome para ejecutar este script.');
    process.exit(1);
  }

  console.log('Using Chrome at:', executablePath);

  let browser = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Configurar viewport para OG image (1200x630)
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 1
    });

    // Cargar el HTML
    await page.setContent(htmlTemplate, {
      waitUntil: 'networkidle0'
    });

    // Esperar a que las fuentes carguen
    await page.evaluate(() => document.fonts.ready);

    // Capturar screenshot como JPG
    const screenshot = await page.screenshot({
      type: 'jpeg',
      quality: 90,
      fullPage: false
    });

    // Guardar el archivo
    writeFileSync(outputPath, screenshot);

    console.log('OG image generated successfully!');
    console.log('File saved to:', outputPath);
    console.log('File size:', Math.round(screenshot.length / 1024), 'KB');

  } catch (error) {
    console.error('Error generating OG image:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Ejecutar
generateOgImage();
