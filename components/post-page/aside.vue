<script setup lang="ts">
import { formatDate } from '~/utils/time'
import { useRouter } from '#imports'
import * as tocbot from 'tocbot'
import { ref, onMounted } from 'vue'

defineProps<{
  title: string
  publishTime: string
}>()

const toPrevPage = () => {
  useRouter().back()
}

// toc
const hasToc = ref(true)
const showToc = ref(false)

const tocNav = ref()
const loadToc = async () => {
  tocbot.init({
    tocSelector: '#toc-nav',
    contentSelector: '.post-content__unique',
    headingSelector: 'h1, h2, h3',
    hasInnerContainers: false
  })

  tocbot.refresh();

  if (!tocNav.value?.childNodes || tocNav.value?.childNodes.length === 0) {
    hasToc.value = false
  }
  showToc.value = true
  return
}
onMounted(loadToc)
</script>

<template>
  <nav class="pl-[3px] z-0">
    <header class="post-description z-0">
      <h1>
        {{ title }}
      </h1>
      <h2 class="flex items-center gap-1 opacity-50 flex-wrap">
        <div class="text-[12px] gap-1 flex items-center">
          <Icon
            class="cursor-pointer hover:text-neutral-500 transition-all"
            name="typcn:arrow-back-outline"
            @click="toPrevPage"
          />
          <Icon
            class="cursor-pointer hover:text-neutral-500 transition-all"
            name="fluent:edit-12-regular"
          />
        </div>
      </h2>

      <div class="flex flex-col items-start gap-1">
        <p class="date">
          <Icon name="gridicons:create" />
          {{ formatDate(publishTime) }}
        </p>
        <!--          <p-->
        <!--            v-if="-->
        <!--              content.date_updated &&-->
        <!--              content.date_updated != content.date_created-->
        <!--            "-->
        <!--            class="date"-->
        <!--          >-->
        <!--            <Icon name="icon-park-outline:update-rotation" />-->
        <!--            {{ formatDate(content.date_updated) }}-->
        <!--          </p>-->
      </div>
    </header>

    <div class="border-t relative my-4 w-full xl:w-[90%] border-neutral-500/20">
      <Icon
        class="absolute right-1 hover:opacity-[35%] transition-all text-neutral-400 top-4 text-sm"
        name="streamline:cursor-click-solid"
      />
    </div>
    <div
      v-if="hasToc"
      :class="showToc ? 'opacity-100' : 'opacity-0 translate-x-[20px]'"
      class="transition-all duration-500 sticky w-full top-[100px] left-0"
    >
      <div id="toc-nav" ref="tocNav" />
    </div>
    <div
      v-else
      class="text-neutral-300 text-[10px] xl:text-[12px] transition-all duration-500"
      :class="showToc ? 'opacity-100' : 'opacity-0 translate-x-[20px]'"
    >
      内容短 / 无 Toc 概要
    </div>
  </nav>
</template>

<style scoped lang="scss">
.post-description {
  @apply xl:w-[230px] max-xl:w-full relative;
  @apply flex flex-col items-start gap-2 pl-[1px];

  h1 {
    @apply text-[12px] xl:text-[15px] leading-[20px] opacity-70 max-w-[90%] text-ellipsis;
  }

  h2 {
    @apply text-[10px] xl:text-[13px];
  }

  .date {
    @apply opacity-40 text-[9px] xl:text-[11px] flex items-center gap-1;
  }
}
</style>


<style>
.toc-list {
  @apply list-none;

  .toc-list {
    @apply pl-5;
    list-style: none;
  }
}

.toc-item {
  @apply mb-0;
}

.toc-link {
  @apply my-[4px] pt-[2px] pb-[1px] w-[75%];
  @apply text-[10px] xl:text-[12px] text-nowrap truncate block;

  @apply cursor-pointer transition-all;

  @apply opacity-70 bg-gradient-to-r to-neutral-500 from-black text-transparent bg-clip-text;

  &:hover {
    @apply border-l-[5px] border-neutral-300/60 pl-[5px] opacity-100;

    @apply bg-gradient-to-r from-neutral-500/70 to-transparent via-neutral-500/20 text-white;
    background-clip: unset;
  }
}
</style>
