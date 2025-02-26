<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useThemeStore } from '~/store/theme'
import Shadin from '~/components/com/shadin.vue'

const theme = useThemeStore()

const headEl = ref()
useIntersectionObserver(headEl, ([entry]) => {
  theme.headImgVisible = entry?.isIntersecting || false
})
</script>

<template>
  <section ref="headEl" class="head-image-container">
    <QImg class="head-image" src="image/dance.webp" />
    <div class="content-container">
      <div class="content">
        <Shadin class="title">不散, 不见
        </Shadin>

        <Shadin :delay="750">
          这里是花远明，<span class="text-orange-300">数字媒体技术</span>
          本科在校生一枚，初中开始接触游戏开发，一直在学习和思考一些有意思的编码、设计
          <div class="mt-2 opacity-70">
            <Icon class="text-3xl" name="line-md:download-loop" />
          </div>
        </Shadin>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.head-image-container {
  @apply flex relative h-[100vh] w-full;

  .head-image {
    @apply fixed top-0 z-[-1];
    @apply object-cover w-[100vw] h-[100vh];
  }

  .content-container {
    @apply fixed w-full h-full flex items-end pb-[25vh] z-[-1];
  }

  .content {
    @apply max-w-[1340px] w-full flex items-end justify-between mx-auto;

    .title {
      @apply h-[120px] text-nowrap text-white text-[100px];
    }

    div {
      @apply text-white h-[40px] tracking-wider max-w-[440px] text-end;
    }
  }
}
</style>
