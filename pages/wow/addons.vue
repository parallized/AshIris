<script setup lang="ts">
import { useHead } from '#app'
import { ref } from 'vue'

useHead({
  title: 'WoW 插件指南',
})

const states = ref({
  mustHave: false,
  mythic: false,
  best: false,
})
</script>

<template>
  <div class="index noise">
    <h1 class="title">
      <img
        class="w-[130px] h-[130px] absolute left-0"
        src="~/assets/image/wow/wow.png"
      />
      <p
        class="text-[22px] opacity-80 tracking-wider bg-clip-text bg-gradient-to-r text-transparent from-orange-800 to-black"
      >
        魔兽世界 插件速成指南！
      </p>
    </h1>

    <p class="flex items-center gap-2">
      <Icon name="akar-icons:chat-question" />整合插件学习困难?
      单体插件看不明白? 我的界面有点丑陋? 马上 3 分钟速成插件自定制
    </p>
    <a
      href="https://bbs.nga.cn/read.php?tid=43998343"
      target="_blank"
      class="hover:underline text-blue-600 flex items-center gap-2"
      ><Icon name="lucide:mouse-pointer-click" />宣传一下我的 NGA 公益大米 2-13C
      均可, 免费语音教学 + 插件 UI 定制</a
    >

    <!-- 常用插件 -->
    <div
      class="expand-block"
      v-if="!states.mustHave"
      @click="states.mustHave = true"
    >
      <button class="flex gap-2 items-center">
        <Icon name="gravity-ui:carets-expand-vertical" />
        常用通用插件
        <span class="text-gray-500 text-[14px]">共 5 个</span>
      </button>
    </div>
    <ul class="addons" v-else>
      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/wa.png" />
          <p class="desc">
            WeakAuras<span class="sub-desc"
              >屏幕上各种提示框, 实用小功能, 几乎必备的 WA 插件</span
            >
          </p>
        </div>
        <div class="flex items-center gap-4">
          <img class="intro" src="~/assets/image/wow/wa-intro-1.png" />
          <img class="intro" src="~/assets/image/wow/wa-intro-2.png" />
          <img class="intro" src="~/assets/image/wow/wa-intro-3.png" />
          <img class="intro" src="~/assets/image/wow/wa-intro-4.png" />
        </div>
        <ul class="addon-info">
          <li>一般需要安装的常见 WA 有:</li>
          <li class="ml-4 text-gray-500">
            · 职业技能 / 冷却 / 触发提示，熟练之后可以盯着这个仪表盘打
          </li>
          <li class="ml-4 text-gray-500">
            · 当前赛季的大秘境技能提示，包括技能点谁，提醒开减伤等，是对 DBM /
            BigWigs 的补充
          </li>
          <li class="ml-4 text-gray-500">
            · 在
            <a
              class="text-blue-500"
              href="https://wago.io/the-war-within-weakauras"
              target="_blank"
              >wago.io</a
            >
            或新手盒子 / 黑盒工坊可以找到各种职业 / 通用 / 便利功能性的 WA
          </li>
        </ul>
      </li>

      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/icons/bigwigs.png" />
          <img
            class="icon-addons"
            src="~/assets/image/wow/icons/littlewigs.png"
          />
          <p class="desc">
            BigWigs & LittleWigs<span class="sub-desc"
              >播报怪物技能, DBM 轻量代替品, Bigwigs 是团本和大米, Littlewigs
              是大米, 都要安装</span
            >
          </p>
        </div>
        <div class="flex items-center gap-4">
          <img
            class="intro !h-[120px]"
            src="~/assets/image/wow/wa-intro-4.png"
          />
          <img
            class="intro !h-[120px]"
            src="~/assets/image/wow/desc/bigwigs.png"
          />
          <img
            class="intro !h-[120px]"
            src="~/assets/image/wow/desc/ability.png"
          />
        </div>
        <ul class="addon-info">
          <li class="text-gray-500">
            · 如图时间轴是安装 BigWigs & LittleWigs 或 DBM 之后再安装一个 WA
            实现的效果
          </li>
          <li class="text-gray-500">
            · WA 原版在
            <a
              class="text-blue-500"
              href="https://wago.io/RaidAbilityTimeline/77"
              target="_blank"
              >RaidAbilityTimeline</a
            >, 也可以在新手盒子搜 Ability Timeline 找
          </li>
        </ul>
      </li>

      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/icons/details.png" />
          <p class="desc">
            Details! Damage Meter<span class="sub-desc"
              >战斗统计插件, 如果不传 WCL 则必备</span
            >
          </p>
        </div>
        <div class="flex items-center gap-4">
          <img class="intro" src="~/assets/image/wow/details/damage.png" />
          <img class="intro" src="~/assets/image/wow/details/heal.png" />
          <img class="intro" src="~/assets/image/wow/details/sort.png" />
        </div>
        <ul class="addon-info">
          <li class="text-gray-500">
            · 一般常用 伤害 / 治疗 / 打断 / 增益持续时间
          </li>
          <li class="text-gray-500">
            · 例如治疗分配到 T 的比例不到 20% 可能说明 T 的自回能力足够,
            恶魔尖刺的覆盖比例 80% - 95% 说明减伤较好
          </li>
          <li class="text-gray-500">
            · 可以在 WCL 上找高手的占比, 以此确认自己的优先级 /
            手法是否有优化的空间 (大秘境合波不同占比可能也不同)
          </li>
        </ul>
      </li>

      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/icons/plater.png" />
          <p class="desc">
            Plater Nameplates<span class="sub-desc"
              >高度可增强的姓名板插件</span
            >
          </p>
        </div>
        <div class="flex items-center gap-4">
          <img
            class="intro !h-[190px]"
            src="~/assets/image/wow/plater/color.png"
          />
          <img
            class="intro !h-[190px]"
            src="~/assets/image/wow/plater/kill.png"
          />
        </div>
        <ul class="addon-info">
          <li class="text-gray-500">
            · 根据姓名板颜色判断是否有上 DOT/DEBUFF (痛苦, 猫德, 咕咕等 DOT
            职业极好用, 其他多数职业也有很好的效果)
          </li>
          <li class="text-gray-500">
            · 有各种功能模组, 例如可以设置 AOE 范围 / 怪物打奶是一种颜色, 打 T
            是一种颜色, 打副 T 是另一种颜色, 团本里效果也很好
          </li>
          <li class="text-gray-500">
            · 和 WA 类似, 在
            <a
              class="text-blue-500"
              href="https://wago.io/plater"
              target="_blank"
              >https://wago.io/plater</a
            >
            可以找到各种职业 / 通用 / 便利功能性的配置
          </li>
        </ul>
      </li>

      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/icons/cell.png" />
          <p class="desc">Cell<span class="sub-desc">队伍框架</span></p>
        </div>
        <div class="flex items-center gap-4">
          <img
            class="intro !h-[190px]"
            src="~/assets/image/wow/cell/click.png"
          />
          <img
            class="intro !h-[190px]"
            src="~/assets/image/wow/cell/buff.png"
          />
          <img
            class="intro !h-[190px]"
            src="~/assets/image/wow/cell/debuff.png"
          />
          <img
            class="intro !h-[190px]"
            src="~/assets/image/wow/cell/preview.png"
          />
        </div>
        <ul class="addon-info">
          <li class="text-gray-500">
            · 非常好用的智能点击施法, 哪里掉血点哪里
          </li>
          <li class="text-gray-500">
            · 可驱散的 DEBUFF 多种描边提醒, 治疗 HOT 可视化效果很好
          </li>
        </ul>
      </li>
      <div class="close" @click="states.mustHave = false">
        <Icon name="material-symbols:expand-rounded" />收起
      </div>
    </ul>

    <!-- 大秘境插件 -->
    <div
      class="expand-block"
      v-if="!states.mythic"
      @click="states.mythic = true"
    >
      <button class="flex gap-2 items-center">
        <Icon name="gravity-ui:carets-expand-vertical" />
        大秘境功能插件<span class="text-gray-500 text-[14px]">共 4 个</span>
      </button>
    </div>
    <ul class="addons" v-else>
      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/icons/mdt.png" />
          <p class="desc">
            Mythic Dungeon Tools - MDT<span class="sub-desc"
              >大秘境路线规划, 怪物技能查看</span
            >
          </p>
        </div>
        <div class="flex items-center gap-4">
          <img class="intro !h-[140px]" src="~/assets/image/wow/mdt/1.png" />
          <img class="intro !h-[140px]" src="~/assets/image/wow/mdt/2.png" />
          <img class="intro !h-[140px]" src="~/assets/image/wow/mdt/3.png" />
        </div>
        <ul class="addon-info">
          <li class="text-gray-500">
            · 在
            <a
              class="text-blue-500"
              href="https://raider.io/weekly-routes"
              target="_blank"
              >raider.io</a
            >
            可以找到每周平推和进阶路线, 或者在 nga 找更贴近集合石的本地化打法
          </li>
        </ul>
      </li>

      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/icons/omnicd.png" />
          <p class="desc">
            OmniCD - Party Cooldown Tracker<span class="sub-desc"
              >监控队友大招, 打断, CC 群控</span
            >
          </p>
        </div>
        <div class="flex items-center gap-4">
          <img
            class="intro !h-[120px]"
            src="~/assets/image/wow/omnicd/cc.png"
          />
        </div>
        <ul class="addon-info">
          <li class="text-gray-500">· 监控队友打断技能, 包括各种单断和群控</li>
          <li class="text-gray-500">
            · 监控队友爆发技能, 对齐灌注或者错开爆发
          </li>
        </ul>
      </li>

      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/icons/mrt.png" />
          <p class="desc">
            Method Raid Tools<span class="sub-desc">团队辅助工具</span>
          </p>
        </div>
        <div class="flex items-center gap-4">
          <img class="intro !h-[190px]" src="~/assets/image/wow/mrt/loot.png" />
          <img class="intro !h-[190px]" src="~/assets/image/wow/mrt/logs.png" />
        </div>
        <ul class="addon-info">
          <li class="text-gray-500">
            · 自动在副本内录制 warcraft logs, 配合 wcl 软件自动上传 (似乎
            BigWigs 也有类似功能)
          </li>
        </ul>
      </li>

      <li>
        <div class="addon">
          <img class="icon-addons" src="~/assets/image/wow/icons/plater.png" />
          <p class="desc">
            WarpDeplete Mythic+ Timer<span class="sub-desc"
              >大秘境进度优化</span
            >
          </p>
        </div>
        <div class="flex items-center gap-4">
          <img class="intro !h-[160px]" src="~/assets/image/wow/warp/1.png" />
        </div>
        <ul class="addon-info">
          <li class="text-gray-500">· 显示详细数值进度</li>
          <li class="text-gray-500">
            · 记录最佳击杀记录, 方便判断本次副本 BOSS 击杀速度是否比上一次更优
          </li>
        </ul>
      </li>

      <div class="close" @click="states.mythic = false">
        <Icon name="material-symbols:expand-rounded" />收起
      </div>
    </ul>

    <!-- 神奇妙妙插件 -->
    <div class="expand-block" v-if="!states.best" @click="states.best = true">
      <button class="flex gap-2 items-center">
        <Icon name="gravity-ui:carets-expand-vertical" />
        神奇妙妙小插件<span class="text-gray-500 text-[14px]"
          >共 1 个, 缓慢添加中</span
        >
      </button>
    </div>
    <ul class="addons" v-else>
      <li>
        <div class="addon">
          <img
            class="icon-addons"
            src="~/assets/image/wow/icons/baganator.png"
          />
          <p class="desc">
            Baganator<span class="sub-desc"
              >支持多角色高自定义信息搜索, 物品分类出售上架转移</span
            >
          </p>
        </div>
        <div class="flex items-center gap-4">
          <img
            class="intro !h-[140px]"
            src="~/assets/image/wow/baganator/1.png"
          />
          <img
            class="intro !h-[140px]"
            src="~/assets/image/wow/baganator/2.png"
          />
          <img
            class="intro !h-[140px]"
            src="~/assets/image/wow/baganator/3.png"
          />
        </div>
        <ul class="addon-info">
          <li class="text-gray-500">· 按照类型出售物品, 把物品移动到银行等</li>
          <li class="text-gray-500">
            · 可以同时看到多个账号的金币 / 货币 / 物品信息
          </li>
        </ul>
      </li>

      <div class="close" @click="states.best = false">
        <Icon name="material-symbols:expand-rounded" />收起
      </div>
    </ul>

    <!-- 界面效果 -->
    <div class="w-[1000px] shadow-lg relative rounded-xl">
      <div
        class="absolute text-gray-100 drop-shadow-sm text-[16px] px-10 py-14"
      >
        <p>以上单体插件 + NDui 界面美化</p>
        <p>缩放 x0.65, 分辨率 3440x1440</p>
      </div>
      <img class="w-full rounded-xl" src="~/assets/image/wow/show.png" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.index {
  @apply w-full h-full flex flex-col items-center text-[17px] gap-8 pb-32;
}

.icon-addons {
  @apply w-[48px] h-[48px] rounded-lg shadow-lg border-[1px];
}

.title {
  @apply relative h-[80px] mt-[40px] w-[500px] justify-center flex items-center;
}

.expand-block {
  @apply flex cursor-pointer gap-2 items-center w-full max-w-[1000px];
  @apply bg-gray-50/60 border-neutral-200/75 shadow-sm border-[1px] rounded-xl py-5 px-8;
}

.addons {
  @apply bg-gray-50/60 border-neutral-200/75 border-[1px] shadow-sm w-full max-w-[1000px] p-8 rounded-xl flex flex-col gap-8;

  .close {
    @apply flex items-center gap-2 w-full text-start text-[16px] cursor-pointer;
  }
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

.noise {
  @apply relative bg-neutral-100 z-[0];
}

.noise::before {
  content: '';
  @apply absolute inset-0 opacity-[0.08] z-[-1];
  background-size: 109px;
  background-image: url('~/assets/image/noise.png');
  background-repeat: repeat;
}
</style>
