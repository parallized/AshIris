<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import ashIrisImage from "~/assets/image/board/ash-iris.webp";
import mapleImage from "~/assets/image/board/maple-overview.png";
import owocaptainImage from "~/assets/image/board/owocaptain.webp";
import runedraImage from "~/assets/image/board/runedra-concept.png";
import wowMagicianImage from "~/assets/image/board/wow-magician.webp";
import wowRaidPlusImage from "~/assets/image/board/wow-raid-plus.webp";

interface BoardProject {
  slug: string;
  title: string;
  label: string;
  image: string;
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
    icons: string[];
  }>;
}

const projects: BoardProject[] = [
  {
    slug: "maple",
    title: "Maple",
    label: "基于 MCP 通路的多 Code Agent 与 SDD 管理看板",
    image: mapleImage,
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
      { type: "App", icons: ["ph:monitor-fill", "ph:code-fill", "ph:terminal-window-fill"] },
      { type: "Agent", icons: ["ph:robot-fill", "ph:list-checks-fill", "ph:git-branch-fill"] },
      { type: "Data", icons: ["ph:database-fill", "ph:file-text-fill"] },
    ],
  },
  {
    slug: "runedra",
    title: "Runedra 知树",
    label: "Knowledge map",
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

const activeIndex = ref(0);
const scrollProgress = ref(0);
const boardPage = ref<HTMLElement | null>(null);
const { $lenis } = useNuxtApp();
let cancelLenisScroll: (() => void) | undefined;
let syncFrame: number | undefined;

const activeProject = computed(() => projects[activeIndex.value] ?? projects[0]);
const stageStyle = computed(() => ({
  "--stage-scroll": `${Math.max(1, projects.length - 1) * 180}px`,
}));
const railStyle = computed(() => ({
  "--rail-progress": scrollProgress.value.toFixed(4),
}));

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

      <section
        class="board-grid"
        :style="{ '--active-accent': activeProject.accent }"
        aria-label="Project screenshots"
      >
        <article class="grid-card tile-1 data-card">
          <header class="card-header">
            <span>Core data</span>
            <strong>{{ activeProject.title }}</strong>
          </header>
          <ul class="metric-list">
            <li v-for="metric in activeProject.metrics" :key="metric.label">
              <b>{{ metric.value }}</b>
              <span>{{ metric.label }}</span>
              <small>{{ metric.note }}</small>
            </li>
          </ul>
        </article>

        <article class="grid-card tile-2 cv-card">
          <header class="cv-header">
            <h3 class="cv-title">
              {{ activeProject.title }}
              <span class="cv-divider">|</span>
              <span class="cv-label">{{ activeProject.label }}</span>
            </h3>
          </header>
          <div class="cv-body">
            <p class="cv-brief">{{ activeProject.brief }}</p>
            <ul class="cv-list">
              <li v-for="item in activeProject.problems" :key="item.title">
                <strong>{{ item.title }}</strong>：{{ item.desc }}
              </li>
            </ul>
          </div>
        </article>

        <article class="grid-card tile-3 image-card">
          <img
            :src="activeProject.image"
            :alt="`${activeProject.title} screenshot`"
            loading="eager"
            decoding="async"
          />
        </article>

        <article class="grid-card tile-4 stack-card">
          <header class="card-header">
            <span>Stack</span>
            <strong>Groups</strong>
          </header>
          <div class="stack-groups">
            <section
              v-for="group in activeProject.stackGroups"
              :key="group.type"
              class="stack-group"
            >
              <p>{{ group.type }}</p>
              <div class="icon-row">
                <Icon
                  v-for="icon in group.icons"
                  :key="icon"
                  :name="icon"
                  aria-hidden="true"
                />
              </div>
            </section>
          </div>
        </article>
      </section>
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
  grid-template-columns: minmax(88px, 12vw) minmax(0, 1fr);
  gap: clamp(14px, 2.6vw, 40px);
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: calc(var(--nav-offset) + var(--page-pad)) var(--page-pad)
    var(--page-pad);
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
  left: 0;
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
  border-radius: 2px;
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
  left: calc(var(--shot-width) + 10px);
  z-index: 2;
  width: 10px;
  height: 10px;
  border: 0;
  border-radius: 999px;
  background: #11110f;
  box-shadow: none;
  transform: translateY(-50%);
}

.board-grid {
  --active-accent: #8ba264;
  display: grid;
  min-width: 0;
  min-height: 0;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.05fr) minmax(0, 1.05fr);
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(10px, 1.6vw, 18px);
}

.grid-card {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgb(32 33 31 / 8%);
  background: #deded8;
  box-shadow: 0 24px 80px rgb(32 33 31 / 8%);
}

.data-card,
.cv-card,
.stack-card {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.8vw, 22px);
  padding: clamp(16px, 2.3vw, 28px);
}

.tile-1 {
  grid-column: 1;
  grid-row: 1;
}

.tile-2 {
  grid-column: 2 / 4;
  grid-row: 1;
}

