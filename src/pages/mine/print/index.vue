<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '打印设置',
  },
}
</route>

<template>
  <PageContainer min-height="100vh" :statusBar="true" :tabbar="false" :padding="false">
    <view class="mt-15px mb-15px">
      <wd-select-picker
        label="打印设备"
        filterable
        type="radio"
        v-model="printStore.device.uuids"
        :columns="deviceColumns"
        :show-confirm="false"
        @change="handleDeviceChange"
      ></wd-select-picker>
    </view>
  </PageContainer>
</template>

<script lang="ts" setup>
import { usePrintStore } from '@/store'

const printStore = usePrintStore()

const deviceColumns = computed(() =>
  printStore.deviceList.map((item) => ({
    label: item.name,
    value: item.uuids,
    disabled: item.uuids === -1,
  })),
)

function handleDeviceChange({ value }) {
  console.log('改变了')
  printStore.selectDevice(value)
}

onShow(() => {
  // #ifdef APP-PLUS
  printStore.initPrinter()
  // #endif
})
</script>

<style lang="scss" scoped>
:deep(.wot-theme-dark .wd-search) {
  background-color: #1b1b1b !important;
}
</style>
