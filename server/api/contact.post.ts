// server/api/contact.post.ts
import { z } from "zod";
import {
  createError,
  defineEventHandler,
  readBody,
  getRequestHeader,
} from "h3";
import { createDirectus, rest, staticToken, createItem } from "@directus/sdk";

const schema = z.object({
  firstName: z.string().min(2).max(60).trim(),
  lastName: z.string().min(2).max(60).trim(),
  email: z.string().email().toLowerCase(),
  dial: z.object({
    flag: z.string().min(1),
    code: z.string().min(1).max(6),
  }),
  phone: z.string().min(5).max(25).trim(),
  message: z.string().min(10).max(500).trim().optional(),
  source_page: z.string().optional(),
  // Honeypot (debe venir vacío)
  website: z.string().max(0).optional().or(z.literal("")),
  // Timestamp para validar tiempo mínimo de envío
  _formStartTime: z.number().optional(),
});

export default defineEventHandler(async (event) => {
  // Rate limiting: máximo 3 requests por 2 minutos (120 segundos)
  await rateLimit(event, {
    maxRequests: 3,
    windowSeconds: 120,
    message: "Has enviado demasiados mensajes. Por favor, espera un momento antes de intentarlo de nuevo.",
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
    const saved = await directusServer.request(createItem("leads", payload));
    return { ok: true, id: saved?.id };
  } catch (e: any) {
    console.error("Directus error:", e?.message || e);
    throw createError({
      statusCode: 500,
      statusMessage: "No se pudo guardar el mensaje",
    });
  }
});
