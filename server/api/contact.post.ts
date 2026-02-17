// server/api/contact.post.ts
import { z } from "zod";
import {
  createError,
  defineEventHandler,
  readBody,
  getRequestHeader,
} from "h3";
import { createDirectus, rest, staticToken, createItem, updateItem } from "@directus/sdk";
import { isDuplicateSubmission } from "../utils/duplicateDetection";

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
  source_component: z.enum(['contact_form', 'whatsapp_widget', 'simulador', 'newsletter']).optional(),
  // Honeypot (debe venir vacío)
  website: z.string().max(0).optional().or(z.literal("")),
  // Timestamp para validar tiempo mínimo de envío
  _formStartTime: z.number().optional(),
  // Campo oculto con datos del simulador (JSON string)
  simuladorInfo: z.string().optional().or(z.literal("")),
  // Lead ID existente (para actualizar en vez de crear, e.g. desde simulador)
  _existingLeadId: z.string().uuid().optional().or(z.literal("")),
  // Meta Pixel event ID for CAPI deduplication
  _metaEventId: z.string().optional(),

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
  // Skip interaction/time checks for simulator-prefilled forms:
  // The user already went through a multi-step wizard, proving human interaction.
  const isFromSimulator = !!data.data.simuladorInfo;

  if (!isFromSimulator) {
    // Validate minimum field interactions
    const MIN_FIELD_INTERACTIONS = 3;
    const MIN_UNIQUE_FIELDS = 2;
    const MIN_INTERACTION_DURATION = 1500; // 1.5 seconds

    if (data.data._fieldInteractions !== undefined && data.data._fieldInteractions < MIN_FIELD_INTERACTIONS) {
      console.warn(`[AntiSpam] Insufficient interactions (${data.data._fieldInteractions}/${MIN_FIELD_INTERACTIONS})`);
    }

    if (data.data._uniqueFields !== undefined && data.data._uniqueFields < MIN_UNIQUE_FIELDS) {
      console.warn(`[AntiSpam] Insufficient unique fields (${data.data._uniqueFields}/${MIN_UNIQUE_FIELDS})`);
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
    source_component: data.data.source_component || 'contact_form',
    status: "nuevo",
  };

  // console.log(payload, "payload_res")

  try {
    let leadId: string | undefined;

    if (data.data._existingLeadId) {
      // Lead already exists (from simulator) — update instead of create.
      // Updating does NOT trigger Directus Flow (items.create only), so no duplicate notification.
      await directusServer.request(
        updateItem("leads", data.data._existingLeadId, {
          ...payload,
          source_component: 'simulador', // Keep original source
        })
      );
      leadId = data.data._existingLeadId;
    } else {
      // Create new lead — triggers Directus Flow -> webhook -> notification
      const saved = await directusServer.request(createItem("leads", payload));
      leadId = saved?.id;
    }

    // 2. Meta CAPI: Send Lead event (fire-and-forget)
    const isFromSimulatorForCapi = !!data.data.simuladorInfo;
    if (data.data._metaEventId) {
      sendCapiEvent({
        event,
        eventName: 'Lead',
        eventId: data.data._metaEventId,
        userData: {
          email: data.data.email,
          phone: `${data.data.dial.code}${data.data.phone}`.replace(/\s/g, ''),
          firstName: data.data.firstName,
          lastName: data.data.lastName || undefined,
        },
        customData: {
          content_name: isFromSimulatorForCapi ? 'simulador_contact' : 'contact_form',
          content_category: 'lead',
        },
      })
    }

    return { ok: true, id: leadId };
  } catch (e: any) {
    console.error("Contact handler error:", e?.message || e);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "No se pudo procesar tu solicitud. Por favor, inténtalo de nuevo.",
    });
  }
});
