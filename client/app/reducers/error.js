const initialState = {
  unauthorized: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_UNAUTHORIZED_ERROR':
      return Object.assign({}, state, {
        unauthorized: true
      })
    case 'CLEAR_UNAUTHORIZED_ERROR':
      return Object.assign({}, state, {
        unauthorized: false
      })
  }

  return state
}
