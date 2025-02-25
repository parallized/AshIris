<script setup lang="ts">
import { useThemeStore, HeaderColorMode } from '~/store/theme'

const theme = useThemeStore()

const { headerColorMode } = storeToRefs(theme)

const themeClass = computed(()=>{
  if (headerColorMode.value == HeaderColorMode.DARK) {
    return "text-white bg-black/75"
  } else {
    return "text-black bg-neutral-100/90"
  }
})
</script>

<template>
  <div class="header__wrapper" :class="themeClass">
    <div class="header">
      <div class="header__logo ">
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
  </div>
</template>

<style lang="scss" scoped>
.header__wrapper {
  @apply fixed transition-all top-0 w-full border-b border-gray-300/10 z-[9999] backdrop-blur-[5px];
}

.header {
  @apply max-w-[1340px] mx-auto;

  @apply flex justify-between items-center;
  @apply pt-6 pb-6;

  &__logo {
    @apply text-xl flex items-center gap-2 tracking-[3px];
  }

  &__nav {
    @apply flex gap-10 text-sm;

    a {
      @apply box-border flex items-center gap-1;

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
  @apply text-[19px] font-extralight inline-flex gap-2 items-center;
}
</style>
