<script setup lang="ts">
import {
  useEventListener,
  useMouse,
  useDebounceFn,
  usePageLeave,
} from '@vueuse/core'

const { x, y } = useMouse()

const SIZE = 5

const isLeft = usePageLeave()
const enable = ref(true)

const enableBloom = useDebounceFn(() => {
  enable.value = true
}, 300)

const handleScroll = () => {
  enable.value = false
  enableBloom()
}

useEventListener('scroll', handleScroll)
</script>

<template>
  <div class="overflow-hidden inset-0 absolute pointer-events-none">
    <div
      :class="enable && !isLeft ? 'opacity-70' : 'opacity-0'"
      class="bg-gradient-to-r transition-opacity duration-300 absolute rounded-full blur-[15px] dark:blur-[11px] from-purple-900 to-blue-900 dark:from-white dark:to-white"
      :style="{
        left: x - SIZE * 0.1 + 'px',
        top: y + SIZE * 0.85 + 'px',
        width: SIZE * 2 + 'px',
        height: SIZE * 2 + 'px',
      }"
    />
  </div>
</template>

<style lang="scss" scoped></style>
