import { SESSION } from 'actions/session'

let initialState = {
  token: null,
  ttl: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SESSION.SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        ttl: action.payload.ttl
      }
    case SESSION.SIGN_IN_FAILURE:
    case SESSION.VERIFY_FAILURE:
      return {
        ...state,
        token: null,
        ttl: 0
      }
  }

  return state
}
