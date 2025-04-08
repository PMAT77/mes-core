import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
    },
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#4e80ee',
    backgroundColor: '#f2f7fd',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/homeHL.png',
        pagePath: 'pages/home/index',
      },
      {
        iconPath: 'static/tabbar/charts.png',
        selectedIconPath: 'static/tabbar/chartsHL.png',
        pagePath: 'pages/charts/index',
      },
      {
        iconPath: 'static/tabbar/mine.png',
        selectedIconPath: 'static/tabbar/mineHL.png',
        pagePath: 'pages/mine/index',
      },
    ],
  },
})
