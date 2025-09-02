<script setup>
useHead({
    htmlAttrs: {
        lang: 'es'
    },
    link: [
        {
            rel: 'icon',
            type: 'image/ico',
            href: '/favicon.ico'
        }
    ]
})
</script>

<template>
    <div>
        <Header />
        <main class="mt-[84px]">
            <NuxtPage />
        </main>
        <Footer />
        <Whatsapp />
    </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
