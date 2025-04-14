/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by vite-plugin-uni-pages

interface NavigateToOptions {
  url: "/pages/home/index" |
       "/pages/abnormal-call/index" |
       "/pages/charts/index" |
       "/pages/device/index" |
       "/pages/login/index" |
       "/pages/mine/index" |
       "/pages/production-report/index" |
       "/pages/device/details/index" |
       "/pages/mine/developers/index" |
       "/pages/mine/print/index" |
       "/pages/mine/settings/index";
}
interface RedirectToOptions extends NavigateToOptions {}

interface SwitchTabOptions {
  url: "/pages/home/index" | "/pages/charts/index" | "/pages/mine/index"
}

type ReLaunchOptions = NavigateToOptions | SwitchTabOptions;

declare interface Uni {
  navigateTo(options: UniNamespace.NavigateToOptions & NavigateToOptions): void;
  redirectTo(options: UniNamespace.RedirectToOptions & RedirectToOptions): void;
  switchTab(options: UniNamespace.SwitchTabOptions & SwitchTabOptions): void;
  reLaunch(options: UniNamespace.ReLaunchOptions & ReLaunchOptions): void;
}
