import * as types from './types'

export const hideMenuMore = isOpen => ({
  type: types.HIDE,
  payload: { isOpen }
})

export const showMenuMore = isOpen => ({
  type: types.SHOW,
  payload: { isOpen }
})
