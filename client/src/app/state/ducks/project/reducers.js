import { combineReducers } from 'redux'
import arrayToMap from 'state/helpers/array-to-map'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

const collaboratorsToMap = (arr, indexKey) => arr.reduce(
  (dict, element) => ({
    ...dict,
    [ element.account[ indexKey ] ]: element
  }),
  {}
)


export default combineReducers({
  projects: createReducer({})({
    [ types.FETCH_COMPLETED ]: (state, action) => {
      return action.payload.projects.reduce(
        (projects, project) => ({
          ...projects,
          [ project.slug ]: {
            ...project,
            collaborators: arrayToMap(project.collaborators, '_id'),
            presets: arrayToMap(project.presets, 'hash'),
          }
        }), {}
      )
    },
    [ types.CREATE_COMPLETED ]: (state, action) => ({
      ...state,
      [ action.payload.project.slug ]: {
        ...action.payload.project,
        presets: arrayToMap(action.payload.project.presets, 'hash')
      }
    }),
    [ types.DELETE_COMPLETED ]: (state, action) => {
      const { slug } = action.payload
      const { [ slug ]: removedProject, ...projects } = state

      return projects
    },
    [ types.GET_COMPLETED ]: (state, action) => ({
      ...state,
      [ action.payload.project.slug ]: {
        ...action.payload.project,
        presets: arrayToMap(action.payload.project.presets, 'hash'),
        collaborators: collaboratorsToMap(action.payload.project.collaborators, '_id')
      }
    }),
    [types.UPDATE_COMPLETED ]: (state, action) => ({
      ...state,
      [ action.payload.project.slug ]: {
        ...action.payload.project,
        presets: arrayToMap(action.payload.project.presets, 'hash'),
        collaborators: collaboratorsToMap(action.payload.project.collaborators, '_id')
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
    },
    [ types.INVITE_COLLABORATOR_COMPLETED ]: (state, action) => {
      const { slug }  = action.payload.collaborator
      const { collaborator } = action.payload
      const project = state[ slug ]

      return {
        ...state,
        [ slug ]: {
          ...project,
          collaborators: {
            ...state[ slug ].collaborators,
            [ collaborator.account._id ]: collaborator
          }
        }
      }
    },

    [ types.DELETE_COLLABORATOR_COMPLETED ]: (state, action) => {

      const { slug } = action.payload
      const project = state[ slug ]
      const { collaborators } = project
      const { accountId } = action.payload
      const { [ accountId ]: accountIdtoDelete, ...newCollaborators } = collaborators

      return {
        ...state,
        [ slug ]: {
          ...project,
          collaborators: newCollaborators
        }
      }
    },
    [ types.MAKE_OWNER_COMPLETED ]: (state, action) => {
      const { slug }  = action.payload
      const { currentAccountId } = action.payload
      const { accountId } = action.payload
      const project = state[ slug ]

      return {
        ...state,
        [ slug ]: {
          ...project,
          collaborators: {
            ...state[ slug ].collaborators,
            [ currentAccountId ]: {
              ...state[ slug ].collaborators[ currentAccountId ], privilege: 'admin',
            },
            [ accountId ]: {
              ...state[ slug ].collaborators[ accountId ], privilege: 'owner'
            }
          }
        },
      }
    },
    [ types.ADD_CUSTOM_HEADER ]: (state, action) => {
      const { slug } = action.payload
      const project = state[ slug ]

      return {
        ...state,
        [ slug ]: {
          ...project,
          headers: [
            ...(project.headers || []),
            {
              name: '',
              value: ''
            }
          ]
        }
      }
    }
  }),
})
