// server/api/simulador/session/complete.post.ts
import { z } from "zod";
import {
  createError,
  defineEventHandler,
  readBody,
  getRequestHeader,
} from "h3";
import { createDirectus, rest, staticToken, readItems, updateItem } from "@directus/sdk";

// Validation schema for session completion
const schema = z.object({
  sessionId: z.string().uuid("ID de sesión inválido"),
  simulacionId: z.string().min(1, "ID de simulación requerido"), // Accept any string (UUID or integer ID)
});

export default defineEventHandler(async (event) => {
  // Rate limiting for completions
  // 10 completions per 5 minutes (reasonable for legitimate use)
  await rateLimit(event, {
    maxRequests: 10,
    windowSeconds: 300,
    message: "Demasiadas finalizaciones. Por favor, espera un momento.",
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
      message: "Datos de finalización inválidos",
      data: data.error.flatten(),
    });
  }

  const config = useRuntimeConfig();
  const directusServer = createDirectus(config.DIRECTUS_URL)
    .with(staticToken(config.DIRECTUS_ADMIN_TOKEN))
    .with(rest());

  const { sessionId, simulacionId } = data.data;

  try {
    // Find existing session
    const sessions = await directusServer.request(
      readItems("simulador_sesiones", {
        filter: { session_id: { _eq: sessionId } },
        limit: 1,
      })
    ) as any[];

    if (!sessions || sessions.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Sesión no encontrada",
      });
    }

    const session = sessions[0];
    const now = new Date().toISOString();

    // Calculate total time (in seconds) if we have both timestamps
    let tiempoTotal: number | null = null;
    if (session.tiempo_inicio) {
      const startTime = new Date(session.tiempo_inicio).getTime();
      const endTime = new Date(now).getTime();
      tiempoTotal = Math.floor((endTime - startTime) / 1000); // Convert to seconds
    }

    // Build completion payload
    const updatePayload: any = {
      status: "completado",
      tiempo_completado: now,
      simulacion_id: simulacionId,
    };

    // Add total time if calculated
    if (tiempoTotal !== null) {
      updatePayload.tiempo_total_segundos = tiempoTotal;
    }

    // Update the session
    await directusServer.request(
      updateItem("simulador_sesiones", session.id, updatePayload)
    );

    return { ok: true };
  } catch (e: any) {
    // If it's already a createError, rethrow it
    if (e?.statusCode) {
      throw e;
    }

    console.error("Session complete error:", e?.message || e);

    // Check if it's a Directus-specific error
    if (e?.errors && Array.isArray(e.errors)) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error al completar sesión",
        message: "No se pudo marcar la sesión como completada.",
        data: { details: e.errors },
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Error interno del servidor",
      message: "No se pudo procesar la finalización.",
    });
  }
});
