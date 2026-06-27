<script setup>
  import { ref, watch, onMounted } from 'vue';
  import SocialLinks from './SocialLinks.vue';

  const year = new Date().getFullYear();

  const themeMode = ref('system');

  onMounted(() => {
    const stored = localStorage.getItem('theme-mode');
    if (stored) {
      themeMode.value = stored;
      applyTheme(stored);
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

  const WEB3FORMS_KEY = 'c3119904-1279-405c-a94a-d5478ad70d70';

  const form = ref({ name: '', email: '', message: '' });
  const status = ref('idle'); // idle | loading | success | error

  watch(form, () => { if (status.value !== 'idle') status.value = 'idle'; }, { deep: true });

  async function submitForm() {
    status.value = 'loading';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: 'New message from olivierzinsou.xyz', ...form.value }),
      });
      const data = await res.json();
      status.value = data.success ? 'success' : 'error';
      if (data.success) form.value = { name: '', email: '', message: '' };
    } catch {
      status.value = 'error';
    }
  }

  const stack = [
    { label: 'Backend',   skills: ['Laravel', 'PHP 8+', 'Symfony', 'Filament'] },
    { label: 'Frontend',  skills: ['Vue.js 3', 'TypeScript', 'Inertia.js', 'Tailwind CSS', 'Livewire'] },
    { label: 'Database',  skills: ['PostgreSQL', 'MySQL', 'Redis'] },
    { label: 'DevOps',    skills: ['AWS', 'Docker', 'GitHub Actions', 'Laravel Forge', 'Vercel'] },
    { label: 'Quality',   skills: ['Pest', 'PHPUnit', 'PHPStan', 'Sentry'] },
  ];

  const projects = [
    {
      name: 'Espoir Canadien',
      description:
        'A Canadian immigration services platform built with Laravel, guiding immigrants and connecting employers with talent.',
      image: '/01-espoir-canadien.webp',
      link: 'https://espoircanadien.com',
    },
    {
      name: 'UMÒJA',
      description:
        'A landing page for a plant-based shoe brand, clean design built to match the brand identity and drive conversions.',
      image: '/03-umoja.png',
      link: 'https://umoja-six.vercel.app',
    },
    {
      name: 'Best Shopify Stores',
      description:
        'A curated gallery showcasing the best-designed Shopify stores, built to inspire merchants and highlight e-commerce excellence.',
      image: '/04-best-shopify-stores.webp',
      link: null,
      available: false,
    },
  ];
</script>

