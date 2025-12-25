<script setup>
defineProps({
  direction: {
    type: String,
    default: "left", // 'left' or 'right'
  },
  speed: {
    type: String,
    default: "slow", // 'fast', 'normal', 'slow', 'very-slow'
  },
  tilt: {
    type: String,
    default: "0", // e.g., 'rotate-1', 'rotate-[-5deg]'
  },
  opacity: {
    type: String,
    default: "opacity-10",
  },
  content: {
    type: Array,
    required: true,
  },
  size: {
    type: String,
    default: "text-4xl",
  },
});

const speedClasses = {
  fast: "animate-marquee-left", // Reuse existing or define new
  normal: "animate-marquee-left",
  slow: "animate-marquee-left-slow",
  "very-slow": "animate-marquee-left-very-slow",
};
</script>

<template>
  <div
    class="w-full whitespace-nowrap flex py-2 border-y border-black/10 transition-all duration-700"
    :class="[tilt, opacity]"
  >
    <div
      class="flex gap-12 items-center"
      :class="[
        direction === 'left'
          ? speed === 'slow'
            ? 'animate-marquee-left-slow'
            : 'animate-marquee-left'
          : 'animate-marquee-right',
      ]"
    >
      <span
        v-for="i in 15"
        :key="i"
        :class="[size]"
        class="font-black uppercase tracking-tighter"
      >
        <slot>
          <span v-for="(item, idx) in content" :key="idx" class="mx-4">
            {{ item }}
          </span>
        </slot>
      </span>
    </div>
    <!-- Duplicate for seamless loop -->
    <div
      class="flex gap-12 items-center"
      :class="[
        direction === 'left'
          ? speed === 'slow'
            ? 'animate-marquee-left-slow'
            : 'animate-marquee-left'
          : 'animate-marquee-right',
      ]"
    >
      <span
        v-for="i in 15"
        :key="i"
        :class="[size]"
        class="font-black uppercase tracking-tighter"
      >
        <slot>
          <span v-for="(item, idx) in content" :key="idx" class="mx-4">
            {{ item }}
          </span>
        </slot>
      </span>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

.animate-marquee-left {
  animation: marquee-left 80s linear infinite;
}

.animate-marquee-left-slow {
  animation: marquee-left 150s linear infinite;
}

.animate-marquee-right {
  animation: marquee-right 100s linear infinite;
}
</style>
