<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Works", to: "/" },
  { name: "About", to: "/" },
];
</script>

<template>
  <div
    class="bg-[#FDFBF7] min-h-screen text-[#1A1614] font-['Inter'] selection:bg-[#D97706] selection:text-white relative text-base"
  >
    <!-- Desktop/Mobile Navigation -->
    <header
      class="fixed right-6 top-6 md:right-12 md:top-12 z-100 flex flex-col items-end gap-4 mix-blend-difference"
    >
      <NuxtLink to="/" class="group">
        <span
          class="text-sm md:text-base font-black uppercase tracking-[0.3em] text-[#D97706] group-hover:text-white transition-colors"
          >Greater Bread</span
        >
      </NuxtLink>

      <!-- Mobile Menu Toggle -->
      <button
        @click="toggleMenu"
        class="md:hidden text-[#D97706] flex flex-col gap-1 items-end p-2"
        aria-label="Toggle Menu"
      >
        <div
          class="w-6 h-0.5 bg-current transition-all"
          :class="{ 'rotate-45 translate-y-1.5': isMenuOpen }"
        ></div>
        <div
          class="w-4 h-0.5 bg-current transition-opacity"
          :class="{ 'opacity-0': isMenuOpen }"
        ></div>
        <div
          class="w-6 h-0.5 bg-current transition-all"
          :class="{ '-rotate-45 -translate-y-1.5': isMenuOpen }"
        ></div>
      </button>

      <!-- Desktop Links -->
      <nav class="hidden md:flex flex-col items-end gap-2">
        <div class="h-12 w-px bg-white/20 my-2"></div>
        <NuxtLink
          v-for="link in navLinks"
          :key="link.name"
          :to="link.to"
          class="group relative overflow-hidden px-1"
        >
          <span
            class="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors duration-300"
            >{{ link.name }}</span
          >
          <div
            class="absolute bottom-0 left-0 w-full h-px bg-[#D97706] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"
          ></div>
        </NuxtLink>
      </nav>
    </header>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-90 bg-[#1A1614] flex flex-col items-center justify-center p-12 md:hidden text-[#FDFBF7]"
      >
        <div class="flex flex-col items-center gap-8 text-center text-base">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            @click="isMenuOpen = false"
            class="text-5xl font-black uppercase tracking-tighter hover:italic hover:text-[#D97706] transition-all"
          >
            {{ link.name }}
          </NuxtLink>
        </div>

        <div
          class="absolute bottom-12 flex gap-8 text-xs font-black uppercase tracking-widest opacity-40"
        >
          <a href="https://github.com/parallized" target="_blank">GitHub</a>
          <a href="mailto:parallized@foxmail.com">Email</a>
        </div>
      </div>
    </Transition>

    <!-- 侧边装饰线 -->
    <div
      class="fixed left-6 md:left-12 top-0 bottom-0 w-px bg-[#1A1614]/5 z-40 hidden sm:block"
    ></div>

    <main>
      <slot />
    </main>

    <footer
      class="p-8 md:p-12 bg-[#FDFBF7] flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[#1A1614]/5 relative z-10 text-base"
    >
      <div class="flex items-center gap-4 md:gap-6">
        <span
          class="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-[#D97706]/40 italic -rotate-90"
          >Scroll</span
        >
        <p
          class="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#1A1614]/30 text-center md:text-left"
        >
          ©2024-2026 GREATER BREAD ESSENCE.
        </p>
      </div>
      <div
        class="flex gap-8 md:gap-12 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]"
      >
        <a
          href="https://github.com/parallized"
          target="_blank"
          class="hover:text-[#D97706] transition-colors"
          >GitHub</a
        >
        <a
          href="mailto:parallized@foxmail.com"
          class="hover:text-[#D97706] transition-colors"
          >Connect</a
        >
      </div>
    </footer>
  </div>
</template>

<style>
.mix-blend-difference {
  mix-blend-mode: difference;
}
</style>
