import * as types from './types'

export const acceptLocation = (pathname) => ({
  type: types.ACCEPT,
  payload: { pathname }
})

export const initLocation = (pathname) => ({
  type: types.INIT,
  payload: { pathname }
})

export const rejectLocation = (pathname, error) => ({
  type: types.REQUEST,
  payload: { pathname: '/', error }
})

export const requestLocation = (pathname) => ({
  type: types.REQUEST,
  payload: { pathname }
})

export const updateLocationKey = (key) => ({
  type: types.UPDATE_KEY,
  payload: { key }
})

export const updateParams = (payload) => ({
  type: types.UPDATE_PARAMS,
  payload
})
