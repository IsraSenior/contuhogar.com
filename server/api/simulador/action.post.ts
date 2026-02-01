// server/api/simulador/action.post.ts
// Endpoint para registrar acciones del usuario después de ver resultados de simulación
import { z } from "zod";
import {
  createError,
  defineEventHandler,
  readBody,
  getRequestHeader,
} from "h3";
import { createDirectus, rest, staticToken, readItem, updateItem } from "@directus/sdk";

// Validation schema
const schema = z.object({
  simulacionId: z.union([z.string(), z.number()]).transform(String),
  action: z.enum(['whatsapp', 'pdf', 'contact']),
});

// Type for user action record
interface AccionUsuarioRecord {
  accion: 'whatsapp' | 'pdf' | 'contact';
  timestamp: string;
  origen?: string; // Para diferenciar origen (ej: 'resultados', 'carta-preaprobacion')
}

export default defineEventHandler(async (event) => {
  // Rate limiting: 30 actions per 5 minutes (allows multiple actions per session)
  await rateLimit(event, {
    maxRequests: 30,
    windowSeconds: 300,
    message: "Demasiadas solicitudes. Por favor, espera unos minutos.",
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
      message: "Datos de acción inválidos",
      data: data.error.flatten(),
    });
  }

  const config = useRuntimeConfig();
  const directusServer = createDirectus(config.DIRECTUS_URL)
    .with(staticToken(config.DIRECTUS_ADMIN_TOKEN))
    .with(rest());

  try {
    // 1. Verificar que la simulación existe y obtener acciones actuales
    const simulacion = await directusServer.request(
      readItem("simulaciones_credito", data.data.simulacionId, {
        fields: ["id", "acciones_usuario"],
      })
    ) as { id: string | number; acciones_usuario: AccionUsuarioRecord[] | null };

    if (!simulacion) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Simulación no encontrada",
      });
    }

    // 2. Obtener array actual de acciones (o crear vacío)
    const accionesActuales: AccionUsuarioRecord[] = simulacion.acciones_usuario || [];

    // 3. Verificar si la acción ya existe (deduplicación)
    const accionExiste = accionesActuales.some(
      (a) => a.accion === data.data.action
    );

    if (accionExiste) {
      // Ya registrada, retornar éxito sin duplicar
      return {
        ok: true,
        message: "Acción ya registrada",
        duplicada: true,
      };
    }

    // 4. Agregar nueva acción con timestamp
    const nuevaAccion: AccionUsuarioRecord = {
      accion: data.data.action,
      timestamp: new Date().toISOString(),
      origen: body.origen || 'resultados', // Origen opcional para tracking más detallado
    };

    const accionesActualizadas = [...accionesActuales, nuevaAccion];

    // 5. Actualizar en Directus
    await directusServer.request(
      updateItem("simulaciones_credito", data.data.simulacionId, {
        acciones_usuario: accionesActualizadas,
      })
    );

    return {
      ok: true,
      message: "Acción registrada exitosamente",
      duplicada: false,
    };
  } catch (e: any) {
    // Si es un error ya procesado (404, etc.), re-lanzar
    if (e.statusCode) {
      throw e;
    }

    console.error("Error registrando acción:", e?.message || e);

    throw createError({
      statusCode: 500,
      statusMessage: "Error interno del servidor",
      message: "No se pudo registrar la acción",
    });
  }
});
