import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  forgotPassword: createReducer(null)({
    [types.FETCH_COMPLETED]: (state, action) => action.payload,
  })
})
