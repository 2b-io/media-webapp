import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  info: createReducer(null)({
    [types.CREATE_COMPLETED]: (state, action) => action.payload.info,
    [types.DESTROY_COMPLETED]: () => null
  })
})
