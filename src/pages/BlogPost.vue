<script setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useHead } from '@unhead/vue';
  import { getPost } from '../lib/posts';
  import { categoryColor } from '../lib/categories';
  import SocialLinks from '../components/SocialLinks.vue';

  const SITE_URL = 'https://olivierzinsou.xyz';

  const route = useRoute();
  const post = computed(() => getPost(route.params.slug));

  const readingProgress = ref(0);

  function updateReadingProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    readingProgress.value = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  }

  onMounted(() => {
    updateReadingProgress();
    window.addEventListener('scroll', updateReadingProgress, { passive: true });
    window.addEventListener('resize', updateReadingProgress);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', updateReadingProgress);
    window.removeEventListener('resize', updateReadingProgress);
  });

  useHead(() => {
    if (!post.value) return {};

    const title = `${post.value.title} | Olivier ZINSOU`;
    const description = post.value.excerpt;
    const url = `${SITE_URL}/blog/${post.value.slug}`;

    return {
      title,
      link: [{ rel: 'canonical', href: url }],
      meta: [
        { name: 'description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
    };
  });
</script>

<template>
  <div class="pt-8 md:pt-16">
    <div
      v-if="post"
      class="fixed top-0 inset-x-0 z-50 h-1 bg-secondary origin-left transition-transform duration-100"
      :style="{ transform: `scaleX(${readingProgress})` }"
    ></div>

    <article v-if="post" class="max-w-2xl mx-auto px-8 relative z-10 motion-safe:animate-fade-up">
      <router-link
        to="/blog"
        class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors"
      >
        Blog
      </router-link>
      <div class="flex items-center gap-3 flex-wrap mt-6">
        <time v-if="post.date" class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ post.date }}</time>
        <span
          v-if="post.category"
          :class="['text-xs font-semibold px-2.5 py-1 rounded-full', categoryColor(post.category)]"
        >
          {{ post.category }}
        </span>
      </div>
      <h1 class="mt-2 text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
        {{ post.title }}
      </h1>
      <div class="flex items-center gap-2.5 mt-6">
        <img
          src="/me.webp"
          alt="Olivier ZINSOU"
          width="28"
          height="28"
          loading="lazy"
          decoding="async"
          class="w-7 h-7 rounded-full object-cover shrink-0"
        />
        <span class="text-sm font-medium text-slate-600 dark:text-slate-300">Olivier ZINSOU</span>
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -- content is our own markdown from src/posts, never user input -->
      <div class="post-content mt-8 text-slate-700 dark:text-slate-300" v-html="post.html"></div>

      <aside class="mt-16 flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-6">
        <img
          src="/me.webp"
          alt="Olivier ZINSOU"
          width="64"
          height="64"
          loading="lazy"
          decoding="async"
          class="w-16 h-16 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700 shrink-0"
        />
        <div>
          <p class="font-semibold text-slate-800 dark:text-white">Olivier ZINSOU</p>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Senior Full Stack Developer, PHP/Laravel and Vue.js.
            <router-link to="/#contact" class="text-primary dark:text-secondary hover:underline">Say hi</router-link>.
          </p>
          <SocialLinks :size="18" class="mt-3" />
        </div>
      </aside>
    </article>

    <div v-else class="max-w-2xl mx-auto px-8 relative z-10 text-center">
      <p class="text-slate-600 dark:text-slate-300">Post not found.</p>
      <router-link to="/blog" class="mt-4 inline-block text-sm font-medium text-primary dark:text-secondary hover:underline">
        &larr; Back to blog
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .post-content :deep(p) {
    margin-top: 1.25em;
    line-height: 1.75;
  }
  .post-content :deep(p:first-child) {
    margin-top: 0;
  }
  .post-content :deep(h2) {
    margin-top: 2em;
    font-size: 1.5rem;
    font-weight: 600;
    color: inherit;
  }
  .post-content :deep(h3) {
    margin-top: 1.5em;
    font-size: 1.25rem;
    font-weight: 600;
  }
  .post-content :deep(a) {
    color: var(--color-secondary);
    text-decoration: underline;
  }
  .post-content :deep(ul),
  .post-content :deep(ol) {
    margin-top: 1.25em;
    padding-left: 1.5em;
  }
  .post-content :deep(li) {
    margin-top: 0.5em;
  }
  .post-content :deep(ul) {
    list-style: disc;
  }
  .post-content :deep(ol) {
    list-style: decimal;
  }
  .post-content :deep(code) {
    font-size: 0.875em;
    background: color-mix(in srgb, currentColor 10%, transparent);
    padding: 0.15em 0.4em;
    border-radius: 0.35em;
  }
  .post-content :deep(.code-block) {
    margin-top: 1.25em;
  }
  .post-content :deep(pre) {
    position: relative;
    padding: 2.5em 1em 1em;
    border-radius: 0.75em;
    overflow-x: auto;
  }
  .post-content :deep(.code-caption) {
    margin-top: 0.5em;
    font-size: 0.8em;
    text-align: center;
    color: color-mix(in srgb, currentColor 45%, transparent);
  }
  .post-content :deep(img) {
    display: block;
    margin-top: 1.25em;
    border-radius: 0.75em;
    max-width: 100%;
  }
  .post-content :deep(.img-caption) {
    display: block;
    margin-top: 0.5em;
    font-size: 0.8em;
    text-align: center;
    color: color-mix(in srgb, currentColor 45%, transparent);
  }
  .post-content :deep(pre)::before {
    content: '';
    position: absolute;
    top: 1em;
    left: 1em;
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    background: #ff5f56;
    box-shadow:
      1.35em 0 0 #ffbd2e,
      2.7em 0 0 #27c93f;
  }
  .post-content :deep(pre code) {
    background: none;
    padding: 0;
    counter-reset: line;
  }
  .post-content :deep(.code-line) {
    display: block;
    padding-left: 2.25em;
    position: relative;
  }
  .post-content :deep(.code-line)::before {
    counter-increment: line;
    content: counter(line);
    position: absolute;
    left: 0;
    width: 1.75em;
    text-align: right;
    color: color-mix(in srgb, currentColor 35%, transparent);
    user-select: none;
  }
  .post-content :deep(blockquote) {
    margin: 2em 0;
    padding: 1.25em 1.5em;
    border-left: 4px solid var(--color-secondary);
    border-radius: 0 0.75em 0.75em 0;
    background: color-mix(in srgb, var(--color-secondary) 8%, transparent);
    font-style: normal;
    font-weight: 700;
    font-size: 1.375rem;
    line-height: 1.45;
  }
  .post-content :deep(blockquote p) {
    margin-top: 0;
  }
</style>
