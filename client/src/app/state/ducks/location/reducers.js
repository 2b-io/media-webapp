import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  current: createReducer(null)({
    [types.ACCEPT]: (state, action) => action.payload.pathname,
    [types.INIT]: (state, action) => action.payload.pathname
  }),
  key: createReducer(null)({
    [types.ACCEPT]: () => null,
    [types.UPDATE_KEY]: (state, action) => action.payload.key || null
  })
})
