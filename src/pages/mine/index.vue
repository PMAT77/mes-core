<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '个人中心',
  },
}
</route>

<template>
  <PageContainer min-height="100vh" :statusBar="false" :tabbar="true">
    <view class="flex flex-col">
      <view class="mt-4 mb-30rpx text-color-1 font-size-42rpx font-600">
        {{ t('pages.mine.title') }}
      </view>

      <view class="flex items-center mt-30rpx mb-30rpx">
        <wd-img
          :width="70"
          :height="70"
          :enable-preview="true"
          round
          src="https://cdn.jsdelivr.net/gh/PMAT77/PMAT77CDN@latest/images/avatar.jpeg"
        />
        <view class="flex flex-col gap-10rpx ml-24rpx">
          <view class="text-color-2 font-size-36rpx">{{ userStore.userInfo.realname }}</view>
          <view class="text-color-3 font-size-26rpx">
            {{ t('pages.mine.workNo') }}：{{ userStore.userInfo.workNo }}
          </view>
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
            <view class="text-color-3 font-size-20rpx text-center">{{ item.label }}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="mt-30rpx">
      <wd-card
        custom-class="!m-0 !mb-30rpx !pb-24rpx"
        custom-footer-class="!p-0"
        :title="t('pages.mine.more')"
      >
        <wd-cell
          v-for="(item, index) in cellList"
          custom-class="!pl-20rpx"
          custom-title-class="!pl-10rpx"
          is-link
          :to="item.to"
          :key="index"
          :title="item.title"
        >
          <template #icon>
            <view class="m-auto" :class="item.icon"></view>
          </template>
        </wd-cell>
      </wd-card>
    </view>

    <view class="flex justify-center items-center mt-60rpx">
      <wd-button class="w-90% !rounded-16rpx" type="error" @click="handleLogout">
        {{ t('pages.mine.logout') }}
      </wd-button>
    </view>
  </PageContainer>
</template>

<script lang="ts" setup>
import { t } from '@/locale'
import { useAuthStore, useUserStore } from '@/store'
import { useMessage } from 'wot-design-uni'

const userStore = useUserStore()
const authStore = useAuthStore()
const message = useMessage()

const countToRefs = ref()

const data = computed(() => [
  { label: t('pages.mine.report.day'), value: 50 },
  { label: t('pages.mine.report.week'), value: 200 },
  { label: t('pages.mine.report.month'), value: 1392 },
  { label: t('pages.mine.report.year'), value: 7798 },
])

const cellList = computed(() => [
  {
    title: t('pages.mine_settings.title'),
    icon: 'i-carbon:settings',
    to: '/pages/mine/settings/index',
  },
  { title: t('pages.mine_print.title'), icon: 'i-carbon:printer', to: '/pages/mine/print/index' },
])

function handleLogout() {
  message
    .confirm({
      msg: t('pages.mine.sureLogout'),
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
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
