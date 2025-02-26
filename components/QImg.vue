<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

defineProps<{
  src: string
}>()

const elem = ref()
const visible = ref(false)
useIntersectionObserver(elem, ([entry]) => {
  if (!visible.value) {
    visible.value = entry?.isIntersecting || false
  }
})
</script>

<template>
  <img v-if="visible" :src="`https://cdn.parallized.cn/`+src" />
  <div v-else ref="elem" class="absolute w-[1px] h-[1px] top-0 left-0">
  </div>
</template>

<style scoped lang="scss">
</style>