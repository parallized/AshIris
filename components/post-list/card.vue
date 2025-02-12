<script setup lang="ts">
import type { Post } from '~/types/halo-struct'

const props = defineProps<{
  post: Post
}>()

const loading = ref(true)
const imgLoading = ref(true)

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 12))
  loading.value = false
})
</script>

<template>
  <NuxtLink
    v-if="post && !loading"
    class="post-card"
    :href="`/posts/${post.spec.slug}`"
  >
<!--    <div class="post-card__cover">-->
<!--      <NuxtImg-->
<!--        v-if="post.spec"-->
<!--        :src="dirAssetsSrc(post.cover)"-->
<!--        :class="imgLoading ? `outrect-loading` : ''"-->
<!--        alt="post image"-->
<!--        loading="lazy"-->
<!--        @load="imgLoading = false"-->
<!--      />-->
<!--      <div v-if="imgLoading" class="text-sm opacity-70 flex items-center gap-1">-->
<!--        <Icon name="eos-icons:loading" />Loading...-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="post-card__tag" :style="{ background: getTagColor(post.tag) }">-->
<!--      <span v-for="t in post.tag">{{ t }}</span>-->
<!--    </div>-->
    <div class="post-card__desc">
      <h2>{{ post.spec.title }}</h2>
      <h3 class="items-center">
<!--        <bold class="opacity-60 ml-auto text-[11px]">{{-->
<!--          formatRelativeTime(post.date_updated)-->
<!--        }}</bold>-->
      </h3>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.post-card {
  @apply flex flex-col relative cursor-pointer;

  &:hover {
    .post-card__tag {
      @apply rounded-md top-1 shadow-lg;
    }

    .post-card__desc {
      @apply text-purple-900;
    }
  }

  &__cover {
    @apply relative flex justify-center items-center overflow-hidden;
    @apply brightness-95 rounded-t-lg border-b border-opacity-20;
    @apply border-gray-300;
    @apply h-[150px] md:h-[130px] bg-gradient-to-tr from-blue-100 to-purple-200;
  }

  &__tag {
    @apply absolute right-4 top-0;
    @apply px-[10px] py-[4px] bg-blue-500 text-white;
    @apply rounded-b-md;
    @apply text-xs;
    @apply transition-all duration-150;
  }

  &__desc {
    @apply pt-3 pb-4 px-5 flex flex-col flex-1 gap-2 rounded-b-lg;
    @apply bg-white;

    h2 {
      @apply text-lg font-bold;
      @apply line-clamp-1 !duration-150;
    }

    h3 {
      @apply text-xs text-gray-500 !duration-150;
    }
  }

  img {
    @apply w-full h-full max-w-full object-cover;
  }
}

.outrect-loading {
  @apply absolute z-[-100] opacity-0;
}

.fade-in-enter-active,
.fade-in-leave-active {
  @apply transition-all duration-500;
  opacity: 1;
}

.fade-in-enter-from,
.fade-in-leave-to {
  @apply transition-all duration-500;
  opacity: 0;
  transform: translateY(70px);
}
</style>
