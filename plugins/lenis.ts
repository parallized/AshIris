import vuePlugin from 'lenis/vue'

export default defineNuxtPlugin({
  name: 'lenis',
  setup(nuxtApp) {
    nuxtApp.vueApp.use(vuePlugin)
  }
})

export * from 'lenis/vue'