// server/api/contact.post.ts
import { z } from "zod";
import {
  createError,
  defineEventHandler,
  readBody,
  getRequestHeader,
} from "h3";
import { createDirectus, rest, staticToken, createItem } from "@directus/sdk";
import { Resend } from "resend";
import { isDuplicateSubmission } from "../utils/duplicateDetection";
import { formatCurrency } from "../utils/formatting";

// Schema for validating parsed simuladorInfo JSON
// Based on types/simulador.ts structure
const simuladorInfoSchema = z.object({
  // From the simulator - credit type
  tipoCredito: z.enum(['hipotecario', 'leasing']).optional().nullable(),
  tipoCreditoLabel: z.string().optional().nullable(),

  // Property and loan details
  valorBien: z.number().positive().optional().nullable(),
  montoSolicitado: z.number().positive().optional().nullable(),
  plazoMeses: z.number().int().min(12).max(240).optional().nullable(),

  // Financial calculations
  cuotaMensual: z.number().positive().optional().nullable(),
  ingresoNeto: z.number().optional().nullable(),
  capacidadEndeudamiento: z.number().optional().nullable(),
  porcentajeCompromiso: z.number().min(0).max(100).optional().nullable(),
  porcentajeFinanciacion: z.number().min(0).max(100).optional().nullable(),

  // Result
  resultado: z.enum(['aprobado', 'rechazado', 'advertencia']).optional().nullable(),
  motivoRechazo: z.string().optional().nullable(),
}).strict().optional().nullable();

const schema = z.object({
  firstName: z.string().min(2).max(60).trim(),
  lastName: z.string().min(2).max(60).trim().optional().or(z.literal("")),
  email: z.string().email().toLowerCase(),
  dial: z.object({
    flag: z.string().min(1),
    code: z.string().min(1).max(6),
  }),
  phone: z.string().min(5).max(25).trim(),
  message: z.string().max(2000).trim().optional().or(z.literal("")), // Aumentado para incluir datos del simulador
  source_page: z.string().optional(),
  // Honeypot (debe venir vacío)
  website: z.string().max(0).optional().or(z.literal("")),
  // Timestamp para validar tiempo mínimo de envío
  _formStartTime: z.number().optional(),
  // Campo oculto con datos del simulador (JSON string)
  simuladorInfo: z.string().optional().or(z.literal("")),
  // Flag to skip Telegram if this is a simulator lead (already notified)
  _skipTelegramFromSimulator: z.boolean().optional(),
  // Simulator session ID for deduplication tracking
  _simuladorSessionId: z.string().optional(),

  // === Anti-spam fields (layer 2-4) ===
  // Bot detection
  _botDetected: z.boolean().optional(),
  _botKind: z.string().nullable().optional(),
  _botDetectionTimestamp: z.number().nullable().optional(),

  // Session tracking
  _sessionId: z.string().optional(),
  _fieldInteractions: z.number().optional(),
  _uniqueFields: z.number().optional(),
  _interactionDuration: z.number().optional(),
  _sessionStartTime: z.number().nullable().optional(),

  // Dynamic honeypots
  _honeypot1Name: z.string().optional(),
  _honeypot1Value: z.string().max(0).optional().or(z.literal("")),
  _honeypot2Name: z.string().optional(),
  _honeypot2Value: z.string().max(0).optional().or(z.literal("")),
});

