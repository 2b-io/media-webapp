import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'

import * as reducers from './ducks/reducers'
import operations from './ducks/operations'

export default (initialState) => {
  // support REDUX Chrome Extension
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(
      applyMiddleware(...[
        sagaMiddleware
      ])
    )
  )

  sagaMiddleware.run(operations)

  return store
}
