import { PROJECT } from 'actions/project'

let initialState = {
  all: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PROJECT.FETCH_SUCCESS:
      return {
        ...state,
        all: action.payload
      }
  }

  return state
}
