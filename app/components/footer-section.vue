<script setup lang="ts">
import { onMounted, ref } from "vue";

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp();
const container = ref<HTMLElement | null>(null);

const navLinks = [
  { name: "Home", to: "/#home" },
  { name: "Works", to: "/#works" },
  { name: "About", to: "/#about" },
  { name: "Contact", to: "/#contact" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/parallized" },
  { name: "Email", href: "mailto:parallized@foxmail.com" },
];

const handleNavClick = (to: string) => {
  const { $lenis } = useNuxtApp();
  if (to.startsWith("/#") && $lenis) {
    const targetId = to.split("#")[1];
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        $lenis.scrollTo(targetElement, {
          offset: 0,
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
  }
};

onMounted(() => {
  if (!gsap || !ScrollTrigger || !container.value) return;

  const q = gsap.utils.selector(container.value);

  // 优雅揭示动画
  gsap.from(q(".reveal-item"), {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: container.value,
      start: "top 85%",
    },
  });

  // 装饰线动画
  gsap.from(q(".footer-line"), {
    scaleX: 0,
    transformOrigin: "left center",
    duration: 1.5,
    ease: "expo.inOut",
    scrollTrigger: {
      trigger: container.value,
      start: "top 85%",
    },
  });
});
</script>

<template>
  <footer
    ref="container"
    class="w-full bg-[#1A1614] pt-24 pb-12 overflow-hidden relative border-t border-[#D9D1C7]/5"
  >
    <!-- 背景大文字装饰 -->
    <div
      class="absolute bottom-0 left-0 w-full pointer-events-none select-none overflow-hidden translate-y-1/4"
    >
      <span
        class="text-[25vw] font-black uppercase tracking-tighter text-[#D9D1C7]/2 leading-none whitespace-nowrap"
      >
        ESSENCE
      </span>
    </div>

    <div class="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
      <!-- 顶部装饰线 -->
      <div class="footer-line w-full h-[0.5px] bg-[#D9D1C7]/10 mb-16"></div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        <!-- 品牌区 -->
        <div class="md:col-span-5 flex flex-col justify-between reveal-item">
          <div>
            <h2
              class="text-3xl md:text-4xl font-black tracking-tighter mb-4 italic"
            >
              GREATER BREAD<span class="text-[#A68B6D]">.</span>
            </h2>
            <p
              class="text-[#D9D1C7]/40 text-sm max-w-sm leading-relaxed font-light uppercase tracking-widest"
            >
              Architecting digital experiences with precision and poetic
              minimalist.
            </p>
          </div>
          <div class="mt-12 hidden md:block">
            <div
              class="text-[#D9D1C7]/20 text-[12px] uppercase tracking-[0.5em] font-black"
            >
              Designed in Zhejiang, China
            </div>
          </div>
        </div>

        <!-- 导航区 -->
        <div class="md:col-span-3 reveal-item">
          <h3
            class="text-[#A68B6D] text-[12px] font-black uppercase tracking-[0.4em] mb-8"
          >
            Navigation
          </h3>
          <ul class="flex flex-col gap-4">
            <li v-for="link in navLinks" :key="link.name">
              <NuxtLink
                :to="link.to"
                @click.prevent="handleNavClick(link.to)"
                class="text-[#D9D1C7]/60 hover:text-white text-sm uppercase tracking-widest transition-colors duration-300 flex items-center group"
              >
                <span
                  class="w-0 group-hover:w-4 h-[0.5px] bg-[#A68B6D] transition-all duration-300 mr-0 group-hover:mr-2"
                ></span>
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 联系/信息区 -->
        <div class="md:col-span-4 reveal-item">
          <h3
            class="text-[#A68B6D] text-[12px] font-black uppercase tracking-[0.4em] mb-8"
          >
            Connection
          </h3>
          <ul class="flex flex-col gap-4 mb-12">
            <li v-for="link in socialLinks" :key="link.name">
              <a
                :href="link.href"
                target="_blank"
                class="text-[#D9D1C7]/60 hover:text-white text-sm uppercase tracking-widest transition-colors duration-300 flex items-center group"
              >
                <span
                  class="w-0 group-hover:w-4 h-[0.5px] bg-[#A68B6D] transition-all duration-300 mr-0 group-hover:mr-2"
                ></span>
                {{ link.name }}
              </a>
            </li>
          </ul>

          <div class="space-y-4">
            <div class="group cursor-default">
              <div
                class="text-[#D9D1C7]/20 text-[12px] uppercase tracking-[0.2em] mb-1"
              >
                Filing
              </div>
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                class="text-[#D9D1C7]/80 tracking-[0.15em] hover:text-[#A68B6D] text-[13px] transition-colors duration-300"
              >
                浙ICP备2024103738号-4
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部版权区 -->
      <div
        class="mt-24 pt-8 border-t border-[#D9D1C7]/5 flex flex-col md:flex-row justify-between items-center gap-6 reveal-item"
      >
        <div
          class="text-[#D9D1C7]/30 text-[12px] uppercase tracking-[0.2em] font-light"
        >
          © {{ new Date().getFullYear() }} GREATER BREAD ESSENCE. ALL RIGHTS
          RESERVED.
        </div>
        <div class="flex items-center gap-6">
          <div class="text-[#D9D1C7]/20 text-[12px] uppercase tracking-[0.2em]">
            Built with Nuxt 4
          </div>
          <div class="w-1 h-1 rounded-full bg-[#A68B6D]/30"></div>
          <div class="text-[#D9D1C7]/20 text-[12px] uppercase tracking-[0.2em]">
            Crafted by AshIris
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  // 确保背景文字不会产生滚动条
  overflow: hidden;
}

// 针对移动端优化
@media (max-width: 768px) {
  .text-\[25vw\] {
    font-size: 30vw;
  }
}
</style>
