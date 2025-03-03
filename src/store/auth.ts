import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'AUTH',
  () => {
    const token = ref('')
    const dicts = ref()
    const permissions = ref([])

    const isLoggedIn = computed(() => !!token.value)
    const setToken = (val: string) => {
      token.value = val
    }

    const clearToken = () => {
      token.value = ''
    }

    const setPermissions = (val: any) => {
      permissions.value = val
    }

    const setDicts = (val: any) => {
      dicts.value = val
    }

    const logout = () => {
      clearToken()
      permissions.value = []
      dicts.value = []
    }

    return {
      token,
      dicts,
      setToken,
      clearToken,
      permissions,
      setDicts,
      setPermissions,
      isLoggedIn,
      logout,
    }
  },
  {
    persist: true,
  },
)
