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
      const { slug }  = action.payload.preset.project
      const project = state[ slug ]
      const presets = project.presets

      return {
        ...state,
        [ slug ]: {
          ...project,
          presets: {
            ...presets,
            [ action.payload.preset.hash ]: action.payload.preset
          }
        }
      }
    },
    [ types.CREATE_PRESET_COMPLETED ]: (state, action) => {
      const { slug }  = action.payload.preset.project
      const project = state[ slug ]
      const presets = project.presets

      return {
        ...state,
        [ slug ]: {
          ...project,
          presets: {
            ...presets,
            [ action.payload.preset.hash ]: action.payload.preset
          }
        }
      }

      // state[ slug ].presets = [ ...state[slug].presets, action.payload.preset ]
      // return { ...state }
    },
    [ types.UPDATE_PRESET_COMPLETED ]: (state, action) => {
      const { slug }  = action.payload.preset.project
      const project = state[ slug ]
      const presets = project.presets

      return {
        ...state,
        [ slug ]: {
          ...project,
          presets: {
            ...presets,
            [ action.payload.preset.hash ]: action.payload.preset
          }
        }
      }
    },
    [ types.DELETE_PRESET_COMPLETED ]: (state, action) => {
      const { slug }  = action.payload.preset.project
      const project = state[ slug ]
      const presets = project.presets
      const { [ action.payload.preset.hash ]: removedPreset, ...remainPresets } = presets
      return {
        ...state,
        [ slug ]: {
          ...project,
          presets: remainPresets
        }
      }
    }
  })
})
