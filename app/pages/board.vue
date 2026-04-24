<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import ashIrisImage from "~/assets/image/board/ash-iris.webp";
import mapleImage from "~/assets/image/board/maple.webp";
import owocaptainImage from "~/assets/image/board/owocaptain.webp";
import runedraImage from "~/assets/image/board/runedra.webp";
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
  problems: string[];
  stackGroups: Array<{
    type: string;
    icons: string[];
  }>;
}

const projects: BoardProject[] = [
  {
    slug: "maple",
    title: "Maple",
    label: "Task board",
    image: mapleImage,
    accent: "#8BA264",
    metrics: [
      { label: "协作状态", value: "Trace", note: "Worker 进度可回看" },
      { label: "任务入口", value: "SDD", note: "文档转看板" },
      { label: "回写链路", value: "Auto", note: "报告自动归档" },
    ],
    brief:
      "为 AI 编码流程做一个可视任务中枢，把 SDD、Worker 状态和报告回写放在同一张板上。",
    problems: ["状态散落在终端与文档里", "多 Agent 输出难追踪", "用轻量看板统一入口"],
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
      "把搜索、资料和学习进度整理成知识图谱，避免每次学习都从零开始找资料。",
    problems: ["知识点之间缺少结构", "推荐内容容易断层", "用图谱和记忆串起路径"],
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
    problems: ["手写 MRT 成本高", "战术信息分散", "用规则和 AI 合并排轴流程"],
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
    problems: ["资料页缺少层级", "游戏氛围难保留", "用暗色信息架构承接内容"],
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
    problems: ["视频攻略不适合赛前查", "点位命名不统一", "用地图视角组织信息"],
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
    problems: ["作品信息分散", "简历和站点割裂", "用统一内容模型承接展示"],
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

        <article class="grid-card tile-2 story-card">
          <header class="card-header">
            <span>Why</span>
            <strong>{{ activeProject.label }}</strong>
          </header>
          <p>{{ activeProject.brief }}</p>
          <ul class="problem-list">
            <li v-for="item in activeProject.problems" :key="item">
              {{ item }}
            </li>
          </ul>
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
.story-card,
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
  font-weight: 650;
  line-height: 1;
  letter-spacing: 0;
  text-transform: uppercase;
}

.card-header strong {
  overflow: hidden;
  max-width: 62%;
  color: #20211f;
  font-size: clamp(14px, 1.2vw, 18px);
  font-weight: 650;
  line-height: 1;
  letter-spacing: 0;
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
  font-weight: 680;
  line-height: 0.9;
  letter-spacing: 0;
}

.metric-list span {
  color: #343631;
  font-size: clamp(13px, 1.25vw, 17px);
  font-weight: 650;
  line-height: 1.1;
  letter-spacing: 0;
}

.metric-list small {
  grid-column: 2;
  color: #777970;
  font-size: clamp(10px, 0.85vw, 12px);
  font-weight: 520;
  line-height: 1.3;
  letter-spacing: 0;
}

.story-card {
  justify-content: space-between;
  background:
    linear-gradient(135deg, rgb(255 255 255 / 50%), rgb(255 255 255 / 24%)),
    #deded8;
}

.story-card p {
  max-width: 760px;
  margin: 0;
  color: #262824;
  font-size: clamp(20px, 2.9vw, 48px);
  font-weight: 620;
  line-height: 1.02;
  letter-spacing: 0;
}

.problem-list {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.problem-list li {
  border-top: 1px solid rgb(32 33 31 / 10%);
  padding-top: 10px;
  color: #62655e;
  font-size: clamp(11px, 1vw, 13px);
  font-weight: 560;
  line-height: 1.45;
  letter-spacing: 0;
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
  font-weight: 650;
  line-height: 1;
  letter-spacing: 0;
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
  .story-card,
  .stack-card {
    padding: 14px;
  }

  .story-card p {
    font-size: clamp(18px, 4.8vw, 30px);
  }

  .problem-list {
    grid-template-columns: 1fr;
    gap: 7px;
  }

  .problem-list li {
    padding-top: 7px;
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
  .story-card,
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

  .story-card p {
    font-size: clamp(17px, 5vw, 22px);
  }

  .stack-group {
    gap: 7px;
  }

  .icon-row {
    gap: 7px;
  }
}
</style>
