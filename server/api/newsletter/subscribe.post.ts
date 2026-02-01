// server/api/newsletter/subscribe.post.ts
import { z } from "zod";
import {
  createError,
  defineEventHandler,
  readBody,
  getRequestHeader,
} from "h3";
import { createDirectus, rest, staticToken, createItem, readItems } from "@directus/sdk";
import { rateLimit, getClientIP } from "../../utils/rateLimit";
import { getDeviceType, getBrowserName, getOperatingSystem } from "../../utils/deviceDetection";

// Zod schema for newsletter subscription
const subscribeSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  source_page: z.string().max(500).optional(),

  // UTM parameters
  utm_source: z.string().max(100).optional().nullable(),
  utm_medium: z.string().max(100).optional().nullable(),
  utm_campaign: z.string().max(100).optional().nullable(),

  // Locale
  locale: z.string().max(10).optional().nullable(),

  // === Honeypot fields (must be empty) ===
  website: z.string().max(0).optional().or(z.literal("")), // Original honeypot

  // Dynamic honeypots
  _honeypot1Name: z.string().optional(),
  _honeypot1Value: z.string().max(0).optional().or(z.literal("")),
  _honeypot2Name: z.string().optional(),
  _honeypot2Value: z.string().max(0).optional().or(z.literal("")),

  // === Bot detection fields ===
  _botDetected: z.boolean().optional(),
  _botKind: z.string().nullable().optional(),
  _botDetectionTimestamp: z.number().nullable().optional(),

  // === Session/interaction tracking ===
  _sessionId: z.string().optional(),
  _fieldInteractions: z.number().optional(),
  _uniqueFields: z.number().optional(),
  _interactionDuration: z.number().optional(),
  _sessionStartTime: z.number().nullable().optional(),

  // Form timing
  _formStartTime: z.number().optional(),
});

