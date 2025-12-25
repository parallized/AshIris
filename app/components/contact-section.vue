<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps<{
  email: string;
  github: string;
  blog: string;
}>();

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp();
const container = ref<HTMLElement | null>(null);
const magneticButton = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!gsap || !ScrollTrigger || !container.value) return;

  const q = gsap.utils.selector(container.value);

  // 磁性按钮
  if (magneticButton.value) {
    const btn = magneticButton.value;
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.6,
        ease: "power2.out",
      });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    });
  }

  // 优雅揭示
  gsap.from(q(".reveal-item"), {
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 2,
    ease: "expo.out",
    scrollTrigger: {
      trigger: q(".contact-content"),
      start: "top 85%",
    },
  });
});
</script>

<template>
  <section
    ref="container"
    class="w-full py-40 md:py-64 px-10 md:px-[12vw] bg-[#0A0A0A] text-[#E0E0E0] overflow-hidden relative"
  >
    <div
      class="absolute inset-0 z-0 opacity-[0.3] grayscale brightness-[1] pointer-events-none"
    >
      <img src="~/assets/image/hire.JPG" class="w-full h-full object-cover" />
    </div>

    <div
      class="absolute bottom-0 left-0 text-[15vw] font-black leading-none opacity-[0.015] select-none pointer-events-none tracking-tighter"
    >
      STAY IN TOUCH
    </div>

    <div class="max-w-[1400px] mx-auto relative z-10">
      <div class="contact-content space-y-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end">
          <div class="space-y-12 reveal-item">
            <span
              class="text-[9px] font-black uppercase tracking-[0.5em] text-[#707070]"
              >Contact Us</span
            >
            <h2
              class="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9] uppercase"
            >
              Let's build<br /><span class="font-black italic text-[#808080]"
                >Together</span
              >
            </h2>
          </div>

          <div class="space-y-10 max-w-sm reveal-item">
            <p
              class="text-sm md:text-base leading-relaxed opacity-60 font-serif italic"
            >
              我在求职 Houdini / 全栈 / 游戏 /
              互联网开发。让我们在光影与代码的交界处，共同构建一些富有温度的数字生命。
            </p>
            <div class="pt-6">
              <a
                ref="magneticButton"
                :href="'mailto:' + email"
                class="inline-block px-12 py-5 border-[0.5px] border-[#E0E0E0]/20 hover:bg-[#E0E0E0] hover:text-[#0A0A0A] transition-all duration-700 text-[10px] font-black uppercase tracking-[0.3em]"
              >
                Send an Inquiry
              </a>
            </div>
          </div>
        </div>

        <!-- 底部链接 -->
        <div
          class="pt-24 border-t-[0.5px] border-[#E0E0E0]/10 flex flex-col md:flex-row justify-between items-center gap-12 reveal-item"
        >
          <div class="flex gap-16">
            <a
              v-for="link in [
                { n: 'Github', u: github },
                { n: 'Blog', u: blog },
                { n: 'Mail', u: 'mailto:' + email },
              ]"
              :key="link.n"
              :href="link.u"
              target="_blank"
              class="text-[14px] font-black uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity"
            >
              {{ link.n }}
            </a>
          </div>
          <div
            class="text-[8px] font-black uppercase tracking-[0.4em] opacity-20"
          >
            © 2024-2026 Greater Bread Essence
          </div>
        </div>
      </div>
    </div>
  </section>
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
