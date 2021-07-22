import {View} from 'erste'
import formatDate from '../../lib/date'

import Tag from '../../components/post/tag'
import {back, home, management, location, link, twitter, email} from '../../components/icons'

import {EMPTY_LOGO, JOB_TYPE_MAP} from '../../lib/constants'

import './detail-view.css'

export default class DetailView extends View {
  constructor(vm, post) {
    super()

    this.vm = vm
    this.post = post
    this.timeago = formatDate(this.post.updated_at)
  }

  onAfterRender() {
    super.onAfterRender()

    this.$('.back').innerHTML = back
    this.$('.home').innerHTML = home
    this.$('.management-icon').innerHTML = management
    this.$('.location-icon').innerHTML = location
    this.$('.link-icon').innerHTML = link
    this.$('.twitter-icon').innerHTML = twitter
    this.$('.email-icon').innerHTML = email
    this.$('.website-icon').innerHTML = link
    this.$('.description').innerHTML = this.post.description

    this.setJobTypeBadge()
    this.setTags()

    if(!this.post.company.www)
      this.$('.link').remove()

    if(!this.post.company.twitter)
      this.$('.twitter').remove()
  }

  setJobTypeBadge() {
    const typeBadge = this.$('.type')

    typeBadge.classList.add(JOB_TYPE_MAP[this.post.type].slug)
    typeBadge.innerText = JOB_TYPE_MAP[this.post.type].name
  }

  setTags() {
    const tags = this.post.tags.map(t => new Tag(t))

    this.$('.post-tags').innerHTML = tags.join('')
  }

  ['tap .back']() {
    this.vm.push()
    console.log('Back button tapped!')
  }

  ['tap .home']() {
    console.log('Home button tapped!')
  }

  template() {
    return pug`
      .detail-view
        .nav-bar
          .header
            button.back
            h3 İlan Detayı
            button.home
        .container
          h3.title ${this.post.position}
          .logo-and-work-tag
            img.company-logo(src="${this.post.company.logo || EMPTY_LOGO}" onerror="this.src='${EMPTY_LOGO}'")
            .tag
              span.type
              span.timeago ${this.timeago}
          .company-detail
            button.name
              .management-icon
              span ${this.post.company.name}
            button.location
              .location-icon
              span ${this.post.location}
            button.link
              .link-icon
              span ${this.post.company.www}
            button.twitter
              .twitter-icon
              span ${this.post.company.twitter}
          .post-tags
          .apply-buttons
            button.apply-with-email
              .email-icon
              span E-posta ile başvur
            button.apply-with-website
              .website-icon
              span Site üzerinden başvur
          h4.description-title İlan Açıklaması
          .description
    `
  }
}
