import { LOCATION } from 'actions/location'

let initialState = {
  pathname: '/',
  type: 'initial'
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOCATION.CHANGED:
      return {
        ...state,
        pathname: action.payload.pathname,
        type: action.payload.method,
        last: {
          pathname: state.pathname,
          type: state.type
        }
      }
  }

  return state
}
