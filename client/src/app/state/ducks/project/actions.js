import * as types from './types'

export const receiveProjects = projects => {
  console.log('projects ListProject ===>',projects);
  return {
    type: types.RECEIVE_LIST,
    payload: projects
  }
}

export const getListProject = token => {
  return {
    type: types.REQUEST_LIST,
    payload: token
  }
}
