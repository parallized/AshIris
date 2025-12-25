<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Skill {
  name: string;
  icon: string;
}

defineProps<{
  graduation?: string;
  experience?: string;
  base?: string;
  skills: Skill[];
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
    class="w-full py-32 md:py-64 px-10 md:px-[12vw] bg-[#3D3935] text-[#D9D1C7] relative overflow-hidden"
  >
    <!-- 背景巨大装饰字 -->
    <div
      class="absolute top-20 left-10 text-[25vw] font-black leading-none opacity-[0.03] select-none pointer-events-none tracking-tighter whitespace-nowrap"
    >
      RESUME IDENTITY
    </div>

    <!-- 极细装饰边框 -->
    <div
      class="absolute inset-0 border-[0.5px] border-[#D9D1C7]/10 pointer-events-none m-4 md:m-10"
    ></div>

    <div
      class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 relative z-10"
    >
      <!-- 1. 垂直标题区 -->
      <div
        class="lg:col-span-3 border-l-[0.5px] border-[#D9D1C7]/20 pl-10 flex flex-col justify-between py-2"
      >
        <div
          class="reveal-pure opacity-0 translate-y-10 transition-all duration-1000 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-y-0"
        >
          <span
            class="text-[9px] font-black uppercase tracking-[0.5em] text-[#A68B6D] mb-8 block"
            >About Me</span
          >
          <h2
            class="text-6xl md:text-7xl font-light tracking-tighter leading-none"
          >
            The<br /><span class="font-black italic text-[#A68B6D]"
              >Identity</span
            >
          </h2>
        </div>

        <div
          class="reveal-pure opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-y-0 hidden lg:block space-y-4 mt-40"
        >
          <p
            class="text-[9px] font-black uppercase tracking-[0.4em] opacity-30"
          >
            Current Coordinates
          </p>
          <p
            class="text-xl font-serif italic border-b-[0.5px] border-[#D9D1C7]/10 pb-4 inline-block"
          >
            {{ base }} / UTC+8
          </p>
        </div>
      </div>

      <!-- 2. 核心履历与简介 -->
      <div class="lg:col-span-6 space-y-24">
        <div
          class="reveal-pure opacity-0 translate-y-10 transition-all duration-1000 delay-200 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-y-0 space-y-12"
        >
          <p
            class="text-2xl md:text-4xl font-light leading-[1.3] text-[#D9D1C7]/90"
          >
            在混乱的代码世界中，寻找一种温暖的、带有泥土气息的逻辑归宿。
          </p>
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-sm tracking-[0.15em] leading-[2] opacity-60 font-medium"
          >
            <p>
              Greater Bread Essence.
              在光影与秩序中徘徊的数字工匠。擅长捕捉那一抹转瞬即逝的创意灵光，并将其固化为永恒的像素。
            </p>
            <p>
              "Be water, my friend." 流动不息，在 Houdini
              的节点流与全栈开发的逻辑栈中，探索技术与审美的交汇点。
            </p>
          </div>
        </div>

        <!-- 履历列表 -->
        <div class="space-y-2">
          <div
            v-for="(val, label, index) in {
              Academic: graduation,
              Professional: experience,
              Location: base,
              Status: 'Available for Hire',
            }"
            :key="label"
            :style="{ transitionDelay: `${index * 150}ms` }"
            class="reveal-pure opacity-0 translate-y-10 transition-all duration-1000 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-y-0 group border-b-[0.5px] border-[#D9D1C7]/10 py-10 flex flex-col md:flex-row md:items-center justify-between hover:bg-[#D9D1C7]/5 px-4 -mx-4 cursor-default"
          >
            <span
              class="text-[9px] font-black uppercase tracking-[0.4em] opacity-20 group-hover:opacity-100 group-hover:text-[#A68B6D]"
              >{{ label }}</span
            >
            <span
              class="text-2xl md:text-3xl font-black tracking-tighter group-hover:italic transition-all duration-700"
              >{{ val }}</span
            >
          </div>
        </div>
      </div>

      <!-- 3. 技能区 -->
      <div class="lg:col-span-3 space-y-12">
        <span
          class="reveal-pure opacity-0 transition-opacity duration-1000 delay-500 data-[animate=true]:opacity-30 text-[9px] font-black uppercase tracking-[0.5em] block"
          >Core Skills</span
        >
        <div class="space-y-6">
          <div
            v-for="(skill, index) in skills"
            :key="skill.name"
            :style="{ transitionDelay: `${index * 100 + 600}ms` }"
            class="reveal-pure opacity-0 translate-x-4 transition-all duration-700 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-x-0 flex items-center justify-between border-b-[0.5px] border-[#D9D1C7]/5 pb-4 group"
          >
            <span
              class="text-[11px] font-bold uppercase tracking-widest group-hover:text-[#A68B6D] transition-colors"
              >{{ skill.name }}</span
            >
            <Icon
              :name="skill.icon"
              class="text-xl opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all"
            />
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
