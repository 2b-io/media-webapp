import * as types from './types'

export const hideMenuMore = () => ({
  type: types.HIDE,
  payload: false
})

export const showMenuMore = () => ({
  type: types.SHOW,
  payload: true
})
