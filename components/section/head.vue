<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { HeaderColorMode, useThemeStore } from '~/store/theme'

const theme = useThemeStore()

const headEl = ref()
const headVisible = shallowRef(false)

useIntersectionObserver(headEl, ([entry]) => {
  headVisible.value = entry?.isIntersecting || false
  console.log(headVisible.value)
  if (headVisible.value) {
    theme.headerColorMode = HeaderColorMode.DARK
  } else {
    theme.headerColorMode = HeaderColorMode.LIGHT
  }
})
</script>

<template>
  <section ref="headEl" class="head-image-container">
    <QImg class="head-image" src="image/dance.webp" />
    <div class="content-container">
      <div class="content">
        <h1>不散, 不见</h1>
        <div>
          这里是花远明，<span class="text-orange-300">数字媒体技术</span>
          本科在校生一枚，初中开始接触游戏开发，一直在学习和思考一些有意思的编码、设计
          <div class="mt-2 opacity-70">
            <Icon class="text-3xl" name="line-md:download-loop" />
          </div>
        </div>
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

    h1 {
      @apply opacity-90 h-[120px] text-white text-[100px];
    }

    div {
      @apply text-white h-[40px] tracking-wider max-w-[440px] text-end;
    }
  }
}
</style>
