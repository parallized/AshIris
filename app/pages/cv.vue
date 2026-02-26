<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

definePageMeta({
  layout: false,
});

useHead({
  title: "CV",
});

const RESUME_TAGS = [
  "前端开发",
  "后端开发",
  "Nodejs 开发",
  "UIUX 设计",
  "Agent 架构设计",
  "Agent 到端落地",
  "逆向相关",
  "游戏开发",
  "建模 3D",
] as const;

type ResumeTag = (typeof RESUME_TAGS)[number];

type ResumeItem = {
  id: string;
  enabled: boolean;
  label: string;
  tag: ResumeTag;
};

type ProjectItem = {
  id: string;
  enabled: boolean;
  title: string;
  description: string;
  url: string;
  date: string;
  stack?: string;
};

const drawerOpen = ref(false);
const lastUpdated = new Date().toISOString().slice(0, 10);

const DARK_KEY = "ashiris.cv.dark";
const isDark = ref(false);

const syncDarkClass = () => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", isDark.value);
};

const resumeItems = ref<ResumeItem[]>([
  {
    id: "fe-nuxt",
    enabled: true,
    label: "Vue 3 / Nuxt 生态：组件化、工程化与性能优化",
    tag: "前端开发",
  },
  {
    id: "fe-motion",
    enabled: true,
    label: "动效与交互：GSAP/Scroll/动线设计，强调可读性与节奏",
    tag: "前端开发",
  },
  {
    id: "be-arch",
    enabled: true,
    label: "后端接口设计：鉴权、缓存、限流、可观测性与故障处理",
    tag: "后端开发",
  },
  {
    id: "node-tooling",
    enabled: true,
    label: "Node.js 工具链：脚本化、自动化、CLI 与工程效率提升",
    tag: "Nodejs 开发",
  },
  {
    id: "uiux-system",
    enabled: true,
    label: "信息结构与视觉系统：排版、留白、层级与一致性",
    tag: "UIUX 设计",
  },
  {
    id: "agent-arch",
    enabled: true,
    label: "Agent 架构：工具调用、状态管理、记忆/检索与可扩展设计",
    tag: "Agent 架构设计",
  },
  {
    id: "agent-e2e",
    enabled: true,
    label: "Agent 到端落地：从需求到可用工作流、监控与迭代闭环",
    tag: "Agent 到端落地",
  },
  {
    id: "re-basic",
    enabled: false,
    label: "逆向分析：基础静态/动态分析、定位与验证问题点",
    tag: "逆向相关",
  },
  {
    id: "game-tools",
    enabled: true,
    label: "游戏相关：数据与地图理解工具、可视化与交互体验优化",
    tag: "游戏开发",
  },
  {
    id: "3d-basic",
    enabled: false,
    label: "3D：基础建模与资产流程理解，可用于原型与展示",
    tag: "建模 3D",
  },
]);

const projectPool = ref<ProjectItem[]>([
  {
    id: "runedra",
    enabled: true,
    title: "Runedra 知树",
    description: "人类知识学习加速启动，构建多维知识图谱",
    url: "https://rune.parallized.cn",
    date: "2024",
    stack: "Nuxt / Full-Stack / AI",
  },
  {
    id: "owocaptain",
    enabled: true,
    title: "OwOcaptain",
    description: "守望先锋地图理解 60 秒速查，专业安娜位指南",
    url: "https://owo.parallized.cn",
    date: "2025.12",
    stack: "Game Tool",
  },
  {
    id: "wow-magician",
    enabled: true,
    title: "WoW Magician",
    description: "魔兽世界 AI & MRT 战术板 + 全自动排轴解法",
    url: "https://wow.parallized.cn",
    date: "2025.09",
    stack: "Full-Stack / AI",
  },
  {
    id: "ash-iris",
    enabled: false,
    title: "Ash Iris",
    description: "极简、粗野主义与 Y2K 风格融合的个人博客",
    url: "https://parallized.cn",
    date: "2013",
    stack: "Identity / Blog",
  },
]);

