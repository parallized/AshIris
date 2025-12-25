<template>
  <div
    class="bg-[#1A1614] min-h-screen font-['Inter'] selection:bg-[#A68B6D] selection:text-white"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