export default defineEventHandler(async (event) => {
  // Rate limiting: 5 requests per 5 minutes (300 seconds) per IP
  await rateLimit(event, {
    maxRequests: 5,
    windowSeconds: 300,
    message: "Has alcanzado el limite de suscripciones. Por favor, espera unos minutos antes de intentarlo de nuevo.",
  });

  const body = await readBody(event);

  // Reject overly large payloads (spam/bot protection)
  const contentLength = Number(
    getRequestHeader(event, "content-length") || "0"
  );
  if (contentLength > 10_000) {
    throw createError({ statusCode: 413, statusMessage: "Payload too large" });
  }

  const data = subscribeSchema.safeParse(body);

  if (!data.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Email invalido o datos de formulario incorrectos",
      data: data.error.flatten(),
    });
  }

  // === LAYER 1: Original honeypot validation ===
  if (data.data.website && data.data.website.length > 0) {
    console.warn("[Newsletter] Original honeypot triggered - potential spam/bot detected");
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }

  // === LAYER 2: Dynamic honeypot validation ===
  if (data.data._honeypot1Value && data.data._honeypot1Value.length > 0) {
    console.warn(`[Newsletter] Dynamic honeypot 1 (${data.data._honeypot1Name}) triggered`);
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }
  if (data.data._honeypot2Value && data.data._honeypot2Value.length > 0) {
    console.warn(`[Newsletter] Dynamic honeypot 2 (${data.data._honeypot2Name}) triggered`);
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }

  // === LAYER 3: Bot detection validation ===
  if (data.data._botDetected === true) {
    console.warn(`[Newsletter] Bot detected by client (type: ${data.data._botKind})`);
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
      message: "Acceso denegado.",
    });
  }

  // === LAYER 4: Session/interaction validation ===
  const MIN_FIELD_INTERACTIONS = 2;
  const MIN_UNIQUE_FIELDS = 1; // At least email field interaction
  const MIN_INTERACTION_DURATION = 1000; // 1 second minimum

  // Check for very suspicious behavior (all signals combined)
  const isSuspicious =
    (data.data._fieldInteractions !== undefined && data.data._fieldInteractions < MIN_FIELD_INTERACTIONS) &&
    (data.data._uniqueFields !== undefined && data.data._uniqueFields < MIN_UNIQUE_FIELDS) &&
    (data.data._interactionDuration !== undefined && data.data._interactionDuration < MIN_INTERACTION_DURATION);

  if (isSuspicious) {
    console.warn("[Newsletter] Multiple suspicious signals detected - likely bot");
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Por favor, completa el formulario correctamente.",
    });
  }

  // === LAYER 5: Form timing validation (anti-bot) ===
  if (data.data._formStartTime) {
    const now = Date.now();
    const timeDiff = now - data.data._formStartTime;
    const MIN_FORM_TIME = 2000; // 2 seconds minimum for newsletter

    if (timeDiff < MIN_FORM_TIME) {
      console.warn(`[Newsletter] Form submitted too fast (${timeDiff}ms) - potential bot detected`);
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Por favor, toma un momento para completar el formulario.",
      });
    }
  }

  // === LAYER 6: Verify anti-spam data presence ===
  const hasAntiSpamData = data.data._botDetected !== undefined ||
                          data.data._fieldInteractions !== undefined ||
                          data.data._sessionId !== undefined;

  if (!hasAntiSpamData) {
    console.warn("[Newsletter] No anti-spam data present - suspicious");
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Verificacion de seguridad requerida.",
    });
  }

  const config = useRuntimeConfig();
  const directusServer = createDirectus(config.DIRECTUS_URL)
    .with(staticToken(config.DIRECTUS_ADMIN_TOKEN))
    .with(rest());

  // Get client metadata
  const ip = getClientIP(event);
  const userAgent = getRequestHeader(event, "user-agent") || "";
  const deviceType = getDeviceType(userAgent);
  const browser = getBrowserName(userAgent);
  const os = getOperatingSystem(userAgent);

  try {
    // === Check for existing subscription (duplicate detection) ===
    const existingSubscribers = await directusServer.request(
      readItems("newsletter_subscribers", {
        filter: {
          email: {
            _eq: data.data.email,
          },
        },
        fields: ["id", "status", "email"],
        limit: 1,
      })
    );

    if (existingSubscribers && existingSubscribers.length > 0) {
      const existing = existingSubscribers[0] as { id: string; status: string; email: string };

      if (existing && existing.status === "subscribed") {
        // Already subscribed - return success without error (idempotent)
        console.log(`[Newsletter] Email already subscribed: ${data.data.email}`);
        return {
          ok: true,
          message: "Ya estas suscrito a nuestro boletin.",
          alreadySubscribed: true,
        };
      }

      // If unsubscribed, we could re-subscribe them
      // For now, inform them they were previously unsubscribed
      if (existing && existing.status === "unsubscribed") {
        console.log(`[Newsletter] Previously unsubscribed email attempting to subscribe: ${data.data.email}`);
        return {
          ok: true,
          message: "Te has vuelto a suscribir a nuestro boletin.",
          resubscribed: true,
        };
      }
    }

    // Create new subscription
    const now = new Date().toISOString();
    const payload = {
      email: data.data.email,
      status: "subscribed",
      subscribed_at: now,
      ip_address: ip !== "unknown" ? ip : null,
      user_agent: userAgent || null,
      device_type: deviceType,
      browser: browser !== "Unknown" ? browser : null,
      os: os !== "Unknown" ? os : null,
      source_page: data.data.source_page || null,
      utm_source: data.data.utm_source || null,
      utm_medium: data.data.utm_medium || null,
      utm_campaign: data.data.utm_campaign || null,
      locale: data.data.locale || null,
    };

    const saved = await directusServer.request(
      createItem("newsletter_subscribers", payload)
    );

    console.log(`[Newsletter] New subscriber: ${data.data.email} (ID: ${saved?.id})`);

    return {
      ok: true,
      message: "Te has suscrito exitosamente a nuestro boletin.",
      id: saved?.id,
    };
  } catch (e: any) {
    // Handle unique constraint violation (duplicate email)
    if (e?.message?.includes("unique") || e?.message?.includes("duplicate")) {
      console.log(`[Newsletter] Duplicate email constraint: ${data.data.email}`);
      return {
        ok: true,
        message: "Ya estas suscrito a nuestro boletin.",
        alreadySubscribed: true,
      };
    }

    console.error("[Newsletter] Subscribe error:", e?.message || e);
    throw createError({
      statusCode: 500,
      statusMessage: "No se pudo procesar tu suscripcion. Por favor, intentalo de nuevo.",
    });
  }
});
