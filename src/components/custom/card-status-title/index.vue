<script lang="ts" setup>
type Props = {
  title?: string;
  statusText?: string;
  statusColor?: string;
};

defineProps<Props>();
</script>

<template>
  <view class="flex justify-between items-center">
    <view class="flex items-center gap-20rpx" :style="{ color: statusColor }">
      <view class="i-carbon:circle-filled font-size-24rpx" />
      <wd-text v-if="title" :text="title" size="28rpx" />
      <slot v-else name="title"></slot>
    </view>
    <wd-tag custom-class="space" :bg-color="statusColor">
      {{ statusText }}
    </wd-tag>
  </view>
</template>

<style scoped></style>
