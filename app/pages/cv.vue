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
const lastUpdated = new Date().toISOString().slice(0, 10);

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
      "参与 AI 原生全栈应用构建平台 Deamoy AI 核心开发，开发 AI 与用户协同编辑模式",
      "优化流式渲染协议，达成 UI 毫秒级生成与即时反馈。接入 Shopify / Supabase 等外部数据源，实现 AI 驱动的业务系统装修",
    ],
  },
  {
    id: "internship-b",
    enabled: true,
    company: "Demoway.com",
    date: "2023.09 — 2024.11",
    items: [
      "帮助开发基于 Vue + Svelte + RxJS 的 Figma / Chrome 插件，完善 service worker 通信",
      "处理后台管理系统业务需求，优化公司产品 B 端 UX 体验，打磨产品 monorepo 组件库",
    ],
  },
  // {
  //   id: "internship-a",
  //   enabled: false,
  //   company: "Dicom 可视化",
  //   date: "2023.03 — 2023.06",
  //   items: [
  //     "重构 Java / C# + dicom 医疗信息化业务到 Node.js",
  //     "开发 Vue3 + TypeScript + Vite 医疗可视化 SPA",
  //   ],
  // },
]);

const resumeItems = ref<ResumeItem[]>([
  {
    id: "highlight-hardcore",
    enabled: true,
    tag: "逆向工程",
    label: "自研 MCP 插件实现二进制语义自动化还原，将人工变量 / 结构体分析耗时降低 90%，一周内完成传统数月级逆向工程项目。",
  },
  {
    id: "highlight-business",
    enabled: true,
    tag: "全栈开发",
    label: "作为负责人从 0 打造 10W+ 注册量游戏，实现月纯利 20k+ 的规模化盈利",
  },
  {
    id: "agent-tooling",
    enabled: true,
    tag: "Agent 开发",
    label: "熟悉 Claude Code / Codex 等工作流，多 Worker 并行执行与报告回写。常用 SDD & TDD，多级 RAG 与长短时 Memory 分层管理",
  },
  {
    id: "ai-code-literacy",
    enabled: true,
    tag: "AI-Native 开发",
    label: "具备较好的 AI 代码识读力，坚持人工代码审计与架构把关，确保 AI 生成逻辑符合生产级安全与性能标准",
  },
  {
    id: "reverse-ida",
    enabled: true,
    tag: "逆向工程",
    label: "利用 LLM 对反汇编代码进行语义化标注，自动化还原函数签名与数据结构，将二进制逆向工程从手工考古升级为 AI 辅助解构",
  },
  {
    id: "backend-distributed",
    enabled: true,
    tag: "后端开发",
    label: "Java + Redis 分布式架构设计：通过多级缓存与服务器分流策略，在 DAU 2000+ 峰值下维持系统延迟 < 100ms，支撑高并发业务场景",
  },
  {
    id: "backend-rust-service",
    enabled: true,
    tag: "后端开发",
    label: "Rust + C++ DLL 跨语言混合开发：构建高性能扫描器与内存攻防组件，利用 Axum 实现标准化 RESTful API 服务化，涵盖 A* Navigation 路径规划、射线检测等核心接口",
  },
  {
    id: "frontend-develop",
    enabled: true,
    tag: "前端开发",
    label: "熟悉 React / Nuxt 框架，常用 Nestjs / Axum 等后端框架，常用 Tauri / Electron / Capacitor 进行跨平台应用开发",
  },
  {
    id: "uiux-system",
    enabled: true,
    tag: "前端开发",
    label: "熟悉 Figma / Houdini 工具链，常用 D3 / Three.js 并深入了解交互与设计心理学，追求更好的视觉表达",
  },
  {
    id: "product-discovery",
    enabled: true,
    tag: "产品设计",
    label: "擅长在模糊需求下定义技术架构，将目标拆解为可执行阶段任务，曾在社区运营危机中 24 小时内完成补偿方案设计与业务恢复",
  },
  {
    id: "unity-editor",
    enabled: true,
    tag: "Unity 开发",
    label: "Unity/UE 引擎深度开发与编辑器扩展：具备 Houdini 过程化建模、Blender 资产工作流及 Editor Tooling 实践，探索多种 AI 链路方案",
  },
  {
    id: "threejs-viz",
    enabled: true,
    tag: "Three.js 开发",
    label: "Three.js / WebGL 空间可视化实践：具备 3D 场景构建与交互开发能力，结合空间信息可视化在游戏战术工具中实现高密度数据的直觉化呈现",
  },
  {
    id: "data-viz",
    enabled: true,
    tag: "数据可视化",
    label: "在多款游戏工具项目中实现大量地图 / 点位 / 策略的可视化呈现，形成可复用的信息展示模板，提升关键信息的查找成功率",
  },
  {
    id: "tech-art",
    enabled: true,
    tag: "技术美术",
    label: "Blender 插件兼容修复、Houdini 过程化建模、游戏资产管线搭建，打通创意到工程落地全链路",
  },
]);

