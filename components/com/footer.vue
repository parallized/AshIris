<script setup lang="ts">
</script>

<template>
  <div class="footer-wrapper">
    <div class="footer">
      <ul class="column">
        <li>
          <NuxtLink href="https://beian.miit.gov.cn/" target="_blank">
            <Icon name="fluent:shield-task-28-regular" />
            备案 @ 浙ICP备2024103738号-4
          </NuxtLink>
        </li>
        <li class="divider" />
        <li>
          <NuxtLink href="https://beian.miit.gov.cn/" target="_blank">
            <Icon name="hugeicons:drawing-mode" />
            花明远 设计编码 & 部署
          </NuxtLink>
        </li>
      </ul>

      <ul class="column">
        <li>
          <NuxtLink to="https://nuxt.com/">
            <Icon name="devicon-plain:nuxtjs" />
            服务端渲染 @ Nuxt.js
          </NuxtLink>
        </li>
        <li class="divider" />
        <li>
          <NuxtLink to="https://halo.run">
            <Icon name="fluent:box-edit-20-regular" />
            易用的后台 / 内容管理 @ Halo.run
          </NuxtLink>
        </li>
        <li class="divider" />
        <li>
          <NuxtLink to="https://github.com/parallized">
            <Icon name="hugeicons:github" />
            博客开源在 <span class="text-orange-300/75">灰烬与鸢尾</span> Ash
            'n' Iris @ GitHub
          </NuxtLink>
        </li>
      </ul>

      <!--<Icon class="ender-icon" name="hugeicons:flower" />-->

      <div class="ender-word">
        Parallized · HanaMin
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-wrapper {
  @apply relative h-[130px] xl:h-[240px];
  clip-path: polygon(0% 0, 100% 0, 100% 100%, 0% 100%);
}

.footer {
  @apply fixed px-4 bottom-0 h-[130px] xl:h-[240px] w-full bg-neutral-800 text-white;
  @apply py-6 xl:py-12 text-[9px] xl:text-xs text-center flex flex-col items-center gap-3;

  .column {
    @apply flex flex-wrap items-center justify-center gap-1 xl:gap-6 w-[100%] mx-auto max-w-[1340px];
  }

  .divider {
    @apply border border-neutral-500/25 h-[12px];
  }

  li > a {
    @apply flex items-center text-[9px] xl:text-[14px] gap-1 xl:gap-2 cursor-pointer transition-all duration-300;
  }
}

.ender-word {
  @apply bg-gradient-to-r from-neutral-500/5 to-slate-300/10 leading-[58px] xl:leading-[120px] text-transparent bg-clip-text;
  @apply absolute font-bold flex justify-center bottom-[-18px] text-[30px] xl:text-[120px] w-full max-w-[1340px];
}

.ender-icon {
  @apply absolute w-full flex items-end max-w-[1340px] right-0 text-[23px] xl:text-[50px] text-white/75 top-[50px];
}
</style>
