import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

const initialToasts = {
  1: {
    id: 1,
    type: 'error',
    message: 'If you receive a message like this it means that your last action was completed successfully and no additional actions are required (such as Restart Server).'
  },
  2: {
    id: 2,
    type: 'info',
    message: 'If you receive a message like this it means that your last action was completed successfully and no additional actions are required (such as Restart Server).'
  },
  3: {
    id: 3,
    type: 'success',
    message: 'If you receive a message like this it means that your last action was completed successfully and no additional actions are required (such as Restart Server).'
  },
  4: {
    id: 4,
    type: 'warn',
    message: 'If you receive a message like this it means that your last action was completed successfully and no additional actions are required (such as Restart Server).'
  }
}

export default combineReducers({
  toasts: createReducer(initialToasts)({
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
