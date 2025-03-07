<script setup lang="ts">
</script>
<template>
  <div class="resume">
    <h1 class="title">
      游戏设计与开发
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
          结业课程: MIT6.006, CS61A, CS61B (迷宫生成与吉他仿声), UCB CS169, FCC
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
          <span><strong>杭州医疗信息化公司 A</strong>· 解析 dicom 协议到前端 WebGL 医疗可视化 / 开发 Node.js 后端</span>
          <span class="time">2023.03 至 2023.06</span>
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="mingcute:diamond-square-line" />
          <span><strong>杭州互联网公司 B</strong>· 开发 Figma / Chrome 插件, 完善 service worker 通信, 优化 ui/ux 体验并完成前后端开发</span>
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
          <Icon name="logos:unity" />
          <strong>Unity Captain</strong>
          <span>结合 AI 进行自动化开发</span>
          <span class="time">2025.03 至今</span>
        </li>
        <li>
          基于 OpenAI API 和 ScriptableObject 结构的 AI 自动化 Editor Window 工具插件
        </li>
        <li>旨在配表效率提升 / 文案和叙事优化 / 简单的 ShaderGraph 和 VEG 生成</li>
      </ul>

      <ul>
        <li>
          <Icon name="simple-icons:cocos" />
          <strong>Character Hero</strong>
          <span>2D 横向卷轴游戏</span>
          <span class="time">2021.11 至 2022.01</span>
        </li>
        <li>
          gameplay 开发, 类冒险岛的战斗系统, 包括基本的场景切换, NPC AI, 相机灯光和 UI, 物理和动画
        </li>
        <li>自制对话节点蓝图工具, 并生成 Json 结构供策划快速编辑文案</li>
      </ul>

      <ul>
        <li>
          <Icon name="arcticons:minecraft" />
          <span><strong>Minecraft 社区服务器作者 & 开发者</strong>最多时游戏内玩家 700+ 同时在线, 月营收 15k+</span>
          <span class="time">2013 至 2020</span>
        </li>
        <li>
          通过多种插件及工具链完成游戏内较大世界的批量美术资产生成, 地形系统, 植被覆盖并完成程序化的怪物刷新和物品玩法机制
        </li>
        <li>
          基于 Kotlin + Spigot API + Gradle 构建游戏插件来实现玩法系统,
          并开发简单的特效, Shader 光影等优化游戏体验和观感
        </li>
        <li>
          制作 QT / .NET / Python 辅助工具简化物品数值, 掉落, 技能复用等配表流程,
          为社区协作者提供无代码配置化方案如到端的 Json 物品编辑器
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:threejs" />
          <strong>Pixellens 像素档案馆</strong>
          <a target="_blank" href="https://github.com/Nesb01t/pixellens">nesb01t / pixellens</a>
          <span class="time">2024.11 至今</span>
        </li>
        <li>
          基于 TresJS + Nuxt 的 Web 3D 可交互实时渲染图鉴, 自制资产管理 API, 美术资产通过 Blender / Mineways / Litematic
          流水线进行解析与转换
        </li>
        <li>针对不同游戏实例场景优化 GL 参数, 自动对现有材质进行剔除, 透明度, 渲染队列等 Patch</li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:microsoft-windows-icon" />
          <strong>RPALite 软件自动化工具</strong>
          <span class="time">/</span>
        </li>
        <li>
          基于 RPA 的 C++ / WPF + ImGui WinAPI 软件自动化测试工具
        </li>
        <li>
          发布了多个符合游戏规则的衍生软件, 如: 魔兽世界拍卖信息分析, 最终幻想
          XIV 日常助手, Apex Legends 非侵入式 Bot
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:microsoft-windows-icon" />
          <strong>最终幻想 XIV 插件 / 工具库</strong>
          <span>逆向分析工具 + 工程案例 + WebUI</span>
          <a target="_blank" href="https://github.com/nesb01t/DalamudPlugins"
          >nesb01t / DalamudPlugins</a
          >
          <span class="time">/</span>
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:astro-icon" />
          <span><strong>AshIris 个人博客</strong>· 基于 Astro / Nuxt + Halo CMS 的个人博客</span>
          <a target="_blank" href="https://parallized.cn">parallized.cn</a>
          <span class="time">2023.05 至今</span>
        </li>
      </ul>
    </section>

    <section class="section-block">
      <label>
        <Icon name="mingcute:braces-line" />
        知识技能</label>

      <ul class="skills">
        <li>
          <Icon name="mingcute:diamond-square-line" />
          了解计算机图形学和面向实时视频游戏的渲染管线, 了解 cg, glsl, hlsl
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          了解美术制作流程和资源规范, 常用 Houdini, Blender 等 DCC Tools, 能完成常见的 HDA 制作和地编
        </li>

        <li>
          <Icon name="mingcute:hexagon-line" />
          常用 Unity, Unreal, Cocos, RPG Maker 等游戏引擎, 熟悉并长期实践游戏开发流程及游戏设计理论,
          了解性能分析和常见的优化方案
        </li>

        <li>
          <Icon name="mingcute:hexagon-line" />
          有丰富的游戏脚本 / Mod / Addons 开发经验,
          熟悉常见的面向对象和函数式编程语言,
          能够独立完成一定体量全栈项目的开发部署和推广运维
        </li>

        <li>
          <Icon name="mingcute:hexagon-line" />
          了解 Figma, Aesprite, PS 等设计工具, 有一定的 ui/ux 和 mg 基础, 有浅薄的审美和设计原理学习经历
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉计算机系统和组成原理, 数据结构, 设计模式, 软件工程, 敏捷开发, 版本管理, 常用 Git flow, Git Actions, Linux
          辅助工作流和日志管理
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉围绕游戏的 Web 开发 / 运维部署 / 测试开发场景,
          有多种游戏社区服务器长期运营开发经验
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
    @apply border-b-[2px] font-[600] text-neutral-800 dark:text-neutral-200;

    .name {
      @apply text-[16px] mb-[1px] opacity-85 font-normal;
    }
  }

  .personal-info {
    @apply flex flex-wrap pl-5;

    a {
      @apply w-1/3 p-1 text-sm flex text-neutral-800 dark:text-neutral-200 items-center gap-1;
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
      @apply border-b-[1px] text-neutral-600 dark:text-neutral-400 border-gray-200 pb-1 pl-1 mb-2;
      @apply text-lg font-[600];
      @apply flex items-center gap-1;
    }

    span.iconify {
      @apply size-[22px] text-neutral-600 dark:text-neutral-400;
    }

    ul {
      @apply pl-6;

      li {
        @apply text-[13px] text-neutral-800 dark:text-neutral-300 w-full flex items-center gap-1 relative pl-4;

        strong {
          @apply font-[600] text-black dark:text-white mr-1;
        }

        a {
          @apply text-purple-400 font-normal;
          @apply hover:text-purple-300 cursor-pointer transition-all;
        }

        span.iconify {
          @apply size-[14px] text-black dark:text-white absolute left-[-4px] top-[2px];
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
