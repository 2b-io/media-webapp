let initialStates = {
  pathname: '/'
  // flows: []
}

function reducer(state = initialStates, action) {
  switch (action.type) {
    case 'HISTORY_CHANGED':
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
