export default defineNuxtPlugin(async (nuxtApp) => {
  const { setupCalendar } = await import('v-calendar');
  await import('v-calendar/style.css');
  nuxtApp.vueApp.use(setupCalendar, {});
});
