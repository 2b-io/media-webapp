import { combineReducers } from 'redux'

import createReducer from 'state/helpers/create-reducer'
import * as types from './types'

export default combineReducers({
  menuMore: createReducer({})({
    [ types.SHOW ]: (state, action) => ({
      ...state,
      [ action.payload.name ]: {
        isOpen: true
      }
    }),
    [ types.HIDE ]: (state, action) => ({
      ...state,
      [ action.payload.name ]: {
        isOpen: false
      }
    })
  })
})
