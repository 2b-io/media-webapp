import arrayToMap from 'state/helpers/array-to-map'
import * as types from './types'

export default (state = {}, action) => {
  switch (action.type) {
    case types.LIST_INVALIDATE_CACHE_COMPLETED: {
      return arrayToMap(action.payload.listInvalidateCaches, 'identifier')
    }
    case types.INVALIDATE_CACHE_COMPLETED: {
      return {
        ...state,
        [ action.payload.invalidateCache.identifier ]: action.payload.invalidateCache
      }
    }
  }
  return state
}
