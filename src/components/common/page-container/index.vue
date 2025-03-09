<template>
  <view
    class="page-container overflow-hidden pt-2"
    :class="[`bg-${bgColor}`, { 'px-4': padding }]"
    :style="[
      `marginTop: ${safeAreaInsets?.top} + 'px'`,
      `minHeight: calc(${minHeight} - ${tabbar ? statusBarHeight + 50 : 0}px - ${statusBar ? statusBarHeight + 44 : 0}px)`,
    ]"
  >
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets, statusBarHeight } = uni.getSystemInfoSync()

type Props = {
  // 是否预留顶部状态栏高度
  statusBar?: boolean
  // 是否预留底部导航栏高度
  tabbar?: boolean
  // 背景色
  bgColor?: string
  // 最小高度
  minHeight?: string
  // 是否开启默认内边距
  padding?: boolean
}
withDefaults(defineProps<Props>(), {
  statusBar: true,
  tabbar: false,
  padding: true,
})
</script>

<style lang="scss" scoped>
.page-container {
  box-sizing: border-box;
  background-color: #f2f7fd;
}

.wot-theme-dark .page-container {
  color: #f5f5f5;
  background-color: #111111;
}
</style>
