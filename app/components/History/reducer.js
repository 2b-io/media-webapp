import HISTORY from 'components/History/actions'

let initialStates = {
  pathname: '/',
  type: 'push/pop'
  // flows: []
}

function reducer(state = initialStates, action) {
  console.debug('>> History:reducer')
  console.debug('>>', action)
  console.debug(`\n`)

  switch (action.type) {
    case HISTORY.PUSH_ACCEPTED:
    case HISTORY.POP_ACCEPTED:
      return Object.assign({}, state, {
        pathname: action.pathname,
        type: 'push/pop'
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

export default reducer
