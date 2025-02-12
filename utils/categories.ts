const { coreApi } = useHalo()

const CATEGORY_MAP: Record<string, string> = {
  'category-GOzMV': '计算机体系',
  'category-Neglu': '人类世界攻略',
}

export const genStrCategories = (categories: string[]): string[] => {
  return categories.map((category) => CATEGORY_MAP[category])
}

export const getStrCategory = (category: string) => {
  return CATEGORY_MAP[category]
}
