<script setup>
const projects = [
  {
    title: "Runedra 知树",
    description: "人类知识学习加速启动，构建多维知识图谱",
    url: "https://rune.parallized.cn",
    date: "2024.11",
    category: "AI / Education",
    tag: "FEATURED",
    icon: "ph:tree-structure-fill",
  },
  {
    title: "OwOcaptain",
    description: "守望先锋地图理解 60 秒速查，专业安娜位指南",
    url: "https://owo.parallized.cn",
    date: "2024.08",
    category: "Game Tool",
    tag: "UTILITY",
    icon: "ph:strategy-fill",
  },
  {
    title: "WoW Magician",
    description: "魔兽世界 AI & MRT 战术板 + 全自动排轴解法",
    url: "https://wow.parallized.cn",
    date: "2024.05",
    category: "Full-Stack / AI",
    tag: "GUILD",
    icon: "ph:magic-wand-fill",
  },
  {
    title: "AshIris",
    description: "极简、粗野主义与 Y2K 风格融合的个人博客",
    url: "https://parallized.cn",
    date: "2024.12",
    category: "Identity",
    tag: "BLOG",
    icon: "ph:fingerprint-fill",
  },
];

const skills = [
  { name: "逆向工程", icon: "ph:detective-fill", color: "text-blue-500" },
  { name: "3D 建模", icon: "ph:cube-fill", color: "text-orange-500" },
  { name: "AI LLM 开发", icon: "ph:brain-fill", color: "text-purple-500" },
  { name: "全栈开发", icon: "ph:code-block-fill", color: "text-green-500" },
  { name: "数据爬虫", icon: "ph:spider-fill", color: "text-red-500" },
  {
    name: "Unity/Cocos",
    icon: "ph:game-controller-fill",
    color: "text-cyan-500",
  },
];
</script>