export default defineEventHandler(async (event) => {
  // Rate limiting: máximo 8 requests por 5 minutos (300 segundos) - más permisivo
  await rateLimit(event, {
    maxRequests: 8,
    windowSeconds: 300,
    message: "Has alcanzado el límite de envíos. Por favor, espera unos minutos antes de intentarlo de nuevo.",
  });

  const body = await readBody(event);

  // Rechaza si el payload es muy grande (spam/bot)
  const contentLength = Number(
    getRequestHeader(event, "content-length") || "0"
  );
  if (contentLength > 20_000) {
    throw createError({ statusCode: 413, statusMessage: "Payload too large" });
  }

  const data = schema.safeParse(body);

  if (!data.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request", // corto y estándar
      message: "Errores de validación en el formulario", // descripción larga
      data: data.error.flatten(), // detalle de errores
    });
  }

  // === LAYER 1: Original honeypot validation ===
  // Honeypot validation - si tiene contenido, es spam/bot
  if (data.data.website && data.data.website.length > 0) {
    console.warn("[AntiSpam] Original honeypot triggered - potential spam/bot detected");
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }

  // === LAYER 2: Dynamic honeypot validation ===
  // Check dynamic honeypot fields
  if (data.data._honeypot1Value && data.data._honeypot1Value.length > 0) {
    console.warn(`[AntiSpam] Dynamic honeypot 1 (${data.data._honeypot1Name}) triggered`);
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }
  if (data.data._honeypot2Value && data.data._honeypot2Value.length > 0) {
    console.warn(`[AntiSpam] Dynamic honeypot 2 (${data.data._honeypot2Name}) triggered`);
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }

  // === LAYER 3: Bot detection validation ===
  // If client-side bot detection flagged this as a bot
  if (data.data._botDetected === true) {
    console.warn(`[AntiSpam] Bot detected by client (type: ${data.data._botKind})`);
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
      message: "Acceso denegado.",
    });
  }

  // === LAYER 4: Session/interaction validation ===
  // Validate minimum field interactions
  const MIN_FIELD_INTERACTIONS = 3;
  const MIN_UNIQUE_FIELDS = 2;
  const MIN_INTERACTION_DURATION = 1500; // 1.5 seconds

  if (data.data._fieldInteractions !== undefined && data.data._fieldInteractions < MIN_FIELD_INTERACTIONS) {
    console.warn(`[AntiSpam] Insufficient interactions (${data.data._fieldInteractions}/${MIN_FIELD_INTERACTIONS})`);
    // Log but don't block yet - combined with other signals
  }

  if (data.data._uniqueFields !== undefined && data.data._uniqueFields < MIN_UNIQUE_FIELDS) {
    console.warn(`[AntiSpam] Insufficient unique fields (${data.data._uniqueFields}/${MIN_UNIQUE_FIELDS})`);
    // Log but don't block yet - combined with other signals
  }

  // Check for very suspicious behavior (all signals combined)
  const isSuspicious =
    (data.data._fieldInteractions !== undefined && data.data._fieldInteractions < MIN_FIELD_INTERACTIONS) &&
    (data.data._uniqueFields !== undefined && data.data._uniqueFields < MIN_UNIQUE_FIELDS) &&
    (data.data._interactionDuration !== undefined && data.data._interactionDuration < MIN_INTERACTION_DURATION);

  if (isSuspicious) {
    console.warn("[AntiSpam] Multiple suspicious signals detected - likely bot");
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Por favor, completa el formulario correctamente.",
    });
  }

  // Validación de tiempo mínimo (anti-bot): al menos 3 segundos
  if (data.data._formStartTime) {
    const now = Date.now();
    const timeDiff = now - data.data._formStartTime;
    const MIN_FORM_TIME = 3000; // 3 segundos

    if (timeDiff < MIN_FORM_TIME) {
      console.warn(`[AntiSpam] Form submitted too fast (${timeDiff}ms) - potential bot detected`);
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Por favor, tómate un momento para completar el formulario.",
      });
    }
  }

  // === LAYER 5: Duplicate submission detection ===
  if (isDuplicateSubmission(data.data.email, data.data.message)) {
    console.warn(`[AntiSpam] Duplicate submission detected for ${data.data.email}`);
    throw createError({
      statusCode: 429,
      statusMessage: "Too Many Requests",
      message: "Ya has enviado esta solicitud recientemente. Por favor, espera antes de intentarlo de nuevo.",
    });
  }

  // === LAYER 6: Verificar que tengamos datos anti-spam ===
  const hasAntiSpamData = data.data._botDetected !== undefined ||
                          data.data._fieldInteractions !== undefined ||
                          data.data._sessionId !== undefined;

  if (!hasAntiSpamData) {
    console.warn("[AntiSpam] No anti-spam data present - suspicious");
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Verificación de seguridad requerida.",
    });
  }

  const config = useRuntimeConfig();
  const directusServer = createDirectus(config.DIRECTUS_URL)
    .with(staticToken(config.DIRECTUS_ADMIN_TOKEN))
    .with(rest());

  // const fullName = `${data.data.firstName} ${data.data.lastName}`.trim();

  const payload = {
    name: data.data.firstName,
    lastname: data.data.lastName,
    email: data.data.email,
    phone: `${data.data.dial.code} ${data.data.phone}`,
    message: data.data.message,
    source_page: data.data.source_page,
    status: "nuevo",
  };

  // console.log(payload, "payload_res")

  try {
    // 1. Guardar el lead en Directus
    const saved = await directusServer.request(createItem("leads", payload));
    const leadId = saved?.id;

    // 2. Enviar notificaciones (email y Telegram) en paralelo
    const resendApi = config.RESEND_API_KEY as string | undefined;
    const tgToken = config.TELEGRAM_BOT_TOKEN as string | undefined;
    const tgChatId = config.TELEGRAM_CHAT_ID as string | number | undefined;

    if (resendApi) {
      const resend = new Resend(resendApi);

      // Helpers
      const safe = (v?: string) => (v ?? "").toString().trim();
      const tel = `${data.data.dial.code} ${data.data.phone}`.trim();
      const source = safe(data.data.source_page) || "/contacto";
      const fullName = [safe(data.data.firstName), safe(data.data.lastName)].filter(Boolean).join(" ");
      const msg = safe(data.data.message);

      // Parsear y validar datos del simulador si existen
      let simuladorInfo: z.infer<typeof simuladorInfoSchema> = null;
      let simuladorText = '';
      if (data.data.simuladorInfo) {
        try {
          const parsedJson = JSON.parse(data.data.simuladorInfo);
          // Validate parsed JSON against schema
          const validationResult = simuladorInfoSchema.safeParse(parsedJson);
          if (validationResult.success) {
            simuladorInfo = validationResult.data;
          } else {
            console.warn('simuladorInfo validation failed:', validationResult.error.issues);
            // Continue without simuladorInfo - don't block the lead
            simuladorInfo = null;
          }

          if (simuladorInfo) {
            const tipoCredito = simuladorInfo.tipoCredito === 'hipotecario' ? 'Crédito Hipotecario' : 'Leasing Habitacional';
            const resultadoEmoji = simuladorInfo.resultado === 'aprobado' ? '✅' :
                                    simuladorInfo.resultado === 'rechazado' ? '❌' : '⚠️';
            simuladorText = `
📊 *DATOS DEL SIMULADOR:*
   Tipo: ${tipoCredito}
   Valor inmueble: ${formatCurrency(simuladorInfo.valorBien || 0)}
   Monto solicitado: ${formatCurrency(simuladorInfo.montoSolicitado || 0)}
   Plazo: ${simuladorInfo.plazoMeses} meses (${Math.floor((simuladorInfo.plazoMeses || 0) / 12)} años)
   Resultado: ${resultadoEmoji} ${simuladorInfo.resultado?.toUpperCase() || 'N/D'}
   ${simuladorInfo.cuotaMensual ? `Cuota: ${formatCurrency(simuladorInfo.cuotaMensual)}` : ''}`;
          }
        } catch (e) {
          console.warn('Error parsing simuladorInfo JSON:', e);
        }
      }

      // Construir texto para Telegram
      const tgText = [
        simuladorInfo ? "🏠 *LEAD SIMULADOR → CONTACTO*" : "🆕 *Nuevo lead*",
        "",
        `👤 *Contacto:*`,
        `   Nombre: ${fullName || "N/D"}`,
        `   Email: ${data.data.email}`,
        `   Tel: ${tel || "N/D"}`,
        `   Origen: ${source}`,
        simuladorText,
        msg ? `\n💬 *Mensaje:*\n${msg}` : ""
      ].filter(Boolean).join("\n");

      const tasks: Promise<any>[] = [];

      // Construir sección de simulador para email si existe
      let simuladorHtml = '';
      if (simuladorInfo) {
        const tipoCredito = simuladorInfo.tipoCredito === 'hipotecario' ? 'Crédito Hipotecario' : 'Leasing Habitacional';
        const resultadoColor = simuladorInfo.resultado === 'aprobado' ? '#059669' :
                               simuladorInfo.resultado === 'rechazado' ? '#dc2626' : '#d97706';
        const resultadoText = simuladorInfo.resultado === 'aprobado' ? '✅ PREAPROBADO' :
                              simuladorInfo.resultado === 'rechazado' ? '❌ NO CUMPLE REQUISITOS' : '⚠️ AJUSTE NECESARIO';

        simuladorHtml = `
      <div style="margin:16px 0; padding:16px; background:#f0fdf4; border:1px solid #86efac; border-radius:8px;">
        <div style="font-weight:bold; color:#166534; font-size:14px; margin-bottom:12px;">📊 DATOS DEL SIMULADOR</div>
        <div class="row"><div class="label">Tipo de crédito</div><div class="value">${tipoCredito}</div></div>
        <div class="row"><div class="label">Valor del inmueble</div><div class="value">${formatCurrency(simuladorInfo.valorBien || 0)}</div></div>
        <div class="row"><div class="label">Monto solicitado</div><div class="value">${formatCurrency(simuladorInfo.montoSolicitado || 0)}</div></div>
        <div class="row"><div class="label">Plazo</div><div class="value">${simuladorInfo.plazoMeses ?? 0} meses (${Math.floor((simuladorInfo.plazoMeses ?? 0) / 12)} años)</div></div>
        <div class="row"><div class="label">Resultado</div><div class="value" style="color:${resultadoColor}; font-weight:bold;">${resultadoText}</div></div>
        ${simuladorInfo.cuotaMensual ? `<div class="row"><div class="label">Cuota estimada</div><div class="value">${formatCurrency(simuladorInfo.cuotaMensual)}</div></div>` : ''}
        ${simuladorInfo.porcentajeCompromiso ? `<div class="row"><div class="label">Compromiso ingresos</div><div class="value">${Math.ceil(simuladorInfo.porcentajeCompromiso)}%</div></div>` : ''}
      </div>`;
      }

      // Determinar asunto del email
      const emailSubject = simuladorInfo
        ? `🏠 Lead Simulador → Contacto [${fullName || data.data.firstName}]`
        : `Nuevo mensaje de contacto [${fullName || data.data.firstName}]`;

      // Enviar email
      tasks.push(
        resend.emails.send({
          from: "ContuHogar · Lead <gerenciacomercial@contuhogar.com>",
          to: "gerenciacomercial@contuhogar.com",
          bcc: "israsenior.dev@gmail.com",
          subject: emailSubject,
          html: `
<!DOCTYPE html>
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
    ${simuladorInfo ? '<div style="background:#204491; color:white; padding:12px 24px; font-weight:bold;">🏠 Lead desde Simulador de Crédito</div>' : ''}
    <div class="content">
      <div class="row"><div class="label">Nombre</div><div class="value">${fullName || data.data.firstName}</div></div>
      <div class="row"><div class="label">Email</div><div class="value">${data.data.email}</div></div>
      <div class="row"><div class="label">Teléfono</div><div class="value">${tel || "N/D"}</div></div>
      <div class="row"><div class="label">Página de origen</div><div class="value">${source}</div></div>
      ${simuladorHtml}
      ${msg ? `<div class="row" style="margin-top:14px;"><div class="label">Mensaje</div><div class="value message">${msg.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div></div>` : ""}
    </div>
    <div class="footer">Este correo fue generado automáticamente desde el formulario de contacto.</div>
  </div>
</body>
</html>
`,
        })
      );

      // Enviar Telegram (si está configurado)
      // Skip if this is a simulator lead that was already notified
      const shouldSkipTelegram = data.data._skipTelegramFromSimulator === true && simuladorInfo;

      if (tgToken && tgChatId && !shouldSkipTelegram) {
        tasks.push(
          fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: tgChatId,
              text: tgText,
              parse_mode: "Markdown",
              disable_web_page_preview: true
            }),
          }).then(async (r) => {
            if (!r.ok) {
              const errText = await r.text().catch(() => "");
              throw new Error(`Telegram error ${r.status}: ${errText}`);
            }
            return r.json();
          })
        );
      } else if (shouldSkipTelegram) {
        console.log("[Contact] Skipping Telegram notification - simulator lead already notified");
      }

      // Ejecutar notificaciones en paralelo (no bloquean la respuesta)
      const results = await Promise.allSettled(tasks);

      // Logear fallos pero no romper la respuesta
      const emailResult = results[0];
      if (emailResult.status === "rejected") {
        console.error("[Email] envío fallido:", emailResult.reason);
      }

      const tgResult = results[1];
      if (tgResult && tgResult.status === "rejected") {
        console.error("[Telegram] envío fallido:", tgResult.reason);
      }
    }

    return { ok: true, id: leadId };
  } catch (e: any) {
    console.error("Contact handler error:", e?.message || e);
    throw createError({
      statusCode: 500,
      statusMessage: "No se pudo procesar tu solicitud. Por favor, inténtalo de nuevo.",
    });
  }
});
