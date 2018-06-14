import * as types from './types'

export const receiveProjects = (projects) => {
  return {
    type: types.RECEIVE_COMPLETED,
    payload: projects
  }
}

export const getListProject = () => {
  return {
    type: types.REQUEST_COMPLETED,
  }
}
