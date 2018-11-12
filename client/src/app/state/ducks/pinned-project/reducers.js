import * as types from './types'

export default (state = {}, action) => {
  switch (action.type) {
    case types.LIST_COMPLETED:
    case types.UPDATE_COMPLETED:
      return action.payload.pinnedProjects
  }
  return state
}
