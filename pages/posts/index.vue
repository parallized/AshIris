<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'base'
})
</script>

<template>
  <div class="content">
    <PostList />
  </div>
</template>

<style lang="scss" scoped>
.content {
  @apply max-w-[1340px] px-6 mx-auto w-[100%] relative;
}
</style>
