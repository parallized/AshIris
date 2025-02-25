<script setup lang="ts">
import { useLenis, VueLenis } from 'lenis/vue'

useLenis(({ scroll }) => {
  console.log(scroll)
})
</script>

<template>
  <VueLenis root class="layout-base relative">
    <ComMouseBloom />
    <ComHeader />
    <main>
      <slot />
    </main>
    <ComFooter />
  </VueLenis>
</template>

<style lang="scss" scoped>
.layout-base {
  @apply min-h-[100vh] min-w-[900px];
  @apply flex flex-col;
}
</style>
