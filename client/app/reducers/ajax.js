import { AJAX } from 'actions/ajax'

const initialState = {
  requests: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case AJAX.REQUEST:
      return {
        ...state,
        requests: state.requests + 1
      }
    case AJAX.SUCCESS:
    case AJAX.FAILURE:
      return {
        ...state,
        requests: state.requests - 1
      }
  }

  return state
}
