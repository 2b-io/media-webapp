import * as types from './types'

export const fetchProjects = () => ({
  type: types.FETCH
})

export const fetchProjectsCompleted = projects => ({
  type: types.FETCH_COMPLETED,
  payload: { projects }
})

export const fetchProjectsFailed = reason => ({
  type: types.FETCH_COMPLETED,
  payload: { reason }
})

export const createProject = project => ({
  type: types.CREATE,
  payload: { project }
})

export const createProjectCompleted = project => ({
  type: types.CREATE_COMPLETED,
  payload: { project }
})

export const createProjectFailed = reason => ({
  type: types.CREATE_FAILED,
  payload: { reason }
})

// export const updateListProject = (project) => ({
//   type: types.UPDATE,
//   payload: project
// })
