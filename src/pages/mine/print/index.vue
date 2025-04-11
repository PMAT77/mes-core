<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '蓝牙打印',
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
        v-model="bluetoothStore.device.uuids"
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
import { usePrint } from '@/hooks/usePrint'
import { useBluetoothStore } from '@/store'

const printService = usePrint()
const bluetoothStore = useBluetoothStore()

const deviceColumns = computed(() =>
  bluetoothStore.deviceList.map((item) => ({
    label: item.name,
    value: item.address,
    disabled: item.address === '9527',
  })),
)

function handleDeviceChange({ value }) {
  console.log('改变了')
  bluetoothStore.selectDevice(value)
}

// 打印测试标签
const printTestLabel = async () => {
  if (!bluetoothStore.device.address) {
    uni.showModal({
      title: '提示',
      content: '请先选择已配对的蓝牙打印机, 再进行测试.',
      confirmText: '去设置',
      showCancel: true,
      success: (_) => {
        if (_.confirm) {
          uni.navigateTo({
            url: '/pages/mine/print/index',
          })
        }
      },
    })
    return
  }
  try {
    /* 测试数据 */
    const testData = {
      name: '测试',
    }

    /* CPCL 打印指令 */
    // 设置打印参数
    let text = '! 0 200 200 1000 1\r\n' // 初始化打印机
    text += 'SPEED 0\r\n' // 设置打印速度
    text += 'DENSITY 8\r\n' // 设置打印浓度
    text += 'SETMAG 1 1\r\n' // 设置放大倍数
    // 打印内容
    text += 'CENTER\r\n' // 居中对齐
    text += 'T 0 0 25 0 物料 \r\n'
    text += 'LEFT\r\n' // 左对齐
    text += 'T 0 0 25 50 名称: ' + testData.name + '\r\n'
    // 结束打印
    text += 'FORM\r\n'
    text += 'PRINT\r\n'

    printService.print(bluetoothStore.device.address, text)
  } catch (error) {
    uni.showModal({ title: '打印失败', content: error.message })
  }
}

onShow(() => {
  // #ifdef APP-PLUS
  bluetoothStore.initPrinter()
  // #endif
})
</script>

<style lang="scss" scoped>
:deep(.wot-theme-dark .wd-search) {
  background-color: #1b1b1b !important;
}
</style>
