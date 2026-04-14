<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

definePageMeta({ layout: false });
useHead({ title: "CV" });

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
  "计算机系统",
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
  icon?: string;
};

type ExperienceItem = {
  id: string;
  enabled: boolean;
  company: string;
  date: string;
  items: string[];
};

type PersistedState = {
  resume?: Array<{ id: string; enabled: boolean }>;
  projects?: Array<{ id: string; enabled: boolean }>;
  experience?: Array<{ id: string; enabled: boolean }>;
  isTwoColumn?: boolean;
};

const DARK_KEY = "ashiris.cv.dark";
const STORAGE_KEY = "ashiris.cv.controls.v3";

const drawerOpen = ref(false);
const isDark = ref(false);
const isTwoColumn = ref(false);

const syncDarkClass = () => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", isDark.value);
};

const experiencePool = ref<ExperienceItem[]>([
  {
    id: "internship-c",
    enabled: true,
    company: "Deamoy.AI",
    date: "2025.01 — 至今",
    items: [
      "参与 AI 原生全栈应用构建平台核心开发，主导 AI 与用户协同编辑模式的产品设计与落地",
      "重构流式渲染协议，将 UI 响应延迟压缩至毫秒级；接入 Shopify / Supabase 等外部数据源，实现 AI 驱动的业务系统可视化装修",
    ],
  },
  {
    id: "internship-b",
    enabled: true,
    company: "Demoway.com",
    date: "2023.09 — 2024.11",
    items: [
      "开发基于 Vue + Svelte + RxJS 的 Figma / Chrome 插件，完善 Service Worker 通信机制，解决离线状态下的消息丢失问题",
      "负责后台管理系统核心业务需求，系统性优化 B 端 UX，打磨 monorepo 组件库的文档与一致性",
    ],
  },
]);

const resumeItems = ref<ResumeItem[]>([
  {
    id: "agent-tooling",
    enabled: true,
    tag: "Agent 开发",
    label: "多 Worker 并行 Agentic 工作流实战：熟练使用 Claude Code / Codex 完成 SDD 驱动的自动化编码，设计任务状态机、报告回写与多级 RAG / Memory 分层管理，端到端交付可追溯的 AI 开发流水线",
  },
  {
    id: "ai-code-literacy",
    enabled: true,
    tag: "AI-Native 开发",
    label: "AI 代码审计与架构把关：能识别 AI 生成逻辑中的幻觉、性能隐患与安全问题，坚持人工复核关键路径，确保 AI 辅助开发交付生产级代码而非「能跑就行」",
  },
  {
    id: "reverse-ida",
    enabled: true,
    tag: "逆向工程",
    label: "LLM + MCP 驱动的二进制逆向：自动化还原函数签名与数据结构，将人工分析周期从数周压缩至数天；在零逆向基础下借助 AI 一周完成数百个关键符号标注，直接并入生产决策链路",
  },
  {
    id: "backend-distributed",
    enabled: true,
    tag: "后端开发",
    label: "分布式系统设计：K8s / Docker / RabbitMQ 实战，具备削峰、容错与水平扩展经验；Rust + C++ DLL 跨语言混合开发，落地 < 5ms 高性能路径规划微服务",
  },
  {
    id: "backend-rust-service",
    enabled: false,
    tag: "后端开发",
    label: "熟悉 Rust + C++ DLL 跨语言混合开发，了解 Axum，熟悉 A* Navigation 路径规划、射线检测",
  },
  {
    id: "frontend-develop",
    enabled: true,
    tag: "前端开发",
    label: "前端全链路：React / Nuxt 框架 + Nestjs / ElysiaJS 后端，Tauri / Electron / Capacitor / Flutter 跨平台交付；Figma 设计系统到 D3 / Three.js 数据可视化，具备从交互稿到上线的独立落地能力",
  },
  {
    id: "uiux-system",
    enabled: false,
    tag: "前端开发",
    label: "熟悉 Figma / Houdini 工具链，常用 D3 / Three.js 并深入了解交互与设计心理学，追求更好的视觉表达",
  },
  {
    id: "product-discovery",
    enabled: true,
    tag: "产品设计",
    label: "模糊需求下的技术决策：擅长将不确定目标拆解为可执行阶段任务；曾独立主导社区运营危机处理，24 小时内完成用户补偿方案设计、功能修复与业务恢复",
  },
  {
    id: "unity-editor",
    enabled: false,
    tag: "Unity 开发",
    label: "Unity / UE 引擎编辑器扩展：具备 Houdini 过程化建模、Blender 资产工作流及 Editor Tooling 实践，探索多种 AI 链路方案",
  },
  {
    id: "threejs-viz",
    enabled: true,
    tag: "Three.js 开发",
    label: "Three.js / WebGL 空间可视化：具备 3D 场景构建与交互开发能力，在游戏战术工具中实现万级元素的高密度渲染与直觉化信息呈现",
  },
  {
    id: "tech-art",
    enabled: false,
    tag: "技术美术",
    label: "了解 Blender 插件开发、Houdini 程序化建模、游戏资产管线搭建",
  },
]);

