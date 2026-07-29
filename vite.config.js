import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import eslintPlugin from 'vite-plugin-eslint2';
import path from 'path';
import fs from 'fs';

const postSlugs = fs
  .readdirSync(path.resolve(__dirname, './src/posts'))
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.replace(/\.md$/, ''));

export default defineConfig({
  base: '/',
  plugins: [vue(), tailwindcss(), eslintPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ssgOptions: {
    includedRoutes(paths) {
      const postPaths = postSlugs.map((slug) => `/blog/${slug}`);
      return [...paths.filter((p) => !p.includes(':')), ...postPaths];
    },
  },
});
