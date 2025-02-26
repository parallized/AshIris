<script setup lang="ts">
import type { ShowTopic } from '~/types/global'

defineProps<{
  data: ShowTopic
}>()
</script>

<template>
  <div class="card">
    <h1 class="title">{{ data.title }}</h1>
    <h2 v-if="data.desc" class="desc">{{ data.desc }}</h2>

    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  @apply shadow-md bg-neutral-950 border border-neutral-500/25 rounded-lg;
  @apply p-[26px] flex flex-col gap-3 z-[1] relative overflow-hidden;
  // text alignment

  .title {
    @apply text-[19px] tracking-wider;
  }

  .desc {
    @apply text-[14px] tracking-wider opacity-55 max-w-[70%];
  }
}
</style>
