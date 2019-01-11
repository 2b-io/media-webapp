import * as types from './types'

export const copyDomainLink = () => ({
  type: types.COPY_DOMAIN_LINK
})

export const fetchProjects = () => ({
  type: types.FETCH
})

export const fetchProjectsCompleted = projects => ({
  type: types.FETCH_COMPLETED,
  payload: { projects }
})

export const fetchProjectsFailed = reason => ({
  type: types.FETCH_FAILED,
  payload: { reason }
})

export const createProject = ({
  description,
  domain,
  name,
  protocol,
  provider
}) => ({
  type: types.CREATE,
  payload: {
    description,
    domain,
    name,
    protocol,
    provider
  }
})

export const createProjectCompleted = project => ({
  type: types.CREATE_COMPLETED,
  payload: { project }
})

export const createProjectFailed = reason => ({
  type: types.CREATE_FAILED,
  payload: { reason }
})

export const getProject = identifier => ({
  type: types.GET,
  payload: { identifier }
})

export const getProjectCompleted = project => ({
  type: types.GET_COMPLETED,
  payload: { project }
})

export const getProjectFailed = reason => ({
  type: types.GET_FAILED,
  payload: { reason }
})

export const removeProject = identifier => ({
  type: types.REMOVE,
  payload: { identifier }
})

export const removeProjectCompleted = identifier => ({
  type: types.REMOVE_COMPLETED,
  payload: { identifier }
})

export const removeProjectFailed = reason => ({
  type: types.REMOVE_FAILED,
  payload: { reason }
})

export const updateProject = project => ({
  type: types.UPDATE,
  payload: { project }
})

export const updateProjectCompleted = project => ({
  type: types.UPDATE_COMPLETED,
  payload: { project }
})

export const updateProjectFailed = reason => ({
  type: types.UPDATE_FAILED,
  payload: { reason }
})

export const inviteCollaborator = (identifier, { emails, message }) => ({
  type: types.INVITE_COLLABORATOR,
  payload: { identifier, emails, message }
})

export const inviteCollaboratorCompleted = (identifier, collaborators) => ({
  type: types.INVITE_COLLABORATOR_COMPLETED,
  payload: { identifier, collaborators }
})

export const inviteCollaboratorFailed = reason => ({
  type: types.INVITE_COLLABORATOR_FAILED,
  payload: { reason }
})

export const deleteCollaborator = (identifier, accountId) => ({
  type: types.DELETE_COLLABORATOR,
  payload: { identifier, accountId }
})

export const deleteCollaboratorCompleted = (identifier, accountId) => ({
  type: types.DELETE_COLLABORATOR_COMPLETED,
  payload: { identifier, accountId }
})

export const deleteCollaboratorFailed = reason => ({
  type: types.DELETE_COLLABORATOR_FAILED,
  payload: { reason }
})

export const makeOwner = (accountId, identifier) => ({
  type: types.MAKE_OWNER,
  payload: { accountId, identifier }
})

export const makeOwnerCompleted = (identifier, currentAccountId, accountId) => ({
  type: types.MAKE_OWNER_COMPLETED,
  payload: { identifier, currentAccountId, accountId }
})

export const makeOwnerFailed = reason => ({
  type: types.MAKE_OWNER_FAILED,
  payload: { reason }
})

// export const invalidateCache = (patterns, identifier) => ({
//   type: types.INVALIDATE_CACHE,
//   payload: { patterns, identifier }
// })
//
// export const invalidateCacheCompleted = () => {
//   return ({
//     type: types.INVALIDATE_CACHE_COMPLETED
//   })
// }
//
// export const invalidateCacheFailed = reason => ({
//   type: types.INVALIDATE_CACHE_FAILED,
//   payload: { reason }
// })

export const sortProjects = (sortCondition) => ({
  type: types.SORT,
  payload: { sortCondition }
})
export const toggleDisabledProjects = (hide) => ({
  type: types.HIDE_DISABLE,
  payload: { hide }
})
