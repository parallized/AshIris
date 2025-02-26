<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { useThemeStore } from '~/store/theme'
import PortfolioCard from '~/components/section/portfolio-card.vue'
import { storeToRefs } from '#imports'
import { ref } from 'vue'

const theme = useThemeStore()

const { introHide } = storeToRefs(theme)

const introEndTriggerEl = ref()
useIntersectionObserver(introEndTriggerEl, ([entry]) => {
  introHide.value = !entry?.isIntersecting || false
})
</script>

<template>
  <section class="self-portfolio bg-noise">
    <div class="portfolio-container">
      <div class="portfolio-group pt-[16vh] scale-[95%]">
        <PortfolioCard>
          <template #image>
            <NuxtImg class="portfolio-img" src="/image/latern.webp" />
          </template>
        </PortfolioCard>

        <PortfolioCard>
          <template #image>
            <NuxtImg class="portfolio-img" src="/image/street.webp" />
          </template>
        </PortfolioCard>
      </div>
      <div class="portfolio-group">
        <PortfolioCard>
          <div>
            <NuxtImg class="thumb" src="/image/iris.webp" />
            喜欢记录一些无论价值的事物，所以制作了
            <span class="text-orange-400/75">AshIris</span>
            这个博客，叫做灰烬与莺尾
            <span class="opacity-65"
            >这个博客经历了非常多次重构，贯穿了大学生涯</span
            >
          </div>
          <div class="divider" />
          <NuxtLink
            class="badge"
            href="https://github.com/parallized/AshIris"
            target="_blank"
          >
            博客开源在 · AshIris
            <Icon class="badge-icon" name="fa:github-square" />
          </NuxtLink>
        </PortfolioCard>
        <PortfolioCard>
          <template #image>
            <NuxtImg class="portfolio-img" src="/image/leaves.webp" />
          </template>
        </PortfolioCard>
        <PortfolioCard class="invert opacity-80">
          <div>
            <NuxtImg class="thumb invert" src="/image/build.webp" />
            在制作博客同样的想法下开发了 3D 的
            Pixellens，记录一下做过的模型（或许还能当一个简易的 ShaderLab）<span
            class="opacity-65"
          >早期考虑的是做 Minecraft
              机器图鉴，半路被拐入建筑区开始学做建筑了</span
          >
          </div>
          <div class="divider" />
          <NuxtLink
            target="_blank"
            href="https://github.com/goatcorp/Dalamud"
            class="badge"
          >
            像素档案馆 · Pixellens
            <Icon class="badge-icon" name="devicon-plain:csharp" />
          </NuxtLink>
        </PortfolioCard>
      </div>
      <div class="portfolio-group pt-[40vh] scale-[95%]">
        <PortfolioCard ref="introEndTriggerEl">
          <template #image>
            <NuxtImg class="portfolio-img" src="/image/wave.webp" />
          </template>
        </PortfolioCard>
        <PortfolioCard>
          <div>
            <NuxtImg class="thumb" src="/image/wow.webp" />
            曾经是个 Minecraft 服务器开发者，做过一些没有名气的 War3
            地图，算是一部分 Shader 和 PCG 学习的兴趣来源~
            <span class="opacity-65"
            >玩的最多的是 MMO，从古早的传奇到现代的
              FF14，最喜欢的部分是编写机器人帮我打游戏</span
            >
          </div>
          <div class="divider" />
          <NuxtLink
            target="_blank"
            href="https://github.com/goatcorp/Dalamud"
            class="badge"
          >
            卫月插件 · FFXIV Dalamud
            <Icon class="badge-icon" name="devicon-plain:csharp" />
          </NuxtLink>
        </PortfolioCard>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.self-portfolio {
  @apply pb-12 tracking-wider;

  .portfolio-container {
    @apply w-full grid-cols-3 gap-16 grid max-w-[1370px] mx-auto;
  }

  .portfolio-group {
    @apply flex flex-col gap-12;
  }

  .portfolio-img {
    @apply w-full object-cover object-left-bottom h-full  brightness-[115%];
  }
}

.thumb {
  @apply w-1/3 rounded-lg mb-4;
  box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 3px;
}

.divider {
  @apply border-t border-neutral-300/50 w-full mt-auto mb-6;
}

.badge {
  @apply flex gap-2 px-2 items-center text-[15px] cursor-pointer hover:opacity-100 opacity-75 transition-all;

  .badge-icon {
    @apply text-2xl opacity-70;
  }
}
</style>
