import * as types from './types'

export const hideMenu = (name) => ({
  type: types.HIDE,
  payload: { name }
})

export const showMenu = (name) => ({
  type: types.SHOW,
  payload: { name }
})
