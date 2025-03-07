<script setup lang="ts"></script>

<template>
  <div class="hybrid-group">
    <div class="item">
      <div class="left-desc">
        <h1 class="from-white to-orange-500">
          <Icon class="h-icon" name="entypo:sound" />
          Bobber
        </h1>

        <h2>
          一个超酷的 Windows Endpoint API 监听软件, 由 C++ Dll 和 Electron
          构成, UI 完全自主设计
        </h2>
      </div>

      <QImg src="image/bobber.webp" />
    </div>

    <div class="item">
      <div class="left-desc">
        <h1 class="from-white to-purple-500">
          <Icon name="meteor-icons:wave" class="h-icon" />
          WaveSoundBus
        </h1>

        <h2>
          和上一个同样酷的 C# WPF 音频流读取工具, 读取 .wav 并绘制输出频方曲线,
          CS61B 的作业
        </h2>
      </div>

      <QImg src="image/wavesound.webp" />
    </div>

    <div class="item">
      <div class="left-desc">
        <h1 class="from-white to-red-500">
          <Icon class="h-icon" name="mingcute:pin-line" />
          PinTranslator
        </h1>

        <h2>
          极简的 Tauri Sticky 桌面翻译软件,
          帮助你在任意时刻找到译文, Portable 版本仅占用 8.3MB 大小
        </h2>
      </div>

      <QImg src="image/pint.gif" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.hybrid-group {
  @apply flex flex-col h-full pt-12 gap-8;

  .item {
    @apply flex flex-1 justify-between gap-4;

    .left-desc {
      @apply flex flex-col w-1/2;

      h1 {
        @apply font-bold flex text-[10px] xl:text-lg items-center gap-1 xl:gap-2 bg-gradient-to-r text-transparent bg-clip-text;
      }

      h2 {
        @apply text-[9px] xl:text-[12px] opacity-40;
      }
    }

    img {
      @apply w-1/2 rounded-lg h-[120px] aspect-video object-cover brightness-90;
    }
  }
}

.h-icon {
  @apply text-white text-[14px] xl:text-xl;
}
</style>
