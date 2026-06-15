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
    { label: 'DevOps',    skills: ['AWS', 'Docker', 'GitHub Actions', 'Laravel Forge', 'Vercel'] },
    { label: 'Testing',   skills: ['Pest', 'PHPUnit', 'PHPStan', 'Sentry'] },
  ];

  const projects = [
    {
      name: 'Espoir Canadien',
      description:
        'A Canadian immigration services platform built with Laravel, guiding immigrants and connecting employers with talent.',
      image: '/01-espoir-canadien.png',
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
      image: '/04-best-shopify-stores.png',
      link: null,
      available: false,
    },
  ];
</script>

<template>
  <div class="min-h-full py-32">
    <section
      class="max-w-2xl md:max-w-3xl mx-auto px-8 text-center relative z-10 md:pt-10"
    >
      <div class="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full border border-green-200 mb-6">
        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        Open to work
      </div>
      <h1 class="text-4xl font-bold mb-6 md:mb-10 text-slate-800">
        Hi, I'm Olivier 👋
      </h1>
      <p class="text-lg sm:text-xl leading-relaxed text-slate-800">
        Senior Full Stack Developer with 8+ years of experience building SaaS
        platforms and enterprise applications. I specialize in PHP/Laravel and
        Vue.js, with a focus on clean architecture, automated testing, and
        shipping reliable products end to end.
      </p>
      <p class="mt-8 text-lg text-slate-800">
        Connect with me on
        <a
          href="https://twitter.com/zinsouoliviers"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline"
        >
          X</a
        >,
        <a
          href="https://www.linkedin.com/in/olivierzinsou/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline"
        >
          LinkedIn
        </a>
        and
        <a
          href="https://github.com/olivsinz/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline"
        >
          GitHub</a
        >.
      </p>
    </section>

    <section class="max-w-2xl md:max-w-3xl mx-auto px-8 mt-16 md:mt-24 relative z-10">
      <h2 class="text-lg font-semibold text-slate-800 mb-6">Tech stack</h2>
      <div class="flex flex-col gap-4">
        <div v-for="group in stack" :key="group.label" class="flex flex-col sm:flex-row sm:items-center gap-2">
          <span class="text-xs font-medium text-slate-400 sm:w-20 sm:shrink-0">{{ group.label }}</span>
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
              <div class="relative overflow-hidden rounded-2xl border-2 border-gray-200 transition-shadow duration-300 group-hover:translate-y-[-0.125rem] group-hover:shadow-lg">
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
                  class="absolute top-3 left-3 bg-white/90 text-neutral-700 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200"
                >
                  Coming soon
                </span>
              </div>
              <div class="mt-4 flex items-center">
                <h3 class="text-base font-medium text-neutral-900 sm:text-lg">
                  {{ project.name }}
                </h3>
                <svg
                  v-if="project.available !== false"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="h-10 w-10 pl-3"
                >
                  <path
                    fill="currentColor"
                    d="M17.044 15c.282-.615.554-1.154.817-1.615.282-.462.554-.846.817-1.154H2.25v-1.212h16.428a11.243 11.243 0 0 1-.817-1.182 23.57 23.57 0 0 1-.817-1.587h.986c1.184 1.404 2.424 2.442 3.72 3.115v.52c-1.296.654-2.536 1.692-3.72 3.115z"
                  ></path>
                </svg>
              </div>
              <p class="mt-2 text-base font-normal text-neutral-700 sm:text-lg">
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

      <form @submit.prevent="submitForm" class="mt-10 text-left space-y-5">
        <div>
          <label for="contact-name" class="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            required
            autocomplete="name"
            placeholder="John Doe"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
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
            class="w-full rounded-xl border border-gray-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
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
            class="w-full rounded-xl border border-gray-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
          />
        </div>

        <button
          type="submit"
          :disabled="status === 'loading'"
          class="w-full bg-primary text-white font-medium py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
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

    <footer class="max-w-2xl mx-auto px-8 mt-24 pb-12 relative z-10 text-center">
      <p class="text-sm text-slate-400">
        © {{ new Date().getFullYear() }} Olivier ZINSOU
      </p>
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
