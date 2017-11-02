import HISTORY from 'components/History/actions'

let initialStates = {
  pathname: '/'
  // flows: []
}

function reducer(state = initialStates, action) {
  console.debug('>> History:reducer')
  console.debug('>>', action)
  console.debug(`\n`)

  switch (action.type) {
    case HISTORY.PUSH_ACCEPTED:
    case HISTORY.POP_ACCEPTED:
      let nextState = Object.assign({}, state, {
        pathname: action.pathname
        // TODO store user flows
        // flows: state.flows.concat([ action.pathname ])
      })

      return nextState
  }

  return state
}

export default reducer
