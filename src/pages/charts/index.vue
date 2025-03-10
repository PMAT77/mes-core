<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '看板',
  },
}
</route>

<template>
  <PageContainer min-height="100vh" :statusBar="false" :tabbar="true">
    <view>
      <view class="mb-30rpx text-color-1 font-size-42rpx font-600">
        {{ t('pages.charts.title') }}
      </view>

      <wd-card class="!m-0">
        <MbCharts />
      </wd-card>
    </view>
  </PageContainer>
</template>

<script lang="ts" setup>
import { t } from '@/locale'
</script>

<style lang="scss" scoped>
//
</style>
