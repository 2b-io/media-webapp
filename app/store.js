import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducers';

export default function() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createReducer(),
    applyMiddleware(sagaMiddleware)
  );

  return store;
}
