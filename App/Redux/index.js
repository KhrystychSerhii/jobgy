import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import httpClient from '../Services/Http'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  settings: require('./SettingsRedux').reducer,
  user: require('./UserRedux').reducer,
  filter: require('./FilterRedux').reducer,
})

export default () => {
  let {store} = configureStore(reducers)
  httpClient.init(store.dispatch)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
