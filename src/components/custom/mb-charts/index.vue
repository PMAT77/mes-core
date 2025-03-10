<template>
  <view style="width: 750rpx; height: 750rpx">
    <l-echart ref="chartRef" />
  </view>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'

const chartRef = ref(null)

const option = {
  legend: {
    top: 'bottom',
  },
  series: [
    {
      name: '面积模式',
      type: 'pie',
      radius: [15, 375 / 4],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' },
      ],
    },
  ],
}

onMounted(() => {
  // 组件能被调用必须是组件的节点已经被渲染到页面上
  setTimeout(async () => {
    if (!chartRef.value) return
    const myChart = await chartRef.value.init(echarts)
    myChart.setOption(option)
  }, 300)
})
</script>

<style></style>
