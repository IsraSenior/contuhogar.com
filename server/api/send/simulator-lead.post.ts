// API endpoint para notificar leads del simulador a Telegram y opcionalmente por email
import { Resend } from 'resend';
import { z } from 'zod';
import { formatCurrency, getResultEmoji } from '../../utils/formatting';

const SimulatorLeadSchema = z.object({
  action: z.enum(['whatsapp', 'pdf', 'contact']),
  sessionId: z.string().nullable().optional(), // For server-side deduplication
  datosPersonales: z.object({
    nombres: z.string().nullable(),
    apellidos: z.string().nullable(),
    correo: z.string().nullable(),
    telefono: z.string().nullable(),
    telefonoCodigo: z.object({
      flag: z.string().optional(),
      code: z.string().optional()
    }).nullable().optional(),
    tipoCredito: z.enum(['hipotecario', 'leasing', 'remodelacion', 'compra_cartera']).nullable(),
    // Campos adicionales del store que se envían pero no se usan aquí
    fechaNacimiento: z.string().nullable().optional(),
    edad: z.number().nullable().optional()
  }).passthrough(), // Permitir campos adicionales
  datosBien: z.object({
    valorBien: z.number().nullable(),
    montoSolicitado: z.number().nullable(),
    plazoMeses: z.number()
  }).passthrough(), // Permitir campos adicionales
  resultado: z.object({
    resultado: z.enum(['aprobado', 'rechazado', 'advertencia']),
    cuotaMensual: z.number(),
    tasaEA: z.number(),
    porcentajeFinanciacion: z.number(),
    porcentajeCompromiso: z.number(),
    motivoRechazo: z.string().optional().nullable(),
    montoMaximoViable: z.number().optional().nullable()
  }).passthrough().nullable() // Permitir campos adicionales
});

type SimulatorLead = z.infer<typeof SimulatorLeadSchema>;

// Server-side deduplication cache (in-memory, 5 minute TTL)
// Key: `${sessionId}:${action}`, Value: timestamp
const notificationCache = new Map<string, number>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Check if this notification was recently sent (within TTL)
 * Returns true if duplicate (should skip), false if new
 */
function isDuplicateNotification(sessionId: string | undefined, action: string): boolean {
  if (!sessionId) return false; // Can't deduplicate without sessionId

  const key = `${sessionId}:${action}`;
  const now = Date.now();

  // Clean up expired entries
  for (const [k, timestamp] of notificationCache.entries()) {
    if (now - timestamp > CACHE_TTL_MS) {
      notificationCache.delete(k);
    }
  }

  // Check if exists and not expired
  const lastSent = notificationCache.get(key);
  if (lastSent && now - lastSent < CACHE_TTL_MS) {
    return true; // Duplicate
  }

  // Mark as sent
  notificationCache.set(key, now);
  return false; // Not a duplicate
}

// Formatear porcentaje (version local para redondeo especifico)
const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

// Obtener texto de acción con canal claramente identificado
const getActionText = (action: string): string => {
  switch (action) {
    case 'whatsapp': return '💬 Clic en WhatsApp';
    case 'pdf': return '📄 Descargó PDF';
    case 'contact': return '📝 Fue a Formulario';
    default: return action;
  }
};

