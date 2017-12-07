import { SESSION } from 'actions/session'

export default function(state, action) {
  switch (action.type) {
    case SESSION.CREATE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        error: null
      }

    case SESSION.CREATE_FAILURE:
      return {
        ...state,
        payload: null,
        error: action.error
      }
  }

  return state
}
