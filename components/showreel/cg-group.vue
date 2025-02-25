<script setup lang="ts"></script>

<template>
  <div class="flex pt-4 gap-4">
    <div class="item">
      <img src="~/assets/image/map.png" />
      <div class="badge">
        <div class="border-b-2 border-green-400/75">Leaflet</div>
        <div class="border-b-2 border-[#00D1F7]/75">React</div>
        <div class="border-b-2 border-[#FFB13B]/75">SVG</div>
      </div>
      <h1>· 实时热力图</h1>
      <h2>geo 数据绘制生成 svg, 根据 heat 值渐进颜色大小</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  @apply max-w-[260px] min-w-[220px] flex-1 relative text-white rounded-lg flex flex-col gap-1;

  .badge {
    @apply absolute right-2 top-2 bg-neutral-950/40 rounded-md h-[30px] backdrop-blur-[1px];

    @apply text-[12px] leading-[14px] flex items-center gap-[9px] px-[9px];
  }

  h1 {
    @apply text-[15px] pl-1 pt-5;
  }

  h2 {
    @apply text-[13px] pl-[14px] opacity-65;
  }

  img {
    @apply w-full aspect-video object-cover rounded-[6px] overflow-hidden transition-all;

    box-shadow: rgba(88, 88, 88, 0.7) 8px 8px 0;

    &:hover {
      box-shadow: none;
    }
  }
}
</style>
