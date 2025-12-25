<script setup lang="ts">
interface Project {
  title: string;
  description: string;
  url: string;
  date: string;
  category: string;
  tag: string;
  icon: string;
}

interface Skill {
  name: string;
  icon: string;
}

const projects: Project[] = [
  {
    title: "Runedra 知树",
    description: "人类知识学习加速启动，构建多维知识图谱",
    url: "https://rune.parallized.cn",
    date: "2024.11",
    category: "AI / Education",
    tag: "FEATURED",
    icon: "ph:tree-structure-fill",
  },
  {
    title: "OwOcaptain",
    description: "守望先锋地图理解 60 秒速查，专业安娜位指南",
    url: "https://owo.parallized.cn",
    date: "2024.08",
    category: "Game Tool",
    tag: "UTILITY",
    icon: "ph:strategy-fill",
  },
  {
    title: "WoW Magician",
    description: "魔兽世界 AI & MRT 战术板 + 全自动排轴解法",
    url: "https://wow.parallized.cn",
    date: "2024.05",
    category: "Full-Stack / AI",
    tag: "GUILD",
    icon: "ph:magic-wand-fill",
  },
  {
    title: "AshIris",
    description: "极简、粗野主义与 Y2K 风格融合的个人博客",
    url: "https://parallized.cn",
    date: "2024.12",
    category: "Identity",
    tag: "BLOG",
    icon: "ph:fingerprint-fill",
  },
];

const skills: Skill[] = [
  { name: "逆向工程", icon: "ph:cube-transparent-fill" },
  { name: "3D 建模", icon: "ph:bounding-box-fill" },
  { name: "AI LLM 开发", icon: "ph:sparkle-fill" },
  { name: "全栈开发", icon: "ph:unite-fill" },
  { name: "数据爬虫", icon: "ph:intersect-fill" },
  { name: "Unity/Cocos", icon: "ph:polygon-fill" },
];
</script>

<template>
  <div class="bg-[#FDFBF7] min-h-screen">
    <!-- Hero Section -->
    <HeroSection
      letter="G"
      word="reater"
      tagline="释放无限可能。面包之力，重塑现实。"
    />

    <!-- Identity Section -->
    <IdentitySection
      graduation="2021 — 2026"
      experience="3 Years Working"
      base="Zhejiang, China"
      :skills="skills"
    />

    <!-- Works Section -->
    <WorksSection :projects="projects" />

    <!-- Contact Section -->
    <ContactSection
      email="parallized@foxmail.com"
      github="https://github.com/parallized"
      blog="https://parallized.cn"
    />
  </div>
</template>
