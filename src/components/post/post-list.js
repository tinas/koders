import {Component} from 'erste'

import PostListItem from './post-list-item'
import './post.css'

export default class PostList extends Component {
  constructor(title, posts) {
    super()

    this.title = title
    this.posts = posts
  }

  onAfterRender() {
    super.onAfterRender()

    const listItems = this.posts.map(post => new PostListItem(post))

    this.$('.post-list-items').innerHTML = listItems.join('')
  }

  loadMore(diff) {
    const postListItems = this.$('.post-list-items')

    diff.map(d => new PostListItem(d)).forEach(p => postListItems.appendChild(p.el))
  }

  template() {
    return pug`
      post-list
        h4 ${this.title}
        .post-list-items
    `
  }
}