<template>
  <div class="relative min-h-screen bg-[#F0F0F0] text-black overflow-x-hidden">
    <!-- 背景装饰：滚动文字轨道 (解耦组件) -->
    <div
      class="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-25"
    >
      <MarqueeTrack
        class="absolute top-[3%]"
        direction="right"
        opacity="opacity-20"
        size="text-sm"
        :content="[
          'SYSTEM STATUS: OPERATIONAL',
          'CONNECTION: SECURE',
          'BREAD PROTOCOL ACTIVE',
        ]"
      />

      <MarqueeTrack
        class="absolute top-[15%]"
        opacity="opacity-80"
        size="text-4xl"
        :content="[
          '释放无限可能',
          'RELEASE YOUR FANTASY',
          'GREATER BREAD ESSENCE',
          'SIDEFX HOUDINI',
        ]"
      />

      <MarqueeTrack
        class="absolute top-[30%]"
        direction="right"
        opacity="opacity-40"
        size="text-lg"
        :content="[
          'CREATIVE TECHNOLOGY',
          '3 YEARS EXPERIENCE',
          'BASE ZHEJIANG',
          '2021-2026 GRADUATE',
        ]"
      />

      <MarqueeTrack
        class="absolute top-[48%]"
        direction="right"
        tilt="rotate-[-5deg]"
        opacity="opacity-50"
        size="text-6xl"
        class-extra="bg-white/50 backdrop-blur-[1px] text-orange-600/50 italic"
        :content="[
          'VEX',
          'PYTHON',
          'C++',
          'GLSL',
          'HLSL',
          'JAVASCRIPT',
          'TYPESCRIPT',
          'RUST',
        ]"
      />

      <MarqueeTrack
        class="absolute top-[72%]"
        tilt="rotate-2"
        opacity="opacity-30"
        size="text-2xl"
        :content="[
          'MOD CREATOR',
          'GAME PLUGINS',
          'SERVER OWNER',
          'THINKER',
          'READER',
        ]"
      />

      <MarqueeTrack
        class="absolute bottom-[8%]"
        speed="slow"
        opacity="opacity-70"
        size="text-[16px]"
        :content="[
          '｡.｡:+* GRADUATING 2026 *+:｡.｡',
          '强效面包精华',
          'BE WATER MY FRIEND',
        ]"
      />
    </div>

    <!-- 独立悬浮装饰 -->
    <div class="fixed inset-0 pointer-events-none select-none z-0">
      <div class="absolute top-[5%] left-[3%] flex flex-col gap-1">
        <p class="text-[16px] font-black leading-none uppercase">
          强效面包精华。
        </p>
        <p
          class="text-[18px] font-black leading-none uppercase text-orange-600"
        >
          GREATER BREAD
        </p>
        <p class="text-[18px] font-black leading-none uppercase">ESSENCE</p>
        <div class="mt-4 flex items-center gap-2">
          <div
            class="w-10 h-10 bg-black rounded-full flex items-center justify-center"
          >
            <span class="text-white text-sm">🍞</span>
          </div>
          <span class="text-[14px] font-mono opacity-30"
            >｡.｡:+* GRADUATING 2026 *+:｡.｡</span
          >
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <section
      class="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20"
    >
      <header class="text-center">
        <div class="flex flex-col items-center">
          <h1
            class="text-[22vw] leading-[0.75] font-[Kanit] font-black uppercase tracking-tighter text-black glitch-hover"
          >
            GREATER
          </h1>
          <h1
            class="text-[22vw] leading-[0.75] font-[Kanit] font-black uppercase tracking-tighter bg-linear-to-r from-[#FF5F00] via-[#ffae00] to-[#FF5F00] bg-size-[200%_auto] bg-clip-text text-transparent animate-shimmer glitch-hover"
          >
            BREAD
          </h1>
          <h1
            class="text-[22vw] leading-[0.75] font-[Kanit] font-black uppercase tracking-tighter bg-linear-to-r from-indigo-600 via-purple-500 to-cyan-400 bg-size-[200%_auto] bg-clip-text text-transparent animate-shimmer-slow glitch-hover"
          >
            ESSENCE
          </h1>
        </div>
        <p
          class="text-xl md:text-3xl font-black mt-10 tracking-[0.2em] uppercase"
        >
          Be water, my friend.
        </p>
      </header>

      <!-- Entry Badge -->
      <div class="fixed bottom-10 right-10 z-50 group">
        <div class="relative w-40 h-40 flex items-center justify-center">
          <svg
            class="absolute inset-0 w-full h-auto animate-spin-slow pointer-events-none"
            viewBox="0 0 100 100"
          >
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text class="text-[14px] font-black uppercase fill-cyan-400">
              <textPath xlink:href="#circlePath" spacing="auto">
                ENTRY ENTRY ENTRY ENTRY ENTRY
              </textPath>
            </text>
          </svg>
          <div
            class="w-24 h-24 rounded-full border-4 border-cyan-400 overflow-hidden bg-white shadow-2xl group-hover:scale-110 transition-transform duration-500"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=bread-essencea"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Skills & Identity Section (New) -->
    <section
      class="relative z-10 max-w-7xl mx-auto mt-32 px-6 py-32 border-t-4 border-black bg-white/40 backdrop-blur-md"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <!-- Left: Identity -->
        <div class="space-y-12">
          <h2
            class="text-6xl md:text-8xl font-black uppercase tracking-tighter"
          >
            WHO IS <br /><span class="text-orange-600">BREAD?</span>
          </h2>
          <div class="space-y-6">
            <div class="flex items-baseline gap-4 border-b-2 border-black pb-4">
              <span class="text-sm font-black opacity-30 uppercase"
                >Graduate</span
              >
              <span class="text-4xl font-black italic">2021 — 2026</span>
            </div>
            <div class="flex items-baseline gap-4 border-b-2 border-black pb-4">
              <span class="text-sm font-black opacity-30 uppercase"
                >Experience</span
              >
              <span class="text-4xl font-black italic">3 Years Working</span>
            </div>
            <div class="flex items-baseline gap-4 border-b-2 border-black pb-4">
              <span class="text-sm font-black opacity-30 uppercase">Base</span>
              <span class="text-4xl font-black italic">Zhejiang, China</span>
            </div>
          </div>
          <p class="text-xl font-bold leading-relaxed max-w-lg">
            从逆向分析到 3D 建模，从底层爬虫到 LLM
            应用开发。全栈开发者，也是游戏插件、Mod 与服务器创作者。
            <br /><br />
            <span class="bg-black text-white px-2"
              >喜欢各种形式的阅读和思考，在混乱的代码与秩序的逻辑中寻找平衡。</span
            >
          </p>
        </div>

        <!-- Right: Skill Grid -->
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="p-8 border-2 border-black bg-white hover:bg-black hover:text-white transition-all group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            <Icon
              :name="skill.icon"
              class="text-5xl mb-6 group-hover:scale-110 transition-transform"
              :class="skill.color"
            />
            <h3 class="text-xl font-black uppercase">{{ skill.name }}</h3>
            <div class="w-full h-1 bg-black/10 mt-4 overflow-hidden">
              <div
                class="h-full bg-orange-500 w-2/3 group-hover:w-full transition-all duration-1000"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Works Section -->
    <section class="relative z-10 max-w-7xl mx-auto px-6 py-32">
      <div class="flex items-center gap-6 mb-20">
        <h2
          class="text-6xl md:text-9xl font-black uppercase tracking-tighter border-b-8 border-black"
        >
          WORKS
        </h2>
        <span
          class="text-xs font-mono opacity-40 mt-auto mb-2 uppercase tracking-widest"
          >// Selected Projects</span
        >
      </div>
      <div class="grid grid-cols-1 gap-4">
        <PostCard
          v-for="project in projects"
          :key="project.title"
          :post="project"
        />
      </div>
    </section>

    <!-- Contact Section -->
    <section
      class="relative z-10 px-6 py-40 bg-black text-white overflow-hidden"
    >
      <div
        class="absolute top-0 right-0 text-[30vw] font-black text-white/5 leading-none pointer-events-none select-none"
      >
        HIRE
      </div>
      <div class="max-w-7xl mx-auto">
        <div
          class="flex flex-col md:flex-row justify-between items-start gap-10 mb-20"
        >
          <h2
            class="text-7xl md:text-[10vw] font-black uppercase tracking-tighter leading-none"
          >
            GREATER <br /><span
              class="bg-linear-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent"
              >BREAD ESSENCE</span
            >
          </h2>
          <div class="bg-orange-600 px-6 py-4 rotate-3">
            <p class="text-2xl font-black uppercase">Graduating 2026</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div class="space-y-8">
            <p class="text-2xl font-bold opacity-80 max-w-xl">
              我在求职
              <span class="text-orange-500"
                >Houdini / 全栈 / 游戏 / 互联网开发</span
              >。 擅长将技术与创意融合，构建跨维度的数字体验。
            </p>
            <div class="flex flex-wrap gap-4">
              <a
                href="mailto:parallized@foxmail.com"
                class="px-10 py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-colors duration-300 shadow-[8px_8px_0px_0px_rgba(255,95,0,1)]"
              >
                Get My CV
              </a>
            </div>
          </div>
          <div class="flex flex-col gap-10 md:items-end justify-center">
            <div class="flex flex-col items-start md:items-end gap-2">
              <span class="text-[10px] font-black uppercase opacity-40"
                >Direct Access</span
              >
              <div class="flex flex-wrap gap-6 text-4xl font-black">
                <a
                  href="https://parallized.cn"
                  target="_blank"
                  class="hover:text-orange-500 transition-colors"
                  >BLOG</a
                >
                <a
                  href="https://github.com/parallized"
                  target="_blank"
                  class="hover:text-purple-500 transition-colors"
                  >GH</a
                >
                <a href="#" class="hover:text-pink-500 transition-colors">IN</a>
              </div>
            </div>
            <div
              class="text-[10px] font-mono opacity-30 uppercase tracking-tighter"
            >
              Greater Bread Essence © 2024-2026
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 10s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

.animate-shimmer {
  animation: shimmer 3s linear infinite;
}

.animate-shimmer-slow {
  animation: shimmer 6s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.glitch-hover:hover {
  animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
}

@keyframes glitch {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-3px, 3px);
  }
  40% {
    transform: translate(-3px, -3px);
  }
  60% {
    transform: translate(3px, 3px);
  }
  80% {
    transform: translate(3px, -3px);
  }
  100% {
    transform: translate(0);
  }
}
</style>
