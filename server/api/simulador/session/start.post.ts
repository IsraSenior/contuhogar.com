// server/api/simulador/session/start.post.ts
import { z } from "zod";
import {
  createError,
  defineEventHandler,
  readBody,
  getRequestHeader,
} from "h3";
import { createDirectus, rest, staticToken, createItem } from "@directus/sdk";
import { getClientIP } from "../../../utils/rateLimit";
import { getDeviceType } from "../../../utils/deviceDetection";

// Validation schema for session start
const schema = z.object({
  sessionId: z.string().uuid("ID de sesión inválido"),
  sourcePage: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  // More permissive rate limiting for session tracking
  // 20 session starts per 5 minutes (allows legitimate use cases like page refreshes)
  await rateLimit(event, {
    maxRequests: 20,
    windowSeconds: 300,
    message: "Demasiadas sesiones iniciadas. Por favor, espera un momento.",
  });

  const body = await readBody(event);

  // Validate payload size
  const contentLength = Number(
    getRequestHeader(event, "content-length") || "0"
  );
  if (contentLength > 5_000) {
    throw createError({ statusCode: 413, statusMessage: "Payload too large" });
  }

  const data = schema.safeParse(body);

  if (!data.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Datos de sesión inválidos",
      data: data.error.flatten(),
    });
  }

  const config = useRuntimeConfig();
  const directusServer = createDirectus(config.DIRECTUS_URL)
    .with(staticToken(config.DIRECTUS_ADMIN_TOKEN))
    .with(rest());

  // Get client metadata
  const clientIP = getClientIP(event);
  const userAgent = getRequestHeader(event, "user-agent") || "unknown";
  const deviceType = getDeviceType(userAgent);

  // Current timestamp for tracking
  const now = new Date().toISOString();

  // Prepare payload for Directus simulador_sesiones collection
  const payload = {
    session_id: data.data.sessionId,
    status: "paso_1_datos_personales",
    paso_actual: 1,
    paso_maximo_alcanzado: 1,
    tiempo_inicio: now,
    tiempo_paso_1: now,
    source_page: data.data.sourcePage || null,
    ip_address: clientIP,
    user_agent: userAgent,
    device_type: deviceType,
  };

  try {
    // Create session record in Directus
    const saved = await directusServer.request(
      createItem("simulador_sesiones", payload)
    ) as any;

    return {
      ok: true,
      sessionId: saved?.session_id || data.data.sessionId,
    };
  } catch (e: any) {
    console.error("Session start error:", e?.message || e);

    // Check for duplicate session_id (unique constraint violation)
    if (e?.errors && Array.isArray(e.errors)) {
      const isDuplicate = e.errors.some((err: any) =>
        err?.extensions?.code === 'RECORD_NOT_UNIQUE' ||
        err?.message?.includes('duplicate') ||
        err?.message?.includes('unique')
      );

      if (isDuplicate) {
        // Session already exists - this is OK, return success
        return {
          ok: true,
          sessionId: data.data.sessionId,
        };
      }

      throw createError({
        statusCode: 500,
        statusMessage: "Error al iniciar sesión",
        message: "No se pudo crear la sesión de seguimiento.",
        data: { details: e.errors },
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Error interno del servidor",
      message: "No se pudo procesar la solicitud.",
    });
  }
});
