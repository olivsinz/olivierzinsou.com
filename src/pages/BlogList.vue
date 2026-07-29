<script setup>
  import { useHead } from '@unhead/vue';
  import { getPosts } from '../lib/posts';
  import { categoryColor } from '../lib/categories';

  const posts = getPosts();

  useHead({
    title: 'Writing | Olivier ZINSOU',
    link: [{ rel: 'canonical', href: 'https://olivierzinsou.xyz/blog' }],
    meta: [
      { name: 'description', content: 'Notes on Laravel, Vue, and building software, from real work.' },
      { property: 'og:title', content: 'Writing | Olivier ZINSOU' },
      { property: 'og:description', content: 'Notes on Laravel, Vue, and building software, from real work.' },
      { property: 'og:url', content: 'https://olivierzinsou.xyz/blog' },
    ],
  });
</script>

<template>
  <div class="pt-8 md:pt-16">
    <section class="max-w-2xl md:max-w-4xl mx-auto px-8 relative z-10 motion-safe:animate-fade-up">
      <span class="block text-sm font-semibold tracking-[0.25em] text-primary dark:text-secondary mb-3">Blog</span>
      <h1 class="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white mb-12">
        Writing
      </h1>

      <p v-if="!posts.length" class="text-slate-600 dark:text-slate-300">
        Nothing published yet. Check back soon.
      </p>

      <div v-else class="flex flex-col divide-y divide-slate-200 dark:divide-slate-700">
        <router-link
          v-for="(post, index) in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="group flex gap-6 py-8 first:pt-0"
        >
          <span
            class="hidden sm:block shrink-0 text-6xl font-bold leading-none tabular-nums text-slate-200 dark:text-slate-800 group-hover:text-primary/25 dark:group-hover:text-secondary/25 transition-colors"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <div class="min-w-0">
            <div class="flex items-center gap-3 flex-wrap">
              <time v-if="post.date" class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ post.date }}</time>
              <span
                v-if="post.category"
                :class="['text-xs font-semibold px-2.5 py-1 rounded-full', categoryColor(post.category)]"
              >
                {{ post.category }}
              </span>
            </div>
            <h2 class="mt-2 text-2xl font-semibold text-slate-800 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors">
              {{ post.title }}
            </h2>
            <p class="mt-2 text-base text-slate-600 dark:text-slate-300">
              {{ post.excerpt }}
            </p>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>
