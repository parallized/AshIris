<template>
  <div
    class="bg-[#F0F0F0] min-h-screen text-black font-['Inter'] selection:bg-black selection:text-white"
  >
    <nav class="fixed right-8 top-8 z-50 flex flex-col items-end gap-1">
      <NuxtLink to="/" class="group flex items-center gap-2">
        <span
          class="text-sm font-black uppercase tracking-tighter group-hover:text-orange-600 transition-colors"
          >OUR IDENTITY</span
        >
      </NuxtLink>
      <NuxtLink to="/" class="group flex items-center gap-2">
        <span
          class="text-sm font-black uppercase tracking-tighter group-hover:text-orange-600 transition-colors"
          >CREATORS</span
        >
      </NuxtLink>
      <NuxtLink to="/" class="group flex items-center gap-2">
        <span
          class="text-sm font-black uppercase tracking-tighter group-hover:text-orange-600 transition-colors"
          >CULTURES</span
        >
      </NuxtLink>
      <NuxtLink to="/" class="group flex items-center gap-2">
        <span
          class="text-sm font-black uppercase tracking-tighter group-hover:text-orange-600 transition-colors"
          >ENTRY</span
        >
      </NuxtLink>
      <NuxtLink to="/" class="group flex items-center gap-2">
        <span
          class="text-sm font-black uppercase tracking-tighter text-orange-600"
          >HOME</span
        >
      </NuxtLink>
    </nav>

    <!-- 侧边栏装饰 -->
    <aside
      class="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-8"
    >
      <div class="-rotate-90 origin-center whitespace-nowrap">
        <span
          class="text-[14px] font-black uppercase tracking-[0.5em] opacity-20"
          >CREATED 2025 / CHINA HANGZHOU</span
        >
      </div>
    </aside>

    <main>
      <slot />
    </main>

    <footer
      class="p-8 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4 bg-white z-20 relative"
    >
      <div class="flex items-center gap-4">
        <div
          class="w-10 h-10 bg-black flex items-center justify-center rotate-3"
        >
          <span class="text-white font-black text-xl">🍞</span>
        </div>
        <p class="text-sm font-black uppercase tracking-widest">
          ©2025-2026 GREATER BREAD ESSENCE.
        </p>
      </div>
      <div class="flex gap-8 text-sm font-black uppercase tracking-widest">
        <a href="https://parallized.cn" target="_blank" class="hover:underline"
          >Portfolio</a
        >
        <a
          href="https://github.com/parallized"
          target="_blank"
          class="hover:underline"
          >GitHub</a
        >
        <a
          href="mailto:parallized@foxmail.com"
          class="hover:underline text-orange-600"
          >Hire Me</a
        >
      </div>
    </footer>
  </div>
</template>

<style>
.animate-spin-slow {
  animation: spin 8s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
