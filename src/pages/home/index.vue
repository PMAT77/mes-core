<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>

<template>
  <PageContainer
    class="home flex flex-col"
    min-height="100vh"
    :padding="false"
    :statusBar="false"
    :tabbar="true"
  >
    <template #header>
      <view
        ref="headerRef"
        class="header flex items-end min-h-300rpx !mx--4"
        style="background-image: linear-gradient(140deg, #0c3483 0%, #6b8cce 100%, #a2b6df 10%)"
      >
        <view class="flex w-full justify-between items-center box-border px-68rpx pb-30rpx">
          <view class="flex flex-col gap-20rpx flex-grow-1 justify-end h-80px color-#fff">
            <view class="flex items-center w-full font-size-38rpx">
              {{ dayjs(new Date()).format('YYYY-MM-DD') }}
            </view>
            <view class="font-size-28rpx">Hello！{{ userStore.userInfo.realname }}，你好！</view>
          </view>

          <image src="/static/svgs/factory.svg" mode="scaleToFill" class="h-80px w-80px" />
        </view>
      </view>
    </template>

    <view ref="menuRef" class="menus text-center">
      <wd-card class="!m-0 !pt-48rpx !pb-12rpx !rounded-0">
        <z-swiper grabCursor :pagination="{ dynamicBullets: true }" :modules="modules">
          <z-swiper-item v-for="(menus, index) in menusList" :key="index">
            <view v-if="!loading" class="w-full pb-24rpx flex flex-wrap items-center">
              <view
                v-for="(menu, i) in menus"
                :key="menu.id"
                class="flex flex-col items-center mb-24rpx gap-8rpx w-25%"
                @click="onToPage(menu.path)"
              >
                <view class="p-16rpx rounded-2 bg-#d2e7fc">
                  <image
                    mode="scaleToFill"
                    class="h-32px w-32px"
                    :src="`/static/svgs/${getIcon(index, i)}.svg`"
                  />
                  <!-- <view class="h-32px w-32px text-amber i-carbon:accessibility-alt"></view> -->
                </view>
                <view class="mt-4rpx font-size-22rpx">{{ menu.meta.title }}</view>
              </view>
            </view>

            <view v-if="loading" class="w-full pb-24rpx flex flex-wrap justify-center items-center">
              <wd-skeleton
                class="w-90% mb-68rpx"
                animation="flashed"
                :row-col="skeletonGrid"
                :loading="loading"
              />
            </view>
          </z-swiper-item>
        </z-swiper>
      </wd-card>
    </view>

    <view class="flex-grow-1">
      <z-paging
        ref="paging"
        v-model="dataList"
        safe-area-inset-bottom
        back-to-top-bottom="0rpx"
        :auto-show-back-to-top="true"
        :height="pagingHeight"
        :fixed="false"
        :auto="true"
        :concat="true"
        :loading-more-title-custom-style="{
          'font-size': '26rpx',
        }"
        @query="queryList"
      >
        <view
          class="block-title flex justify-between items-center mt-20rpx"
          @click="onToPage('/production-report/index')"
        >
          <wd-text text="派工列表" size="28rpx" class="text-color-3" />
          <view class="i-carbon:chevron-right" />
        </view>

        <wd-card v-for="(item, index) in dataList" :key="index">
          <template #title>
            <card-status-title :title="item.workNum" status-text="进行中" status-color="#498b45" />
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
            <wd-text prefix="计划数量：" :text="`${item.plannedQuantity} ${item.unitName}`" />
            <mb-text prefix="创建时间：" :text="item.createTime" />
          </view>
        </wd-card>
      </z-paging>
    </view>
  </PageContainer>
</template>

<script lang="ts" setup>
import type { PermissionData } from '@/service/app'
import { useMenuStore, useUserStore } from '@/store'
import useZPaging from '@/uni_modules/z-paging/components/z-paging/js/hooks/useZPaging'
import { Pagination } from '@/uni_modules/zebra-swiper/modules'
import { httpGet } from '@/utils/http'
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import dayjs from 'dayjs'

defineOptions({
  name: 'Home',
})

const userStore = useUserStore()
const menuStore = useMenuStore()

const headerRef = ref<ComponentPublicInstance | null>(null)
const headerHeight = ref(0)

const menuRef = ref<ComponentPublicInstance | null>(null)
const menuHeight = ref(0)

// ZSwiper 轮播配置
const modules = ref([Pagination])

// ZPaging
const paging = ref(null)

/* ！！！请勿删除以下条件判断内的注释 */
// #ifdef APP-PLUS
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const pagingHeight = computed(() => `calc(100vh - ${headerHeight.value + menuHeight.value}px)`)
// #endif

// #ifndef APP-PLUS
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-redeclare
const pagingHeight = computed(() => `calc(100vh - ${headerHeight.value + menuHeight.value + 50}px)`)
// #endif
/* ！！！ */

useZPaging(paging)

// 首页菜单列表
const menusList = ref([])

const iconsList = [
  ['menuProductReport', 'menuProductReceive', 'menuDevice', 'menuMaintenance'],
  ['menuRepair', 'menuAbnormalCall'],
]

// 骨架屏配置
const skeletonGrid = ref([
  [
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
  ],
])

// 首页列表数据
const dataList = ref([])

/* 获取菜单图标 */
function getIcon(index: number, i: number) {
  return iconsList[index][i]
}

/* 用户菜单、权限请求 */
const {
  loading,
  data,
  run: getUserPermission,
} = useRequest<PermissionData>(() => httpGet('/dev/sys/permission/getUserPermissionByToken'))

const { data: orderData, run: getProductionOrder } = useRequest<any>(() =>
  httpGet('/dev/production/mesDispatchList/list'),
)

/**
 * @method 工单列表-加载更多
 */
const queryList = (pageNo, pageSize) => {
  getProductionOrder()
    .then((res) => {
      console.log(res)
      paging.value.complete(orderData.value.records)
    })
    .catch((err) => {
      console.log('工单列表加载错误', err)
      paging.value.complete(false)
    })
}

/**
 * @method 获取菜单列表
 */
async function getMenus() {
  await getUserPermission()
  console.log('Permission', data.value) // 打印接口数据
  const mobileMenu = data.value.menu?.find((item: any) => item.name === 'mobile')?.children || []
  menuStore.setMenus(mobileMenu)
  console.log('Menus', menuStore.menus) // 打印菜单数据

  const chunkSize = 4 // 轮播菜单分块大小
  const chunkedMenus = Array.from(
    { length: Math.ceil(menuStore.menus.length / chunkSize) },
    (_, index) => menuStore.menus.slice(index * chunkSize, (index + 1) * chunkSize),
  )

  menusList.value = chunkedMenus
}

function onToPage(path: string) {
  console.log('onToPage', path)
  uni.navigateTo({
    url: `/pages${path}`,
  })
}

onShow(async () => {
  await getMenus()

  const query = uni.createSelectorQuery().in(this)
  nextTick(() => {
    query
      .select('.header') // 替换为实际的类名或选择器
      .boundingClientRect((rect: any) => {
        if (rect) {
          headerHeight.value = rect.height
          console.log('headerHeight', headerHeight.value)
        }
      })
      .exec()

    query
      .select('.menus') // 替换为实际的类名或选择器
      .boundingClientRect((rect: any) => {
        if (rect) {
          menuHeight.value = rect.height
          console.log('menuHeight', menuHeight.value)
        }
      })
      .exec()
  })
})

onPageScroll(() => {})
onReachBottom(() => {})
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
