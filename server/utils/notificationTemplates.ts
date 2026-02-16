// server/utils/notificationTemplates.ts
// Funciones puras que generan mensajes de notificacion (Telegram + Email).
// Auto-imported por Nitro en todo el server/.

// ---------------------------------------------------------------------------
// Constante centralizada de etiquetas de tipo de credito
// ---------------------------------------------------------------------------
export const TIPO_CREDITO_LABELS: Record<string, string> = {
  hipotecario: 'Credito Hipotecario',
  leasing: 'Leasing Habitacional',
  remodelacion: 'Credito de Remodelacion',
  compra_cartera: 'Compra de Cartera',
};

const SOURCE_COMPONENT_LABELS: Record<string, string> = {
  contact_form: 'Formulario de Contacto',
  whatsapp_widget: 'Widget WhatsApp',
  simulador: 'Simulador de Credito',
  newsletter: 'Newsletter',
};

// ---------------------------------------------------------------------------
// Tipos minimos esperados de los payloads de Directus
// ---------------------------------------------------------------------------
interface LeadPayload {
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  message?: string;
  source_page?: string;
  source_component?: string;
}

interface SimulationPayload {
  nombres?: string;
  apellidos?: string;
  correo?: string;
  telefono?: string;
  telefono_codigo_pais?: string;
  tipo_credito?: string;
  valor_bien?: number;
  monto_solicitado?: number;
  plazo_meses?: number;
  resultado?: string;
  cuota_mensual?: number;
  porcentaje_compromiso?: number;
  porcentaje_financiacion?: number;
  reportes_negativos_no_sabe?: boolean;
}

