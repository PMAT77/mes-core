import pagesJson from '@/pages.json'

export default function useRoute() {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const currentPageRoute = currentPage?.route

  const currentPageStyle = pagesJson.pages.find((page) => page.path === currentPageRoute)?.style

  /* 获取 TabBar 列表 */
  function getTabBarList() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    return pagesJson.tabBar.list
  }

  /* 判断是否是 TabBar 页面 */
  function isTabBarPage() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const currentPath = currentPage?.route // 获取当前页面路径

    // 检查当前页面路径是否在 tabBar 的 list 中
    if (pagesJson.tabBar && pagesJson.tabBar.list) {
      return pagesJson.tabBar.list.some((item) => item.pagePath === currentPath)
    }
    return false
  }

  return {
    currentPage,
    currentPageRoute,
    currentPageStyle,
    isTabBarPage,
    getTabBarList,
  }
}
