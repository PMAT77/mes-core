import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore(
  'MENU',
  () => {
    const menus = ref([])

    const setMenus = (val: any[]) => {
      menus.value = val
    }

    return {
      menus,
      setMenus,
    }
  },
  {
    persist: true,
  },
)
