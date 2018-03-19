import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// creates the store
export default (rootReducer) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Analytics Middleware ------------- */

  middleware.push(thunk)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const store = createStore(rootReducer, composeEnhancers(...enhancers))

  // kick off root saga
  return {
    store,
  }
}
