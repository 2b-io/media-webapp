import * as types from './types'

export const accept = pathname => ({
  type: types.ACCEPT,
  payload: { pathname }
})

export const init = pathname => ({
  type: types.INIT,
  payload: { pathname }
})

export const request = pathname => ({
  type: types.REQUEST,
  payload: { pathname }
})
