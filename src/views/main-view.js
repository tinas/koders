import {View, InfiniteScroll} from 'erste'
import {state, actions} from '../store'

import PostList from '../components/post/post-list'
import EmptyPostList from '../components/post/empty-post-list'
import Loader from '../components/loader'
import {megaphone, info, search} from '../components/icons'

import './main-view.css'

const PERIODS = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  ALL_TIME: 'allTime'
}

export default class MainView extends View {
  constructor(vm) {
    super()

    this.vm = vm
    this.activeTab = '.tab-today'
    this.listTitle = 'En son eklenen ilanlar'
    this.posts = []
    this.postListComponent = null

    this.infiniteScroll = new InfiniteScroll()
    this.infiniteScroll.endOfListText = 'Hepsini gördün!'

    this.bindEvents()
  }

  bindEvents() {
    this.infiniteScroll.on(this.infiniteScroll.EventType.SHOULD_LOAD, this.onInfiniteScroll.bind(this))
  }

  onAfterRender() {
    super.onAfterRender()

    actions.setActivePeriod(PERIODS.DAILY)

    this.onLoaded()
  }

  async fetchPosts() {
    const listArea = this.$('.list-area')

    listArea.innerHTML = new Loader()

    if (state.activePeriod == PERIODS.ALL_TIME) {
      await actions.fetchAllPosts()

      this.posts = state.allPosts.data
    } else {
      await actions.fetchRecentPosts()

      this.posts = state.recentPosts.data
    }

    this.postListComponent = new PostList(this.listTitle, this.posts)
    listArea.innerHTML = !this.posts.length ? new EmptyPostList() : this.postListComponent

    if (state.currentPageIndex < state.lastPageIndex) this.infiniteScroll.showSpinner()
    else this.infiniteScroll.showEndOfList()
  }

  onLoaded() {
    this.$('.tab-today').classList.add('active')
    this.$('.newsletter').innerHTML = megaphone
    this.$('.info').innerHTML = info
    this.$('.search-icon').innerHTML = search

    this.infiniteScroll.register(this.$('.post-list-container'))

    this.fetchPosts()
  }

  async onInfiniteScroll() {
    if (state.currentPageIndex == state.lastPageIndex) return this.infiniteScroll.showEndOfList()

    this.infiniteScroll.showSpinner()

    if (state.activePeriod == PERIODS.ALL_TIME) {
      await actions.fetchAllPosts(state.allPosts.current_page + 1)

      this.posts = state.allPosts.data
    } else {
      await actions.fetchRecentPosts(state.recentPosts.current_page + 1)

      this.posts = state.recentPosts.data
    }

    this.postListComponent.loadMore(this.posts)
  }

  setActiveTab(tab) {
    this.$(this.activeTab).classList.remove('active')
    this.$(tab).classList.add('active')
    this.activeTab = tab
  }

  ['tap .tab-today']() {
    this.setActiveTab('.tab-today')

    actions.setActivePeriod(PERIODS.DAILY)
    this.fetchPosts()
  }

  ['tap .tab-week']() {
    this.setActiveTab('.tab-week')

    actions.setActivePeriod(PERIODS.WEEKLY)
    this.fetchPosts()
  }

  ['tap .tab-month']() {
    this.setActiveTab('.tab-month')

    actions.setActivePeriod(PERIODS.MONTHLY)
    this.fetchPosts()
  }

  ['tap .tab-all']() {
    this.setActiveTab('.tab-all')

    actions.setActivePeriod(PERIODS.ALL_TIME)
    this.fetchPosts()
  }

  template() {
    return pug`
    .main-view
      .container
        .header
          .logo
            span {
            |  kod
            span ,
            |  ilan
            span  }
          .menu
            button.newsletter
            button.info
        .search
          .search-icon
          span Pozisyon adı, teknoloji adı
        .tab-navigation
          button.tab-today Bugün
          button.tab-week Bu hafta
          button.tab-month Bu ay
          button.tab-all Tüm ilanlar
      .post-list-container
        .list-area
        .scroll ${this.infiniteScroll}
    `
  }
}
