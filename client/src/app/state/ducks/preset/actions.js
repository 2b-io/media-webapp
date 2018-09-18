import * as types from './types'

export const create = ({ preset, identifier }) => ({
  type: types.CREATE,
  payload: ({ preset, identifier })
})
export const createCompleted = ({ preset, identifier }) => ({
  type: types.CREATE_COMPLETED,
  payload: ({ preset, identifier })
})
export const createFailed = reason => ({
  type: types.CREATE_FAILED,
  payload: { reason }
})

export const getPreset = ({ identifier, contentType }) => ({
  type: types.GET,
  payload: { identifier, contentType }
})
export const getPresetCompleted = ({ preset, identifier }) => ({
  type: types.GET_COMPLETED,
  payload: { preset, identifier }
})
export const getPresetFailed = reason => ({
  type: types.GET_FAILED,
  payload: { reason }
})

export const updatePreset = ({ preset }) => ({
  type: types.UPDATE,
  payload: { preset }
})
export const updatePresetCompleted = ({ preset }) => ({
  type: types.UPDATE_COMPLETED,
  payload: { preset }
})
export const updatePresetFailed = reason => ({
  type: types.UPDATE_FAILED,
  payload: { reason }
})

export const removePreset = ({ preset, identifier }) => ({
  type: types.DELETE,
  payload: { preset, identifier }
})
export const removePresetCompleted = ({ preset, identifier }) => ({
  type: types.DELETE_COMPLETED,
  payload: { preset, identifier }
})
export const removePresetFailed = reason => ({
  type: types.DELETE_FAILED,
  payload: { reason }
})
