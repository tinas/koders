/* eslint-disable import/first */

import './style/normalize.css'
import 'erste/dist/erste.css'
import MainView from './views/main-view'

export default () => new MainView().render()
