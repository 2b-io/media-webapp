import { createStore, applyMiddleware, compose } from 'redux'
import reduxCatch from 'redux-catch'
import createSagaMiddleware from 'redux-saga'

import auth from 'middlewares/auth'
import reducer from './reducer'
import rootSaga from './saga'

// support REDUX Chrome Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  ...auth,
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
