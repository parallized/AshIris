<script setup lang="ts">
import GithubIcon from '~/components/showreel/github-icon.vue'
import CgGroup from '~/components/showreel/cg-group.vue'
import WebGroup from '~/components/showreel/web-group.vue'
import HybridGroup from '~/components/showreel/hybrid-group.vue'

export interface ShowTopic {
  title: string
  desc?: string
}

const topics = ref<ShowTopic[]>([
  {
    title: 'OSS',
    desc: '使用 GitHub 轻车熟路，遗憾的是还未能在大一点的开源项目贡献过有效的核心代码',
  },
  {
    title: 'Creative Products',
    desc: '喜欢视觉的艺术以及能用公式表达的艺术，一拍即合',
  },
  {
    title: 'Web Builders',
    desc: '喜欢做第一线的体验者，面向用户设计与编程',
  },
  {
    title: 'Hybrid Client & Utilities',
    desc: '为了生产力做的一些可爱的小工具',
  },
])
</script>

<template>
  <section class="showreel-grid">
    <div class="showreel-row">
      <ShowreelCard :data="topics[0]" class="col-span-1">
        <GithubIcon/>
        <div
          class="text-[14px] flex flex-col gap-2 text-neutral-400 tracking-wide"
        >
          <div>
            <span
              class="text-[23px] font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
              >65+</span
            >
            followers
          </div>

          <div>
            <span
              class="text-[23px] font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent"
              >200+</span
            >
            Star
          </div>

          <div>
            <span
              class="text-[23px] font-bold bg-gradient-to-r from-white to-green-600 bg-clip-text text-transparent"
              >5000+</span
            >
            contributions
          </div>
        </div>
      </ShowreelCard>

      <ShowreelCard :data="topics[1]" class="col-span-2">
        <CgGroup/>
      </ShowreelCard>

      <ShowreelCard :data="topics[2]" class="col-span-2">
        <WebGroup/>
      </ShowreelCard>

      <ShowreelCard :data="topics[3]" class="col-span-1">
        <HybridGroup/>
      </ShowreelCard>
    </div>
  </section>
</template>

<style scoped lang="scss">
.showreel-grid {
  @apply w-full flex mt-[-6px] flex-col items-center;
}

.showreel-row {
  @apply max-w-[1440px] gap-6 z-[1] w-full grid grid-cols-3;
}
</style>