.tile-3 {
  grid-column: 1 / 3;
  grid-row: 2;
}

.tile-4 {
  grid-column: 3;
  grid-row: 2;
}

.image-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.92) contrast(0.96);
  transition:
    transform 840ms cubic-bezier(0.19, 1, 0.22, 1),
    filter 360ms ease;
}

.image-card:hover img {
  filter: saturate(1) contrast(1);
  transform: scale(1.025);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.card-header span {
  color: #73766f;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.card-header strong {
  overflow: hidden;
  max-width: 62%;
  color: #20211f;
  font-size: clamp(14px, 1.2vw, 18px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.01em;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.metric-list,
.problem-list {
  display: grid;
  gap: clamp(8px, 1.2vw, 12px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.metric-list li {
  display: grid;
  grid-template-columns: minmax(56px, 0.38fr) minmax(0, 0.62fr);
  column-gap: 12px;
  row-gap: 5px;
  align-items: baseline;
  border-top: 1px solid rgb(32 33 31 / 9%);
  padding-top: clamp(8px, 1.2vw, 12px);
}

.metric-list li:first-child {
  border-top: 0;
  padding-top: 0;
}

.metric-list b {
  color: #20211f;
  font-size: clamp(20px, 2.8vw, 42px);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.03em;
}

.metric-list span {
  color: #20211f;
  font-size: clamp(13px, 1.25vw, 17px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0;
}

.metric-list small {
  grid-column: 2;
  color: #62655e;
  font-size: clamp(10px, 0.85vw, 12px);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: 0;
}

.cv-card {
  justify-content: flex-start;
  background:
    linear-gradient(135deg, rgb(255 255 255 / 60%), rgb(255 255 255 / 20%)),
    #deded8;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
}

.cv-header {
  border-bottom: 2px solid #20211f16;
  padding-bottom: clamp(12px, 1.5vw, 16px);
}

.cv-title {
  margin: 0;
  color: #20211f;
  font-size: clamp(16px, 1.5vw, 22px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.5px;
}

.cv-divider {
  margin: 0 10px;
  color: rgb(32 33 31 / 30%);
  font-weight: 400;
}

.cv-label {
  color: #4a4d47;
  font-size: clamp(14px, 1.2vw, 18px);
  font-weight: 600;
}

.cv-body {
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1.2vw, 16px);
}

.cv-brief {
  margin: 0;
  color: #262824;
  font-size: clamp(13px, 1vw, 15px);
  font-weight: 400;
  line-height: 1.7;
  text-align: justify;
}

.cv-list {
  margin: 0;
  padding: 0 0 0 20px;
  list-style: square;
  color: #343631;
  font-size: clamp(12px, 0.9vw, 14px);
  line-height: 1.8;
}

.cv-list li::marker {
  color: var(--active-accent);
}

.cv-list li strong {
  color: #20211f;
  font-weight: 700;
}

.stack-groups {
  display: grid;
  gap: clamp(10px, 1.5vw, 16px);
}

.stack-group {
  display: grid;
  gap: 10px;
  border-top: 1px solid rgb(32 33 31 / 9%);
  padding-top: clamp(10px, 1.4vw, 14px);
}

.stack-group:first-child {
  border-top: 0;
  padding-top: 0;
}

.stack-group p {
  margin: 0;
  color: #62655e;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.icon-row {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  color: #20211f;
}

.icon-row :deep(svg) {
  width: clamp(22px, 2.1vw, 30px);
  height: clamp(22px, 2.1vw, 30px);
}

@media (max-width: 920px) {
  .board-shell {
    --page-pad: 16px;
    grid-template-columns: minmax(58px, 16vw) minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    gap: 10px;
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
    left: calc(var(--shot-width) + 6px);
    top: 50%;
    bottom: auto;
    width: 10px;
    height: 10px;
    transform: translateY(-50%);
  }

  .data-card,
  .cv-card,
  .stack-card {
    padding: 14px;
  }
}

@media (max-width: 560px) {
  .board-shell {
    --page-pad: 12px;
    grid-template-columns: minmax(50px, 15vw) minmax(0, 1fr);
    gap: 8px;
  }

  .rail-viewport {
    --shot-width: min(50px, 13vw);
    --shot-height: 44px;
    --shot-gap: 7px;
  }

  .board-grid {
    gap: 8px;
  }

  .data-card,
  .cv-card,
  .stack-card {
    gap: 10px;
    padding: 10px;
  }

  .card-header {
    display: grid;
    gap: 6px;
  }

  .card-header strong {
    max-width: 100%;
    text-align: left;
  }

  .metric-list li {
    grid-template-columns: 1fr;
    gap: 3px;
  }

  .metric-list small {
    grid-column: auto;
  }

  .metric-list b {
    font-size: clamp(17px, 5.4vw, 22px);
  }

  .metric-list span {
    font-size: clamp(11px, 3.2vw, 13px);
  }



  .stack-group {
    gap: 7px;
  }

  .icon-row {
    gap: 7px;
  }
}
</style>
