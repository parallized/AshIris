<script setup lang="ts">
onMounted(() => {
  useColorMode().value = 'light'
})
</script>
<template>
  <div class="resume">
    <h1 class="title">
      前端开发
      <span class="name">梅狸猫</span>
    </h1>
    <header class="personal-info">
      <a target="_blank" href="https://parallized.cn">
        <Icon name="mingcute:book-2-line" />
        博客 parallized.cn</a
      >
      <a target="_blank" href="https://github.com/parallized">
        <Icon name="mingcute:github-line" />
        parallized</a
      >
      <a>
        <Icon name="mingcute:mail-line" />
        parallized@outlook.com</a
      >
      <a target="_blank" href="https://www.zhihu.com/people/littlelumos">
        <Icon name="mingcute:folder-open-line" />
        知乎 littlelumos</a
      >
      <a>
        <Icon name="mingcute:location-2-line" />
        浙江 · 杭州</a
      >
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
          <span class="time">2021.09 至 2026.06</span>
        </li>
        <li>
          结业课程: MIT6.006, CS61A, CS61B (迷宫生成 & 吉他仿声), UCB CS169, FCC
          Frontend Camp, Games101, LearnOpenGL
        </li>
        <li>
          中国大学生计算机设计大赛 · 省三等奖 (游戏组) / 浙江省电商创作大赛 ·
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
          <strong>杭州医疗信息化公司 A</strong>
          <span class="time">2023.03 至 2023.06</span>
        </li>

        <li>- 重构 Java / C# + dicom 医疗信息化业务到 Node.js</li>
        <li>- 开发 Vue3 + TypeScript + Vite 医疗可视化 SPA</li>
      </ul>

      <ul>
        <li>
          <Icon name="mingcute:diamond-square-line" />
          <strong>杭州互联网公司 B</strong>
          <span class="time">2023.09 至 2024.11</span>
        </li>

        <li>
          - 帮助开发基于 Vue + Svelte + RxJS 的 Chrome 插件，完善 service worker
          通信
        </li>
        <li>
          - 处理后台管理系统业务需求，优化公司产品 B 端 ux 体验，内部 monorepo
          组件库
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
          <Icon name="logos:threejs" />
          <strong>MachineHub 生电工房</strong>
          <a target="_blank" href="https://hub.parallized.cn">hub.parallized.cn</a>
          <span class="time">2024.11 至今</span>
        </li>
        <li>
          基于 TresJS + Nuxt 的 3D 可交互实时渲染图鉴, 复用 Headless
          后端和自制资产管理 API
        </li>
        <li>
          美术资产通过 Blender / Mineways / Litematic 结构解析流水线,
          通过弹性的图形学处理完成自动化材质修补和 GL 参数优化
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="devicon:capacitor" />
          <strong>GoodsCat 谷子猫</strong>
          <a target="_blank" href="https://goodscat.net">goodscat.net</a>
          <span class="opacity-30">/</span>
          <a target="_blank" href="https://meoww.cn">meoww.cn</a>
          <span class="time">2024.04 至 2024.07</span>
        </li>
        <li>
          支持 Web / Android / iOS 的多端 PWA 应用, 每月 50+ 订阅用户, 基于
          Capacitor + Nuxt + UnoCSS 构建, 自动打包发布, 云端推送更新
        </li>
        <li>
          通过渠道推送帮助用户完成煤炉 (mercari) 平台海淘, 支持 WxPush, 企微,
          OneBot, mirai 协议, multi-repo 管理复用 npm 模块
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="devicon-plain:trpc" />
          <strong>TomatoMagic 魔法番茄</strong>
          <a target="_blank" href="https://feel.parallized.cn">feel.parallized.cn</a>
          <span class="time">2024.04 至 2024.06</span>
        </li>
        <li>
          SSR + tRPC 应用，通过图形学算法生成 svg & canvas 图, 用 Three.js 呈现
          3D 效果
        </li>
        <li>
          基于难易番茄钟和应用心理学开发, 引导用户利用三分法 + todo list
          建立正向反馈的应用
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="lineicons:nuxt" />
          <strong>EachStar 创作互助平台</strong>
          <a target="_blank">each-star.com</a>
          <span class="time">2022.09 至 2023.03</span>
        </li>
        <li>
          基于 GitHub API 的开源互助社区, 帮助开源项目积累初始影响力,
          截至停止运营共有 1000+ 用户
        </li>
        <li>
          技术栈为 Koa + Nuxt, 前端应用 TailwindCSS + ElementPlus 快速开发,
          遵循标准 Git 工作流进行 CI / CD
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:astro-icon" />
          <strong>ash-iris-template 博客模板</strong>
          <a target="_blank" href="https://nescraft.cn">nescraft.cn</a>
          <span class="time">2023.05 至今</span>
        </li>
        <li>
          基于 Astro + daisyUI 实现的 SSG 博客模板, 避免过度水合作用, 性能极佳且
          SEO 友好
        </li>
        <li>
          可整合 React + Vue + Solid.js 多种框架能力, 并可快速部署到 GitHub
          Pages 或 Vercel
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:microsoft-windows-icon" />
          <strong>最终幻想 XIV 插件 / 工具库</strong>
          <span>逆向分析工具 + 工程案例 + WebUI</span>
          <a target="_blank" href="https://github.com/parallized/DalamudPlugins"
            >github.com/parallized/DalamudPlugins</a
          >
          <span class="time">/</span>
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:microsoft-windows-icon" />
          <strong>RPALite 软件自动化工具</strong>
          <span class="time">2021.12 至 2022.12</span>
        </li>
        <li>
          在 RPA 思想上设计, 基于 C# + WPF + WinAPI 的桌面端软件流程自动化工具
        </li>
        <li>
          发布了多个衍生软件, 如: 魔兽世界拍卖信息分析, 最终幻想 XIV 自动化助手,
          Apex Legends 经验 Bot
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:kotlin-icon" />
          <strong>Kapi 文件交互服务端</strong>
          采用 H2 文件驱动数据库的 Ktor 后端, 用于 Web 应用快速部署实验
          <span class="time">/</span>
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:java" />
          <strong>Minecraft 服务器插件</strong>
          基于 Kotlin + spigot API, Gradle 构建的游戏 Mod / 插件
          <span class="time">/</span>
        </li>
      </ul>
    </section>

    <section class="section-block">
      <label><Icon name="mingcute:braces-line" />知识技能</label>

      <ul class="skills">
        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉 JavaScript (ES6) 并常用 TypeScript 开发
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉 CSS3, Scss 预处理器, 能够熟练使用 UnoCSS / Tailwind CSS, 熟悉
          svg, css 动画
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          阅读过部分 Vue 源码, 熟悉 Vue 及周边生态如 Nuxt, Pinia, VueRouter,
          unplugin-vue
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          了解并常用工程化和规范化构建工具, 如 Vite, ESLint, Prettier,
          commitlint, changelog
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          了解计算机图形学, 能够运用 Three.js, WebGL, GLSL, Blender 完成 3D 制作
          & 渲染流程, 熟悉 Houdini, comfyui SD 程序化生成工作流
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉全栈框架, 常用 Node.js, Nest.js, Nuxt.js, Next.js, Electron,
          Tauri, uni-app, Flutter, Capacitor, .NET MAUI 完成各种场景开发
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉敏捷开发的方式与流程, 常用 Git flow, Git Actions, ZLogger 进行
          CI/CD 和日志跟踪, 了解 RabbitMQ, Monorepo
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉 webgis / canvas 开发, 了解 leaflet, d3, echarts, Chrome 插件,
          能完成一定程度的 ui/ux 设计和优化
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉 Linux / MacOS 及常见工具, 常用 pm2, docker, nginx
          进行项目管理部署运维
        </li>

        <li class="unique-border-owner">
          <Icon name="mingcute:hexagon-line" />
          了解 Figma, Aesprite, Blender 等设计工具, 了解 3D 建模, 2D 动画,
          能够完成简单的 Shader 需求场景
        </li>

        <li>
          <Icon name="mingcute:hexagon-line" />
          了解 Unity, Cocos, Unreal 等游戏引擎, 了解游戏开发流程及其设计理论
        </li>

        <li>
          <Icon name="mingcute:hexagon-line" />
          有丰富的游戏脚本开发经验, 了解 Lua, Python, Java, C# 等语言
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

    a {
      @apply w-1/3 p-1 text-sm flex text-neutral-800 items-center gap-1;
      @apply hover:text-purple-500 cursor-pointer transition-all;
      list-style: none;

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
