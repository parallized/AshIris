import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  css: ["./app/assets/css/main.css"],
  modules: ["@nuxt/icon", "@nuxt/image"],
  app: {
    head: {
      title: '强效面包精华 - Blog',
      link: [
        { rel: 'icon', type: 'image/png', href: '/bread.png' }
      ]
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
