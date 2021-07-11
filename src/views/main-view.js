import {View, InfiniteScroll} from 'erste'
import {megaphone, info, search} from '../components/icons'

import './main-view.css'

export default class MainView extends View {
  constructor(vm) {
    super()

    this.vm = vm
    this.activeTab = '.tab-today'

    this.infiniteScroll = new InfiniteScroll()
    this.infiniteScroll.endOfListText = 'Hepsini gördün!'

    this.bindEvents()
  }

  bindEvents() {
    this.infiniteScroll.on(this.infiniteScroll.EventType.SHOULD_LOAD, this.onInfiniteScroll.bind(this))
  }

  setActiveTab(tab) {
    this.$(this.activeTab).classList.remove('active')
    this.$(tab).classList.add('active')
    this.activeTab = tab
  }

  ['tap .tab-today']() {
    this.setActiveTab('.tab-today')
  }

  ['tap .tab-week']() {
    this.setActiveTab('.tab-week')
  }

  ['tap .tab-month']() {
    this.setActiveTab('.tab-month')
  }

  ['tap .tab-all']() {
    this.setActiveTab('.tab-all')
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
