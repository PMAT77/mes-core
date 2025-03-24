<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { onLaunch } from "@dcloudio/uni-app";
import "abortcontroller-polyfill/dist/abortcontroller-polyfill-only";

const authStore = useAuthStore();

/** 检查登录状态 */
function checkUserAuth() {
  if (!authStore.isLoggedIn) {
    // 如果登录标识为空，跳转到登录页面
    console.log("登录标识为空，请登录");
    uni.navigateTo({
      url: "/pages/login/index",
    });
  }
}

onLaunch(() => {
  console.log("App Launch...");

  checkUserAuth();
});
</script>

<style lang="scss"></style>
