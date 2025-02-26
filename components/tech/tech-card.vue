<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="card">
    <div
      class="border border-r-0 border-neutral-300/55 rounded-[3px] bg-transparent"
    />
    <Icon class="icon" :name="name"/>
  </div>
</template>

<style scoped lang="scss">
.card {
  @apply size-[40px] ml-[1px] mb-[1px] flex items-center justify-start rounded-[3px];

  .icon {
    @apply text-[24px] opacity-75;
  }
}
</style>
