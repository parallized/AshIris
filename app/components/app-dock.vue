<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";

const route = useRoute();

const dockItems = [
  { label: "画廊", to: "/board", icon: "ph:images-square" },
  { label: "关于", to: "/about", icon: "ph:user-focus" },
  { label: "联系", to: "/contact", icon: "ph:paper-plane-tilt" },
];

const isActive = (to: string) =>
  route.path === to || (route.path === "/" && to === "/about");

const dockRef = ref<HTMLElement | null>(null);
const hoverIndex = ref<number | null>(null);
const activeIndex = computed(() => dockItems.findIndex((item) => isActive(item.to)));
const indicator = reactive({
  opacity: 0,
  width: 0,
  x: 0,
});

const indicatorStyle = computed(() => ({
  opacity: indicator.opacity,
  transform: `translate3d(${indicator.x}px, 0, 0)`,
  width: `${indicator.width}px`,
}));

const getLinks = () =>
  Array.from(dockRef.value?.querySelectorAll<HTMLElement>(".app-dock-link") ?? []);

const moveIndicator = (index = hoverIndex.value ?? activeIndex.value) => {
  const dock = dockRef.value;
  const links = getLinks();
  const link = index >= 0 ? links[index] : undefined;

  if (!dock || !link) {
    indicator.opacity = 0;
    return;
  }

  const dockRect = dock.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  indicator.opacity = 1;
  indicator.width = linkRect.width;
  indicator.x = linkRect.left - dockRect.left;
};

const setHover = (index: number) => {
  hoverIndex.value = index;
  moveIndicator(index);
};

const clearHover = () => {
  hoverIndex.value = null;
  moveIndicator(activeIndex.value);
};

onMounted(() => {
  nextTick(() => moveIndicator());
  window.addEventListener("resize", clearHover);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", clearHover);
});

watch(
  () => route.path,
  () => nextTick(() => clearHover()),
);
</script>

<template>
  <nav
    ref="dockRef"
    class="app-dock"
    aria-label="Primary navigation"
    @pointerleave="clearHover"
  >
    <span class="app-dock-indicator" :style="indicatorStyle" aria-hidden="true"></span>
    <NuxtLink
      v-for="(item, index) in dockItems"
      :key="item.to"
      :to="item.to"
      class="app-dock-link"
      :class="{ 'app-dock-link-active': isActive(item.to) }"
      :aria-label="item.label"
      :aria-current="isActive(item.to) ? 'page' : undefined"
      :title="item.label"
      @focus="setHover(index)"
      @blur="clearHover"
      @pointerenter="setHover(index)"
      @pointerdown="setHover(index)"
    >
      <Icon :name="item.icon" class="app-dock-icon" />
      <span class="app-dock-label">{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<style scoped>
.app-dock {
  position: fixed;
  left: 50%;
  bottom: max(20px, env(safe-area-inset-bottom));
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px;
  overflow: visible;
  border: 1px solid rgb(15 23 42 / 5%);
  border-radius: 999px;
  background: rgb(247 248 244 / 42%);
  box-shadow:
    0 18px 48px -30px rgb(15 23 42 / 22%),
    0 8px 22px -14px rgb(15 23 42 / 16%),
    inset 0 1px 0 rgb(255 255 255 / 80%),
    inset 0 -1px 0 rgb(0 0 0 / 5%);
  backdrop-filter: blur(18px) saturate(1.35);
  -webkit-backdrop-filter: blur(18px) saturate(1.35);
  transform: translateX(-50%);
}

.app-dock::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
  background-size: 160px 160px;
}

.app-dock-indicator {
  position: absolute;
  top: 6px;
  left: 0;
  z-index: 0;
  width: 0;
  height: 38px;
  border-radius: 999px;
  background: #27241f;
  box-shadow:
    0 14px 28px -16px rgb(0 0 0 / 34%),
    0 5px 12px -8px rgb(0 0 0 / 24%),
    inset 0 1px 0 rgb(255 255 255 / 14%);
  pointer-events: none;
  transition:
    transform 420ms cubic-bezier(0.2, 0.85, 0.2, 1),
    width 420ms cubic-bezier(0.2, 0.85, 0.2, 1),
    opacity 160ms ease;
}

.app-dock-link {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: auto;
  height: 38px;
  padding: 0 12px;
  border-radius: 999px;
  color: rgb(32 33 31 / 72%);
  text-decoration: none;
  transition:
    color 260ms ease,
    padding 260ms ease;
}

.app-dock-link:hover,
.app-dock-link:focus-visible {
  color: #f7f6f1;
}

.app-dock-link-active {
  color: #f7f6f1;
  padding: 0 14px;
}

.app-dock-link-active:hover {
  color: #f7f6f1;
}

.app-dock-icon {
  width: 17px;
  height: 17px;
  flex: none;
  stroke-width: 2.2;
}

.app-dock-label {
  font-size: 13px;
  font-weight: 650;
  line-height: 1;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

@media (max-width: 560px) {
  .app-dock {
    gap: 3px;
    padding: 5px;
  }

  .app-dock-link {
    gap: 5px;
    height: 36px;
    padding: 0 10px;
  }

  .app-dock-indicator {
    top: 5px;
    height: 36px;
  }

  .app-dock-icon {
    width: 16px;
    height: 16px;
  }

  .app-dock-label {
    font-size: 12px;
  }
}
</style>
