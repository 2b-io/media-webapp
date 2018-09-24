import * as types from './types'

export const hideMenuMore = (name) => ({
  type: types.HIDE,
  payload: { name }
})

export const showMenuMore = (name) => ({
  type: types.SHOW,
  payload: { name }
})
