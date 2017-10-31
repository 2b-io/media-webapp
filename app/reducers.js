import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

import globalReducer from 'containers/App/reducer';

export default function createReducer(injectedReducers) {
  return combineReducers({
    global: globalReducer,
    routing: routerReducer,
    ...injectedReducers
  });
};
