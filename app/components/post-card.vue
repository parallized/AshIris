<script setup>
defineProps(["post"]);
</script>

<template>
  <NuxtLink
    :to="post.url || post._path"
    :target="post.url ? '_blank' : '_self'"
    class="group relative flex items-center py-10 px-6 border-2 border-black mb-4 bg-white hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
  >
    <div
      class="flex flex-col md:flex-row md:items-center gap-6 w-full relative z-10"
    >
      <div class="flex-none md:w-24">
        <span
          class="text-sm font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-orange-600"
        >
          {{ post.date }}
        </span>
      </div>

      <div class="flex-1">
        <h2
          class="text-4xl md:text-5xl font-black uppercase tracking-tighter transition-all group-hover:italic"
        >
          {{ post.title }}
        </h2>
        <p
          v-if="post.description"
          class="text-base font-bold opacity-60 mt-1 uppercase group-hover:text-white/80"
        >
          {{ post.description }}
        </p>
      </div>

      <div class="flex items-center gap-4">
        <div class="hidden md:flex flex-col items-end">
          <span
            class="text-sm font-black uppercase tracking-widest opacity-40 group-hover:opacity-100"
            >{{ post.category }}</span
          >
          <span class="text-sm font-mono text-orange-600 font-bold"
            >#{{ post.tag }}</span
          >
        </div>
        <div
          class="w-12 h-12 flex items-center justify-center border-2 border-black group-hover:border-white group-hover:bg-orange-500 transition-colors"
        >
          <Icon
            :name="post.icon || 'ph:arrow-up-right-bold'"
            class="text-2xl"
          />
        </div>
      </div>
    </div>

    <!-- 背景装饰大文字 -->
    <span
      class="absolute right-20 top-1/2 -translate-y-1/2 text-8xl font-black text-black/3 pointer-events-none uppercase group-hover:text-white/5 transition-colors"
    >
      {{ post.tag || "ENTRY" }}
    </span>
  </NuxtLink>
</template>
