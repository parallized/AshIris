import { createCoreApiClient } from '@halo-dev/api-client'
import axios from 'axios'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/sitemap'
  ],
  css: ['@/assets/fonts/fonts.css'],
  colorMode: {
    classSuffix: ''
  },
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },
  site: {
    url: 'https://parallized.cn',
    name: '花明远的小世界'
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls']
  },
  hooks: {
    async 'prerender:routes'(ctx) {
      const axiosInstance = axios.create({
        baseURL: 'https://halo.parallized.cn/',
        headers: {
          Authorization:
            'Bearer pat_eyJraWQiOiJJa2F5UkE0UUdQUlZZX1hxWUJCSGZXR0I5N2pJQXdPRnFaLWhHRTdPdnZzIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwOi8vcGFyYWxsaXplZC5jbiIsInN1YiI6InBhcmFsbGl6ZWQiLCJpYXQiOjE3MzkxNDgxNjYsImp0aSI6ImJhYTczZmZhLWNhZmYtYjMxNC1mY2ZjLTQ3MmY3MTM1Y2ZhNCIsInBhdF9uYW1lIjoicGF0LXBhcmFsbGl6ZWQtRXVNVEEifQ.M2V9qVn4MFpMEQ3qwuw1-MarefXZSk2WotnQjwOBqtpoiafijmZfIYOEiwxkM8aG4cV78IZ3cWYekNqG1ZQ7Irt8Un81BtrH30NEf2qPLr8pDqklMI0DRO_dzO6Xi9EniJpkDFzhj0CSu8qhlswfcOmCB8liBVKvUL5tLVQUrXPb52wahNMTpPiPpebygMF0cem6c51it5j5XUvlPG4l5gM32_-IeTy29QBpZSJ4f-9y5OjkfIOYprDH4kOx-wr-65k40rvdOFOnzjeDdWocujsbnPLAs-DPTadu51fE2Z-y7qiuCf_YGpwnagwygz5hm1419Hp4EjlIjmvVXUHDa-weID26rsna5ps0BSAAToEU7OXx9mvRFNgZJd5QpNqH3pHmobodrZoaeGGi2HYT4CjEgVArSWg2QpP5k_8q-_-mW-2pEj6DgS8OX4a_06Nld7v0_wmGS8c1AUn4fFfn4JiFxXQ-ZDxSFkEhW4xNN6cd_moXirCghAeKvrTboqVKG1borlzZb30ZDcd0g8-EHi4jjcCSOkz-YwF_ilSP6dJcRxt975FnsoEmZmzNldZjLws99fxG8lCrHbSlqSWd4TdFikn0bMJHKf4im2nwA4jsxxBI0WjNuKIivguoIOvDNwb1-INR-5wkpxLH26yKzbhAU6okLhfCmoyQMCUwZqg'
        }
      })

      const coreApi = createCoreApiClient(axiosInstance as any)

      const res = await coreApi.content.post.listPost()
      const posts = res.data.items

      const urls = posts
        .filter((p) => !p.spec.deleted)
        .map((p) => `/posts/${p.metadata.name}`)

      for (const url of urls) {
        ctx.routes.add(url)
      }
    }
  }
})
