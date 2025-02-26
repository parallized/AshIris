<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { computed } from '#imports'

const props = defineProps<{
  delay?: number
  duration?: number
}>()

// visible check
const elem = ref()
const visible = ref(false)
useIntersectionObserver(elem, ([entry]) => {
  visible.value = entry?.isIntersecting || false
})

// delay
const inDelay = ref(!!props.delay)
onMounted(() => {
  setTimeout(() => {
    inDelay.value = false
  }, props.delay)
})

const toggle = computed(() => {
  return visible.value && !inDelay.value
})
</script>

<template>
  <div ref="elem" :style="{transitionDuration: duration ? duration+'ms' : '1500ms'}"
       :class="toggle ? 'opacity-100 blur-0':'opacity-0 blur-[10px]'"
       class="shadin">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.shadin {
  @apply transition-all;
}
</style>