<script setup lang="ts">
import type { Post } from '~/types/halo-struct'
import TechGroup from '~/components/tech/tech-group.vue'
import { useHalo } from '~/utils/halo'
import { definePageMeta } from '#imports'
import { ref } from 'vue'

definePageMeta({
  layout: 'base'
})

const posts = ref<Post[]>()

const { coreApi } = useHalo()
coreApi.content.post.listPost().then((response) => {
  posts.value = (response.data.items as Post[])
    .filter((p) => !p.spec.deleted)
    .splice(0, 6)
})
</script>

<template>
  <div class="index">
    <section class="relative w-full flex flex-col">
      <NuxtImg
        class="absolute right-[50px] top-[30px] w-[270px] opacity-30 grayscale"
        src="image/flower-1.webp"
      />

      <div class="flex">
        <h1 class="text-[40px] text-transparent bg-clip-text  from-black to-red-800/75 bg-gradient-to-br">花</h1>
      </div>

      <ul
        class="lores text-[14px] mt-4 px-1 font-light flex flex-col items-start gap-1"
      >
        <li class="opacity-85">
          主业是学习
        </li>

        <li class="mt-1 flex">
          <NuxtLink to="/posts/" class="href mr-[12px]">
            <Icon name="system-uicons:book" />
            看笔记
          </NuxtLink>
          <NuxtLink class="href">
            <Icon name="system-uicons:box-open" />
            看作品集
          </NuxtLink>
        </li>

        <li class="mt-16 text-[14px]">最近的几篇笔记</li>

        <li class="mt-2 flex flex-wrap w-[75%] overflow-hidden">
          <NuxtLink
            v-for="(p, idx) in posts"
            :key="idx"
            class="flex mr-4 mb-1 opacity-50 text-[13px] hover:opacity-100 cursor-pointer transition-all"
            :href="`/posts/` + p.metadata.name"
          >
            · {{ p.spec.title }}
          </NuxtLink>
        </li>

        <li class="mt-16 text-[14px]">
          兴趣是最好的老师
        </li>

        <li class="mt-1 flex w-full">
          <div class="href">
            <Icon name="material-symbols-light:mail-outline" />
            parallized@outlook.com
          </div>

          <NuxtLink
            to="https://github.com/parallized"
            target="_blank"
            class="href ml-[12px]"
          >
            <Icon name="hugeicons:github" />
            parallized
          </NuxtLink>

          <NuxtLink
            to="https://space.bilibili.com/1624454327"
            target="_blank"
            class="href ml-[12px]"
          >
            <Icon name="mingcute:bilibili-line" />
            parallized
          </NuxtLink>
        </li>

        <li class="mt-4 mb-24 flex w-full">
          <TechGroup />
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.index {
  @apply max-w-[1000px] mx-auto w-[100%] p-4;
}

.lores {
  li {
    @apply flex items-center gap-[3px];
  }

  .href {
    @apply cursor-pointer items-center flex py-[5px] px-[2px] rounded-md gap-[5px] opacity-50 hover:opacity-100 transition-all;
  }
}

@keyframes infinite-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
