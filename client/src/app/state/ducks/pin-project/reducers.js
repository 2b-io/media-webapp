import arrayToMap from 'state/helpers/array-to-map'
import * as types from './types'

export default (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_COMPLETED:
    case types.UPDATE_COMPLETED:
      return arrayToMap(action.payload.pinnedProjects, 'identifier')
  }
  return state
}