const STORAGE_KEY = "ashiris.cv.controls.v1";

const tagSolidClass = (tag: ResumeTag) => {
  switch (tag) {
    case "前端开发":
      return "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-800";
    case "后端开发":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-800";
    case "Nodejs 开发":
      return "bg-lime-50 text-lime-800 ring-lime-200 dark:bg-lime-950 dark:text-lime-300 dark:ring-lime-800";
    case "UIUX 设计":
      return "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200 dark:bg-fuchsia-950 dark:text-fuchsia-300 dark:ring-fuchsia-800";
    case "Agent 架构设计":
      return "bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-800";
    case "Agent 到端落地":
      return "bg-orange-50 text-orange-800 ring-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:ring-orange-800";
    case "逆向相关":
      return "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600";
    case "游戏开发":
      return "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:ring-violet-800";
    case "建模 3D":
      return "bg-cyan-50 text-cyan-700 ring-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:ring-cyan-800";
    default:
      return "bg-neutral-100 text-neutral-700 ring-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:ring-neutral-600";
  }
};

const enabledResumeItems = computed(() =>
  resumeItems.value.filter((item) => item.enabled),
);

const enabledProjects = computed(() =>
  projectPool.value.filter((project) => project.enabled),
);

const resumeGroups = computed(() => {
  const map = new Map<ResumeTag, ResumeItem[]>();
  for (const tag of RESUME_TAGS) map.set(tag, []);
  for (const item of enabledResumeItems.value) {
    map.get(item.tag)?.push(item);
  }
  return RESUME_TAGS.map((tag) => ({
    tag,
    items: map.get(tag) ?? [],
  })).filter((g) => g.items.length > 0);
});

const closeDrawer = () => {
  drawerOpen.value = false;
};

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

const printResume = () => {
  window.print();
};

const resetControls = () => {
  for (const item of resumeItems.value) item.enabled = true;
  for (const project of projectPool.value) project.enabled = true;
};

const persistControls = () => {
  try {
    const data = {
      resume: resumeItems.value.map((i) => ({ id: i.id, enabled: i.enabled })),
      projects: projectPool.value.map((p) => ({ id: p.id, enabled: p.enabled })),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors
  }
};

const restoreControls = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as {
      resume?: Array<{ id: string; enabled: boolean }>;
      projects?: Array<{ id: string; enabled: boolean }>;
    };

    if (parsed.resume) {
      const map = new Map(parsed.resume.map((i) => [i.id, i.enabled]));
      for (const item of resumeItems.value) {
        const enabled = map.get(item.id);
        if (typeof enabled === "boolean") item.enabled = enabled;
      }
    }

    if (parsed.projects) {
      const map = new Map(parsed.projects.map((p) => [p.id, p.enabled]));
      for (const project of projectPool.value) {
        const enabled = map.get(project.id);
        if (typeof enabled === "boolean") project.enabled = enabled;
      }
    }
  } catch {
    // ignore storage corruption
  }
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") closeDrawer();
};

watch(drawerOpen, (open) => {
  if (typeof document === "undefined") return;
  document.body.style.overflow = open ? "hidden" : "";
});

watch(isDark, () => {
  if (typeof window === "undefined") return;
  localStorage.setItem(DARK_KEY, String(isDark.value));
  syncDarkClass();
});

watch(
  [resumeItems, projectPool],
  () => {
    if (typeof window === "undefined") return;
    persistControls();
  },
  { deep: true },
);

onMounted(() => {
  restoreControls();
  const savedDark = localStorage.getItem(DARK_KEY);
  isDark.value = savedDark === "true";
  syncDarkClass();
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
  document.documentElement.classList.remove("dark");
});
</script>

