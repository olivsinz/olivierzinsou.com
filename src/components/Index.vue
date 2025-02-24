<script setup>
  import { reactive } from 'vue';

  const projects = reactive([
    {
      name: 'Espoir Canadien',
      description:
        'A feature-rich platform with Laravel, optimized for a smooth user experience.',
      image: '/01-espoir-canadien.png',
      link: 'https://espoircanadien.com',
    },
    {
      name: 'IMUXT',
      description:
        'A business web solution built with modern tools, optimized for speed and usability.',
      image: '/02-imuxt.png',
      link: 'https://www.imuxt.com/',
    },
    {
      name: 'UMÒJA',
      description:
        "A bespoke landing page that complements Umoja's brand identity.",
      image: '/03-umoja.png',
      link: 'https://umoja-six.vercel.app',
    },
  ]);
</script>

<template>
  <div class="min-h-full py-32">
    <section
      class="max-w-3xl mx-auto px-10 md:px-6 text-center relative z-10 md:pt-10"
    >
      <h1 class="text-4xl font-bold mb-6 md:mb-10 text-slate-800">
        Hi, I'm Olivier 👋
      </h1>
      <p class="text-lg sm:text-xl leading-relaxed text-slate-800">
        I am a full-stack software developer committed to breaking down complex
        problems and delivering scalable solutions that align with business
        goals. With a drive for innovation and a results-oriented mindset, I
        thrive on tackling new challenges and contributing to impactful
        projects.
      </p>
      <p class="mt-8 text-lg text-slate-800">
        Connect with me on
        <a
          href="https://twitter.com/zinsouoliviers"
          target="_blank"
          class="text-blue-500 hover:underline"
        >
          Twitter</a
        >,
        <a
          href="https://www.linkedin.com/in/olivierzinsou/"
          target="_blank"
          class="text-blue-500 hover:underline"
        >
          LinkedIn
        </a>
        and
        <a
          href="https://github.com/olivsinz/"
          target="_blank"
          class="text-blue-500 hover:underline"
        >
          GitHub </a
        >.
      </p>
    </section>

    <section class="max-w-6xl mx-auto px-6 mt-16 md:mt-32 relative z-10">
      <h1
        class="text-4xl sm:text-4xl text-center font-bold sm:px-8 text-slate-800"
      >
        Featured works
      </h1>
      <div
        class="mx-auto max-w-screen-lgx px-4 sm:px-8 lg:px-12 lg:text-left mt-8 md:mt-16"
      >
        <div
          class="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-12"
        >
          <div v-for="project in projects" :key="project.name" class="group">
            <a :href="project.link" target="_blank">
              <div
                class="overflow-hidden rounded-b-2xl rounded-t-2xl border-2 border-gray-200 transition-shadow duration-300 group-hover:translate-y-[-0.125rem] group-hover:shadow-lg"
              >
                <img
                  :src="project.image"
                  :alt="`Project - ${project.name}`"
                  loading="lazy"
                  fetchpriority="high"
                  decoding="async"
                  width="1349"
                  height="1350"
                  style="
                    color: transparent;
                    width: 100%;
                    height: auto;
                    inset: 0px;
                  "
                  sizes="100vw"
                  class="w-full h-auto"
                />
              </div>
              <div class="mt-6 flex items-center sm:mt-8">
                <h3
                  class="group text-base font-medium text-neutral-900 sm:text-lg"
                >
                  {{ project.name }}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="h-10 w-10 pl-3"
                >
                  <path
                    fill="currentColor"
                    d="M17.044 15c.282-.615.554-1.154.817-1.615.282-.462.554-.846.817-1.154H2.25v-1.212h16.428a11.243 11.243 0 0 1-.817-1.182 23.57 23.57 0 0 1-.817-1.587h.986c1.184 1.404 2.424 2.442 3.72 3.115v.52c-1.296.654-2.536 1.692-3.72 3.115z"
                  ></path>
                </svg>
              </div>
              <p
                class="group mt-3 text-base font-[350] text-neutral-700 sm:text-lg"
              >
                {{ project.description }}
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>

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
</style>
