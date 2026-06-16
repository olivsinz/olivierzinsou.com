import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import eslintPlugin from 'vite-plugin-eslint2';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [vue(), tailwindcss(), eslintPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
