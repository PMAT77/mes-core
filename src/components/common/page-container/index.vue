<template>
  <view
    class="container overflow-hidden pt-2 px-4"
    :class="[`bg-${bgColor}`]"
    :style="[
      `marginTop: ${safeAreaInsets?.top} + 'px'`,
      `minHeight: calc(${minHeight} - 50px - ${statusBar ? statusBarHeight + 44 : 0}px)`,
    ]"
  >
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets, statusBarHeight } = uni.getSystemInfoSync()

console.log(statusBarHeight)

type Props = {
  statusBar?: boolean
  bgColor?: string
  minHeight?: string
}
withDefaults(defineProps<Props>(), {
  statusBar: true,
})
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
}

.wot-theme-dark .container {
  color: #f5f5f5;
  background-color: #111111;
}
</style>
