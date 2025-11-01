// server/api/contact.post.ts (o donde tengas tu handler)
import { Resend } from "resend";

type Body = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  dial?: { code?: string };
  message?: string;
  source_page?: string;
};

export default defineEventHandler(async (event) => {
  // Rate limiting: máximo 5 requests por 5 minutos (300 segundos)
  await rateLimit(event, {
    maxRequests: 5,
    windowSeconds: 300,
    message: "Has enviado demasiados mensajes. Por favor, espera un momento antes de intentarlo de nuevo.",
  });

  const config = useRuntimeConfig();

  const resendApi = config.RESEND_API_KEY as string | undefined;

  // Opcionales para Telegram (si no están, simplemente no se envía por TG)
  const tgToken = config.TELEGRAM_BOT_TOKEN as string | undefined;
  const tgChatId = config.TELEGRAM_CHAT_ID as string | number | undefined;

  if (!resendApi) {
    throw createError({
      statusCode: 500,
      statusMessage: "Resend no está configurado",
    });
  }

  const body = await readBody<Body>(event);

  if (!body?.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email de envío inválido",
    });
  }

  const resend = new Resend(resendApi);

  // Helpers
  const safe = (v?: string) => (v ?? "").toString().trim();
  const tel = `${safe(body.dial?.code)} ${safe(body.phone)}`.trim();
  const source = safe(body.source_page) || "/contact";
  const fullName = [safe(body.firstName), safe(body.lastName)].filter(Boolean).join(" ");
  const msg = safe(body.message);

  // Construimos el texto para Telegram (sin parse_mode para evitar problemas de escape)
  const tgText =
    [
      "🆕 Nuevo lead",
      `Nombre: ${fullName || "N/D"}`,
      `Email: ${safe(body.email)}`,
      `Tel: ${tel || "N/D"}`,
      `Origen: ${source}`,
      msg ? `Mensaje:\n${msg}` : ""
    ].filter(Boolean).join("\n");

  try {
    // Disparamos **en paralelo**: email y (si aplica) Telegram
    const tasks: Promise<any>[] = [];

    tasks.push(
      resend.emails.send({
        from: "ConTuHogar · Lead <admin@contuhogar.com>",
        to: "gerenciacomercial@contuhogar.com",
        bcc: "israsenior.dev@gmail.com",
        subject: `Nuevo mensaje de contacto [${fullName || safe(body.firstName)}]`,
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
      <div class="row"><div class="label">Nombre</div><div class="value">${fullName || safe(body.firstName)}</div></div>
      <div class="row"><div class="label">Email</div><div class="value">${safe(body.email)}</div></div>
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

    if (tgToken && tgChatId) {
      // Envío Telegram
      tasks.push(
        fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: tgChatId, // puede ser "-100xxxx" o "@MiCanal" o tu ID numérico
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

    // Ejecuta todo en paralelo; si falla Telegram, lo registramos pero no rompemos la respuesta
    const results = await Promise.allSettled(tasks);

    // Si el email falló, elevamos el error
    const emailResult = results[0];
    if (emailResult.status === "rejected") {
      throw emailResult.reason;
    }

    // Loguea si Telegram falló
    const tgResult = results[1];
    if (tgResult && tgResult.status === "rejected") {
      console.error("[Telegram] envío fallido:", tgResult.reason);
    }

    return { ok: true };
  } catch (e: any) {
    console.error("Contact handler error:", e?.message || e);
    throw createError({
      statusCode: 500,
      statusMessage: "No se pudo procesar el mensaje",
    });
  }
});