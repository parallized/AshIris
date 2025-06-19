<script setup lang="ts"></script>
<template>
  <div class="resume">
    <h1 class="title">
      大模型应用开发
      <span class="name">杨家城</span>
    </h1>
    <header class="personal-info">
      <div>
        <a target="_blank" href="https://parallized.cn">
          <Icon name="mingcute:book-2-line" />
          博客 parallized.cn</a
        >
      </div>
      <div>
        <a target="_blank" href="https://github.com/nesb01t">
          <Icon name="mingcute:github-line" />
          nesb01t</a
        >
        <div class="h-full">/</div>
        <a target="_blank" href="https://github.com/parallized">parallized</a>
      </div>
      <div>
        <a>
          <Icon name="mingcute:location-2-line" />
          浙江 · 杭州</a
        >
      </div>
      <div>
        <a>
          <Icon name="mingcute:mail-line" />
          parallized@outlook.com</a
        >
      </div>
    </header>

    <section class="section-block">
      <label>
        <Icon name="mingcute:bookmarks-line" />
        教育经历</label
      >

      <ul>
        <li>
          <Icon name="mingcute:diamond-square-line" />
          浙江科技大学 · 数字媒体技术
          <span class="time">2021.09 至 2026.06 (预计)</span>
        </li>
        <li>系统学习 AI 基础, 系统架构, 计算机图形学与前后端开发等方向, 为大模型相关应用研发打下良好工程基础</li>
        <li>
          自主完成多个高水平课程项目, 包括 MIT 6.006 (算法设计), CS61A / CS61B (数据结构), CS169 (软件工程实践), Games101 (图形学), LearnOpenGL 等
        </li>
        <li>
          具备跨模态系统实现能力, 主导开发多个底层至中高层的项目, 如:
        </li>
        <li class="ml-2">
          - 噪声驱动的迷宫生成算法, 软光栅图形渲染引擎, 系统调用级内存读写驱动
        </li>
        <li class="ml-2">
          - Saas 微服务系统构建, 涉及认证, 通信, 接口调用等全栈模块
        </li>
        <li>
          早期关注生成式 AI 在数据结构建模与内容生成方向的潜力, 探索 Prompt + JSON 驱动的图数据生成方案
        </li>
        <li class="mt-3">
          <Icon name="majesticons:award-line" />中国大学生计算机设计大赛 · 省三等奖 (游戏组) / 浙江省电商创作大赛 ·
          二等奖 / 软著两项
        </li>
      </ul>
    </section>

    <section class="section-block">
      <label>
        <Icon name="mingcute:emoji-line" />
        实习经历
      </label>

      <ul>
        <li>
          <Icon name="mingcute:diamond-square-line" />
          <strong>杭州迪萌科技有限公司</strong>
          <span class="time">2025.03 至今</span>
        </li>

        <li>
          - 主导基于 TS 生态的 Mastra (类 LangChain) 框架, 构建低代码 UI 生成平台, 支持链式工具调用, 上下文记忆 (Memory), 函数工具 (Tool Use) 与模型动态切换能力
        </li>
        <li>
          - 设计多段式 Prompt 拼接协议, 支持节点间的上下文传递, 构建稳定的 Token 管控与相应路由逻辑
        </li>
        <li>
          - 参与工程架构迁移与模块重构, 将系统迁移到 Monorepo 架构, 拆分核心模块并引入统一服务注册与通信接口
        </li>
        <li>
          - 构建轻量 RAG 子系统, 对用户数据进行分块, 清洗, 向量化 (Embedding), 并基于向量数据库实现基础语义检索功能, 服务知识问答与对话增强场景
        </li>
        <li>
          - 为增强对 LLM 工具链的理解, 分析 Cursor 编辑器的运行机制与上下文执行路径, 包括 Prompt 生命周期, 上下文缓存与请求调度流程
        </li>
        <li>
          - 参考论文复现 Prompt 任务链与模型调用模式, 指导自研 AI 工具上下文管理, 模型代理与多分支链路配置逻辑
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="mingcute:diamond-square-line" />
          <strong>杭州描路科技有限公司</strong>
          <span>参与 B 端后台系统开发, 使用 Vue + Svelte + RxJS, 维护 monorepo, 优化插件通信, 提升 UI/UX</span>
          <span class="time">2023.09 至 2024.11</span>
        </li>
      </ul>
    </section>
    <section class="section-block">
      <label>
        <Icon name="mingcute:terminal-box-line" />
        项目经历</label
      >

      <ul>
        <li>
          <Icon name="mingcute:ai-line" />
          <span><strong>UI-PaaS</strong>AI 语义理解与指令模块开发</span>
          <span class="time">2025.03 至今 · 杭州迪萌科技有限公司</span>
        </li>
        <li>
          主导平台自然语言驱动交互模块的 AI 工程化设计与实现, 构建从 "用户指令" 到 "组件级 UI 操作" 的完整闭环
        </li>
        <li>
          平台使用私有化 DSL 而非通用前端方案, 针对 LLM 对私有语义理解力薄弱的问题, 构建示例驱动的 Prompt 泛化机制
        </li>
        <li>
          基于过往历史操作与领域专属语料 (组件名, 动作标签等) 构建私有 Code Embedding 向量库, 增强 LLM 在任务执行中的语义理解和指令精度
        </li>
        <li>
          设计实体识别与一致性机制, 解决多轮用户模糊引用指令 (例如 "把那个按钮调大一点, 中间那个按钮再大一点") 的上下文跟踪和正确映射
        </li>
        <li>
          构建 Tool / MCP 工具执行引擎, 连接自然语言与底层动作的映射逻辑, 形成语义识别 - 知识增强 - 工具调用的链式工作流
        </li>
        <li>
          工程上采用 monorepo + NestJS + Mastra 模块化实现, 支持多模型调用与上下文缓存, 适配并发任务调度场景 
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="mingcute:ai-line" />
          <span>
            <strong>LLM 工具链机制调研</strong>
            Cursor 编辑器逆向工程分析项目
          </span>
          <span class="time">2025.02 至 2025.03</span>
        </li>
        <li>
          聚焦智能编辑器 Cursor, 开展基于其 Prompt 构造, 上下文拼接, 记忆机制与代码片段管理等核心模块的工程分析, 旨在启发自研 AI 工程
        </li>
        <li>
          采用多手段联合调研, 包括抓包分析, API 请求代理, 二进制行为追踪等, 为其 LLM 请求链路和提示词构造逻辑进行深入逆向
        </li>
        <li>
          成功获取 Cursor 中典型 Prompt 模板与上下文组织方式, 与其 GitHub 上开源版本结构高度一致, 为团队快速建立提示词设计规范提供参考
        </li>
        <li>
          针对其向量召回机制 (RAG) 未公开部分, 采用 "连续上下文溢出测试" (10-20此连续追问) 推测其采用了混合式记忆系统, 包含显式上下文和隐式历史对话补全策略
        </li>
        <li>
          系统分析了其多轮交互的处理边界, 信息裁剪位置以及模型相应精度退化的节点变化, 为自研 memory/routing 系统提供上下文设计参考
        </li>
        <li>
          调研成果整理成结构文档, 供团队技术评审与后续 Prompt Router, 任务链管理系统开发使用, 显著提升了自研系统的可靠性与对 Cursor 同类工具的对标理解
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:unity" />
          <span>
            <strong>Unity Captain</strong>
            AI 编辑器自动化工具 (Demo 项目)
          </span>
          <span class="time">2025.02 至 2025.03</span>
        </li>
        <li>
          项目背景为游戏文案和数值设计, 大量武器属性, NPC 对话以及增长曲线数据的生成, 传统手工方式耗时易出错且需要反复测试
        </li>
        <li>
          GPT-3 发布后, 基于少量示例数据尝试利用 ChatGPT 自动生成符合 JSON 格式的结构化配置, 快速产出高质量可直接应用的数据
        </li>
        <li>
          设计并优化 Prompt, 使模型输出具备父子节点及图关系, 进而实现 AI 生成的节点链与 Shader Graph 的自动适配, 推动编辑器自动化初步落地
        </li>
        <li>
          虽为 Demo 性质, 体现了当时通过自然语言模型驱动复杂数据结构生成的前沿探索, 为后续结合 Query 意图识别和 RAG 技术的 AI 助手设计奠定了实践基础
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="lineicons:nuxt" />
          <span>
            <strong>EachStar 创作互助平台</strong>
            基于 GitHub API 的创作者协作平台, 采用 Nuxt + Koa 构建, 自动化发布流程, 用户量 1000+
          </span>
          <span class="time">2022.09 至 2023.03</span>
        </li>
        <li>
          
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="devicon:capacitor" />
          <span>
            <strong>GoodsCat 海淘订阅 APP</strong>
            基于 Nuxt + Capacitor, 构建多端 PWA, 整合 WxPush, mirai 协议, 月活订阅用户 50+
          </span>
          <span class="time">2024.04 至 2024.07</span>
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:threejs" />
          <span>
            <strong>MachineHub 3D 图鉴平台</strong>
            基于 TresJS 实现实时 3D 渲染与 CMS 管理, 图形资源自动修复流水线
          </span>
          <span class="time">2024.11 至 2025.02</span>
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:astro-icon" />
          <span>
            <strong>AshIris 博客模板</strong>
            Astro + daisyUI 构建的高性能 SSG 博客, 支持多前端框架渲染
          </span>
          <span class="time">2014.05 至今</span>
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:java" />
          <span><strong>Minecraft 独立创作者</strong>多年独立游戏创作者, 精通游戏创作上线全流程, 最多 700+ 玩家同时在线, 月营收 15k+</span>
          <span class="time">2011 至 2019</span>
        </li>
      </ul>

    </section>

    <section class="section-block">
      <label><Icon name="mingcute:braces-line" />知识技能</label>

      <ul class="skills">
        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟练掌握 JavaScript (ES6+) 与 TypeScript 开发, 熟悉现代前端栈 (Vue / React / Svelte / Nuxt / Solid)
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉 UnoCSS / Tailwind CSS, 熟悉 SVG 动画, CSS 动效, 具备较佳的 UI/UX 理解能力
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉 WebGL, Three.js, Tres.js, 能完成复杂的交互与可视化设计
        </li>

        <li><Icon name="mingcute:diamond-square-line" />熟悉 LLM Agent 开发范式, 理解上下文建模, 记忆缓存, 向量检索 (RAG) 等机制</li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟练使用 ChatGPT / OpenAI API / Stable Diffusion / Midjourney / ComfyUI 等 AIGC 工具链的理解
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          有自研多种 AI Tool 精简自身工作流的经验
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉 Node.js / NestJS / Electron / Tauri / Capacitor / .NET MAUI 等多端框架
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          了解微服务架构, 熟悉 Vite, ESLint, Prettier, commitlint, CI/CD, Monorepo, Git flow 等工程化体系
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉 DevOps 工具链 (pm2, Docker, Nginx, 1Panel) 能独立完成部署与运维
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉 WebGIS / Canvas 图层渲染, 掌握 leaflet, ECharts, D3 等可视化库
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉 Blender, Figma, Photopea, Aesprite 等设计工具, 能独立完成 2D/3D 素材和动画创作, 具备 Shader 编程能力
        </li>

        <li>
          <Icon name="mingcute:hexagon-line" />
          熟悉 Houdini 节点式工作流, 具备程序化生成经验
        </li>

        <li>
          <Icon name="mingcute:hexagon-line" />
          熟悉 Linux / macOS / WinAPI, 能编写底层工具和驱动模块, 对工作区环境 (OS / IDE) 和效率提升有一定程度而不走极端的技术洁癖和要求
        </li>

        <li>
          <Icon name="mingcute:hexagon-line" />
          掌握游戏开发基本流程与脚本系统 (Lua / C++ / TS / Python), 了解客户端渲染与引擎架构设计
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
span.iconify {
  @apply overflow-hidden;
}

