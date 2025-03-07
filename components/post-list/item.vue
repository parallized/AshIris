<script setup lang="ts">
import type { Post } from '~/types/halo-struct'
import { getStrCategory } from '~/utils/categories'
import { formatDate } from '~/utils/time'

defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="item">
    <NuxtLink class="title" :href="post.metadata.name"
    >{{ post.spec.title }}
    </NuxtLink>

    <NuxtLink class="categories">
      <Icon name="ph:folder-thin" class="opacity-55 text-[9px] xl:text-[11px]" />
      <span v-for="(i,idx) in post.spec.categories" :key="idx"
            class="text-[9px] xl:text-[11px] cursor-pointer hover:opacity-85 opacity-35 transition-all">
        {{ getStrCategory(i) }}
      </span>
    </NuxtLink>

    <div v-if="post.spec.publishTime" class="ml-auto pointer-events-none text-[9px] text-nowrap xl:text-[11px] opacity-55">
      {{ formatDate(post.spec.publishTime) }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  @apply inline-flex gap-1 items-center;

  .title {
    @apply block text-[10px] xl:text-sm cursor-pointer max-w-[340px] truncate line-clamp-1;
    @apply border-l-[1.5px] pl-1 xl:pl-2 border-neutral-300;
  }

  .categories {
    @apply ml-3 text-[9px] xl:text-sm inline-flex gap-1 items-center;
  }
}
</style>
