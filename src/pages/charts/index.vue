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
      <view class="mt-4 mb-30rpx text-color-1 font-size-42rpx font-600">
        {{ t('pages.charts.title') }}
      </view>

      <wd-card class="!m-0">
        <RingCharts :chart-data="data" />
      </wd-card>
    </view>
  </PageContainer>
</template>

<script lang="ts" setup>
import { t } from '@/locale'

const data = ref<any>()
const getServerData = () => {
  // 模拟从服务器获取数据时的延时
  setTimeout(() => {
    // 模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    const res = {
      series: [
        {
          data: [
            { name: '一班', value: 50, labelShow: false },
            { name: '二班', value: 30, labelShow: false },
            { name: '三班', value: 20, labelShow: false },
            { name: '四班', value: 18 },
            { name: '五班', value: 8, labelShow: false },
          ],
        },
      ],
    }
    data.value = JSON.parse(JSON.stringify(res))
  }, 500)
}

onShow(async () => {
  await getServerData()
})
</script>

<style lang="scss" scoped>
//
</style>
