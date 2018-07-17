import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  toasts: createReducer({})({
    [ types.ADD ]: (state, action) => ({
      ...state,
      [ action.payload.toast.id ]: action.payload.toast
    }),
    [ types.REMOVE ]: (state, action) => {
      const { [ action.payload.id ]: removedToast, ...nextState } = state

      return nextState
    }
  })
})
