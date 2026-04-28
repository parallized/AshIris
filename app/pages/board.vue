<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import ashIrisImage from "~/assets/image/board/ash-iris.webp";
import mapleImage from "~/assets/image/board/maple-overview.png";
import mapleWorkerConfigImage from "~/assets/image/board/maple-worker-config.png";
import owocaptainImage from "~/assets/image/board/owocaptain.webp";
import runedraImage from "~/assets/image/board/runedra-concept.png";
import wowMagicianImage from "~/assets/image/board/wow-magician.webp";
import wowRaidPlusImage from "~/assets/image/board/wow-raid-plus.webp";

definePageMeta({ layout: false });

type StackIcon =
  | string
  | {
      name: string;
      label: string;
      color?: string;
    };

type StackSticker = {
  name: string;
  label: string;
  color?: string;
};

type StickerSlot = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

interface BoardProject {
  slug: string;
  title: string;
  label: string;
  url?: string;
  image: string;
  sideImage?: string;
  accent: string;
  metrics: Array<{
    label: string;
    value: string;
    note: string;
  }>;
  brief: string;
  problems: Array<{
    title: string;
    desc: string;
  }>;
  stackGroups: Array<{
    type: string;
    icons: StackIcon[];
  }>;
}

const projects: BoardProject[] = [
  {
    slug: "maple",
    title: "Maple",
    label: "基于 MCP 通路的多 Code Agent 与 SDD 管理看板",
    url: "https://github.com/parallized/maple",
    image: mapleImage,
    sideImage: mapleWorkerConfigImage,
    accent: "#8BA264",
    metrics: [
      { label: "协作状态", value: "Trace", note: "Worker 进度可回看" },
      { label: "任务入口", value: "SDD", note: "文档转看板" },
      { label: "回写链路", value: "Auto", note: "报告自动归档" },
    ],
    brief:
      "AI 编码流程的新尝试，将类 Notion 优雅的状态管理、知识库与原子命题融入规范驱动开发 (SDD) 看板。通过 MCP & Skills 打通 Claude Code / Codex 与 Maple 中控的实时数据交互。",
    problems: [
      { title: "面向状态的原子命题决策", desc: "设计一套命题状态，搭建从命题草稿、执行状态到结果报告回写的全链路 MCP 通路；解耦对话上下文与单个命题的信息熵及过度关联，构建以 Spec 为核心的开发代理工作流。" },
      { title: "黑盒运行与安全审查", desc: "提取 Coding Agent 使用过程中的抽象行为，利用 node-xterm 与 workflow 完全管理编码过程。通过 MCP 要求在合适的时机 Human in the loop 切入干预，相比传统的多对话窗口极大降低心智负担。" },
      { title: "统一视图与多项目知识管理", desc: "利用 RAG 与多层 Memory 技术，允许 AI 根据策略模式巩固记忆，抽调历史记录，作为上下文注入对话窗口提高 function call 效能。内部构建了一套类消息队列与 worker 池，根据不同 Agent 并发数认领任务避免超限。" },
    ],
    stackGroups: [
      {
        type: "Shell",
        icons: [
          { name: "logos:tauri", label: "Tauri" },
          { name: "logos:typescript-icon", label: "TypeScript" },
          { name: "logos:nodejs-icon", label: "Node.js" },
        ],
      },
      {
        type: "Agent",
        icons: [
          { name: "simple-icons:modelcontextprotocol", label: "Model Context Protocol" },
          { name: "simple-icons:claude", label: "Claude Code", color: "#D97757" },
          { name: "logos:openai-icon", label: "Codex / OpenAI" },
        ],
      },
      {
        type: "Workflow",
        icons: [
          { name: "logos:github-icon", label: "GitHub" },
          { name: "ph:terminal-window-fill", label: "CLI" },
        ],
      },
    ],
  },
  {
    slug: "runedra",
    title: "Runedra 知树",
    label: "Knowledge map",
    url: "https://runedra.cn",
    image: runedraImage,
    accent: "#9E845E",
    metrics: [
      { label: "学习路径", value: "Graph", note: "知识关系可视化" },
      { label: "推荐", value: "RAG", note: "按上下文生成" },
      { label: "记忆", value: "Memory", note: "长期学习记录" },
    ],
    brief:
      "面向任意领域学习的知识路径产品，把用户的兴趣、资料、问答和练习过程沉淀为可推进的学习图谱。通过 RAG、Memory 与多模态内容理解，把一次性的搜索行为转化为持续更新的技能成长路线。",
    problems: [
      { title: "从意图到路径的结构化", desc: "学习者通常只有模糊兴趣，很难判断先学什么、如何推进、何时复盘。Runedra 将目标拆解为知识节点、前置关系与练习任务，用图谱方式呈现学习路线，降低进入陌生领域的决策成本。" },
      { title: "资料理解与长期记忆", desc: "结合 NotebookLM / OpenAI 一类的内容理解能力，将网页、笔记、问答和用户反馈抽取成可检索上下文；通过 RAG 与分层 Memory 保存关键概念、偏好和阶段成果，避免每次学习都重新组织资料。" },
      { title: "渐进式反馈与作品化沉淀", desc: "围绕节点完成度、练习结果和复盘记录生成下一步建议，把学习过程从被动阅读变成可交互的任务流。最终产出不仅是笔记，而是一套能持续扩展、复用和展示的个人知识体系。" },
    ],
    stackGroups: [
      { type: "AI", icons: ["ph:sparkle-fill", "ph:brain-fill", "ph:magnifying-glass-fill"] },
      { type: "Graph", icons: ["ph:tree-structure-fill", "ph:circles-four-fill"] },
      { type: "Web", icons: ["ph:globe-fill", "ph:database-fill"] },
    ],
  },
  {
    slug: "wow-magician",
    title: "WoW Magician",
    label: "Raid planner",
    url: "https://wow.parallized.cn",
    image: wowMagicianImage,
    accent: "#7C8E9F",
    metrics: [
      { label: "排轴", value: "3s", note: "AI 生成战术稿" },
      { label: "路径", value: "<5ms", note: "地图查询响应" },
      { label: "协同", value: "Raid", note: "团队实时调整" },
    ],
    brief:
      "为魔兽团本做战术板，把时间轴、站位、技能和 AI 建议压进一个高密度界面。",
    problems: [
      { title: "维护成本", desc: "手写 MRT 成本高" },
      { title: "信息分散", desc: "战术信息分散" },
      { title: "流程合并", desc: "用规则和 AI 合并排轴流程" },
    ],
    stackGroups: [
      { type: "Game", icons: ["ph:game-controller-fill", "ph:map-trifold-fill"] },
      { type: "Engine", icons: ["ph:magic-wand-fill", "ph:chart-line-up-fill"] },
      { type: "Infra", icons: ["ph:database-fill", "ph:cube-transparent-fill"] },
    ],
  },
  {
    slug: "wow-raid-plus",
    title: "WoW Raid Plus",
    label: "Raid utility",
    url: "https://wowraidplus.parallized.cn",
    image: wowRaidPlusImage,
    accent: "#A47A72",
    metrics: [
      { label: "团队入口", value: "Guild", note: "内容聚合" },
      { label: "资料", value: "Raid", note: "副本信息归档" },
      { label: "视觉", value: "Dark", note: "沉浸式呈现" },
    ],
    brief:
      "为公会内容做一个更像产品的入口，让阵容、攻略、归档和活动信息更容易被扫描。",
    problems: [
      { title: "层级扁平", desc: "资料页缺少层级" },
      { title: "氛围缺失", desc: "游戏氛围难保留" },
      { title: "沉浸架构", desc: "用暗色信息架构承接内容" },
    ],
    stackGroups: [
      { type: "Web", icons: ["ph:globe-fill", "ph:cards-fill", "ph:code-fill"] },
      { type: "UX", icons: ["ph:users-three-fill", "ph:list-checks-fill"] },
      { type: "Visual", icons: ["ph:monitor-fill", "ph:magic-wand-fill"] },
    ],
  },
  {
    slug: "owocaptain",
    title: "OwOcaptain",
    label: "Map guide",
    url: "https://owo.parallized.cn",
    image: owocaptainImage,
    accent: "#8C9A86",
    metrics: [
      { label: "查询", value: "30s", note: "赛前快速确认" },
      { label: "地图", value: "Route", note: "点位与动线" },
      { label: "角色", value: "Hero", note: "按定位组织" },
    ],
    brief:
      "面向守望先锋实战准备，把地图点位、动线和英雄定位整理成快速参考。",
    problems: [
      { title: "检索低效", desc: "视频攻略不适合赛前查" },
      { title: "认知差异", desc: "点位命名不统一" },
      { title: "空间组织", desc: "用地图视角组织信息" },
    ],
    stackGroups: [
      { type: "Map", icons: ["ph:map-trifold-fill", "ph:strategy-fill"] },
      { type: "Game", icons: ["ph:game-controller-fill", "ph:crosshair-fill"] },
      { type: "Web", icons: ["ph:browser-fill", "ph:cards-fill"] },
    ],
  },
  {
    slug: "ash-iris",
    title: "Ash Iris",
    label: "Identity",
    url: "https://parallized.cn",
    image: ashIrisImage,
    accent: "#8A867B",
    metrics: [
      { label: "站点", value: "v3", note: "长期迭代" },
      { label: "简历", value: "PDF", note: "可打印输出" },
      { label: "作品", value: "Board", note: "项目统一展示" },
    ],
    brief:
      "把个人站、作品集和简历合成一个稳定的身份入口，减少重复维护。",
    problems: [
      { title: "信息碎片", desc: "作品信息分散" },
      { title: "身份割裂", desc: "简历和站点割裂" },
      { title: "统一模型", desc: "用统一内容模型承接展示" },
    ],
    stackGroups: [
      { type: "Front", icons: ["ph:globe-fill", "ph:code-fill", "ph:sparkle-fill"] },
      { type: "Motion", icons: ["ph:bounding-box-fill", "ph:magic-wand-fill"] },
      { type: "Docs", icons: ["ph:file-text-fill", "ph:printer-fill"] },
    ],
  },
];

