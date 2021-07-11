import axios from 'axios'

axios.defaults.baseURL = 'https://api.kodilan.com'

const postPerCount = 30

export default {
  setActivePeriod({mutations}, period) {
    mutations.setActivePeriod(period)
  },
  async fetchRecentPosts({state, mutations}, currentPage = 1) {
    try {
      const res = await axios.get(`/posts?get=${postPerCount}&period=${state.activePeriod}&page=${currentPage}`)

      mutations.setRecentPosts(res.data)
      mutations.setCurrentPageIndex(res.data.current_page)
      mutations.setLastPageIndex(res.data.last_page)
    } catch (e) {
      throw e
    }
  },
  async fetchAllPosts({mutations}, currentPage = 1) {
    try {
      const res = await axios.get(`/posts?get=${postPerCount}&page=${currentPage}`)

      mutations.setAllPosts(res.data)
      mutations.setCurrentPageIndex(res.data.current_page)
      mutations.setLastPageIndex(res.data.last_page)
    } catch (e) {
      throw e
    }
  }
}
