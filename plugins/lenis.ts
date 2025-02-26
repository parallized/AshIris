import vuePlugin from 'lenis/vue'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'lenis',
  setup(nuxtApp) {
    nuxtApp.vueApp.use(vuePlugin)
  }
})

export * from 'lenis/vue'