const stackIconName = (icon: StackIcon) =>
  typeof icon === "string" ? icon : icon.name;

const stackIconLabel = (icon: StackIcon, fallback: string) =>
  typeof icon === "string" ? fallback : icon.label;

const stackIconColor = (icon: StackIcon) =>
  typeof icon === "string" ? undefined : icon.color;

const stickerSlots: StickerSlot[] = [
  { x: -20, y: 8, rotate: 14, scale: 0.92 },
  { x: -65, y: 26, rotate: -6, scale: 1.0 },
  { x: -105, y: 44, rotate: 8, scale: 0.96 },
  { x: -150, y: 56, rotate: -4, scale: 1.08 },
  { x: -195, y: 46, rotate: 12, scale: 0.98 },
  { x: -240, y: 28, rotate: -8, scale: 1.04 },
  { x: -280, y: 12, rotate: -15, scale: 0.9 },
  { x: -155, y: 15, rotate: 5, scale: 0.88 },
];

const activeIndex = ref(0);
const scrollProgress = ref(0);
const boardPage = ref<HTMLElement | null>(null);
const { $lenis } = useNuxtApp();
let cancelLenisScroll: (() => void) | undefined;
let syncFrame: number | undefined;

const activeProject = computed(() => projects[activeIndex.value] ?? projects[0]);
const activeStackStickers = computed<StackSticker[]>(() =>
  activeProject.value.stackGroups.flatMap((group) =>
    group.icons.map((icon) => ({
      name: stackIconName(icon),
      label: stackIconLabel(icon, group.type),
      color: stackIconColor(icon),
    })),
  ),
);
const stageStyle = computed(() => ({
  "--stage-scroll": `${Math.max(1, projects.length - 1) * 180}px`,
}));
const railStyle = computed(() => ({
  "--rail-progress": scrollProgress.value.toFixed(4),
}));

