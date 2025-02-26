<script setup lang="ts">
defineProps<{
  src: string
}>()
</script>

<template>
  <img :src="`https://cdn.parallized.cn/`+src" />
</template>

<style scoped lang="scss">
</style>