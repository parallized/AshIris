<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import agentForestPromptImage from "~/assets/image/board/agent-forest-prompt.webp";
import agentForestResultImage from "~/assets/image/board/agent-forest-result.webp";
import ashIrisAboutImage from "~/assets/image/board/ash-iris-about.webp";
import ashIrisHeroImage from "~/assets/image/board/ash-iris-hero.webp";
import bobberFlowImage from "~/assets/image/board/bobber-flow.webp";
import bobberWindowImage from "~/assets/image/board/bobber-window.webp";
import catlikeRenderingMaterialsImage from "~/assets/image/board/catlike-rendering-materials.webp";
import catlikeRenderingMirrorsImage from "~/assets/image/board/catlike-rendering-mirrors.webp";
import goclawHomeImage from "~/assets/image/board/goclaw-home.webp";
import goclawPlannerImage from "~/assets/image/board/goclaw-planner.webp";
import mapleImage from "~/assets/image/board/maple-overview.webp";
import mapleWorkerConfigImage from "~/assets/image/board/maple-worker-config.webp";
import nptDeliveryImage from "~/assets/image/board/notion-project-tracker-delivery.webp";
import nptOverviewImage from "~/assets/image/board/notion-project-tracker-overview.webp";
import owocaptainMapImage from "~/assets/image/board/owocaptain-map.webp";
import owocaptainNavImage from "~/assets/image/board/owocaptain-nav.webp";
import paraNavigationNavmeshImage from "~/assets/image/board/para-navigation-navmesh.webp";
import paraNavigationRouteImage from "~/assets/image/board/para-navigation-route.webp";
import pixellensDetailImage from "~/assets/image/board/pixellens-detail.webp";
import pixellensOverviewImage from "~/assets/image/board/pixellens-overview.webp";
import recallRepositoryImage from "~/assets/image/board/recall-repository.webp";
import recallStationImage from "~/assets/image/board/recall-station.webp";
import runedraMapImage from "~/assets/image/board/runedra-map.webp";
import runedraQuizImage from "~/assets/image/board/runedra-quiz.webp";
import unityCaptainEditorImage from "~/assets/image/board/unity-captain-editor.webp";
import unityCaptainProxyImage from "~/assets/image/board/unity-captain-proxy.webp";
import wowMagicianCooldownsImage from "~/assets/image/board/wow-magician-cooldowns.webp";
import wowMagicianTimelineImage from "~/assets/image/board/wow-magician-timeline.webp";

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
    slug: "notion-project-tracker",
    title: "Notion Project Tracker",
    label: "Notion-native AI project execution loop",
    url: "https://github.com/parallized/notion-project-tracker",
    image: nptOverviewImage,
    sideImage: nptDeliveryImage,
    accent: "#7E8A86",
    metrics: [
      { label: "入口", value: "Skill", note: "Claude / Codex 调用" },
      { label: "队列", value: "Notion", note: "TODO 精确发现" },
      { label: "回写", value: "REST", note: "交付评论与日志" },
    ],
    brief:
      "将 Notion 从需求收集器变成 AI 可执行的项目中枢 MCP & Skills：在页面里写任务、图片和验收材料，NPT 通过 Notion MCP + REST 发现待办，驱动 Claude / Codex 在代码库执行，并把结果写回任务评论和会话日志。",
    problems: [
      { title: "单线式的自然语言对话转为任务执行队列", desc: "Notion 更适合承载图文需求、上下文和验收标准。NPT 将 NPT、项目、概要、IDEA 与 TODO 数据库组织成可信工作区，让 Agent 可以读取复杂任务，却不会在用户的整个 Notion 里乱搜乱改。" },
      { title: "借助 MCP 将 Agent 接入项目状态", desc: "通过 .npt.json 或项目名解析对应 TODO 数据库，使用 Notion REST 精确查询待办，执行前后同步队列中、待办、已完成、已阻塞等状态，把一次 Codex / Claude 会话变成可追踪的项目执行单元。" },
      { title: "循环交付变成审计链路", desc: "任务完成后优先以 NPT integration 身份写回评论，记录交付内容、改动说明、测试结果和阻塞原因，同时维护会话日志与发现缓存，让 AI 产出可以被验收、追溯和继续迭代。" },
    ],
    stackGroups: [
      {
        type: "Workspace",
        icons: [
          { name: "logos:notion-icon", label: "Notion" },
          { name: "simple-icons:modelcontextprotocol", label: "Model Context Protocol" },
          { name: "logos:python", label: "Python" },
        ],
      },
      {
        type: "Agent",
        icons: [
          { name: "logos:openai-icon", label: "Codex / OpenAI" },
          { name: "simple-icons:claude", label: "Claude Code", color: "#D97757" },
          { name: "logos:github-icon", label: "GitHub" },
        ],
      },
      {
        type: "Automation",
        icons: [
          { name: "ph:terminal-window-fill", label: "CLI" },
          { name: "ph:database-fill", label: "Notion REST" },
        ],
      },
    ],
  },
  {
    slug: "agent-forest",
    title: "Agent Forest",
    label: "Parallel multi-agent investigation framework",
    url: "https://github.com/parallized/agent-forest",
    image: agentForestPromptImage,
    sideImage: agentForestResultImage,
    accent: "#9E92FF",
    metrics: [
      { label: "并发", value: "32", note: "最多 32 个 Agent" },
      { label: "视角", value: "Persona", note: "证据/风险/反方" },
      { label: "综合", value: "Local", note: "主会话收束判断" },
    ],
    brief:
      "拓展单次 LLM 回答为可编排的认知森林 Skills：用 4 到 32 个专门 Agent 并行拆解复杂问题，再由当前会话作为 synthesizer 收束证据、分歧、风险和行动建议。",
    problems: [
      { title: "多视角问题切片", desc: "内置 Evidence Hunter、Risk Auditor、Systems Thinker、Contrarian 等 persona，让复杂研究、架构审查和策略判断不再依赖一个模型的一次性直觉，而是让不同立场同时探索问题空间。" },
      { title: "严格的综合边界", desc: "将外部 Agent 报告与本地主综合阶段明确隔离，保留报告来源、运行状态和观点差异，避免把多个 Agent 的噪声误读成共识，也减少传统多窗口研究的整理成本。" },
      { title: "面向真实工作的运行安全", desc: "支持 OpenAI-compatible Provider、preset / inline agent 定义、progress 日志、超大 JSON 输出落盘和 agent-led research，让它可以作为 Codex / Claude 工作流里的深度研究引擎，而不是演示脚本。" },
    ],
    stackGroups: [
      {
        type: "Runtime",
        icons: [
          { name: "logos:python", label: "Python" },
          { name: "logos:openai-icon", label: "OpenAI-compatible API" },
          { name: "simple-icons:json", label: "JSON Payload", color: "#888888" },
        ],
      },
      {
        type: "Agents",
        icons: [
          { name: "ph:users-three-fill", label: "Parallel Agents", color: "#9E92FF" },
          { name: "simple-icons:claude", label: "Claude Code", color: "#D97757" },
          { name: "ph:git-branch-fill", label: "Persona Presets", color: "#77B7FF" },
        ],
      },
      {
        type: "Workflow",
        icons: [
          { name: "ph:terminal-window-fill", label: "CLI" },
          { name: "logos:github-icon", label: "GitHub" },
        ],
      },
    ],
  },
  {
    slug: "recall",
    title: "Recall Station",
    label: "MCP-powered closed-loop knowledge station",
    url: "https://github.com/parallized/Recall",
    image: recallRepositoryImage,
    sideImage: recallStationImage,
    accent: "#9B8CFF",
    metrics: [
      { label: "事实", value: "Truth", note: "全网碎片提纯" },
      { label: "闭环", value: "Recall", note: "检索 / 复习 / 内化" },
      { label: "目标", value: "80d", note: "掌握度 0 到 80" },
    ],
    brief:
      "基于 Exa / WebSearch 的全网原子事实提炼与知识闭环工作站，由 LLM 自动聚类三层 Room 并清洗入库，一句话获取海量原子事实形成可自我生长、拓展的知识库。",
    problems: [
      { title: "原子事实提炼与知识入库", desc: "Recall 抛弃传统笔记软件的被动收藏模式，把研究主题拆成原子事实、证据来源和知识节点，通过自动化 WebSearch 与 AI 脱水，生成能被长期学习系统吸收的事实清单。" },
      { title: "知识路径推荐与图谱组织", desc: "基于三层分类结构、主题 Room 和知识图谱关系，把零散资料归类为不同 Tag，让用户不需要先整理完整资料库，也能在探索过程中快速检索核心内容。" },
      { title: "复习闭环与本地知识库", desc: "围绕 Bun monorepo、React、SQLite Schema 与 MCP 网关，把事实仓库、间隔复习、外部知识工具和本地知识库串成闭环，目标是在 80 天内把陌生领域掌握度从 0 推到 80。" },
    ],
    stackGroups: [
      {
        type: "Runtime",
        icons: [
          { name: "simple-icons:bun", label: "Bun", color: "#FBF0DF" },
          { name: "logos:react", label: "React" },
          { name: "logos:typescript-icon", label: "TypeScript" },
        ],
      },
      {
        type: "Knowledge",
        icons: [
          { name: "simple-icons:modelcontextprotocol", label: "Model Context Protocol" },
          { name: "simple-icons:obsidian", label: "Obsidian", color: "#7C3AED" },
          { name: "simple-icons:anki", label: "Anki", color: "#80C2EE" },
        ],
      },
      {
        type: "AI",
        icons: [
          { name: "logos:openai-icon", label: "LLM" },
          { name: "ph:brain-fill", label: "NotebookLM-style synthesis", color: "#A98DFF" },
          { name: "ph:database-fill", label: "SQLite Repository", color: "#6C7A89" },
        ],
      },
    ],
  },
  {
    slug: "runedra",
    title: "Runedra 知树",
    label: "Knowledge map",
    url: "https://runedra.cn",
    image: runedraMapImage,
    sideImage: runedraQuizImage,
    accent: "#9E845E",
    metrics: [
      { label: "学习路径", value: "Graph", note: "知识关系可视化" },
      { label: "推荐", value: "RAG", note: "按上下文生成" },
      { label: "记忆", value: "Memory", note: "长期学习记录" },
    ],
    brief:
      "面向任意领域学习的知识路径 Agent 产品，把用户的兴趣、资料、问答和练习过程沉淀为可推进的学习图谱。通过 RAG、Memory 与多模态内容理解，把一次性的搜索行为转化为持续更新的技能成长路线。",
    problems: [
      { title: "从意图到路径的结构化", desc: "学习者通常只有模糊兴趣，很难判断先学什么、如何推进、何时复盘。Runedra 将目标拆解为知识节点、前置关系与练习任务，用图谱方式呈现学习路线，降低进入陌生领域的决策成本。" },
      { title: "资料理解与长期记忆", desc: "结合 NotebookLM / OpenAI 一类的内容理解能力，将网页、笔记、问答和用户反馈抽取成可检索上下文；通过 RAG 与分层 Memory 保存关键概念、偏好和阶段成果，避免每次学习都重新组织资料。" },
      { title: "渐进式反馈与作品化沉淀", desc: "围绕节点完成度、练习结果和复盘记录生成下一步建议，把学习过程从被动阅读变成可交互的任务流。最终产出不仅是笔记，而是一套能持续扩展、复用和展示的个人知识体系。" },
    ],
    stackGroups: [
      {
        type: "AI",
        icons: [
          { name: "logos:openai-icon", label: "OpenAI" },
          { name: "simple-icons:langchain", label: "LangChain", color: "#1C3C3C" },
        ],
      },
      {
        type: "Graph",
        icons: [
          { name: "logos:neo4j", label: "Neo4j" },
          { name: "logos:supabase-icon", label: "Supabase" },
          { name: "logos:postgresql", label: "PostgreSQL" },
        ],
      },
      {
        type: "Web",
        icons: [
          { name: "logos:nextjs-icon", label: "Next.js" },
          { name: "logos:typescript-icon", label: "TypeScript" },
          { name: "logos:tailwindcss-icon", label: "Tailwind CSS" },
        ],
      },
    ],
  },
  {
    slug: "pixellens",
    title: "PixelLens",
    label: "Minecraft Web 3D structure archive",
    url: "https://github.com/Nesb01t/pixellens",
    image: pixellensOverviewImage,
    sideImage: pixellensDetailImage,
    accent: "#D87928",
    metrics: [
      { label: "渲染", value: "WebGL", note: "Three.js / Tres.js 场景图" },
      { label: "管线", value: "GLTF", note: "Litematic → OBJ → GLTF" },
      { label: "交互", value: "Pick", note: "轨道控制 / 射线拾取" },
    ],
    brief:
      "面向 Minecraft 结构的 Web 3D 可视化档案馆：把 Litematic 建筑通过 Mineways、Blender 和材质注入流程转成 GLTF，在浏览器里以可交互场景展示结构、材料、方块清单与模型资产。",
    problems: [
      { title: "像素结构到 WebGL 资产管线", desc: "搭建 Litematic → OBJ → GLTF 的自动化转换流程，让游戏内建筑不只是截图，而是可以被浏览器加载、旋转、拾取和继续分析的三维资产。" },
      { title: "Minecraft 材质语义还原", desc: "根据 GLTF 传入名称做动态纹理映射与属性归一化，并为玻璃、水等透明材质走专用渲染通道，减少方块模型在 WebGL 里常见的材质错配和透明排序问题。" },
      { title: "大场景浏览与信息面板", desc: "通过状态机场景控制、视锥体动态加载、层级透明度管理、轨道控制器和射线拾取，把结构信息、材料清单、投影文件和模型调试信息统一到可探索界面里。" },
    ],
    stackGroups: [
      {
        type: "WebGL",
        icons: [
          { name: "simple-icons:threedotjs", label: "Three.js", color: "#20211F" },
          { name: "logos:vue", label: "Vue" },
          { name: "logos:typescript-icon", label: "TypeScript" },
        ],
      },
      {
        type: "Pipeline",
        icons: [
          { name: "simple-icons:minecraft", label: "Minecraft", color: "#62B34F" },
          { name: "simple-icons:blender", label: "Blender", color: "#E87D0D" },
          { name: "ph:cube-focus-fill", label: "GLTF Assets", color: "#D87928" },
        ],
      },
      {
        type: "Shaders",
        icons: [
          { name: "simple-icons:webgl", label: "WebGL", color: "#990000" },
          { name: "ph:selection-background-fill", label: "Ray Picking", color: "#86C8FF" },
          { name: "ph:polygon-fill", label: "Scene Graph", color: "#8BA264" },
        ],
      },
    ],
  },
  {
    slug: "goclaw",
    title: "GoClaw",
    label: "AI-powered real-world activity planner",
    url: "https://github.com/parallized/GoClaw",
    image: goclawPlannerImage,
    sideImage: goclawHomeImage,
    accent: "#5F86FF",
    metrics: [
      { label: "场景", value: "2+", note: "跑步 / 拍照可扩展" },
      { label: "数据", value: "Live", note: "天气 / POI / 路线" },
      { label: "原则", value: "No Mock", note: "拒绝伪造兜底" },
    ],
    brief:
      "面向现实世界活动决策的 AI Planner，用户只需要决策“想跑步、想拍照、想出去玩”等模糊意图，系统就会结合真实天气、POI、地理编码和路线服务，生成可执行的地点选择、行动路线与时间安排。",
    problems: [
      { title: "模糊意图到结构化计划", desc: "将用户的自然语言愿望拆解，得到活动类型、时间窗口、距离偏好、地点约束、天气条件和输出 Schema，让 LLM 从“聊天回答”转变为可以调度数据源、生成路线和返回确定结果的 Planner。" },
      { title: "真实世界数据源编排", desc: "将 Open-Meteo 天气、高德 / Overpass POI、OSRM 路线、Nominatim 地理编码等外部服务封装为统一 Provider 层，并处理坐标转换、服务优先级、异常降级和数据归一化，保证规划结果基于真实可用的数据。" },
      { title: "反幻觉的可执行决策约束", desc: "规定 LLM 凭空编造地点、天气或路线，要求所有推荐都绑定 API 返回的真实 POI、天气状态、距离和路线结果，再输出可被前端地图、行程卡片和用户行动直接消费的结构化方案。" },
    ],
    stackGroups: [
      {
        type: "App",
        icons: [
          { name: "simple-icons:bun", label: "Bun", color: "#FBF0DF" },
          { name: "logos:react", label: "React" },
          { name: "logos:typescript-icon", label: "TypeScript" },
          { name: "logos:vitejs", label: "Vite" },
        ],
      },
      {
        type: "World",
        icons: [
          { name: "simple-icons:openstreetmap", label: "OpenStreetMap", color: "#7EBC6F" },
          { name: "ph:cloud-sun-fill", label: "Open-Meteo", color: "#F5C45E" },
          { name: "ph:map-pin-area-fill", label: "POI / Geocoding", color: "#5F86FF" },
        ],
      },
      {
        type: "Engine",
        icons: [
          { name: "logos:openai-icon", label: "LLM Decision" },
          { name: "ph:route-fill", label: "OSRM Routing", color: "#31B77A" },
          { name: "simple-icons:zod", label: "Zod Contracts", color: "#3068B7" },
        ],
      },
    ],
  },
  {
    slug: "wow-magician",
    title: "WoW Magician",
    label: "面向魔兽世界团队副本指挥的 AI Raid Planning System",
    url: "https://wow.parallized.cn",
    image: wowMagicianTimelineImage,
    sideImage: wowMagicianCooldownsImage,
    accent: "#7C8E9F",
    metrics: [
      { label: "认知", value: "LLM", note: "把混沌战斗语义化" },
      { label: "工具", value: "3s", note: "从焦虑到可执行轴" },
      { label: "生态", value: "WCL", note: "战报/阵容/缓存闭环" },
    ],
    brief:
      "将复杂的游戏场景当作认知边界实验进行建模的 AI tooling：通过 Exa、WebSearch 获取 BOSS 技能、WCL 行为证据、阵容冷却和团长的经验判断，清洗为可计算状态和事实条目，再由 LLM 与规则引擎重组为可执行的战术轴。",
    problems: [
      { title: "战斗状态建模", desc: "将整个游戏复杂的 BOSS 技能时间轴、WCL 战斗事件、团队和职业借助 LLM 语义统一抽象成可查询的 Combat State，基于多种数据表 + 遗传算法让原本依赖团长经验的判断可以被系统计算安排。" },
      { title: "LLM 约束式战术生成", desc: "基于 RAG 注入分层时效性记忆游戏数据信息，实现规则引擎、黑白名单、冷却窗口、优先级和阵容上下文约束输出，确保生成的排轴方案在时间、职业、目标和执行层面都是合法的。" },
      { title: "复盘到执行的闭环", desc: "将 WCL API 实时数据接回排轴系统，生成可被 MRT、战术板和 WoW Lua 插件消费的结构化结果，让战术规划能够持续迭代。" },
    ],
    stackGroups: [
      {
        type: "AI",
        icons: [
          { name: "logos:openai-icon", label: "OpenAI" },
          { name: "simple-icons:claude", label: "Claude", color: "#D97757" },
        ],
      },
      {
        type: "Front",
        icons: [
          { name: "logos:nuxt-icon", label: "Nuxt" },
          { name: "logos:vue", label: "Vue" },
          { name: "logos:typescript-icon", label: "TypeScript" },
          { name: "logos:tailwindcss-icon", label: "Tailwind CSS" },
        ],
      },
      {
        type: "Engine",
        icons: [
          { name: "logos:lua", label: "Lua" },
          { name: "logos:rust", label: "Rust" },
          { name: "logos:rabbitmq-icon", label: "RabbitMQ" },
          { name: "simple-icons:konva", label: "Konva", color: "#0D83CD" },
        ],
      },
    ],
  },
  {
    slug: "owocaptain",
    title: "OwOcaptain",
    label: "Map guide",
    url: "https://ow.parallized.cn",
    image: owocaptainMapImage,
    sideImage: owocaptainNavImage,
    accent: "#8C9A86",
    metrics: [
      { label: "查询", value: "30s", note: "赛前快速确认" },
      { label: "地图", value: "Route", note: "点位与动线" },
      { label: "角色", value: "Hero", note: "按定位组织" },
    ],
    brief:
      "面向守望先锋实战准备，把地图点位、动线和英雄定位整理成快速参考。",
    problems: [
      { title: "地图坐标与战术数据建模", desc: "将守望先锋地图拆成「地图 / 区域 / 场景 / 点位 / 箭头 / 英雄头像」的数据结构，并用百分比坐标统一描述位置，使点位标记、危险区域和移动路线能够在不同地图与屏幕尺寸下稳定复用。" },
      { title: "可视化编辑器与状态同步", desc: "设计 UI 学习模式与开发模式两套交互流程，通过 Pinia 管理当前地图、区域、场景、点位和快捷键状态，支持拖拽点位、编辑说明、切换英雄、添加箭头和一键导出，让战术内容可以低成本维护和迭代。" },
      { title: "战术教学界面的工程化体验", desc: "基于 Nuxt / Vue 构建响应式地图界面，并结合键盘导航、图片 WebP 优化、地图预设数据和组件化布局，保证用户能快速切换地图场景、查看战术信息，并在复杂地图资源下保持流畅操作。" },
    ],
    stackGroups: [
      {
        type: "Map",
        icons: [
          { name: "logos:mapbox-icon", label: "Mapbox" },
          { name: "logos:react", label: "React" },
        ],
      },
      {
        type: "Web",
        icons: [
          { name: "logos:nextjs-icon", label: "Next.js" },
          { name: "logos:typescript-icon", label: "TypeScript" },
          { name: "logos:tailwindcss-icon", label: "Tailwind CSS" },
        ],
      },
      {
        type: "Infra",
        icons: [
          { name: "logos:nodejs-icon", label: "Node.js" },
          { name: "logos:postgresql", label: "PostgreSQL" },
          { name: "logos:cloudflare-icon", label: "Cloudflare" },
        ],
      },
    ],
  },
  {
    slug: "para-navigation",
    title: "para-navigation",
    label: "Rust + Detour NavMesh HTTP pathfinding service",
    url: "https://github.com/parallized/para-navigation",
    image: paraNavigationNavmeshImage,
    sideImage: paraNavigationRouteImage,
    accent: "#778A96",
    metrics: [
      { label: "核心", value: "Rust", note: "Axum HTTP 服务" },
      { label: "寻路", value: "Detour", note: "NavMesh / A*" },
      { label: "接口", value: "JSON", note: "POST API + E2E" },
    ],
    brief:
      "把游戏世界里的空间移动从经验脚本变成可调用的导航能力：用 Rust / Axum 包住 C++ Detour NavMesh 内核，读取兼容 mmaps 数据，并提供寻路、随机点、射线、贴地移动和附近网格查询等 JSON API。",
    problems: [
      { title: "复杂地形 To 可查询空间", desc: "通过 Rust FFI 封装 C++ bridge 与 vendored Detour，将 mmaps 数据加载为可计算 NavMesh，让 Agent 能在真实地形上理解可走区域、坡度、边界与障碍。" },
      { title: "高性能的导航能力服务化", desc: "基于 Axum 暴露 /v1/path、random-point、move-along-surface、cast-ray、explore-polygon、mesh/nearby 等端点，将寻路内核拆成稳定 HTTP 服务，方便任何上层工具以 JSON + POST 调用。" },
      { title: "从坐标到行动的工程闭环", desc: "围绕 filter configure、session release、默认配置生成和 Node E2E 分层测试建立运行边界，让避障、Slope 导航和路线探索作为自动化与空间智能工具链的底层能力。" },
    ],
    stackGroups: [
      {
        type: "Core",
        icons: [
          { name: "logos:rust", label: "Rust" },
          { name: "logos:c-plusplus", label: "C++" },
          { name: "simple-icons:cmake", label: "CMake", color: "#064F8C" },
        ],
      },
      {
        type: "Navigation",
        icons: [
          { name: "ph:polygon-fill", label: "Detour / NavMesh", color: "#8AB4A2" },
          { name: "ph:path-fill", label: "A* Pathfinding", color: "#E3B36B" },
          { name: "ph:map-trifold-fill", label: "mmaps", color: "#5B8FB9" },
        ],
      },
      {
        type: "API",
        icons: [
          { name: "simple-icons:json", label: "JSON", color: "#666666" },
          { name: "logos:javascript", label: "JavaScript E2E" },
          { name: "ph:terminal-window-fill", label: "CLI" },
        ],
      },
    ],
  },
  {
    slug: "bobber",
    title: "Bobber",
    label: "WASAPI acoustic fishing assistant",
    url: "https://github.com/parallized/Bobber",
    image: bobberFlowImage,
    sideImage: bobberWindowImage,
    accent: "#8C74D8",
    metrics: [
      { label: "输入", value: "Audio", note: "Windows Core Audio" },
      { label: "触发", value: "Peak", note: "浮漂声学峰值" },
      { label: "动作", value: "SendInput", note: "本地按键注入" },
    ],
    brief:
      "声学信号判断鱼漂动静的轻量桌面工具：通过独立音频通道监听游戏声音峰值，在明确咬钩特征出现时触发交互按键，把手工盯漂转成可调试的音频分析流程。",
    problems: [
      { title: "Win32 声音底层数据探测", desc: "Bobber 不扫描进程、不读取游戏状态，将声效分离到干净的音频设备通道中，用 WASAPI 枚举设备并读取峰值，让判断建立在可观测的声音波形上。" },
      { title: "经验调参可视化反馈", desc: "Electron / Vue 界面实时显示终端输出、音频通道和峰值变化，帮助用户根据环境音、效果音与游戏音量调整阈值，减少纯人工回调与反复试错。" },
      { title: "原生能力与桌面壳协作", desc: "核心 DLL 使用 Rust 暴露 StartCore、SelectDevice、GetPeakValue、PressKey 等接口，主进程通过 koffi 调用，按键注入走 SendInput，形成前端控制、原生采样和本地操作的闭环。" },
    ],
    stackGroups: [
      {
        type: "Desktop",
        icons: [
          { name: "simple-icons:electron", label: "Electron", color: "#9FEAF9" },
          { name: "logos:vue", label: "Vue" },
          { name: "logos:typescript-icon", label: "TypeScript" },
        ],
      },
      {
        type: "Native",
        icons: [
          { name: "logos:rust", label: "Rust DLL" },
          { name: "simple-icons:windows", label: "Windows Core Audio", color: "#0078D4" },
          { name: "ph:keyboard-fill", label: "SendInput", color: "#E7C857" },
        ],
      },
      {
        type: "Signal",
        icons: [
          { name: "ph:waveform-fill", label: "Audio Peak" },
          { name: "logos:d3", label: "D3 Visualization" },
          { name: "ph:speaker-high-fill", label: "Device Routing", color: "#8C74D8" },
        ],
      },
    ],
  },
  {
    slug: "catlike-rendering",
    title: "Catlike Rendering",
    label: "Unity rendering pipeline studies",
    url: "https://catlikecoding.com/unity/tutorials/rendering",
    image: catlikeRenderingMirrorsImage,
    sideImage: catlikeRenderingMaterialsImage,
    accent: "#7FA2B8",
    metrics: [
      { label: "引擎", value: "Unity", note: "Built-in Rendering" },
      { label: "材质", value: "PBR", note: "反射 / 光照 / Shader" },
      { label: "训练", value: "Frame", note: "从像素理解管线" },
    ],
    brief:
      "沿着 Catlike Coding 的 Unity Rendering 系列拆解图形学基础：从光照、阴影、反射、后处理到复杂材质，把教程中的渲染概念转成可运行场景和可调试 shader 实验。",
    problems: [
      { title: "渲染管线的可视化拆解", desc: "通过 Unity 场景复现镜面、地面与天花反射等案例，把相机、光源、深度、法线和反射采样从抽象公式变成可观察的画面差异。" },
      { title: "材质与光照模型实践", desc: "围绕 PBR、金属度、粗糙度、法线、遮蔽和自发光等参数构建复杂材质，理解一个 shader 如何把纹理、几何和光照共同折叠为最终像素。" },
      { title: "从教程到工程直觉", desc: "把分步练习作为图形工程训练场，积累调 shader、查帧、定位视觉 bug 和评估渲染成本的经验，而不只停留在复制代码。" },
    ],
    stackGroups: [
      {
        type: "Engine",
        icons: [
          { name: "logos:unity", label: "Unity" },
          { name: "logos:c-sharp", label: "C#" },
          { name: "ph:code-block-fill", label: "ShaderLab", color: "#4E8AC8" },
        ],
      },
      {
        type: "Rendering",
        icons: [
          { name: "ph:sphere-fill", label: "PBR Materials", color: "#7FA2B8" },
          { name: "ph:sun-fill", label: "Lighting", color: "#F3C969" },
          { name: "ph:diamonds-four-fill", label: "Reflection", color: "#A7C7E7" },
        ],
      },
      {
        type: "Practice",
        icons: [
          { name: "ph:image-square-fill", label: "Frame Debugging", color: "#89B4FA" },
          { name: "ph:git-branch-fill", label: "Tutorial Progress", color: "#9D8AE8" },
        ],
      },
    ],
  },
  {
    slug: "ash-iris",
    title: "Ash Iris",
    label: "Identity",
    url: "https://parallized.cn",
    image: ashIrisHeroImage,
    sideImage: ashIrisAboutImage,
    accent: "#8A867B",
    metrics: [
      { label: "站点", value: "v3", note: "长期迭代" },
      { label: "简历", value: "PDF", note: "可打印输出" },
      { label: "作品", value: "Board", note: "项目统一展示" },
    ],
    brief:
      "个人站、作品集和简历。",
    problems: [
      { title: "统一内容模型", desc: "将首页、作品集 Board 和 CV 从三个独立页面收敛为同一套入口，用项目、技能、经历、指标、链接和技术栈等结构化字段驱动展示，解决作品信息、简历内容和条目重复维护的问题。" },
      { title: "滚动叙事型作品展板", desc: "在 board 中把项目数据、截图、技术栈贴纸、右侧缩略轨道和当前项目状态绑定到滚动进度，通过 Lenis 滚动控制、RAF 状态同步、键盘切换、Sticky 全屏布局和转场动画，实现交互展览的作品集浏览体验。" },
      { title: "交互式简历系统", desc: "在 cv 中将技能、项目、实验和经历拆成可开关数据池，支持岗位模板筛选、深浅色模式、单双栏布局、localStorage 持久化和打印 / PDF 输出，让一份简历同时作为个人知识积累库持续迭代。" },
    ],
    stackGroups: [
      {
        type: "Front",
        icons: [
          { name: "logos:nuxt-icon", label: "Nuxt" },
          { name: "logos:vue", label: "Vue" },
          { name: "logos:typescript-icon", label: "TypeScript" },
          { name: "logos:tailwindcss-icon", label: "Tailwind CSS" },
        ],
      },
      {
        type: "Motion",
        icons: [
          { name: "logos:vitejs", label: "Vite" },
          { name: "simple-icons:greensock", label: "GSAP", color: "#88CE02" },
          { name: "simple-icons:sass", label: "Sass", color: "#CC6699" },
          { name: "logos:nodejs-icon", label: "Node.js" },
        ],
      },
    ],
  },
  {
    slug: "unity-captain-demoscene",
    title: "Unity Captain",
    label: "Unity Editor AI scene scripting bridge",
    url: "https://github.com/parallized/Unity-Captain-Demoscene",
    image: unityCaptainProxyImage,
    sideImage: unityCaptainEditorImage,
    accent: "#6E8FAF",
    metrics: [
      { label: "入口", value: "Editor", note: "Unity 面板内对话" },
      { label: "协议", value: "JSON", note: "Schema 约束输出" },
      { label: "桥接", value: "C#", note: "HttpClient 调本地核心" },
    ],
    brief:
      "把 Unity 编辑器本身变成 AI 场景编排入口：在 EditorWindow 中输入自然语言目标，约束 Captain 输出可解析 JSON，再由 C# 代理转发到本地核心服务，让剧情、对话和演示场景可以从提示词进入工程资产流水线。",
    problems: [
      { title: "自然语言到场景数据", desc: "将“创建三个对话场景”一类需求拆成 position、totalTime、lines 等结构化字段，把创意描述收束为 Unity 可以继续消费的场景与对白数据。" },
      { title: "Editor 内的人机协作面板", desc: "在 Unity Captain 标签页里保留用户输入、Captain 输出、schema 文件选择和发送动作，让 AI 生成不脱离编辑器上下文，便于快速迭代演示内容。" },
      { title: "本地 Captain 服务桥接", desc: "通过 CaptainProxy.cs 使用 HttpClient 将编辑器请求发送到 localhost 核心端点，并反序列化 reasoning / content 响应，为后续接入更复杂的工具调用和资产生成留出接口。" },
    ],
    stackGroups: [
      {
        type: "Engine",
        icons: [
          { name: "logos:unity", label: "Unity" },
          { name: "logos:c-sharp", label: "C#" },
          { name: "simple-icons:dotnet", label: ".NET", color: "#512BD4" },
        ],
      },
      {
        type: "AI",
        icons: [
          { name: "logos:openai-icon", label: "LLM Core" },
          { name: "simple-icons:json", label: "JSON Schema", color: "#555555" },
          { name: "ph:brackets-curly-fill", label: "Structured Output", color: "#6E8FAF" },
        ],
      },
      {
        type: "Workflow",
        icons: [
          { name: "logos:github-icon", label: "GitHub" },
          { name: "ph:terminal-window-fill", label: "Local Service" },
        ],
      },
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
  { x: -320, y: 36, rotate: 9, scale: 0.9 },
  { x: -110, y: 4, rotate: -12, scale: 0.84 },
  { x: -210, y: 4, rotate: 7, scale: 0.86 },
  { x: -25, y: 42, rotate: -10, scale: 0.82 },
];

const activeIndex = ref(0);
const scrollProgress = ref(0);
const boardPage = ref<HTMLElement | null>(null);
const cvCard = ref<HTMLElement | null>(null);
const cvCardHeight = ref<number | null>(null);
const { $lenis } = useNuxtApp();
let cancelLenisScroll: (() => void) | undefined;
let syncFrame: number | undefined;
let cvHeightTimer: number | undefined;

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
const cvCardStyle = computed(() =>
  cvCardHeight.value === null
    ? undefined
    : { height: `${cvCardHeight.value}px` },
);

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

const clearCvHeightTimer = () => {
  if (cvHeightTimer === undefined) return;

  window.clearTimeout(cvHeightTimer);
  cvHeightTimer = undefined;
};

const lockCvCardHeight = (element: Element) => {
  clearCvHeightTimer();
  cvCardHeight.value = Math.ceil((element as HTMLElement).offsetHeight);
};

const animateCvCardHeight = async (element: Element, done: () => void) => {
  const card = cvCard.value;
  if (!card) {
    done();
    return;
  }

  await nextTick();

  const nextHeight = Math.ceil((element as HTMLElement).offsetHeight);
  if (cvCardHeight.value === null) {
    cvCardHeight.value = Math.ceil(card.offsetHeight);
  }

  requestAnimationFrame(() => {
    cvCardHeight.value = nextHeight;
  });

  clearCvHeightTimer();
  cvHeightTimer = window.setTimeout(done, 760);
};

const releaseCvCardHeight = () => {
  clearCvHeightTimer();
  cvCardHeight.value = null;
};

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
  clearCvHeightTimer();
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
        <article ref="cvCard" class="cv-card" :style="cvCardStyle">
          <Transition
            name="text-stagger"
            @before-leave="lockCvCardHeight"
            @enter="animateCvCardHeight"
            @after-enter="releaseCvCardHeight"
            @enter-cancelled="releaseCvCardHeight"
            @leave-cancelled="releaseCvCardHeight"
          >
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
  background: #f1f1ee;
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
  object-fit: cover;
  object-position: center top;
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
.stack-pile-fade-enter-active .stack-sticker:nth-child(9) { animation-delay: 0.32s; }
.stack-pile-fade-enter-active .stack-sticker:nth-child(10) { animation-delay: 0.36s; }
.stack-pile-fade-enter-active .stack-sticker:nth-child(11) { animation-delay: 0.40s; }
.stack-pile-fade-enter-active .stack-sticker:nth-child(12) { animation-delay: 0.44s; }

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
  transition: height 720ms cubic-bezier(0.19, 1, 0.22, 1);
  will-change: height;
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
