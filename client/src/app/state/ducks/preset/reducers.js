import { combineReducers } from 'redux'

import arrayToMap from 'state/helpers/array-to-map'
import * as types from './types'

// struct presets
//{
//   presets: {
//     'Zg9CD8': {
//       'image/jpeg': {
//         contentType: 'image/jpeg',
//         parameters: {}
//       },
//       'image/gif': { ... }
//     },
//     ...
//   }
// }

export default combineReducers({
  presets: (state = {}, action) => {
    switch (action.type) {
      case types.GET_COMPLETED:
      case types.CREATE_COMPLETED:
      case types.UPDATE_COMPLETED:
      {
        return {
          ...state,
          [ action.payload.identifier ]: {
            ...state[ action.payload.identifier ],
            [ action.payload.preset.contentType ]: action.payload.preset
          }
        }
      }
      case types.REMOVE_COMPLETED:
      {
        const { preset: { contentType }, identifier } = action.payload
        const { [ contentType ]: removedPreset, ...remainPresets } = state[ identifier ]
        return {
          ...state,
          [ identifier ]: remainPresets
        }
      }
      case types.FETCH_COMPLETED:
        return {
          ...state,
          [ action.payload.identifier ]: arrayToMap(action.payload.presets, 'contentType')
        }
    }
    return state
  }
})
