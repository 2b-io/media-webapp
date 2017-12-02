import { createStore, applyMiddleware, compose } from 'redux'
import reduxCatch from 'redux-catch'
import createSagaMiddleware from 'redux-saga'

import reducer from 'bootstrap/reducer'
import rootSaga from 'bootstrap/saga'

// support REDUX Chrome Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  reduxCatch((error, getState, lastAction, dispatch) => {
    console.log(error, getState, lastAction, dispatch)
  })
]

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
);

sagaMiddleware.run(rootSaga)

export default store
