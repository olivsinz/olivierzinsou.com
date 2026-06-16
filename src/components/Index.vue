<script setup>
  import { ref, watch } from 'vue';

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
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...form.value }),
      });
      const data = await res.json();
      status.value = data.success ? 'success' : 'error';
      if (data.success) form.value = { name: '', email: '', message: '' };
    } catch {
      status.value = 'error';
    }
  }

  const stack = [
    { label: 'Backend',   skills: ['Laravel', 'PHP 8+', 'Symfony', 'Filament', 'REST API'] },
    { label: 'Frontend',  skills: ['Vue.js 3', 'TypeScript', 'Inertia.js', 'Tailwind CSS', 'Alpine.js', 'Livewire'] },
    { label: 'Database',  skills: ['PostgreSQL', 'MySQL', 'Redis'] },
    { label: 'DevOps',    skills: ['AWS', 'Docker', 'GitHub Actions', 'Nginx', 'Laravel Forge', 'Vercel'] },
    { label: 'Testing',   skills: ['Pest', 'PHPUnit', 'PHPStan', 'Larastan', 'Dusk', 'Laravel Pint', 'Sentry'] },
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
      class="max-w-2xl md:max-w-4xl mx-auto px-8 relative z-10 md:pt-10"
    >
      <div class="flex flex-col md:flex-row md:items-center md:gap-12">
        <div class="flex flex-col items-center shrink-0 mb-8 md:mb-0">
          <img
            src="/me.webp"
            alt="Olivier ZINSOU"
            width="160"
            height="160"
            class="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-2 ring-slate-200"
          />
          <div class="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full border border-green-200 mt-4">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Open to work
          </div>
        </div>
        <div class="text-center md:text-left">
          <h1 class="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
            Hi, I'm Olivier ZINSOU 👋
          </h1>
          <p class="text-lg sm:text-xl leading-relaxed text-slate-600">
            Senior Full Stack Developer with 8+ years of experience building SaaS
            platforms and enterprise applications. I specialize in PHP/Laravel and
            Vue.js, with a focus on clean architecture, automated testing, and
            shipping reliable products end to end.
          </p>
          <div class="mt-6 flex items-center gap-4 justify-center md:justify-start">
            <a href="https://github.com/olivsinz/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="text-slate-400 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/olivierzinsou/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="text-slate-400 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://twitter.com/zinsouoliviers" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" class="text-slate-400 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.856L1.254 2.25H8.08l4.261 5.636 5.903-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-2xl md:max-w-4xl mx-auto px-8 mt-16 md:mt-24 relative z-10">
      <h2 class="text-xl font-semibold text-slate-800 mb-6">Tech stack</h2>
      <div class="flex flex-col gap-4">
        <div v-for="group in stack" :key="group.label" class="flex flex-col sm:flex-row sm:items-center gap-2">
          <span class="text-sm font-medium text-slate-500 sm:w-20 sm:shrink-0">{{ group.label }}</span>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in group.skills"
              :key="skill"
              class="text-sm px-3 py-1 rounded-full bg-slate-100 text-slate-700"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 mt-16 md:mt-32 relative z-10">
      <h2
        class="text-4xl text-center font-bold sm:px-8 text-slate-800"
      >
        Featured works
      </h2>
      <div class="mx-auto lg:text-left mt-8 md:mt-16">
        <div
          class="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-16"
        >
          <div v-for="(project, index) in projects" :key="project.name" class="group">
            <component
              :is="project.available === false ? 'div' : 'a'"
              v-bind="project.available === false ? {} : { href: project.link, target: '_blank', rel: 'noopener noreferrer' }"
            >
              <div class="relative overflow-hidden rounded-2xl border border-slate-200 transition-shadow duration-300 group-hover:translate-y-[-0.125rem] group-hover:shadow-lg">
                <img
                  :src="project.image"
                  :alt="`Project - ${project.name}`"
                  :loading="index < 2 ? 'eager' : 'lazy'"
                  :fetchpriority="index < 2 ? 'high' : 'auto'"
                  decoding="async"
                  width="1349"
                  height="1350"
                  style="color: transparent; width: 100%; height: auto;"
                  class="w-full h-auto"
                />
                <span
                  v-if="project.available === false"
                  class="absolute top-3 left-3 bg-white/90 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200"
                >
                  Coming soon
                </span>
              </div>
              <div class="mt-4 flex items-center">
                <h3 class="text-base font-medium text-slate-800 sm:text-lg">
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
              <p class="mt-2 text-base font-normal text-slate-600 sm:text-lg">
                {{ project.description }}
              </p>
            </component>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-2xl mx-auto px-8 mt-24 md:mt-40 relative z-10 text-center">
      <h2 class="text-4xl font-bold text-slate-800">Get in touch</h2>
      <p class="mt-4 text-lg text-slate-600">
        Have a project in mind or just want to say hi? Drop me a message.
      </p>

      <form class="mt-10 text-left space-y-5" @submit.prevent="submitForm">
        <div>
          <label for="contact-name" class="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            required
            autocomplete="name"
            placeholder="John Doe"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
        </div>
        <div>
          <label for="contact-email" class="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            placeholder="john@example.com"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
        </div>
        <div>
          <label for="contact-message" class="block text-sm font-medium text-slate-700 mb-1">Message</label>
          <textarea
            id="contact-message"
            v-model="form.message"
            required
            rows="5"
            placeholder="Tell me about your project..."
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
          />
        </div>

        <button
          type="submit"
          :disabled="status === 'loading'"
          class="w-full bg-primary text-white font-medium py-3 rounded-2xl hover:opacity-90 transition disabled:opacity-50"
        >
          {{ status === 'loading' ? 'Sending…' : 'Send message' }}
        </button>

        <p v-if="status === 'success'" class="text-center text-green-600 text-sm">
          Message sent! I'll get back to you soon.
        </p>
        <p v-if="status === 'error'" class="text-center text-red-500 text-sm">
          Something went wrong. Please try again.
        </p>
      </form>
    </section>

    <footer class="max-w-2xl md:max-w-4xl mx-auto px-8 mt-24 pb-12 relative z-10">
      <div class="border-t border-slate-200 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p class="text-sm text-slate-400 text-center sm:text-left">
          © {{ new Date().getFullYear() }} Olivier ZINSOU
        </p>
        <div class="flex items-center justify-center gap-5">
          <a href="https://github.com/olivsinz/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="text-slate-400 hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/olivierzinsou/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="text-slate-400 hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://twitter.com/zinsouoliviers" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" class="text-slate-400 hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.856L1.254 2.25H8.08l4.261 5.636 5.903-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>

    <div class="bg-pattern h-full absolute top-0 inset-x-0 z-[0]">
      <div class="w-full h-full bg-gradient-to-t from-white"></div>
    </div>
  </div>
</template>

<style scoped>
  section {
    animation: fadeIn 1s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    section {
      animation: none;
    }
  }
</style>
