<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Project {
  title: string;
  description: string;
  url: string;
  date: string;
  category: string;
  tag: string;
  icon: string;
}

defineProps<{
  projects: Project[];
}>();

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp();
const container = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!gsap || !ScrollTrigger || !container.value) return;

  const q = gsap.utils.selector(container.value);

  // 1. 标题区揭示
  gsap.from(q(".reveal-title"), {
    y: 60,
    opacity: 0,
    duration: 1.5,
    ease: "expo.out",
    scrollTrigger: {
      trigger: q(".reveal-title"),
      start: "top 90%",
    },
  });

  // 2. 意象挂件揭示 (带有微妙的缩放)
  gsap.from(q(".reveal-image"), {
    y: 100,
    scale: 1.1,
    opacity: 0,
    duration: 2,
    delay: 0.2,
    ease: "expo.out",
    scrollTrigger: {
      trigger: q(".reveal-image"),
      start: "top 90%",
    },
  });

  // 3. 项目列表流式揭示
  gsap.from(q(".project-item"), {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: q(".project-list"),
      start: "top 85%",
    },
  });

  // 4. 装饰性文字视差
  gsap.to(q(".vertical-text"), {
    y: -30,
    ease: "none",
    scrollTrigger: {
      trigger: q(".reveal-image"),
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});
</script>

<template>
  <section
    ref="container"
    class="w-full py-32 md:py-64 px-10 md:px-[12vw] bg-[#0F110D] text-[#E2DFD5] relative overflow-hidden"
  >
    <div class="max-w-[1400px] mx-auto space-y-32 md:space-y-48 relative z-10">
      <!-- 标题与意象展示区 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div class="lg:col-span-7 space-y-12 md:space-y-24 reveal-title">
          <div class="space-y-6 border-l-[0.5px] border-[#5B8FB9]/30 pl-10">
            <span
              class="text-[9px] font-black uppercase tracking-[0.5em] text-[#5B8FB9]"
              >Selected Portfolio</span
            >
            <h2
              class="text-6xl md:text-8xl font-light tracking-tighter uppercase leading-none"
            >
              Recent<br /><span class="font-black italic text-[#5B8FB9]"
                >Archive</span
              >
            </h2>
          </div>
          <div class="max-w-md opacity-60">
            <p
              class="text-sm leading-loose tracking-widest font-medium uppercase"
            >
              每一次项目的迭代，都是对代码边界的探索。这里记录了我如何将复杂的逻辑转化为直觉性的视觉语言。
            </p>
          </div>
        </div>

        <!-- 意象挂件 -->
        <div class="lg:col-span-5 reveal-image">
          <div
            class="relative group overflow-hidden aspect-3/4 md:aspect-auto md:h-[600px] w-full bg-[#E2DFD5]/5 p-4 border-[0.5px] border-[#E2DFD5]/10"
          >
            <img
              src="~/assets/image/works.webp"
              class="w-full h-full object-cover grayscale-[0.3] brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out shadow-2xl"
            />
            <!-- 装饰性文字标签 -->
            <div
              class="absolute bottom-10 left-10 text-[9px] font-black uppercase tracking-[0.5em] text-white/50 [writing-mode:vertical-lr] mix-blend-exclusion vertical-text"
            >
              Reflections of logic
            </div>
          </div>
        </div>
      </div>

      <div
        class="project-list space-y-px bg-[#E2DFD5]/5 border-y-[0.5px] border-[#E2DFD5]/5"
      >
        <NuxtLink
          v-for="(project, index) in projects"
          :key="project.title"
          :to="project.url || '/'"
          :target="project.url ? '_blank' : '_self'"
          class="group relative flex flex-col md:flex-row items-center justify-between py-16 md:py-24 px-8 md:px-12 bg-transparent hover:bg-[#E2DFD5]/5 transition-colors duration-700 overflow-hidden project-item"
        >
          <div class="flex items-baseline gap-12 relative z-10 w-full md:w-auto">
            <span class="text-[12px] font-black font-serif italic opacity-30"
              >0{{ index + 1 }}</span
            >
            <div class="space-y-2">
              <h3
                class="text-3xl md:text-5xl font-black tracking-tighter uppercase group-hover:italic transition-all duration-700 leading-none"
              >
                {{ project.title }}
              </h3>
              <p
                class="text-[10px] md:text-xs font-medium uppercase tracking-widest text-[#5B8FB9] opacity-60"
              >
                {{ project.category }} / {{ project.date }}
              </p>
            </div>
          </div>

          <div
            class="flex flex-col md:items-end gap-6 mt-10 md:mt-0 relative z-10 w-full md:w-1/3"
          >
            <p
              class="text-sm font-medium leading-relaxed text-[#E2DFD5]/60 md:text-right"
            >
              {{ project.description }}
            </p>
            <div
              class="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-700"
            >
              <span
                class="text-[8px] font-black uppercase tracking-widest opacity-30"
                >View Case</span
              >
              <div
                class="h-[0.5px] w-8 bg-[#E2DFD5]/20 group-hover:w-12 group-hover:bg-[#5B8FB9] transition-all duration-700"
              ></div>
            </div>
          </div>

          <!-- 极细分隔线 -->
          <div
            class="absolute bottom-0 left-0 w-full h-[0.5px] bg-[#E2DFD5]/5"
          ></div>
        </NuxtLink>
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
