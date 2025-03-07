<script setup lang="ts">
import TechCard from '~/components/tech/tech-card.vue'
</script>

<template>
  <section class="techskill bg-noise">
    <div class="tech-group">
      <div class="tech-group_set">
        <div class="divider"/>
        <h2>语言 & 脚本</h2>
        <TechCard name="devicon:csharp" />
        <TechCard name="devicon:cplusplus" />
        <TechCard name="devicon:c" />
        <TechCard name="devicon:dart" />
        <TechCard name="devicon:elixir" />
        <TechCard name="devicon:java" />
        <TechCard name="devicon:javascript" />
        <TechCard name="devicon:typescript" />
        <TechCard name="devicon:kotlin" />
        <TechCard name="devicon:lua" />
        <TechCard name="devicon:python" />
        <TechCard name="devicon:markdown" />
      </div>

      <div class="tech-group_set">
        <div class="divider"/>
        <h2>设计 & CG</h2>
        <TechCard name="file-icons:houdini" class="text-[#ff9c4c]" />
        <TechCard name="devicon:blender" />
        <TechCard name="devicon:opencv" />
        <TechCard name="devicon:opengl" />
        <TechCard name="devicon:threejs" />
        <TechCard name="devicon:figma" />
      </div>

      <div class="tech-group_set">
        <div class="divider"/>
        <h2>工具 & 中间件</h2>
        <TechCard name="devicon:git" />
        <TechCard name="devicon:jenkins" />
        <TechCard name="devicon:notion" />
        <TechCard name="devicon:nginx" />
        <TechCard name="devicon:apache" />
        <TechCard name="devicon:docker" />
        <TechCard name="devicon:nodejs" />
        <TechCard name="devicon:npm" />
        <TechCard name="devicon:pnpm" />
        <TechCard name="devicon:gradle" />
        <TechCard name="devicon:nuget" />
        <TechCard name="devicon:postman" />
        <TechCard name="devicon:storybook" />
        <TechCard name="devicon:vercel" />
      </div>

      <div class="tech-group_set">
        <div class="divider"/>
        <h2>前端 & UI</h2>
        <TechCard name="devicon:vuejs" />
        <TechCard name="devicon:react" />
        <TechCard name="devicon:astro" />
        <TechCard name="devicon:solidjs" />
        <TechCard name="devicon:svelte" />
        <TechCard name="devicon:nuxtjs" />
        <TechCard name="devicon:nextjs" />
        <TechCard name="devicon:chartjs" />
        <TechCard name="devicon:antdesign" />
        <TechCard name="devicon:materialui" />
        <TechCard name="devicon:sass" />
        <TechCard name="devicon:vitejs" />
        <TechCard name="devicon:tailwindcss" />
        <TechCard name="devicon:d3js" />
      </div>

      <div class="tech-group_set">
        <div class="divider"/>
        <h2>后端相关</h2>
        <TechCard name="devicon:express" />
        <TechCard name="devicon:nestjs" />
        <TechCard name="devicon:ktor" />
        <TechCard name="devicon:postgresql" />
        <TechCard name="devicon:prisma" />
        <TechCard name="devicon:spring" />
        <TechCard name="devicon:sqlite" />
        <TechCard name="devicon:redis" />
        <TechCard name="devicon:rabbitmq" />
      </div>

      <div class="tech-group_set">
        <div class="divider"/>
        <h2>跨端 & 客户端</h2>
        <TechCard name="devicon:androidstudio" />
        <TechCard name="devicon:flutter" />
        <TechCard name="devicon:capacitor" />
        <TechCard name="devicon:dot-net" />
        <TechCard name="devicon:electron" />
        <TechCard name="devicon:ionic" />
        <TechCard name="devicon:qt" />
        <TechCard name="devicon:tauri" />
        <TechCard name="devicon:unity" />
        <TechCard name="devicon:unrealengine" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.techskill {
  @apply w-full pb-48;
}

.tech-group {
  @apply max-w-[1440px] mx-auto px-9;
  @apply grid grid-cols-2 xl:grid-cols-3 items-center justify-center flex-wrap gap-8 xl:gap-24 w-full;

  &_set {
    @apply xl:pb-[150px] pb-[170px] flex flex-wrap items-start gap-2 h-[44px];

    .divider {
      @apply bg-gradient-to-r h-[1px] w-full from-neutral-400/50 to-neutral-100 mb-6
    }
    h2 {
      @apply text-[14px] xl:text-base tracking-wider opacity-75 text-start w-full mb-2;
    }
  }
}
</style>
