<script setup lang="ts">
onMounted(() => {
  useColorMode().value = 'light'
})
</script>
<template>
  <div class="resume">
    <h1 class="title">
      技术美术
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
          <strong>杭州医疗信息化公司 A</strong>
          <span class="time">2023.03 至 2023.06</span>
        </li>

        <li>- 解析 dicom 医疗数据文件并基于 WebGL 完成可交互场景</li>
        <li>- 根据西门子 TCP/IP 协议约定进行数据轮询, 完善数据处理流水线</li>
      </ul>

      <ul>
        <li>
          <Icon name="mingcute:diamond-square-line" />
          <strong>杭州互联网公司 B</strong>
          <span class="time">2023.09 至 2024.11</span>
        </li>

        <li>
          - 开发基于 Chromium 的 Figma / Chrome 插件，完善浏览器页面间 service
          worker 通信
        </li>
        <li>- 优化公司产品 B 端 ui/ux 体验, 完成 web 前后端业务需求</li>
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
          基于 TresJS + Nuxt 的 Web 3D 可交互实时渲染图鉴, 复用 Headless
          后端和自制资产管理 API
        </li>
        <li>
          美术资产通过 Blender / Mineways / Litematic 结构流水线进行解析与转换
        </li>
        <li>针对不同场景优化 GL 参数 在应用端进行自动化材质修补</li>
      </ul>

      <ul>
        <li>
          <Icon name="arcticons:minecraft" />
          <strong>Minecraft 社区服务器作者</strong>

          <span class="time">2013 至 2020</span>
        </li>

        <li>
          通过 Blender / ObjToSchematic 等工具链,
          完成游戏内较大世界的批量美术资产生成, 地形系统, 植被覆盖
        </li>
        <li>
          基于 Kotlin + spigot API, Gradle 构建的游戏 Mod / 插件实现玩法系统,
          特效, Shader 光影等进行优化游戏体验和观感
        </li>
        <li>
          制作 QT / Python 辅助工具简化物品数值, 掉落, 技能复用等配表流程,
          为社区协作者提供无代码配置化方案如 Json 物品编辑器
        </li>
        <li>
          最多时游戏内玩家 700+ 同时在线, 制作 web 前端并部署, 通过与后端 &
          数据库交互提供注册验证等游戏内服务
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:astro-icon" />
          <strong>ash-iris-template CMS 博客</strong>
          <a target="_blank" href="https://parallized.cn">parallized.cn</a>
          <span class="time">2023.05 至今</span>
        </li>
      </ul>

      <ul>
        <li>
          <Icon name="logos:microsoft-windows-icon" />
          <strong>RPALite 软件自动化工具</strong>
          <span class="time">/</span>
        </li>
        <li>
          在 RPA 思想上设计, 基于 C# + WPF + WinAPI 的桌面端软件流程自动化工具
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
          <a target="_blank" href="https://github.com/parallized/DalamudPlugins"
            >github.com/parallized/DalamudPlugins</a
          >
          <span class="time">/</span>
        </li>
      </ul>
    </section>

    <section class="section-block">
      <label><Icon name="mingcute:braces-line" />知识技能</label>

      <ul class="skills">
        <li>
          <Icon name="mingcute:diamond-square-line" />
          了解计算机图形学, 渲染管线, 了解 cg, glsl, hlsl
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          了解美术制作流程和资源规范, 常用 Houdini, Blender 等 DCC 软件
        </li>

        <li>
          <Icon name="mingcute:hexagon-line" />
          了解 Figma, Aesprite, PS 等设计工具, 有一定的 ui/ux 和 mg 基础
        </li>

        <li>
          <Icon name="mingcute:hexagon-line" />
          常用 Unity, Unreal, Cocos 等游戏引擎, 熟悉游戏开发流程及设计理论,
          了解简单的性能分析和优化方案
        </li>

        <li>
          <Icon name="mingcute:hexagon-line" />
          有丰富的游戏脚本 / Mod / Addons 开发经验,
          熟悉常见的面向对象和函数式编程语言,
          能够独立完成一定体量全栈项目的开发部署和推广运维
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉敏捷开发, 版本管理, 常用 Git flow, Git Actions, Linux
          辅助工作流和日志管理
        </li>

        <li>
          <Icon name="mingcute:diamond-square-line" />
          熟悉针对游戏周边的 Web 开发 / 运维部署 / 测试开发场景,
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
