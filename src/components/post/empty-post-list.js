import {Component} from 'erste'

export default class EmptyPostList extends Component {
  template() {
    return pug`
      .empty-posts
        img(src="static/assets/svg/empty-list.svg")
    `
  }
}
