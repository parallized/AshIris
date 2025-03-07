<script setup lang="ts">

import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useThemeStore } from '~/store/theme'
import Shadin from '~/components/com/shadin.vue'

const gridEl = ref()

const theme = useThemeStore()
useIntersectionObserver(gridEl, ([entry]) => {
  theme.showReelVisible = entry?.isIntersecting || false
})
</script>

<template>
  <section class="showreel">
    <div class="content">
      <div class="flex flex-col pt-[42vh] h-full py-8 pl-12 xl:pl-0 transition-all">
        <Shadin :delay="150">
          <h1 class="text-[25px] xl:text-[50px] tracking-wider">技术画廊</h1>
          <h2 class="text-[15px] xl:text-[22px] tracking-wide opacity-60 z-[0]">
            自由意味着责任，或许多数人都惧怕自由。
          </h2>
        </Shadin>
      </div>

      <div class="image-container">
        <QImg class="image" src="image/curve.webp" />
        <div class="mask" />
      </div>
    </div>

    <ShowreelGrid ref="gridEl" />
  </section>
</template>

<style scoped lang="scss">
.showreel {
  @apply bg-black min-h-[100vh] pb-[30vh] w-full text-white;

  .content {
    @apply z-[0] h-[100vh] max-w-[1440px] mx-auto relative;
  }

  .image-container {
    @apply absolute right-0 top-0 w-[65%] h-full z-[-1];

    .image {
      @apply absolute right-0 top-0 z-[-1] h-full object-cover;
    }

    .mask {
      @apply inset-0 absolute z-[-1] bg-gradient-to-r from-black to-transparent;
    }
  }
}
</style>
