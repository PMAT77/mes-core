/* eslint-disable no-param-reassign */
import { useAuthStore, useUserStore } from "@/store";
import { getEnvBaseUrl } from "@/utils";
import { platform } from "@/utils/platform";
import qs from "qs";

export type CustomRequestOptions = UniApp.RequestOptions & {
  query?: Record<string, any>;
  /** 出错时是否隐藏错误提示 */
  hideErrorToast?: boolean;
} & IUniUploadFileOptions; // 添加uni.uploadFile参数类型

// 请求基准地址
const baseUrl = getEnvBaseUrl();

// 可以写一个映射对象，如：
const proxyMap = {
  dev: "http://124.71.138.120:8097/small-mes",
  pro: "http://124.71.138.120:8097/small-mes",
};

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options: CustomRequestOptions) {
    // 接口请求支持通过 query 参数配置 queryString
    if (options.query) {
      const queryStr = qs.stringify(options.query);
      if (options.url.includes("?")) {
        options.url += `&${queryStr}`;
      } else {
        options.url += `?${queryStr}`;
      }
    }

    // 非 http 开头需拼接地址
    Object.keys(proxyMap).forEach((key) => {
      if (options.url.startsWith(`/${key}`)) {
        options.url = proxyMap[key] + options.url.slice(key.length + 1);
      }
    });
    // if (!options.url.startsWith('http')) {
    //   // #ifdef H5
    //   // console.log(__VITE_APP_PROXY__)
    //   if (JSON.parse(__VITE_APP_PROXY__)) {
    //     // 啥都不需要做
    //   } else {
    //     options.url = baseUrl + options.url
    //   }
    //   // #endif
    //   // 非H5正常拼接
    //   // #ifndef H5
    //   options.url = baseUrl + options.url
    //   // #endif
    //   // TIPS: 如果需要对接多个后端服务，也可以在这里处理，拼接成所需要的地址
    // }
    // 1. 请求超时
    options.timeout = 10000; // 10s
    // 2. （可选）添加小程序端请求头标识
    options.header = {
      platform, // 可选，与 uniapp 定义的平台一致，告诉后台来源
      ...options.header,
    };
    // 3. 添加 token 请求头标识
    const authStore = useAuthStore();
    if (authStore.token) {
      options.header.Authorization = `Bearer ${authStore.token}`;
      options.header["X-Access-Token"] = authStore.token;
    }
  },
  success(res) {
    // 拦截成功的请求
    if (res.statusCode === 401) {
      const authStore = useAuthStore();
      const userStore = useUserStore();
      authStore.clearToken();
      userStore.clearUserInfo();
    }
  },
};

export const requestInterceptor = {
  install() {
    // 拦截 request 请求
    uni.addInterceptor("request", httpInterceptor);
    // 拦截 uploadFile 文件上传
    uni.addInterceptor("uploadFile", httpInterceptor);
  },
};
