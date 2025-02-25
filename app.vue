<script lang="ts" setup>
import '~/assets/styles/color-theme.scss'
import Icon from '~/assets/image/favicon.ico'

useHead({
  title: '花远明的小世界',
  meta: [{ name: 'description', content: 'Page description' }],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.font.im/css?family=Amaranth:400i|Comfortaa|Marcellus',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/@callmebill/lxgw-wenkai-web@latest/style.css',
    },
    {
      rel: 'shortcut icon',
      href: Icon,
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
body {
  overflow-y: scroll;
}
</style>
