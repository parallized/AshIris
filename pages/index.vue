<script setup lang="ts">
import SectionHead from '~/components/section/head.vue'
import { useThemeStore } from '~/store/theme'

definePageMeta({
  layout: 'base',
})

const theme = useThemeStore()
const { introHide } = storeToRefs(theme)
</script>

<template>
  <div class="index">
    <SectionHead></SectionHead>

    <section class="self-intro">
      <div class="intro" :class="introHide ? '' : 'opacity-0'">
        <h1 class="text-3xl opacity-60 tracking-wider">你好啊~</h1>
        <h1 class="text-3xl tracking-wider">相逢何必曾相识</h1>
      </div>
    </section>

    <SectionPortfolio></SectionPortfolio>
    <SectionContact></SectionContact>
    <SectionTechskill></SectionTechskill>
  </div>
</template>

<style scoped lang="scss">
.index {
  @apply relative;
}

.self-intro {
  @apply bg-neutral-100 flex flex-col items-center justify-center h-[100vh];

  .intro {
    @apply transition-all sticky top-[30vh] flex flex-col gap-2 items-center;
  }
}
</style>