const projectPool = ref<ProjectItem[]>([
  // {
  //   id: "reverse-engineering-pipeline",
  //   enabled: true,
  //   title: "AI 驱动的自动化逆向工程流水线",
  //   summary: "首创 IDA Pro MCP 插件，将 LLM 引入二进制逆向分析领域，构建从反汇编到生产交付的闭环自动化流水线。",
  //   url: "https://github.com/parallized",
  //   date: "2025 - 至今",
  //   stack: "IDA Pro MCP / Rust / C++ DLL / Python / LLM",
  //   roles: ["逆向工程", "后端开发", "Agent 开发"],
  //   tags: ["二进制分析", "内存攻防", "AI 自动化还原", "跨语言架构"],
  //   evidence: [
  //     "自研 IDA Pro MCP 插件，实现二进制代码语义恢复，将人工重命名变量/结构体分析耗时降低 90%。",
  //     "通过 Rust 高性能扫描器 + C++ 核心 DLL 的跨语言架构，达成毫秒级扫描响应。",
  //   ],
  //   star: {
  //     situation: "面对黑盒系统下极其复杂的寻路逻辑（Navmesh）与状态机，传统人工逆向解构周期长达数月，重复性标注工作占比超过 80%。",
  //     task: "构建 AI 辅助的自动化分析链路，将逆向工程周期从数月压缩至一周，同时保证还原精度。",
  //     actions: [
  //       "首创 IDA Pro MCP 插件，利用 LLM 对反汇编代码进行语义化标注，自动还原函数签名与数据结构。",
  //       "使用 Rust 编写高性能内存扫描器（毫秒级响应），C++ 开发核心业务逻辑 DLL，实现跨语言零拷贝调用。",
  //       "构建自动化状态机还原脚本与回归测试流程，消除 90% 以上的重复性人工分析工作。",
  //     ],
  //     results: [
  //       "一周内完成传统需数月的复杂寻路逻辑解构，交付高精度自动化组件。",
  //       "开创性地将 AI 能力引入逆向工程领域，形成可复用的「反汇编→语义标注→代码生成」流水线。",
  //     ],
  //   },
  // },
  {
    id: "lab-mit-6s081",
    enabled: true,
    title: "MIT 6.S081: Operating Systems (Labs)",
    summary: "基于 C 语言在 xv6 内核实现进程管理、虚拟内存及日志文件系统等核心模块。",
    url: "https://pdos.csail.mit.edu/6.S081/2020/index.html",
    date: "2025",
    stack: "C / xv6 / QEMU / GDB",
    roles: ["后端开发", "逆向工程", "计算机系统"],
    tags: ["OS Kernel", "Virtual Memory", "Multithreading", "Locking"],
    evidence: [
      "实现 COW Fork、Lazy Allocation 与 Page Table 映射，深入理解虚拟内存管理机制。",
      "重构内存分配器与多线程调度逻辑，利用 Lock 机制处理高并发下的 Race Condition。",
    ],
    star: {
      situation: "操作系统底层机制是计算机科学的基石，对于理解高性能并发、内存安全及系统级优化至关重要。",
      task: "从零实现 xv6 内核的关键组件，通过核心实验掌握操作系统核心原理。",
      actions: [
        "实现 System Calls、Page Table 管理及 COW Fork，优化进程创建与内存使用效率。",
        "开发基于硬件中断的多线程支持与 Lock 机制，确保内核态代码在多核环境下的并发安全性。",
        "扩展 xv6 文件系统，支持大文件存储，理解磁盘 I/O 链路与 inode 结构设计。",
      ],
      results: [],
    },
    icon: "ph:cpu-bold",
  },
  {
    id: "lab-cs144",
    enabled: true,
    title: "CS144: Introduction to Computer Networking (Labs)",
    summary: "从零构建支持可靠传输与拥塞控制的 TCP/IP 协议栈。",
    url: "https://cs144.github.io/",
    date: "2025",
    stack: "C++ / TCP/IP / Wireshark / Linux",
    roles: ["后端开发", "计算机系统"],
    tags: ["TCP/IP", "Flow Control", "Reliable Transport", "Router"],
    evidence: [
      "实现滑动窗口协议与重传机制，在不稳定网络环境下保证数据的 100% 可靠传输。",
      "构建 ARP 映射与 IP 路由转发逻辑，实现从数据链路层到网络层的全链路闭环。",
    ],
    star: {
      situation: "网络协议栈的设计直接影响分布式系统的性能与稳定性，深入理解 TCP 机制是开发高性能后端服务的基础。",
      task: "在 Minet 框架下构建一个功能完备且高性能的 TCP 协议栈。",
      actions: [
        "实现 TCP Receiver 与 Sender，通过滑动窗口与 ACK/Retransmit 机制解决报文丢包与乱序问题。",
        "开发 Network Interface 模块，处理 Ethernet 帧封装与 ARP 缓存维护，打通 IP 路由与链路层对接。",
        "模拟真实网络丢包场景进行压力测试，通过 Wireshark 抓包分析并优化拥塞控制算法。",
      ],
      results: [],
    },
    icon: "ph:globe-hemisphere-west-bold",
  },
  {
    id: "lab-cmu-15445",
    enabled: true,
    title: "CMU 15-445: Database Systems (Labs)",
    summary: "从零实现基于 BusTub 框架、支持 ACID 特性的关系型数据库存储引擎。",
    url: "https://15445.courses.cs.cmu.edu/",
    date: "2025",
    stack: "C++ / Database / Storage Engine / Buffer Pool",
    roles: ["后端开发", "计算机系统"],
    tags: ["Storage Engine", "B+ Tree", "Concurrency Control", "Buffer Pool"],
    evidence: [
      "实现 LRU-K 缓冲池管理算法与支持并发的 B+ Tree 索引。",
      "构建 Volcano 模型的查询执行引擎，支持顺序扫描、索引连接等算子。",
    ],
    star: {
      situation: "数据库存储引擎的设计是现代后端系统性能的关键因素。",
      task: "在 CMU 提供的 BusTub 框架上实现从缓冲池到索引再到执行引擎的全链路功能。",
      actions: [
        "实现可扩展哈希索引与页级别并发控制，保证索引在高并发读写下的正确性。",
        "完成基于两阶段锁 (2PL) 的并发控制逻辑，实现不同的隔离级别。",
      ],
      results: [],
    },
    icon: "ph:database-bold",
  },
  {
    id: "lab-berkeley-cs61b",
    enabled: true,
    title: "UCB CS61B: 数据结构与算法",
    summary: "实现双端队列、左倾红黑树、基于 B+ 树的数据库搜索引擎。以及基于 2D Tilemap 的世界渲染器",
    url: "https://sp21.datastructur.es/",
    date: "2024",
    stack: "Java / Git / JUnit",
    roles: ["前端开发", "全栈开发", "后端开发"],
    tags: ["Data Structures", "Algorithms", "Java", "A* Pathfinding"],
    evidence: [],
    star: {
      situation: "",
      task: "",
      actions: [],
      results: [],
    },
    icon: "ph:tree-structure-bold",
  },
  {
    id: "player-community-leader",
    enabled: true,
    title: "Minecraft 游戏社区服务器 — 独立研发与商业运营",
    summary: "从零独立打造 MC 游戏服务器，涵盖玩法设计、插件开发、服务端架构与运营",
    url: "https://github.com/parallized",
    date: "2012 - 2017",
    stack: "Java / Spigot 插件开发 / 游戏系统设计 / Redis / 运营策划",
    roles: ["全栈开发", "产品设计", "后端开发"],
    tags: ["游戏服务器", "插件开发", "商业运营", "玩法设计"],
    evidence: [
      "累计注册用户 10W+，月纯利 20k+，持续稳定运营 2 年",
      "独立完成从玩法策划、Java 插件开发、服务端运维到商业变现的全链路闭环",
    ],
    star: {
      situation: "Minecraft 服务器生态中玩法同质化严重且技术门槛较高，多数服务器难以兼顾游戏体验与商业可持续性。",
      task: "作为唯一负责人，独立完成从玩法设计、Java 插件开发、服务端架构到社区运营与变现的全链路工作",
      actions: [
        "自主设计并开发多套原创玩法系统（经济体系、成长线、赛季机制），通过 Java 插件实现定制化游戏逻辑",
        "搭建 Java + Redis 服务端架构，实现多服分流与数据持久化，保障 DAU 2000+ 峰值下的流畅游戏体验",
        "建立社区运营与危机响应体系，突发故障 24 小时内完成补偿与恢复",
      ],
      results: [
      ],
    },
    icon: "ph:cube-bold",
  },
  {
    id: "maple",
    enabled: true,
    title: "Maple — AI 编码 SDD 看板工作台",
    summary: "AI-Native 的 SDD 看板，多 Worker 任务派发、状态管理与报告回写",
    url: "https://github.com/parallized/maple",
    date: "2026",
    stack: "Tauri / MCP & Skills / CLI",
    roles: ["Agent 开发", "全栈开发", "产品设计", "前端开发"],
    tags: ["SDD 工作流", "任务看板", "多 Worker 协作", "100% 可追溯"],
    evidence: [
    ],
    star: {
      situation: "AI 编码工具缺少结构化的任务管理层，多 Agent 并行时上下文混乱，心智负担高。",
      task: "Maple 打通「任务 → 执行 → 回写」闭环，至少提高 30% 迭代速度",
      actions: [
        "设计任务 Workflow，统一多 Worker 执行视图与冲突解决，构建可视化看板 UI，提供直观的任务构思、编排与管理体验",
        "实现完整 MCP & Skills 工具集（任务查询、报告提交、标签管理、Worker 完成通知）",
      ],
      results: [
      ],
    },
    icon: "ph:kanban-bold",
  },
  {
    id: "npt",
    enabled: true,
    title: "Notion Project Tracker — AI 可执行项目中枢",
    summary: "将 Notion 升级为 AI Agent 可直接执行任务的项目中枢",
    url: "https://github.com/parallized/notion-project-tracker",
    date: "2026",
    stack: "Python / Notion MCP / Notion REST / Claude Code / Codex",
    roles: ["Agent 开发", "后端开发", "全栈开发", "产品设计"],
    tags: ["任务状态机", "MCP + REST 混合链路", "Skill 抽象", "可追溯交付"],
    evidence: [
      "执行结果、标签和评论系统形成可复用的 AI 项目执行模板，从需求到交付的协作成本降低 70%，为 Maple 的设计提供了核心经验积累",
    ],
    star: {
      situation: "Notion 作为 All-in-one 工具管理任务和原始 IDEA，但 AI 执行结果无法自动回写。",
      task: "NPT 让 AI Agent 直接在 Notion 中领票、执行、上报",
      actions: [
        "定义完整的状态流，约束报告输出格式，确保可追溯性",
        "组合 Notion MCP 与 REST API 双查询链路，解决 MCP 单点故障问题，提升任务发现稳定性",
      ],
      results: [
      ],
    },
    icon: "ph:check-square-offset-bold",
  },
  {
    id: "para-navigation",
    enabled: true,
    title: "para-navigation — 高性能导航服务",
    summary: "基于 Rust + Detour / NavMesh 的 RESTful 导航服务，支撑 3D 的路径与空间查询",
    url: "https://github.com/parallized/para-navigation",
    date: "2026",
    stack: "Rust / Axum / C++ FFI / Detour NavMesh / Node E2E",
    roles: ["后端开发", "全栈开发", "数据可视化"],
    tags: ["路径规划", "Rust 服务化", "C++ FFI", "E2E 测试覆盖"],
    evidence: [
      "路径规划响应时间 < 5ms，支撑上层自动化流程的实时空间查询需求",
      "形成可独立运行的微服务层，便于后续接入更多客户端，已稳定服务于逆向工具流水线",
    ],
    star: {
      situation: "游戏流水线需要一个高性能的导航能力服务，现有方案无法满足毫秒级响应与灵活扩展的需求。",
      task: "将底层 NavMesh 封装为可独立部署、标准化调用、自动化验证的 HTTP 服务。",
      actions: [
        "使用 Axum 搭建高性能 API 层，统一 POST JSON 请求约定，实现请求/响应的结构化处理",
        "通过 Rust FFI 对接 C++ bridge 与 Detour 内核，在保留原生性能的同时获得 Rust 的安全保障",
        "实现 health / config / path / random-point / cast-ray 等 10+ 核心接口，并 TDD 编排自动化 E2E 测试套件",
      ],
      results: [
      ],
    },
    icon: "ph:navigation-arrow-bold",
  },
  {
    id: "runedra",
    enabled: true,
    title: "Runedra 知树 — 知识学习加速平台",
    summary: "面向学习者的可视化知识图谱，提供 AI 在学习全流程的辅助",
    url: "https://runedra.cn",
    date: "2024 - 至今",
    stack: "Nuxt 4 / Graph / AI 驱动",
    roles: ["全栈开发", "产品设计", "前端开发"],
    tags: ["知识图谱", "信息架构设计", "持续迭代", "线上产品"],
    evidence: [
      "线上持续运营：runedra.cn",
    ],
    star: {
      situation: "学习资料分散在不同平台，上下文割裂，信息壁垒导致学习效率低下。",
      task: "借助 DeepSearch 与高效的交互设计使知识获取与管理更顺畅",
      actions: [
        "按学习路径重构信息架构，设计多维 RAG & Memory 索引结构，降低至少 30% 任意层级学习者心智负担",
        "深度优化的交互设计，结合 AI + DeepSearch 题库并借助平台能力高效且优雅地展示",
      ],
      results: [
      ],
    },
    icon: "ph:tree-structure-bold",
  },
  {
    id: "wow-magician",
    enabled: true,
    title: "WoW Magician — AI 战术板与排轴系统",
    summary: "面向公会协作的 AI + MRT 战术信息系统，将排轴方案从个人经验沉淀为可迭代共享的团队资产",
    url: "https://wow.parallized.cn",
    date: "2025",
    stack: "Full-Stack / AI 辅助生成 / Lua Ecosystem / 规则引擎",
    roles: ["Agent 开发", "全栈开发", "后端开发", "数据可视化"],
    tags: ["策略协作", "规则系统", "AI 辅助生成", "线上产品"],
    evidence: [
      "线上运营站点：wow.parallized.cn",
    ],
    star: {
      situation: "游戏机制排轴和战术同步完全依赖人工，信息更新慢且版本混乱，关键时刻信息可读性差。",
      task: "构建一个能快速协作、统一认知的战术信息系统，让团队在实战前 5 分钟内完成战术同步。",
      actions: [
        "将战术信息拆解为可复用模块化组件，支持多人并行查看、编辑与版本迭代。引入 AI 辅助生成与规则化处理引擎，将手工配置耗时减少 80%",
        "形成可复用的战术板工作流，团队战术同步时间从 30 分钟压缩至 5 分钟",
      ],
      results: [
      ],
    },
    icon: "ph:magic-wand-bold",
  },
  {
    id: "ash-iris",
    enabled: false,
    title: "Ash Iris — 交互式简历与个人站点",
    summary: "支持暗黑模式、双栏布局、与交互式简历系统",
    url: "https://parallized.cn",
    date: "持续迭代",
    stack: "Nuxt 4 / Vue 3 / Tailwind v4 / GSAP / 响应式组件库",
    roles: ["前端开发", "UI / UX 设计", "产品设计", "全栈开发"],
    tags: ["品牌表达", "打印友好", "可定制简历", "多岗位裂变"],
    evidence: [
      "线上可访问：parallized.cn，支持实时内容切换与 PDF 导出。",
      "产品决策：设计支持 A4 打印与暗黑模式切换的响应式组件库，在工程实现与视觉表达间取得平衡。",
    ],
    star: {
      situation: "单一静态简历无法覆盖多岗位投递需求，每次改稿成本高且容易遗漏关键信息。",
      task: "构建可按 JD 快速裁剪的交互式简历系统，支持「一份底稿 + 多岗位定制」的高效投递工作流。",
      actions: [
        "搭建可切换内容的控制抽屉，支持项目与技能的细粒度开关与岗位模板一键切换。",
        "完善深浅色模式、单/双栏布局、移动端适配与 A4 打印样式，确保多场景完美呈现。",
        "引入岗位模板（AI Startup/Agent/前端/游戏/产品）与 localStorage 持久化，减少每次投递改稿成本。",
      ],
      results: [
        "实现「一份底稿裂变多简历」工作流，单次投递准备时间从 30 分钟压缩至 2 分钟。",
        "简历内容可精准聚焦岗位关键词，显著提升 6 秒初筛通过率。",
      ],
    },
    icon: "ph:browsers-bold",
  },
  {
    id: "owocaptain",
    enabled: false,
    title: "OwOcaptain — 游戏地图理解与点位速查",
    summary: "守望先锋地图空间信息可视化工具，在短时间内完成战术复盘准备，已线上运营。",
    url: "https://owo.parallized.cn",
    date: "2025",
    stack: "Web App / Spatial Visualization / UX Design / 响应式布局",
    roles: ["数据可视化", "前端开发", "产品设计", "技术美术"],
    tags: ["空间信息可视化", "高密度速查", "战术辅助", "线上产品"],
    evidence: [
      "线上持续运营：owo.parallized.cn，实战验证的战术速查工具。",
      "产品决策：按地图×角色×场景三维索引重组信息，将查找耗时压缩 70%。",
    ],
    star: {
      situation: "战术学习资料分散在视频和帖子中，关键点位在实战前 30 秒难以快速检索和确认。",
      task: "设计一个高密度但易扫读的地图空间信息工具，支持实战前 30 秒完成关键点位确认。",
      actions: [
        "按地图×角色×场景三维索引重组信息，消除跳转和记忆负担，将查找成功率提升至 90%+。",
        "优化交互路径设计，将常用视角和策略信息前置到高频入口，减少操作步骤。",
        "持续依据实战反馈调整信息层级与视觉权重，确保关键信息在高压场景下的可读性。",
      ],
      results: [
        "形成可在 30 秒内完成信息定位的工具化页面，已被团队在实战中持续使用。",
        "沉淀了「地图/点位/策略」类空间信息可视化的可复用交互模板与设计规范。",
      ],
    },
    icon: "ph:magnifying-glass-bold",
  },
  {
    id: "safe-inset",
    enabled: false,
    title: "Safe-Inset-5.0 — Blender 插件兼容修复",
    summary: "Blender Safe Inset 插件的 5.0+ 兼容修复版，解决新版本下的加载崩溃问题并补齐文档规范。",
    url: "https://github.com/parallized/Safe-Inset-5.0",
    date: "2026",
    stack: "Python / Blender Add-on API / Geometry Processing",
    roles: ["技术美术", "Unity 开发", "Three.js 开发"],
    tags: ["几何处理", "插件兼容修复", "资产工具", "开源贡献"],
    evidence: [
      "已在 Blender 5.0.1 验证通过，解决了原插件在新版本下的加载崩溃问题。",
      "明确发布许可证、安装流程与已知限制说明，形成可交付的开源工程规范。",
    ],
    star: {
      situation: "社区高频使用的 Safe Inset 插件在 Blender 5.0 大版本升级后无法加载，影响大量用户的建模工作流。",
      task: "完成兼容修复并发布可用版本，同时补齐工程文档，降低社区接入门槛。",
      actions: [
        "定位并修复 Blender 5.0+ API 变更导致的加载与稳定性问题，保持原功能语义不变。",
        "补齐安装指南、参数说明、已知限制（几何异常场景 Merge/Clean 处理建议）和许可证声明。",
        "针对边缘 Case（非流形几何、退化面）提供明确的预处理建议，降低用户排错成本。",
      ],
      results: [
        "插件在 Blender 5.0.1 上正常运行，恢复用户的建模工作流连续性。",
        "形成完整的开源发布规范（README/LICENSE/CHANGELOG），便于社区二次维护与 Fork。",
      ],
    },
    icon: "ph:wrench-bold",
  },
  {
    id: "unity-captain",
    enabled: true,
    title: "Unity-Captain — 编辑器内 AI 工程助手",
    summary: "Unity 编辑器内嵌 AI 对话与工程结构辅助实验，探索 AI 深度融入游戏开发工作流的可行路径",
    url: "https://github.com/parallized/Unity-Captain-Demoscene",
    date: "2024",
    stack: "Unity / C# / Editor Tooling / AI Integration",
    roles: ["Unity 开发", "技术美术", "Agent 开发"],
    tags: ["编辑器扩展", "AI 工程辅助", "Demo 场景验证", "工具原型"],
    evidence: [
      "开源项目，README 公开 roadmap：EditorWindow 对话 + 文件结构 Schema 自动提取",
      "Demo 场景可运行，验证了编辑器内 AI 助手方案的技术可行性",
    ],
    star: {
      situation: "项目中内容整理与工程理解成本极高，开发者频繁在 IDE / 浏览器 / 文档间切换上下文",
      task: "探索在 Unity 编辑器内嵌入 AI 智能助手，将工程理解与调试辅助集成到开发者的核心工作面",
      actions: [
        "实现 EditorWindow 对话交互原型，支持自然语言查询项目结构与组件关系",
        "开发文件结构自动 Schema 提取工具，将项目拓扑可视化，辅助 AI 理解工程上下文",
        "沉淀 Unity Editor Tooling 开发实践与 C# 反射机制经验，可迁移到更复杂的游戏工具项目",
      ],
      results: [
      ],
    },
    icon: "ph:game-controller-bold",
  },
  {
    id: "dalamud-plugins",
    enabled: true,
    title: "DalamudPlugins — 游戏插件生态索引",
    summary: "FFXIV 插件索引与维护仓库，面向游戏工具生态的统一分发与版本管理入口。",
    url: "https://github.com/Nesb01t/DalamudPlugins",
    date: "2026",
    stack: "C# / Plugin Ecosystem / Game Tooling / CI/CD",
    roles: ["Unity 开发", "全栈开发", "技术美术"],
    tags: ["插件分发", "游戏工具生态", "社区维护", "版本管理"],
    evidence: [
      "面向社区的开源仓库，统一了插件入口与版本获取路径。",
      "持续维护文档与链接可用性，形成具有社区可见度的工具分发入口。",
    ],
    star: {
      situation: "FFXIV 插件生态高度分散，用户难以统一获取、验证与更新工具，开发者缺少标准化分发渠道。",
      task: "构建清晰的插件索引入口，沉淀可持续维护的分发机制，降低生态碎片化程度。",
      actions: [
        "维护标准化的仓库索引结构，统一插件入口、版本号与获取路径。",
        "聚合核心工具仓库并验证兼容性，降低用户查找和接入成本。",
        "持续维护文档与链接可用性，建立社区信任并减少使用门槛。",
      ],
      results: [
        "形成具有社区可见度的插件入口仓库，提升工具可发现性与分发效率。",
        "为后续游戏工具产品化和运维协作提供标准化基础设施。",
      ],
    },
    icon: "ph:plug-bold",
  },
  {
    id: "vertree",
    enabled: true,
    title: "Vertree — Rust 高性能压力测试工具",
    summary: "自研的 Rust 异步网络压测工具，保证测试工具本身不成为瓶颈，支持可配置的压测场景。",
    url: "https://github.com/parallized/Vertree",
    date: "2026",
    stack: "Rust / Tokio 异步运行时 / 网络编程 / 性能分析",
    roles: ["后端开发", "全栈开发"],
    tags: ["压力测试", "Rust 异步", "工具开发", "性能瓶颈分析"],
    evidence: [
      "基于 Tokio 异步运行时构建，高并发下工具自身 CPU 占用 < 5%，不成为测试瓶颈。",
      "支持可配置s的请求模式（渐进/脉冲/恒压），适配不同压测场景。",
    ],
    star: {
      situation: "自建服务上线前需要可控的压力验证，现有通用工具不够灵活且难以定制协议。",
      task: "开发一个高性能、可定制的压力测试工具，精准评估服务在极端负载下的表现。",
      actions: [
        "使用 Rust + Tokio 异步运行时实现高并发请求引擎，确保工具自身零瓶颈。",
        "设计可配置的请求模式（渐进加压/脉冲/恒压），支持自定义协议与请求模板。",
        "集成实时性能指标采集（延迟分布/吞吐量/错误率），输出结构化测试报告。",
      ],
      results: [
        "完成可用的压力测试工具，成功验证 para-navigation 服务在 10K+ 并发下的稳定性。",
        "积累 Rust 异步网络编程与性能分析实践经验，提升系统级工程能力。",
      ],
    },
    icon: "ph:activity-bold",
  },
  {
    id: "lineup",
    enabled: true,
    title: "Lineup — 多游戏战术速查平台",
    summary: "覆盖 Valorant / OW / War Thunder 等多款游戏的统一战术查阅平台",
    url: "https://github.com/parallized/Lineup",
    date: "2025",
    stack: "Web App / 空间信息可视化 / 游戏数据 / UX 设计",
    roles: ["数据可视化", "前端开发", "产品设计"],
    tags: ["游戏辅助", "多游戏 Lineup", "空间信息", "战术工具"],
    evidence: [
      "多款热门游戏的战术点位数据，沉淀了空间信息展示的可复用交互模式与数据组织规范",
    ],
    star: {
      situation: "FPS 游戏中的技巧散落在视频和帖子中，难以快速检索。",
      task: "构建统一的多游戏查阅平台，实现 Lineup 时的快速定位与检索",
      actions: [
        "设计跨游戏统一的信息架构（游戏 → 地图 → 角色 → 点位），降低用户认知和查找成本",
        "优化浏览路径与交互设计，确保实战前 30 秒内可获取关键信息，建立可复用可扩展的图形关系数据结构，支持 AI Native 快速更新内容",
      ],
      results: [
      ],
    },
    icon: "ph:layout-bold",
  },
  {
    id: "incity",
    enabled: true,
    title: "Incity + Outcity — C++ / Electron 混合架构",
    summary: "C++ 异步 TCP 通信内核 + Electron 跨语言架构实践，验证底层服务与前端协同的最佳路径",
    url: "https://github.com/parallized/Incity",
    date: "2025",
    stack: "C++ / Async TCP / Electron / TypeScript / 跨语言通信",
    roles: ["后端开发", "全栈开发"],
    tags: ["网络编程", "C++ 异步", "Electron 桌面端", "跨语言架构"],
    evidence: [
      "C++ 异步通信内核处理并发连接 + Electron 桌面端提供可视化操作界面",
      "自定义二进制通信协议设计，保证数据传输的稳定性与低延迟",
    ],
    star: {
      situation: "需要高性能的内存级 TCP 通信服务，同时在桌面端提供直观的可视化操作界面。",
      task: "用 C++ 实现高性能核心通信层，配合 Electron 提供跨平台桌面体验，打通底层服务到用户界面的全链路。",
      actions: [
        "设计 C++ 异步 TCP 服务端架构，处理高并发连接与内存级操作，确保通信层零阻塞。",
        "使用 Electron + TypeScript 构建桌面底座，实现与底层服务的双向实时通信。",
        "设计自定义二进制通信协议，在保证传输稳定性的同时将序列化开销降至最低。",
      ],
      results: [
      ],
    },
    icon: "ph:city-bold",
  },
]);

