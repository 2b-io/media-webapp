import { SESSION } from 'actions/session'

let initialState = {
  token: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SESSION.SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.token
      }
  }

  return state
}
