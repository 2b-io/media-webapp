import * as types from './types'

export const closeLayout = () => ({
  type: types.CLOSE
})

export const openLayout = () => ({
  type: types.OPEN
})

export const updateStillHeight = height => ({
  type: types.UPDATE_STILL_HEIGHT,
  payload: { height }
})
