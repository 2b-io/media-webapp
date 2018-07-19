import * as types from './types'

export const closeLayout = () => ({
  type: types.CLOSE
})

export const openLayout = () => ({
  type: types.OPEN
})

export const maximizeSidebar = () => ({
  type: types.MAXIMIZE_SIDEBAR
})

export const minimizeSidebar = () => ({
  type: types.MINIMIZE_SIDEBAR
})

export const updateStillHeight = height => ({
  type: types.UPDATE_STILL_HEIGHT,
  payload: { height }
})
