import { ROUTING } from 'actions/routing'

const initialState = {
  redirecting: undefined,
  location: undefined,
  splash: true
}

export default function(state = {}, action) {
  switch (action.type) {
    case ROUTING.REQUEST_CHANGE: {
      return {
        ...state,
        redirecting: action.payload
      }
    }

    case ROUTING.ACCEPT_CHANGE:
      return {
        ...state,
        splash: false,
        redirecting: undefined,
        location: action.payload
      }
  }

  return state
}
