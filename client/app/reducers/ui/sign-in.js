import { SESSION } from 'actions/session'
import { UI_STATE } from 'actions/ui-state'

const initialState = {
  payload: null,
  error: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SESSION.CREATE_SUCCESS: {
      return {
        ...state,
        payload: action.payload,
        error: null
      }
    }

    case SESSION.CREATE_FAILURE: {
      return {
        ...state,
        payload: null,
        error: action.error
      }
    }

    case UI_STATE.CLEAR:
      if (action.payload.id === 'signIn') {
        return initialState
      }
  }

  return state
}
