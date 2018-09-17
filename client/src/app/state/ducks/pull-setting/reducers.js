import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  pullSetting: createReducer(null)({
    [types.GET_COMPLETED]: (state, action) => action.payload,
    [types.UPDATE_COMPLETED]: (state, action) => action.payload
  })
})
