<script setup lang="ts">
import { useHalo } from '~/utils/halo'
import { definePageMeta, useHead, useRoute } from '#imports'
import { ref } from 'vue'
import Aside from '~/components/post-page/aside.vue'
import { publicApiClient } from '@halo-dev/api-client'

definePageMeta({
  layout: 'base',
})

const { coreApi } = useHalo()
const route = useRoute()
const id = route.params.id

const postData = ref()
const content = ref<string | null>()
const testingContent = ref<any | null>()

const readPost = async (id: string) => {
  const post = await coreApi.content.post.getPost({ name: id })
  postData.value = post.data
  console.log(post.data)

  const snapId = post.data.spec.releaseSnapshot
  const baseSnapId = post.data.spec.baseSnapshot
  if (!snapId || !baseSnapId) return
  const snap = (await coreApi.content.snapshot.getSnapshot({ name: snapId }))
    .data
  let patch = snap.spec.rawPatch
  if (patch == '[]') {
    const baseSnap = (await coreApi.content.snapshot.getSnapshot({ name: baseSnapId }))
    .data
    patch = baseSnap.spec.rawPatch
  }
  if (!patch) return

  if (patch[0] == '[') {
    if (!JSON.parse(patch)?.[0]?.target) {
      return
    }
    content.value = JSON.parse(patch)[0].target.lines.join('\n')
  } else {
    content.value = patch
  }
}

// generate
await readPost(id as string)
useHead({
  title: postData.value?.spec?.title,
  meta: [
    {
      name: 'description',
      content: postData.value?.spec?.title,
    },
  ],
})

// nav back
const navBack = () => {
  window.history.back()
}
</script>

<template>
  <div class="post-page">
    <Suspense>
      <Aside
        v-if="content"
        :title="postData?.spec?.title"
        :publish-time="postData?.spec?.publishTime"
      ></Aside>
    </Suspense>

    <div
      v-if="content"
      class="page-content post-content__unique"
      v-html="content"
    />
    <div v-else class="page-is-empty">
      <Icon
        class="w-[70px] h-[70px] opacity-50 mb-3"
        name="game-icons:box-trap"
      />
      <div class="text-[14px] flex flex-col gap-3">
        <p>这里看起来什么都没有, 可能</p>
        <ul class="opacity-75">
          <li>· 文章还在编辑中</li>
          <li>· 文章隐藏或未公开</li>
        </ul>
      </div>
      <button class="mt-4 text-[14px] text-orange-700/75" @click="navBack">
        回到上一个页面
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-page {
  @apply flex max-xl:flex-col;
  @apply pt-[105px] max-xl:pt-[24px] pb-[40vh] min-h-[100vh] max-w-[1340px] mx-auto gap-4 xl:gap-6 px-6;
}

.page-content {
  @apply xl:mt-[-95px];
  @apply prose-code:text-[10px] prose-code:xl:text-[14px] prose-code:inline-flex prose-code:opacity-85 prose max-w-full;
  @apply prose-pre:leading-[20px];
  @apply prose-img:rounded-lg prose-img:drop-shadow-lg;
  @apply prose-li:text-[10px] prose-li:xl:text-[14px];
  @apply prose-ul:text-[10px] prose-ul:xl:text-[14px];
  @apply prose-p:text-[10px] prose-p:xl:text-[14px];
  @apply prose-h1:text-[18px] prose-h1:xl:text-[23px] prose-h1:pt-[16px];
  @apply prose-h2:text-[16px] prose-h2:xl:text-[19px];
  @apply prose-h3:text-[14px] prose-h3:xl:text-[16px];
}

.page-is-empty {
  @apply w-full;
  @apply flex flex-col items-center justify-center;
}
</style>

<style>
*:target {
  &::after {
    content: '';
    display: block;
    height: 20px;
    width: 80%;
    margin-top: -20px;

    background-color: rgba(155, 155, 155, 0.29);
  }
}
</style>
