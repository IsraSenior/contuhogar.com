<script setup>
const open = ref(false)

import dialPhoneOptions from "@/db/tlf-dial.json";

const phoneDropdown = ref({
    status: true,
    selected: {
        "flag": "🇨🇴",
        "code": "+57"
    },
    options: dialPhoneOptions,
})

const submit = function () {
    window.open("https://api.whatsapp.com/send?phone=573150540000");
    open.value = false;
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
                <button class="absolute right-5 top-3 md:top-5 text-primary hover:text-secondary cursor-pointer" @click.prevent="open = false">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                        stroke="currentColor" class="size-10">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

                <form @submit.prevent="submit" class="grid grid-cols-1 gap-6">
                    <div>
                        <label for="" class="block text-sm/6 font-semibold text-primary">Nombres</label>
                        <div class="mt-2.5">
                            <input type="text" name="" id="" autocomplete="given-name"
                                class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                required>
                        </div>
                    </div>
                    <div>
                        <label for="" class="block text-sm/6 font-semibold text-primary">Apellidos</label>
                        <div class="mt-2.5">
                            <input type="text" name="" id="" autocomplete="given-name"
                                class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                required>
                        </div>
                    </div>

                    <div>
                        <label for="" class="block text-sm/6 font-semibold text-primary">Correo electrónico</label>
                        <div class="mt-2.5">
                            <input type="text" name="" id="" autocomplete="given-name"
                                class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                required>
                        </div>
                    </div>

                    <div class="grid grid-cols-3 gap-x-2">
                        <div class="col-span-1">
                            <label for="phone" class="block font-semibold text-primary">Teléfono</label>
                            <select v-model="phoneDropdown.selected" name="dial" required id="dial"
                                class="block w-full rounded-md bg-white px-3.5 mt-2 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary">
                                <option v-for="(option, index) in phoneDropdown.options" :value="option">{{
                                    option.flag
                                    }} {{ option.code }}</option>
                            </select>
                        </div>
                        <div class="col-span-2">
                            <div class="flex justify-between text-sm/6">
                                <span></span>
                                <!-- <p id="phone-description" class="text-gray-400 text-sm opacity-0">Optional</p> -->
                            </div>
                            <div class="mt-8">
                                <input type="tel" name="phone" id="phone" autocomplete="tel"
                                    aria-describedby="phone-description"
                                    class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    required>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label for="" class="block text-sm/6 font-semibold text-primary">Interés</label>
                        <div class="mt-2.5">
                            <textarea type="text" name="" id="" autocomplete="given-name"
                                class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-primary outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                required />
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <button type="submit" class="btn primary w-full">
                            Contactar
                        </button>
                    </div>
                </form>
            </div>
        </Transition>

        <button :class="[
            'w-16 h-16',
            { 'hidden lg:block': open }
        ]" @click.prevent="open = !open">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                class="h-full w-full object-center object-cover" alt="">
        </button>
    </div>
</template>