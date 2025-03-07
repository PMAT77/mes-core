<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '设置',
  },
}
</route>

<template>
  <PageContainer min-height="100vh" :padding="false">
    <view class="mt-15px mb-15px">
      <wd-cell-group>
        <wd-cell title="系统主题" label="开启后将自动切换主题">
          <wd-switch v-model="appStore.autoTheme" active-color="#57bd6a" size="24px" disabled />
        </wd-cell>
      </wd-cell-group>
    </view>

    <view v-if="!appStore.autoTheme" class="mt-15px mb-15px">
      <view class="px-2 font-size-24rpx pt-10px pb-10px pl-15px pr-15px text-color-3">
        手动选择
      </view>
      <wd-radio-group v-model="appStore.theme" cell>
        <wd-radio value="light">普通模式</wd-radio>
        <wd-radio value="dark">深色模式</wd-radio>
      </wd-radio-group>
    </view>
  </PageContainer>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
//
</style>
