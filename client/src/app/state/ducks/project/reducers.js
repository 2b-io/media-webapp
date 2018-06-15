import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  projects: createReducer(null)({
    [types.RECEIVE_COMPLETED]: (state, action) => (action.payload),
    [types.REQUEST_COMPLETED]: (state, action) => null
  })
})
