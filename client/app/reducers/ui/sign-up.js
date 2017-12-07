import { ACCOUNT } from 'actions/account'

export default function(state, action) {
  switch (action.type) {
    case ACCOUNT.CREATE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        error: null
      }

    case ACCOUNT.CREATE_FAILURE:
      return {
        ...state,
        payload: null,
        error: action.error
      }
  }

  return state
}
