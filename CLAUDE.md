# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server (localhost:5173)
npm run build      # production build → dist/
npm run preview    # serve built output
npm run lint       # ESLint --fix on src/
npm run format     # Prettier --write on everything
```

ESLint runs automatically during `dev` and `build` via `vite-plugin-eslint2`.

## Architecture

Personal portfolio SPA — Vue 3 + Vite 6 + Tailwind CSS v4.

```
src/
  main.js          # createApp entry
  App.vue          # root shell, mounts Index
  style.css        # @import "tailwindcss" + @theme (colors, font) + .bg-pattern SVG class
  components/
    Index.vue      # entire site: hero bio + projects grid
public/            # static assets (project screenshots, favicons, me.png, og-image.png)
```

**All content lives in `src/components/Index.vue`.** The `projects` array is defined at the top of that file's `<script setup>` block — add/reorder projects there.

## Key config

- `@` alias → `./src`
- Tailwind v4: theme defined in `src/style.css` via `@theme` (no `tailwind.config.js`)
  - Custom font: `--font-sans: 'Outfit'`
  - Custom colors: `--color-primary: #0e0c29`, `--color-secondary: #00c4cc`
- ESLint v10 flat config in `eslint.config.js` (no `.eslintrc`)
- ESLint enforces `no-unused-vars` (error) and `vue/no-unused-properties` (error)
- `vue/multi-word-component-names` rule is disabled (allows `Index.vue`)
