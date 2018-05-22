import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import * as reducers from './ducks/reducers'
import operations from './ducks/operations'

// support REDUX Chrome Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

export default (initialState) => {
  const rootReducer = combineReducers(reducers)

  const middlewares = [ sagaMiddleware ]

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  )

  sagaMiddleware.run(operations)

  return store
}
