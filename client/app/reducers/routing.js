import { ROUTING } from 'actions/routing'

const initialState = {
  request: null,
  location: null,
  splash: true,
  matches: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ROUTING.REQUEST: {
      return {
        ...state,
        request: action.payload
      }
    }

    case ROUTING.ACCEPT:
      return {
        ...state,
        splash: false,
        request: null,
        location: action.payload
      }

    case ROUTING.MATCH:
      return {
        ...state,
        matches: {
          ...state.matches,
          [action.payload.path]: action.payload.match
        }
      }

    case ROUTING.REJECT:
      return {
        ...state,
        reject: action.payload.pathname
      }
  }

  return state
}
