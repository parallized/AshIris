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
  <section
    ref="container"
    class="w-full py-32 md:py-64 px-10 md:px-[12vw] bg-[#D9D1C7] text-[#2A2724] relative"
  >
    <div class="max-w-[1400px] mx-auto space-y-32 md:space-y-48">
      <!-- 标题区 -->
      <div
        class="reveal-pure opacity-0 translate-y-10 transition-all duration-1000 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-y-0 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-[0.5px] border-[#2A2724]/20 pb-16"
      >
        <div class="space-y-6">
          <span
            class="text-[9px] font-black uppercase tracking-[0.5em] text-[#8C4B3E]"
            >Selected Portfolio</span
          >
          <h2
            class="text-6xl md:text-8xl font-light tracking-tighter uppercase leading-none"
          >
            Recent<br /><span class="font-black italic text-[#8C4B3E]"
              >Archive</span
            >
          </h2>
        </div>
        <div class="max-w-xs text-right opacity-40">
          <p
            class="text-sm leading-loose tracking-[0.1em] font-medium uppercase"
          >
            每一次项目的迭代，都是对代码边界的探索。这里记录了我如何将复杂的逻辑转化为直觉性的视觉语言。
          </p>
        </div>
      </div>

      <div
        class="project-list space-y-px bg-[#2A2724]/5 border-y-[0.5px] border-[#2A2724]/10"
      >
        <NuxtLink
          v-for="(project, index) in projects"
          :key="project.title"
          :to="project.url || '/'"
          :target="project.url ? '_blank' : '_self'"
          :style="{ transitionDelay: `${index * 150}ms` }"
          class="reveal-pure opacity-0 translate-y-10 transition-all duration-1000 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-y-0 group relative flex flex-col md:flex-row items-center justify-between py-16 md:py-24 px-8 md:px-12 bg-[#D9D1C7] hover:bg-[#C9C1B7] transition-all duration-700 overflow-hidden"
        >
          <div
            class="flex items-baseline gap-12 relative z-10 w-full md:w-auto"
          >
            <span class="text-[9px] font-black font-serif italic opacity-30"
              >0{{ index + 1 }}</span
            >
            <div class="space-y-2">
              <h3
                class="text-3xl md:text-5xl font-black tracking-tighter uppercase group-hover:italic transition-all duration-700 leading-none"
              >
                {{ project.title }}
              </h3>
              <p
                class="text-[10px] md:text-xs font-medium uppercase tracking-widest text-[#8C4B3E] opacity-60"
              >
                {{ project.category }} / {{ project.date }}
              </p>
            </div>
          </div>

          <div
            class="flex flex-col md:items-end gap-6 mt-10 md:mt-0 relative z-10 w-full md:w-1/3"
          >
            <p
              class="text-sm font-medium leading-[1.8] text-[#2A2724]/60 md:text-right"
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
                class="h-[0.5px] w-8 bg-[#2A2724]/20 group-hover:w-12 group-hover:bg-[#8C4B3E] transition-all duration-700"
              ></div>
            </div>
          </div>

          <!-- 极细分隔线 -->
          <div
            class="absolute bottom-0 left-0 w-full h-[0.5px] bg-[#2A2724]/5"
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
