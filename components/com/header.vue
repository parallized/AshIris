<script setup lang="ts">
import { useThemeStore, HeaderColorMode } from '~/store/theme'
import { computed, storeToRefs } from '#imports'
import { useWindowSize } from '@vueuse/core'

const theme = useThemeStore()

const { headerColorMode, headerCollapsed } = storeToRefs(theme)

const themeClass = computed(() => {
  if (headerColorMode.value == HeaderColorMode.DARK) {
    return 'text-white bg-black/75'
  } else {
    return 'text-black bg-neutral-100/90'
  }
})

const { width } = useWindowSize()
const leftOffset = computed(() => {
  if (width.value >= 1340) {
    return ((width.value - 1340) / 2) + 'px'
  } else {
    return 0
  }
})
</script>

<template>
  <div :class="[headerCollapsed ? 'header__wrapper-collapsed':'header__wrapper', themeClass].join(' ')">
    <div :class="headerCollapsed ? 'header-collapse':'header'" @click="headerCollapsed = !headerCollapsed">
      <div class="header__logo ">
        <NuxtLink to="/" class="logo">
          <Icon
            class="text-[18px] xl:text-[25px]"
            name="arcticons:minecraft-education-preview"
          />
          花远明的小世界
        </NuxtLink>
      </div>
      <div class="header__nav">
        <NuxtLink to="/">主页<span v-if="!headerCollapsed" class="opacity-50 max-xl:hidden"> · 花</span></NuxtLink>
        <NuxtLink to="/posts"
        >笔记<span v-if="!headerCollapsed" class="opacity-50 max-xl:hidden"> · 远 </span></NuxtLink
        >
        <NuxtLink class="disable-use" to="/posts">
          <Icon name="famicons:construct-outline" class="opacity-50" />
          作品集<span v-if="!headerCollapsed" class="opacity-50 max-xl:hidden"> · 明</span></NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header__wrapper {
  @apply fixed transition-all top-0 w-full border-b border-gray-300/10 z-[9999] backdrop-blur-[5px];
}

.header__wrapper-collapsed {
  @apply fixed left-0 right-0 z-[9999];
}

@media (min-width: 1280px) {
  .header-collapse {
    left: v-bind(leftOffset);
  }
}

.header-collapse {
  @apply xl:w-[240px] mx-auto absolute px-4 py-3 mt-[12px] z-[9999] bg-neutral-300/15 backdrop-blur-sm rounded-lg border-neutral-500/15 border;
  @apply flex flex-col items-start gap-2 max-xl:right-4;

  .header__logo {
    @apply text-[10px] xl:text-xl flex items-center gap-2 tracking-[3px];

    .logo {
      @apply text-[12px] xl:text-[16px] font-extralight inline-flex gap-2 items-center;
    }
  }

  .header__nav {
    @apply flex gap-4 text-[10px] xl:text-[12px];
  }
}

.header {
  @apply max-w-[1340px] mx-auto;

  @apply flex justify-between items-center;
  @apply py-5 px-4 xl:py-6 xl:px-6;

  &__logo {
    @apply text-[10px] xl:text-xl flex items-center gap-2 tracking-[3px];
  }

  .logo {
    @apply text-[12px] xl:text-[19px] font-extralight inline-flex gap-2 items-center;
  }

  &__nav {
    @apply flex gap-6 xl:gap-10 text-[11px] xl:text-sm;

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


</style>
