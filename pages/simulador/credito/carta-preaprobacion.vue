<template>
  <div :class="isPdfMode ? 'bg-white' : 'min-h-screen bg-gray-300 py-8 print:bg-white print:py-0'">
    <!-- Controles de preview (ocultos en impresión y modo PDF) -->
    <div v-if="!isPdfMode" class="max-w-4xl mx-auto mb-4 px-4 print:hidden">
      <div class="bg-white rounded-lg shadow p-4 flex items-center justify-between">
        <h1 class="text-lg font-semibold text-gray-800">Preview: Carta de preaprobación</h1>
        <div class="flex gap-2">
          <button
            @click="handleDownloadPDF"
            :disabled="isGeneratingPDF"
            class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg v-if="isGeneratingPDF" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {{ isGeneratingPDF ? 'Generando PDF...' : 'Descargar PDF' }}
          </button>
          <button
            @click="handlePrint"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
          >
            Imprimir
          </button>
          <NuxtLink
            to="/simulador/credito"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
          >
            Volver al simulador
          </NuxtLink>
        </div>
      </div>
      <!-- Error message -->
      <div v-if="pdfError" class="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
        {{ pdfError }}
      </div>
    </div>

    <!-- Documento A4 -->
    <div id="pdf-container" class="w-[210mm] h-[297mm] mx-auto bg-white shadow-2xl print:shadow-none relative overflow-hidden" :class="{ 'shadow-none': isPdfMode }">

      <!-- Header -->
      <div class="bg-primary px-8 py-5 flex justify-between items-center">
        <a href="https://www.contuhogar.com/" target="_blank" rel="noopener noreferrer">
          <Logo variant="white" class="h-10 w-auto" />
        </a>
        <div class="text-right">
          <p class="text-[10px] text-white/70 uppercase tracking-wider">Carta de preaprobación</p>
          <p class="text-xs font-medium text-white">{{ docNumber }}</p>
          <p class="text-[10px] text-white/70">{{ currentDate }}</p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="px-8 py-5">

        <!-- Título con nombre -->
        <div class="text-center mb-10 mt-5">
          <h1 class="text-3xl font-bold text-primary mb-1">¡Felicitaciones, {{ nombreCompleto }}!</h1>
          <p class="text-gray-500">Has sido preaprobado para tu crédito de vivienda en Colombia</p>
        </div>

        <!-- Datos principales -->
        <div class="grid grid-cols-2 gap-5 mb-5">
          <div class="bg-primary rounded-lg p-4">
            <p class="text-xs text-white font-bold uppercase tracking-wide mb-1">Monto preaprobado</p>
            <p class="text-2xl font-bold text-white">{{ formatCurrency(mockData.montoSolicitado) }}</p>
          </div>
          <div class="bg-secondary rounded-lg p-4">
            <p class="text-xs text-white font-bold uppercase tracking-wide mb-1">Cuota mensual estimada</p>
            <p class="text-2xl font-bold text-white">{{ formatCurrency(mockData.cuotaMensual) }}</p>
          </div>
        </div>

        <!-- Tabla de detalles -->
        <div class="bg-muted rounded-lg overflow-hidden mb-10">
          <!-- <div class="bg-primary/90 px-4 py-2 border-b border-white/10">
            <h3 class="text-white font-semibold text-sm">Detalle de tu preaprobación</h3>
          </div> -->
          <div class="divide-y divide-primary/10">
            <div class="flex justify-between items-center px-4 py-2">
              <span class="text-primary text-sm">Modalidad de crédito</span>
              <span class="font-medium text-primary text-sm">{{ tipoCreditoLabel }}</span>
            </div>
            <div class="flex justify-between items-center px-4 py-2">
              <span class="text-primary text-sm">Plazo del crédito</span>
              <span class="font-medium text-primary text-sm">{{ mockData.plazoMeses }} meses ({{ Math.floor(mockData.plazoMeses / 12) }} años)</span>
            </div>
            <div class="flex justify-between items-center px-4 py-2">
              <span class="text-primary text-sm">Tasa de interés (E.A.)</span>
              <span class="font-medium text-primary text-sm">{{ (mockData.tasaEA * 100).toFixed(2) }}%</span>
            </div>
            <div class="flex justify-between items-center px-4 py-2">
              <span class="text-primary text-sm">Financiación del inmueble</span>
              <span class="font-medium text-primary text-sm">{{ Math.ceil(mockData.porcentajeFinanciacion) }}%</span>
            </div>
            <div class="flex justify-between items-center px-4 py-2">
              <span class="text-primary text-sm">Compromiso de ingresos</span>
              <span class="font-medium text-secondary text-sm">{{ Math.ceil(mockData.porcentajeCompromiso) }}%</span>
            </div>
            <div v-if="mockData.tipoCredito === 'leasing'" class="flex justify-between items-center px-4 py-2">
              <span class="text-primary text-sm">Opción de compra</span>
              <span class="font-medium text-primary text-sm">10% del valor del inmueble</span>
            </div>
          </div>
        </div>

        <!-- Condiciones -->
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-10">
          <div class="flex items-start gap-2">
            <svg class="w-4 h-4 text-amber-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <div>
              <h4 class="font-semibold text-primary text-lg -mt-1 mb-1">Condiciones y vigencia</h4>
              <ul class="space-y-0.5">
                <li class="text-sm text-primary">• <strong>Vigencia:</strong> válida hasta el {{ expirationDate }} (30 días).</li>
                <li class="text-sm text-primary">• Sujeta a verificación de documentos y análisis crediticio.</li>
                <li class="text-sm text-primary">• Este simulador tiene fines exclusivamente informativos y no constituye una oferta ni aprobación de crédito. La entidad financiera que usted elija será la única responsable de realizar el estudio, evaluación y aprobación definitiva de su solicitud.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- CTA y Asesor -->
        <div class="bg-primary rounded-lg p-4 mb-10">
          <div class="text-center mb-3">
            <h3 class="text-lg font-bold text-white mb-0.5">¿Listo para continuar?</h3>
            <p class="text-white/70 text-xs">Contacta a tu asesor asignado para completar tu solicitud</p>
          </div>

          <div class="bg-white/10 rounded-lg p-3 flex items-center gap-3">
            <img
              src="/team/alejandra-perez.avif"
              alt="Alejandra Pérez"
              class="w-10 h-10 rounded-lg object-cover"
            />
            <div class="flex-1">
              <p class="font-semibold text-white text-sm">Alejandra Pérez</p>
              <p class="text-white/70 text-xs">Gerente</p>
            </div>
            <div class="text-right">
              <p class="text-white text-sm"><a href="mailto:gerenciacomercial@contuhogar.com">gerenciacomercial@contuhogar.com</a></p>
              <p class="text-white/70 text-sm"><a href="tel:+573208033672">+57 320 803 3672</a></p>
            </div>
          </div>
        </div>

        <!-- Bancos aliados -->
        <div class="mb-3">
          <div class="flex justify-center items-center gap-10 py-2 px-4 bg-gray-50 rounded-lg border border-gray-100">
            <template v-for="logo in store.bankLogos" :key="logo.name">
              <span v-if="logo.type === 'text'" class="text-lg font-bold text-gray-400 opacity-50">{{ logo.value }}</span>
              <img v-else :src="logo.value" :alt="logo.name" class="h-8 opacity-50 grayscale" />
            </template>
          </div>
        </div>

      </div>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 bg-primary px-8 py-5">
        <div class="flex justify-between items-center">
          <p class="text-[9px] text-white"><a href="https://www.contuhogar.com" target="_blank" rel="noopener noreferrer">www.contuhogar.com</a></p>
          <p class="text-[9px] text-white">Especialistas en crédito de vivienda para colombianos en el exterior</p>
          <p class="text-[9px] text-white">© {{ new Date().getFullYear() }} ContuHogar</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils/formatters';

