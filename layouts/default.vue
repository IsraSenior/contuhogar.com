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
        <main class="mt-[73px]">
            <NuxtPage />
        </main>
        <Footer />
        <Whatsapp />
    </div>
</template>

<style>
/* Page transitions - subtle fade with slight scale */
.page-enter-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-leave-active {
    transition: all 0.25s cubic-bezier(0.4, 0, 1, 1);
}

.page-enter-from {
    opacity: 0;
    transform: translateY(10px) scale(0.99);
}

.page-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.99);
}

/* Layout shift prevention */
.page-enter-active,
.page-leave-active {
    position: absolute;
    width: 100%;
}

.page-leave-active {
    z-index: 0;
}

.page-enter-active {
    z-index: 1;
}
</style>
