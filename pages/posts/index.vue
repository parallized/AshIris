<script setup lang="ts">
definePageMeta({
  layout: 'base',
})
</script>

<template>
  <div class="content">
    <img
      class="absolute right-[0px] top-[30px] w-[330px] opacity-30 grayscale"
      src="~/assets/image/flower-2.png"
    />

    <PostList />
  </div>
</template>

<style lang="scss" scoped>
.content {
  @apply max-w-[1000px] mx-auto w-[100%] relative;
}
</style>
