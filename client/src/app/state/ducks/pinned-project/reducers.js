import * as types from './types'

import arrayToMap from 'state/helpers/array-to-map'

export default (state = {}, action) => {
  switch (action.type) {
    case types.LIST_COMPLETED:
    case types.UPDATE_COMPLETED:
      return arrayToMap(action.payload.pinnedProjects, 'identifier')
  }
  return state
}
