import { PROJECT } from 'actions/project'

export default function(state, action) {
  switch (action.type) {
    case PROJECT.CREATE_SUCCESS:
    case PROJECT.UPDATE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        error: null
      }

    case PROJECT.CREATE_FAILURE:
    case PROJECT.UPDATE_FAILURE:
      return {
        ...state,
        payload: null,
        error: action.error
      }
  }

  return state
}