<template>
  <div class="min-h-full pt-32">
    <section
      class="max-w-2xl md:max-w-4xl mx-auto px-8 relative z-10 md:pt-10 motion-safe:animate-fade-up"
    >
      <div class="flex flex-col md:flex-row md:items-center md:gap-12">
        <div class="flex flex-col items-center shrink-0 mb-8 md:mb-0">
          <img
            src="/me.webp"
            alt="Olivier ZINSOU"
            width="160"
            height="160"
            loading="eager"
            fetchpriority="high"
            decoding="sync"
            class="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
          />
          <a href="#contact" class="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/30 mt-4 hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors">
            <span class="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse"></span>
            Open to work
          </a>
        </div>
        <div class="text-center md:text-left">
          <h1 class="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800 dark:text-white">
            Hi, I'm Olivier ZINSOU 👋
          </h1>
          <p class="text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Senior Full Stack Developer with 8+ years of experience building SaaS
            platforms and enterprise applications. I specialize in PHP/Laravel and
            Vue.js, with a focus on clean architecture, automated testing, and
            shipping reliable products end to end.
          </p>
          <SocialLinks :size="24" class="mt-6 justify-center md:justify-start" />
        </div>
      </div>
    </section>

    <section class="max-w-2xl md:max-w-4xl mx-auto px-8 mt-16 md:mt-24 relative z-10 motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
      <h2 class="text-xl font-semibold text-slate-800 dark:text-white mb-6">Tech stack</h2>
      <div class="flex flex-col gap-4">
        <div v-for="group in stack" :key="group.label" class="flex flex-col sm:flex-row sm:items-center gap-2">
          <span class="text-sm font-medium text-slate-500 dark:text-slate-400 sm:w-20 sm:shrink-0">{{ group.label }}</span>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in group.skills"
              :key="skill"
              class="text-sm px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 mt-16 md:mt-32 relative z-10 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
      <h2
        class="text-4xl text-center font-bold sm:px-8 text-slate-800 dark:text-white"
      >
        Featured works
      </h2>
      <div class="mt-8 md:mt-16">
        <div
          class="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-16"
        >
          <div v-for="(project, index) in projects" :key="project.name" class="group">
            <component
              :is="project.available === false ? 'div' : 'a'"
              v-bind="project.available === false ? {} : { href: project.link, target: '_blank', rel: 'noopener noreferrer' }"
            >
              <div class="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 transition-[transform,box-shadow,border-color] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg dark:group-hover:shadow-none dark:group-hover:border-slate-500">
                <img
                  :src="project.image"
                  :alt="project.name"
                  :loading="index < 2 ? 'eager' : 'lazy'"
                  :fetchpriority="index < 2 ? 'high' : 'low'"
                  decoding="async"
                  width="1349"
                  height="1350"
                  class="w-full h-auto"
                />
                <span
                  v-if="project.available === false"
                  class="absolute top-3 left-3 bg-white/90 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full border border-slate-200 dark:bg-slate-800/90 dark:text-slate-300 dark:border-slate-700"
                >
                  Coming soon
                </span>
              </div>
              <div class="mt-4 flex items-center">
                <h3 class="text-base font-medium text-slate-800 dark:text-white sm:text-lg">
                  {{ project.name }}
                </h3>
                <svg
                  v-if="project.available !== false"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="h-5 w-5 ml-2 shrink-0"
                >
                  <path
                    fill="currentColor"
                    d="M17.044 15c.282-.615.554-1.154.817-1.615.282-.462.554-.846.817-1.154H2.25v-1.212h16.428a11.243 11.243 0 0 1-.817-1.182 23.57 23.57 0 0 1-.817-1.587h.986c1.184 1.404 2.424 2.442 3.72 3.115v.52c-1.296.654-2.536 1.692-3.72 3.115z"
                  ></path>
                </svg>
              </div>
              <p class="mt-2 text-base text-slate-600 dark:text-slate-300 sm:text-lg">
                {{ project.description }}
              </p>
            </component>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="max-w-2xl mx-auto px-8 mt-24 md:mt-40 relative z-10 text-center motion-safe:animate-fade-up motion-safe:[animation-delay:360ms]">
      <h2 class="text-4xl font-bold text-slate-800 dark:text-white">Get in touch</h2>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
        Have a project in mind or just want to say hi? Drop me a message.
      </p>

      <form class="mt-10 text-left space-y-5" @submit.prevent="submitForm">
        <div>
          <label for="contact-name" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            required
            autocomplete="name"
            placeholder="John Doe"
            class="w-full rounded-2xl border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 px-4 py-3 text-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary dark:focus:ring-secondary/30 dark:focus:border-secondary transition"
          />
        </div>
        <div>
          <label for="contact-email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            placeholder="john@example.com"
            class="w-full rounded-2xl border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 px-4 py-3 text-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary dark:focus:ring-secondary/30 dark:focus:border-secondary transition"
          />
        </div>
        <div>
          <label for="contact-message" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
          <textarea
            id="contact-message"
            v-model="form.message"
            required
            rows="5"
            placeholder="Tell me about your project..."
            class="w-full rounded-2xl border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 px-4 py-3 text-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary dark:focus:ring-secondary/30 dark:focus:border-secondary transition resize-none"
          />
        </div>

        <button
          type="submit"
          :disabled="status === 'loading'"
          class="w-full bg-primary text-white font-medium py-3 rounded-2xl hover:opacity-90 transition disabled:opacity-50 dark:bg-secondary dark:text-primary"
        >
          {{ status === 'loading' ? 'Sending…' : 'Send message' }}
        </button>

        <div aria-live="polite" aria-atomic="true">
          <p v-if="status === 'success'" class="text-center text-green-600 dark:text-green-400 text-sm">
            Message sent! I'll get back to you soon.
          </p>
          <p v-else-if="status === 'error'" class="text-center text-red-500 dark:text-red-400 text-sm">
            Something went wrong. Please try again.
          </p>
        </div>
      </form>
    </section>

    <footer class="max-w-2xl md:max-w-4xl mx-auto px-8 mt-24 pb-12 relative z-10">
      <div class="border-t border-slate-200 dark:border-slate-700 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-2 justify-center sm:justify-start">
          <button
            :class="[
              'p-1.5 rounded-lg transition-colors',
              themeMode === 'system'
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
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
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
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
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
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
  </div>
</template>