.resume {
  @apply w-full max-w-[1000px] mx-auto pt-4;

  .title {
    @apply text-[25px] pb-1 pl-1 mb-2 flex items-end gap-2;
    @apply border-b-[2px] font-[600] text-neutral-800;

    .name {
      @apply text-[16px] mb-[1px] opacity-85 font-normal;
    }
  }

  .personal-info {
    @apply flex flex-wrap pl-5;

    & > div {
      @apply w-1/4 p-1 text-sm flex items-center gap-2 text-neutral-800;
      list-style: none;

      a {
        @apply flex items-center gap-1;
        @apply hover:text-purple-500 cursor-pointer transition-all;
      }
      span.iconify {
        @apply size-[16px];
      }
    }
  }

  .section-block {
    @apply my-6;

    label {
      @apply border-b-[1px] text-neutral-600 border-gray-200 pb-1 pl-1 mb-2;
      @apply text-lg font-[600];
      @apply flex items-center gap-1;
    }

    span.iconify {
      @apply size-[22px] text-neutral-600;
    }

    ul {
      @apply pl-6;

      li {
        @apply text-[13px] text-neutral-800 w-full flex items-center gap-1 relative pl-4;

        strong {
          @apply font-[600] text-black mr-1;
        }

        a {
          @apply text-purple-400 font-normal;
          @apply hover:text-purple-300 cursor-pointer transition-all;
        }

        span.iconify {
          @apply size-[14px] text-black absolute left-[-4px] top-[2px];
        }
      }

      .time {
        @apply ml-auto mr-3;
        letter-spacing: 0.5px;
      }
    }

    ul + ul {
      @apply mt-2;
    }

    ul.skills {
      li {
        @apply my-[2px];
      }
    }
  }
}

.unique-border-owner {
  @apply border-t-[1px] border-dashed border-purple-600;
}
</style>
