import erste from 'erste'
import regie from 'regie'

import actionsDefinitions from './actions'
import mutationsDefinitions from './mutations'

const initialState = {
  currentPageIndex: 1,
  lastPageIndex: 1,
  activePeriod: '',
  recentPosts: null,
  allPosts: null
}

const store = regie({initialState, actions: actionsDefinitions, mutations: mutationsDefinitions})

erste.use(store)

export const {state, actions} = store
