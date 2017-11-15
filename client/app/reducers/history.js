import { HISTORY } from 'actions/history'

let initialState = {
  pathname: '/',
  type: 'initial'
  // flows: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case HISTORY.CHANGED:
      return Object.assign({}, state, {
        pathname: action.pathname,
        type: action.method,
        // TODO store user flows
        // flows: state.flows.concat([ action.pathname ])
      })
  }

  return state
}
