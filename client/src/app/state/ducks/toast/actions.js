import * as types from './types'

export const addToast = toast => ({
  type: types.ADD,
  payload: { toast }
})

export const removeToast = id => ({
  type: types.REMOVE,
  payload: { id }
})
