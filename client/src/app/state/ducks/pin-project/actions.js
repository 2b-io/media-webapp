import * as types from './types'

export const listPinnedProjects = () => ({
  type: types.LIST
})
export const listPinnedProjectsCompleted = (pinnedProjects) => ({
  type: types.LIST_COMPLETED,
  payload: { pinnedProjects }
})
export const listPinnedProjectsFailed = (reason) => ({
  type: types.LIST_FAILED,
  payload: { reason }
})

export const updatePinnedProjects = (projectIdentifiers) => ({
  type: types.UPDATE,
  payload: { projectIdentifiers }
})
export const updatePinnedProjectsCompleted = (pinnedProjects) => ({
  type: types.UPDATE_COMPLETED,
  payload: { pinnedProjects }
})
export const updatePinnedProjectsFailed = (reason) => ({
  type: types.UPDATE_FAILED,
  payload: { reason }
})
