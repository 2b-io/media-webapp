import { UI_STATE } from 'actions/ui-state'

const initialState = {
  payload: null,
  error: null
}

export default function(id, reducer) {
  return {
    [id]: function(state = initialState, action) {
      if (action.type === UI_STATE.CLEAR && action.payload.id === id) {
        return initialState
      }

      return reducer(state, action)
    }
  }
}
