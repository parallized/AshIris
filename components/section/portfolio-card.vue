<script setup lang="ts"></script>

<template>
  <div class="card">
    <slot name="image"/>

    <div class="card-body">
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  @apply relative w-full min-h-[420px] bg-white rounded-xl overflow-hidden;

  &-body {
    @apply overflow-x-auto p-8 absolute text-[18px] flex flex-col h-full;
  }
}
</style>