const projectPool = ref<ProjectItem[]>([
  {
    id: "lab-berkeley-cs61b",
    enabled: true,
    title: "UCB CS61B: 数据结构与算法",
    summary: "实现双端队列、左倾红黑树、基于 B+ 树的数据库搜索引擎，以及基于 2D Tilemap 的世界渲染器",
    url: "https://sp21.datastructur.es/",
    date: "2024",
    stack: "Java / Git / JUnit",
    roles: ["前端开发", "全栈开发", "后端开发"],
    tags: ["Data Structures", "Algorithms", "Java", "A* Pathfinding"],
    evidence: [],
    star: { situation: "", task: "", actions: [], results: [] },
    icon: "ph:tree-structure-bold",
  },
  {
    id: "maple",
    enabled: true,
    title: "Maple — AI 编码 SDD 看板工作台",
    summary: "多 Agent 协作时上下文频繁丢失、任务状态不透明——Maple 将 SDD 文档变成可执行的任务控制中枢",
    url: "https://github.com/parallized/maple",
    date: "2026",
    stack: "Tauri / MCP & Skills / CLI",
    roles: ["Agent 开发", "全栈开发", "产品设计", "前端开发"],
    tags: ["SDD 工作流", "任务看板", "多 Worker 协作", "100% 可追溯"],
    evidence: ["开源：github.com/parallized/maple"],
    star: {
      situation: "使用 Codex / Claude Code 等 CLI 工具协作开发时，多个 Agent 并行执行会产生状态冲突、上下文丢失与任务重复，开发者需要大量精力手动对齐状态。",
      task: "",
      actions: [
        "设计以任务单为核心的 SDD 中控，通过状态回写与 Human-in-the-loop 节点，将任务执行过程变为全程可追溯的流水线",
        "实现多 Worker 并行调度引擎：共享状态上下文 + 状态锁机制解决写冲突，报告回写协议确保每个 Worker 的输出有据可查",
        "基于 Tauri 封装完整 MCP 工具链，覆盖任务查询、报告提交、标签管理等核心环节，Agent 可直接调用而无需额外适配",
      ],
      results: [
        "获得 53 GitHub star，被多位开发者接入实际 AI 辅助编码工作流",
        "多 Agent 协作下的上下文丢失问题从「每次切换需手动对齐」降为零，任务可追溯率 100%",
      ],
    },
    icon: "ph:kanban-bold",
  },
  {
    id: "runedra",
    enabled: true,
    title: "Runedra 知树 — 知识学习加速平台",
    summary: "将用户当前知识状态映射为 few-shot 上下文，驱动 DeepSearch 产出个性化知识图谱与学习路径，线上持续运营",
    url: "https://runedra.cn",
    date: "2024 - 至今",
    stack: "Nuxt 4 / Graph / RxJS / AI 驱动",
    roles: ["全栈开发", "产品设计", "前端开发"],
    tags: ["知识图谱", "信息架构设计", "持续迭代", "线上产品"],
    evidence: ["线上运营：runedra.cn"],
    star: {
      situation: "通用 AI 对话无法感知学习者已有的知识边界，输出内容要么过于基础、要么缺乏上下文衔接，难以真正加速学习。",
      task: "",
      actions: [
        "设计自增长知识库结构：WebSearch 结果按知识结构高性能流式入库，建立多 Tag 基向量，通过多维 RAG + Memory 索引定位知识相似度",
        "数十个 Agent 角色协作的 Harness：覆盖信息收集、知识提炼、敏感审查、日志分析与提示词自优化，支撑学习情况的持续追踪",
        "实时渲染性能架构：知识图谱与知识库并发接入多路数据流，基于 RxJS 管道 + 适配器模式消除竞态条件，实现多阶段所见即所得",
      ],
      results: [
        "产品持续线上运营（runedra.cn），知识图谱在多数据流并发写入下保持流畅渲染，无明显掉帧",
        "知识库结构支持自动扩充，用户学习路径随使用深度动态调整，形成越用越精准的个性化推荐",
      ],
    },
    icon: "ph:tree-structure-bold",
  },
  {
    id: "wow-magician",
    enabled: true,
    title: "WoW Magician — AI 战术板与排轴系统",
    summary: "将魔兽世界副本战术决策从人工排布数分钟压缩至 3 秒 AI 自动生成，线上服务多个团队",
    url: "https://wow.parallized.cn",
    date: "2025",
    stack: "Full-Stack / Lua / Rust / RabbitMQ / Konva / 规则引擎",
    roles: ["Agent 开发", "全栈开发", "后端开发", "数据可视化"],
    tags: ["策略协作", "规则系统", "AI 辅助生成", "线上产品"],
    evidence: ["线上运营：wow.parallized.cn"],
    star: {
      situation: "副本团队面对每次版本更新的新 BOSS 机制，需要人工分析数十个技能组合、手动排布 10 分钟战术轴，耗时且容易遗漏关键技能窗口。",
      task: "构建 AI 规则引擎，自动识别新机制组合并入库，通过黑白名单与优先级匹配在 3 秒内生成完整战术决策。",
      actions: [
        "IDA MCP 逆向分析工具链：基于 LLM 分析函数签名与调用关系，在零逆向基础下一周内完成数百个关键游戏数据挖掘，直接并入 AI 决策知识库",
        "跨语言通信架构：Lua 客户端采集实时战场数据，通过 WebSocket 广播至 RabbitMQ 分 Patch 削峰，后端 AI Worker 消费解算后推送战术方案",
        "高性能前端渲染：Konva 支撑战术板万级元素渲染，Rust 实现 A* 寻路服务（响应 < 5ms）支撑实时路径预判",
      ],
      results: [
        "战术排布耗时从人工 3-5 分钟压缩至 3 秒 AI 自动生成，版本更新后新机制平均 1 小时内完成知识库更新",
        "线上稳定运营（wow.parallized.cn），持续服务多个副本团队",
      ],
    },
    icon: "ph:magic-wand-bold",
  },
  {
    id: "player-community-leader",
    enabled: true,
    title: "Minecraft 游戏社区服务器 — 独立研发与商业运营",
    summary: "小学起独立完成从插件开发、服务端架构到社区运营的全链路，累计注册用户 10W+，月纯利最高 20k",
    url: "https://github.com/parallized",
    date: "2012 - 2017",
    stack: "Java / Spigot / JVM 调优 / 游戏系统设计 / 运营策划",
    roles: ["全栈开发", "产品设计", "后端开发"],
    tags: ["游戏服务器", "插件开发", "商业运营", "玩法设计"],
    evidence: [],
    star: {
      situation: "小学时期想创作自己的游戏玩法，从社区低代码工具和 Notepad++ 写 JSON 开始，逐步进入 Java 插件开发——没有人教，全靠折腾。",
      task: "",
      actions: [
        "从零搭建 RPG 插件与服务器：优化 JVM 参数、扩容硬件、设计关卡与物品系统，独立完成从技术到 UI 的全流程玩法策划",
        "借助自制插件、地图与社区运营，将常态在线从 50+ 扩大到 500，拓展多种游戏模式，建立付费会员体系",
        "独立处理运营危机：服务器故障、用户投诉、社区舆情均无外部支持下独立解决，积累了早于正式教育的工程与产品直觉",
      ],
      results: [
        "全生命周期服务器 10+，累计注册用户 10W+，持续稳定运营 2 年",
        "月纯利从 2k 增长至 20k，验证了独立负责「技术 + 产品 + 运营 + 变现」全链路的可行性",
      ],
    },
    icon: "ph:cube-bold",
  },
  // ── 项目池（控制面板可开启）──
  {
    id: "lab-mit-6s081",
    enabled: false,
    title: "MIT 6.S081: Operating Systems (Labs)",
    summary: "基于 C 语言在 xv6 内核实现进程管理、虚拟内存及日志文件系统等核心模块。",
    url: "https://pdos.csail.mit.edu/6.S081/2020/index.html",
    date: "2025",
    stack: "C / xv6 / QEMU / GDB",
    roles: ["后端开发", "逆向工程", "计算机系统"],
    tags: ["OS Kernel", "Virtual Memory", "Multithreading", "Locking"],
    evidence: [],
    star: {
      situation: "",
      task: "",
      actions: [
        "实现 System Calls、COW Fork 与 Page Table 管理，深入理解虚拟内存机制",
        "开发多线程支持与 Lock 机制，确保内核态代码在多核环境下的并发安全",
        "扩展 xv6 文件系统，支持大文件存储，理解磁盘 I/O 与 inode 结构",
      ],
      results: [],
    },
    icon: "ph:cpu-bold",
  },
  {
    id: "lab-cs144",
    enabled: false,
    title: "CS144: Introduction to Computer Networking (Labs)",
    summary: "从零构建支持可靠传输与拥塞控制的 TCP/IP 协议栈。",
    url: "https://cs144.github.io/",
    date: "2025",
    stack: "C++ / TCP/IP / Wireshark / Linux",
    roles: ["后端开发", "计算机系统"],
    tags: ["TCP/IP", "Flow Control", "Reliable Transport", "Router"],
    evidence: [],
    star: {
      situation: "",
      task: "",
      actions: [
        "实现 TCP Receiver / Sender，滑动窗口与 ACK/Retransmit 机制解决丢包与乱序",
        "开发 Network Interface 模块，处理 Ethernet 帧封装与 ARP 缓存，打通 IP 路由与链路层",
        "Wireshark 抓包压测，分析并优化拥塞控制算法",
      ],
      results: [],
    },
    icon: "ph:globe-hemisphere-west-bold",
  },
  {
    id: "lab-cmu-15445",
    enabled: false,
    title: "CMU 15-445: Database Systems (Labs)",
    summary: "从零实现基于 BusTub 框架、支持 ACID 特性的关系型数据库存储引擎。",
    url: "https://15445.courses.cs.cmu.edu/",
    date: "2025",
    stack: "C++ / Database / Storage Engine / Buffer Pool",
    roles: ["后端开发", "计算机系统"],
    tags: ["Storage Engine", "B+ Tree", "Concurrency Control", "Buffer Pool"],
    evidence: [],
    star: {
      situation: "",
      task: "",
      actions: [
        "实现 LRU-K 缓冲池管理与支持并发的 B+ Tree 索引",
        "完成基于两阶段锁 (2PL) 的并发控制逻辑，实现不同隔离级别",
        "构建 Volcano 模型查询执行引擎，支持顺序扫描、索引连接等算子",
      ],
      results: [],
    },
    icon: "ph:database-bold",
  },
  {
    id: "npt",
    enabled: false,
    title: "Notion Project Tracker — AI 可执行项目中枢",
    summary: "将 Notion 升级为 AI Agent 可直接领票、执行、上报的项目中枢",
    url: "https://github.com/parallized/notion-project-tracker",
    date: "2026",
    stack: "Python / Notion MCP / Notion REST / Claude Code / Codex",
    roles: ["Agent 开发", "后端开发", "全栈开发", "产品设计"],
    tags: ["任务状态机", "MCP + REST 混合链路", "Skill 抽象", "可追溯交付"],
    evidence: ["为 Maple 的核心设计提供了直接经验积累"],
    star: {
      situation: "Notion 作为 All-in-one 工具管理任务，但 AI 执行结果无法自动回写，每次都需要人工粘贴同步。",
      task: "让 AI Agent 直接在 Notion 中领票、执行、上报，形成闭环。",
      actions: [
        "定义完整状态流与报告输出格式约束，确保任务全程可追溯",
        "组合 Notion MCP 与 REST API 双查询链路，解决 MCP 单点故障，提升任务发现稳定性",
      ],
      results: [
        "从需求到交付的协作成本降低约 70%，沉淀了可复用的 AI 项目执行模板",
      ],
    },
    icon: "ph:check-square-offset-bold",
  },
  {
    id: "para-navigation",
    enabled: false,
    title: "para-navigation — 高性能导航微服务",
    summary: "基于 Rust + Detour / NavMesh 的 RESTful 导航服务，路径规划响应 < 5ms",
    url: "https://github.com/parallized/para-navigation",
    date: "2026",
    stack: "Rust / Axum / C++ FFI / Detour NavMesh / Node E2E",
    roles: ["后端开发", "全栈开发", "数据可视化"],
    tags: ["路径规划", "Rust 服务化", "C++ FFI", "E2E 测试覆盖"],
    evidence: [],
    star: {
      situation: "游戏流水线需要毫秒级响应的 NavMesh 导航能力，现有方案无法灵活扩展。",
      task: "将底层 NavMesh 封装为可独立部署、标准化调用、自动化验证的 HTTP 微服务。",
      actions: [
        "Axum 搭建高性能 API 层，统一 POST JSON 请求约定",
        "Rust FFI 对接 C++ bridge 与 Detour 内核，保留原生性能同时获得 Rust 内存安全保障",
        "实现 10+ 核心接口（path / cast-ray / random-point 等），TDD 编排自动化 E2E 测试套件",
      ],
      results: [
        "路径规划响应时间 < 5ms，已稳定服务于逆向工具流水线的实时空间查询",
      ],
    },
    icon: "ph:navigation-arrow-bold",
  },
  {
    id: "ash-iris",
    enabled: false,
    title: "Ash Iris — 交互式简历与个人站点",
    summary: "支持暗黑模式、双栏布局与岗位模板切换的交互式简历系统",
    url: "https://parallized.cn",
    date: "持续迭代",
    stack: "Nuxt 4 / Vue 3 / Tailwind v4 / GSAP",
    roles: ["前端开发", "UI / UX 设计", "产品设计", "全栈开发"],
    tags: ["品牌表达", "打印友好", "可定制简历", "多岗位裂变"],
    evidence: ["线上可访问：parallized.cn，支持实时内容切换与 PDF 导出"],
    star: {
      situation: "单一静态简历无法覆盖多岗位投递需求，每次改稿成本高。",
      task: "构建可按 JD 快速裁剪的交互式简历系统，支持「一份底稿 + 多岗位定制」的高效投递工作流。",
      actions: [
        "搭建控制抽屉，支持项目与技能的细粒度开关与岗位模板一键切换",
        "完善深浅色模式、单/双栏布局、移动端适配与 A4 打印样式",
        "引入岗位模板与 localStorage 持久化，减少每次投递改稿成本",
      ],
      results: ["单次投递准备时间从约 30 分钟压缩至 2 分钟"],
    },
    icon: "ph:browsers-bold",
  },
  {
    id: "owocaptain",
    enabled: false,
    title: "OwOcaptain — 游戏地图理解与点位速查",
    summary: "守望先锋地图空间信息可视化工具，支持实战前 30 秒完成关键点位确认",
    url: "https://owo.parallized.cn",
    date: "2025",
    stack: "Web App / Spatial Visualization / UX Design",
    roles: ["数据可视化", "前端开发", "产品设计", "技术美术"],
    tags: ["空间信息可视化", "高密度速查", "战术辅助", "线上产品"],
    evidence: ["线上持续运营：owo.parallized.cn"],
    star: {
      situation: "战术学习资料分散在视频和帖子中，关键点位在实战前 30 秒难以快速检索。",
      task: "设计高密度但易扫读的地图空间信息工具。",
      actions: [
        "按地图×角色×场景三维索引重组信息，消除跳转和记忆负担",
        "优化交互路径，将常用视角和策略信息前置到高频入口，减少操作步骤",
      ],
      results: ["已被团队在实战中持续使用，形成可复用的空间信息可视化交互模板"],
    },
    icon: "ph:magnifying-glass-bold",
  },
]);

