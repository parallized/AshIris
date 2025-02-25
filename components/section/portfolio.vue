<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { useThemeStore } from '~/store/theme'
import PortfolioCard from '~/components/section/portfolio-card.vue'

const theme = useThemeStore()

const { introHide } = storeToRefs(theme)

const introEndTriggerEl = ref()
useIntersectionObserver(introEndTriggerEl, ([entry]) => {
  introHide.value = !entry?.isIntersecting || false
})
</script>

<template>
  <section class="self-portfolio">
    <div class="portfolio-container">
      <div class="portfolio-group pt-[16vh] scale-[95%]">
        <PortfolioCard>
          <template #image>
            <img class="portfolio-img" src="~/assets/image/latern.jpg" />
          </template>
        </PortfolioCard>

        <PortfolioCard>
          <template #image>
            <img class="portfolio-img" src="~/assets/image/street.jpg" />
          </template>
        </PortfolioCard>
      </div>
      <div class="portfolio-group">
        <PortfolioCard>
          时间并不总是站在我们这边<span class="ml-1 opacity-60"
            >如果没有人类，宇宙将会多么安静？</span
          >
        </PortfolioCard>
        <PortfolioCard>
          <template #image>
            <img class="portfolio-img" src="~/assets/image/leaves.jpg" />
          </template>
        </PortfolioCard>
        <PortfolioCard></PortfolioCard>
      </div>
      <div class="portfolio-group pt-[40vh] scale-[95%]">
        <PortfolioCard ref="introEndTriggerEl">
          <template #image>
            <img class="portfolio-img" src="~/assets/image/wave.jpg" />
          </template>
        </PortfolioCard>
        <PortfolioCard></PortfolioCard>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.self-portfolio {
  @apply bg-neutral-100 pb-12;

  .portfolio-container {
    @apply w-full grid-cols-3 gap-16 grid max-w-[1370px] mx-auto;
  }

  .portfolio-group {
    @apply flex flex-col gap-12;
  }

  .portfolio-img {
    @apply w-full object-cover object-left-bottom h-full;
  }
}
</style>
