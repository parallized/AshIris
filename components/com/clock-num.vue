<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps<{
  num: number
  duration: number
  fixed?: number
  suffix?: boolean
}>()

const showNum = ref(0)

const elem = ref()
const trigged = ref(false)
useIntersectionObserver(elem, async ([entry]) => {
  if (trigged.value) return

  if (entry?.isIntersecting) {
    trigged.value = true
    await new Promise<void>((resolve) => setTimeout(resolve, 500))
    const handle = setInterval(() => {
      if (showNum.value + props.num / (props.duration / 0.01) > props.num) {
        showNum.value = props.num
        clearInterval(handle)
      } else {
        showNum.value += props.num / (props.duration / 0.01)
      }
    }, 10)
  }
})

</script>

<template>
  <span ref="elem">
    {{ suffix ? showNum.toFixed(fixed ? fixed : 0) + '+' : showNum.toFixed(fixed ? fixed : 0) }}
  </span>
</template>

<style scoped lang="scss">

</style>