const enabledResumeItems = computed(() => resumeItems.value.filter((i) => i.enabled));
const enabledProjectsPool = computed(() => projectPool.value.filter((p) => p.enabled));
const enabledProjects = computed(() => enabledProjectsPool.value.filter((p) => !p.id.startsWith("lab-")));
const enabledLabs = computed(() => enabledProjectsPool.value.filter((p) => p.id.startsWith("lab-")));
const enabledExperiences = computed(() => experiencePool.value.filter((e) => e.enabled));

// resumeGroups 仅供控制面板分组展示，简历主体依然使用 enabledResumeItems 平铺
const resumeGroups = computed(() => {
  const map = new Map<ResumeTag, ResumeItem[]>();
  for (const tag of RESUME_TAGS) map.set(tag, []);
  for (const item of enabledResumeItems.value) map.get(item.tag)?.push(item);
  return RESUME_TAGS.map((tag) => ({ tag, items: map.get(tag) ?? [] })).filter((g) => g.items.length > 0);
});

const closeDrawer = () => { drawerOpen.value = false; };
const toggleDrawer = () => { drawerOpen.value = !drawerOpen.value; };
const printResume = () => { window.print(); };

const selectAll = () => {
  for (const item of resumeItems.value) item.enabled = true;
  for (const project of projectPool.value) project.enabled = true;
  for (const exp of experiencePool.value) exp.enabled = true;
};

