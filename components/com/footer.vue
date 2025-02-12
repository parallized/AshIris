<script setup lang="ts"></script>

<template>
  <div class="footer">
    <ul class="column">
      <li>
        <NuxtLink href="https://beian.miit.gov.cn/" target="_blank">
          <Icon name="fluent:shield-task-28-regular" />
          备案 @ 浙ICP备2024103738号-4
        </NuxtLink>
      </li>
      <li class="divider"></li>
      <li>
        <NuxtLink href="https://beian.miit.gov.cn/" target="_blank">
          <Icon name="hugeicons:drawing-mode" />
          花远明 设计编码 & 部署
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
      <li class="divider"></li>
      <li>
        <NuxtLink to="https://halo.run">
          <Icon name="fluent:box-edit-20-regular" />
          易用的后台 / 内容管理 @ Halo.run
        </NuxtLink>
      </li>
      <li class="divider"></li>
      <li>
        <NuxtLink to="https://github.com/parallized">
          <Icon name="hugeicons:github" />
          博客开源在 <span class="text-orange-900/75">灰烬与鸢尾</span> Ash 'n'
          Iris @ GitHub
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  @apply mt-auto mb-12 text-xs text-center flex flex-col items-center gap-3;

  .column {
    @apply flex justify-center items-center gap-3 w-[100%] mx-auto max-w-[1200px];
  }

  .divider {
    @apply border border-neutral-500/25 h-[12px];
  }

  li > a {
    @apply flex items-center gap-1 opacity-50 hover:opacity-100 cursor-pointer transition-all duration-300;
  }
}
</style>
