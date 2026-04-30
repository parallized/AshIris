<script setup lang="ts">
interface Skill {
  name: string;
  icon: string;
}

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
  <div class="min-h-screen bg-[#1A1614] pb-28">
    <HeroSection
      id="about-hero"
      letter="G"
      word="reater"
      tagline="Do not go gentle into that good night."
    />

    <IdentitySection
      id="about"
      graduation="双非本数媒 2021 — 2026"
      experience="2 年实习经验，多年游戏周边开发"
      base="浙江，杭州"
      :skills="skills"
    />
  </div>
</template>
