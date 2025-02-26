<script setup lang="ts">
import { HeaderColorMode, useThemeStore } from '~/store/theme'
import { definePageMeta, storeToRefs } from '#imports'

definePageMeta({
  layout: 'base',
})

const theme = useThemeStore()
const { headerColorMode } = storeToRefs(theme)

headerColorMode.value = HeaderColorMode.LIGHT
</script>

<template>
  <div class="content">
    <PostList />
  </div>
</template>

<style lang="scss" scoped>
.content {
  @apply max-w-[1340px] mx-auto w-[100%] relative;
}
</style>
