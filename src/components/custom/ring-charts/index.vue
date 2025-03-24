<template>
  <view class="charts-box">
    <qiun-data-charts
      ref="ringChart"
      type="ring"
      :echartsApp="false"
      :canvas2d="true"
      :optsWatch="true"
      :opts="options"
      :chartData="chartData"
    />
  </view>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";

const appStore = useAppStore();

type Props = {
  opts?: any;
  chartData: any;
};
const props = defineProps<Props>();

const options = computed(() => ({
  rotate: false,
  rotateLock: false,
  animation: true,
  padding: [10, 10, 10, 10],
  dataLabel: false,
  enableScroll: false,
  legend: {
    show: true,
    position: "right",
    fontSize: 15,
    lineHeight: 25,
  },
  title: {
    name: "总计划量",
    fontSize: 16,
    color: "#666666",
  },
  subtitle: {
    name: "10000",
    fontSize: 28,
    color: "#7cb5ec",
  },
  extra: {
    ring: {
      ringWidth: 60,
      activeOpacity: 0.5,
      activeRadius: 10,
      offsetAngle: 0,
      labelWidth: 15,
      border: true,
      borderWidth: 3,
      borderColor: appStore.theme === "light" ? "#ffffff" : "#1b1b1b",
      centerColor: appStore.theme === "light" ? "#ffffff" : "#1b1b1b",
    },
  },
  ...props.opts,
}));

const ringChart = ref();

watch(
  () => options.value,
  (val) => {
    nextTick(() => {
      console.log("Change", ringChart.value);
      // ringChart.value.refresh()
    });
  },
  { deep: true },
);
</script>

<style>
.charts-box {
  width: 100%;
  height: 300px;
}
</style>