const stickerStyle = (index: number, sticker: StackSticker) => {
  const slot = stickerSlots[index % stickerSlots.length];

  const style: Record<string, string> = {
    "--sticker-x": `${slot.x}px`,
    "--sticker-y": `${-slot.y}px`,
    "--sticker-rotate": `${slot.rotate}deg`,
    "--sticker-scale": slot.scale.toString(),
    "--sticker-z": (10 + Math.round(slot.y) + index).toString(),
  };

  if (sticker.color) {
    style["color"] = sticker.color;
  }

  return style;
};

useHead({
  title: "Board | Greater Bread",
});

const setActiveProject = (index: number) => {
  const nextIndex = (index + projects.length) % projects.length;
  const page = boardPage.value;

  if (!page) {
    activeIndex.value = nextIndex;
    scrollProgress.value = nextIndex;
    return;
  }

  const maxScroll = Math.max(1, page.offsetHeight - window.innerHeight);
  const target =
    page.offsetTop +
    (nextIndex / Math.max(1, projects.length - 1)) * maxScroll;

  if ($lenis) {
    $lenis.scrollTo(target, {
      duration: 0.82,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }

  window.scrollTo({ top: target, behavior: "smooth" });
};

const moveProject = (direction: 1 | -1) => {
  setActiveProject(activeIndex.value + direction);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    event.preventDefault();
    moveProject(1);
  }

  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    event.preventDefault();
    moveProject(-1);
  }
};

