import * as types from './types'

export const receiveProjects = ({account}) => {
  return {
    type: types.RECEIVE_LIST,
    payload: account.projects
  }
}

export const getListProject = token => {
  return {
    type: types.REQUEST_LIST,
    payload: token
  }
}
