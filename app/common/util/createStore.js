import { createStore, combineReducers, compose } from 'redux'
// import createMiddleware from './clientMiddleware'
import * as reducers from '../reducers/index'
const reducer = combineReducers(reducers)

export default function (data) {
  // const middleware = createMiddleware(client)
  let finalCreateStore
  if (__DEV__) {
    const { devTools } = require('redux-devtools')
    finalCreateStore = compose(
      devTools(),
      createStore
    )
  } else {
    finalCreateStore = createStore
  }
  return finalCreateStore(reducer, data)
}