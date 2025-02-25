<script setup lang="ts"></script>

<template>
  <div class="card">
    <slot name="image"></slot>

    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  @apply relative w-full min-h-[400px] bg-white rounded-xl overflow-hidden;

  &-body {
    @apply overflow-x-auto p-8 inline absolute text-xl;
  }
}
</style>
