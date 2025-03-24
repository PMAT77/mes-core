<route lang="json5" type="page">
{
  layout: "default",
  style: {
    navigationBarTitleText: "生产报工",
  },
}
</route>

<template>
  <PageContainer
    class="home flex flex-col"
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

      <wd-card v-for="(item, index) in dataList" :key="index">
        <template #title>
          <view class="flex justify-between items-center">
            <view class="flex items-center gap-20rpx text-red">
              <view class="i-carbon:circle-filled font-size-24rpx" />
              <wd-text :text="item.workNum" size="28rpx" />
            </view>
            <wd-tag custom-class="space" type="success">进行中</wd-tag>
          </view>
        </template>

        <view class="flex flex-col gap-20rpx !pb-30rpx font-size-24rpx">
          <view class="flex items-center">
            <mb-text :text="item.materialName" type="primary" />
            <wd-divider vertical />
            <mb-text :text="item.materialCode" type="primary" />
            <wd-divider vertical />
            <mb-text :text="item.specification" type="primary" />
          </view>
          <mb-text prefix="生产工单号：" :text="item.prodOrderNum" />
          <mb-text prefix="作业日期：" :text="item.workDate" />
          <mb-text prefix="所在车间：" :text="item.workshopName" />
          <wd-text
            prefix="计划数量："
            :text="`${item.plannedQuantity} ${item.unitName}`"
          />
          <mb-text prefix="创建时间：" :text="item.createTime" />
        </view>
      </wd-card>
    </z-paging>
  </PageContainer>
</template>

<script lang="ts" setup>
import { t } from "@/locale/index";
import { httpGet } from "@/utils/http";
import { useDebounceFn } from "@vueuse/core";

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
  const { data: orderData, run: getProductionOrder } = useRequest<any>(() =>
    httpGet<any>("/dev/production/mesDispatchList/list", {
      workNum: `*${searchValue.value}*`,
      pageNo,
      pageSize,
    }),
  );

  getProductionOrder()
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
