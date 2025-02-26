<script setup lang="ts">
</script>

<template>
  <div class="flex flex-wrap pt-12 pb-4 gap-[40px]">
    <div class="item">
      <div class="mockup">
        <div class="title">
          <div v-for="_ in [1, 2, 3]" class="c"/>
          <Icon name="mingcute:left-line" />
          <Icon name="mingcute:right-line" />
          <h1>AshIris</h1>
        </div>
        <img src="~/assets/image/ashiris.png" >
      </div>
      <div class="desc">NuxtJS 构建的博客, CMS 为本地部署的 Halo</div>
    </div>

    <div class="item">
      <div class="mockup">
        <div class="title">
          <div v-for="_ in [1, 2, 3]" class="c"/>
          <Icon name="mingcute:left-line" />
          <Icon name="mingcute:right-line" />
          <h1>Almuni</h1>
        </div>
        <img src="~/assets/image/almuni.png" >
      </div>
      <div class="desc">Tauri + React + Vite 多端 Monorepo 实践</div>
    </div>

    <div class="item">
      <div class="mockup">
        <div class="title">
          <div v-for="_ in [1, 2, 3]" class="c"/>
          <Icon name="mingcute:left-line" />
          <Icon name="mingcute:right-line" />
          <h1>GametipJS</h1>
        </div>
        <img src="~/assets/image/gametips.gif" >
      </div>
      <div class="desc">一个优雅的在浏览器里模拟鼠标跟随提示的 JS 库</div>
    </div>

    <div class="item">
      <div class="mockup">
        <div class="title">
          <div v-for="_ in [1, 2, 3]" class="c"/>
          <Icon name="mingcute:left-line" />
          <Icon name="mingcute:right-line" />
          <h1>NodePacs</h1>
        </div>
        <img src="~/assets/image/pacs.png" >
      </div>
      <div class="desc">
        基于 dicom4j 的 node pacs 服务 Demo, 并在前端展示医疗数据
      </div>
    </div>

    <div class="item">
      <div class="mockup">
        <div class="title">
          <div v-for="_ in [1, 2, 3]" class="c"/>
          <Icon name="mingcute:left-line" />
          <Icon name="mingcute:right-line" />
          <h1>Kapi</h1>
        </div>
        <img src="~/assets/image/kapi.png" >
      </div>
      <div class="desc">
        基于 H2SQL + Ktor 的 BFF, 快速上手的文件数据库极简后端
      </div>
    </div>

    <div class="item">
      <div class="mockup">
        <div class="title">
          <div v-for="_ in [1, 2, 3]" class="c"/>
          <Icon name="mingcute:left-line" />
          <Icon name="mingcute:right-line" />
          <h1>Tampermonkey-PTA-paste</h1>
        </div>
        <img src="~/assets/image/tamper.png" >
      </div>
      <div class="desc">
        PTA 平台支持复制的油猴脚本, 答题时本地 IDE 调试更便利
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.title {
  @apply flex items-center gap-1 pl-2 w-full;
}

.item {
  @apply max-w-[280px] min-w-[220px] flex-1;
}

.desc {
  @apply text-end text-[12px] text-wrap pt-2 pr-1 opacity-40 tracking-wider ml-auto max-w-[75%];
}

.mockup {
  @apply rounded-t-[6px] bg-neutral-700 relative text-white rounded-lg flex flex-col items-start;

  h1 {
    @apply text-[10px] flex-1 tracking-wider mr-1 px-2 py-[1px] my-1 border-neutral-500/50 rounded-md bg-neutral-800 border;
  }

  img {
    @apply w-full aspect-video object-left-top brightness-75 object-cover rounded-b-[6px] overflow-hidden transition-all;
  }
}

.c {
  width: 09px;
  height: 9px;
  border-radius: 50%;
  box-shadow: inset 2px 2px 5px rgba(235, 235, 235, 0.356);
}

.c:first-child {
  background-color: red;
}

.c:nth-child(2) {
  background-color: rgb(204, 167, 4);
}

.c:nth-child(3) {
  background-color: green;
}
</style>
