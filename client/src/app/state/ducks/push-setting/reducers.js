import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default (state = {}, action) => {
  switch (action.type) {
    case types.GET_COMPLETED:
    case types.UPDATE_COMPLETED:
      return {
        ...state,
        [ action.payload.identifier ]: action.payload.pushSetting
      }
  }

  return state
}
