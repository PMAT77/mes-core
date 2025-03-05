<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '我的',
  },
}
</route>

<template>
  <PageContainer bg-color="#111111" min-height="100vh">asdad</PageContainer>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
// import PageContainer from '@/components/common/page-container/index.vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// appStore.setTheme('dark')
</script>

<style lang="scss" scoped>
//
</style>
