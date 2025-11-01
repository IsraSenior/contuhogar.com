<script setup lang="ts">
import { ref } from 'vue'
const route = useRoute();
import dialPhoneOptions from "@/db/tlf-dial.json";

const title = `ConTuHogar | Contacto`;
const description = "Contáctanos para obtener asesoría especializada en crédito hipotecario, leasing habitacional y financiamiento de vivienda en Colombia. Atención personalizada para colombianos en el exterior."

// SEO optimizado
useSeo({
    title: title,
    description: description,
    type: 'website'
})

// Structured data para contacto
useLocalBusinessSchema()

// GTM/GA4 tracking
const { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError } = useTracking()

const phoneDropdown = ref({
    status: true,
    selected: {
        "flag": "🇨🇴",
        "code": "+57"
    },
    options: dialPhoneOptions,
});

const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dial: phoneDropdown.value.selected,
    message: '',
    source_page: route.fullPath,
    website: '' // honeypot (debe quedar vacío)
})

const state = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const hasTrackedStart = ref(false)

// Track form start when user interacts with any field
const onFormInteraction = () => {
    if (!hasTrackedStart.value) {
        trackFormStart('contact_form', route.fullPath)
        hasTrackedStart.value = true
    }
}

// Track phone and email clicks
const { trackPhoneClick, trackEmailClick } = useTracking()

const onPhoneClick = (phoneNumber: string) => {
    trackPhoneClick(phoneNumber, 'contact_page')
}

const onEmailClick = (emailAddress: string) => {
    trackEmailClick(emailAddress, 'contact_page')
}

const onSubmit = async () => {
    state.value = 'loading'
    errorMsg.value = ''

    // Track form submit
    trackFormSubmit('contact_form', form.value.source_page, {
        has_message: !!form.value.message,
        phone_country: form.value.dial.code,
    })

    try {
        const res = await $fetch('/api/contact', {
            method: 'POST',
            body: form.value
        })
        if ((res as any)?.ok) {

            const sendRes = await $fetch('/api/send/lead', {
                method: 'POST',
                body: form.value
            })

            if ((sendRes as any)?.ok) {
                state.value = 'success'

                // Track successful form submission
                trackFormSuccess('contact_form', form.value.source_page, (res as any)?.id)

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

                // Reset tracking flag
                hasTrackedStart.value = false
            }

        } else {
            throw new Error('Respuesta inválida del servidor')
        }
    } catch (e: any) {
        state.value = 'error'
        errorMsg.value = e?.data?.statusMessage || e?.message || 'Error al enviar'

        // Track form error
        trackFormError('contact_form', form.value.source_page, 'submit_failed', errorMsg.value)
    }
}
</script>

