import { createStore, applyMiddlware } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';

import createReducer from 'reducers';

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();
const initialState = {};

const store = createStore(
  createReducer(),
  fromJS(initialState)
);

export default store;
