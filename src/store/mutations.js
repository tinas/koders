export default {
  setCurrentPageIndex({state}, pageIndex) {
    state.currentPageIndex = pageIndex
  },
  setLastPageIndex({state}, pageIndex) {
    state.lastPageIndex = pageIndex
  },
  setActivePeriod({state}, period) {
    state.activePeriod = period
  },
  setRecentPosts({state}, recentPosts) {
    state.recentPosts = recentPosts
  },
  setAllPosts({state}, allPosts) {
    state.allPosts = allPosts
  }
}
