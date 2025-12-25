<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false);
const { $lenis } = useNuxtApp();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleNavClick = (to: string) => {
  isMenuOpen.value = false;
  if (to.startsWith("/#") && $lenis) {
    const targetId = to.split("#")[1];
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      $lenis.scrollTo(targetElement, {
        offset: 0,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  }
};

const navLinks = [
  { name: "Home", to: "/#home" },
  { name: "About", to: "/#about" },
  { name: "Works", to: "/#works" },
  { name: "Contact", to: "/#contact" },
];
</script>

<template>
  <div
    class="bg-[#1A1614] min-h-screen text-[#D9D1C7] font-['Inter'] selection:bg-[#A68B6D] selection:text-white relative text-base"
  >
    <!-- Desktop/Mobile Navigation -->
    <header
      class="fixed right-[6vw] md:right-[12vw] top-8 md:top-12 z-100 flex flex-col items-end gap-6 mix-blend-difference"
    >
      <NuxtLink
        to="/#home"
        @click.prevent="handleNavClick('/#home')"
        class="group"
      >
        <span
          class="text-xs md:text-base font-black uppercase tracking-[0.4em] text-[#A68B6D] group-hover:text-white transition-colors"
          >Greater Bread</span
        >
      </NuxtLink>

      <!-- Mobile Menu Toggle -->
      <button
        @click="toggleMenu"
        class="md:hidden text-[#A68B6D] flex flex-col gap-1.5 items-end p-2"
        aria-label="Toggle Menu"
      >
        <div
          class="w-6 h-[0.5px] bg-current transition-all"
          :class="{ 'rotate-45 translate-y-2': isMenuOpen }"
        ></div>
        <div
          class="w-4 h-[0.5px] bg-current transition-opacity"
          :class="{ 'opacity-0': isMenuOpen }"
        ></div>
        <div
          class="w-6 h-[0.5px] bg-current transition-all"
          :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"
        ></div>
      </button>

      <!-- Desktop Links -->
      <nav class="hidden md:flex flex-col items-end gap-3">
        <div class="h-16 w-[0.5px] bg-[#D9D1C7]/20 my-2"></div>
        <NuxtLink
          v-for="link in navLinks"
          :key="link.name"
          :to="link.to"
          @click.prevent="handleNavClick(link.to)"
          class="group relative overflow-hidden px-1 py-1"
        >
          <span
            class="text-[12px] font-black uppercase tracking-[0.3em] text-[#D9D1C7]/40 group-hover:text-white transition-colors duration-500"
            >{{ link.name }}</span
          >
          <div
            class="absolute bottom-0 left-0 w-full h-[0.5px] bg-[#A68B6D] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right"
          ></div>
        </NuxtLink>
      </nav>
    </header>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition duration-700 ease-in-out"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition duration-500 ease-in-out"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-90 bg-[#1A1614] flex flex-col items-center justify-center p-12 md:hidden text-[#D9D1C7]"
      >
        <div class="flex flex-col items-center gap-10 text-center">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            @click.prevent="handleNavClick(link.to)"
            class="text-4xl font-black uppercase tracking-tighter hover:italic hover:text-[#A68B6D] transition-all"
          >
            {{ link.name }}
          </NuxtLink>
        </div>

        <div
          class="absolute bottom-12 flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] opacity-30"
        >
          <a href="https://github.com/parallized" target="_blank">GitHub</a>
          <a href="mailto:parallized@foxmail.com">Email</a>
        </div>
      </div>
    </Transition>

    <!-- 侧边装饰线 -->
    <div
      class="fixed left-[6vw] md:left-[12vw] top-0 bottom-0 w-[0.5px] bg-[#D9D1C7]/10 z-40 hidden sm:block"
    ></div>

    <main>
      <slot />
    </main>

    <footer
      class="py-20 md:py-32 px-[6vw] md:px-[12vw] bg-[#1A1614] flex flex-col md:flex-row justify-between items-center gap-12 border-t border-[#D9D1C7]/5 relative z-10"
    >
      <div class="flex items-center gap-8">
        <span
          class="text-[8px] font-black uppercase tracking-[0.6em] text-[#A68B6D]/40 italic -rotate-90 origin-center"
          >Scroll</span
        >
        <div class="space-y-2">
          <p
            class="text-[9px] font-black uppercase tracking-[0.4em] text-[#D9D1C7]/30"
          >
            ©2024-2026 GREATER BREAD ESSENCE.
          </p>
          <p
            class="text-[8px] font-medium tracking-[0.2em] text-[#D9D1C7]/10 uppercase"
          >
            Architecting Digital Experiences
          </p>
        </div>
      </div>
      <div class="flex gap-12 text-[9px] font-black uppercase tracking-[0.4em]">
        <a
          href="https://github.com/parallized"
          target="_blank"
          class="text-[#D9D1C7]/40 hover:text-[#A68B6D] transition-colors"
          >GitHub</a
        >
        <a
          href="mailto:parallized@foxmail.com"
          class="text-[#D9D1C7]/40 hover:text-[#A68B6D] transition-colors"
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
