import HISTORY from 'components/History/actions'

let initialStates = {
  pathname: '/',
  type: 'initial'
  // flows: []
}

export default function(state = initialStates, action) {
  switch (action.type) {
    case HISTORY.PUSH_ACCEPTED:
      return Object.assign({}, state, {
        pathname: action.pathname,
        type: 'push'
        // TODO store user flows
        // flows: state.flows.concat([ action.pathname ])
      })

    case HISTORY.POP_ACCEPTED:
      return Object.assign({}, state, {
        pathname: action.pathname,
        type: 'pop'
        // TODO store user flows
        // flows: state.flows.concat([ action.pathname ])
      })

    case HISTORY.REPLACE:
      return Object.assign({}, state, {
        pathname: action.pathname,
        type: 'replace'
        // TODO store user flows
        // flows: state.flows.concat([ action.pathname ])
      })
  }

  return state
}
