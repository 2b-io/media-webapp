import * as types from './types'

export const hideDialog = (name) => ({
  type: types.HIDE,
  payload: { name }
})

export const showDialog = (name,  params = {}) => ({
  type: types.SHOW,
  payload: { name, params }
})
