<script setup lang="ts">
import { useHalo } from '~/utils/halo'
import * as tocbot from 'tocbot'
import { definePageMeta, useHead, useRoute, useRouter } from '#imports'
import { onMounted, ref } from 'vue'
import { formatDate } from '~/utils/time'

definePageMeta({
  layout: 'base'
})

const { coreApi } = useHalo()
const route = useRoute()
const id = route.params.id

const postData = ref()
let content: string | null = null

const readPost = async (id: string) => {
  const post = await coreApi.content.post.getPost({ name: id })
  postData.value = post.data

  const snapId = post.data.spec.releaseSnapshot
  if (!snapId) return
  const snap = (await coreApi.content.snapshot.getSnapshot({ name: snapId }))
    .data
  const patch = snap.spec.rawPatch
  if (!patch) return

  if (patch[0] == '[') {
    content = JSON.parse(patch)[0].target.lines.join('\n')
  } else {
    content = patch
  }
}

// toc
const tocNav = ref()
const hasToc = ref(true)
const showToc = ref(false)
const loadToc = async () => {
  tocbot.init({
    tocSelector: '#toc-nav',
    contentSelector: '.prose',
    headingSelector: 'h1, h2, h3',
    hasInnerContainers: true
  })

  if (!tocNav.value?.childNodes || tocNav.value?.childNodes.length === 0) {
    hasToc.value = false
  }
  showToc.value = true
  return
}
onMounted(loadToc)

const toIndexPage = () => {
  useRouter().back()
}

// generate
await readPost(id as string)
useHead({
  title: postData.value?.spec?.title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: postData.value?.spec?.title
    }
  ]
})
</script>

<template>
  <div class="post-page">
    <nav class="pl-[3px]">
      <header class="post-description">
        <h1>
          {{ postData?.spec?.title }}
        </h1>
        <h2 class="flex items-center gap-1 opacity-50 flex-wrap">
          <div class="text-[12px] gap-1 flex items-center">
            <Icon
              class="cursor-pointer hover:text-neutral-500 transition-all"
              name="typcn:arrow-back-outline"
              @click="toIndexPage"
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
            {{ formatDate(postData?.spec?.publishTime) }}
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

      <div class="border-t relative my-4 w-[90%] border-neutral-500/20">
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
        class="text-neutral-300 text-[12px] transition-all duration-500"
        :class="showToc ? 'opacity-100' : 'opacity-0 translate-x-[20px]'"
      >
        内容短 / 无 Toc 概要
      </div>
    </nav>

    <div
      class="prose-code:text-[14px] prose-code:inline-flex prose-pre:leading-[20px] prose-code:opacity-85 prose-img:rounded-lg prose-img:drop-shadow-lg prose-ul:text-[14px] prose-li:text-[14px] prose-p:text-[14px] prose-h1:text-[23px] prose-h2:text-[19px] prose-h3:text-[16px] prose max-w-full"
      v-html="content"
    />
  </div>
</template>

<style lang="scss" scoped>
.post-page {
  @apply pt-[105px] pb-[40vh] min-h-[100vh] max-w-[1340px] flex mx-auto gap-6;
}

.post-description {
  @apply min-w-[180px] relative;
  @apply flex flex-col items-start gap-2 pl-[1px];

  h1 {
    @apply text-[15px] leading-[20px] opacity-80 max-w-[90%] text-ellipsis;
  }

  h2 {
    @apply text-[13px];
  }

  .date {
    @apply opacity-40 text-[11px] flex items-center gap-1;
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

*:target {
  padding-top: 20px;

  &::after {
    content: '';
    display: block;
    height: 20px;
    width: 80%;
    margin-top: -20px;

    background-color: rgba(155, 155, 155, 0.29);
  }
}

.toc-item {
  @apply mb-0;
}

.toc-link {
  @apply my-[4px] pt-[2px] pb-[1px] w-[75%];
  @apply text-[12px] text-nowrap truncate block;

  @apply cursor-pointer transition-all;

  @apply opacity-70 bg-gradient-to-r to-neutral-500 from-black text-transparent bg-clip-text;

  &:hover {
    @apply border-l-[5px] border-neutral-300/60 pl-[5px] opacity-100;

    @apply bg-gradient-to-r from-neutral-500/70 to-transparent via-neutral-500/20 text-white;
    background-clip: unset;
  }
}
</style>
