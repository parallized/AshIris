<script setup lang="ts">
import SectionHead from '~/components/section/head.vue'
import { useThemeStore } from '~/store/theme'
import { definePageMeta, storeToRefs } from '#imports'
import Shadin from '~/components/com/shadin.vue'

definePageMeta({
  layout: 'base'
})

const theme = useThemeStore()
const { introHide } = storeToRefs(theme)
</script>

<template>
  <div class="index">
    <SectionHead />

    <section class="self-intro bg-noise">
      <Shadin :duration="800">
        <div class="intro" :class="introHide ? '' : 'opacity-0'">
          <h1 class="text-xl xl:text-3xl opacity-60 tracking-wider">你好啊~</h1>
          <h1 class="text-xl xl:text-3xl tracking-wider">相逢何必曾相识</h1>
        </div>
      </Shadin>
    </section>

    <SectionPortfolio />
    <SectionContact />
    <SectionTechskill />
    <SectionShowreel />
    <SectionPeak />
    <SectionTail />
  </div>
</template>

<style scoped lang="scss">
.index {
  @apply relative;
}

.self-intro {
  @apply flex flex-col items-center justify-center h-[100vh];

  .intro {
    @apply transition-all sticky top-[30vh] flex flex-col gap-2 items-center;
  }
}
</style>