const TEMPLATES = [
  { id: "all", name: "全部内容", tags: [] },
  { id: "ai-startup", name: "AI Startup", tags: ["AI-Native 开发", "Agent 开发", "全栈开发", "逆向工程", "计算机系统"] },
  { id: "agent", name: "Agent 架构", tags: ["Agent 开发", "后端开发", "全栈开发", "计算机系统"] },
  { id: "frontend", name: "前端 / UIUX", tags: ["前端开发", "UI / UX 设计", "Three.js 开发", "数据可视化"] },
  { id: "game", name: "游戏 / Unity", tags: ["Unity 开发", "技术美术", "Three.js 开发"] },
  { id: "product", name: "产品 / 全栈", tags: ["产品设计", "全栈开发", "前端开发", "后端开发"] },
] as const;

const applyTemplate = (tags: readonly string[]) => {
  if (tags.length === 0) { selectAll(); return; }
  for (const item of resumeItems.value) item.enabled = tags.includes(item.tag);
  for (const project of projectPool.value) project.enabled = project.roles.some((r) => tags.includes(r));
  for (const exp of experiencePool.value) exp.enabled = true;
};

const persistControls = () => {
  try {
    const data: PersistedState = {
      resume: resumeItems.value.map((i) => ({ id: i.id, enabled: i.enabled })),
      projects: projectPool.value.map((p) => ({ id: p.id, enabled: p.enabled })),
      experience: experiencePool.value.map((e) => ({ id: e.id, enabled: e.enabled })),
      isTwoColumn: isTwoColumn.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
};

const restoreControls = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as PersistedState;
    if (Array.isArray(parsed.resume)) {
      const map = new Map(parsed.resume.map((i) => [i.id, i.enabled]));
      for (const item of resumeItems.value) { const e = map.get(item.id); if (typeof e === "boolean") item.enabled = e; }
    }
    if (Array.isArray(parsed.projects)) {
      const map = new Map(parsed.projects.map((p) => [p.id, p.enabled]));
      for (const project of projectPool.value) { const e = map.get(project.id); if (typeof e === "boolean") project.enabled = e; }
    }
    if (Array.isArray(parsed.experience)) {
      const map = new Map(parsed.experience.map((e) => [e.id, e.enabled]));
      for (const exp of experiencePool.value) { const en = map.get(exp.id); if (typeof en === "boolean") exp.enabled = en; }
    }
    if (typeof parsed.isTwoColumn === "boolean") isTwoColumn.value = parsed.isTwoColumn;
  } catch { /* ignore */ }
};

