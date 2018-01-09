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
        [Date.now()]: action.payload
      }
    }
  }

  return state
}
