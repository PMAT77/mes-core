<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '登录',
  },
}
</route>

<template>
  <view class="flex justify-center bg-#f2f7fd">
    <view class="max-w-500px flex flex-col justify-center m-auto pl-80rpx pr-80rpx h-100vh">
      <header class="mb-80rpx">
        <view class="font-size-38rpx text-#333333">
          欢迎
          <!-- Welcome to -->
        </view>
        <view class="font-size-48rpx font-bold mt-10rpx mb-10rpx">
          <text class="font-bold text-#1a2d7d">立昱MES</text>
          <text class="font-bold text-#337667">Core</text>
        </view>
        <view class="font-size-26rpx text-#333333 w-80%">
          高效、优雅企业MES移动端平台...
          <!-- An efficient and elegant enterprise MES mobile terminal... -->
        </view>
      </header>

      <main>
        <wd-input
          v-model="model.username"
          custom-class="h-86rpx pl-20rpx pr-20rpx box-border rounded-lg mb-40rpx"
          custom-input-class="!h-86rpx"
          clear-trigger="focus"
          placeholder="输入用户名"
          no-border
          clearable
        />

        <wd-input
          v-model="model.password"
          custom-class="h-86rpx pl-20rpx pr-20rpx box-border rounded-lg mb-40rpx"
          custom-input-class="!h-86rpx"
          clear-trigger="focus"
          placeholder="输入密码"
          show-password
          no-border
          clearable
          :maxlength="16"
        />

        <wd-button
          custom-class="!h-86rpx !rounded-lg"
          block
          :round="false"
          :loading="loading"
          @click="handleSubmit"
        >
          登录
        </wd-button>

        <wd-checkbox
          v-model="model.agreed"
          shape="square"
          custom-label-class="flex items-center"
          class="mt-20rpx"
          :class="{ 'animation-shake': isShake }"
        >
          <wd-text text="已阅读并同意"></wd-text>
          <wd-button type="text">《服务条款》</wd-button>
          <wd-text text="和"></wd-text>
          <wd-button type="text">《隐私协议》</wd-button>
        </wd-checkbox>

        <wd-gap height="20px" />
        <view class="font-size-14px color-#999">调试信息:</view>
        <view class="font-size-12px color-#999">系统环境: {{ system }}</view>
        <view class="font-size-12px color-#999">
          屏幕宽高: {{ screenWidth }}px × {{ screenHeight }}px
        </view>
      </main>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { LoginData, LoginParams } from '@/service/app/user'
import { useAuthStore } from '@/store/auth'
import { useMenuStore } from '@/store/menu'
import { useUserStore } from '@/store/user'
import { httpPost } from '@/utils/http'
import { useToast } from 'wot-design-uni'

defineOptions({
  name: 'Login',
})

// 获取屏幕宽度 > 960
const { system, screenWidth, screenHeight } = uni.getSystemInfoSync()

const authStore = useAuthStore()
const userStore = useUserStore()
const menuStore = useMenuStore()
const toast = useToast()

const model = ref<LoginParams>({
  username: 'admin',
  password: '123456',
  agreed: false,
})

const isShake = ref(false) // 是否强调动画

/** 检查是否同意服务条款 */
function isCheckArgeed() {
  if (!model.value.agreed) {
    isShake.value = true
    const t = setTimeout(() => {
      isShake.value = false
      clearTimeout(t)
    }, 400)
    return false
  }
  return true
}

const {
  loading,
  data,
  run: fetchLogin,
} = useRequest<LoginData>(() => httpPost('/system/login', model.value))

async function handleSubmit() {
  console.log('登录表单值', model.value)
  if (!isCheckArgeed()) return

  await fetchLogin()
  console.log('登录结果', data.value)
  if (!data.value) {
    console.log('登录失败')
    toast.show('登录失败, 请联系管理员处理')
  }
  authStore.setToken(data.value.token)
  // authStore.setDicts(data.value.sysAllDictItems)
  // userStore.setUserInfo(data.value.userInfo)

  // const { success, result } = await fetchPermission()
  // console.log('权限信息', result)
  // if (!success) {
  //   toast.show('获取权限信息失败, 请联系管理员处理')
  //   return
  // }
  // authStore.setPermissions(result.codeList)
  // const mobileMenu = result.menu.find((item: any) => item.name === 'mobile')?.children || []
  // menuStore.setMenus(mobileMenu)

  // 判断设备大小, 是否跳转看板页面
  if (screenWidth > 960) {
    uni.navigateTo({ url: '/pages/dashboard/product/index' })
  } else {
    uni.switchTab({ url: '/pages/index/index' })
  }
}
</script>

<style lang="scss">
.login-form {
  background-color: #fff;
  border-radius: 40px;
}

.input-wrapper {
  padding: 12px;
  font-size: 48px;

  .label {
    margin-bottom: 30px;
    font-size: 64px;
  }

  .input {
    padding: 24px 0;
    border-bottom: 1px solid #eee;
  }
}

.animation-shake {
  animation: shake 0.1s 3;
}

@keyframes shake {
  0% {
    transform: translateX(-4rpx);
  }
  100% {
    transform: translateX(4rpx);
  }
}
</style>
