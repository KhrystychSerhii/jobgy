import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import httpClient from '../Services/Http'
// set language from AsyncStorage when app init
import { getCurrentLanguage } from './I18nRedux'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  settings: require('./SettingsRedux').reducer,
  user: require('./UserRedux').reducer,
  filter: require('./FilterRedux').reducer,
  language: require('./I18nRedux').reducer,
  attributes: require('./AttributesRedux').reducer,
  ad: require('./AdsRedux').reducer,
  questions: require('./QuestionsRedux').reducer,
  categories: require('./CategoriesRedux').reducer
})

export default () => {
  let {store} = configureStore(reducers)
  // todo: узнать зачем dispatch засовывать в httpClient
  httpClient.init(store.dispatch)
  store.dispatch(getCurrentLanguage())

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
