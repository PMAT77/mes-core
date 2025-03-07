<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的',
  },
}
</route>

<template>
  <PageContainer min-height="100vh" :statusBar="false" :tabbar="true">
    <view class="mt-12rpx">
      <view class="text-color-1 font-size-42rpx font-600">个人中心</view>

      <view class="flex items-center mt-60rpx mb-30rpx">
        <wd-img
          :width="70"
          :height="70"
          :enable-preview="true"
          round
          src="https://cdn.jsdelivr.net/gh/PMAT77/PMAT77CDN@latest/images/avatar.jpeg"
        />
        <view class="flex flex-col gap-10rpx ml-24rpx">
          <view class="text-color-2 font-size-36rpx">泡面艺术家</view>
          <view class="text-color-3 font-size-26rpx">工号：9527</view>
        </view>
      </view>

      <view class="flex justify-between p-24rpx">
        <view v-for="(item, index) in data" :key="index" class="w-25%">
          <view class="flex flex-col justify-center items-center">
            <wd-count-to
              ref="countToRefs"
              custom-class="font-600"
              type="default"
              :duration="2000"
              :fontSize="18"
              :end-val="item.value"
            />
            <view class="text-color-3 font-size-20rpx">{{ item.label }}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="mt-30rpx">
      <wd-card custom-class="!m-0 !mb-30rpx !pb-24rpx" custom-footer-class="!p-0" title="更多功能">
        <wd-cell
          title="通用设置"
          custom-class="!pl-20rpx"
          custom-title-class="!pl-10rpx"
          icon="setting"
          is-link
          to="/pages/mine/settings/index"
        />
      </wd-card>
    </view>

    <view class="flex justify-center items-center mt-60rpx">
      <wd-button class="w-90% !rounded-16rpx" type="error" @click="handleLogout">
        退出登录
      </wd-button>
    </view>
  </PageContainer>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store/auth'
import { useMessage } from 'wot-design-uni'

const authStore = useAuthStore()
const message = useMessage()

const countToRefs = ref()

const data = ref([
  { label: '日报工数', value: 50 },
  { label: '周报工数', value: 200 },
  { label: '月报工数', value: 1392 },
  { label: '年报工数', value: 7798 },
])

function handleLogout() {
  message
    .confirm({
      msg: '确定要退出登录嘛？',
    })
    .then(() => {
      authStore.logout()
      uni.navigateTo({ url: '/pages/login/index' })
      console.log('点击了确定按钮')
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })
}

onShow(() => {
  console.log(countToRefs.value)
  nextTick(() => {
    countToRefs.value.forEach((item) => {
      item.reset()
    })
  })
})
</script>

<style lang="scss" scoped>
//
</style>
