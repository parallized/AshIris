<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

definePageMeta({
  layout: false,
});

useHead({
  title: "CV",
});

const RESUME_TAGS = [
  "Agent 开发",
  "AI-Native 开发",
  "逆向工程",
  "前端开发",
  "后端开发",
  "全栈开发",
  "UI / UX 设计",
  "产品设计",
  "Unity 开发",
  "Three.js 开发",
  "数据可视化",
  "技术美术",
] as const;

type ResumeTag = (typeof RESUME_TAGS)[number];

type ResumeItem = {
  id: string;
  enabled: boolean;
  label: string;
  tag: ResumeTag;
};

type ProjectStar = {
  situation: string;
  task: string;
  actions: string[];
  results: string[];
};

type ProjectItem = {
  id: string;
  enabled: boolean;
  title: string;
  summary: string;
  url: string;
  date: string;
  stack: string;
  roles: ResumeTag[];
  tags: string[];
  evidence: string[];
  star: ProjectStar;
};

type PersistedState = {
  resume?: Array<{ id: string; enabled: boolean }>;
  projects?: Array<{ id: string; enabled: boolean }>;
  isTwoColumn?: boolean;
};

const DARK_KEY = "ashiris.cv.dark";
const STORAGE_KEY = "ashiris.cv.controls.v3";

const drawerOpen = ref(false);
const isDark = ref(false);
const isTwoColumn = ref(false);
const lastUpdated = new Date().toISOString().slice(0, 10);

const syncDarkClass = () => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", isDark.value);
};

const resumeItems = ref<ResumeItem[]>([
  {
    id: "highlight-10y",
    enabled: true,
    tag: "全栈开发",
    label: "10 年独立开发与自由职业历程（自 2015 年起），技术覆盖 C++/Rust 底层、Java 高并发后端、Unity/UE 引擎到前端全栈，累计独立交付 20+ 商业/开源项目，带着 5 年商业经验入学。",
  },
  {
    id: "highlight-vibe",
    enabled: true,
    tag: "AI-Native 开发",
    label: "AI 意图驱动 (Vibe Coding) 先行者：构建 RAG + Graph 长周期上下文管理体系，单人日均交付量达传统 5 人团队水平，2024-2025 年间独立交付 10+ 个全栈应用，平均原型周期 < 1 天。",
  },
  {
    id: "highlight-hardcore",
    enabled: true,
    tag: "逆向工程",
    label: "底层硬核攻坚：自研 IDA Pro MCP 插件实现二进制语义自动化还原，将人工变量/结构体分析耗时降低 90%，一周内完成传统数月级逆向工程项目。",
  },
  {
    id: "highlight-business",
    enabled: true,
    tag: "全栈开发",
    label: "商业闭环实战：作为 Leader 从 0 到 1 打造 10W+ 注册用户社区，DAU 2000+ 峰值下系统延迟 < 100ms，实现月纯利 20k+ 的规模化盈利。",
  },
  {
    id: "agent-workflow",
    enabled: true,
    tag: "Agent 开发",
    label: "SDD (Schema-Driven Development) 实践者：构建基于 MCP 的异步任务状态机（草稿/待办/进行中/阻塞/完成），实现 AI 代理自动领票、执行、上报的闭环工作流，代码交付过程 100% 可追溯。",
  },
  {
    id: "agent-tooling",
    enabled: true,
    tag: "Agent 开发",
    label: "深度集成 Claude Code / Codex 双端协同工作流，通过 MCP + REST 混合工具链实现跨平台任务派发，支撑多 Worker 并行执行与结构化报告回写。",
  },
  {
    id: "ai-native-rag",
    enabled: true,
    tag: "AI-Native 开发",
    label: "自研多层级 RAG 检索与上下文注入体系，将长短时记忆分层管理，有效解决 AI 协同开发中的幻觉与注意力碎片化问题，保障长周期项目的上下文连续性。",
  },
  {
    id: "ai-code-literacy",
    enabled: true,
    tag: "AI-Native 开发",
    label: "具备极强的 AI 代码识读力（Code Literacy）：坚持人工代码审计与架构把关，确保 AI 生成逻辑符合生产级安全与性能标准，具备处理 brownfield 项目（复杂既有代码）的重构能力。",
  },
  {
    id: "reverse-ida",
    enabled: true,
    tag: "逆向工程",
    label: "IDA Pro MCP 插件原创开发者：利用 LLM 对反汇编代码进行语义化标注，自动化还原函数签名与数据结构，将二进制逆向工程从"手工考古"升级为"AI 辅助解构"。",
  },
  {
    id: "backend-distributed",
    enabled: true,
    tag: "后端开发",
    label: "Java + Redis 分布式架构设计：通过多级缓存与服务器分流策略，在 DAU 2000+ 峰值下维持系统延迟 < 100ms，支撑 10W+ 用户的高并发业务场景。",
  },
  {
    id: "backend-rust-service",
    enabled: true,
    tag: "后端开发",
    label: "Rust + C++ DLL 跨语言混合开发：构建高性能扫描器与内存攻防组件，利用 Axum 实现标准化 RESTful API 服务化，涵盖路径规划、射线检测等核心接口。",
  },
  {
    id: "uiux-system",
    enabled: true,
    tag: "UI / UX 设计",
    label: "系统化 UI/UX 设计能力：熟练运用 Figma/Blender/Houdini 工具链，从用户行为数据出发驱动交互设计，在工程实现与视觉表达间取得精准平衡。",
  },
  {
    id: "product-discovery",
    enabled: true,
    tag: "产品设计",
    label: "需求澄清与风险化解专家：擅长在模糊需求下定义技术架构，将目标拆解为可执行阶段任务，曾在社区运营危机中 24 小时内完成补偿方案设计与业务恢复。",
  },
  {
    id: "unity-editor",
    enabled: true,
    tag: "Unity 开发",
    label: "Unity/UE 引擎深度开发与编辑器扩展：具备 Houdini 过程化建模、Blender 资产工作流及 Editor Tooling 实践，曾探索编辑器内嵌 AI 助手方案。",
  },
  {
    id: "threejs-viz",
    enabled: true,
    tag: "Three.js 开发",
    label: "Three.js / WebGL 空间可视化实践：具备 3D 场景构建与交互开发能力，结合空间信息可视化在游戏战术工具中实现高密度数据的直觉化呈现。",
  },
  {
    id: "data-viz",
    enabled: true,
    tag: "数据可视化",
    label: "数据可视化与空间信息专家：在多款游戏工具项目中实现地图/点位/策略的可视化呈现，形成可复用的信息展示模板，提升关键信息的查找成功率。",
  },
  {
    id: "tech-art",
    enabled: true,
    tag: "技术美术",
    label: "技术美术跨界实践：Blender 插件兼容修复（Safe-Inset-5.0 适配 Blender 5.0+）、Houdini 过程化建模、游戏资产管线搭建，打通"美术创意→工程落地"全链路。",
  },
]);

