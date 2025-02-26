import { defineStore } from 'pinia'
import { ref } from 'vue'
import { computed } from '#imports'

export enum HeaderColorMode {
  DARK,
  LIGHT,
}

export const useThemeStore = defineStore('theme', () => {
  const headerColorMode = computed(() => {
    if (headImgVisible.value || flowerVisible.value || showReelVisible.value) {
      return HeaderColorMode.DARK
    }

    return HeaderColorMode.LIGHT
  })

  const flowerVisible = ref<boolean>(false)
  const headImgVisible = ref<boolean>(true)
  const showReelVisible = ref<boolean>(false)

  const introHide = ref<boolean>(false)
  return {
    headerColorMode,
    introHide,

    // condition
    flowerVisible,
    headImgVisible,
    showReelVisible
  }
})
