import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
import '@fontsource-variable/outfit'
import 'highlight.js/styles/tokyo-night-dark.css'
import './style.css'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from './router'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, behavior: 'smooth' }
      return { top: 0 }
    },
  },
  ({ isClient }) => {
  if (isClient) {
    inject()
    injectSpeedInsights()
  }
})
