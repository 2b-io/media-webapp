import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  resetPasswordCode: createReducer(null)({
    [types.FORGOT_PASSWORD_COMPLETED]: (state, action) => action.payload,
    [types.FORGOT_PASSWORD_COMPLETED]: (state, action) => action.payload
  })
})
