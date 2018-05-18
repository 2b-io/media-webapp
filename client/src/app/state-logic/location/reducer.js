import { actions } from 'state-logic/location/actions'

const initialState = {
  entries: [],
  last: null,
  current: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.accept:
      return {
        ...state,
        last: state.current,
        current: action.payload.pathname
      }
  }

  return state
}