const syncScrollState = () => {
  const page = boardPage.value;
  if (!page) return;

  const maxScroll = Math.max(1, page.offsetHeight - window.innerHeight);
  const progress = Math.min(
    1,
    Math.max(0, -page.getBoundingClientRect().top / maxScroll),
  );
  const floatingIndex = progress * Math.max(1, projects.length - 1);

  scrollProgress.value = floatingIndex;
  activeIndex.value = Math.min(
    projects.length - 1,
    Math.max(0, Math.round(floatingIndex)),
  );
};

const scheduleSyncScrollState = () => {
  if (syncFrame !== undefined) return;

  syncFrame = requestAnimationFrame(() => {
    syncFrame = undefined;
    syncScrollState();
  });
};

onMounted(() => {
  document.documentElement.classList.remove("board-lock");
  document.documentElement.classList.add("board-hide-scrollbar");
  $lenis?.start();
  $lenis?.resize();
  cancelLenisScroll = $lenis?.on("scroll", syncScrollState);
  window.addEventListener("scroll", scheduleSyncScrollState, { passive: true });
  window.addEventListener("resize", scheduleSyncScrollState, { passive: true });
  window.addEventListener("keydown", handleKeydown, true);
  requestAnimationFrame(syncScrollState);
});

onBeforeUnmount(() => {
  document.documentElement.classList.remove("board-hide-scrollbar");
  cancelLenisScroll?.();
  if (syncFrame !== undefined) cancelAnimationFrame(syncFrame);
  window.removeEventListener("scroll", scheduleSyncScrollState);
  window.removeEventListener("resize", scheduleSyncScrollState);
  window.removeEventListener("keydown", handleKeydown, true);
});
</script>

