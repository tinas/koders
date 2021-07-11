import {Component} from 'erste'

export default class Tag extends Component {
  template(tag) {
    return pug`
      button.post-tag ${tag.name}
    `
  }
}
