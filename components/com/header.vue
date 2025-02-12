<script setup lang="ts"></script>

<template>
  <div class="header">
    <div class="header__logo">
      <NuxtLink to="/" class="logo">
        <Icon
          class="text-[25px]"
          name="arcticons:minecraft-education-preview"
        />
        花远明的小世界
      </NuxtLink>
    </div>
    <div class="header__nav">
      <NuxtLink to="/">主页<span class="opacity-50"> · 花</span></NuxtLink>
      <NuxtLink to="/posts/"
        >笔记<span class="opacity-50"> · 远 </span></NuxtLink
      >
      <NuxtLink class="disable-use" to="/posts/">
        <Icon name="famicons:construct-outline" class="opacity-50" />
        作品集<span class="opacity-50"> · 明</span></NuxtLink
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  @apply max-w-[1012px] w-[100%] mx-auto;

  @apply flex justify-between items-center;
  @apply pt-8 px-6 pb-8;

  &__logo {
    @apply text-xl flex items-center gap-2 tracking-[3px];
  }

  &__nav {
    @apply flex gap-10 text-sm;

    a {
      @apply transition-all box-border flex items-center gap-1;

      * {
        @apply transition-all duration-300;
      }

      &:hover {
        * {
          @apply opacity-100;
        }
      }
    }
  }
}

.disable-use {
  @apply pointer-events-none opacity-[35%] grayscale;
}

.logo {
  @apply text-[19px] font-extralight inline-flex gap-2 items-center text-neutral-900;
}
</style>
