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
          class="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.15]"
        >
          别来无恙 ~<br />我是 parallized.
        </h1>
        <div class="flex items-center gap-4">
          <div class="h-[0.5px] w-12 bg-[#D9D1C7]/30"></div>
          <p
            class="text-[10px] md:text-[14px] font-black tracking-[0.4em] text-[#A68B6D] uppercase"
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
              class="text-sm leading-loose tracking-widest uppercase border-t border-[#D9D1C7]/10 pt-6"
            >
              Greater Bread Essence.
              <br />
              思考，行动与分享构成了生活中不可或缺的动量，也是表达自我的方式。永远做一个初学者，永远保持好奇心。
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
