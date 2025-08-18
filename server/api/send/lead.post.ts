import { Resend } from "resend";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { resendApi } = config.mailchimp as {
    resendApi?: string;
  };

  if (!resendApi) {
    throw createError({
      statusCode: 500,
      statusMessage: "Resend no está configurado",
    });
  }

  const body = await readBody<Body>(event);

  if (!body?.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
    throw createError({ statusCode: 400, statusMessage: "Email inválido" });
  }

  const resend = new Resend("••••••••••••••••••••••••••••••••••••");

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "contudigital@contuhogar.net",
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });
  return { body };
});
