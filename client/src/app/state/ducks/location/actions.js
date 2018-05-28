import * as types from './types'

export const acceptLocation = pathname => ({
  type: types.ACCEPT,
  payload: { pathname }
})

export const initLocation = pathname => ({
  type: types.INIT,
  payload: { pathname }
})

export const rejectLocation = (pathname, error) => ({
  type: types.REQUEST,
  payload: { pathname: '/', error }
})

export const requestLocation = pathname => ({
  type: types.REQUEST,
  payload: { pathname }
})
