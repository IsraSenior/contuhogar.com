<script setup lang="ts">
const open = ref(false)
const route = useRoute();

import dialPhoneOptions from "@/db/tlf-dial.json";

// GTM/GA4 tracking
const { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError, trackWhatsAppClick } = useTracking()

// CAPTCHA
const { captchaAnswer, userAnswer: captchaUserAnswer, captchaError, validateCaptcha, resetCaptcha } = useCaptcha()

const phoneDropdown = ref({
    status: true,
    selected: {
        "flag": "🇨🇴",
        "code": "+57"
    },
    options: dialPhoneOptions,
});
const fullPath = computed(() => route.fullPath)

const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dial: phoneDropdown.value.selected,
    message: '',
    source_page: '',
    website: '', // honeypot (debe quedar vacío)
    _formStartTime: 0 // timestamp para validación anti-bot
})

const state = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const hasTrackedStart = ref(false)

// Track when WhatsApp widget is opened
watch(open, (newVal) => {
    if (newVal) {
        trackWhatsAppClick('floating_widget')
    }
})

// Track form start when user interacts with any field
const onFormInteraction = () => {
    if (!hasTrackedStart.value) {
        trackFormStart('whatsapp_widget_form', fullPath.value)
        hasTrackedStart.value = true
        // Registrar timestamp de inicio del formulario
        form.value._formStartTime = Date.now()
    }
}

