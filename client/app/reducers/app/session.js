import { SESSION } from 'actions/session'

let initialState = {
  token: null,
  ttl: 0,
  verified: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SESSION.CREATE_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        ttl: action.payload.ttl,
        verified: true,
        error: null
      }
    case SESSION.DESTROY_SUCCESS:
    case SESSION.CREATE_FAILURE:
    case SESSION.VERIFY_FAILURE:
      return {
        ...state,
        token: null,
        ttl: 0,
        verified: false
      }
  }

  return state
}