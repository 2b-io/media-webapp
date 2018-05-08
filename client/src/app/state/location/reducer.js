const initialState = {
  entries: [],
  last: null,
  current: null
}

export default (state = initialState, action) => {
  console.log('reducer', action)

  switch (action.type) {
    case 'location.accept':
      return {
        ...state,
        last: state.current,
        current: action.payload.pathname
      }
  }

  return state
}
