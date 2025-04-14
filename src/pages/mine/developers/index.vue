<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '开发者设置',
  },
}
</route>

<template>
  <PageContainer min-height="100vh" :statusBar="true" :tabbar="false" :padding="false">
    <view class="mt-15px mb-15px">
      <wd-cell-group>
        <wd-cell
          :title="t('pages.mine_developers.isMock')"
          :label="t('pages.mine_developers.mockDataLabel')"
        >
          <wd-switch v-model="appStore.mockEnabled" active-color="#57bd6a" size="24px" />
        </wd-cell>
      </wd-cell-group>
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