<template>
  <div ref="boardPage" class="board-page" :style="stageStyle">
    <div class="board-shell">
      <section
        class="board-grid"
        :style="{ '--active-accent': activeProject.accent }"
        aria-label="Project details"
      >
        <article class="cv-card">
          <Transition name="text-stagger">
            <div :key="activeProject.slug" class="cv-card-inner">
              <header class="cv-header">
                <div class="cv-title-row">
                  <h1 class="cv-title">{{ activeProject.title }}</h1>
                  <div class="cv-title-line"></div>
                </div>
                <p class="cv-label">{{ activeProject.label }}</p>
              </header>
              <div class="cv-body">
                <p class="cv-brief">{{ activeProject.brief }}</p>
                <ul class="cv-list">
                  <li v-for="item in activeProject.problems" :key="item.title">
                    <strong>{{ item.title }}</strong>：{{ item.desc }}
                  </li>
                </ul>
              </div>
            </div>
          </Transition>
        </article>

        <div class="board-visual-block">
          <div class="relative h-5">
            <Transition name="link-fade">
              <a
                v-if="activeProject.url"
                :key="`link-${activeProject.slug}`"
                :href="activeProject.url"
                target="_blank"
                class="absolute left-0 top-0 flex w-fit items-center gap-1.5 font-mono text-[13px] font-medium tracking-wide text-neutral-500 transition-colors hover:text-neutral-900"
              >
                <Icon name="ph:arrow-square-out-bold" class="text-[14px] opacity-80" />
                <span>{{ activeProject.url.replace(/^https?:\/\//, '').replace(/\/$/, '') }}</span>
              </a>
            </Transition>
          </div>

          <div class="image-dock-stage">
            <Transition name="stack-pile-fade" :duration="{ enter: 1000, leave: 400 }">
              <div
                :key="`stack-${activeProject.slug}`"
                class="stack-pile-stage"
                aria-label="Project stack"
              >
                <div class="stack-pile" aria-hidden="true">
                  <div
                    v-for="(sticker, index) in activeStackStickers"
                    :key="`${activeProject.slug}-${sticker.name}`"
                    class="stack-sticker"
                    :style="stickerStyle(index, sticker)"
                    :title="sticker.label"
                  >
                    <Icon :name="sticker.name" class="stack-sticker-icon" />
                  </div>
                </div>
              </div>
            </Transition>

            <article class="image-card">
              <Transition name="img-brightness" :duration="{ enter: 480, leave: 360 }">
                <div
                  :key="activeProject.slug"
                  class="image-frame-set"
                  :class="{ 'image-frame-set-pair': activeProject.sideImage }"
                >
                  <figure
                    v-if="activeProject.sideImage"
                    class="image-frame image-frame-secondary"
                  >
                    <img
                      :src="activeProject.sideImage"
                      :alt="`${activeProject.title} secondary screenshot`"
                      loading="eager"
                      decoding="async"
                    />
                  </figure>
                  <figure class="image-frame image-frame-primary">
                    <img
                      :src="activeProject.image"
                      :alt="`${activeProject.title} screenshot`"
                      loading="eager"
                      decoding="async"
                    />
                  </figure>
                </div>
              </Transition>
            </article>
          </div>
        </div>
      </section>

      <aside class="board-rail" :style="railStyle" aria-label="Project board">
        <div class="rail-viewport">
          <div class="rail-orb" aria-hidden="true"></div>
          <div class="rail-track">
            <button
              v-for="(project, index) in projects"
              :key="project.slug"
              type="button"
              class="rail-shot"
              :aria-label="`Show ${project.title}`"
              :aria-current="activeIndex === index"
              @click="setActiveProject(index)"
            >
              <img
                :src="project.image"
                :alt="`${project.title} screenshot`"
                loading="lazy"
                decoding="async"
              />
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+SC:wght@400;500;600;700;900&family=Noto+Serif+SC:wght@400;600;700&display=swap');

:global(html.board-hide-scrollbar),
:global(html.board-hide-scrollbar body) {
  scrollbar-width: none;
}

:global(html.board-hide-scrollbar::-webkit-scrollbar),
:global(html.board-hide-scrollbar body::-webkit-scrollbar) {
  display: none;
  width: 0;
  height: 0;
}

.board-page {
  --stage-scroll: 1100px;
  width: 100%;
  min-height: calc(100vh + var(--stage-scroll));
  background: #f1f1ee;
  color: #20211f;
}

@supports (height: 100svh) {
  .board-page {
    min-height: calc(100svh + var(--stage-scroll));
  }
}

.board-shell {
  --page-pad: clamp(18px, 3vw, 44px);
  --nav-offset: 0px;
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(88px, 8vw);
  gap: clamp(14px, 2.6vw, 40px);
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: calc(var(--nav-offset) + var(--page-pad)) var(--page-pad) 0;
}

@supports (height: 100svh) {
  .board-shell {
    height: 100svh;
  }
}

.board-rail,
.rail-viewport {
  min-height: 0;
  overflow: visible;
  z-index: 10;
}

.rail-viewport {
  --shot-width: clamp(76px, 8vw, 104px);
  --shot-height: clamp(54px, 10vh, 82px);
  --shot-gap: clamp(8px, 1.5vh, 14px);
  position: relative;
  height: 100%;
}

.rail-track {
  position: absolute;
  right: 0;
  left: auto;
  top: 50%;
  display: grid;
  gap: var(--shot-gap);
  width: var(--shot-width);
  transform: translate3d(
    0,
    calc(
      -1 * var(--rail-progress) *
        (var(--shot-height) + var(--shot-gap)) - var(--shot-height) / 2
    ),
    0
  );
  transition: transform 80ms linear;
  will-change: transform;
}

.rail-shot {
  width: 100%;
  height: var(--shot-height);
  overflow: hidden;
  border: 0;
  border-radius: 6px;
  background: #d8d8d3;
  padding: 0;
  cursor: pointer;
}

.rail-shot img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rail-orb {
  position: absolute;
  top: 50%;
  right: calc(var(--shot-width) + 16px);
  left: auto;
  z-index: 12;
  width: 8px;
  height: 8px;
  border: 0;
  border-radius: 50%;
  background: #11110f;
  box-shadow: none;
  transform: translateY(-50%);
  aspect-ratio: 1;
}

.board-grid {
  --active-accent: #8ba264;
  display: flex;
  flex-direction: column;
  gap: clamp(30px, 4vh, 60px);
  min-width: 0;
  min-height: 0;
  padding: 0 clamp(40px, 6vw, 100px);
  height: 100%;
}

.board-visual-block {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-top: auto;
}

.image-dock-stage {
  --stack-overlap: clamp(26px, 3.2vh, 38px);
  position: relative;
  width: 100%;
  isolation: isolate;
}

.image-card {
  flex: none;
  position: relative;
  z-index: 2;
  width: 100%;
  height: 42vh;
}

.image-frame-set {
  --image-brightness: 1;
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(14px, 1.4vw, 24px);
  width: 100%;
  height: 100%;
  background: #f1f1ee;
}

.image-frame-set-pair {
  grid-template-columns: minmax(0, 38.2fr) minmax(0, 61.8fr);
}

.image-frame {
  position: relative;
  min-width: 0;
  height: 100%;
  margin: 0;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
  clip-path: inset(0 round 24px 24px 0 0);
  box-shadow: 0 20px 80px rgb(0 0 0 / 12%);
  background: #151515;
}

.image-frame img {
  display: block;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(var(--image-brightness)) saturate(0.92) contrast(0.96);
  transition:
    transform 840ms cubic-bezier(0.19, 1, 0.22, 1),
    filter 480ms cubic-bezier(0.3, 0, 0.2, 1);
}

.image-frame-secondary img {
  padding: clamp(8px, 1.1vw, 16px);
  object-fit: contain;
}

.image-card:hover .image-frame img {
  filter: brightness(var(--image-brightness)) saturate(1) contrast(1);
  transform: scale(1.025);
}

.image-card .img-brightness-enter-active {
  z-index: 2;
}

.image-card .img-brightness-leave-active {
  z-index: 1;
  pointer-events: none;
}

.image-card .img-brightness-enter-from {
  --image-brightness: 0.72;
}

.image-card .img-brightness-leave-to {
  --image-brightness: 1.12;
}

.link-fade-enter-active,
.link-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
  position: absolute;
}

.link-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.link-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.stack-pile-stage {
  position: absolute;
  top: 0;
  right: clamp(28px, 5vw, 84px);
  z-index: 1;
  width: min(72%, clamp(420px, 54vw, 780px));
  height: clamp(96px, 12vh, 136px);
  margin: 0;
  overflow: visible;
  pointer-events: none;
  translate: 0 calc(-100% + var(--stack-overlap));
}

.stack-pile {
  position: absolute;
  bottom: 0;
  right: 0;
  width: min(100%, 560px);
  height: 132px;
  transform-origin: right bottom;
}

.stack-sticker {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: var(--sticker-z);
  width: 64px;
  height: 64px;
  color: #20211f;
  opacity: 0.7;
  transform: translate3d(
      var(--sticker-x),
      var(--sticker-y),
      0
    )
    rotate(var(--sticker-rotate))
    scale(var(--sticker-scale));
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.stack-sticker:hover {
  opacity: 1;
  transform: translate3d(
      var(--sticker-x),
      calc(var(--sticker-y) - 6px),
      0
    )
    rotate(var(--sticker-rotate))
    scale(calc(var(--sticker-scale) * 1.05));
  z-index: 50;
}

.stack-sticker-icon {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform-origin: center;
}

.stack-pile-fade-enter-active {
  transition: opacity 0.4s ease, filter 0.4s ease;
}

.stack-pile-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease, filter 0.4s ease;
}

.stack-pile-fade-enter-from {
  opacity: 0;
  filter: blur(8px);
}

.stack-pile-fade-enter-active .stack-sticker {
  animation: sticker-burst 0.7s both;
}
.stack-pile-fade-enter-active .stack-sticker:nth-child(1) { animation-delay: 0.00s; }
.stack-pile-fade-enter-active .stack-sticker:nth-child(2) { animation-delay: 0.04s; }
.stack-pile-fade-enter-active .stack-sticker:nth-child(3) { animation-delay: 0.08s; }
.stack-pile-fade-enter-active .stack-sticker:nth-child(4) { animation-delay: 0.12s; }
.stack-pile-fade-enter-active .stack-sticker:nth-child(5) { animation-delay: 0.16s; }
.stack-pile-fade-enter-active .stack-sticker:nth-child(6) { animation-delay: 0.20s; }
.stack-pile-fade-enter-active .stack-sticker:nth-child(7) { animation-delay: 0.24s; }
.stack-pile-fade-enter-active .stack-sticker:nth-child(8) { animation-delay: 0.28s; }

.stack-pile-fade-leave-to {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(-10px);
}

@keyframes sticker-burst {
  0% {
    opacity: 0;
    transform: translate3d(
        calc(-155px + (var(--sticker-x) + 155px) * 0.1),
        calc(-28px + (var(--sticker-y) + 28px) * 0.1),
        0
      )
      rotate(calc(var(--sticker-rotate) * 0.1))
      scale(var(--sticker-scale));
    animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
  }
  30% {
    opacity: 0.8;
    transform: translate3d(
        calc(-155px + (var(--sticker-x) + 155px) * 1.1),
        calc(-28px + (var(--sticker-y) + 28px) * 1.1),
        0
      )
      rotate(calc(var(--sticker-rotate) * 1.1))
      scale(var(--sticker-scale));
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    opacity: 0.7;
    transform: translate3d(
        var(--sticker-x),
        var(--sticker-y),
        0
      )
      rotate(var(--sticker-rotate))
      scale(var(--sticker-scale));
  }
}

.cv-card {
  position: relative;
  flex: none;
  max-width: 85%;
}

.cv-card-inner {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: clamp(20px, 3vw, 40px);
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  padding-right: 2vw;
  padding-top: clamp(20px, 4vh, 60px);
  width: 100%;
}

.cv-header {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.5vw, 20px);
}

.cv-title-row {
  display: flex;
  align-items: center;
  gap: clamp(16px, 3vw, 32px);
}

.cv-title {
  margin: 0;
  color: #20211f;
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.cv-title-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, #20211f9f 0%, var(--active-accent) 40%, transparent 100%);
  border-radius: 2px;
  opacity: 0.8;
}

.cv-label {
  margin: 0;
  color: #8c8f87;
  font-size: clamp(13px, 1vw, 15px);
  font-weight: 400;
  letter-spacing: 0.04em;
}

.cv-body {
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2vw, 28px);
}

