<template>
  <div :class="isPdfMode ? 'bg-white' : 'min-h-screen bg-gray-300 py-8 print:bg-white print:py-0'">
    <!-- Controles de preview (ocultos en impresion y modo PDF) -->
    <div v-if="!isPdfMode" class="max-w-4xl mx-auto mb-4 px-4 print:hidden">
      <div class="bg-white rounded-lg shadow p-4 flex items-center justify-between">
        <h1 class="text-lg font-semibold text-gray-800">Preview: Plan de Redes Sociales - Febrero 2026</h1>
        <button
          @click="handlePrint"
          class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          Imprimir / Guardar PDF
        </button>
      </div>
    </div>

    <!-- Contenedor PDF (necesario para Puppeteer) -->
    <div id="pdf-container">

    <!-- ============================================= -->
    <!-- PAGINA 1: PORTADA -->
    <!-- ============================================= -->
    <div class="page w-[210mm] h-[297mm] mx-auto bg-white shadow-2xl print:shadow-none relative overflow-hidden" :class="{ 'shadow-none': isPdfMode }">
      <!-- Header -->
      <div class="bg-primary px-8 py-5 flex justify-between items-center">
        <a href="https://www.contuhogar.com/" target="_blank" rel="noopener noreferrer">
          <Logo variant="white" class="h-10 w-auto" />
        </a>
        <div class="text-right">
          <p class="text-[10px] text-white/70 uppercase tracking-wider">Plan de Redes Sociales</p>
          <p class="text-xs font-medium text-white">Febrero 2026</p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="px-8 py-6">
        <!-- Titulo -->
        <div class="text-center mb-10 mt-8">
          <h1 class="text-4xl font-bold text-primary mb-2">PLAN DE REDES SOCIALES</h1>
          <p class="text-xl text-gray-500">Febrero 2026 - ConTuHogar</p>
          <div class="w-24 h-1 bg-secondary mx-auto mt-4"></div>
        </div>

        <!-- Estadisticas principales -->
        <div class="grid grid-cols-4 gap-4 mb-10">
          <div class="bg-primary rounded-lg p-5 text-center">
            <p class="text-3xl font-bold text-white">20</p>
            <p class="text-xs text-white/80 uppercase tracking-wide mt-1">Piezas Totales</p>
          </div>
          <div class="bg-secondary rounded-lg p-5 text-center">
            <p class="text-3xl font-bold text-white">8</p>
            <p class="text-xs text-white/80 uppercase tracking-wide mt-1">Posts Feed</p>
          </div>
          <div class="bg-primary rounded-lg p-5 text-center">
            <p class="text-3xl font-bold text-white">4</p>
            <p class="text-xs text-white/80 uppercase tracking-wide mt-1">Reels</p>
          </div>
          <div class="bg-secondary rounded-lg p-5 text-center">
            <p class="text-3xl font-bold text-white">8</p>
            <p class="text-xs text-white/80 uppercase tracking-wide mt-1">Stories</p>
          </div>
        </div>

        <!-- Objetivos -->
        <div class="bg-muted rounded-lg p-6 mb-8">
          <h3 class="font-bold text-primary text-lg mb-4">Objetivos del Mes</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="text-secondary font-bold">1.</span>
              Generar leads calificados a traves del simulador de credito
            </li>
            <li class="flex items-start gap-2">
              <span class="text-secondary font-bold">2.</span>
              Educar sobre opciones de financiacion para vivienda en Colombia
            </li>
            <li class="flex items-start gap-2">
              <span class="text-secondary font-bold">3.</span>
              Construir confianza y autoridad en el nicho de credito para colombianos en el exterior
            </li>
            <li class="flex items-start gap-2">
              <span class="text-secondary font-bold">4.</span>
              Humanizar la marca con testimonios reales
            </li>
          </ul>
        </div>

        <!-- Audiencia y Horario -->
        <div class="grid grid-cols-2 gap-6 mb-8">
          <div class="border border-gray-200 rounded-lg p-4">
            <h4 class="font-bold text-primary text-sm mb-3">Audiencia Objetivo</h4>
            <p class="text-sm text-gray-600">Colombianos viviendo en el exterior (USA, Espana, otros paises)</p>
          </div>
          <div class="border border-gray-200 rounded-lg p-4">
            <h4 class="font-bold text-primary text-sm mb-3">Horario de Referencia</h4>
            <p class="text-sm text-gray-600">GMT-5 (Hora de Colombia)</p>
          </div>
        </div>

        <!-- Frecuencia -->
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 class="font-bold text-primary text-sm mb-3">Frecuencia de Publicacion</h4>
          <div class="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span class="font-semibold text-primary">Posts Feed:</span>
              <span class="text-gray-600"> 2/semana (Sab 10AM, Lun 7PM)</span>
            </div>
            <div>
              <span class="font-semibold text-primary">Reels:</span>
              <span class="text-gray-600"> 1/semana (Mie 7PM)</span>
            </div>
            <div>
              <span class="font-semibold text-primary">Stories:</span>
              <span class="text-gray-600"> 2/semana (Dom, Jue)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 bg-primary px-8 py-4">
        <div class="flex justify-between items-center">
          <a href="https://www.instagram.com/contuhogar_oficial" target="_blank" rel="noopener noreferrer" class="text-[9px] text-white hover:text-white/80">@contuhogar_oficial</a>
          <p class="text-[9px] text-white/60">Powered by <a href="https://www.neskeep.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-white/80">Neskeep</a></p>
          <p class="text-[9px] text-white">gerenciacomercial@contuhogar.com | +57 320 803 3672</p>
        </div>
      </div>
    </div>

    <!-- ============================================= -->
    <!-- PAGINA 2: CALENDARIO VISUAL -->
    <!-- ============================================= -->
    <div class="page w-[210mm] h-[297mm] mx-auto bg-white shadow-2xl print:shadow-none relative overflow-hidden mt-8 print:mt-0" :class="{ 'shadow-none': isPdfMode }">
      <!-- Header -->
      <div class="bg-primary px-8 py-4 flex justify-between items-center">
        <Logo variant="white" class="h-8 w-auto" />
        <p class="text-xs text-white">Calendario Febrero 2026</p>
      </div>

      <div class="px-8 py-4">
        <h2 class="text-2xl font-bold text-primary mb-4">Calendario Febrero 2026</h2>

        <!-- Calendario -->
        <table class="w-full border-collapse mb-8 text-sm">
          <thead>
            <tr class="bg-primary text-white">
              <th class="border border-primary p-2 text-center">Dom</th>
              <th class="border border-primary p-2 text-center">Lun</th>
              <th class="border border-primary p-2 text-center">Mar</th>
              <th class="border border-primary p-2 text-center">Mie</th>
              <th class="border border-primary p-2 text-center">Jue</th>
              <th class="border border-primary p-2 text-center">Vie</th>
              <th class="border border-primary p-2 text-center">Sab</th>
            </tr>
          </thead>
          <tbody>
            <!-- Semana 1 -->
            <tr>
              <td class="border border-gray-200 p-2 h-14 align-top bg-blue-50">
                <span class="font-bold">1</span>
                <div class="text-[10px] mt-1 bg-blue-200 rounded px-1">POST</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-orange-50">
                <span class="font-bold">2</span>
                <div class="text-[10px] mt-1 bg-orange-200 rounded px-1">STORY</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-green-50">
                <span class="font-bold">3</span>
                <div class="text-[10px] mt-1 bg-green-200 rounded px-1">POST</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top"><span class="font-bold">4</span></td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-blue-50">
                <span class="font-bold">5</span>
                <div class="text-[10px] mt-1 bg-blue-300 rounded px-1">REEL</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-red-50">
                <span class="font-bold">6</span>
                <div class="text-[10px] mt-1 bg-red-200 rounded px-1">STORY</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top"><span class="font-bold">7</span></td>
            </tr>
            <!-- Semana 2 -->
            <tr>
              <td class="border border-gray-200 p-2 h-14 align-top bg-blue-50">
                <span class="font-bold">8</span>
                <div class="text-[10px] mt-1 bg-blue-200 rounded px-1">POST</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-green-50">
                <span class="font-bold">9</span>
                <div class="text-[10px] mt-1 bg-green-200 rounded px-1">STORY</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-green-50">
                <span class="font-bold">10</span>
                <div class="text-[10px] mt-1 bg-green-200 rounded px-1">POST</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top"><span class="font-bold">11</span></td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-green-50">
                <span class="font-bold">12</span>
                <div class="text-[10px] mt-1 bg-green-300 rounded px-1">REEL</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-red-50">
                <span class="font-bold">13</span>
                <div class="text-[10px] mt-1 bg-red-200 rounded px-1">STORY</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top"><span class="font-bold">14</span></td>
            </tr>
            <!-- Semana 3 -->
            <tr>
              <td class="border border-gray-200 p-2 h-14 align-top bg-blue-50">
                <span class="font-bold">15</span>
                <div class="text-[10px] mt-1 bg-blue-200 rounded px-1">POST</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-orange-50">
                <span class="font-bold">16</span>
                <div class="text-[10px] mt-1 bg-orange-200 rounded px-1">STORY</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-blue-50">
                <span class="font-bold">17</span>
                <div class="text-[10px] mt-1 bg-blue-200 rounded px-1">POST</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top"><span class="font-bold">18</span></td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-blue-50">
                <span class="font-bold">19</span>
                <div class="text-[10px] mt-1 bg-blue-300 rounded px-1">REEL</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-green-50">
                <span class="font-bold">20</span>
                <div class="text-[10px] mt-1 bg-green-200 rounded px-1">STORY</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top"><span class="font-bold">21</span></td>
            </tr>
            <!-- Semana 4 -->
            <tr>
              <td class="border border-gray-200 p-2 h-14 align-top bg-blue-50">
                <span class="font-bold">22</span>
                <div class="text-[10px] mt-1 bg-blue-200 rounded px-1">POST</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-orange-50">
                <span class="font-bold">23</span>
                <div class="text-[10px] mt-1 bg-orange-200 rounded px-1">STORY</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top"><span class="font-bold">24</span></td>
              <td class="border border-gray-200 p-2 h-14 align-top"><span class="font-bold">25</span></td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-red-50">
                <span class="font-bold">26</span>
                <div class="text-[10px] mt-1 bg-red-300 rounded px-1">REEL</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-green-50">
                <span class="font-bold">27</span>
                <div class="text-[10px] mt-1 bg-green-200 rounded px-1">STORY</div>
              </td>
              <td class="border border-gray-200 p-2 h-14 align-top bg-red-50">
                <span class="font-bold">28</span>
                <div class="text-[10px] mt-1 bg-red-200 rounded px-1">POST</div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Leyenda -->
        <div class="flex gap-6 mb-8 text-xs">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <span>Educativo</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span>Testimonial</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
            <span>Producto/CTA</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span>Urgencia</span>
          </div>
        </div>

        <!-- Tabla de distribucion -->
        <h3 class="font-bold text-primary text-sm mb-3">Distribucion por Pilares</h3>
        <table class="w-full border-collapse text-sm mb-8">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-2 text-left">Pilar</th>
              <th class="border border-gray-300 p-2 text-center">Posts</th>
              <th class="border border-gray-300 p-2 text-center">Reels</th>
              <th class="border border-gray-300 p-2 text-center">Stories</th>
              <th class="border border-gray-300 p-2 text-center">Total</th>
              <th class="border border-gray-300 p-2 text-center">%</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-blue-50">
              <td class="border border-gray-300 p-2 font-medium">Educativo</td>
              <td class="border border-gray-300 p-2 text-center">4</td>
              <td class="border border-gray-300 p-2 text-center">2</td>
              <td class="border border-gray-300 p-2 text-center">0</td>
              <td class="border border-gray-300 p-2 text-center font-bold">6</td>
              <td class="border border-gray-300 p-2 text-center">30%</td>
            </tr>
            <tr class="bg-green-50">
              <td class="border border-gray-300 p-2 font-medium">Testimonial</td>
              <td class="border border-gray-300 p-2 text-center">2</td>
              <td class="border border-gray-300 p-2 text-center">1</td>
              <td class="border border-gray-300 p-2 text-center">3</td>
              <td class="border border-gray-300 p-2 text-center font-bold">6</td>
              <td class="border border-gray-300 p-2 text-center">30%</td>
            </tr>
            <tr class="bg-orange-50">
              <td class="border border-gray-300 p-2 font-medium">Producto/CTA</td>
              <td class="border border-gray-300 p-2 text-center">1</td>
              <td class="border border-gray-300 p-2 text-center">0</td>
              <td class="border border-gray-300 p-2 text-center">3</td>
              <td class="border border-gray-300 p-2 text-center font-bold">4</td>
              <td class="border border-gray-300 p-2 text-center">20%</td>
            </tr>
            <tr class="bg-red-50">
              <td class="border border-gray-300 p-2 font-medium">Urgencia</td>
              <td class="border border-gray-300 p-2 text-center">1</td>
              <td class="border border-gray-300 p-2 text-center">1</td>
              <td class="border border-gray-300 p-2 text-center">2</td>
              <td class="border border-gray-300 p-2 text-center font-bold">4</td>
              <td class="border border-gray-300 p-2 text-center">20%</td>
            </tr>
            <tr class="bg-gray-100 font-bold">
              <td class="border border-gray-300 p-2">TOTAL</td>
              <td class="border border-gray-300 p-2 text-center">8</td>
              <td class="border border-gray-300 p-2 text-center">4</td>
              <td class="border border-gray-300 p-2 text-center">8</td>
              <td class="border border-gray-300 p-2 text-center">20</td>
              <td class="border border-gray-300 p-2 text-center">100 %</td>
            </tr>
          </tbody>
        </table>

        <!-- Horarios -->
        <h3 class="font-bold text-primary text-sm mb-3">Horarios de Publicacion</h3>
        <table class="w-full border-collapse text-xs">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-2 text-left">Dia</th>
              <th class="border border-gray-300 p-2 text-center">Hora</th>
              <th class="border border-gray-300 p-2 text-center">Tipo</th>
              <th class="border border-gray-300 p-2 text-left">Razon Estrategica</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-2 font-medium">Sabado</td>
              <td class="border border-gray-300 p-2 text-center">10:00 AM</td>
              <td class="border border-gray-300 p-2 text-center">Post Feed</td>
              <td class="border border-gray-300 p-2">Scrolling matutino con cafe</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-medium">Lunes</td>
              <td class="border border-gray-300 p-2 text-center">7:00 PM</td>
              <td class="border border-gray-300 p-2 text-center">Post Feed</td>
              <td class="border border-gray-300 p-2">Engagement alto despues del trabajo</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-medium">Miercoles</td>
              <td class="border border-gray-300 p-2 text-center">7:00 PM</td>
              <td class="border border-gray-300 p-2 text-center">Reel</td>
              <td class="border border-gray-300 p-2">Pico de consumo de video</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-medium">Domingo</td>
              <td class="border border-gray-300 p-2 text-center">Variable</td>
              <td class="border border-gray-300 p-2 text-center">Story</td>
              <td class="border border-gray-300 p-2">Contenido aspiracional, planificacion</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-medium">Jueves</td>
              <td class="border border-gray-300 p-2 text-center">Variable</td>
              <td class="border border-gray-300 p-2 text-center">Story</td>
              <td class="border border-gray-300 p-2">Pre-fin de semana, decisiones</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 bg-primary px-8 py-3">
        <div class="flex justify-between items-center">
          <a href="https://www.instagram.com/contuhogar_oficial" target="_blank" rel="noopener noreferrer" class="text-[9px] text-white hover:text-white/80">@contuhogar_oficial</a>
          <p class="text-[9px] text-white/60">Powered by <a href="https://www.neskeep.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-white/80">Neskeep</a></p>
          <p class="text-[9px] text-white">Pagina 2 de 8</p>
        </div>
      </div>
    </div>

    <!-- ============================================= -->
    <!-- PAGINA 3: SEMANA 1 -->
    <!-- ============================================= -->
    <div class="page w-[210mm] h-[297mm] mx-auto bg-white shadow-2xl print:shadow-none relative overflow-hidden mt-8 print:mt-0" :class="{ 'shadow-none': isPdfMode }">
      <!-- Header -->
      <div class="bg-primary px-8 py-4 flex justify-between items-center">
        <Logo variant="white" class="h-8 w-auto" />
        <p class="text-xs text-white">Semana 1 - 1 al 6 de Febrero</p>
      </div>

      <div class="px-8 py-4">
        <h2 class="text-xl font-bold text-primary mb-4">SEMANA 1 - 1 al 6 de Febrero</h2>

        <!-- POST 1 -->
        <div class="border-l-4 border-blue-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">POST 1</span>
            <span class="text-xs text-gray-500">Sab 1 Feb, 10:00 AM</span>
            <span class="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded">Educativo</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"5 Cosas Que Debes Saber Antes de Comprar Casa en Colombia"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> Carrusel 7 slides | 1080x1080px</p>
          <p class="text-xs text-gray-500">Contenido: No necesitas regresar a Colombia, tus ingresos en el exterior cuentan, hasta 80% financiacion, proceso 30-60 dias, opciones especiales para colombianos en el exterior.</p>
        </div>

        <!-- POST 2 -->
        <div class="border-l-4 border-green-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">POST 2</span>
            <span class="text-xs text-gray-500">Lun 3 Feb, 7:00 PM</span>
            <span class="bg-green-50 text-green-600 text-[10px] px-2 py-0.5 rounded">Testimonial</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"Maria: De Miami a Medellin"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> Imagen unica con overlay | 1080x1350px</p>
          <p class="text-xs text-gray-500">Historia de Maria (34 anos, enfermera en Miami) que compro apartamento en Medellin para sus papas. Incluye quote destacado.</p>
        </div>

        <!-- REEL 1 -->
        <div class="border-l-4 border-blue-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">REEL 1</span>
            <span class="text-xs text-gray-500">Mie 5 Feb, 7:00 PM</span>
            <span class="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded">Educativo</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"Credito Hipotecario vs Leasing Habitacional: Cual te conviene?"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> Video 45-60s | 1080x1920px (9:16)</p>
          <p class="text-xs text-gray-500">Explicacion de diferencias: Hipotecario (70%, propiedad inmediata) vs Leasing (80%, beneficios tributarios). CTA al simulador.</p>
        </div>

        <!-- STORY 1 -->
        <div class="border-l-4 border-orange-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded">STORY 1</span>
            <span class="text-xs text-gray-500">Dom 2 Feb</span>
            <span class="bg-orange-50 text-orange-600 text-[10px] px-2 py-0.5 rounded">Producto</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"Sabias que puedes saber si calificas en solo 3 minutos?"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> 1080x1920px | Duracion: 15s</p>
          <p class="text-xs text-gray-500">Gradiente de marca, subtexto: "Sin compromiso | 100 % gratis | Sin afectar tu credito". Link sticker al simulador.</p>
        </div>

        <!-- STORY 2 -->
        <div class="border-l-4 border-red-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">STORY 2</span>
            <span class="text-xs text-gray-500">Jue 6 Feb</span>
            <span class="bg-red-50 text-red-600 text-[10px] px-2 py-0.5 rounded">Urgencia</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"El dolar hoy: [VALOR ACTUAL] COP"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> 1080x1920px | Duracion: 15s</p>
          <p class="text-xs text-gray-500">Imagen de skyline Colombia, mensaje sobre poder de compra del dolar. Poll sticker: "Ya calculaste tu capacidad?"</p>
        </div>

        <!-- Resumen visual semana -->
        <div class="bg-muted rounded-lg px-3 py-2 mt-4">
          <div class="flex items-center justify-between">
            <span class="font-bold text-primary text-xs">Resumen:</span>
            <div class="flex items-center gap-1 text-[10px]">
              <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Sab 1 POST</span>
              <span class="text-gray-300">|</span>
              <span class="bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-medium">Dom 2 STORY</span>
              <span class="text-gray-300">|</span>
              <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">Lun 3 POST</span>
              <span class="text-gray-300">|</span>
              <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Mie 5 REEL</span>
              <span class="text-gray-300">|</span>
              <span class="bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">Jue 6 STORY</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 bg-primary px-8 py-3">
        <div class="flex justify-between items-center">
          <a href="https://www.instagram.com/contuhogar_oficial" target="_blank" rel="noopener noreferrer" class="text-[9px] text-white hover:text-white/80">@contuhogar_oficial</a>
          <p class="text-[9px] text-white/60">Powered by <a href="https://www.neskeep.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-white/80">Neskeep</a></p>
          <p class="text-[9px] text-white">Pagina 3 de 8</p>
        </div>
      </div>
    </div>

    <!-- ============================================= -->
    <!-- PAGINA 4: SEMANA 2 -->
    <!-- ============================================= -->
    <div class="page w-[210mm] h-[297mm] mx-auto bg-white shadow-2xl print:shadow-none relative overflow-hidden mt-8 print:mt-0" :class="{ 'shadow-none': isPdfMode }">
      <!-- Header -->
      <div class="bg-primary px-8 py-4 flex justify-between items-center">
        <Logo variant="white" class="h-8 w-auto" />
        <p class="text-xs text-white">Semana 2 - 7 al 13 de Febrero</p>
      </div>

      <div class="px-8 py-4">
        <h2 class="text-xl font-bold text-primary mb-4">SEMANA 2 - 7 al 13 de Febrero</h2>

        <!-- POST 3 -->
        <div class="border-l-4 border-blue-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">POST 3</span>
            <span class="text-xs text-gray-500">Sab 8 Feb, 10:00 AM</span>
            <span class="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded">Educativo</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"Requisitos Para Aplicar a Credito Desde el Exterior"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> Carrusel 6 slides | 1080x1080px</p>
          <p class="text-xs text-gray-500">Documentos de identidad, comprobantes de ingreso, documentos laborales, datos financieros. PRO TIP sobre simulador.</p>
        </div>

        <!-- POST 4 -->
        <div class="border-l-4 border-green-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">POST 4</span>
            <span class="text-xs text-gray-500">Lun 10 Feb, 7:00 PM</span>
            <span class="bg-green-50 text-green-600 text-[10px] px-2 py-0.5 rounded">Testimonial</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"Carlos y Ana: De Barcelona a Bogota"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> Imagen dividida | 1080x1350px</p>
          <p class="text-xs text-gray-500">Historia de pareja que vivia en Barcelona y queria que sus hijos conocieran a los abuelos. Aprobacion en 45 dias.</p>
        </div>

        <!-- REEL 2 -->
        <div class="border-l-4 border-green-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">REEL 2</span>
            <span class="text-xs text-gray-500">Mie 12 Feb, 7:00 PM</span>
            <span class="bg-green-50 text-green-600 text-[10px] px-2 py-0.5 rounded">Testimonial</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"Ellos lo lograron. Tu tambien puedes"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> Video 50-60s | 1080x1920px (9:16)</p>
          <p class="text-xs text-gray-500">Compilacion de 3 testimonios: Maria (Miami), Carlos (Madrid), Andrea (New York). Montaje emocional. "Mas de 3.000 familias".</p>
        </div>

        <!-- STORY 3 -->
        <div class="border-l-4 border-green-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">STORY 3</span>
            <span class="text-xs text-gray-500">Dom 9 Feb</span>
            <span class="bg-green-50 text-green-600 text-[10px] px-2 py-0.5 rounded">Testimonial</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">Quote de Ana</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> 1080x1920px | Duracion: 15s</p>
          <p class="text-xs text-gray-500">"Lo mejor no es la casa, es ver a mis hijos cerca de sus abuelos" - Ana, desde Barcelona. Slider sticker.</p>
        </div>

        <!-- STORY 4 -->
        <div class="border-l-4 border-red-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">STORY 4</span>
            <span class="text-xs text-gray-500">Jue 13 Feb</span>
            <span class="bg-red-50 text-red-600 text-[10px] px-2 py-0.5 rounded">Urgencia</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">San Valentin - "Un Hogar Propio"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> 1080x1920px | Duracion: 15s</p>
          <p class="text-xs text-gray-500">Fondo romantico, "Falta 1 dia para San Valentin", "El mejor regalo para tu familia: UN HOGAR PROPIO". Link "REGALA ESTABILIDAD".</p>
        </div>

        <!-- Resumen visual semana -->
        <div class="bg-muted rounded-lg px-3 py-2 mt-4">
          <div class="flex items-center justify-between">
            <span class="font-bold text-primary text-xs">Resumen:</span>
            <div class="flex items-center gap-1 text-[10px]">
              <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Sab 8 POST</span>
              <span class="text-gray-300">|</span>
              <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">Dom 9 STORY</span>
              <span class="text-gray-300">|</span>
              <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">Lun 10 POST</span>
              <span class="text-gray-300">|</span>
              <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">Mie 12 REEL</span>
              <span class="text-gray-300">|</span>
              <span class="bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">Jue 13 STORY</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 bg-primary px-8 py-3">
        <div class="flex justify-between items-center">
          <a href="https://www.instagram.com/contuhogar_oficial" target="_blank" rel="noopener noreferrer" class="text-[9px] text-white hover:text-white/80">@contuhogar_oficial</a>
          <p class="text-[9px] text-white/60">Powered by <a href="https://www.neskeep.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-white/80">Neskeep</a></p>
          <p class="text-[9px] text-white">Pagina 4 de 8</p>
        </div>
      </div>
    </div>

    <!-- ============================================= -->
    <!-- PAGINA 5: SEMANA 3 -->
    <!-- ============================================= -->
    <div class="page w-[210mm] h-[297mm] mx-auto bg-white shadow-2xl print:shadow-none relative overflow-hidden mt-8 print:mt-0" :class="{ 'shadow-none': isPdfMode }">
      <!-- Header -->
      <div class="bg-primary px-8 py-4 flex justify-between items-center">
        <Logo variant="white" class="h-8 w-auto" />
        <p class="text-xs text-white">Semana 3 - 14 al 20 de Febrero</p>
      </div>

      <div class="px-8 py-4">
        <h2 class="text-xl font-bold text-primary mb-4">SEMANA 3 - 14 al 20 de Febrero</h2>

        <!-- POST 5 -->
        <div class="border-l-4 border-blue-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">POST 5</span>
            <span class="text-xs text-gray-500">Sab 15 Feb, 10:00 AM</span>
            <span class="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded">Educativo</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"7 Errores Comunes al Comprar Vivienda Desde el Exterior"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> Carrusel 7 slides | 1080x1080px</p>
          <p class="text-xs text-gray-500">Errores: No verificar capacidad, subestimar costos, no comparar opciones, asesores sin licencia, no revisar FOPRE, pensar que necesitas efectivo, no aprovechar moneda extranjera.</p>
        </div>

        <!-- POST 6 -->
        <div class="border-l-4 border-blue-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">POST 6</span>
            <span class="text-xs text-gray-500">Lun 17 Feb, 7:00 PM</span>
            <span class="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded">Educativo Tutorial</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"Asi Funciona Nuestro Simulador de Credito (Paso a Paso)"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> Carrusel tutorial con screenshots | 1080x1080px</p>
          <p class="text-xs text-gray-500">5 pasos: Datos basicos, casa que quieres, ingresos, deudas, resultado. Tiempo: 3 min, Costo: $0, Seguro.</p>
        </div>

        <!-- REEL 3 -->
        <div class="border-l-4 border-blue-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">REEL 3</span>
            <span class="text-xs text-gray-500">Mie 19 Feb, 7:00 PM</span>
            <span class="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded">Educativo</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"4 Documentos Que Necesitas Para Tu Credito"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> Video 45-60s | 1080x1920px (9:16)</p>
          <p class="text-xs text-gray-500">Documentos: Identificacion (cedula/pasaporte), comprobante ingresos, carta laboral, historial crediticio (DataCredito/Credit Report/ASNEF).</p>
        </div>

        <!-- STORY 5 -->
        <div class="border-l-4 border-orange-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded">STORY 5</span>
            <span class="text-xs text-gray-500">Dom 16 Feb</span>
            <span class="bg-orange-50 text-orange-600 text-[10px] px-2 py-0.5 rounded">Producto</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">Behind the Scenes - Equipo ConTuHogar</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> 1080x1920px | Duracion: 15s</p>
          <p class="text-xs text-gray-500">Foto real del equipo trabajando. "DETRAS DE CAMARAS" - "Nuestro equipo trabajando para hacer realidad TU sueno". Link a WhatsApp.</p>
        </div>

        <!-- STORY 6 -->
        <div class="border-l-4 border-green-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">STORY 6</span>
            <span class="text-xs text-gray-500">Jue 20 Feb</span>
            <span class="bg-green-50 text-green-600 text-[10px] px-2 py-0.5 rounded">Testimonial</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">Familia Gomez - Antes/Despues</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> 1080x1920px | Duracion: 15s</p>
          <p class="text-xs text-gray-500">Layout dividido: arriba apartamento vacio, abajo familia en apartamento amoblado. "De un sueno a una realidad en 45 dias".</p>
        </div>

        <!-- Resumen visual semana -->
        <div class="bg-muted rounded-lg px-3 py-2 mt-4">
          <div class="flex items-center justify-between">
            <span class="font-bold text-primary text-xs">Resumen:</span>
            <div class="flex items-center gap-1 text-[10px]">
              <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Sab 15 POST</span>
              <span class="text-gray-300">|</span>
              <span class="bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-medium">Dom 16 STORY</span>
              <span class="text-gray-300">|</span>
              <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Lun 17 POST</span>
              <span class="text-gray-300">|</span>
              <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Mie 19 REEL</span>
              <span class="text-gray-300">|</span>
              <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">Jue 20 STORY</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 bg-primary px-8 py-3">
        <div class="flex justify-between items-center">
          <a href="https://www.instagram.com/contuhogar_oficial" target="_blank" rel="noopener noreferrer" class="text-[9px] text-white hover:text-white/80">@contuhogar_oficial</a>
          <p class="text-[9px] text-white/60">Powered by <a href="https://www.neskeep.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-white/80">Neskeep</a></p>
          <p class="text-[9px] text-white">Pagina 5 de 8</p>
        </div>
      </div>
    </div>

    <!-- ============================================= -->
    <!-- PAGINA 6: SEMANA 4 -->
    <!-- ============================================= -->
    <div class="page w-[210mm] h-[297mm] mx-auto bg-white shadow-2xl print:shadow-none relative overflow-hidden mt-8 print:mt-0" :class="{ 'shadow-none': isPdfMode }">
      <!-- Header -->
      <div class="bg-primary px-8 py-4 flex justify-between items-center">
        <Logo variant="white" class="h-8 w-auto" />
        <p class="text-xs text-white">Semana 4 - 21 al 28 de Febrero</p>
      </div>

      <div class="px-8 py-4">
        <h2 class="text-xl font-bold text-primary mb-4">SEMANA 4 - 21 al 28 de Febrero</h2>

        <!-- POST 7 -->
        <div class="border-l-4 border-blue-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">POST 7</span>
            <span class="text-xs text-gray-500">Sab 22 Feb, 10:00 AM</span>
            <span class="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded">Educativo</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"Guia de Financiacion Segun Tu Ingreso"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> Infografia vertical | 1080x1350px</p>
          <p class="text-xs text-gray-500">Tabla de rangos: $2M ($500 USD) hasta $20M+ ($5,000+ USD). Disclaimer sobre montos aproximados.</p>
        </div>

        <!-- POST 8 -->
        <div class="border-l-4 border-red-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">POST 8</span>
            <span class="text-xs text-gray-500">Vie 28 Feb, 7:00 PM</span>
            <span class="bg-red-50 text-red-600 text-[10px] px-2 py-0.5 rounded">Urgencia/Cierre</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"Febrero termina. Tu oportunidad no"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> Imagen impactante | 1080x1350px</p>
          <p class="text-xs text-gray-500">Resumen del mes, pregunta interactiva: "Cual es tu meta para marzo? A) Simular credito B) Juntar cuota inicial C) Hablar con asesor D) Buscar casa ideal".</p>
        </div>

        <!-- REEL 4 -->
        <div class="border-l-4 border-red-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">REEL 4</span>
            <span class="text-xs text-gray-500">Mie 26 Feb, 7:00 PM</span>
            <span class="bg-red-50 text-red-600 text-[10px] px-2 py-0.5 rounded">Urgencia</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"3 Razones Para Invertir en Colombia en 2026"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> Video 30-45s | 1080x1920px (9:16)</p>
          <p class="text-xs text-gray-500">Razones: 1) Tu dinero vale MAS (poder de compra), 2) Mercado en crecimiento (Medellin, Bogota, Cali), 3) Cerca de tu familia.</p>
        </div>

        <!-- STORY 7 -->
        <div class="border-l-4 border-orange-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded">STORY 7</span>
            <span class="text-xs text-gray-500">Dom 23 Feb</span>
            <span class="bg-orange-50 text-orange-600 text-[10px] px-2 py-0.5 rounded">Producto</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">"Simula con tu cafe"</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> 1080x1920px | Duracion: 15s</p>
          <p class="text-xs text-gray-500">Imagen de cafe con laptop, tono relajado. "DOMINGO PERFECTO PARA... Simular tu credito mientras tomas cafe". Link al simulador.</p>
        </div>

        <!-- STORY 8 -->
        <div class="border-l-4 border-green-400 pl-4 mb-6">
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">STORY 8</span>
            <span class="text-xs text-gray-500">Jue 27 Feb</span>
            <span class="bg-green-50 text-green-600 text-[10px] px-2 py-0.5 rounded">Testimonial</span>
          </div>
          <h4 class="font-bold text-primary text-sm mb-1">Screenshot WhatsApp - Mensaje de Cliente</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Formato:</strong> 1080x1920px | Duracion: 15s</p>
          <p class="text-xs text-gray-500">"MENSAJES QUE NOS LLENAN EL CORAZON" - Screenshot de mensaje real: "Muchas gracias... Ya tengo mi apartamento en Bogota". Emoji reactions.</p>
        </div>

        <!-- Resumen visual semana -->
        <div class="bg-muted rounded-lg px-3 py-2 mt-4">
          <div class="flex items-center justify-between">
            <span class="font-bold text-primary text-xs">Resumen:</span>
            <div class="flex items-center gap-1 text-[10px]">
              <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Sab 22 POST</span>
              <span class="text-gray-300">|</span>
              <span class="bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-medium">Dom 23 STORY</span>
              <span class="text-gray-300">|</span>
              <span class="bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">Mie 26 REEL</span>
              <span class="text-gray-300">|</span>
              <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">Jue 27 STORY</span>
              <span class="text-gray-300">|</span>
              <span class="bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">Vie 28 POST</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 bg-primary px-8 py-3">
        <div class="flex justify-between items-center">
          <a href="https://www.instagram.com/contuhogar_oficial" target="_blank" rel="noopener noreferrer" class="text-[9px] text-white hover:text-white/80">@contuhogar_oficial</a>
          <p class="text-[9px] text-white/60">Powered by <a href="https://www.neskeep.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-white/80">Neskeep</a></p>
          <p class="text-[9px] text-white">Pagina 6 de 8</p>
        </div>
      </div>
    </div>

    <!-- ============================================= -->
    <!-- PAGINA 7: ESPECIFICACIONES TECNICAS -->
    <!-- ============================================= -->
    <div class="page w-[210mm] h-[297mm] mx-auto bg-white shadow-2xl print:shadow-none relative overflow-hidden mt-8 print:mt-0" :class="{ 'shadow-none': isPdfMode }">
      <!-- Header -->
      <div class="bg-primary px-8 py-4 flex justify-between items-center">
        <Logo variant="white" class="h-8 w-auto" />
        <p class="text-xs text-white">Especificaciones Tecnicas</p>
      </div>

      <div class="px-8 py-4">
        <h2 class="text-xl font-bold text-primary mb-4">Especificaciones Tecnicas</h2>

        <!-- Formatos -->
        <div class="grid grid-cols-3 gap-3 mb-8">
          <!-- Posts Feed -->
          <div class="border border-gray-200 rounded-lg p-3">
            <h4 class="font-bold text-primary text-sm mb-2">Posts Feed</h4>
            <table class="w-full text-[10px]">
              <tbody>
                <tr class="border-b border-gray-100">
                  <td class="py-1">Cuadrado</td>
                  <td class="py-1 text-right">1080x1080px</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="py-1">Vertical</td>
                  <td class="py-1 text-right">1080x1350px</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="py-1">Resolucion</td>
                  <td class="py-1 text-right">72 DPI min</td>
                </tr>
                <tr>
                  <td class="py-1">Peso max</td>
                  <td class="py-1 text-right">8MB/slide</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Reels -->
          <div class="border border-gray-200 rounded-lg p-3">
            <h4 class="font-bold text-primary text-sm mb-2">Reels</h4>
            <table class="w-full text-[10px]">
              <tbody>
                <tr class="border-b border-gray-100">
                  <td class="py-1">Dimensiones</td>
                  <td class="py-1 text-right">1080x1920px</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="py-1">Ratio</td>
                  <td class="py-1 text-right">9:16</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="py-1">Duracion</td>
                  <td class="py-1 text-right">30-90s</td>
                </tr>
                <tr>
                  <td class="py-1">FPS</td>
                  <td class="py-1 text-right">30 fps min</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Stories -->
          <div class="border border-gray-200 rounded-lg p-3">
            <h4 class="font-bold text-primary text-sm mb-2">Stories</h4>
            <table class="w-full text-[10px]">
              <tbody>
                <tr class="border-b border-gray-100">
                  <td class="py-1">Dimensiones</td>
                  <td class="py-1 text-right">1080x1920px</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="py-1">Ratio</td>
                  <td class="py-1 text-right">9:16</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="py-1">Duracion</td>
                  <td class="py-1 text-right">15s max</td>
                </tr>
                <tr>
                  <td class="py-1">Zona segura</td>
                  <td class="py-1 text-right">250px arr/310px abj</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Paleta de colores -->
        <h3 class="font-bold text-primary text-sm mb-3">Paleta de Colores ConTuHogar</h3>
        <div class="flex items-center gap-3 mb-8">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1.5">
              <div class="w-6 h-6 bg-primary rounded"></div>
              <div class="text-[9px]"><span class="font-medium">Primary</span> <span class="text-gray-400">#0F172B</span></div>
            </div>
            <div class="flex items-center gap-1.5">
              <div class="w-6 h-6 bg-secondary rounded"></div>
              <div class="text-[9px]"><span class="font-medium">Secondary</span> <span class="text-gray-400">#EC6E07</span></div>
            </div>
          </div>
          <div class="h-4 w-px bg-gray-300"></div>
          <div class="flex items-center gap-3 text-[9px]">
            <div class="flex items-center gap-1"><div class="w-4 h-4 bg-blue-100 rounded border border-blue-200"></div><span>Educativo</span></div>
            <div class="flex items-center gap-1"><div class="w-4 h-4 bg-green-100 rounded border border-green-200"></div><span>Testimonial</span></div>
            <div class="flex items-center gap-1"><div class="w-4 h-4 bg-orange-100 rounded border border-orange-200"></div><span>Producto</span></div>
            <div class="flex items-center gap-1"><div class="w-4 h-4 bg-red-100 rounded border border-red-200"></div><span>Urgencia</span></div>
          </div>
        </div>

        <!-- Hashtags -->
        <h3 class="font-bold text-primary text-sm mb-3">Hashtags Recomendados</h3>
        <div class="bg-muted rounded-lg p-3 mb-8">
          <div class="mb-3">
            <p class="font-semibold text-xs text-primary mb-1">Principales (usar SIEMPRE):</p>
            <p class="text-[10px] text-gray-600">#ConTuHogar #ColombianosenelExterior #CreditoHipotecario #CasaEnColombia</p>
          </div>
          <div class="mb-3">
            <p class="font-semibold text-xs text-primary mb-1">Por ubicacion:</p>
            <p class="text-[10px] text-gray-600">#ColombianosUSA #ColombianosEspana #ColombianosEuropa #ColombianosMiami #ColombianosNYC</p>
          </div>
          <div>
            <p class="font-semibold text-xs text-primary mb-1">Emocional:</p>
            <p class="text-[10px] text-gray-600">#SuenoPropio #MiCasaEnColombia #VueltaAColombia #FamiliaReunida #SuenoCumplido</p>
          </div>
        </div>

        <!-- Tipografia -->
        <h3 class="font-bold text-primary text-sm mb-3">Tipografia</h3>
        <div class="bg-muted rounded-lg px-3 py-2 mb-8">
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-600"><strong>Familia:</strong> Sans-serif (Montserrat, Inter)</span>
            <div class="flex items-center gap-4 text-[10px]">
              <span><strong class="text-primary">Titulo:</strong> Bold, 32-48pt</span>
              <span class="text-gray-300">|</span>
              <span><strong class="text-primary">Subtitulo:</strong> SemiBold, 24-32pt</span>
              <span class="text-gray-300">|</span>
              <span><strong class="text-primary">Cuerpo:</strong> Regular, 16-20pt</span>
              <span class="text-gray-300">|</span>
              <span><strong class="text-primary">CTA:</strong> Bold, 18-24pt</span>
            </div>
          </div>
        </div>

        <!-- Zonas horarias -->
        <h3 class="font-bold text-primary text-sm mb-3">Consideraciones de Zona Horaria</h3>
        <table class="w-full text-xs border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-2 text-left">Ubicacion</th>
              <th class="border border-gray-300 p-2 text-center">Zona</th>
              <th class="border border-gray-300 p-2 text-center">Hora (Lun 7PM CO)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-2">Colombia</td>
              <td class="border border-gray-300 p-2 text-center">GMT-5</td>
              <td class="border border-gray-300 p-2 text-center">7:00 PM</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Miami/NYC (EST)</td>
              <td class="border border-gray-300 p-2 text-center">GMT-5</td>
              <td class="border border-gray-300 p-2 text-center">7:00 PM</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Los Angeles (PST)</td>
              <td class="border border-gray-300 p-2 text-center">GMT-8</td>
              <td class="border border-gray-300 p-2 text-center">4:00 PM</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Espana</td>
              <td class="border border-gray-300 p-2 text-center">GMT+1</td>
              <td class="border border-gray-300 p-2 text-center">1:00 AM (+1)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 bg-primary px-8 py-3">
        <div class="flex justify-between items-center">
          <a href="https://www.instagram.com/contuhogar_oficial" target="_blank" rel="noopener noreferrer" class="text-[9px] text-white hover:text-white/80">@contuhogar_oficial</a>
          <p class="text-[9px] text-white/60">Powered by <a href="https://www.neskeep.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-white/80">Neskeep</a></p>
          <p class="text-[9px] text-white">Pagina 7 de 8</p>
        </div>
      </div>
    </div>

    <!-- ============================================= -->
    <!-- PAGINA 8: CHECKLIST Y CONTACTO -->
    <!-- ============================================= -->
    <div class="page w-[210mm] h-[297mm] mx-auto bg-white shadow-2xl print:shadow-none relative overflow-hidden mt-8 print:mt-0" :class="{ 'shadow-none': isPdfMode }">
      <!-- Header -->
      <div class="bg-primary px-8 py-4 flex justify-between items-center">
        <Logo variant="white" class="h-8 w-auto" />
        <p class="text-xs text-white">Checklist y Contacto</p>
      </div>

      <div class="px-8 py-4">
        <h2 class="text-xl font-bold text-primary mb-4">Checklist de Ejecucion</h2>

        <!-- Checklist -->
        <div class="grid grid-cols-2 gap-4 mb-8">
          <!-- Semana Previa -->
          <div class="border border-gray-200 rounded-lg p-3">
            <h4 class="font-bold text-primary text-xs mb-2">Semana Previa (21-28 Enero)</h4>
            <ul class="space-y-1 text-[10px]">
              <li class="flex items-center gap-1.5">
                <span class="w-3 h-3 border border-gray-300 rounded shrink-0"></span>
                <span>Crear banco de assets visuales</span>
              </li>
              <li class="flex items-center gap-1.5">
                <span class="w-3 h-3 border border-gray-300 rounded shrink-0"></span>
                <span>Preparar copies de posts (8)</span>
              </li>
              <li class="flex items-center gap-1.5">
                <span class="w-3 h-3 border border-gray-300 rounded shrink-0"></span>
                <span>Escribir guiones de reels (4)</span>
              </li>
              <li class="flex items-center gap-1.5">
                <span class="w-3 h-3 border border-gray-300 rounded shrink-0"></span>
                <span>Solicitar testimonios y permisos</span>
              </li>
              <li class="flex items-center gap-1.5">
                <span class="w-3 h-3 border border-gray-300 rounded shrink-0"></span>
                <span>Configurar herramienta de programacion</span>
              </li>
            </ul>
          </div>

          <!-- Durante el Mes -->
          <div class="border border-gray-200 rounded-lg p-3">
            <h4 class="font-bold text-primary text-xs mb-2">Durante el Mes (1-28 Febrero)</h4>
            <ul class="space-y-1 text-[10px]">
              <li class="flex items-center gap-1.5">
                <span class="w-3 h-3 border border-gray-300 rounded shrink-0"></span>
                <span>Monitoreo diario (15 min): comentarios, DMs</span>
              </li>
              <li class="flex items-center gap-1.5">
                <span class="w-3 h-3 border border-gray-300 rounded shrink-0"></span>
                <span>Actualizar valor del dolar en stories (jueves)</span>
              </li>
              <li class="flex items-center gap-1.5">
                <span class="w-3 h-3 border border-gray-300 rounded shrink-0"></span>
                <span>Responder comentarios en primeras 2 horas</span>
              </li>
              <li class="flex items-center gap-1.5">
                <span class="w-3 h-3 border border-gray-300 rounded shrink-0"></span>
                <span>Hacer 1 pregunta/semana en stories</span>
              </li>
              <li class="flex items-center gap-1.5">
                <span class="w-3 h-3 border border-gray-300 rounded shrink-0"></span>
                <span>Agradecer shares y menciones</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Metricas de Exito -->
        <h3 class="font-bold text-primary text-sm mb-3">Metricas de Exito (KPIs)</h3>
        <div class="grid grid-cols-2 gap-2 mb-6">
          <div class="bg-primary rounded-lg p-2 flex items-center justify-between">
            <p class="text-[10px] text-white/80">Alcance Cuentas</p>
            <p class="text-xl font-bold text-white">50K+</p>
          </div>
          <div class="bg-secondary rounded-lg p-2 flex items-center justify-between">
            <p class="text-[10px] text-white/80">Engagement Rate</p>
            <p class="text-xl font-bold text-white">4-6%</p>
          </div>
          <div class="bg-primary rounded-lg p-2 flex items-center justify-between">
            <p class="text-[10px] text-white/80">Clicks a Link</p>
            <p class="text-xl font-bold text-white">500+</p>
          </div>
          <div class="bg-secondary rounded-lg p-2 flex items-center justify-between">
            <p class="text-[10px] text-white/80">Simulaciones</p>
            <p class="text-xl font-bold text-white">150+</p>
          </div>
        </div>

        <!-- KPIs Secundarios -->
        <div class="bg-muted rounded-lg px-3 py-2 mb-6">
          <div class="flex items-center justify-between">
            <span class="font-bold text-primary text-xs">KPIs Secundarios:</span>
            <div class="flex items-center gap-3 text-[10px]">
              <span><strong class="text-primary">50+</strong> <span class="text-gray-500">Shares</span></span>
              <span class="text-gray-300">|</span>
              <span><strong class="text-primary">150+</strong> <span class="text-gray-500">Comentarios</span></span>
              <span class="text-gray-300">|</span>
              <span><strong class="text-primary">80+</strong> <span class="text-gray-500">DMs</span></span>
              <span class="text-gray-300">|</span>
              <span><strong class="text-primary">200+</strong> <span class="text-gray-500">Seguidores</span></span>
              <span class="text-gray-300">|</span>
              <span><strong class="text-primary">100+</strong> <span class="text-gray-500">Saves</span></span>
            </div>
          </div>
        </div>

        <!-- Conversion -->
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
          <h4 class="font-bold text-primary text-xs mb-2">Objetivo de Conversion</h4>
          <p class="text-xs text-gray-600 mb-2">Alcance --> Clicks --> Simulaciones --> Leads Calificados --> Aprobaciones</p>
          <p class="text-xs text-gray-700"><strong>Meta:</strong> 5% de simulaciones se conviertan en leads calificados = <strong>7-8 leads/mes</strong></p>
        </div>

        <!-- Contacto ConTuHogar -->
        <div class="bg-primary rounded-lg px-4 py-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-white">Contacto ConTuHogar</h3>
            <div class="flex items-center gap-4 text-[10px]">
              <span class="text-white"><span class="text-white/60">Web:</span> contuhogar.com</span>
              <span class="text-white/40">|</span>
              <span class="text-white"><span class="text-white/60">Email:</span> gerenciacomercial@contuhogar.com</span>
              <span class="text-white/40">|</span>
              <span class="text-white"><span class="text-white/60">WhatsApp:</span> +57 315 054 0000</span>
            </div>
          </div>
        </div>

        <!-- Nota final -->
        <div class="mt-3 text-center">
          <p class="text-[10px] text-gray-500">Documento creado: Enero 2026 | Proxima revision: Marzo 2026 (post-analisis de resultados)</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 bg-primary px-8 py-3">
        <div class="flex justify-between items-center">
          <a href="https://www.instagram.com/contuhogar_oficial" target="_blank" rel="noopener noreferrer" class="text-[9px] text-white hover:text-white/80">@contuhogar_oficial</a>
          <p class="text-[9px] text-white/60">Powered by <a href="https://www.neskeep.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-white/80">Neskeep</a></p>
          <p class="text-[9px] text-white">Pagina 8 de 8</p>
        </div>
      </div>
    </div>

    </div><!-- Cierre #pdf-container -->
  </div>
</template>

<script setup lang="ts">
// SEO
definePageMeta({
  layout: false
});

useSeoMeta({
  title: 'Plan de Redes Sociales - Febrero 2026 | ConTuHogar',
  robots: 'noindex, nofollow'
});

// Leer query params
const route = useRoute();

// Indicar si estamos en modo PDF (para ocultar controles)
const isPdfMode = computed(() => !!route.query.pdf);

// Funcion para imprimir
const handlePrint = () => {
  if (import.meta.client) {
    window.print();
  }
};
</script>

<style>
.page {
  page-break-after: always;
  break-after: page;
  overflow: hidden;
}

.page:last-child {
  page-break-after: avoid;
}

@media print {
  @page {
    size: A4;
    margin: 0;
  }

  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
</style>
