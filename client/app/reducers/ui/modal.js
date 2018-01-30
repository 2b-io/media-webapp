import { MODAL } from 'actions/modal'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case MODAL.OPEN:
      return {
        ...state,
        [action.payload.id]: action.payload.data || true
      }

    case MODAL.DISMISS: {
      if (!action.payload) return initialState

      let { [action.payload.id]:closingModal, ...nextState } = state

      return nextState
    }
  }

  return state
}
