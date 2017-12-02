const initialState = {
  unauthorized: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_UNAUTHORIZED_ERROR':
      return {
        ...state,
        unauthorized: true
      }
    case 'CLEAR_UNAUTHORIZED_ERROR':
      return {
        ...state,
        unauthorized: false
      }
  }

  return state
}
