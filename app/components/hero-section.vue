<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps<{
  letter: string;
  word: string;
  tagline?: string;
}>();

const container = ref<HTMLElement | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-animate", "true");
        }
      });
    },
    { threshold: 0.1 }
  );

  container.value?.querySelectorAll(".reveal-pure").forEach((el) => {
    observer.observe(el);
  });
});
</script>

<template>
  <div
    ref="container"
    class="w-full min-h-screen bg-[#1A1614] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden relative"
  >
    <!-- 背景大图：使用本地建筑图片 -->
    <div class="absolute inset-0 z-0">
      <img
        src="~/assets/image/background.webp"
        alt="Architectural Context"
        class="w-full h-full object-cover opacity-50 grayscale-[0.3] brightness-[0.6]"
      />
      <!-- 暗色建筑质感覆盖层 -->
      <div
        class="absolute inset-0 bg-linear-to-b from-transparent via-[#1A1614]/40 to-[#1A1614]"
      ></div>
    </div>

    <div
      class="max-w-[1600px] w-full h-full flex flex-col justify-between relative z-10 py-12 md:py-24 px-4 md:px-12"
    >
      <!-- 左上角 -->
      <div
        class="reveal-pure opacity-0 -translate-x-10 transition-all duration-1000 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-x-0 space-y-4 text-[#D9D1C7]"
      >
        <h1
          class="text-6xl md:text-[6vw] font-black tracking-tighter leading-[0.85]"
        >
          Hey there,<br />I'm parallized.
        </h1>
        <div class="flex items-center gap-4">
          <div class="h-[0.5px] w-12 bg-[#D9D1C7]/30"></div>
          <p
            class="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#A68B6D] uppercase"
          >
            Digital Artisan & Pixel Craftsman
          </p>
        </div>
      </div>

      <!-- 右下角：恢复原本文案 -->
      <div class="flex justify-end mt-40 md:mt-0">
        <div
          class="reveal-pure opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-y-0 max-w-md space-y-10 text-right md:text-left text-[#D9D1C7]"
        >
          <p
            class="text-xl md:text-2xl leading-relaxed font-serif italic font-light"
          >
            {{ tagline }}
          </p>
          <div class="hero-description space-y-6 opacity-60">
            <p
              class="text-sm leading-[2] tracking-widest uppercase border-t border-[#D9D1C7]/10 pt-6"
            >
              Greater Bread Essence.
              在光影与秩序中徘徊的数字工匠。擅长捕捉那一抹转瞬即逝的创意灵光，并将其固化为永恒的像素。
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部水印 -->
    <div
      class="absolute bottom-10 left-10 md:left-24 text-[18vw] font-black tracking-tighter text-[#D9D1C7] opacity-[0.05] select-none pointer-events-none"
    >
      {{ letter }}
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Italiana";
  src: url("https://fonts.gstatic.com/s/italiana/v13/T3bmfeb03H_DkXv_p54u-A.woff2")
    format("woff2");
}

.font-serif {
  font-family: "Italiana", serif;
}
</style>
