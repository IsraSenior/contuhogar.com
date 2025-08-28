import { Resend } from "resend";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const resendApi = config.RESEND_API_KEY;

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
  // gerenciacomercial@contuhogar.com

  try {
    const sent = await resend.emails.send({
      from: "ConTuHogar · Lead <admin@contuhogar.com>",
      to: "israsenior.dev@gmail.com",
      subject: `Nuevo mensaje de contacto [${body.firstName} ${body.lastName}]`,
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
    .header { padding:20px 24px; border-bottom:1px solid #e5e7eb; }
    .title { margin:0; font-size:18px; }
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
      <div class="row">
        <div class="label">Nombre</div>
        <div class="value">${body.firstName}</div>
      </div>
      <div class="row">
        <div class="label">Apellido</div>
        <div class="value">${body.lastName}</div>
      </div>
      <div class="row">
        <div class="label">Email</div>
        <div class="value">${body.email}</div>
      </div>
      <div class="row">
        <div class="label">Teléfono</div>
        <div class="value">${body.dial.code} ${body.phone}</div>
      </div>
      <div class="row">
        <div class="label">Página de origen</div>
        <div class="value">${body.source_page}</div>
      </div>

      <div class="row" style="margin-top:14px;">
        <div class="label">Mensaje</div>
        <div class="value message">${body.message}</div>
      </div>
    </div>

    <div class="footer">
      Este correo fue generado automáticamente desde el formulario de contacto.
    </div>
  </div>
</body>
</html>
`,
    });
    // console.log(sent)
    return { ok: true };
  } catch (e: any) {
    console.error("Directus error:", e?.message || e);
    throw createError({
      statusCode: 500,
      statusMessage: "No se pudo guardar el mensaje",
    });
  }
});
