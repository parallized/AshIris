<script setup lang="ts">
import Shadin from '~/components/com/shadin.vue'
</script>

<template>
  <section class="contact bg-noise">
    <Shadin :duration="800">
      <h1 class="text-xl xl:text-3xl tracking-wider">获取联络</h1>
    </Shadin>
    <Shadin :duration="800" :delay="800">
      <h2 class="opacity-60 text-center leading-[22px] xl:leading-[34px]">
        经常往 GitHub 上面放乱七八糟的代码，偶尔在 B 站发水视频记录一下<br>
        欢迎交流学习，如果有可以提供帮助的地方同样乐意效劳
      </h2>
    </Shadin>


    <div class="flex gap-3">
      <NuxtLink to="https://github.com/parallized" target="_blank" class="href">
        <Icon name="hugeicons:github" />
        parallized
      </NuxtLink>

      <NuxtLink
        to="https://space.bilibili.com/3546851334687241"
        target="_blank"
        class="href"
      >
        <Icon name="mingcute:bilibili-line" />
        parallized
      </NuxtLink>

      <div class="href">
        <Icon name="material-symbols-light:mail-outline" />
        parallized@outlook.com
      </div>
    </div>

    <QImg src="image/ide.webp" class="xl:w-[45%] w-[85%] z-[1] mt-8" />
  </section>
</template>

<style scoped lang="scss">
.contact {
  @apply pt-[20vh] pb-24 flex flex-col justify-center items-center w-full gap-3 xl:gap-5;
  @apply max-xl:text-[11px];
}

.href {
  @apply z-[1] bg-white/65 flex items-center text-neutral-600 justify-center gap-2 text-[9px] xl:text-[13px] px-2 py-1 border-neutral-300 border rounded-lg;
}
</style>
