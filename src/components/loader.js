import {Component} from 'erste'

export default class Loader extends Component {
  template() {
    return pug`
      .loader-container
        .loader
          .double-bounce1
          .double-bounce2
    `
  }
}
