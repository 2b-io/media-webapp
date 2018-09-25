import { combineReducers } from 'redux'

import createReducer from 'state/helpers/create-reducer'
import * as types from './types'

export default createReducer({})({
  [ types.SHOW ]: (state, action) => ({
    ...state,
    [ action.payload.name ]: true
  }),
  [ types.HIDE ]: (state, action) => ({
    ...state,
    [ action.payload.name ]: false
  })
})
