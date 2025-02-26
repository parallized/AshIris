import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum HeaderColorMode {
  DARK,
  LIGHT,
}

export const useThemeStore = defineStore('theme', () => {
  const headerColorMode = ref<HeaderColorMode>(HeaderColorMode.DARK)
  const introHide = ref<boolean>(false)
  return {
    headerColorMode,
    introHide
  }
})
