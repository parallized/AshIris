<script setup lang="ts">
import type { Post } from '~/types/halo-struct'
import Item from './item.vue'
import Hero from '../com/hero.vue'
import { useIntersectionObserver } from '@vueuse/core'
import { ref, onMounted } from 'vue'
import { useHalo } from '~/utils/halo'

const { coreApi } = useHalo()

const page = ref(0)

const isEnd = ref(false)
const fetchingPosts = ref(false)

const posts = ref<Post[]>([] as Post[])
const readPosts = async (page: number) => {
  const res = await coreApi.content.post.listPost({
    page,
  })

  const newPosts = (res.data.items as Post[]).filter((p) => !p.spec.deleted)

  if (res.data.total) count.value = res.data.total

  if (res.data.last) isEnd.value = true
  return newPosts
}

const readNextPage = async () => {
  if (isEnd.value || fetchingPosts.value) return
  fetchingPosts.value = true
  posts.value = [...posts.value, ...(await readPosts(++page.value))]
  fetchingPosts.value = false

  await new Promise((resolve) => setTimeout(resolve, 66))
  if (targetVisible.value) {
    await readNextPage()
  }
}
onMounted(readNextPage)

// lazy loading
const target = ref(null)
const targetVisible = ref(false)
useIntersectionObserver(target, async ([entry], observerElement) => {
  targetVisible.value = entry.isIntersecting
  if (entry.isIntersecting) {
    await readNextPage()
  }
})

// count
const count = ref()
</script>

<template>
  <div class="post-list">
    <Hero
      title="远"
      description="有许多遙远的，不稀奇的事情記載在这里"
      title-class="text-[40px] text-transparent bg-clip-text from-black to-green-800/75 bg-gradient-to-br"
    />

    <div v-if="posts?.[0] && count > 0" class="h-[20px] mb-6">
      <span class="opacity-55 text-sm items-center flex gap-2">
        <Icon name="mdi:select-search" />
        <span> 共 {{ count }} 篇笔记</span>
      </span>
    </div>

    <ul v-if="posts" class="post-list__list">
      <TransitionGroup name="fade-in">
        <template v-for="p in posts" :key="idx">
          <Item :post="p" />
        </template>
      </TransitionGroup>
    </ul>

    <div
      ref="target"
      v-if="!isEnd"
      class="flex items-center text-sm gap-1 opacity-75 justify-start"
    >
      <Icon class="text-sm" name="eos-icons:loading" />
      加载中...
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-list {
  @apply p-4;

  &__list {
    @apply gap-4 flex flex-col;
  }
}

.fade-in-enter-active,
.fade-in-leave-active {
  @apply transition-all duration-[0.7s];
  opacity: 1;
}

.fade-in-enter-from,
.fade-in-leave-to {
  @apply transition-all duration-[0.7s];
  opacity: 0;
  filter: blur(0.5px) grayscale(0.5);
  transform: translateY(30px);
}
</style>
