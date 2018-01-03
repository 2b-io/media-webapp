import { PROJECT } from 'actions/project'

let initialState = {
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PROJECT.FETCH_ALL_SUCCESS:
      return action.payload.reduce((nextState, project) => {
        nextState[project.slug] = project

        return nextState
      }, {})

    case PROJECT.FETCH_SUCCESS:
    case PROJECT.UPDATE_SUCCESS:
      return {
        ...state,
        [action.payload.slug]: action.payload
      }
  }

  return state
}
