<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '通用设置',
  },
}
</route>

<template>
  <PageContainer min-height="100vh" :padding="false">
    <view class="mt-15px mb-15px">
      <wd-cell-group>
        <wd-cell :title="t('pages.settings.automatic')" :label="t('pages.settings.automaticLabel')">
          <wd-switch v-model="appStore.autoTheme" active-color="#57bd6a" size="24px" disabled />
        </wd-cell>
      </wd-cell-group>
    </view>

    <view v-if="!appStore.autoTheme" class="mt-15px mb-15px">
      <view class="px-2 font-size-24rpx pt-10px pb-10px pl-15px pr-15px text-color-3">
        {{ t('pages.settings.manualSelection') }}
      </view>
      <wd-radio-group v-model="appStore.theme" cell>
        <wd-radio value="light">{{ t('pages.settings.normalMode') }}</wd-radio>
        <wd-radio value="dark">{{ t('pages.settings.darkMode') }}</wd-radio>
      </wd-radio-group>
    </view>

    <view class="mt-15px mb-15px">
      <view class="px-2 font-size-24rpx pt-10px pb-10px pl-15px pr-15px text-color-3">
        {{ t('pages.settings.language') }}
      </view>
      <wd-radio-group v-model="appStore.locale" cell>
        <wd-radio value="zh-Hans">简体中文</wd-radio>
        <wd-radio value="en">English</wd-radio>
      </wd-radio-group>
    </view>
  </PageContainer>
</template>

<script lang="ts" setup>
import { t } from '@/locale'
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
//
</style>
