import HISTORY from 'components/History/actions'

let initialStates = {
  pathname: '/',
  type: 'initial'
  // flows: []
}

export default function(state = initialStates, action) {
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
