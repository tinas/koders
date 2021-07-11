import {ViewManager} from 'erste'
import MainView from './views/main-view'

import 'erste/dist/erste.css'
import './style/normalize.css'
import './style/theme.css'
import './style/loader.css'
import './style/infinite-scroll.css'

export default class Application {
  constructor() {
    const vm = new ViewManager()

    const mainView = new MainView(vm)

    vm.setCurrentView(mainView)
  }
}
