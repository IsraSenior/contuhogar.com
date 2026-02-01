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
        <!-- Skip to content link -->
        <a
            href="#main-content"
            class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
            Saltar al contenido principal
        </a>

        <Header />
        <main id="main-content" class="mt-[73px]" tabindex="-1">
            <NuxtPage />
        </main>
        <Footer />
        <Whatsapp />
    </div>
</template>

<style>
/* Page transitions - subtle fade with blur */
.page-enter-active,
.page-leave-active {
    transition: opacity 0.3s ease, filter 0.3s ease;
}

.page-enter-from {
    opacity: 0;
    filter: blur(4px);
}

.page-leave-to {
    opacity: 0;
    filter: blur(4px);
}
</style>