const projectPool = ref<ProjectItem[]>([
  {
    id: "reverse-engineering-pipeline",
    enabled: true,
    title: "AI 驱动的自动化逆向工程流水线",
    summary: "集成 AI 辅助分析与高性能组件的闭环逆向流水线。",
    url: "https://github.com/parallized",
    date: "2025 - 至今",
    stack: "IDA Pro MCP / Rust / C++ DLL / Python",
    roles: ["逆向工程", "后端开发", "Agent 开发"],
    tags: ["二进制分析", "内存攻防", "自动化还原"],
    evidence: [
      "自研 IDA Pro MCP 插件，实现二进制语义自动化还原。",
    ],
    star: {
      situation: "面对黑盒系统下极其复杂的寻路逻辑（Navmesh）与状态机，传统人工解构周期过长。",
      task: "构建自动化分析链路，将逆向工程周期从数月缩短至周级别。",
      actions: [
        "基于 IDA Pro MCP 构建 AI 辅助插件，利用 LLM 对反汇编代码进行语义化标注。",
        "使用 Rust 编写高性能扫描器，C++ 开发核心业务逻辑 DLL。",
        "实现自动化状态机还原脚本，消除 90% 以上的重复性分析工作。",
      ],
      results: [
        "成功在一周内解构复杂寻路逻辑，交付高精度自动化组件。",
        "极大提升了从二进制分析到生产交付的整体效率。",
      ],
    },
  },
  {
    id: "player-community-leader",
    enabled: true,
    title: "万级玩家社区全生命周期研发与运营",
    summary: "从 0 到 1 打造并运营的高并发玩家社区，实现规模化盈利。",
    url: "https://github.com/parallized",
    date: "2020 - 至今",
    stack: "Java / Redis / 分布式架构 / UI UX",
    roles: ["全栈开发", "产品设计", "后端开发"],
    tags: ["高并发治理", "商业运营", "危机管控"],
    evidence: [
      "累计注册用户 10W+，峰值 DAU 2000+，月纯利 20k+。",
    ],
    star: {
      situation: "需要构建支撑万人规模的玩家社区，并确保商业闭环与系统稳定。",
      task: "作为负责人，统筹从技术架构、UI/UX 设计到数值策划与运营的全流程。",
      actions: [
        "采用 Java + Redis 分布式架构，设计多级缓存与服务器分流策略应对高并发。",
        "独立完成全套 UI/UX 设计，根据玩家心理反馈快速迭代产品功能。",
        "建立成熟的危机处理机制（补偿方案、业务快速恢复等），降低突发故障影响。",
      ],
      results: [
        "系统稳定支撑万人社区，实现单月纯利 20k+ 的商业目标。",
        "通过反馈循环实现产品高度自适应，留存率与活跃度表现优秀。",
      ],
    },
  },
  {
    id: "vibe-coding-practice",
    enabled: true,
    title: "AI-Native 高速交付实践 (Vibe Coding)",
    summary: "基于 MCP 与意图驱动的高效开发范式实践。",
    url: "https://github.com/parallized",
    date: "2025 - 至今",
    stack: "Claude / Codex / MCP / RAG / Vue 3",
    roles: ["AI-Native 开发", "Agent 开发", "前端开发"],
    tags: ["交付效能", "意图驱动", "上下文治理"],
    evidence: [
      "实现 2 小时内从 0 到 1 交付样式深度优化的全栈系统。",
    ],
    star: {
      situation: "传统开发范式在处理长周期、多上下文项目时容易出现“幻觉”与效率瓶颈。",
      task: "探索并建立一套 AI 意图驱动的极速交付流程，显著提升开发杠杆。",
      actions: [
        "深度集成 Claude/Codex 与自研 MCP 工具链，实现上下文自动化对齐。",
        "开发个人记忆与 RAG 检索系统，将长短时记忆作为多层级上下文注入。",
        "利用 AI Skills 进行样式深度优化与工程质量校验（Typecheck/Build）。",
      ],
      results: [
        "开发效能较传统模式提升 5-10 倍，实现数小时级别的端到端交付。",
        "验证了 Vibe Coding 在复杂业务场景下的可落地性与稳定性。",
      ],
    },
  },
  {
    id: "npt",
    enabled: true,
    title: "Notion Project Tracker",
    summary: "将 Notion 升级为 AI 可执行项目中枢的 Skill 系统。",
    url: "https://github.com/parallized/notion-project-tracker",
    date: "2026",
    stack: "Python / Notion MCP / Notion REST / Claude Code / Codex",
    roles: ["Agent 开发", "后端开发", "全栈开发", "产品设计"],
    tags: ["任务状态机", "MCP + REST", "可追溯交付"],
    evidence: [
      "README 提供初始化、执行、回写与截图流程。",
    ],
    star: {
      situation: "团队希望在 Notion 内直接驱动 AI 执行开发任务，并保留过程记录。",
      task: "设计可跨工具运行的任务工作流，避免“任务写了但执行不闭环”。",
      actions: [
        "定义待办/队列/进行中/阻塞/完成状态流，并约束报告输出格式。",
        "组合 Notion MCP 与 REST 查询链路，提升任务发现稳定性和评论回写可用性。",
        "抽象为 Skill 形态，统一 Claude 与 Codex 两端指令体验。",
      ],
      results: [
        "形成可复用的项目执行模板，降低从需求到交付的协作成本。",
        "执行结果、标签和评论可回溯，便于复盘与继续迭代。",
      ],
    },
  },
  {
    id: "para-navigation",
    enabled: true,
    title: "para-navigation",
    summary: "基于 Rust + Detour/NavMesh 的导航服务，提供 JSON HTTP 接口。",
    url: "https://github.com/parallized/para-navigation",
    date: "2026",
    stack: "Rust / Axum / C++ FFI / Detour / Node E2E",
    roles: ["后端开发", "全栈开发", "数据可视化"],
    tags: ["路径规划", "服务化", "E2E 测试"],
    evidence: [
      "标准化的 RESTful API 设计，涵盖健康检查、路径规划与射线检测等核心接口。",
      "仓库含 `e2e/run.js` 端到端验证脚本。",
    ],
    star: {
      situation: "需要一个稳定的导航能力服务，承接上层工具的路径与空间查询请求。",
      task: "把底层导航能力封装为可部署、可调用、可验证的 HTTP 服务。",
      actions: [
        "使用 Axum 搭建 API 层，统一 POST JSON 请求约定。",
        "通过 Rust FFI 对接 C++ bridge 与 Detour 内核，保留性能与可控性。",
        "补齐 health/config/path/random-point/cast-ray 等核心接口并编排 E2E 测试。",
      ],
      results: [
        "完成 10+ 可用导航接口，支持路径、随机点、射线和网格邻域等查询场景。",
        "形成可独立运行的服务层，便于后续接入更多客户端与自动化流程。",
      ],
    },
  },
  {
    id: "runedra",
    enabled: true,
    title: "Runedra 知树",
    summary: "知识学习加速产品，强调多维信息组织与可检索体验。",
    url: "https://rune.parallized.cn",
    date: "2024 - 至今",
    stack: "Nuxt / Full-Stack / AI 辅助",
    roles: ["全栈开发", "产品设计", "前端开发"],
    tags: ["知识图谱思路", "信息架构", "持续迭代"],
    evidence: ["线上可访问站点：rune.parallized.cn。"],
    star: {
      situation: "学习资料分散、上下文割裂，用户难以快速进入并持续推进。",
      task: "打造一个可持续演进的知识入口，兼顾结构化与浏览效率。",
      actions: [
        "按学习路径重构信息架构，降低首次进入成本。",
        "结合前端展示与内容组织策略，提高检索和回溯效率。",
        "以小步迭代方式持续验证页面结构和表达方式。",
      ],
      results: [
        "形成稳定的线上学习入口，可直接用于知识沉淀与日常复盘。",
        "为后续 JD 定制化内容（强调技术/产品侧）提供可复用底座。",
      ],
    },
  },
  {
    id: "wow-magician",
    enabled: true,
    title: "WoW Magician",
    summary: "面向公会协作的 AI + MRT 战术板与排轴辅助方案。",
    url: "https://wow.parallized.cn",
    date: "2025",
    stack: "Full-Stack / AI / Lua Ecosystem",
    roles: ["Agent 开发", "全栈开发", "后端开发", "数据可视化"],
    tags: ["策略协作", "规则系统", "自动化辅助"],
    evidence: ["线上站点可访问：wow.parallized.cn。"],
    star: {
      situation: "团队排轴和战术同步依赖人工，信息更新慢且容易偏差。",
      task: "做一个能快速协作、统一认知的战术信息系统。",
      actions: [
        "把战术信息拆成可复用模块，支持多人查看与迭代。",
        "引入 AI 辅助生成与规则化处理，减少重复手工配置。",
        "围绕实战反馈调整界面结构，让核心信息在关键时刻可读。",
      ],
      results: [
        "形成可复用的战术板工作流，降低团队沟通和配置摩擦。",
        "将排轴方案从“个人经验”沉淀为“可共享资产”。",
      ],
    },
  },
  {
    id: "ash-iris",
    enabled: true,
    title: "Ash Iris (Portfolio + CV)",
    summary: "个人品牌与求职站点，强调审美表达与工程可维护性。",
    url: "https://parallized.cn",
    date: "持续迭代",
    stack: "Nuxt 4 / Vue 3 / Tailwind v4 / GSAP",
    roles: ["前端开发", "UI / UX 设计", "产品设计", "全栈开发"],
    tags: ["品牌表达", "打印友好", "可定制简历"],
    evidence: [
      "线上可访问：parallized.cn。",
      "当前 CV 页支持暗黑模式、打印优化与内容筛选。",
    ],
    star: {
      situation: "单一静态简历难覆盖多岗位投递需求，且视觉表达不足以体现优势。",
      task: "构建可按 JD 快速裁剪的交互式简历页面，同时保证打印可用。",
      actions: [
        "搭建可切换内容的控制抽屉，支持项目与技能的细粒度开关。",
        "完善深浅色模式、移动端适配与 A4 打印样式，确保多场景可读。",
        "引入岗位模板与关键词匹配策略，减少每次投递的改稿成本。",
      ],
      results: [
        "实现“一份底稿 + 多岗位定制”工作流，提高投递效率。",
        "简历内容可快速聚焦岗位关键词，减少无关信息干扰。",
      ],
    },
  },
  {
    id: "owocaptain",
    enabled: true,
    title: "OwOcaptain",
    summary: "守望先锋地图理解与点位速查工具，偏向空间信息可视化。",
    url: "https://owo.parallized.cn",
    date: "2025",
    stack: "Web App / Spatial Info / UX",
    roles: ["数据可视化", "前端开发", "产品设计", "技术美术"],
    tags: ["空间信息", "速查体验", "战术辅助"],
    evidence: ["线上可访问站点：owo.parallized.cn。"],
    star: {
      situation: "战术学习依赖碎片化素材，关键点位在实战前难以快速检索。",
      task: "设计一个高密度但易扫读的地图工具，支持短时间完成复盘准备。",
      actions: [
        "按地图与角色场景重组信息，减少跳转和记忆负担。",
        "优化交互路径，把常用视角和策略信息放在高频入口。",
        "持续依据实战反馈调整文案和结构，提升查找成功率。",
      ],
      results: [
        "形成可在短时间完成信息定位的工具化页面。",
        "为“地图/点位/策略”类需求提供可复用的信息可视化模板。",
      ],
    },
  },
  {
    id: "safe-inset",
    enabled: true,
    title: "Safe-Inset-5.0",
    summary: "Blender Safe Inset 插件修复版，面向 5.0+ 兼容与稳定性。",
    url: "https://github.com/parallized/Safe-Inset-5.0",
    date: "2026",
    stack: "Python / Blender Add-on / Geometry",
    roles: ["技术美术", "Unity 开发", "Three.js 开发"],
    tags: ["几何处理", "插件兼容", "资产工具"],
    evidence: [
      "README 说明已在 Blender 5.0.1 进行兼容修复并验证可加载。",
      "明确发布许可证与安装流程，便于复用。",
    ],
    star: {
      situation: "原插件在新版本 Blender 场景下存在兼容和稳定性风险。",
      task: "完成可发布的兼容修复，并明确操作流程与限制。",
      actions: [
        "修复 Blender 5.0+ 下的加载与稳定性问题，保持原功能语义。",
        "补齐安装、参数、已知限制和许可证说明，降低接入门槛。",
        "围绕几何异常场景给出可执行的处理建议（Merge/Clean 等）。",
      ],
      results: [
        "插件可在目标版本正常运行，支持继续用于模型处理链路。",
        "形成可交付文档和发布规范，便于团队二次维护。",
      ],
    },
  },
  {
    id: "unity-captain",
    enabled: true,
    title: "Unity-Captain-Demoscene",
    summary: "Unity 编辑器内 AI 对话与工程结构辅助实验。",
    url: "https://github.com/parallized/Unity-Captain-Demoscene",
    date: "2025",
    stack: "Unity / C# / Editor Tooling",
    roles: ["Unity 开发", "技术美术", "Agent 开发"],
    tags: ["编辑器扩展", "工程辅助", "工具原型"],
    evidence: ["README 公开 roadmap：EditorWindow 对话 + 文件结构 schema。"],
    star: {
      situation: "Unity 项目中，内容整理与工程理解成本高，调试上下文分散。",
      task: "探索在编辑器内嵌入智能助手，降低信息切换成本。",
      actions: [
        "实现 EditorWindow 对话交互原型，验证可行性。",
        "尝试将现有文件结构抽取为 schema，辅助上下文理解。",
        "以 demo 场景验证工具链与开发体验。",
      ],
      results: [
        "验证编辑器内 AI 助手方案可落地，为后续工具化演进提供方向。",
        "沉淀 Unity 工具开发实践，可迁移到更复杂项目。",
      ],
    },
  },
  {
    id: "dalamud-plugins",
    enabled: true,
    title: "DalamudPlugins",
    summary: "FFXIV 插件索引与维护仓库，面向游戏工具生态分发。",
    url: "https://github.com/Nesb01t/DalamudPlugins",
    date: "2026",
    stack: "C# / Plugin Ecosystem / Game Tooling",
    roles: ["Unity 开发", "全栈开发", "技术美术"],
    tags: ["插件分发", "游戏工具", "社区维护"],
    evidence: [],
    star: {
      situation: "插件生态分散，用户和开发者难以统一获取、验证与维护工具。",
      task: "构建清晰的插件索引入口，沉淀可持续维护的分发机制。",
      actions: [
        "维护仓库索引结构，统一插件入口与版本获取路径。",
        "聚合核心工具仓库，降低查找和接入成本。",
        "持续维护文档与链接可用性，减少用户使用门槛。",
      ],
      results: [
        "形成具有社区可见度的插件入口仓库，提升工具可发现性。",
        "为后续游戏工具产品化和运维协作提供基础。",
      ],
    },
  },
  {
    id: "maple",
    enabled: true,
    title: "Maple",
    summary: "为 AI 编码独特设计的 SDD 看板工作台，支持任务派发、状态管理与报告回写。",
    url: "https://github.com/parallized/maple",
    date: "2025 - 至今",
    stack: "TypeScript / MCP / Claude Code / Codex",
    roles: ["Agent 开发", "全栈开发", "产品设计", "前端开发"],
    tags: ["SDD 工作流", "任务看板", "AI 协作"],
    evidence: [
      "支持 Claude Code 与 Codex 双端任务派发与结构化报告回写。",
    ],
    star: {
      situation: "AI 编码工具缺少结构化的任务管理与可视化工作台，执行过程不可追溯。",
      task: "构建一套面向 AI 编码场景的 SDD 看板系统，实现任务创建、派发、执行与回写闭环。",
      actions: [
        "设计任务状态流（草稿/待办/队列中/进行中/已完成/已阻塞），统一多 Worker 的执行视图。",
        "实现 MCP 工具集，支持任务查询、报告提交、标签管理与 Worker 完成通知。",
        "构建可视化看板 UI，提供直观的任务构思与编排体验。",
      ],
      results: [
        "形成可复用的 AI 编码项目管理模式，显著降低多任务并行时的认知负担与上下文切换成本。",
        "通过结构化报告回写与任务看板，实现了开发过程的 100% 可追溯性，验证了 SDD 工作流的实用价值。",
      ],
    },
  },
  {
    id: "vertree",
    enabled: true,
    title: "Vertree",
    summary: "自用压力测试工具，面向网络服务的性能验证。",
    url: "https://github.com/parallized/Vertree",
    date: "2026",
    stack: "Rust / 网络编程 / 性能测试",
    roles: ["后端开发", "全栈开发"],
    tags: ["压力测试", "Rust", "工具开发"],
    evidence: [
      "高性能异步网络模型，支持高并发下的服务性能压测与瓶颈分析。",
    ],
    star: {
      situation: "需要对自建服务进行可控的压力验证，现有工具不够灵活。",
      task: "开发一个可定制的压力测试工具，满足特定服务的性能评估需求。",
      actions: [
        "使用 Rust 实现高并发请求能力，保证测试工具自身不成为瓶颈。",
        "设计可配置的请求模式，支持不同压测场景。",
      ],
      results: [
        "完成可用的压力测试工具，用于服务上线前的性能验证。",
        "积累 Rust 网络编程实践经验，提升系统级开发能力。",
      ],
    },
  },
  {
    id: "lineup",
    enabled: true,
    title: "Lineup",
    summary: "FPS 游戏战术 Lineup 工具，覆盖 Valorant / OW / War Thunder 等。",
    url: "https://github.com/parallized/Lineup",
    date: "2026",
    stack: "Web / 空间信息 / 游戏工具",
    roles: ["数据可视化", "前端开发", "产品设计"],
    tags: ["游戏辅助", "Lineup", "战术工具"],
    evidence: [
      "包含 Valorant / OW / War Thunder 等多款热门游戏的战术点位数据。",
    ],
    star: {
      situation: "FPS 游戏中 Lineup 技巧分散在视频和帖子中，实战前难以快速检索。",
      task: "构建统一的 Lineup 查阅平台，支持多游戏、多地图的快速定位。",
      actions: [
        "按游戏和地图组织 Lineup 内容，降低查找成本。",
        "设计简洁的浏览路径，确保实战前可快速获取关键信息。",
      ],
      results: [
        "形成可持续更新的 Lineup 资源库，提升游戏准备效率。",
        "为空间信息展示积累可复用的交互模式。",
      ],
    },
  },
  {
    id: "incity",
    enabled: true,
    title: "Incity + Outcity",
    summary: "C++ 实现的内存级 TCP 服务 + Electron 桌面端底座。",
    url: "https://github.com/parallized/Incity",
    date: "2025",
    stack: "C++ / TCP / Electron / TypeScript",
    roles: ["后端开发", "全栈开发"],
    tags: ["网络编程", "C++", "桌面应用"],
    evidence: [
      "跨语言架构实践：C++ 异步通信内核 + Electron 桌面端视图。",
    ],
    star: {
      situation: "需要一个高性能的内存级 TCP 通信服务，并在桌面端提供可操作界面。",
      task: "用 C++ 实现核心通信层，配合 Electron 提供跨平台桌面体验。",
      actions: [
        "设计 C++ TCP 服务端架构，处理并发连接与内存操作。",
        "使用 Electron + TypeScript 构建桌面底座，对接底层服务。",
        "实现前后端通信协议，保证数据传输的稳定性。",
      ],
      results: [
        "完成可用的 C++/Electron 混合架构方案，积累底层网络编程经验。",
        "验证 C++ 服务与 Electron 前端协同开发的可行路径。",
      ],
    },
  },
]);