// Obtener emoji y descripción del canal
const getChannelInfo = (action: string): { emoji: string; channel: string; description: string } => {
  switch (action) {
    case 'whatsapp':
      return {
        emoji: '💬',
        channel: 'WHATSAPP',
        description: 'Usuario hizo clic en botón de WhatsApp desde simulador'
      };
    case 'pdf':
      return {
        emoji: '📄',
        channel: 'DESCARGA PDF',
        description: 'Usuario descargó carta de preaprobación'
      };
    case 'contact':
      return {
        emoji: '📝',
        channel: 'FORMULARIO WEB',
        description: 'Usuario navegó al formulario de contacto desde simulador'
      };
    default:
      return {
        emoji: '📌',
        channel: action.toUpperCase(),
        description: 'Acción desde simulador'
      };
  }
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const tgToken = config.TELEGRAM_BOT_TOKEN as string | undefined;
  const tgChatId = config.TELEGRAM_CHAT_ID as string | number | undefined;
  const resendApi = config.RESEND_API_KEY as string | undefined;

  try {
    const body = await readBody(event);
    const data = SimulatorLeadSchema.parse(body);

    // Server-side deduplication check
    if (isDuplicateNotification(data.sessionId, data.action)) {
      console.log(`[Simulator Lead] Duplicate notification skipped: ${data.sessionId}:${data.action}`);
      return { ok: true, skipped: true, reason: 'duplicate' };
    }

    // Construir mensaje para Telegram
    const { datosPersonales, datosBien, resultado, action } = data;

    const fullName = [datosPersonales.nombres, datosPersonales.apellidos]
      .filter(Boolean)
      .join(' ') || 'N/D';

    const tel = datosPersonales.telefono
      ? `${datosPersonales.telefonoCodigo?.code || ''} ${datosPersonales.telefono}`.trim()
      : 'N/D';

    const TIPO_CREDITO_LABELS: Record<string, string> = {
      hipotecario: 'Crédito Hipotecario',
      leasing: 'Leasing Habitacional',
      remodelacion: 'Crédito de Remodelación',
      compra_cartera: 'Compra de Cartera',
    };
    const tipoCredito = datosPersonales.tipoCredito
      ? TIPO_CREDITO_LABELS[datosPersonales.tipoCredito] || 'N/D'
      : 'N/D';

    const resultadoText = resultado?.resultado
      ? `${getResultEmoji(resultado.resultado)} ${resultado.resultado.toUpperCase()}`
      : 'Sin resultado';

    // Obtener información del canal
    const channelInfo = getChannelInfo(action);

    // Construir mensaje de Telegram con canal claramente identificado
    const tgLines = [
      `🏠 *LEAD SIMULADOR*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `${channelInfo.emoji} *Canal:* ${channelInfo.channel}`,
      `📍 ${channelInfo.description}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      '',
      `👤 *Contacto:*`,
      `   Nombre: ${fullName}`,
      `   Email: ${datosPersonales.correo || 'N/D'}`,
      `   Tel: ${tel}`,
      '',
      `📋 *Simulación:*`,
      `   Tipo: ${tipoCredito}`,
      `   Valor inmueble: ${datosBien.valorBien ? formatCurrency(datosBien.valorBien) : 'N/D'}`,
      `   Monto solicitado: ${datosBien.montoSolicitado ? formatCurrency(datosBien.montoSolicitado) : 'N/D'}`,
      `   Plazo: ${datosBien.plazoMeses} meses (${Math.floor(datosBien.plazoMeses / 12)} años)`,
      '',
      `📊 *Resultado:* ${resultadoText}`
    ];

    if (resultado?.resultado === 'aprobado') {
      tgLines.push(
        `   Cuota mensual: ${formatCurrency(resultado.cuotaMensual)}`,
        `   Tasa EA: ${(resultado.tasaEA * 100).toFixed(2)}%`,
        `   Financiación: ${formatPercentage(resultado.porcentajeFinanciacion)}`,
        `   Compromiso ingresos: ${formatPercentage(resultado.porcentajeCompromiso)}`
      );
    } else if (resultado?.resultado === 'rechazado' && resultado.motivoRechazo) {
      tgLines.push(`   Motivo: ${resultado.motivoRechazo}`);
    } else if (resultado?.resultado === 'advertencia') {
      tgLines.push(
        `   Cuota: ${formatCurrency(resultado.cuotaMensual)}`,
        `   Compromiso: ${formatPercentage(resultado.porcentajeCompromiso)}`,
        resultado.montoMaximoViable ? `   Monto máx. viable: ${formatCurrency(resultado.montoMaximoViable)}` : ''
      );
    }

    const tgText = tgLines.filter(Boolean).join('\n');

    const tasks: Promise<any>[] = [];

    // Enviar a Telegram si está configurado
    if (tgToken && tgChatId) {
      tasks.push(
        fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: tgChatId,
            text: tgText,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
          })
        }).then(async (r) => {
          if (!r.ok) {
            const errText = await r.text().catch(() => '');
            throw new Error(`Telegram error ${r.status}: ${errText}`);
          }
          return r.json();
        })
      );
    }

    // Ejecutar tareas
    const results = await Promise.allSettled(tasks);

    // Log errores pero no fallar
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`[Simulator Lead] Task ${index} failed:`, result.reason);
      }
    });

    return { ok: true };

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('[Simulator Lead] Validation error:', error.errors);
      throw createError({
        statusCode: 400,
        message: 'Datos inválidos'
      });
    }

    console.error('[Simulator Lead] Error:', error);
    throw createError({
      statusCode: 500,
      message: 'Error procesando lead del simulador'
    });
  }
});
