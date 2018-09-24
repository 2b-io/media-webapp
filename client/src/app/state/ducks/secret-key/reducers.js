import arrayToMap from 'state/helpers/array-to-map'
import * as types from './types'

export default (state = {}, action) => {
  switch (action.type) {
    case types.GET_COMPLETED:
    case types.CREATE_COMPLETED:
    case types.UPDATE_COMPLETED: {
      return {
        ...state,
        [ action.payload.identifier ]: {
          ...state[ action.payload.identifier ],
          [ action.payload.preset.key ]: action.payload.secretKey
        }
      }
    }
    case types.REMOVE_COMPLETED: {
      const { secretKey: { key }, identifier } = action.payload
      const { [ key ]: removedKey, ...remainKey } = state[ identifier ]

      return {
        ...state,
        [ identifier ]: remainKey
      }
    }
    case types.FETCH_COMPLETED: {
      return {
        ...state,
        [ action.payload.identifier ]: arrayToMap(action.payload.secretKeys, 'key')
      }
    }
  }
  return state
}
