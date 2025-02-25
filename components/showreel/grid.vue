<script setup lang="ts">
import GithubIcon from '~/components/showreel/github-icon.vue'
import CgGroup from '~/components/showreel/cg-group.vue'

export interface ShowTopic {
  title: string
  desc?: string
}

const topics = ref<ShowTopic[]>([
  {
    title: 'OSS',
    desc: '使用 GitHub 轻车熟路，很遗憾还未能在大的开源项目贡献过有效的核心代码',
  },
  {
    title: 'Computer Graphics',
    desc: '喜欢视觉的艺术以及能用公式表达的艺术，一拍即合',
  },
])
</script>

<template>
  <section class="showreel-grid">
    <div class="showreel-row">
      <ShowreelCard :data="topics[0]" class="col-span-1">
        <GithubIcon></GithubIcon>
        <div class="text-[14px] flex flex-col gap-2 text-neutral-400">
          <div>
            <span
              class="text-[22px] font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent"
              >200+</span
            >
            Star
          </div>
          <div>
            <span
              class="text-[22px] font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent"
              >65</span
            >
            followers
          </div>
        </div>
      </ShowreelCard>
      <ShowreelCard :data="topics[1]" class="col-span-2">
        <CgGroup></CgGroup>
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
