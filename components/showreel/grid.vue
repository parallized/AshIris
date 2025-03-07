<script setup lang="ts">
import GithubIcon from '~/components/showreel/github-icon.vue'
import CgGroup from '~/components/showreel/cg-group.vue'
import WebGroup from '~/components/showreel/web-group.vue'
import HybridGroup from '~/components/showreel/hybrid-group.vue'
import { ref } from 'vue'
import type { ShowTopic } from '~/types/global'
import ClockNum from '~/components/com/clock-num.vue'

const topics = ref<ShowTopic[]>([
  {
    title: 'OSS',
    desc: '使用 GitHub 轻车熟路，遗憾的是还未能在大一点的开源项目贡献过有效的核心代码'
  },
  {
    title: 'Creative Products',
    desc: '喜欢视觉艺术以及能用公式表达的艺术，一拍即合'
  },
  {
    title: 'Web Builders',
    desc: '喜欢做第一线的体验者，面向用户设计与编程'
  },
  {
    title: 'Hybrid Client & Utilities',
    desc: '为了生产力做的一些可爱的小工具'
  }
])
</script>

<template>
  <section class="showreel-grid">
    <div class="showreel-row">
      <ShowreelCard :data="topics[0]" class="col-span-1">
        <GithubIcon />
        <div
          class="text-[11px] xl:text-[14px] flex flex-col gap-2 text-neutral-400 tracking-wide"
        >
          <div>
            <span
              class="text-[23px] font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
            >
              <ClockNum :num="65" :duration="1.7" suffix></ClockNum>
             </span
             >
            followers
          </div>

          <div>
            <span
              class="text-[23px] font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent"
            ><ClockNum :num="200" :duration="2.4" suffix></ClockNum></span
            >
            Star
          </div>

          <div>
            <span
              class="text-[23px] font-bold bg-gradient-to-r from-white to-green-600 bg-clip-text text-transparent"
            ><ClockNum :num="5000" :duration="3" suffix></ClockNum></span
            >
            contributions
          </div>
        </div>
      </ShowreelCard>

      <ShowreelCard :data="topics[1]" class="xl:col-span-2">
        <CgGroup />
      </ShowreelCard>

      <ShowreelCard :data="topics[2]" class="xl:col-span-2">
        <WebGroup />
      </ShowreelCard>

      <ShowreelCard :data="topics[3]" class="col-span-1">
        <HybridGroup />
      </ShowreelCard>
    </div>
  </section>
</template>

<style scoped lang="scss">
.showreel-grid {
  @apply w-full px-12 flex mt-[-6px] flex-col items-center;
}

.showreel-row {
  @apply max-w-[1440px] gap-6 z-[1] w-full grid grid-cols-1 xl:grid-cols-3;
}
</style>
