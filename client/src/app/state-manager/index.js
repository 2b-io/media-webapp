import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducer } from 'state'
import auth from 'state-manager/middlewares/auth'
import fsm from 'state-manager/saga'

// support REDUX Chrome Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      auth,
      sagaMiddleware
    )
  )
)

sagaMiddleware.run(fsm)
