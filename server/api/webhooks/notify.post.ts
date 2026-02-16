// server/api/webhooks/notify.post.ts
// Webhook centralizado que Directus llama via Flows al crear items
// en las colecciones `leads` y `simulaciones_credito`.
import { z } from 'zod';
import { createError, defineEventHandler, readBody, getRequestHeader } from 'h3';
import { Resend } from 'resend';

const bodySchema = z.object({
  collection: z.enum(['leads', 'simulaciones_credito']),
  event: z.literal('items.create'),
  payload: z.record(z.string(), z.any()),
  key: z.string(),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // ── 1. Validar secret ──────────────────────────────────────────────────
  const authHeader = getRequestHeader(event, 'authorization') || '';
  const expectedToken = `Bearer ${config.WEBHOOK_SECRET}`;

  if (!config.WEBHOOK_SECRET || authHeader !== expectedToken) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  // ── 2. Validar body ───────────────────────────────────────────────────
  const raw = await readBody(event);
  const parsed = bodySchema.safeParse(raw);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid webhook payload',
      data: parsed.error.issues,
    });
  }

  const { collection, payload } = parsed.data;

  // ── 3. Procesar segun coleccion ────────────────────────────────────────
  if (collection === 'leads') {
    await handleLeadNotification(payload, config);
  } else if (collection === 'simulaciones_credito') {
    await handleSimulationNotification(payload, config);
  }

  return { ok: true };
});

// ---------------------------------------------------------------------------
// Handlers internos
// ---------------------------------------------------------------------------

async function handleLeadNotification(
  payload: Record<string, any>,
  config: ReturnType<typeof useRuntimeConfig>,
) {
  const tgText = buildLeadTelegramMessage(payload);
  const { subject, html } = buildLeadEmailHtml(payload);

  const tasks: Promise<unknown>[] = [];

  // Telegram
  const tgToken = config.TELEGRAM_BOT_TOKEN as string | undefined;
  const tgChatId = config.TELEGRAM_CHAT_ID as string | number | undefined;

  if (tgToken && tgChatId) {
    tasks.push(
      sendTelegram(tgToken, tgChatId, tgText),
    );
  }

  // Email via Resend
  const resendKey = config.RESEND_API_KEY as string | undefined;

  if (resendKey) {
    const resend = new Resend(resendKey);
    tasks.push(
      resend.emails.send({
        from: 'ContuHogar \u00B7 Lead <gerenciacomercial@contuhogar.com>',
        to: 'gerenciacomercial@contuhogar.com',
        bcc: 'israsenior.dev@gmail.com',
        subject,
        html,
      }),
    );
  }

  // Enviar en paralelo — log errors pero no bloquear respuesta
  const results = await Promise.allSettled(tasks);

  for (const result of results) {
    if (result.status === 'rejected') {
      console.error('[Webhook:leads] Notification failed:', result.reason);
    }
  }
}

async function handleSimulationNotification(
  payload: Record<string, any>,
  config: ReturnType<typeof useRuntimeConfig>,
) {
  const tgToken = config.TELEGRAM_BOT_TOKEN as string | undefined;
  const tgChatId = config.TELEGRAM_CHAT_ID as string | number | undefined;

  if (!tgToken || !tgChatId) return;

  const tgText = buildSimulationTelegramMessage(payload);

  try {
    await sendTelegram(tgToken, tgChatId, tgText);
  } catch (err) {
    console.error('[Webhook:simulaciones] Telegram failed:', err);
  }
}

// ---------------------------------------------------------------------------
// Utilidad interna para enviar mensajes de Telegram
// ---------------------------------------------------------------------------

async function sendTelegram(
  token: string,
  chatId: string | number,
  text: string,
): Promise<void> {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Telegram error ${response.status}: ${errText}`);
  }
}
