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
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
      '^z-(.*)': '@zebra-ui/swiper/components/z-$1/z-$1.vue',
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
        iconPath: 'static/tabbar/home.svg',
        selectedIconPath: 'static/tabbar/homeHL.svg',
        pagePath: 'pages/home/index',
      },
      {
        iconPath: 'static/tabbar/charts.svg',
        selectedIconPath: 'static/tabbar/chartsHL.svg',
        pagePath: 'pages/charts/index',
      },
      {
        iconPath: 'static/tabbar/mine.svg',
        selectedIconPath: 'static/tabbar/mineHL.svg',
        pagePath: 'pages/mine/index',
      },
    ],
  },
})
