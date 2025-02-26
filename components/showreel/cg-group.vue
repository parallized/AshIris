<script setup lang="ts"></script>

<template>
  <div class="flex flex-wrap pt-12 gap-12">
    <div class="item">
      <QImg src="image/pixellens.webp" />
      <div class="badge">
        <div class="border-b-2 border-[#FF4F4F]/75">Tresjs</div>
        <div class="border-b-2 border-[#08D47F]/75">Nuxt</div>
        <div class="border-b-2 border-[#EA7600]/75">Blender</div>
      </div>
      <h1>· 像素档案馆</h1>
      <h2>Tresjs 3D 全息模型馆, 多种环境展示, 自动材质流水线</h2>
    </div>

    <div class="item">
      <QImg src="image/map.webp" />
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
  @apply max-w-[280px] min-w-[220px] flex-1 relative text-white rounded-lg flex flex-col items-start gap-1;

  .badge {
    @apply absolute right-2 top-2 bg-neutral-950/40 rounded-md h-[30px] backdrop-blur-[1px];

    @apply text-[12px] leading-[14px] flex items-center gap-[9px] px-[9px];
  }

  h1 {
    @apply text-[16px] tracking-wider pl-1 pt-5;
    @apply bg-gradient-to-r from-neutral-600 via-neutral-50 to-neutral-600 text-transparent bg-clip-text;
  }

  h2 {
    @apply text-[13px] tracking-wider pl-[14px] opacity-40;
  }

  img {
    @apply w-full brightness-[85%] aspect-video border border-neutral-200/40 object-cover rounded-[6px] overflow-hidden transition-all;

    box-shadow: rgba(88, 88, 88, 0.5) 6px 6px 0;

    &:hover {
      box-shadow: none;
    }
  }
}
</style>
