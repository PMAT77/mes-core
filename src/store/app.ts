import useRoute from '@/hooks/useRoute'
import { t } from '@/locale'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ConfigProviderTheme } from 'wot-design-uni/components/wd-config-provider/types'

export const useAppStore = defineStore(
  'APP',
  () => {
    const theme = ref<ConfigProviderTheme>('dark')
    const autoTheme = ref(false)

    /* 设置主题 */
    const setTheme = (val: ConfigProviderTheme) => {
      theme.value = val

      const { currentPageStyle, isTabBarPage } = useRoute()

      // 页面是否有 NavigationBar
      if (currentPageStyle.navigationStyle !== 'custom') {
        uni.setNavigationBarColor({
          frontColor: theme.value === 'light' ? '#000000' : '#f2f7fd',
          backgroundColor: theme.value === 'light' ? '#f2f7fd' : '#111111',
        })
      }

      // 页面是否有 TabBar
      if (isTabBarPage()) {
        uni.setTabBarStyle({
          backgroundColor: theme.value === 'light' ? '#f2f7fd' : '#212121',
        })
      }
    }

    /* 监听主题改变 */
    const onThemeChange = () => {
      if (uni.onThemeChange) {
        uni.onThemeChange((res) => {
          const theme = res.theme || 'light'
          setTheme(theme)
        })
      } else if (window.matchMedia) {
        // H5 平台
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        console.log('isDarkMode', isDarkMode)
        setTheme(isDarkMode ? 'dark' : 'light') // 默认
        window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
          setTheme(e.matches ? 'dark' : 'light') // 默认
        })
      } else {
        console.log('当前平台不支持主题监听')
        setTheme('light') // 默认
      }
    }

    const locale = ref(uni.getLocale() || 'zh-Hans')

    const setLocale = (val: string) => {
      locale.value = val
      uni.setLocale(val)

      const { currentPageRoute, isTabBarPage, getTabBarList } = useRoute()

      if (currentPageRoute) {
        const pathArr = currentPageRoute.split('/')
        const name = pathArr[pathArr.length - 2]
        uni.setNavigationBarTitle({
          title: t(`pages.${name}.title`),
        })
      }
    }
    const getLocale = () => {
      return uni.getLocale()
    }

    watch(
      () => locale.value,
      (val) => {
        if (val) {
          setLocale(val)
          console.log('当前系统语言', val)
        }
      },
      {
        immediate: true,
      },
    )

    return {
      theme,
      autoTheme,
      setTheme,
      onThemeChange,

      locale,
      setLocale,
      getLocale,
    }
  },
  {
    persist: true,
  },
)
