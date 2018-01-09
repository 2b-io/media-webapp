import { ROUTING } from 'actions/routing'

const initialState = {
  request: null,
  sync: null,
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

    case ROUTING.SYNC: {
      return {
        ...state,
        request: null,
        sync: action.payload
      }
    }

    case ROUTING.ACCEPT:
      return {
        ...state,
        splash: false,
        sync: null,
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
  }

  return state
}
