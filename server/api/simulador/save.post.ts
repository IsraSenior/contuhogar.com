// server/api/simulador/save.post.ts
import { z } from "zod";
import {
  createError,
  defineEventHandler,
  readBody,
  getRequestHeader,
} from "h3";
import { createDirectus, rest, staticToken, createItem } from "@directus/sdk";
import { formatCurrency, getResultEmoji } from "../../utils/formatting";

// Validation schema for simulation data
const obligacionSchema = z.object({
  id: z.string(),
  tipo: z.enum(['tarjeta_credito', 'hipotecaria_arriendo', 'otra']),
  monto: z.number().min(0),
  descripcion: z.string().optional(),
});

const schema = z.object({
  // Datos personales
  nombres: z.string().min(2).max(100).trim(),
  apellidos: z.string().min(2).max(100).trim(),
  fechaNacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  telefono: z.string().min(5).max(25).trim(),
  telefonoCodigo: z.object({
    flag: z.string().min(1),
    code: z.string().min(1).max(6),
  }),
  correo: z.string().email().toLowerCase(),
  edad: z.number().int().min(18).max(84),
  tipoCredito: z.enum(['hipotecario', 'leasing', 'remodelacion', 'compra_cartera']),

  // Datos del bien
  valorBien: z.number().positive(),
  montoSolicitado: z.number().positive(),
  plazoMeses: z.number().int().min(12).max(240),
  paisResidencia: z.string().min(2).max(10).nullable(),
  tipoInmueble: z.enum(['nuevo', 'usado', 'por_definir']).nullable(),

  // Datos de ingresos
  ingresosFijos: z.number().min(0),
  ingresosVariables: z.number().min(0),
  deducciones: z.number().min(0),
  obligacionesFinancieras: z.array(obligacionSchema),

  // Datos de elegibilidad
  statusMigratorio: z.boolean(),
  reportesNegativos: z.boolean(),
  reportesNegativosNoSabe: z.boolean().optional().default(false),

  // Resultado de la simulación
  resultado: z.object({
    resultado: z.enum(['aprobado', 'rechazado', 'advertencia']),
    cuotaMensual: z.number(),
    tasaEA: z.number(),
    tasaMensual: z.number(),
    ingresosNetos: z.number(),
    porcentajeCompromiso: z.number(),
    edadFinal: z.number(),
    porcentajeFinanciacion: z.number(),
    montoMaximoViable: z.number().optional(),
    motivoRechazo: z.string().optional(),
    recomendaciones: z.array(z.string()).optional(),
  }),
  // Meta Pixel event ID for CAPI deduplication
  _metaEventId: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  // Rate limiting: 10 saves per 5 minutes (allows testing and legitimate retries)
  await rateLimit(event, {
    maxRequests: 10,
    windowSeconds: 300,
    message: "Has guardado demasiadas simulaciones recientemente. Por favor, espera unos minutos.",
  });

  const body = await readBody(event);

  // Validate payload size
  const contentLength = Number(
    getRequestHeader(event, "content-length") || "0"
  );
  if (contentLength > 50_000) {
    throw createError({ statusCode: 413, statusMessage: "Payload too large" });
  }

  const data = schema.safeParse(body);

  if (!data.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Errores de validación en los datos de simulación",
      data: data.error.flatten(),
    });
  }

  const config = useRuntimeConfig();
  const directusServer = createDirectus(config.DIRECTUS_URL)
    .with(staticToken(config.DIRECTUS_ADMIN_TOKEN))
    .with(rest());

  // Get client IP and user agent for traceability
  const forwardedFor = getRequestHeader(event, "x-forwarded-for");
  const clientIP = getRequestHeader(event, "cf-connecting-ip") ||
                   getRequestHeader(event, "x-real-ip") ||
                   (forwardedFor ? forwardedFor.split(",")[0]?.trim() : undefined) ||
                   event.node.req.socket.remoteAddress ||
                   "unknown";

  const userAgent = getRequestHeader(event, "user-agent") || "unknown";

  // Calculate total obligations
  const totalObligaciones = data.data.obligacionesFinancieras.reduce(
    (sum, obligacion) => sum + obligacion.monto,
    0
  );

  // Prepare payload for Directus (field names must match Directus schema)
  const payload = {
    // Datos personales
    nombres: data.data.nombres,
    apellidos: data.data.apellidos,
    fecha_nacimiento: data.data.fechaNacimiento,
    telefono: data.data.telefono,
    telefono_codigo_pais: data.data.telefonoCodigo.code,
    correo: data.data.correo,
    edad: data.data.edad,
    tipo_credito: data.data.tipoCredito,

    // Datos del bien
    valor_bien: data.data.valorBien,
    monto_solicitado: data.data.montoSolicitado,
    plazo_meses: data.data.plazoMeses,
    porcentaje_financiacion: data.data.resultado.porcentajeFinanciacion,
    pais_residencia: data.data.paisResidencia,
    tipo_inmueble: data.data.tipoInmueble,

    // Datos de ingresos
    ingresos_fijos: data.data.ingresosFijos,
    ingresos_variables: data.data.ingresosVariables,
    deducciones: data.data.deducciones,
    ingresos_netos: data.data.resultado.ingresosNetos,
    obligaciones_financieras: data.data.obligacionesFinancieras,
    total_obligaciones_mensuales: totalObligaciones,

    // Datos de elegibilidad
    status_migratorio: data.data.statusMigratorio,
    reportes_negativos: data.data.reportesNegativos,

    // Resultado
    resultado: data.data.resultado.resultado,
    cuota_mensual: data.data.resultado.cuotaMensual,
    tasa_ea: data.data.resultado.tasaEA,
    tasa_mensual: data.data.resultado.tasaMensual,
    porcentaje_compromiso: data.data.resultado.porcentajeCompromiso,
    edad_final: data.data.resultado.edadFinal,
    monto_maximo_viable: data.data.resultado.montoMaximoViable,
    motivo_rechazo: data.data.resultado.motivoRechazo,
    recomendaciones: data.data.resultado.recomendaciones,

    // Metadata for traceability
    ip_address: clientIP,
    user_agent: userAgent,
    status: "nuevo", // Estado inicial del lead de simulador
  };

  try {
    // Save simulation to Directus
    const saved = await directusServer.request(
      createItem("simulaciones_credito", payload)
    ) as any;

    // Meta CAPI: Send CompleteRegistration event (fire-and-forget)
    if (data.data._metaEventId) {
      sendCapiEvent({
        event,
        eventName: 'CompleteRegistration',
        eventId: data.data._metaEventId,
        userData: {
          email: data.data.correo,
          phone: `${data.data.telefonoCodigo.code}${data.data.telefono}`.replace(/\s/g, ''),
          firstName: data.data.nombres,
          lastName: data.data.apellidos,
        },
        customData: {
          content_name: 'simulador_credito',
          content_category: data.data.tipoCredito,
          value: data.data.montoSolicitado,
          currency: 'COP',
          status: data.data.resultado.resultado,
        },
      })
    }

    // Send Telegram notification (non-blocking)
    const tgToken = config.TELEGRAM_BOT_TOKEN as string | undefined;
    const tgChatId = config.TELEGRAM_CHAT_ID as string | number | undefined;

    if (tgToken && tgChatId) {
      const TIPO_CREDITO_LABELS: Record<string, string> = {
        hipotecario: 'Crédito Hipotecario',
        leasing: 'Leasing Habitacional',
        remodelacion: 'Crédito de Remodelación',
        compra_cartera: 'Compra de Cartera',
      };
      const tipoCredito = TIPO_CREDITO_LABELS[data.data.tipoCredito] || data.data.tipoCredito;
      const fullName = `${data.data.nombres} ${data.data.apellidos}`.trim();
      const tel = `${data.data.telefonoCodigo.code} ${data.data.telefono}`.trim();
      const resultadoEmoji = getResultEmoji(data.data.resultado.resultado);

      const tgMessage = `🏠 *NUEVA SIMULACIÓN COMPLETADA*

👤 *Contacto:*
   Nombre: ${fullName}
   Email: ${data.data.correo}
   Tel: ${tel}

📊 *Datos de Simulación:*
   Tipo: ${tipoCredito}
   Valor inmueble: ${formatCurrency(data.data.valorBien)}
   Monto solicitado: ${formatCurrency(data.data.montoSolicitado)}
   Plazo: ${data.data.plazoMeses} meses (${Math.floor(data.data.plazoMeses / 12)} años)

💰 *Resultado:*
   ${resultadoEmoji} ${data.data.resultado.resultado.toUpperCase()}
   Cuota: ${formatCurrency(data.data.resultado.cuotaMensual)}
   Compromiso: ${Math.ceil(data.data.resultado.porcentajeCompromiso)}%
   Financiación: ${Math.ceil(data.data.resultado.porcentajeFinanciacion)}%${data.data.reportesNegativosNoSabe ? '\n\n⚠️ *Nota:* El usuario indicó que NO SABE si tiene reportes negativos en centrales de riesgo.' : ''}`;

      // Fire and forget - don't wait for Telegram response
      fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: tgMessage,
          parse_mode: "Markdown",
          disable_web_page_preview: true
        }),
      }).catch((err) => {
        console.error("[Telegram] notification failed:", err);
      });
    }

    return {
      ok: true,
      id: saved?.id || null,
      message: "Simulación guardada exitosamente",
    };
  } catch (e: any) {
    console.error("Simulador save error:", e?.message || e);

    // Check if it's a Directus-specific error
    if (e?.errors && Array.isArray(e.errors)) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error al guardar en la base de datos",
        message: "No se pudo guardar la simulación. Por favor, inténtalo de nuevo.",
        data: { details: e.errors },
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Error interno del servidor",
      message: "No se pudo procesar tu simulación. Por favor, inténtalo de nuevo.",
    });
  }
});
