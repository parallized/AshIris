<script setup lang="ts">
const props = defineProps<{
  title?: string
  description?: string
  titleClass?: string
}>()
</script>

<template>
  <div class="hero">
    <h1 :class="titleClass">{{ title }}</h1>
    <h2 class="mt-4">
      <span class="text-sm opacity-85" v-html="description"></span>
    </h2>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  @apply pb-5 flex flex-col;

  h1 {
    @apply text-[40px] w-[40px];
  }

  .divider {
    @apply my-6;
    @apply border-b border-gray-400 border-opacity-40;
  }
}
</style>
