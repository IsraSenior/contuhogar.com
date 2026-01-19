// server/api/simulador/session/update.post.ts
import { z } from "zod";
import {
  createError,
  defineEventHandler,
  readBody,
  getRequestHeader,
} from "h3";
import { createDirectus, rest, staticToken, readItems, updateItem } from "@directus/sdk";

// Validation schema for session update
const schema = z.object({
  sessionId: z.string().uuid("ID de sesión inválido"),
  paso: z.number().int().min(1).max(5, "Paso debe estar entre 1 y 5"),
  datosParciales: z.record(z.string(), z.unknown()).optional(),
  pasoDeLosDatos: z.number().int().min(1).max(5).optional(), // Which step the data belongs to
});

// Map step numbers to status values (must match Directus field options)
const STEP_STATUS_MAP: Record<number, string> = {
  1: "paso_1_datos_personales",
  2: "paso_2_datos_inmueble",
  3: "paso_3_datos_ingresos",
  4: "paso_4_elegibilidad",
  5: "paso_5_resultados",
};

export default defineEventHandler(async (event) => {
  // Very permissive rate limiting for updates (user navigating through steps)
  // 50 updates per 5 minutes
  await rateLimit(event, {
    maxRequests: 50,
    windowSeconds: 300,
    message: "Demasiadas actualizaciones. Por favor, espera un momento.",
  });

  const body = await readBody(event);

  // Validate payload size
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
      statusMessage: "Bad Request",
      message: "Datos de actualización inválidos",
      data: data.error.flatten(),
    });
  }

  const config = useRuntimeConfig();
  const directusServer = createDirectus(config.DIRECTUS_URL)
    .with(staticToken(config.DIRECTUS_ADMIN_TOKEN))
    .with(rest());

  const { sessionId, paso, datosParciales, pasoDeLosDatos } = data.data;

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

    // Build update payload
    const updatePayload: any = {
      paso_actual: paso,
      status: STEP_STATUS_MAP[paso],
    };

    // Update paso_maximo_alcanzado if this is a new high
    if (paso > (session.paso_maximo_alcanzado || 0)) {
      updatePayload.paso_maximo_alcanzado = paso;
    }

    // Update timestamp for current step
    const timestampField = `tiempo_paso_${paso}`;
    updatePayload[timestampField] = now;

    // Store partial data for the step it belongs to (if provided)
    if (datosParciales) {
      // Use pasoDeLosDatos if provided, otherwise default to current paso
      const stepForData = pasoDeLosDatos || paso;
      const dataField = `datos_paso_${stepForData}`;
      updatePayload[dataField] = datosParciales;
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

    console.error("Session update error:", e?.message || e);

    // Check if it's a Directus-specific error
    if (e?.errors && Array.isArray(e.errors)) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error al actualizar sesión",
        message: "No se pudo actualizar la sesión de seguimiento.",
        data: { details: e.errors },
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Error interno del servidor",
      message: "No se pudo procesar la actualización.",
    });
  }
});
