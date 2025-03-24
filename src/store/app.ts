import useRoute from "@/hooks/useRoute";
import { t } from "@/locale";
import { defineStore } from "pinia";
import { ref } from "vue";
import { ConfigProviderTheme } from "wot-design-uni/components/wd-config-provider/types";

export const useAppStore = defineStore(
  "APP",
  () => {
    // 当前主题
    const theme = ref<ConfigProviderTheme>("dark");
    // 主题跟随系统
    const autoTheme = ref(false);
    // 当前语言
    const locale = ref(uni.getLocale() || "zh-Hans");

    /* 获取当前系统主题 */
    const getTheme = () => {
      return theme.value;
    };
    /* 设置系统主题 */
    const setTheme = (val: ConfigProviderTheme) => {
      theme.value = val;

      const { currentPageStyle, isTabBarPage } = useRoute();

      // 切换导航栏主题
      if (currentPageStyle.navigationStyle !== "custom") {
        uni.setNavigationBarColor({
          frontColor: theme.value === "light" ? "#000000" : "#f2f7fd",
          backgroundColor: theme.value === "light" ? "#f2f7fd" : "#111111",
        });
      }

      // 切换TabBar主题
      if (isTabBarPage()) {
        uni.setTabBarStyle({
          backgroundColor: theme.value === "light" ? "#f2f7fd" : "#212121",
        });
      }
    };
    /* 监听系统主题改变 */
    const onThemeChange = () => {
      if (uni.onThemeChange) {
        uni.onThemeChange((res) => {
          const theme = res.theme || "light";
          setTheme(theme);
        });
      } else if (window.matchMedia) {
        // H5 平台
        const isDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        console.log("isDarkMode", isDarkMode);
        setTheme(isDarkMode ? "dark" : "light"); // 默认
        window.matchMedia("(prefers-color-scheme: dark)").addListener((e) => {
          setTheme(e.matches ? "dark" : "light"); // 默认
        });
      } else {
        console.log("当前平台不支持主题监听");
        setTheme("light"); // 默认
      }
    };

    /* 获取当前语言环境 */
    const getLocale = () => {
      return uni.getLocale();
    };
    /* 切换语言环境 */
    const setLocale = (val: string) => {
      uni.setLocale(val);
      console.log("当前语言环境", getLocale());

      // 切换导航栏标题语言
      const { currentPageRoute } = useRoute();
      if (currentPageRoute) {
        console.log("currentPageRoute", currentPageRoute);
        const pathArr = currentPageRoute?.split("/");
        console.log("pathArr", pathArr);
        let name = "";
        if (pathArr.length && pathArr.length >= 4) {
          pathArr.pop();
          pathArr.shift();
          name = pathArr.join(".");
        } else {
          name = pathArr[pathArr.length - 2];
        }
        uni.setNavigationBarTitle({
          title: t(`pages.${name}.title`),
        });
        console.log("当前导航栏标题", t(`pages.${name}.title`));
      }
    };
    /* 初始化语言环境 */
    const initLocale = () => {
      uni.addInterceptor("navigateTo", {
        success: () => {
          setLocale(locale.value);
        },
      });
    };

    watch(
      () => locale.value,
      (val) => {
        if (val) {
          setLocale(val);
        }
      },
      { immediate: true },
    );

    return {
      theme,
      autoTheme,
      getTheme,
      setTheme,
      onThemeChange,

      locale,
      getLocale,
      setLocale,
      initLocale,
    };
  },
  {
    persist: true,
  },
);
