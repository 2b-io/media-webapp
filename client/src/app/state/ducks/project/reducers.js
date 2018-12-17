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

export default createReducer({})({
  [ types.FETCH_COMPLETED ]: (state, action) => {
    return action.payload.projects.reduce(
      (projects, project) => ({
        ...projects,
        [ project.identifier ]: {
          ...project,
          collaborators: arrayToMap(project.collaborators, 'identifier'),
        }
      }), {}
    )
  },
  [ types.CREATE_COMPLETED ]: (state, action) => ({
    ...state,
    [ action.payload.project.identifier ]: {
      ...action.payload.project,
    }
  }),
  [ types.REMOVE_COMPLETED ]: (state, action) => {
    const { identifier } = action.payload
    const { [ identifier ]: removedProject, ...projects } = state

    return projects
  },
  [ types.GET_COMPLETED ]: (state, action) => ({
    ...state,
    [ action.payload.project.identifier ]: {
      ...action.payload.project,
      collaborators: collaboratorsToMap(action.payload.project.collaborators, 'identifier')
    }
  }),
  [types.UPDATE_COMPLETED ]: (state, action) => ({
    ...state,
    [ action.payload.project.identifier ]: {
      ...action.payload.project,
      collaborators: collaboratorsToMap(action.payload.project.collaborators, 'identifier')
    }
  }),
  [ types.INVITE_COLLABORATOR_COMPLETED ]: (state, action) => {
    const { collaborators, identifier } = action.payload
    const project = state[ identifier ]
    const newCollaborators = arrayToMap(collaborators, 'identifier')

    return {
      ...state,
      [ identifier ]: {
        ...project,
        collaborators: {
          ...state[ identifier ].collaborators,
          ...newCollaborators
        }
      }
    }
  },

  [ types.DELETE_COLLABORATOR_COMPLETED ]: (state, action) => {

    const { identifier } = action.payload
    const project = state[ identifier ]
    const { collaborators } = project
    const { accountId } = action.payload
    const { [ accountId ]: accountIdtoDelete, ...newCollaborators } = collaborators

    return {
      ...state,
      [ identifier ]: {
        ...project,
        collaborators: newCollaborators
      }
    }
  },
  [ types.MAKE_OWNER_COMPLETED ]: (state, action) => {
    const { identifier }  = action.payload
    const { currentAccountId } = action.payload
    const { accountId } = action.payload
    const project = state[ identifier ]

    return {
      ...state,
      [ identifier ]: {
        ...project,
        collaborators: {
          ...state[ identifier ].collaborators,
          [ currentAccountId ]: {
            ...state[ identifier ].collaborators[ currentAccountId ], privilege: 'ADMIN',
          },
          [ accountId ]: {
            ...state[ identifier ].collaborators[ accountId ], privilege: 'OWNER'
          }
        }
      },
    }
  }
})
