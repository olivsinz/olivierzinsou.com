<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const year = new Date().getFullYear();

  const themeMode = ref('system');
  const showContactFab = ref(true);

  onMounted(() => {
    const stored = localStorage.getItem('theme-mode');
    if (stored) {
      themeMode.value = stored;
      applyTheme(stored);
    }

    const contactEl = document.getElementById('contact');
    if (contactEl && 'IntersectionObserver' in window) {
      new IntersectionObserver(
        ([entry]) => { showContactFab.value = !entry.isIntersecting; },
        { threshold: 0.15 }
      ).observe(contactEl);
    }
  });

  function applyTheme(mode) {
    const html = document.documentElement;
    let isDark;
    if (mode === 'dark') {
      isDark = true;
    } else if (mode === 'light') {
      isDark = false;
    } else {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    html.classList.toggle('dark', isDark);

    if (mode === 'light' || mode === 'dark') {
      document.querySelectorAll('meta[name="theme-color"]').forEach((el) => {
        el.setAttribute('content', isDark ? '#030712' : '#ffffff');
      });
    } else {
      document.querySelector('meta[name="theme-color"][media*="light"]')?.setAttribute('content', '#ffffff');
      document.querySelector('meta[name="theme-color"][media*="dark"]')?.setAttribute('content', '#030712');
    }
  }

  function setTheme(mode) {
    themeMode.value = mode;
    localStorage.setItem('theme-mode', mode);
    applyTheme(mode);
  }
</script>

<template>
  <div class="min-h-full">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-white dark:focus:bg-secondary dark:focus:text-primary text-sm font-medium"
    >Skip to content</a>

    <header class="max-w-2xl md:max-w-4xl mx-auto px-8 pt-8 relative z-10 flex items-center justify-between">
      <router-link to="/" class="text-sm font-semibold tracking-[0.25em] uppercase text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors">
        Olivier ZINSOU
      </router-link>
      <nav class="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
        <router-link
          to="/"
          :class="['hover:text-primary dark:hover:text-secondary transition-colors', route.path === '/' && 'text-primary dark:text-secondary font-semibold']"
        >Home</router-link>
        <router-link
          to="/blog"
          :class="['hover:text-primary dark:hover:text-secondary transition-colors', route.path.startsWith('/blog') && 'text-primary dark:text-secondary font-semibold']"
        >Blog</router-link>
        <router-link to="/#contact" class="hover:text-primary dark:hover:text-secondary transition-colors">Contact</router-link>
      </nav>
    </header>

    <router-view />

    <footer class="max-w-2xl md:max-w-4xl mx-auto px-8 mt-24 pb-12 relative z-10">
      <div class="border-t border-slate-200 dark:border-slate-700 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-2 justify-center sm:justify-start">
          <button
            :class="[
              'p-1.5 rounded-lg transition-colors',
              themeMode === 'system'
                ? 'bg-slate-200 dark:bg-slate-800 text-primary dark:text-secondary'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'
            ]"
            aria-label="System theme"
            title="System"
            @click="setTheme('system')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="2" y1="20" x2="22" y2="20"></line>
            </svg>
          </button>
          <button
            :class="[
              'p-1.5 rounded-lg transition-colors',
              themeMode === 'light'
                ? 'bg-slate-200 dark:bg-slate-800 text-primary dark:text-secondary'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'
            ]"
            aria-label="Light theme"
            title="Light"
            @click="setTheme('light')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </button>
          <button
            :class="[
              'p-1.5 rounded-lg transition-colors',
              themeMode === 'dark'
                ? 'bg-slate-200 dark:bg-slate-800 text-primary dark:text-secondary'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'
            ]"
            aria-label="Dark theme"
            title="Dark"
            @click="setTheme('dark')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </div>
        <p class="text-sm text-slate-400 dark:text-slate-500 text-center sm:text-left">
          © {{ year }} Olivier ZINSOU
        </p>
      </div>
    </footer>

    <div class="bg-pattern dark:bg-pattern-dark h-full absolute top-0 inset-x-0 z-0">
      <div class="w-full h-full bg-gradient-to-t from-white dark:from-[#030712]"></div>
    </div>
    <div class="bg-noise fixed inset-0 z-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06]"></div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-3 scale-90"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 translate-y-3 scale-90"
    >
      <router-link
        v-if="showContactFab"
        to="/#contact"
        class="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-primary text-white px-5 py-3 text-sm font-medium shadow-lg shadow-primary/20 hover:opacity-90 hover:scale-105 active:scale-95 transition dark:bg-secondary dark:text-primary dark:shadow-secondary/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        Say hi
      </router-link>
    </Transition>
  </div>
</template>
