import * as types from './types'

export const initializeUIState = (path, initialState) => ({
  type: types.INITIALIZE,
  payload: { path, initialState }
})

export const mergeUIState = (path, state) => ({
  type: types.MERGE,
  payload: { path, state }
})

export const replaceUIState = (path, state) => ({
  type: types.REPLACE,
  payload: { path, state }
})
