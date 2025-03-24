<template>
  <wd-config-provider :theme="appStore.theme" :themeVars="themeVars">
    <slot />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/index";
import type { ConfigProviderThemeVars } from "wot-design-uni";

const appStore = useAppStore();

const themeVars: ConfigProviderThemeVars = {};

onShow(() => {
  appStore.initLocale();
  appStore.setTheme(appStore.theme);
});

watch(
  () => appStore.theme,
  (val) => {
    appStore.setTheme(val);
  },
  { immediate: true },
);

watch(
  () => appStore.locale,
  (val) => {
    appStore.setLocale(val);
  },
  { immediate: true },
);
</script>
