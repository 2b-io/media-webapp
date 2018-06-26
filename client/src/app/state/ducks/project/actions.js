import * as types from './types'

export const receiveProjects = (projects) => ({
  type: types.FETCH_COMPLETED,
  payload: { projects }
})

export const fetchProjects = () => ({
  type: types.FETCH
})

export const createProject = ( name, slug, prettyOrigin, origins ) => ({
  type: types.CREATE,
  payload: { name, slug, prettyOrigin, origins }
})

export const responseProject = ( project ) => ({
  type: types.CREATE_COMPLETED,
  payload: { project }
})

export const updateListProject = ( project ) => ({
  type: types.UPDATE,
  payload: project
})
