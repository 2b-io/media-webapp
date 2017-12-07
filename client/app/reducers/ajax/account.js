import { ACCOUNT } from 'actions/account'
import { AJAX } from 'actions/ajax'

const initialState = {
  account: null,
  error: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT.CREATE_SUCCESS:
      return {
        ...state,
        account: action.payload,
        error: null
      }

    case ACCOUNT.CREATE_FAILURE:
      return {
        ...state,
        account: null,
        error: action.error
      }

    case AJAX.CLEAR:
      if (action.payload.id === 'account') {
        return initialState
      }
  }

  return state
}