.cv-brief {
  margin: 0;
  color: #262824;
  font-size: clamp(14px, 1.15vw, 16px);
  font-weight: 400;
  line-height: 1.8;
  text-align: justify;
}

.cv-list {
  margin: 0;
  padding: 0 0 0 24px;
  list-style: square;
  color: #62655e;
  font-size: clamp(14px, 1.1vw, 15px);
  line-height: 1.8;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cv-list li::marker {
  color: var(--active-accent);
}

.cv-list li strong {
  color: #20211f;
  font-weight: 700;
}

.text-stagger-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 0.3s ease, filter 0.3s ease;
  z-index: 1;
}

.text-stagger-leave-to {
  opacity: 0;
  filter: blur(8px);
}

.text-stagger-enter-active {
  transition: opacity 0.6s ease;
  z-index: 2;
}

.text-stagger-enter-from {
  opacity: 0;
}

.text-stagger-enter-active .cv-title {
  animation: blurSlideUp 0.6s cubic-bezier(0.3, 0, 0.2, 1) both;
}

.text-stagger-enter-active .cv-brief {
  animation: blurSlideUp 0.6s cubic-bezier(0.3, 0, 0.2, 1) 0.05s both;
}

.text-stagger-enter-active .cv-list li:nth-child(1) {
  animation: blurSlideUp 0.6s cubic-bezier(0.3, 0, 0.2, 1) 0.1s both;
}

