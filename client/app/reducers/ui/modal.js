import { MODAL } from 'actions/modal'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case MODAL.OPEN:
      return {
        ...state,
        [action.payload.id]: action.payload.data || true
      }

    case MODAL.DISMISS:
      return action.payload ? {
        ...state,
        [action.payload.id]: false
      } : initialState
  }

  return state
}
