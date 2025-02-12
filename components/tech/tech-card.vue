<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="card-wrapper group">
    <div class="card">
      <div
        class="inset-0 absolute border border-r-0 border-neutral-300/55 group-hover:border-r-[1px] rounded-[3px] bg-transparent"
      ></div>
      <Icon class="icon" :name="name"></Icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-wrapper {
  @apply relative w-[16px] h-[38px] hover:w-[44px] transition-all duration-[220ms] hover:scale-125;
}

.card {
  @apply absolute top-0 left-0 size-[34px] group-hover:top-[-5px] group-hover:left-[5px] group-hover:size-[44px] group-hover:transform-none transition-all duration-[220ms] flex items-center justify-center rounded-[3px] backdrop-blur-[1px];

  transform: rotateX(-25deg) rotateY(38deg);

  .icon {
    @apply text-[20px] opacity-75;
  }
}
</style>