<template>
  <div class="cv-bg min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 overflow-x-hidden transition-colors duration-300">
    <div class="page-wrap mx-auto w-full max-w-[980px] px-4 py-8 md:px-8 md:py-12">
      <article class="sheet bg-white dark:bg-neutral-800 shadow-[0_24px_70px_rgba(0,0,0,0.10)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.50)] ring-1 ring-black/5 dark:ring-white/10 rounded-2xl px-6 py-8 md:px-10 md:py-12 transition-colors duration-300">
        <!-- Header -->
        <header class="space-y-4">
          <div class="space-y-2">
            <h1 class="text-4xl md:text-5xl font-black tracking-tight">
              Parallized
            </h1>
            <p class="text-sm md:text-base text-neutral-700 dark:text-neutral-300">
              Full-Stack / UIUX / Agent
              <span class="mx-2 text-neutral-300 dark:text-neutral-600">·</span>
              浙江·杭州
            </p>
          </div>

          <hr class="border-neutral-200 dark:border-neutral-700" />

          <div class="text-sm text-neutral-800 dark:text-neutral-200 space-y-1 break-words">
            <div>
              邮箱：
              <a class="hover:underline underline-offset-4" href="mailto:1317699264@qq.com">
                1317699264@qq.com
              </a>
            </div>
            <div>
              GitHub：
              <a
                class="hover:underline underline-offset-4"
                href="https://github.com/parallized"
                target="_blank"
              >
                github.com/parallized
              </a>
            </div>
            <div>
              主页：
              <a
                class="hover:underline underline-offset-4"
                href="https://parallized.cn"
                target="_blank"
              >
                parallized.cn
              </a>
            </div>
          </div>
        </header>

        <hr class="my-7 print:my-4 border-neutral-200 dark:border-neutral-700" />

        <!-- Overview -->
        <section class="cv-section space-y-2">
          <h2 class="text-lg font-black tracking-tight">概览</h2>
          <div class="text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200 space-y-1">
            <p>2 年实习经验，多年游戏周边开发</p>
            <p>双非本·数媒 2021 — 2026</p>
            <p>
              关注工程质量与体验一致性，擅长把复杂需求拆成可交付的迭代，并通过工具化与流程优化提升效率。
            </p>
          </div>
        </section>

        <hr class="my-7 print:my-4 border-neutral-200 dark:border-neutral-700" />

        <!-- Skills -->
        <section v-if="resumeGroups.length" class="cv-section space-y-4">
          <h2 class="text-lg font-black tracking-tight">技能</h2>

          <div class="space-y-5 print:space-y-3">
            <div v-for="group in resumeGroups" :key="group.tag" class="space-y-2 print:space-y-1">
              <h3 class="text-sm font-black text-neutral-800 dark:text-neutral-200">
                {{ group.tag }}
              </h3>
              <ul class="list-disc pl-5 text-[15px] print:text-[13px] leading-relaxed text-neutral-800 dark:text-neutral-200 space-y-1 print:space-y-0">
                <li v-for="item in group.items" :key="item.id">
                  {{ item.label }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <hr class="my-7 print:my-4 border-neutral-200 dark:border-neutral-700" />

        <!-- Projects -->
        <section v-if="enabledProjects.length" class="cv-section space-y-4">
          <h2 class="text-lg font-black tracking-tight">项目经历</h2>

          <div class="space-y-5 print:space-y-3">
            <div v-for="project in enabledProjects" :key="project.id" class="space-y-1">
              <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <a
                  :href="project.url"
                  target="_blank"
                  class="text-[15px] print:text-[13px] font-black tracking-tight underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-neutral-600 dark:hover:decoration-neutral-400"
                >
                  {{ project.title }}
                </a>
                <div class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 shrink-0">
                  {{ project.date }}
                </div>
              </div>

              <p class="text-[15px] print:text-[13px] text-neutral-800 dark:text-neutral-200 leading-relaxed">
                {{ project.description }}
              </p>

              <p v-if="project.stack" class="text-xs text-neutral-500 dark:text-neutral-400">
                {{ project.stack }}
              </p>
            </div>
          </div>
        </section>

        <hr class="my-7 print:my-4 border-neutral-200 dark:border-neutral-700" />

        <!-- Education -->
        <section class="cv-section space-y-2">
          <h2 class="text-lg font-black tracking-tight">教育经历</h2>
          <div class="text-[15px] print:text-[13px] leading-relaxed text-neutral-800 dark:text-neutral-200">
            <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <span class="font-semibold">双非本科 · 数字媒体</span>
              <span class="text-xs text-neutral-500 dark:text-neutral-400">2021 — 2026</span>
            </div>
          </div>
        </section>

        <hr class="my-7 print:my-4 border-neutral-200 dark:border-neutral-700" />

        <footer class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span>Last updated: {{ lastUpdated }}</span>
          <span class="no-print">使用右下角按钮精简内容 · Print-friendly</span>
        </footer>
      </article>
    </div>

    <Teleport to="body">
      <!-- Floating buttons -->
      <div class="no-print fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] z-[9999] flex flex-col items-center gap-3">
        <button
          type="button"
          class="h-12 w-12 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 transition flex items-center justify-center"
          :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
          @click="isDark = !isDark"
        >
          <Icon :name="isDark ? 'ph:sun-bold' : 'ph:moon-bold'" class="text-lg" />
        </button>
        <button
          type="button"
          class="h-12 w-12 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/25 transition flex items-center justify-center"
          aria-label="打开简历显示控制"
          @click="toggleDrawer"
        >
          <Icon name="ph:sliders-horizontal-bold" class="text-xl" />
        </button>
      </div>

      <!-- Drawer backdrop -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="drawerOpen"
          class="no-print fixed inset-0 z-[10000] bg-black/30 dark:bg-black/50"
          @click="closeDrawer"
        />
      </Transition>

      <!-- Drawer panel -->
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <aside
          v-if="drawerOpen"
          class="no-print fixed right-0 top-0 h-full w-[min(460px,100vw)] bg-white dark:bg-neutral-800 shadow-2xl ring-1 ring-black/10 dark:ring-white/10 z-[10001]"
          role="dialog"
          aria-modal="true"
        >
          <div class="flex h-full flex-col">
            <div
              class="flex items-start justify-between gap-4 p-5 border-b border-neutral-200/70 dark:border-neutral-700/70"
            >
              <div class="space-y-1">
                <h2 class="text-base font-black tracking-tight">显示控制</h2>
                <p class="text-xs text-neutral-500 dark:text-neutral-400">
                  简历内容 {{ enabledResumeItems.length }} / {{ resumeItems.length }}
                  <span class="mx-2 text-neutral-300 dark:text-neutral-600">·</span>
                  项目 {{ enabledProjects.length }} / {{ projectPool.length }}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="h-9 rounded-lg px-3 text-xs font-bold ring-1 ring-neutral-200 dark:ring-neutral-600 hover:ring-neutral-300 dark:hover:ring-neutral-500 transition"
                  @click="resetControls"
                >
                  全选
                </button>
                <button
                  type="button"
                  class="h-9 w-9 rounded-lg ring-1 ring-neutral-200 dark:ring-neutral-600 hover:ring-neutral-300 dark:hover:ring-neutral-500 transition flex items-center justify-center"
                  aria-label="关闭"
                  @click="closeDrawer"
                >
                  <Icon name="ph:x" class="text-lg opacity-70" />
                </button>
              </div>
            </div>

            <div class="flex-1 overflow-auto p-5 space-y-8">
              <!-- Resume controls -->
              <section class="space-y-3">
                <div class="flex items-end justify-between gap-3">
                  <h3 class="text-[11px] font-black tracking-[0.4em] uppercase text-neutral-500 dark:text-neutral-400">
                    Resume
                  </h3>
                  <button
                    type="button"
                    class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition"
                    @click="printResume"
                  >
                    打印 / 导出
                  </button>
                </div>

                <div class="rounded-xl ring-1 ring-neutral-200/70 dark:ring-neutral-700/70 overflow-hidden">
                  <div
                    class="grid grid-cols-[auto,1fr,auto] items-center gap-x-3 px-4 py-2 bg-neutral-50 dark:bg-neutral-900/50 text-[10px] font-black uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400"
                  >
                    <span>On</span>
                    <span>Label</span>
                    <span class="text-right">Tag</span>
                  </div>
                  <div class="divide-y divide-neutral-200/70 dark:divide-neutral-700/70">
                    <div
                      v-for="item in resumeItems"
                      :key="item.id"
                      class="grid grid-cols-[auto,1fr,auto] items-center gap-x-3 px-4 py-3"
                    >
                      <label class="relative inline-flex cursor-pointer items-center">
                        <input
                          v-model="item.enabled"
                          type="checkbox"
                          class="peer sr-only"
                        />
                        <span
                          class="h-5 w-9 rounded-full bg-neutral-200 dark:bg-neutral-600 peer-checked:bg-neutral-900 dark:peer-checked:bg-neutral-100 transition"
                        />
                        <span
                          class="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-4"
                        />
                      </label>
                      <span class="text-sm text-neutral-800 dark:text-neutral-200 leading-snug">
                        {{ item.label }}
                      </span>
                      <span
                        class="inline-flex items-center justify-end rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1"
                        :class="tagSolidClass(item.tag)"
                      >
                        {{ item.tag }}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Project pool -->
              <section class="space-y-3">
                <h3 class="text-[11px] font-black tracking-[0.4em] uppercase text-neutral-500 dark:text-neutral-400">
                  项目池
                </h3>

                <div class="rounded-xl ring-1 ring-neutral-200/70 dark:ring-neutral-700/70 overflow-hidden">
                  <div
                    class="grid grid-cols-[auto,1fr] items-center gap-x-3 px-4 py-2 bg-neutral-50 dark:bg-neutral-900/50 text-[10px] font-black uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400"
                  >
                    <span>On</span>
                    <span>Title</span>
                  </div>
                  <div class="divide-y divide-neutral-200/70 dark:divide-neutral-700/70">
                    <div
                      v-for="project in projectPool"
                      :key="project.id"
                      class="grid grid-cols-[auto,1fr] items-center gap-x-3 px-4 py-3"
                    >
                      <label class="relative inline-flex cursor-pointer items-center">
                        <input
                          v-model="project.enabled"
                          type="checkbox"
                          class="peer sr-only"
                        />
                        <span
                          class="h-5 w-9 rounded-full bg-neutral-200 dark:bg-neutral-600 peer-checked:bg-neutral-900 dark:peer-checked:bg-neutral-100 transition"
                        />
                        <span
                          class="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-4"
                        />
                      </label>
                      <div class="min-w-0">
                        <div class="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                          {{ project.title }}
                        </div>
                        <div class="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                          {{ project.description }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div class="p-5 border-t border-neutral-200/70 dark:border-neutral-700/70">
              <p class="text-xs text-neutral-500 dark:text-neutral-400">
                Tip：按 <span class="font-mono">Esc</span> 关闭抽屉；开关状态会自动保存到本地。
              </p>
            </div>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@page {
  size: A4;
  margin: 15mm 18mm;
}

@media print {
  .no-print {
    display: none !important;
  }

  .sheet {
    box-shadow: none !important;
    border-radius: 0 !important;
    outline: none !important;
    background: white !important;
    color: #171717 !important;
  }

  .page-wrap {
    padding: 0 !important;
    max-width: none !important;
  }

  .cv-bg {
    background: white !important;
    color: #171717 !important;
  }

  .cv-section {
    break-inside: avoid;
  }
}
</style>
