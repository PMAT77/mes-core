<route lang="json5" type="page">
{
  layout: "default",
  style: {
    navigationBarTitleText: "设备管理",
    navigationStyle: "custom",
  },
}
</route>

<template>
  <PageContainer
    class="flex flex-col"
    min-height="100vh"
    :padding="false"
    :statusBar="true"
    :tabbar="false"
  >
    <z-paging
      ref="paging"
      v-model="dataList"
      safe-area-inset-bottom
      back-to-top-bottom="40rpx"
      height="calc(100vh - 44px)"
      :fixed="false"
      :auto-show-back-to-top="true"
      :auto="true"
      :concat="true"
      :loading-more-title-custom-style="{
        'font-size': '26rpx',
      }"
      @query="queryList"
    >
      <template #top>
        <view class="pb-24rpx">
          <wd-input
            class="px-24rpx pa-12rpx"
            v-model="searchValue"
            clearable
            :placeholder="t('common.inputOrScan')"
            @input="debouncedFn"
            @clear="debouncedFn"
          >
            <template #suffix>
              <view
                class="i-carbon:scan-alt w-20px h-20px ml-14rpx"
                @click="onScan"
              />
            </template>
          </wd-input>
        </view>
      </template>

      <wd-card
        v-for="(item, index) in dataList"
        :key="index"
        @click="onToDetails(item.id)"
      >
        <template #title>
          <card-status-title
            :status-text="item.status_dictText"
            :status-color="deviceColor(item.status)"
          >
            <template #title>
              <view class="flex items-end gap-14rpx">
                <wd-text :text="item.equipmentName" size="28rpx" />
                <view class="font-size-24rpx text-color-4">{{
                  item.equipmentCode
                }}</view>
              </view>
            </template>
          </card-status-title>
          <!-- <view class="flex justify-between items-center">
            <view class="flex items-center gap-20rpx">
              <view
                class="i-carbon:circle-filled font-size-24rpx"
                :style="`color: ${deviceColor(item.status)}`"
              />
              <view class="flex items-end gap-14rpx">
                <wd-text :text="item.equipmentName" size="28rpx" />
                <view class="font-size-24rpx text-color-4">{{ item.equipmentCode }}</view>
              </view>
            </view>
            <wd-tag plain :bg-color="deviceColor(item.status)" :color="deviceColor(item.status)">
              {{ item.status_dictText }}
            </wd-tag>
          </view> -->
        </template>

        <view class="flex flex-col gap-20rpx !pb-30rpx font-size-24rpx">
          <view class="flex items-center">
            <mb-text :text="item.eqpTypeName" type="primary" />
            <wd-divider vertical />
            <mb-text :text="item.eqpTypeCode" type="primary" />
            <wd-divider vertical />
            <mb-text :text="item.model" type="primary" />
          </view>
          <mb-text prefix="所在车间：" :text="item.workshopName" />
          <mb-text prefix="设备采集序号：" :text="item.serialNumber" />
        </view>
      </wd-card>
    </z-paging>
  </PageContainer>
</template>

<script lang="ts" setup>
import { t } from "@/locale/index";
import { useAuthStore } from "@/store";
import { httpGet } from "@/utils/http";
import { useDebounceFn } from "@vueuse/core";

const { dicts } = useAuthStore();
const deviceColor = (value: string) => {
  return (
    dicts.equipment_operator_result?.find((item) => item.value === value)
      ?.color || "#ffffff"
  );
};

// ZPaging
const paging = ref(null);

// 首页列表数据
const dataList = ref([]);

// 搜索框内容
const searchValue = ref("");

/**
 * @method 请求分页数据
 */
function queryList(pageNo, pageSize) {
  console.log(pageNo, pageSize);
  const { data: orderData, run: getDeviceList } = useRequest<any>(() =>
    httpGet<any>("/dev/equipment/mesEquipment/list", {
      equipmentCode: `*${searchValue.value}*`,
      pageNo,
      pageSize,
    }),
  );

  getDeviceList()
    .then(() => {
      paging.value.complete(orderData.value.records);
    })
    .catch((err) => {
      console.log("工单列表加载错误", err);
      paging.value.complete(false);
    });
}

// 搜索防抖
const debouncedFn = useDebounceFn(() => paging.value.reload(), 300);

/**
 * @method 调用相机扫码
 */
function onScan() {
  uni.scanCode({
    success: (res) => {
      console.log(res.result);
      searchValue.value = res.result;
      paging.value.reload();
    },
  });
}

/**
 * @method 前往设备详情
 */
function onToDetails(id: string) {
  uni.navigateTo({
    url: `/pages/device/details/index?id=${id}`,
  });
}
</script>

<style lang="scss" scoped>
:deep(.custom-button) {
  box-sizing: border-box;
  width: 32px !important;
  min-width: auto !important;
  height: 32px !important;
  margin: 8rpx;
  border-radius: 16px !important;
}
</style>
