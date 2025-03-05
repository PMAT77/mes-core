import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ConfigProviderTheme } from 'wot-design-uni/components/wd-config-provider/types'

export const useAppStore = defineStore(
  'APP',
  () => {
    const theme = ref<ConfigProviderTheme>('dark')

    const setTheme = (val: ConfigProviderTheme) => {
      theme.value = val
      uni.setNavigationBarColor({
        frontColor: val === 'light' ? '#000000' : '#ffffff',
        backgroundColor: val === 'light' ? '#ffffff' : '#111111',
      })

      uni.setTabBarStyle({
        backgroundColor: val === 'light' ? '#ffffff' : '#212121',
      })
    }

    const onThemeChange = () => {
      if (uni.onThemeChange) {
        uni.onThemeChange((res) => {
          const theme = res.theme || 'light'
          setTheme(theme)
        })
      } else if (window.matchMedia) {
        // H5 平台
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(isDarkMode ? 'dark' : 'light') // 默认
        window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
          setTheme(e.matches ? 'dark' : 'light') // 默认
        })
      } else {
        console.log('当前平台不支持主题监听')
        setTheme('light') // 默认
      }
    }

    const initTheme = () => {
      uni.getSystemInfo({
        success: (res) => {
          // 获取系统主题
          const theme = res.theme || 'light' // 默认主题为 light
          console.log('当前系统主题:', theme)
          setTheme('light')
        },
        fail: (err) => {
          console.error('获取系统信息失败:', err)
          setTheme('light') // 默认
        },
      })
    }

    return {
      theme,
      setTheme,
      initTheme,
      onThemeChange,
    }
  },
  {
    persist: true,
  },
)
