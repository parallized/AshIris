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
    class="w-full py-32 md:py-64 px-10 md:px-[12vw] bg-[#1A1C18] text-[#E8E4DF] relative overflow-hidden"
  >
    <!-- 背景巨大装饰字 -->
    <div
      class="absolute top-20 left-10 text-[25vw] font-black leading-none opacity-[0.02] select-none pointer-events-none tracking-tighter whitespace-nowrap"
    >
      RESUME IDENTITY
    </div>

    <!-- 极细装饰边框 -->
    <div
      class="absolute inset-0 border-[0.5px] border-[#E8E4DF]/10 pointer-events-none m-4 md:m-10"
    ></div>

    <div
      class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 relative z-10"
    >
      <!-- 1. 垂直标题区 -->
      <div
        class="lg:col-span-3 border-l-[0.5px] border-[#E8E4DF]/20 pl-10 flex flex-col justify-between py-2"
      >
        <div
          class="reveal-pure opacity-0 translate-y-10 transition-all duration-1000 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-y-0"
        >
          <span
            class="text-[9px] font-black uppercase tracking-[0.5em] text-[#D4AF37] mb-8 block"
            >About Me</span
          >
          <h2
            class="text-6xl md:text-7xl font-light tracking-tighter leading-none"
          >
            The<br /><span class="font-black italic text-[#D4AF37]"
              >Identity</span
            >
          </h2>
        </div>

        <div
          class="reveal-pure opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-y-0 hidden lg:block space-y-4 mt-40"
        >
          <p
            class="text-[12px] font-black uppercase tracking-[0.4em] opacity-30"
          >
            Current BASE
          </p>
          <p
            class="text-xl font-serif italic border-b-[0.5px] border-[#E8E4DF]/10 pb-4 inline-block"
          >
            {{ base }} / UTC+8
          </p>
        </div>
      </div>

      <!-- 2. 核心履历与简介 -->
      <div class="lg:col-span-6 space-y-24">
        <!-- 更新：使用本地图片，并调整滤镜以突出花朵色彩 -->
        <div
          class="reveal-pure opacity-0 translate-y-10 transition-all duration-1000 delay-100 data-[animate=true]:opacity-100 data-[animate=true]:translate-y-0 w-full aspect-video overflow-hidden grayscale-[0.2] hover:grayscale-0 shadow-2xl"
        >
          <img
            src="~/assets/image/identity.webp"
            alt="Identity Image"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-[3s]"
          />
        </div>

        <div
          class="reveal-pure opacity-0 translate-y-10 transition-all duration-1000 delay-200 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-y-0 space-y-12"
        >
          <p
            class="text-2xl md:text-4xl font-light leading-[1.3] text-[#E8E4DF]/90"
          >
            欣赏 IDEA、代码与美学的结合，痛恨不优雅且为所欲为的糟糕设计。
          </p>
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-sm tracking-[0.15em] leading-loose opacity-60"
          >
            <p>
              Greater Bread Essence.
              多年游戏设计、建模与编码经验，擅长游戏周边应用设计，工具链开发，软件开发咨询。技术擅长 TypeScript，Lua，Java 和 C# 等，常用 TDD & DDD，了解架构设计与软件工程。
            </p>
            <p>
              流动不息，在 Houdini 的节点流与全栈开发的逻辑栈中，热爱探索技术与审美的交汇点。同样痛恨那些简单抄袭的糟糕产品设计，大道至简。
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
              Status: '接受邀约',
            }"
            :key="label"
            :style="{ transitionDelay: `${index * 150}ms` }"
            class="reveal-pure opacity-0 translate-y-10 transition-all duration-1000 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-y-0 group border-b-[0.5px] border-[#E8E4DF]/10 py-10 flex flex-col md:flex-row md:items-center justify-between hover:bg-[#E8E4DF]/5 px-4 -mx-4 cursor-default"
          >
            <span
              class="text-[9px] font-black uppercase tracking-[0.4em] opacity-20 group-hover:opacity-100 group-hover:text-[#D4AF37]"
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
            class="reveal-pure opacity-0 translate-x-4 transition-all duration-700 ease-out data-[animate=true]:opacity-100 data-[animate=true]:translate-x-0 flex items-center justify-between border-b-[0.5px] border-[#E8E4DF]/5 pb-4 group"
          >
            <span
              class="text-[14px] font-bold uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors"
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
