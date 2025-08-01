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
    <div class="fixed bottom-10 right-10 z-50 flex items-end gap-6">
        <Transition enter-from-class="translate-x-full translate-y-full opacity-0"
            enter-active-class="transition duration-500 ease-out"
            enter-to-class="translate-x-0 translate-y-0 opacity-100 scale-100"
            leave-from-class="translate-x-0 translate-y-0 opacity-100"
            leave-active-class="transition duration-500 ease-in"
            leave-to-class="translate-x-full translate-y-full opacity-0 scale-0">
            <div v-if="open" :class="[
                { 'w-full max-w-96 bg-white shadow-2xl shadow-primary/5 rounded-3xl -mt-16 py-12 px-6': open },
                { '': !open }
            ]">
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
                                <p id="phone-description" class="text-gray-400 text-sm opacity-0">Optional</p>
                            </div>
                            <div class="mt-2.5">
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

        <button class="w-16 h-16" @click.prevent="open = !open">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                class="h-full w-full object-center object-cover" alt="">
        </button>
    </div>
</template>