// Store
const store = useMainStore();

// PDF generation
const { generatePDF: generatePDFFromElement, isGenerating: isGeneratingPDF, error: pdfError } = useGeneratePDFFromElement();

// SEO
definePageMeta({
  layout: false
});

useSeoMeta({
  title: 'Preview Carta de preaprobación | ContuHogar',
  robots: 'noindex, nofollow'
});

// Leer datos desde query params o usar mock data
const route = useRoute();

// Decodificar datos de query param si existe
const getDataFromQuery = () => {
  const dataParam = route.query.data as string;
  if (dataParam) {
    try {
      return JSON.parse(decodeURIComponent(dataParam));
    } catch (e) {
      console.error('Error parsing data from query:', e);
    }
  }
  return null;
};

const queryData = getDataFromQuery();

// Datos de ejemplo para preview (o datos reales si vienen de query)
const mockData = reactive({
  nombres: queryData?.nombres || 'Israel',
  apellidos: queryData?.apellidos || 'Senior',
  tipoCredito: (queryData?.tipoCredito || 'hipotecario') as 'hipotecario' | 'leasing',
  montoSolicitado: queryData?.montoSolicitado || 350000000,
  cuotaMensual: queryData?.cuotaMensual || 2850000,
  plazoMeses: queryData?.plazoMeses || 240,
  tasaEA: queryData?.tasaEA || 0.1195,
  porcentajeFinanciacion: queryData?.porcentajeFinanciacion || 70,
  porcentajeCompromiso: queryData?.porcentajeCompromiso || 28
});

// Indicar si estamos en modo PDF (para ocultar controles)
const isPdfMode = computed(() => !!route.query.pdf);

// Ya no se usa auto-download - la descarga es directa desde StepResults

// Computed
const nombreCompleto = computed(() =>
  `${mockData.nombres} ${mockData.apellidos}`.trim() || 'Estimado Cliente'
);

const tipoCreditoLabel = computed(() => {
  if (mockData.tipoCredito === 'hipotecario') return 'Crédito Hipotecario';
  if (mockData.tipoCredito === 'leasing') return 'Leasing Habitacional';
  return 'Por definir';
});

// Generar número de documento (solo en cliente para evitar hydration mismatch)
const docNumber = ref('');

// Generar número solo en cliente
if (import.meta.client) {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  docNumber.value = `CTH-${year}${month}${day}-${random}`;
} else {
  // Placeholder para SSR que será reemplazado en cliente
  docNumber.value = 'CTH-XXXXXXXX-XXXXXX';
}

// Formatear fecha actual
const currentDate = new Date().toLocaleDateString('es-CO', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

// Fecha de vencimiento (30 días)
const expirationDate = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
});

// Función para descargar PDF
const handleDownloadPDF = async () => {
  const filename = `preaprobación_ContuHogar_${new Date().toISOString().split('T')[0]}.pdf`;
  await generatePDFFromElement('pdf-container', filename);
};

// Función para imprimir
const handlePrint = () => {
  if (import.meta.client) {
    window.print();
  }
};

// Esta página es solo para preview/print manual
// La descarga de PDF ahora se hace directamente desde StepResults
</script>

<style>
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