<template>
    <div
        class="relative bg-muted min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-92px)] flex flex-col md:flex-row items- justify-between">
        <div class="w-full md:w-1/2 flex items-center justify-center">
            <div class="px-6 py-16">
                <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                    <h2 class="text-4xl font-semibold tracking-tight text-pretty text-primary sm:text-5xl">
                        ¡Hablemos!
                    </h2>
                    <p class="mt-2 text-lg/8 text-gray-500">Estamos listos para ayudarte desde donde estés.</p>
                    <form @submit.prevent="onSubmit" class="mt-16">
                        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <!-- Honeypot oculto -->
                            <input type="text" name="website" v-model="form.website" class="hidden" tabindex="-1"
                                autocomplete="off" />
                            <div>
                                <label for="first-name"
                                    class="block text-sm/6 font-semibold text-primary">Nombres</label>
                                <div class="mt-2.5">
                                    <input type="text" name="first-name" id="first-name" v-model="form.firstName"
                                        autocomplete="given-name"
                                        @focus="onFormInteraction"
                                        class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                        required>
                                </div>
                            </div>
                            <div>
                                <label for="last-name"
                                    class="block text-sm/6 font-semibold text-primary">Apellidos</label>
                                <div class="mt-2.5">
                                    <input type="text" name="last-name" id="last-name" v-model="form.lastName"
                                        autocomplete="family-name"
                                        class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                        required>
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="email" class="block text-sm/6 font-semibold text-primary">Correo
                                    electrónico</label>
                                <div class="mt-2.5">
                                    <input id="email" name="email" type="email" v-model="form.email"
                                        autocomplete="email"
                                        class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                        required>
                                </div>
                            </div>
                            <div class="sm:col-span-2 grid grid-cols-3 gap-x-2 gap-y-6">
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
                                        <input type="tel" name="phone" id="phone" v-model="form.phone"
                                            autocomplete="tel" aria-describedby="phone-description"
                                            class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                            required>
                                    </div>
                                </div>
                            </div>
                            <div class="sm:col-span-2">
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
                        </div>
                        <div class="mt-10 flex justify-end border-t border-primary/10 pt-8">
                            <button type="submit" class="btn primary" :disabled="state === 'loading'">
                                <span v-if="state === 'loading'">Enviando…</span>
                                <span v-else>Enviar</span>
                            </button>

                            <p v-if="state === 'success'" class="mt-4 text-[green]">¡Gracias! Te contactaremos pronto.
                            </p>
                            <p v-else-if="state === 'error'" class="mt-4 text-[red]">{{ errorMsg }}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="relative w-full md:w-1/2 bg-primary order-1 lg:order-none">
            <div class="h-96 md:h-full">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7952.869193792473!2d-74.06811201548074!3d4.694301983112287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9ac51b077c03%3A0x6647e2ae857d89e7!2zQ3JhLiA1NCAjIDEwNS0yMCwgU3ViYSwgQm9nb3TDoSwgRC5DLiwgQm9nb3TDoSwgQm9nb3TDoSwgRC5DLiwgQ29sb21iaWE!5e0!3m2!1sen!2sdo!4v1753368565906!5m2!1sen!2sdo"
                    style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                    class="h-full w-full"></iframe>
            </div>
        </div>
    </div>


    <div class="bg-white py-8 sm:py-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
                <div class="grid grid-cols-1 gap-10 py-16 lg:grid-cols-3">
                    <div>
                        <h2 class="text-4xl font-semibold tracking-tight text-pretty text-primary">
                            ¡Ponte en contacto <br> con nosotros!
                        </h2>
                        <!-- <p class="mt-4 text-base/7 text-gray-500">Quam nunc nunc eu sed. Sed rhoncus quis ultricies ac
                            pellentesque.</p> -->

                        <NuxtImg class="aspect-square w-full bg-gray-50 object-cover mt-10 rounded-3xl"
                            src="https://img.freepik.com/foto-gratis/vista-lateral-mujer-hablando-telefono_23-2149476697.jpg"
                            alt="Mujer hablando por teléfono"
                            format="webp"
                            quality="80"
                            sizes="sm:100vw lg:400px"
                            loading="lazy" />
                    </div>

                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">

                        <div class="rounded-2xl bg-gray-50 p-10">
                            <h3 class="text-base/7 font-semibold text-primary">Teléfonos</h3>
                            <dl class="mt-3 space-y-1 text-sm/6 text-gray-500">
                                <div>
                                    <dt class="sr-only">Teléfonos</dt>
                                    <dd>Colombia <a class="font-semibold text-primary hover:text-secondary"
                                            href="tel:+573208033672"
                                            @click="onPhoneClick('+573208033672')">(+57) 320
                                            8033672</a></dd>
                                    <dd>EE. UU. <a class="font-semibold text-primary hover:text-secondary"
                                            href="tel:+17185214701"
                                            @click="onPhoneClick('+17185214701')">(+1) 718 521 4701</a></dd>
                                    <dd>España <a class="font-semibold text-primary hover:text-secondary"
                                            href="tel:+34910602499"
                                            @click="onPhoneClick('+34910602499')">(+34) 910 602 499</a></dd>
                                </div>
                            </dl>
                        </div>
                        <div class="rounded-2xl bg-gray-50 p-10">
                            <h3 class="text-base/7 font-semibold text-primary">Ubicación</h3>
                            <dl class="mt-3 space-y-1 text-sm/6 text-gray-500">
                                Cra. 54 # 105-20, <br> Bogotá, D.C., Colombia
                            </dl>
                        </div>
                        <div class="rounded-2xl bg-gray-50 p-10">
                            <h3 class="text-base/7 font-semibold text-primary">Correos electrónicos</h3>
                            <dl class="mt-3 space-y-1 text-sm/6 text-gray-500">
                                <div>
                                    <dt class="sr-only">Correos</dt>
                                    <dd><a class="font-semibold text-primary hover:text-secondary"
                                            href="mailto:gerencia@contuhogar.net"
                                            @click="onEmailClick('gerencia@contuhogar.net')">gerencia@contuhogar.net</a></dd>
                                    <dd><a class="font-semibold text-primary hover:text-secondary"
                                            href="mailto:gerenciacomercial@contuhogar.net"
                                            @click="onEmailClick('gerenciacomercial@contuhogar.net')">gerenciacomercial@contuhogar.net</a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <!-- <div class="rounded-2xl bg-gray-50 p-10">
                            <h3 class="text-base/7 font-semibold text-primary">Skype</h3>
                            <dl class="mt-3 space-y-1 text-sm/6 text-gray-500">
                                <div>
                                    <dt class="sr-only">Skype</dt>
                                    <dd><a class="font-semibold text-primary hover:text-secondary"
                                            href="#">ConTuHogar</a></dd>
                                </div>
                            </dl>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>