.text-stagger-enter-active .cv-list li:nth-child(2) {
  animation: blurSlideUp 0.6s cubic-bezier(0.3, 0, 0.2, 1) 0.15s both;
}

.text-stagger-enter-active .cv-list li:nth-child(3) {
  animation: blurSlideUp 0.6s cubic-bezier(0.3, 0, 0.2, 1) 0.2s both;
}

@keyframes blurSlideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@media (max-width: 920px) {
  .board-shell {
    --page-pad: 16px;
    grid-template-columns: minmax(0, 1fr) minmax(58px, 16vw);
    grid-template-rows: minmax(0, 1fr);
    gap: 10px;
  }

  .board-grid {
    flex-direction: column;
    padding: 0;
    gap: 30px;
  }

  .cv-card {
    padding-right: 0;
  }

  .image-dock-stage {
    --stack-overlap: 28px;
  }

  .image-card {
    border-radius: 20px;
    height: 40vh;
    width: 100%;
  }

  .stack-pile-stage {
    right: 0;
    width: 100%;
    height: 72px;
  }

  .stack-pile {
    width: min(100%, 480px);
    height: 96px;
    transform: scale(0.76);
  }

  .rail-viewport {
    --shot-width: min(58px, 14vw);
    --shot-height: 52px;
    --shot-gap: 8px;
  }

  .rail-track {
    left: 0;
    top: 50%;
    display: grid;
    width: var(--shot-width);
    height: auto;
    transform: translate3d(
      0,
      calc(
        -1 * var(--rail-progress) *
          (var(--shot-height) + var(--shot-gap)) - var(--shot-height) / 2
      ),
      0
    );
  }

  .rail-shot {
    width: 100%;
  }

  .rail-orb {
    right: calc(var(--shot-width) + 6px);
    left: auto;
    top: 50%;
    bottom: auto;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transform: translateY(-50%);
    aspect-ratio: 1;
  }
}

@media (max-width: 560px) {
  .board-shell {
    --page-pad: 12px;
    grid-template-columns: minmax(0, 1fr) minmax(50px, 15vw);
    gap: 8px;
  }

  .rail-viewport {
    --shot-width: min(50px, 13vw);
    --shot-height: 44px;
    --shot-gap: 7px;
  }

  .board-grid {
    gap: 20px;
  }

  .image-dock-stage {
    --stack-overlap: 20px;
  }

  .image-card {
    border-radius: 16px;
    height: 35vh;
  }

  .stack-pile-stage {
    height: 54px;
  }

  .stack-pile {
    transform: scale(0.58);
  }
}
</style>
