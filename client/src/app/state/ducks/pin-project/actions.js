import * as types from './types'

export const fetchPinnedProjects = () => ({
  type: types.FETCH
})
export const fetchPinnedProjectsCompleted = (pinnedProjects) => ({
  type: types.FETCH_COMPLETED,
  payload: { pinnedProjects }
})
export const fetchPinnedProjectsFailed = (reason) => ({
  type: types.FETCH_FAILED,
  payload: { reason }
})

export const updatePinnedProjects = (projectIdentifiers) => ({
  type: types.UPDATE
})
export const updatePinnedProjectsCompleted = (pinnedProjects) => ({
  type: types.UPDATE_COMPLETED,
  payload: { pinnedProjects }
})
export const updatePinnedProjectsFailed = (reason) => ({
  type: types.UPDATE_FAILED,
  payload: { reason }
})
