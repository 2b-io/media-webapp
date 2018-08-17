import { combineReducers } from 'redux'

import createReducer from 'state/helpers/create-reducer'
import * as types from './types'

export default combineReducers({
  dialogs: createReducer({})({
    [ types.SHOW ]: (state, action) => ({
      ...state,
      [ action.payload.dialog ]: {
        params: action.payload.params
      }
    }),
    [ types.HIDE ]: (state, action) => ({
      ...state,
      [ action.payload.dialog ]: null
    })
  })
})
