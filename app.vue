<script lang="ts" setup>
import '~/assets/styles/color-theme.scss'
import { useHead } from '#imports'
import { VueLenis, useLenis } from 'lenis/vue'

useHead({
  title: '花远明的小世界',
  meta: [{ name: 'description', content: 'Page description' }],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.font.im/css?family=Amaranth:400i|Comfortaa|Marcellus'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/@callmebill/lxgw-wenkai-web@latest/style.css'
    },
    {
      rel: 'shortcut icon',
      href: '/image/favicon.ico'
    }
  ]
})

useLenis()
</script>

<template>
  <VueLenis root>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </VueLenis>
</template>

<style lang="scss">
body {
  overflow-y: scroll;
}
</style>
