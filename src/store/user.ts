import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = { userId: '', username: '', realname: '', avatar: '' }

export const useUserStore = defineStore(
  'USER',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })

    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }

    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      userInfo.value = { ...initState }
    }

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      reset,
    }
  },
  {
    persist: true,
  },
)
