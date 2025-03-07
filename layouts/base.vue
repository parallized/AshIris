<script setup lang="ts">
</script>

<template>
  <div class="layout-base relative">
    <ComMouseBloom />
    <ComHeader />
    <main>
      <slot />
    </main>
    <ComFooter />
  </div>
</template>

<style lang="scss" scoped>
.layout-base {
  @apply min-h-[100vh];
  @apply flex flex-col;
}
</style>
