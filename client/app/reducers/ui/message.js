import { MESSAGE } from 'actions/message'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case MESSAGE.DISMISS: {
      return {
        ...state,
        [action.payload]: undefined
      }
    }

    case MESSAGE.APPEND: {
      return {
        ...state,
        [action.payload.key]: action.payload
      }
    }
  }

  return state
}