const enabledResumeItems = computed(() => resumeItems.value.filter((i) => i.enabled));
const enabledProjects = computed(() => projectPool.value.filter((p) => p.enabled));

const resumeGroups = computed(() => {
  const map = new Map<ResumeTag, ResumeItem[]>();
  for (const tag of RESUME_TAGS) map.set(tag, []);
  for (const item of enabledResumeItems.value) {
    map.get(item.tag)?.push(item);
  }
  return RESUME_TAGS.map((tag) => ({
    tag,
    items: map.get(tag) ?? [],
  })).filter((group) => group.items.length > 0);
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

const selectAll = () => {
  for (const item of resumeItems.value) item.enabled = true;
  for (const project of projectPool.value) project.enabled = true;
};

const TEMPLATES = [
  { id: "all", name: "全部内容", tags: [] },
  { id: "ai-startup", name: "AI Startup", tags: ["AI-Native 开发", "Agent 开发", "全栈开发", "逆向工程"] },
  { id: "agent", name: "Agent 架构", tags: ["Agent 开发", "后端开发", "全栈开发"] },
  { id: "frontend", name: "前端 / UIUX", tags: ["前端开发", "UI / UX 设计", "Three.js 开发", "数据可视化"] },
  { id: "game", name: "游戏 / Unity", tags: ["Unity 开发", "技术美术", "Three.js 开发"] },
  { id: "product", name: "产品 / 全栈", tags: ["产品设计", "全栈开发", "前端开发", "后端开发"] },
] as const;

const applyTemplate = (tags: readonly string[]) => {
  if (tags.length === 0) {
    selectAll();
    return;
  }
  for (const item of resumeItems.value) {
    item.enabled = tags.includes(item.tag);
  }
  for (const project of projectPool.value) {
    project.enabled = project.roles.some((r) => tags.includes(r));
  }
};

const persistControls = () => {
  try {
    const data: PersistedState = {
      resume: resumeItems.value.map((item) => ({
        id: item.id,
        enabled: item.enabled,
      })),
      projects: projectPool.value.map((project) => ({
        id: project.id,
        enabled: project.enabled,
      })),
      isTwoColumn: isTwoColumn.value,
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
    const parsed = JSON.parse(raw) as PersistedState;

    if (Array.isArray(parsed.resume)) {
      const map = new Map(parsed.resume.map((item) => [item.id, item.enabled]));
      for (const item of resumeItems.value) {
        const enabled = map.get(item.id);
        if (typeof enabled === "boolean") item.enabled = enabled;
      }
    }

    if (Array.isArray(parsed.projects)) {
      const map = new Map(parsed.projects.map((project) => [project.id, project.enabled]));
      for (const project of projectPool.value) {
        const enabled = map.get(project.id);
        if (typeof enabled === "boolean") project.enabled = enabled;
      }
    }

    if (typeof parsed.isTwoColumn === "boolean") {
      isTwoColumn.value = parsed.isTwoColumn;
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
  [resumeItems, projectPool, isTwoColumn],
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
  <div class="cv-bg min-h-screen overflow-x-hidden bg-neutral-100 text-neutral-900 transition-colors duration-300 dark:bg-neutral-900 dark:text-neutral-100">
    <div class="page-wrap mx-auto w-full px-4 py-8 transition-all duration-500 md:px-8 md:py-12" :class="isTwoColumn ? 'max-w-[1500px]' : 'max-w-[1024px]'">
      <article class="sheet overflow-hidden rounded-2xl bg-white shadow-[0_24px_70px_rgba(0,0,0,0.10)] ring-1 ring-black/5 transition-colors duration-300 dark:bg-neutral-800 dark:shadow-[0_24px_70px_rgba(0,0,0,0.50)] dark:ring-white/10">
        
        <!-- Main Content -->
        <main class="p-8 md:p-12">
          <!-- Header -->
          <header class="mb-10 flex flex-col items-start justify-between gap-6 border-b border-neutral-100 pb-10 dark:border-neutral-700 md:flex-row md:items-end">
            <div class="space-y-3">
              <h1 class="font-serif text-5xl font-black tracking-tight text-neutral-900 dark:text-white md:text-6xl">
                Parallized
              </h1>
              <p class="font-sans text-lg font-medium text-neutral-600 dark:text-neutral-400">
                AI 产品工程师 / 全栈技术专家 · 10 年独立开发历程（自 2015 年起）
              </p>
              <div class="h-1 w-12 bg-neutral-900 dark:bg-neutral-100"></div>
            </div>

            <!-- Contact & Education (Compact) -->
            <div class="grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                  <Icon name="ph:envelope-simple-bold" class="opacity-60" />
                  <a href="mailto:1317699264@qq.com" class="hover:underline">1317699264@qq.com</a>
                </div>
                <div class="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                  <Icon name="ph:github-logo-bold" class="opacity-60" />
                  <a href="https://github.com/parallized" target="_blank" class="hover:underline">github.com/parallized</a>
                </div>
                <div class="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                  <Icon name="ph:globe-simple-bold" class="opacity-60" />
                  <a href="https://parallized.cn" target="_blank" class="hover:underline">parallized.cn</a>
                </div>
              </div>
              <div class="space-y-1">
                <div class="font-bold text-neutral-900 dark:text-white">浙江科技大学</div>
                <div class="text-xs text-neutral-500 dark:text-neutral-400">数字媒体技术本科 · 2021 — 2026</div>
              </div>
            </div>
          </header>

          <div :class="isTwoColumn ? 'grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-x-12' : 'space-y-12'">
            <div class="space-y-12">
              <!-- Overview -->
              <section class="space-y-4">
                <h2 class="font-serif text-xl font-bold tracking-tight text-neutral-900 dark:text-white">个人概览</h2>
                <div class=”text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300”>
                  <p>10 年独立开发与自由职业历程（自 2015 年起），涵盖游戏服务器、全栈工具及底层安全领域，带着 5 年商业项目经验入学。技术覆盖底层 C++/Rust 逆向攻坚、Java 高并发分布式后端、Unity/UE 引擎到 AI-Native 全栈实践，累计独立交付 20+ 商业/开源项目。擅长通过 AI 杠杆（MCP/RAG/SDD）在模糊需求下定义技术架构，实现从 0 到 1 的产品闭环。</p>
                </div>
              </section>

              <!-- Self Evaluation -->
              <section class="space-y-4">
                <h2 class="font-serif text-xl font-bold tracking-tight text-neutral-900 dark:text-white">自我评价</h2>
                <div class=”text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300”>
                  <p>我是一名”产品工程师（Product Engineer）”——不仅能写代码，更懂为什么写。在 AI 席卷行业的今天，我坚信代码只是意图的副产品。凭借 10 年沉淀的工程底蕴与驾驭 AI 杠杆的能力，我能用一套自适应工具链交付一个团队的产出。擅长在模糊需求下定义技术架构，在 AI 协同开发中保持”架构直觉”，确保系统在复杂负载下的鲁棒性。同时具备处理 brownfield 项目（复杂既有代码）的能力，坚持人工代码审计，确保 AI 生成逻辑符合生产级安全与性能标准。</p>
                </div>
              </section>

              <!-- Skills -->
              <section v-if="resumeGroups.length" :class="isTwoColumn ? 'space-y-4' : 'space-y-6'">
                <h2 class="font-serif text-xl font-bold tracking-tight text-neutral-900 dark:text-white">专业技能</h2>
                <div :class="isTwoColumn ? 'grid gap-6' : 'grid gap-x-10 gap-y-8 sm:grid-cols-2'">
                  <div v-for="group in resumeGroups" :key="group.tag" class="space-y-3">
                    <h3 class="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                      <span class="h-1 w-4 rounded-full bg-neutral-900/10 dark:bg-white/10"></span>
                      {{ group.tag }}
                    </h3>
                    <ul class="space-y-2 text-[13.5px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                      <li v-for="item in group.items" :key="item.id" class="relative pl-4">
                        <span class="absolute left-0 top-2 h-1.5 w-1.5 rounded-full border border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800"></span>
                        {{ item.label }}
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <div :class="isTwoColumn ? 'space-y-12 border-l border-neutral-100 pl-12 dark:border-neutral-700' : 'pt-12 border-t border-neutral-100/50 dark:border-neutral-800/50'">
              <!-- Project Experience -->
              <section v-if="enabledProjects.length" class="space-y-10">
                <h2 class="font-serif text-xl font-bold tracking-tight text-neutral-900 dark:text-white">项目经验</h2>
                
                <div class="space-y-10">
                  <article
                    v-for="project in enabledProjects"
                    :key="project.id"
                    class="group space-y-4"
                  >
                  <div class="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-neutral-100/50 pb-1 dark:border-neutral-700/50">
                    <h3 class="flex items-center gap-2 font-serif text-lg font-bold text-neutral-900 dark:text-white">
                      <a :href="project.url" target="_blank" class="hover:underline hover:decoration-neutral-400">
                        {{ project.title }}
                      </a>
                    </h3>
                    <span class="font-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500">
                      {{ project.date }}
                    </span>
                  </div>

                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="tag in [...project.roles, ...project.tags]"
                      :key="`${project.id}-${tag}`"
                      class="inline-flex items-center rounded-sm bg-neutral-100 px-1.5 py-0.5 text-[10px] font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <p class="text-[14px] font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
                    {{ project.summary }}
                    <span class="ml-1 text-[11px] font-normal text-neutral-500 dark:text-neutral-400">{{ project.stack }}</span>
                  </p>

                  <div class="grid gap-2 text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                    <div>
                      <p>{{ project.star.situation }} {{ project.star.task }}</p>
                    </div>
                    <div>
                      <ul class="list-disc space-y-0.5 pl-4">
                        <li v-for="action in project.star.actions" :key="action">{{ action }}</li>
                      </ul>
                    </div>
                    <div>
                      <ul class="list-disc space-y-0.5 pl-4">
                        <li v-for="result in project.star.results" :key="result">{{ result }}</li>
                      </ul>
                    </div>
                  </div>

                  <div class="text-[11px] italic text-neutral-500 dark:text-neutral-500">
                    <ul class="space-y-0.5">
                      <li v-for="row in project.evidence" :key="row">{{ row }}</li>
                    </ul>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </div>
      </main>
      </article>
    </div>

    <!-- Controls Overlay (No-Print) -->
    <Teleport to="body">
      <div class="no-print fixed bottom-6 left-1/2 z-[9999] flex -translate-x-1/2 items-center gap-1.5 rounded-2xl bg-white/80 p-1.5 shadow-2xl ring-1 ring-black/5 backdrop-blur-md transition-all hover:bg-white dark:bg-neutral-800/80 dark:ring-white/10 dark:hover:bg-neutral-800">
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 transition hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
          :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
          @click="isDark = !isDark"
        >
          <Icon :name="isDark ? 'ph:sun-bold' : 'ph:moon-bold'" class="text-lg" />
        </button>
        
        <div class="h-4 w-px bg-neutral-200 dark:bg-neutral-700"></div>

        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 transition hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
          :class="{ 'bg-neutral-100 text-neutral-900 dark:bg-neutral-700 dark:text-white': isTwoColumn }"
          title="切换单/双栏布局"
          @click="isTwoColumn = !isTwoColumn"
        >
          <Icon :name="isTwoColumn ? 'ph:columns-bold' : 'ph:rows-bold'" class="text-lg" />
        </button>

        <div class="h-4 w-px bg-neutral-200 dark:bg-neutral-700"></div>

        <button
          type="button"
          class="flex h-10 gap-2 items-center justify-center rounded-xl bg-neutral-900 px-4 text-xs font-bold text-white shadow-lg transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
          @click="toggleDrawer"
        >
          <Icon name="ph:sliders-horizontal-bold" class="text-base" />
          <span>控制面板</span>
        </button>
      </div>

      <!-- Drawer Overlay -->
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
          class="no-print fixed inset-0 z-[10000] bg-black/30 backdrop-blur-sm dark:bg-black/60"
          @click="closeDrawer"
        />
      </Transition>

      <!-- Drawer Panel -->
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
          class="no-print fixed right-0 top-0 z-[10001] h-full w-[min(1200px,100vw)] bg-white shadow-2xl ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10"
          role="dialog"
          aria-modal="true"
        >
          <div class="flex h-full flex-col">
            <div class="flex items-start justify-between gap-4 border-b border-neutral-200/70 p-6 dark:border-neutral-800">
              <div class="space-y-1">
                <h2 class="text-lg font-black tracking-tight">简历控制面板</h2>
                <p class="text-xs text-neutral-500 dark:text-neutral-400">
                  调整简历内容以适配特定岗位
                </p>
              </div>
              <button
                type="button"
                class="h-10 w-10 rounded-xl bg-neutral-100 transition hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                aria-label="关闭"
                @click="closeDrawer"
              >
                <Icon name="ph:x" class="text-lg opacity-70" />
              </button>
            </div>

            <div class="flex-1 space-y-12 overflow-auto p-6 md:p-10" data-lenis-prevent>
              <!-- Template Selector -->
              <section class="space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">岗位模版</h3>
                  <button
                    type="button"
                    class="text-xs font-bold text-neutral-900 underline underline-offset-4 dark:text-white"
                    @click="printResume"
                  >
                    打印 / 导出 PDF
                  </button>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="tpl in TEMPLATES"
                    :key="tpl.id"
                    type="button"
                    class="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                    @click="applyTemplate(tpl.tags)"
                  >
                    {{ tpl.name }}
                  </button>
                </div>
              </section>

              <!-- Skill Toggles -->
              <section class="space-y-6">
                <div class="flex items-baseline gap-3">
                  <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">技能项</h3>
                  <button class="text-[10px] font-bold opacity-60 hover:opacity-100" @click="selectAll">全选</button>
                </div>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div
                    v-for="item in resumeItems"
                    :key="item.id"
                    class="flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50/30 p-4 transition-colors hover:bg-neutral-100/50 dark:border-neutral-800 dark:bg-black/20 dark:hover:bg-white/5"
                  >
                    <label class="relative mt-0.5 inline-flex shrink-0 cursor-pointer items-center">
                      <input v-model="item.enabled" type="checkbox" class="peer sr-only" />
                      <span class="h-4 w-7 rounded-full bg-neutral-200 transition peer-checked:bg-neutral-900 dark:bg-neutral-800 dark:peer-checked:bg-white" />
                      <span class="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition peer-checked:translate-x-3 dark:bg-neutral-900" />
                    </label>
                    <div class="min-w-0 space-y-1.5">
                      <p class="text-[13px] leading-snug text-neutral-700 dark:text-neutral-300">{{ item.label }}</p>
                      <span class="inline-block rounded bg-neutral-100 px-1.5 py-0.5 text-[9px] font-bold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">{{ item.tag }}</span>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Project Toggles -->
              <section class="space-y-6">
                <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">项目池</h3>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div
                    v-for="project in projectPool"
                    :key="project.id"
                    class="flex items-start gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
                  >
                    <label class="relative mt-0.5 inline-flex shrink-0 cursor-pointer items-center">
                      <input v-model="project.enabled" type="checkbox" class="peer sr-only" />
                      <span class="h-4 w-7 rounded-full bg-neutral-200 transition peer-checked:bg-neutral-900 dark:bg-neutral-800 dark:peer-checked:bg-white" />
                      <span class="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition peer-checked:translate-x-3 dark:bg-neutral-900" />
                    </label>
                    <div class="min-w-0">
                      <div class="truncate text-xs font-bold">{{ project.title }}</div>
                      <div class="truncate text-[10px] text-neutral-500">{{ project.summary }}</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div class="border-t border-neutral-200/70 p-6 dark:border-neutral-800">
              <p class="text-[10px] text-neutral-400">
                Tip: 模板设置会自动保存到本地。按 <kbd class="rounded border px-1 font-mono">Esc</kbd> 快速关闭。
              </p>
            </div>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@import url('https://fonts.loli.net/css2?family=Crimson+Pro:ital,wght@0,400;0,700;0,900;1,400&family=Noto+Sans+SC:wght@400;500;700;900&display=swap');

.font-serif {
  font-family: 'Crimson Pro', 'Noto Sans SC', serif;
}

.font-sans {
  font-family: 'Inter', 'Noto Sans SC', sans-serif;
}

@page {
  size: A4;
  margin: 0;
}

@media print {
  .no-print {
    display: none !important;
  }

  .cv-bg {
    padding: 0 !important;
    background: white !important;
  }

  .page-wrap {
    max-width: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .sheet {
    box-shadow: none !important;
    border-radius: 0 !important;
    outline: none !important;
    background: white !important;
    color: black !important;
    width: 210mm;
    min-height: 297mm;
  }

  header {
    border-bottom: 1px solid #eee !important;
    padding-bottom: 2rem !important;
  }

  main {
    background: white !important;
  }

  article, section {
    break-inside: avoid;
  }

  a {
    text-decoration: none !important;
    color: inherit !important;
  }

  h1, h2, h3 {
    color: black !important;
  }
}

/* Custom transitions */
.transition-transform {
  transition-property: transform;
}
</style>