// ---------------------------------------------------------------------------
// Leads — Telegram
// ---------------------------------------------------------------------------
export function buildLeadTelegramMessage(lead: LeadPayload, directusKey?: string): string {
  const fullName = [lead.name, lead.lastname].filter(Boolean).join(' ') || 'N/D';
  const component = SOURCE_COMPONENT_LABELS[lead.source_component || ''] || lead.source_component || 'Desconocido';
  const page = lead.source_page || '/contacto';

  const lines: string[] = [
    `\uD83C\uDD95 *Nuevo lead* — ${component}`,
    '',
    '\uD83D\uDC64 *Contacto:*',
    `   Nombre: ${fullName}`,
    `   Email: ${lead.email || 'N/D'}`,
    `   Tel: ${lead.phone || 'N/D'}`,
    `   Componente: ${component}`,
    `   Pagina: ${page}`,
  ];

  if (lead.message && lead.message.trim().length > 0) {
    lines.push('');
    lines.push('\uD83D\uDCAC *Mensaje:*');
    lines.push(lead.message.trim());
  }

  if (directusKey) {
    lines.push('');
    lines.push(`\uD83D\uDD17 [Ver en Directus](https://admin.contuhogar.com/admin/content/leads/${directusKey})`);
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Leads — Email
// ---------------------------------------------------------------------------
export function buildLeadEmailHtml(lead: LeadPayload, directusKey?: string): { subject: string; html: string } {
  const fullName = [lead.name, lead.lastname].filter(Boolean).join(' ') || 'N/D';
  const component = SOURCE_COMPONENT_LABELS[lead.source_component || ''] || lead.source_component || 'Desconocido';
  const page = lead.source_page || '/contacto';
  const msg = lead.message?.trim() || '';

  // Sanitizacion HTML basica
  const safeMsg = msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const messageSection = safeMsg
    ? `<div class="row" style="margin-top:14px;"><div class="label">Mensaje</div><div class="value message">${safeMsg}</div></div>`
    : '';

  const directusLink = directusKey
    ? `<div class="row" style="margin-top:14px;"><a href="https://admin.contuhogar.com/admin/content/leads/${directusKey}" style="color:#2563eb;text-decoration:underline;">Ver lead en Directus</a></div>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Nuevo contacto</title>
  <style>
    body { margin:0; padding:0; background:#f6f8fb; }
    .container { max-width:640px; margin:0 auto; background:#ffffff; font-family:Arial,Helvetica,sans-serif; color:#111827; }
    .content { padding:16px 24px 8px; }
    .row { display:flex; gap:12px; margin:0 0 10px; }
    .label { width:160px; font-weight:bold; color:#374151; }
    .value { flex:1; color:#111827; }
    .message { padding:12px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:6px; white-space:pre-wrap; }
    .footer { padding:16px 24px 24px; color:#6b7280; font-size:12px; border-top:1px solid #e5e7eb; }
    @media (max-width:480px){ .row{display:block}.label{width:auto; margin-bottom:4px} }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <div class="row"><div class="label">Nombre</div><div class="value">${fullName}</div></div>
      <div class="row"><div class="label">Email</div><div class="value">${lead.email || 'N/D'}</div></div>
      <div class="row"><div class="label">Telefono</div><div class="value">${lead.phone || 'N/D'}</div></div>
      <div class="row"><div class="label">Componente</div><div class="value">${component}</div></div>
      <div class="row"><div class="label">Pagina</div><div class="value">${page}</div></div>
      ${messageSection}
      ${directusLink}
    </div>
    <div class="footer">Este correo fue generado automaticamente desde contuhogar.com</div>
  </div>
</body>
</html>`;

  return {
    subject: `Nuevo contacto [${fullName}] — ${component}`,
    html,
  };
}

// ---------------------------------------------------------------------------
// Simulaciones — Telegram
// ---------------------------------------------------------------------------
export function buildSimulationTelegramMessage(simulation: SimulationPayload, directusKey?: string): string {
  const fullName = [simulation.nombres, simulation.apellidos].filter(Boolean).join(' ') || 'N/D';
  const tel = [simulation.telefono_codigo_pais, simulation.telefono].filter(Boolean).join(' ') || 'N/D';
  const tipoLabel = TIPO_CREDITO_LABELS[simulation.tipo_credito || ''] || simulation.tipo_credito || 'N/D';
  const plazo = simulation.plazo_meses || 0;
  const anios = Math.floor(plazo / 12);
  const emoji = getResultEmoji(simulation.resultado || '');

  const lines: string[] = [
    '\uD83C\uDFE0 *NUEVA SIMULACION COMPLETADA*',
    '',
    '\uD83D\uDC64 *Contacto:*',
    `   Nombre: ${fullName}`,
    `   Email: ${simulation.correo || 'N/D'}`,
    `   Tel: ${tel}`,
    '',
    '\uD83D\uDCCA *Datos de Simulacion:*',
    `   Tipo: ${tipoLabel}`,
    `   Valor inmueble: ${formatCurrency(simulation.valor_bien || 0)}`,
    `   Monto solicitado: ${formatCurrency(simulation.monto_solicitado || 0)}`,
    `   Plazo: ${plazo} meses (${anios} a\u00F1os)`,
    '',
    '\uD83D\uDCB0 *Resultado:*',
    `   ${emoji} ${(simulation.resultado || 'N/D').toUpperCase()}`,
    `   Cuota: ${formatCurrency(simulation.cuota_mensual || 0)}`,
    `   Compromiso: ${Math.ceil(simulation.porcentaje_compromiso || 0)}%`,
    `   Financiacion: ${Math.ceil(simulation.porcentaje_financiacion || 0)}%`,
  ];

  if (simulation.reportes_negativos_no_sabe) {
    lines.push('');
    lines.push('\u26A0\uFE0F *Nota:* El usuario indico que NO SABE si tiene reportes negativos en centrales de riesgo.');
  }

  if (directusKey) {
    lines.push('');
    lines.push(`\uD83D\uDD17 [Ver en Directus](https://admin.contuhogar.com/admin/content/simulaciones_credito/${directusKey})`);
  }

  return lines.join('\n');
}