const onSubmit = async () => {
    // Validar CAPTCHA primero
    if (!validateCaptcha()) {
        return
    }

    state.value = 'loading'
    errorMsg.value = ''
    form.value.source_page = fullPath.value

    // Track form submit
    trackFormSubmit('whatsapp_widget_form', form.value.source_page, {
        has_message: !!form.value.message,
        phone_country: form.value.dial.code,
    })

    try {
        const res = await $fetch('/api/contact', {
            method: 'POST',
            body: {
                ...form.value,
                _captchaAnswer: captchaAnswer.value,
                _captchaUserAnswer: parseInt(captchaUserAnswer.value)
            }
        })
        if ((res as any)?.ok) {

            const sendRes = await $fetch('/api/send/lead', {
                method: 'POST',
                body: form.value
            })

            if ((sendRes as any)?.ok) {
                state.value = 'success'

                // Track successful form submission
                trackFormSuccess('whatsapp_widget_form', form.value.source_page, (res as any)?.id)

                const phone = "573150540000";
                const message = `Hola soy *${form.value.firstName} ${form.value.lastName}*,
Correo: *${form.value.email}*
Teléfono: *${form.value.phone}*
Desde: *${form.value.source_page}*

${form.value.message}
                `;
                window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`);

                // Limpia el form
                form.value.firstName = ''
                form.value.lastName = ''
                form.value.email = ''
                form.value.phone = ''
                form.value.message = ''

                // Reset CAPTCHA y tracking
                resetCaptcha()
                hasTrackedStart.value = false
            }

        } else {
            throw new Error('Respuesta inválida del servidor')
        }
    } catch (e: any) {
        state.value = 'error'
        errorMsg.value = e?.data?.message || e?.data?.statusMessage || e?.message || 'Error al enviar'

        // Reset CAPTCHA en caso de error
        resetCaptcha()

        // Track form error
        trackFormError('whatsapp_widget_form', form.value.source_page, 'submit_failed', errorMsg.value)
    }
}
</script>

<template>
    <div :class="[
        'fixed z-50 flex items-end gap-6',
        { 'bottom-0 right-0 lg:bottom-10 lg:right-10': open },
        { 'bottom-5 right-5': !open },
    ]">
        <Transition enter-from-class="translate-x-full translate-y-full opacity-0"
            enter-active-class="transition duration-500 ease-out"
            enter-to-class="translate-x-0 translate-y-0 opacity-100 scale-100"
            leave-from-class="translate-x-0 translate-y-0 opacity-100"
            leave-active-class="transition duration-500 ease-in"
            leave-to-class="translate-x-full translate-y-full opacity-0 scale-0">
            <div v-if="open" :class="[
                { 'w-screen h-full lg:auto lg:w-full lg:max-w-96 bg-white shadow-2xl shadow-primary/5 lg:rounded-3xl  py-12 px-6 relative': open },
                { '': !open }
            ]">
                <button class="absolute right-5 top-3 md:top-5 text-primary hover:text-secondary cursor-pointer"
                    @click.prevent="open = false">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                        stroke="currentColor" class="size-10">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

                <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-x-8 gap-y-6">
                    <input type="text" name="website" v-model="form.website" class="hidden" tabindex="-1"
                        autocomplete="off" />

                    <div>
                        <label for="first-name" class="block text-sm/6 font-semibold text-primary">Nombres</label>
                        <div class="mt-2.5">
                            <input type="text" name="first-name" id="first-name" v-model="form.firstName"
                                autocomplete="given-name"
                                @focus="onFormInteraction"
                                class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                required>
                        </div>
                    </div>

                    <div>
                        <label for="last-name" class="block text-sm/6 font-semibold text-primary">Apellidos</label>
                        <div class="mt-2.5">
                            <input type="text" name="last-name" id="last-name" v-model="form.lastName"
                                autocomplete="family-name"
                                class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                required>
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm/6 font-semibold text-primary">Correo
                            electrónico</label>
                        <div class="mt-2.5">
                            <input id="email" name="email" type="email" v-model="form.email" autocomplete="email"
                                class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                required>
                        </div>
                    </div>

                    <div class="grid grid-cols-3 gap-x-2 gap-y-6">
                        <div class="col-span-1">
                            <label for="phone" class="block font-semibold text-primary">Teléfono</label>
                            <select v-model="form.dial" name="dial" id="dial" required
                                class="block w-full rounded-md bg-white px-3.5 mt-2 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary">
                                <option v-for="(option, index) in phoneDropdown.options" :value="option">{{
                                    option.flag
                                }} {{ option.code }}</option>
                            </select>
                        </div>
                        <div class="col-span-2">
                            <div class="flex justify-between text-sm/6">
                                <span></span>
                                <span></span>
                                <!-- <p id="phone-description" class="text-gray-400 text-sm">Optional</p> -->
                            </div>
                            <div class="mt-8">
                                <input type="tel" name="phone" id="phone" v-model="form.phone" autocomplete="tel"
                                    aria-describedby="phone-description"
                                    class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    required>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="flex justify-between text-sm/6">
                            <label for="message" class="block text-sm/6 font-semibold text-primary">
                                Mensaje</label>
                            <p id="message-description" class="text-gray-400 text-sm">Max. 500 caracteres</p>
                        </div>
                        <div class="mt-2.5">
                            <textarea id="message" name="message" v-model="form.message" rows="4"
                                aria-describedby="message-description"
                                class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"></textarea>
                        </div>
                    </div>

                    <!-- CAPTCHA -->
                    <div>
                        <SimpleCaptcha v-model="captchaUserAnswer" :error="captchaError" @refresh="resetCaptcha" />
                    </div>

                    <div class="w-full flex justify-end">
                        <button type="submit" class="btn primary w-full" :disabled="state === 'loading'">
                            <span v-if="state === 'loading'">Enviando…</span>
                            <span v-else>Enviar</span>
                        </button>
                    </div>

                    <p v-if="state === 'success'" class="text-[green]">¡Gracias! Te contactaremos pronto.
                    </p>
                    <p v-else-if="state === 'error'" class="text-[red]">{{ errorMsg }}</p>
                </form>
            </div>
        </Transition>

        <button :class="[
            'w-16 h-16',
            { 'hidden lg:block': open }
        ]" @click.prevent="open = !open">
            <NuxtImg src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                class="h-full w-full object-center object-cover" alt="WhatsApp" format="webp" quality="85" sizes="64px" loading="lazy" />
        </button>
    </div>
</template>