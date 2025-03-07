<script setup lang="ts">
import { useThemeStore } from '~/store/theme'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const theme = useThemeStore()

const flowerEl = ref()

useIntersectionObserver(flowerEl, ([entry]) => {
  theme.flowerVisible = entry?.isIntersecting || false
})
</script>

<template>
  <section class="peak">
    <div ref="flowerEl" class="clip">
      <div class="clip-text-wrapper">
        <div class="clip-text">更多未来</div>
      </div>
      <div class="clip-image">
        <QImg
          class="object-cover w-full max-w-[1200px]"
          src="image/flowersea.webp"
        />
        <div class="clip-mask" />
      </div>
    </div>

    <div class="underworld bg-noise">
      <h1>剩余内容施工中...</h1>
    </div>
  </section>
</template>

<style scoped lang="scss">
.peak {
  @apply relative h-[1000px] text-center w-full;
  clip-path: polygon(0% 0, 100% 0, 100% 100%, 0% 100%);

  .clip {
    @apply h-[500px] z-[1] w-full sticky bg-black;

    .clip-image {
      @apply absolute bottom-0 w-full flex justify-center blur-[4px] brightness-[80%] grayscale-[20%];
    }

    .clip-text {
      text-shadow: rgba(0, 0, 0, 0.89) 2px 2px 4px;
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
      @apply absolute text-[27px] xl:text-[45px] tracking-widest z-[1] flex h-full flex-col items-center justify-center w-full;
      color: white;
    }
  }

  .underworld {
    @apply h-[500px] flex items-center justify-center sticky bottom-[0vh];

    h1 {
      @apply text-[19px] xl:text-[58px] text-neutral-500;
    }
  }
}
</style>
