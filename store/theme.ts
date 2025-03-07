import { defineStore } from 'pinia'
import { ref } from 'vue'
import { computed, useRoute } from '#imports'

export enum HeaderColorMode {
  DARK,
  LIGHT,
}

export const useThemeStore = defineStore('theme', () => {
  const route = useRoute()

  const headerColorMode = computed(() => {
    if (!(route.path === '/' || route.path === '/index')) {
      return HeaderColorMode.LIGHT
    }

    if (headImgVisible.value || flowerVisible.value || showReelVisible.value) {
      return HeaderColorMode.DARK
    }

    return HeaderColorMode.LIGHT
  })

  const flowerVisible = ref<boolean>(false)
  const headImgVisible = ref<boolean>(true)
  const showReelVisible = ref<boolean>(false)
  const isIndexPage = computed(() => {
    return (route.path === '/' || route.path === '/index')
  })

  const introHide = ref<boolean>(false)

  const headerCollapsed = computed(()=>{
    return (route.path.startsWith('/posts/'))
  })

  return {
    headerCollapsed,
    headerColorMode,
    introHide,

    // condition
    isIndexPage,
    flowerVisible,
    headImgVisible,
    showReelVisible
  }
})