const enabledResumeItems = computed(() => resumeItems.value.filter((i) => i.enabled));
const enabledProjectsPool = computed(() => projectPool.value.filter((p) => p.enabled));
const enabledProjects = computed(() => enabledProjectsPool.value.filter((p) => !p.id.startsWith("lab-")));
const enabledLabs = computed(() => enabledProjectsPool.value.filter((p) => p.id.startsWith("lab-")));
const enabledExperiences = computed(() => experiencePool.value.filter((e) => e.enabled));

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
  // Internships are generally always visible unless manually toggled, 
  // but we can keep them all enabled for specific templates too.
  for (const exp of experiencePool.value) {
    exp.enabled = true;
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
      experience: experiencePool.value.map((exp) => ({
        id: exp.id,
        enabled: exp.enabled,
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

    if (Array.isArray(parsed.experience)) {
      const map = new Map(parsed.experience.map((exp) => [exp.id, exp.enabled]));
      for (const exp of experiencePool.value) {
        const enabled = map.get(exp.id);
        if (typeof enabled === "boolean") exp.enabled = enabled;
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
  [resumeItems, projectPool, experiencePool, isTwoColumn],
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
    <div class="page-wrap mx-auto w-full px-4 py-8 transition-all duration-500 md:px-8 md:py-12" :class="isTwoColumn ? 'max-w-none' : 'max-w-[1200px]'">
      <article class="sheet overflow-hidden rounded-2xl bg-white shadow-[0_24px_70px_rgba(0,0,0,0.10)] ring-1 ring-black/5 transition-colors duration-300 dark:bg-neutral-800 dark:shadow-[0_24px_70px_rgba(0,0,0,0.50)] dark:ring-white/10">
        <!-- Main Content -->
        <main class="p-8 md:p-12">
          <!-- Header -->
          <header class="mb-10 flex flex-col items-start justify-between gap-6 pb-4 md:flex-row md:items-end">
            <div class="space-y-3">
              <h1 class="font-serif text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
                AI Native & Agent 开发
              </h1>
              <p class="font-sans text-[14px] font-light text-neutral-600 dark:text-neutral-400">
                2 年 AI / 互联网实习 + 项目经验，擅长完成从 0 到 1 的产品定义、技术架构<br>与开发落地。具备 RAG、Agent Workflow、MCP 经验
              </p>
              <div class="h-1 w-12 bg-neutral-900 dark:bg-neutral-100"></div>
            </div>

            <!-- Contact & Education -->
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
                <div class="text-neutral-900 text-[16px] font-semibold dark:text-white">浙江科技大学</div>
                <div class="text-[14px] text-neutral-500 dark:text-neutral-400">数媒技本科 · 26 届</div>
              </div>
            </div>
          </header>

          <div :class="isTwoColumn ? 'grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-x-8' : 'flex flex-col'">
            <div class="space-y-10">
              <!-- Skills -->
              <section v-if="enabledResumeItems.length" class="space-y-4">
                <h2 class="flex items-center gap-2 border-b border-neutral-100 pb-2 font-serif text-xl font-bold tracking-tight text-neutral-900 dark:border-neutral-800 dark:text-white">
                  <span>专业技能</span>
                </h2>
                
                <div class="space-y-1">
                  <ul class="space-y-1.5 text-[14px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                    <li v-for="item in enabledResumeItems" :key="item.id" class="relative pl-4">
                      <span class="absolute left-0 top-2 h-1.5 w-1.5 rounded-full border border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800"></span>
                      {{ item.label }}
                    </li>
                  </ul>
                </div>
              </section>
            </div>

            <div class="space-y-12" :class="isTwoColumn ? 'pl-4' : 'pt-8'">
              <!-- Hardcore Labs -->
              <section v-if="enabledLabs.length" class="space-y-4">
                <h2 class="font-serif text-xl font-bold tracking-tight text-neutral-900 dark:text-white">核心实践</h2>
                <div class="space-y-6">
                  <article v-for="lab in enabledLabs" :key="lab.id" class="space-y-1.5">
                    <div class="flex items-baseline justify-between gap-4 border-b border-neutral-300/50 pb-1.5 dark:border-neutral-700/50">
                      <h3 class="flex items-center gap-1.5 font-serif text-lg font-bold text-neutral-900 dark:text-white">
                        <Icon v-if="lab.icon" :name="lab.icon" class="text-sm opacity-70" />
                        <a :href="lab.url" target="_blank" class="hover:underline">{{ lab.title }}</a>
                      </h3>
                      <span class="font-mono text-[15px] font-semibold text-neutral-400 dark:text-neutral-500 shrink-0">
                        {{ lab.date }}
                      </span>
                    </div>
                    <p class="text-[14px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                      {{ lab.summary }}
                      <span class="ml-1 text-[12px] font-normal text-neutral-500/70 dark:text-neutral-500/70">{{ lab.stack }}</span>
                    </p>
                  </article>
                </div>
              </section>

              <!-- Internship Experience -->
              <section v-if="enabledExperiences.length" class="space-y-4">
                <h2 class="font-serif text-xl font-bold tracking-tight text-neutral-900 dark:text-white">实习经历</h2>
                <div class="space-y-6">
                  <article v-for="exp in enabledExperiences" :key="exp.id" class="space-y-1.5">
                    <div class="flex items-baseline justify-between gap-4 border-b border-neutral-300/50 pb-1.5 dark:border-neutral-700/50">
                      <h3 class="font-serif text-lg font-bold text-neutral-900 dark:text-white">
                        {{ exp.company }}
                      </h3>
                      <span class="font-mono text-[15px] font-semibold text-neutral-400 dark:text-neutral-500 shrink-0">
                        {{ exp.date }}
                      </span>
                    </div>
                    <ul class="list-disc space-y-1 pl-4 text-[14px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                      <li v-for="item in exp.items" :key="item">
                        {{ item }}
                      </li>
                    </ul>
                  </article>
                </div>
              </section>

              <!-- Project Experience -->
              <section v-if="enabledProjects.length" class="space-y-4">
                <h2 class="font-serif text-xl font-bold tracking-tight text-neutral-900 dark:text-white">项目经验</h2>
                
                <div class="space-y-6">
                  <article
                    v-for="project in enabledProjects"
                    :key="project.id"
                    class="group space-y-2"
                  >
                  <div class="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-neutral-300/50 pb-1.5 dark:border-neutral-700/50">
                    <h3 class="flex items-center gap-2 font-serif text-lg font-bold text-neutral-900 dark:text-white">
                      <Icon v-if="project.icon" :name="project.icon" class="text-base opacity-70 shrink-0" />
                      <a :href="project.url" target="_blank" class="hover:underline hover:decoration-neutral-400">
                        {{ project.title }}
                      </a>
                    </h3>
                    <span class="font-mono text-[15px] font-semibold text-neutral-400 dark:text-neutral-500">
                      {{ project.date }}
                    </span>
                  </div>

                  <p class="text-[15px] font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
                    {{ project.summary }}
                    <span class="ml-1 text-[12px] font-normal text-neutral-500 dark:text-neutral-400">{{ project.stack }}</span>
                  </p>

                  <div class="grid gap-2 text-[14px] leading-relaxed text-neutral-700 dark:text-neutral-300">
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

                  <div class="text-[13px] italic text-neutral-500 dark:text-neutral-500">
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
      <div class="no-print fixed bottom-6 right-6 z-[9999] flex items-center gap-1.5 rounded-2xl bg-white/80 p-1.5 shadow-2xl ring-1 ring-black/5 backdrop-blur-md transition-all hover:bg-white dark:bg-neutral-800/80 dark:ring-white/10 dark:hover:bg-neutral-800">
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
                  <h3 class="text-[12px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">岗位模版</h3>
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

              <!-- Internship Toggles -->
              <section class="space-y-6">
                <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">实习经历</h3>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div
                    v-for="exp in experiencePool"
                    :key="exp.id"
                    class="flex items-start gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
                  >
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

              <!-- Lab Toggles -->
              <section class="space-y-6">
                <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">核心实验</h3>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div
                    v-for="project in projectPool.filter(p => p.id.startsWith('lab-'))"
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

              <!-- Project Toggles -->
              <section class="space-y-6">
                <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">项目池</h3>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div
                    v-for="project in projectPool.filter(p => !p.id.startsWith('lab-'))"
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

