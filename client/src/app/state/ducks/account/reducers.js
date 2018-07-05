import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  accounts: createReducer({})({
    [ types.GET_COMPLETED ]: (state, action) => ({
      ...state,
      [ action.payload.account._id ]: action.payload.account
    })
  })
})
