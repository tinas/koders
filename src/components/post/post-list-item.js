import {Component} from 'erste'
import formatDate from '../../lib/date'

import Tag from './tag'
import {management, location} from '../icons'

const emptyLogo = 'static/assets/img/empty-company-logo.png'
const JOB_TYPE_MAP = {
  0: {name: 'Tam zamanlı', slug: 'full-time'},
  1: {name: 'Tam zamanlı', slug: 'full-time'},
  2: {name: 'Yarı zamanlı', slug: 'part-time'},
  3: {name: 'Stajyer', slug: 'intern'},
  4: {name: 'Freelance', slug: 'intern'}
}

export default class PostListItem extends Component {
  constructor(post) {
    super()

    this.post = post
    this.timeago = formatDate(this.post.updated_at)
  }

  onAfterRender() {
    super.onAfterRender()

    this.$('.management-icon').innerHTML = management
    this.$('.location-icon').innerHTML = location

    const postTags = this.post.tags.map(tag => new Tag(tag))

    this.$('.post-tags').innerHTML = postTags.join('')

    this.setJobTypeBadge()
  }

  setJobTypeBadge() {
    const typeBadge = this.$('.type')

    typeBadge.classList.add(JOB_TYPE_MAP[this.post.type].slug)
    typeBadge.innerText = JOB_TYPE_MAP[this.post.type].name
  }

  ['tap post-list-item'](e) {
    console.log('post tapped!', e.targetEl.getAttribute('data-show-id'))
  }

  template() {
    return pug`
      post-list-item(data-show-id="${this.post.slug}")
        img.company-logo(src="${this.post.company.logo || emptyLogo}" onerror="this.src='${emptyLogo}'")
        .main
          p.title ${this.post.position}
          .company-detail
            button.name
              .management-icon
              span ${this.post.company.name}
            button.location
              .location-icon
              span ${this.post.location}
          .post-tags
        .tag
          span.type
          span.timeago ${this.timeago}
    `
  }
}
