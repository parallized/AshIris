<script lang="ts" setup>
import '~/assets/styles/color-theme.scss'
import icon from '~/assets/image/favicon.ico'
import { useHead } from '#imports'
import { useLenis, VueLenis } from 'lenis/vue'

useHead({
  title: '花明远的小世界',
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
      href: icon
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
