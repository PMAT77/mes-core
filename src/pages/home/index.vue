<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>

<template>
  <PageContainer class="home" min-height="100vh" :statusBar="false" :tabbar="true">
    <template #header>
      <view
        class="min-h-300rpx !mx--4"
        style="background-image: linear-gradient(140deg, #0c3483 0%, #6b8cce 100%, #a2b6df 10%)"
      ></view>
    </template>

    <view class="text-center">
      <wd-card class="!mx--4 !mb-30rpx !pt-48rpx !pb-12rpx !rounded-0">
        <z-swiper grabCursor :pagination="{ dynamicBullets: true }" :modules="modules">
          <z-swiper-item v-for="(menus, index) in panelList" :key="index">
            <view class="w-full pb-48rpx flex items-center">
              <view
                v-for="menu in menus"
                :key="menu.id"
                class="flex flex-col items-center gap-8rpx w-25%"
              >
                <view class="p-16rpx rounded-2 bg-#d2e7fc">
                  <image
                    mode="scaleToFill"
                    class="h-32px w-32px"
                    :src="`/static/svgs/${menu.meta.icon}.svg`"
                  />
                </view>
                <view class="mt-4rpx font-size-22rpx">{{ menu.meta.i18nKey }}</view>
              </view>
            </view>
          </z-swiper-item>
        </z-swiper>
      </wd-card>
    </view>

    <view>
      <wd-card class="!mx--4 !rounded-0">
        <template #title>
          <view class="flex justify-between items-center">
            <view>生产报工</view>

            <wd-text text="进入看板" type="primary" size="24rpx" />
          </view>
        </template>
      </wd-card>
    </view>
  </PageContainer>
</template>

<script lang="ts" setup>
import { Pagination } from '@zebra-ui/swiper/modules'

defineOptions({
  name: 'Home',
})

const modules = ref([Pagination])

const panelList = ref([
  [
    { id: 0, meta: { i18nKey: '生产报工', icon: 'menuProductReport' } },
    { id: 1, meta: { i18nKey: '生产报工', icon: 'menuProductReport' } },
    { id: 2, meta: { i18nKey: '生产报工', icon: 'menuProductReport' } },
    { id: 3, meta: { i18nKey: '生产报工', icon: 'menuProductReport' } },
  ],
  [
    { id: 0, meta: { i18nKey: '生产报工', icon: 'menuProductReport' } },
    { id: 1, meta: { i18nKey: '生产报工', icon: 'menuProductReport' } },
    { id: 2, meta: { i18nKey: '生产报工', icon: 'menuProductReport' } },
    { id: 3, meta: { i18nKey: '生产报工', icon: 'menuProductReport' } },
  ],
])

const date = ref(Date.now())
</script>

<style lang="scss">
.swiper-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 160px;
  user-select: none;
}
</style>
