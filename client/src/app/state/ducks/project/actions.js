import * as types from './types'

export const receiveProjects = (projects) => ({
  type: types.FETCH_COMPLETED,
  payload: { projects }
})

export const fetchProjects = () => ({
  type: types.FETCH
})
