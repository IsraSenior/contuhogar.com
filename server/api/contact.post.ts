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

const schema = z.object({
  firstName: z.string().min(2).max(60).trim(),
  lastName: z.string().min(2).max(60).trim().optional().or(z.literal("")),
  email: z.string().email().toLowerCase(),
  dial: z.object({
    flag: z.string().min(1),
    code: z.string().min(1).max(6),
  }),
  phone: z.string().min(5).max(25).trim(),
  message: z.string().max(500).trim().optional().or(z.literal("")),
  source_page: z.string().optional(),
  // Honeypot (debe venir vacío)
  website: z.string().max(0).optional().or(z.literal("")),
  // Timestamp para validar tiempo mínimo de envío
  _formStartTime: z.number().optional(),
  // CAPTCHA validation
  _captchaAnswer: z.number(),
  _captchaUserAnswer: z.number(),
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

  // Honeypot validation - si tiene contenido, es spam/bot
  if (data.data.website && data.data.website.length > 0) {
    console.warn("Honeypot triggered - potential spam/bot detected");
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }

  // Validación de tiempo mínimo (anti-bot): al menos 3 segundos
  if (data.data._formStartTime) {
    const now = Date.now();
    const timeDiff = now - data.data._formStartTime;
    const MIN_FORM_TIME = 3000; // 3 segundos

    if (timeDiff < MIN_FORM_TIME) {
      console.warn(`Form submitted too fast (${timeDiff}ms) - potential bot detected`);
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Por favor, tómate un momento para completar el formulario.",
      });
    }
  }

  // CAPTCHA validation
  if (data.data._captchaAnswer !== data.data._captchaUserAnswer) {
    console.warn("CAPTCHA validation failed");
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Verificación anti-spam incorrecta. Por favor, intenta de nuevo.",
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
    // created_at: new Date().toISOString(),
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

      // Construir texto para Telegram
      const tgText = [
        "🆕 Nuevo lead",
        `Nombre: ${fullName || "N/D"}`,
        `Email: ${data.data.email}`,
        `Tel: ${tel || "N/D"}`,
        `Origen: ${source}`,
        msg ? `Mensaje:\n${msg}` : ""
      ].filter(Boolean).join("\n");

      const tasks: Promise<any>[] = [];

      // Enviar email
      tasks.push(
        resend.emails.send({
          from: "ConTuHogar · Lead <admin@contuhogar.com>",
          to: "gerenciacomercial@contuhogar.com",
          bcc: "israsenior.dev@gmail.com",
          subject: `Nuevo mensaje de contacto [${fullName || data.data.firstName}]`,
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
    <div class="content">
      <div class="row"><div class="label">Nombre</div><div class="value">${fullName || data.data.firstName}</div></div>
      <div class="row"><div class="label">Email</div><div class="value">${data.data.email}</div></div>
      <div class="row"><div class="label">Teléfono</div><div class="value">${tel || "N/D"}</div></div>
      <div class="row"><div class="label">Página de origen</div><div class="value">${source}</div></div>
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
      if (tgToken && tgChatId) {
        tasks.push(
          fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: tgChatId,
              text: tgText,
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
