<script setup lang="ts">
import { useHalo } from '~/utils/halo'
import tocbot from 'tocbot'

definePageMeta({
  layout: 'base',
})

const { coreApi } = useHalo()
const route = useRoute()
const id = route.params.id

const postData = ref()
const content = ref()
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
    content.value = JSON.parse(patch)[0].target.lines.join('\n')
  } else {
    content.value = patch
  }
}

const loadToc = async () => {
  await new Promise((resolve) => setTimeout(resolve, 333))
  tocbot.init({
    tocSelector: '#toc-nav',
    contentSelector: '.prose',
    headingSelector: 'h1, h2, h3',
    hasInnerContainers: true,
  })
  visible.value = true

  await new Promise((resolve) => setTimeout(resolve, 333))
  if (!tocNav.value?.childNodes || tocNav.value?.childNodes.length === 0) {
    hasToc.value = false
  }
}

const toIndexPage = () => {
  useRouter().back()
}

// toc
const tocNav = ref()
const hasToc = ref(true)
const visible = ref(false)

readPost(id as string).then(loadToc)

useHead({
  title: postData.value?.spec.title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: postData.value?.spec.title
    }
  ]
})
</script>

<template>
  <div class="post-page">
    <nav v-if="postData" class="pl-[3px]">
      <header class="post-description">
        <h1>
          {{ postData.spec.title }}
        </h1>
        <h2 class="flex items-center gap-1 opacity-50 flex-wrap">
          <div class="text-[12px] gap-1 flex items-center">
            <Icon
              @click="toIndexPage"
              class="cursor-pointer hover:text-neutral-500 transition-all"
              name="typcn:arrow-back-outline"
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
            {{ formatDate(postData.spec.publishTime) }}
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
      <div class="sticky w-full top-[40px] left-0">
        <Transition name="fade">
          <div
            id="toc-nav"
            ref="tocNav"
            class="transition-all duration-[0.66s]"
            :class="
              visible
                ? 'opacity-[1] translate-x-[0px]'
                : 'opacity-0 translate-x-[15px]'
            "
          ></div>
        </Transition>
      </div>
      <Transition name="fade">
        <div v-if="!hasToc" class="text-neutral-300 text-[12px]">
          内容短 / 无 Toc 概要
        </div>
      </Transition>
    </nav>

    <div
      v-html="content"
      class="prose-code:text-[14px] prose-code:inline-flex prose-pre:leading-[20px] prose-code:opacity-85 prose-img:rounded-lg prose-img:drop-shadow-lg prose-img:max-h-[170px] prose-ul:text-[14px] prose-li:text-[14px] prose-p:text-[14px] prose-h1:text-[23px] prose-h2:text-[19px] prose-h3:text-[16px] prose max-w-full"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.post-page {
  @apply p-4 pb-48 max-w-[1000px] flex mx-auto gap-8;
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
body {
  scroll-behavior: smooth;
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
