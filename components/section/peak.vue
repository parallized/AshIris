<script setup lang="ts">
import { HeaderColorMode, useThemeStore } from '~/store/theme'
import { shallowRef } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const theme = useThemeStore()

const flowerEl = ref()
const flowerVisible = shallowRef(false)

useIntersectionObserver(flowerEl, ([entry]) => {
  flowerVisible.value = entry?.isIntersecting || false
  console.log(flowerVisible.value)
  if (flowerVisible.value) {
    theme.headerColorMode = HeaderColorMode.DARK
  } else {
    theme.headerColorMode = HeaderColorMode.LIGHT
  }
})
</script>

<template>
  <section class="peak">
    <div class="clip" ref="flowerEl">
      <div class="clip-text-wrapper">
        <div class="clip-text">未来的更多</div>
      </div>
      <div class="clip-image">
        <img
          class="object-cover w-full max-w-[1200px]"
          src="~/assets/image/flowersea.webp"
        />
        <div class="clip-mask"></div>
      </div>
    </div>

    <div class="underworld">Undercity</div>
  </section>
</template>

<style scoped lang="scss">
.peak {
  @apply relative h-[1300px] text-center w-full;
  clip-path: polygon(0% 0, 100% 0, 100% 100%, 0% 100%);

  .clip {
    @apply h-[500px] z-[1] w-full sticky bg-black;

    .clip-image {
      @apply absolute bottom-0 w-full flex justify-center blur-[4px] brightness-[80%] grayscale-[20%];
    }

    .clip-mask {
      @apply absolute inset-0;
      z-index: 2;
      background: radial-gradient(
        circle at 50% 35%,
        transparent 15%,
        black 50%,
        black 100%
      );
    }

    .clip-text-wrapper {
      @apply absolute text-[45px] tracking-widest z-[1] flex h-full flex-col items-center justify-center w-full;
      color: white;
    }
  }

  .underworld {
    @apply h-[800px] flex items-center bg-neutral-100 justify-center sticky bottom-[0vh];
  }
}
</style>
