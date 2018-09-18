import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  preset: createReducer(null)({
    [ types.GET_COMPLETED ]: (state, action) => {
      const { preset, identifier }  = action.payload
      return {
        ...state,
        [ identifier ]: {
          ...state[ identifier ],
          presets: {
            ...state[ identifier ].presets,
            [ preset.contentType ]: preset
          }
        }
      }
    },
    [ types.CREATE_PRESET_COMPLETED ]: (state, action) => {
      const { preset, identifier } = action.payload

      return {
        ...state,
        [ identifier ]: {
          ...state[ identifier ],
          presets: {
            ...state[ identifier ].presets,
            [ preset.contentType ]: preset
          }
        }
      }
    },
    [ types.UPDATE_PRESET_COMPLETED ]: (state, action) => {
      const { preset, identifier } = action.payload

      return {
        ...state,
        [ identifier ]: {
          ...state[ identifier ],
          presets: {
            ...state[ identifier ].presets,
            [ preset.contentType ]: preset
          }
        }
      }
    },
    [ types.DELETE_PRESET_COMPLETED ]: (state, action) => {
      const { preset: { contentType }, identifier } = action.payload
      const { [ contentType ]: removedPreset, ...remainPresets } = state[ identifier ].presets
      return {
        ...state,
        [ identifier ]: {
          ...state[ identifier ],
          presets: remainPresets
        }
      }
    }
  })
})
