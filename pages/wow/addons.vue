<script setup lang="ts">
import { useHead } from '#app';

useHead({
  title: 'WoW 插件自订速成',
})
</script>

<template>
  <div class="index">
    <h1 class="title">
      <img
        class="w-[120px] h-[120px] absolute left-0"
        src="~/assets/image/wow/wow.png"
      />
      <p class="text-[24px] opacity-80 text-orange-800">魔兽世界 插件自订速成！</p>
    </h1>

    <p>
      整合插件学习困难? 单体插件看不明白? 我的界面有点丑陋? 马上 3
      分钟速成插件自定制
    </p>

    <ul class="addons">
      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/wa.png" />
          <p class="desc">WeakAuras<span class="sub-desc">屏幕上各种提示框, 实用小功能, 几乎必备的 WA 插件</span></p>
        </div>
        <div class="flex items-center gap-4">
          <img class="intro" src="~/assets/image/wow/wa-intro-1.png" />
          <img class="intro" src="~/assets/image/wow/wa-intro-2.png" />
          <img class="intro" src="~/assets/image/wow/wa-intro-3.png" />
          <img class="intro" src="~/assets/image/wow/wa-intro-4.png" />
        </div>
        <ul class="addon-info">
          <li>一般需要安装的常见 WA 有:</li>
          <li class="ml-4 text-gray-500">· 职业技能 / 冷却 / 触发提示，熟练之后可以盯着这个仪表盘打</li>
          <li class="ml-4 text-gray-500">· 当前赛季的大秘境技能提示，包括技能点谁，提醒开减伤等，是对 DBM / BigWigs 的补充</li>
          <li class="ml-4 text-gray-500">· 在 <a class="text-blue-500" href="https://wago.io/the-war-within-weakauras" target="_blank">wago.io</a> 或新手盒子 / 黑盒工坊可以找到各种职业 / 通用 / 便利功能性的 WA</li>
        </ul>
      </li>

      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/icons/bigwigs.png" />
          <img class="icon-addons" src="~/assets/image/wow/icons/littlewigs.png" />
          <p class="desc">BigWigs & LittleWigs<span class="sub-desc">播报怪物技能, DBM 轻量代替品, Bigwigs 是团本和大米, Littlewigs 是大米, 都要安装</span></p>
        </div>
        <div class="flex items-center gap-4">
          <img class="intro !h-[120px]" src="~/assets/image/wow/wa-intro-4.png" />
          <img class="intro !h-[120px]" src="~/assets/image/wow/desc/bigwigs.png" />
          <img class="intro !h-[120px]" src="~/assets/image/wow/desc/ability.png" />
        </div>
        <ul class="addon-info">
          <li class="text-gray-500">· 如图时间轴是安装 BigWigs & LittleWigs 或 DBM 之后再安装一个 WA 实现的效果</li>
          <li class="text-gray-500">· WA 原版在 <a class="text-blue-500" href="https://wago.io/RaidAbilityTimeline/77" target="_blank">RaidAbilityTimeline</a>, 也可以在新手盒子搜 Ability Timeline 找</li>
        </ul>
      </li>

      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/icons/details.png" />
          <p class="desc">Details! Damage Meter<span class="sub-desc">战斗统计插件, 如果不传 WCL 则必备</span></p>
        </div>
        <div class="flex items-center gap-4">
          <img class="intro" src="~/assets/image/wow/details/damage.png" />
          <img class="intro" src="~/assets/image/wow/details/heal.png" />
          <img class="intro" src="~/assets/image/wow/details/sort.png" />
        </div>
        <ul class="addon-info">
          <li class="text-gray-500">· 一般常用 伤害 / 治疗 / 打断 / 增益持续时间</li>
          <li class="text-gray-500">· 例如治疗分配到 T 的比例不到 20% 可能说明 T 的自回能力足够, 恶魔尖刺的覆盖比例 80% - 95% 说明减伤较好</li>
          <li class="text-gray-500">· 可以在 WCL 上找高手的占比, 以此确认自己的优先级 / 手法是否有优化的空间 (大秘境合波不同占比可能也不同)</li>
        </ul>
      </li>

      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/icons/plater.png" />
          <p class="desc">Plater Nameplates<span class="sub-desc">高度可增强的姓名板插件</span></p>
        </div>
        <div class="flex items-center gap-4">
          <img class="intro !h-[190px]" src="~/assets/image/wow/plater/color.png" />
          <img class="intro !h-[190px]" src="~/assets/image/wow/plater/kill.png" />
        </div>
        <ul class="addon-info">
          <li class="text-gray-500">· 根据姓名板颜色判断是否有上 DOT/DEBUFF (痛苦, 猫德, 咕咕等 DOT 职业极好用, 其他多数职业也有很好的效果)</li>
          <li class="text-gray-500">· 有各种功能模组, 例如可以设置 AOE 范围 / 怪物打奶是一种颜色, 打 T 是一种颜色, 打副 T 是另一种颜色, 团本里效果也很好</li>
          <li class="text-gray-500">· 和 WA 类似, 在 <a class="text-blue-500" href="https://wago.io/plater" target="_blank">https://wago.io/plater</a> 可以找到各种职业 / 通用 / 便利功能性的配置</li>
        </ul>
      </li>

      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/icons/cell.png" />
          <p class="desc">Cell<span class="sub-desc">队伍框架</span></p>
        </div>
        <div class="flex items-center gap-4">
          <img class="intro !h-[190px]" src="~/assets/image/wow/cell/click.png" />
          <img class="intro !h-[190px]" src="~/assets/image/wow/cell/buff.png" />
          <img class="intro !h-[190px]" src="~/assets/image/wow/cell/debuff.png" />
          <img class="intro !h-[190px]" src="~/assets/image/wow/cell/preview.png" />
        </div>
        <ul class="addon-info">
          <li class="text-gray-500">· 非常好用的智能点击施法, 哪里掉血点哪里</li>
          <li class="text-gray-500">· 可驱散的 DEBUFF 多种描边提醒, 治疗 HOT 可视化效果很好</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.index {
  @apply w-full h-full flex flex-col items-center text-[18px] gap-8 pb-32;
}

.icon-addons {
  @apply w-[48px] h-[48px] rounded-lg shadow-lg border-[1px];
}

.title {
  @apply relative h-[80px] mt-[40px] w-[500px] justify-center flex items-center;
}

.addons {
  @apply w-full max-w-[1000px] px-4 flex flex-col gap-8;
}

.addons > li {
  @apply flex gap-4 items-start flex-col w-full pb-6 text-[16px];

  &:not(:last-child) {
    @apply border-b-[1px] border-gray-200;
  }
}

.addon {
  @apply flex gap-1 items-center;

  .desc {
    @apply ml-2;
  }

  .sub-desc {
    @apply text-[14px] ml-[8px] text-gray-500;
  }
}

.addon-info {
  @apply w-full rounded-md text-[14px];
}

.intro {
  @apply h-[120px] rounded-md;
}
</style>
