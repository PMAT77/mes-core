<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

const authStore = useAuthStore()

function checkUserAuth() {
  if (!authStore.isLoggedIn) {
    // 如果登录标识为空，跳转到登录页面
    console.log('登录标识为空，请登录')
    uni.navigateTo({
      url: '/pages/login/index',
    })
  }
}

onLaunch(() => {
  console.log('App Launch')
  checkUserAuth()

  // uni.setLocale('zh-Hans')
  // uni.setLocale('en')
  console.log(uni.getLocale())
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* stylelint-disable selector-type-no-unknown */
button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 单行省略，优先使用 unocss: text-ellipsis
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 两行省略
.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 三行省略
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
