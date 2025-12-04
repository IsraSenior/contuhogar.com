// API endpoint para notificar leads del simulador a Telegram y opcionalmente por email
import { Resend } from 'resend';
import { z } from 'zod';

const SimulatorLeadSchema = z.object({
  action: z.enum(['whatsapp', 'pdf', 'contact']),
  datosPersonales: z.object({
    nombres: z.string().nullable(),
    apellidos: z.string().nullable(),
    correo: z.string().nullable(),
    telefono: z.string().nullable(),
    telefonoCodigo: z.object({
      code: z.string().optional()
    }).optional(),
    tipoCredito: z.enum(['hipotecario', 'leasing']).nullable()
  }),
  datosBien: z.object({
    valorBien: z.number().nullable(),
    montoSolicitado: z.number().nullable(),
    plazoMeses: z.number()
  }),
  resultado: z.object({
    resultado: z.enum(['aprobado', 'rechazado', 'advertencia']),
    cuotaMensual: z.number(),
    tasaEA: z.number(),
    porcentajeFinanciacion: z.number(),
    porcentajeCompromiso: z.number(),
    motivoRechazo: z.string().optional().nullable(),
    montoMaximoViable: z.number().optional().nullable()
  }).nullable()
});

type SimulatorLead = z.infer<typeof SimulatorLeadSchema>;

// Formatear moneda COP
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Formatear porcentaje
const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

// Obtener emoji según resultado
const getResultEmoji = (resultado: string): string => {
  switch (resultado) {
    case 'aprobado': return '✅';
    case 'rechazado': return '❌';
    case 'advertencia': return '⚠️';
    default: return '📊';
  }
};

// Obtener texto de acción
const getActionText = (action: string): string => {
  switch (action) {
    case 'whatsapp': return '💬 WhatsApp';
    case 'pdf': return '📄 Descarga PDF';
    case 'contact': return '📝 Formulario Contacto';
    default: return action;
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

    // Construir mensaje para Telegram
    const { datosPersonales, datosBien, resultado, action } = data;

    const fullName = [datosPersonales.nombres, datosPersonales.apellidos]
      .filter(Boolean)
      .join(' ') || 'N/D';

    const tel = datosPersonales.telefono
      ? `${datosPersonales.telefonoCodigo?.code || ''} ${datosPersonales.telefono}`.trim()
      : 'N/D';

    const tipoCredito = datosPersonales.tipoCredito === 'hipotecario'
      ? 'Crédito Hipotecario'
      : datosPersonales.tipoCredito === 'leasing'
        ? 'Leasing Habitacional'
        : 'N/D';

    const resultadoText = resultado?.resultado
      ? `${getResultEmoji(resultado.resultado)} ${resultado.resultado.toUpperCase()}`
      : 'Sin resultado';

    // Construir mensaje de Telegram
    const tgLines = [
      `🏠 *LEAD SIMULADOR* - ${getActionText(action)}`,
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
