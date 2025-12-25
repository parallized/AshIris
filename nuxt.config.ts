import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  css: ["./app/assets/css/main.css"],
  modules: ["@nuxt/content", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image"],
  vite: {
    plugins: [tailwindcss()],
  },
});
