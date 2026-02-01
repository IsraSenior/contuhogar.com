<script setup lang="ts">
/**
 * Interfaz para el autor del artículo
 */
interface BlogAuthor {
  name: string
  avatar?: string
  role?: string
}

/**
 * Interfaz para un artículo del blog
 */
interface BlogArticle {
  image: string
  title: string
  slug: string
  date?: string
  datetime?: string
  excerpt?: string
  category?: string
  author?: BlogAuthor
}

/**
 * Props del componente BlogCard
 */
interface BlogCardProps {
  article: BlogArticle
  featured?: boolean
}

const props = withDefaults(defineProps<BlogCardProps>(), {
  featured: false
})

const layoutClasses = computed(() => {
  return props.featured
    ? 'flex flex-col gap-8 lg:flex-row'
    : 'flex flex-col gap-4'
})

const imageClasses = computed(() => {
  return props.featured
    ? 'aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0'
    : 'aspect-video sm:aspect-3/2'
})
</script>

<template>
  <article :class="['relative isolate bg-white hover:shadow-md p-5 rounded-3xl transition-all', layoutClasses]">
    <!-- Imagen -->
    <div :class="['relative', imageClasses]">
      <NuxtImg
        :src="article.image"
        :alt="article.title"
        :width="featured ? 256 : 400"
        :height="featured ? 256 : 267"
        :sizes="featured ? '(max-width: 1024px) 100vw, 256px' : '(max-width: 640px) 100vw, 400px'"
        class="absolute inset-0 size-full rounded-2xl bg-primary object-cover"
        format="webp"
        quality="80"
        :loading="featured ? 'eager' : 'lazy'"
        :fetchpriority="featured ? 'high' : undefined"
      />
      <div class="absolute inset-0 rounded-2xl ring-1 ring-primary/10 ring-inset"></div>
    </div>

    <!-- Contenido -->
    <div class="flex-1">
      <!-- Metadata -->
      <div class="flex items-center gap-x-4 text-xs">
        <time v-if="article.date" :datetime="article.datetime" class="text-gray-500">
          {{ article.date }}
        </time>
        <span v-if="article.category" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-500 hover:bg-gray-100">
          {{ article.category }}
        </span>
      </div>

      <!-- Título y extracto -->
      <div class="group relative max-w-2xl">
        <h3 :class="[
          'mt-3 font-semibold text-primary group-hover:text-gray-500',
          featured ? 'text-lg/6' : 'text-base/6'
        ]">
          <NuxtLink :to="`/blog/${article.slug}`">
            <span class="absolute inset-0"></span>
            {{ article.title }}
          </NuxtLink>
        </h3>
        <p v-if="article.excerpt" class="mt-5 text-sm text-gray-500 line-clamp-3">
          {{ article.excerpt }}
        </p>
      </div>

      <!-- Autor -->
      <div v-if="article.author" class="mt-6 flex border-t border-primary/5 pt-6">
        <div class="relative flex items-center gap-x-4">
          <NuxtImg
            v-if="article.author.avatar"
            :src="article.author.avatar"
            :alt="article.author.name"
            width="80"
            height="80"
            sizes="40px"
            class="size-10 rounded-full bg-gray-50"
            format="webp"
            quality="75"
            loading="lazy"
          />
          <div class="text-sm/6">
            <p class="font-semibold text-primary">
              {{ article.author.name }}
            </p>
            <p v-if="article.author.role" class="text-gray-500">
              {{ article.author.role }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
