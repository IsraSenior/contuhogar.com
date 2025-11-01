<script setup>
const title = `ConTuHogar | Blog`;
const description = "ContuHogar es una empresa con amplia experiencia y trayectoria en la prestación de servicios de asesoría en el sector financiero e inmobiliario, dirigido a todos los mercados, principalmente a residentes en el exterior."

useSeoMeta({
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    // ogImage: '[og:image]',
    ogUrl: "https://contuhogar.com",
    twitterTitle: title,
    twitterDescription: description,
    // twitterImage: '[twitter:image]',
    twitterCard: 'summary'
})
</script>

<template>
  <div class="bg-muted py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="">
        <h2 class="text-4xl font-semibold tracking-tight text-pretty text-primary sm:text-5xl">Explora. Infórmate.
          Invierte con seguridad.</h2>
        <p class="mt-2 text-lg/8 text-gray-500 max-w-5xl">En nuestro blog encontrarás contenido útil, claro y
          actualizado sobre todo lo que necesitas saber para invertir con confianza en finca raíz desde cualquier lugar
          del mundo. Te compartimos consejos, novedades del sector, historias reales y respuestas a las preguntas que
          muchos colombianos en el exterior se hacen al momento de comprar vivienda, financiarla o planear tu regreso.
        </p>

        <div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
          <article class="relative isolate flex flex-col gap-8 lg:flex-row bg-muted hover:bg-white p-5 rounded-3xl">
            <div class="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
              <NuxtImg
                src="https://img.freepik.com/foto-gratis/mano-que-sostiene-flecha-crecimiento-monedas_23-2148780591.jpg"
                alt="Crecimiento financiero con monedas" class="absolute inset-0 size-full rounded-2xl bg-primary object-cover"
                format="webp"
                quality="80"
                sizes="sm:100vw lg:256px"
                loading="eager"
                fetchpriority="high" />
              <div class="absolute inset-0 rounded-2xl ring-1 ring-primary/10 ring-inset"></div>
            </div>
            <div class="">
              <div class="flex items-center gap-x-4 text-xs">
                <time datetime="2020-03-16" class="text-gray-500">Junio 25, 2025</time>
                <!-- <a href="#"
                  class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-500 hover:bg-gray-100">Broker</a> -->
              </div>
              <div class="group relative max-w-2xl">
                <h3 class="mt-3 text-lg/6 font-semibold text-primary group-hover:text-gray-500">
                  <NuxtLink to="/blog/el-momento-es-ahora">
                    <span class="absolute inset-0"></span>
                    Aprovecha el poder de las tasas de cambio a tu favor
                  </NuxtLink>
                </h3>
                <p class="mt-5 text-gray-500">En los últimos años, la devaluación del peso colombiano ha dificultado que
                  muchas familias en el país puedan acceder a una vivienda propia, ya sea mediante pagos de contado
                  o a través de créditos hipotecarios.</p>
              </div>
              <div class="mt-6 flex border-t borderprimary/5 pt-6">
                <div class="relative flex items-center gap-x-4">
                  <NuxtImg
                    src="/team/alejandra-perez.avif"
                    alt="Alejandra Pérez C." class="size-10 rounded-full bg-gray-50"
                    format="webp"
                    quality="75"
                    sizes="40px"
                    loading="lazy" />
                  <div class="text-sm/6">
                    <p class="font-semibold text-primary">
                      <a href="#">
                        <span class="absolute inset-0"></span>
                        Alejandra Pérez C.
                      </a>
                    </p>
                    <p class="text-gray-500">Gerente</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white">
    <div class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
      <div
        class="relative isolate overflow-hidden bg-secondary px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h2 class="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">¿Listo
            para invertir en tu futuro en Colombia?</h2>
          <p class="mt-6 text-lg/8 text-pretty text-white"> Nuestro equipo está listo para escucharte,
            orientarte y ayudarte a tomar la mejor decisión.</p>
          <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <NuxtLink to="/contacto" class=" rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-xs
                            shadow-primary/5 hover:bg-primary hover:text-white focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-white">Contáctanos</NuxtLink>
            <NuxtLink to="/nosotros" class="text-sm/6 font-semibold text-white hover:text-primary">
              Conocer más <span aria-hidden="true">→</span></NuxtLink>
          </div>
        </div>
        <div class="relative mt-16 h-full lg:mt-8">
          <NuxtImg
            class="absolute top-0 left-0 w-[46rem] max-w-none object-center object-cover rounded-md bg-white/5 ring-1 ring-white/10"
            src="https://img.freepik.com/foto-gratis/mira-compramos-casa_637285-12424.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740"
            alt="Familia feliz celebrando compra de casa"
            format="webp"
            quality="80"
            sizes="sm:100vw lg:736px"
            loading="lazy" />
        </div>
      </div>
    </div>
  </div>

</template>