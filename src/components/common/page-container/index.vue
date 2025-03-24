<!-- eslint-disable no-unreachable -->
<template>
  <view
    class="page-container overflow-hidden"
    :class="[{ 'px-4': padding }, { 'pt-4': padding }]"
    :style="[
      `padding-top: ${statusBar ? 44 : 0}px`,
      `margin-top: ${safeAreaInsets?.top}px`,
      `min-height: calc(${minHeight} - ${tabbar ? tabbarHeight : 0}px - ${statusBar ? cstatusBarHeight : 0}px)`,
      `background-color: ${bgColor ? bgColor : ''}`,
    ]"
  >
    <wd-navbar
      v-if="statusBar"
      title="标题"
      fixed
      left-arrow
      @click-left="handleClickLeft"
    ></wd-navbar>
    <slot name="header"></slot>
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets, statusBarHeight } = uni.getSystemInfoSync();

const route = getCurrentPages()[0];
console.log(route);

// #ifdef APP-PLUS
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const tabbarHeight = computed(() => {
  return 0;
});
// #endif

// #ifdef APP-PLUS
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const cstatusBarHeight = computed(() => {
  return 0;
});
// #endif

// #ifndef APP-PLUS
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-redeclare
const tabbarHeight = computed(() => {
  return 50;
});
// #endif

// #ifndef APP-PLUS
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-redeclare
const cstatusBarHeight = computed(() => {
  return 44;
});
// #endif

type Props = {
  // 是否预留顶部状态栏高度
  statusBar?: boolean;
  // 是否预留底部导航栏高度
  tabbar?: boolean;
  // 背景色
  bgColor?: string;
  // 最小高度
  minHeight?: string;
  // 是否开启默认内边距
  padding?: boolean;
};

withDefaults(defineProps<Props>(), {
  statusBar: true,
  tabbar: false,
  padding: true,
});

function handleClickLeft() {
  uni.navigateBack();
}
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