const onKeydown = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer(); };

watch(drawerOpen, (open) => {
  if (typeof document !== "undefined") document.body.style.overflow = open ? "hidden" : "";
});
watch(isDark, () => {
  if (typeof window === "undefined") return;
  localStorage.setItem(DARK_KEY, String(isDark.value));
  syncDarkClass();
});
watch([resumeItems, projectPool, experiencePool, isTwoColumn], () => {
  if (typeof window !== "undefined") persistControls();
}, { deep: true });

onMounted(() => {
  restoreControls();
  isDark.value = localStorage.getItem(DARK_KEY) === "true";
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
    <div
      class="page-wrap mx-auto w-full px-4 py-8 transition-all duration-500 md:px-8 md:py-12"
      :class="isTwoColumn ? 'max-w-none' : 'max-w-[1200px]'"
    >
      <article class="sheet overflow-hidden rounded-2xl bg-white shadow-[0_24px_70px_rgba(0,0,0,0.10)] ring-1 ring-black/5 transition-colors duration-300 dark:bg-neutral-800 dark:shadow-[0_24px_70px_rgba(0,0,0,0.50)] dark:ring-white/10">
        <main class="p-8 md:p-12">

          <!-- ── Header ── -->
          <header class="mb-10 flex flex-col items-start justify-between gap-6 pb-4 md:flex-row md:items-end">
            <div class="space-y-3">
              <h1 class="font-serif text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
                AI Native & 全栈开发
              </h1>
              <p class="font-sans text-[14px] font-light text-neutral-600 dark:text-neutral-400">
                2 年 AI / 互联网项目实习经验，主导多个 0→1 产品从架构到上线。<br>
                擅长在模糊需求下快速落地可交付的 Agent 工作流与全栈系统，有多个线上产品持续运营。
              </p>
              <div class="h-1 w-12 bg-neutral-900 dark:bg-neutral-100"></div>
            </div>

            <div class="grid grid-cols-1 gap-x-8 gap-y-4 text-[14px] sm:grid-cols-2">
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                  <Icon name="ph:envelope-simple-bold" class="opacity-60" />
                  <a href="mailto:parallized@outlook.com" class="hover:underline">parallized@outlook.com</a>
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
                <div class="text-[16px] font-semibold text-neutral-900 dark:text-white">浙江科技大学</div>
                <div class="text-[14px] text-neutral-500 dark:text-neutral-400">数字媒体技术 本科 2021 - 2026</div>
              </div>
            </div>
          </header>

          <div :class="isTwoColumn ? 'grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-x-8' : 'flex flex-col'">

            <!-- ── Skills：平铺，不分组 ── -->
            <div class="space-y-10">
              <section v-if="enabledResumeItems.length" class="space-y-4">
                <h2 class="flex items-center gap-2 border-b border-neutral-100 pb-2 font-serif text-xl font-bold tracking-tight text-neutral-900 dark:border-neutral-800 dark:text-white">
                  专业技能
                </h2>
                <ul class="space-y-1.5 text-[14px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                  <li v-for="item in enabledResumeItems" :key="item.id" class="relative pl-4">
                    <span class="absolute left-0 top-2 h-1.5 w-1.5 rounded-full border border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800"></span>
                    {{ item.label }}
                  </li>
                </ul>
              </section>
            </div>

            <!-- ── Right / Main column ── -->
            <div class="space-y-12" :class="isTwoColumn ? 'pl-4' : 'pt-8'">

              <!-- Core Labs -->
              <section v-if="enabledLabs.length" class="space-y-4">
                <h2 class="font-serif text-xl font-bold tracking-tight text-neutral-900 dark:text-white">核心实践</h2>
                <div class="space-y-6">
                  <article v-for="lab in enabledLabs" :key="lab.id" class="space-y-1.5">
                    <div class="flex items-baseline justify-between gap-4 border-b border-neutral-300/50 pb-1.5 dark:border-neutral-700/50">
                      <h3 class="flex items-center gap-1.5 font-serif text-lg font-bold text-neutral-900 dark:text-white">
                        <Icon v-if="lab.icon" :name="lab.icon" class="text-sm opacity-70" />
                        <a :href="lab.url" target="_blank" class="hover:underline">{{ lab.title }}</a>
                      </h3>
                      <span class="shrink-0 font-mono text-[15px] font-semibold text-neutral-400 dark:text-neutral-500">{{ lab.date }}</span>
                    </div>
                    <p class="text-[14px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                      {{ lab.summary }}
                      <span class="ml-1 text-[12px] font-normal text-neutral-500/70">{{ lab.stack }}</span>
                    </p>
                    <ul v-if="lab.star.actions.length" class="list-disc space-y-0.5 pl-4 text-[14px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                      <li v-for="action in lab.star.actions" :key="action">{{ action }}</li>
                    </ul>
                  </article>
                </div>
              </section>

              <!-- Internship -->
              <section v-if="enabledExperiences.length" class="space-y-4">
                <h2 class="font-serif text-xl font-bold tracking-tight text-neutral-900 dark:text-white">实习经历</h2>
                <div class="space-y-6">
                  <article v-for="exp in enabledExperiences" :key="exp.id" class="space-y-1.5">
                    <div class="flex items-baseline justify-between gap-4 border-b border-neutral-300/50 pb-1.5 dark:border-neutral-700/50">
                      <h3 class="font-serif text-lg font-bold text-neutral-900 dark:text-white">{{ exp.company }}</h3>
                      <span class="shrink-0 font-mono text-[15px] font-semibold text-neutral-400 dark:text-neutral-500">{{ exp.date }}</span>
                    </div>
                    <ul class="list-disc space-y-1 pl-4 text-[14px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                      <li v-for="item in exp.items" :key="item">{{ item }}</li>
                    </ul>
                  </article>
                </div>
              </section>

              <!-- Projects -->
              <section v-if="enabledProjects.length" class="space-y-4">
                <h2 class="font-serif text-xl font-bold tracking-tight text-neutral-900 dark:text-white">项目经验</h2>
                <div class="space-y-6">
                  <article v-for="project in enabledProjects" :key="project.id" class="group space-y-2">

                    <div class="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-neutral-300/50 pb-1.5 dark:border-neutral-700/50">
                      <h3 class="flex items-center gap-2 font-serif text-lg font-bold text-neutral-900 dark:text-white">
                        <Icon v-if="project.icon" :name="project.icon" class="shrink-0 text-base opacity-70" />
                        <a :href="project.url" target="_blank" class="hover:underline hover:decoration-neutral-400">{{ project.title }}</a>
                      </h3>
                      <span class="font-mono text-[15px] font-semibold text-neutral-400 dark:text-neutral-500">{{ project.date }}</span>
                    </div>

                    <p class="text-[15px] font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
                      {{ project.summary }}
                      <span class="ml-1 text-[12px] font-normal text-neutral-500 dark:text-neutral-400">{{ project.stack }}</span>
                    </p>

                    <div class="space-y-2 text-[14px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                      <!-- v-if 守卫：空字段不渲染，避免打印出现空白行 -->
                      <p v-if="project.star.situation || project.star.task">
                        {{ [project.star.situation, project.star.task].filter(Boolean).join(' ') }}
                      </p>
                      <ul v-if="project.star.actions.length" class="list-disc space-y-0.5 pl-4">
                        <li v-for="action in project.star.actions" :key="action">{{ action }}</li>
                      </ul>
                      <!-- results 加深色，视觉上与 actions 区分 -->
                      <ul v-if="project.star.results.length" class="list-disc space-y-0.5 pl-4 font-medium text-neutral-800 dark:text-neutral-200">
                        <li v-for="result in project.star.results" :key="result">{{ result }}</li>
                      </ul>
                    </div>

                    <div v-if="project.evidence.length" class="text-[13px] italic text-neutral-500 dark:text-neutral-500">
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

    <!-- ── Controls (No-Print) ── -->
    <Teleport to="body">
      <div class="no-print fixed bottom-6 right-6 z-[9999] flex items-center gap-1.5 rounded-2xl bg-white/80 p-1.5 shadow-2xl ring-1 ring-black/5 backdrop-blur-md transition-all hover:bg-white dark:bg-neutral-800/80 dark:ring-white/10 dark:hover:bg-neutral-800">
        <button type="button" class="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 transition hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700" :title="isDark ? '切换到亮色模式' : '切换到暗色模式'" @click="isDark = !isDark">
          <Icon :name="isDark ? 'ph:sun-bold' : 'ph:moon-bold'" class="text-lg" />
        </button>
        <div class="h-4 w-px bg-neutral-200 dark:bg-neutral-700"></div>
        <button type="button" class="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 transition hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700" :class="{ 'bg-neutral-100 text-neutral-900 dark:bg-neutral-700 dark:text-white': isTwoColumn }" title="切换单/双栏布局" @click="isTwoColumn = !isTwoColumn">
          <Icon :name="isTwoColumn ? 'ph:columns-bold' : 'ph:rows-bold'" class="text-lg" />
        </button>
        <div class="h-4 w-px bg-neutral-200 dark:bg-neutral-700"></div>
        <button type="button" class="flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 text-xs font-bold text-white shadow-lg transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100" @click="toggleDrawer">
          <Icon name="ph:sliders-horizontal-bold" class="text-base" />
          <span>控制面板</span>
        </button>
      </div>

      <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="drawerOpen" class="no-print fixed inset-0 z-[10000] bg-black/30 backdrop-blur-sm dark:bg-black/60" @click="closeDrawer" />
      </Transition>

      <Transition enter-active-class="transition-transform duration-300 ease-out" enter-from-class="translate-x-full" enter-to-class="translate-x-0" leave-active-class="transition-transform duration-200 ease-in" leave-from-class="translate-x-0" leave-to-class="translate-x-full">
        <aside v-if="drawerOpen" class="no-print fixed right-0 top-0 z-[10001] h-full w-[min(1200px,100vw)] bg-white shadow-2xl ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10" role="dialog" aria-modal="true">
          <div class="flex h-full flex-col">
            <div class="flex items-start justify-between gap-4 border-b border-neutral-200/70 p-6 dark:border-neutral-800">
              <div class="space-y-1">
                <h2 class="text-lg font-black tracking-tight">简历控制面板</h2>
                <p class="text-xs text-neutral-500 dark:text-neutral-400">调整简历内容以适配特定岗位</p>
              </div>
              <button type="button" class="h-10 w-10 rounded-xl bg-neutral-100 transition hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700" aria-label="关闭" @click="closeDrawer">
                <Icon name="ph:x" class="text-lg opacity-70" />
              </button>
            </div>

            <div class="flex-1 space-y-12 overflow-auto p-6 md:p-10" data-lenis-prevent>
              <section class="space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-[12px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">岗位模版</h3>
                  <button type="button" class="text-xs font-bold text-neutral-900 underline underline-offset-4 dark:text-white" @click="printResume">打印 / 导出 PDF</button>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button v-for="tpl in TEMPLATES" :key="tpl.id" type="button" class="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700" @click="applyTemplate(tpl.tags)">
                    {{ tpl.name }}
                  </button>
                </div>
              </section>

              <section class="space-y-6">
                <div class="flex items-baseline gap-3">
                  <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">技能项</h3>
                  <button class="text-[10px] font-bold opacity-60 hover:opacity-100" @click="selectAll">全选</button>
                </div>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div v-for="item in resumeItems" :key="item.id" class="flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50/30 p-4 transition-colors hover:bg-neutral-100/50 dark:border-neutral-800 dark:bg-black/20 dark:hover:bg-white/5">
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

              <section class="space-y-6">
                <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">实习经历</h3>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div v-for="exp in experiencePool" :key="exp.id" class="flex items-start gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50">
                    <label class="relative mt-0.5 inline-flex shrink-0 cursor-pointer items-center">
                      <input v-model="exp.enabled" type="checkbox" class="peer sr-only" />
                      <span class="h-4 w-7 rounded-full bg-neutral-200 transition peer-checked:bg-neutral-900 dark:bg-neutral-800 dark:peer-checked:bg-white" />
                      <span class="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition peer-checked:translate-x-3 dark:bg-neutral-900" />
                    </label>
                    <div class="min-w-0">
                      <div class="truncate text-xs font-bold">{{ exp.company }}</div>
                      <div class="truncate text-[10px] text-neutral-500">{{ exp.date }}</div>
                    </div>
                  </div>
                </div>
              </section>

              <section class="space-y-6">
                <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">核心实验</h3>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div v-for="project in projectPool.filter(p => p.id.startsWith('lab-'))" :key="project.id" class="flex items-start gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50">
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

              <section class="space-y-6">
                <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">项目池</h3>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div v-for="project in projectPool.filter(p => !p.id.startsWith('lab-'))" :key="project.id" class="flex items-start gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50">
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

.font-serif { font-family: 'Crimson Pro', 'Noto Sans SC', serif; }
.font-sans  { font-family: 'Inter', 'Noto Sans SC', sans-serif; }

@page { size: A4; margin: 0; }

@media print {
  .no-print { display: none !important; }
  .cv-bg { padding: 0 !important; background: white !important; color: black !important; }
  .page-wrap { max-width: none !important; padding: 0 !important; margin: 0 !important; }
  .sheet {
    box-shadow: none !important;
    border-radius: 0 !important;
    background: white !important;
    color: black !important;
    width: 210mm;
    min-height: 297mm;
  }
  /* 确保暗色模式下打印也是白底黑字 */
  .sheet * { color: inherit !important; border-color: #e5e5e5 !important; background-color: transparent !important; }
  header { border-bottom: 1px solid #eee !important; padding-bottom: 2rem !important; }
  article, section { break-inside: avoid; }
  a { text-decoration: none !important; color: inherit !important; }
  h1, h2, h3 { color: black !important; }
}

.transition-transform { transition-property: transform; }
</style>