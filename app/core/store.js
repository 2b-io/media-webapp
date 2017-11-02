import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from 'core/reducers'
import rootSaga from 'core/saga'

let sagaMiddleware = createSagaMiddleware();
let store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)

export default store
