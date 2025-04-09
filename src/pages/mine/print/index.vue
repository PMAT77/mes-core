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
      />

      <view class="flex justify-center pt-24rpx px-24rpx">
        <wd-button class="w-full" :round="false" type="info" @click="printTestLabel">
          测试打印
        </wd-button>
      </view>
    </view>
  </PageContainer>
</template>

<script lang="ts" setup>
import { printService } from '@/hooks/usePrint'
import { usePrintStore } from '@/store'

const printStore = usePrintStore()

const deviceColumns = computed(() =>
  printStore.deviceList.map((item) => ({
    label: item.name,
    value: item.address,
    disabled: item.address === '9527',
  })),
)

function handleDeviceChange({ value }) {
  console.log('改变了')
  printStore.selectDevice(value)
}

// 打印测试标签
const printTestLabel = async () => {
  try {
    const config = {
      printerType: '2',
      macAddress: printStore.device.address,
    }
    const testData = {
      /* 测试数据 */
      name: '测试',
    }
    const template = printService.generateLabelTemplate(testData, 'Y')

    if (config.printerType === '2') {
      await printService.print(config.macAddress!, template)
    } else {
      // WiFi打印逻辑
    }
  } catch (error) {
    uni.showModal({ title: '打印失败', content: error.message })
  }
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
