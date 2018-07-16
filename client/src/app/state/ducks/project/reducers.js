import { combineReducers } from 'redux'
import arrayToMap from 'state/helpers/array-to-map'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  projects: createReducer({})({
    [ types.FETCH_COMPLETED ]: (state, action) =>  arrayToMap(action.payload.projects, 'slug'),
    [ types.CREATE_COMPLETED ]: (state, action) => ({
      ...state,
      [ action.payload.project.slug ]: {
        ...action.payload.project,
        presets: arrayToMap(action.payload.project.presets, 'hash')
      }
    }),
    [ types.GET_COMPLETED ]: (state, action) => ({
      ...state,
      [ action.payload.project.slug ]: {
        ...action.payload.project,
        presets: arrayToMap(action.payload.project.presets, 'hash')
      }
    }),
    [ types.GET_PRESET_COMPLETED ]: (state, action) => {
      const { preset, slug }  = action.payload

      return {
        ...state,
        [ slug ]: {
          ...state[ slug ],
          presets: {
            ...state[ slug ].presets,
            [ preset.hash ]: preset
          }
        }
      }
    },
    [ types.CREATE_PRESET_COMPLETED ]: (state, action) => {
      const { preset, slug } = action.payload

      return {
        ...state,
        [ slug ]: {
          ...state[ slug ],
          presets: {
            ...state[ slug ].presets,
            [ preset.hash ]: preset
          }
        }
      }
    },
    [ types.UPDATE_PRESET_COMPLETED ]: (state, action) => {
      const { preset, slug } = action.payload

      return {
        ...state,
        [ slug ]: {
          ...state[ slug ],
          presets: {
            ...state[ slug ].presets,
            [ preset.hash ]: preset
          }
        }
      }
    },
    [ types.DELETE_PRESET_COMPLETED ]: (state, action) => {
      const { preset: { hash }, slug } = action.payload
      const { [ hash ]: removedPreset, ...remainPresets } = state[ slug ].presets
      return {
        ...state,
        [ slug ]: {
          ...state[ slug ],
          presets: remainPresets
        }
      }
    }
  })
})
