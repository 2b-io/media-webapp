import { LAYOUT } from 'actions/layout'

const initialState = {
  mode: LAYOUT.FULLSCREEN_MODE
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LAYOUT.CHANGE: {
      return {
        ...state,
        mode: action.payload.mode
      }
    }
  }

  return state
}
