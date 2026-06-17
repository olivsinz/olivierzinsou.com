# olivierzinsou.com

Personal portfolio of Olivier ZINSOU — Senior Full Stack Developer.

**Live:** https://olivierzinsou.vercel.app

## Stack

- [Vue 3.5](https://vuejs.org) (Composition API, `<script setup>`)
- [Vite 6](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [ESLint 10](https://eslint.org) with flat config
- [Web3Forms](https://web3forms.com) for contact form

## Local dev

```bash
npm install
npm run dev
```

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at localhost:5173 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview built output |
| `npm run lint` | ESLint fix on `src/` |
| `npm run format` | Prettier format |

## Architecture

Single-file SPA with all content in `src/components/Index.vue`. Theme configured via `@theme` in `src/style.css` (Tailwind v4 CSS-first approach).
