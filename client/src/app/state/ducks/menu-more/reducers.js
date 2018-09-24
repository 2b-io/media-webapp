import { combineReducers } from 'redux'

import createReducer from 'state/helpers/create-reducer'
import * as types from './types'

export default createReducer({})({
  [ types.SHOW ]: (state, action) => {

    return ({
      ...state,
      isOpen: action.payload
    })
  },
  [ types.HIDE ]: (state, action) => ({
    ...state,
    isOpen: action.payload
  })
})
