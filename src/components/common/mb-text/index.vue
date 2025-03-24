<script lang="ts" setup>
interface Props {
  text: string | number | null;
  prefix?: string | number | null;
  noText?: string;
}
defineProps<Props>();
</script>

<template>
  <wd-text v-if="text" :="$attrs" :text="text" />
  <view v-else class="flex items-center text-color-4">
    <view>{{ prefix }}</view>
    <view>{{ noText || "暂无" }}</view>
  </view>
</template>

<style scoped></style>
