<template>
  <wd-config-provider :theme="appStore.theme" :themeVars="themeVars">
    <slot />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/index'
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const appStore = useAppStore()

// 初始化主题
appStore.initTheme()
// 监听主题变化
appStore.onThemeChange()
appStore.setTheme('dark')

const themeVars: ConfigProviderThemeVars = {}
</script>
