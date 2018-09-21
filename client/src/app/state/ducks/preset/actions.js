import * as types from './types'


export const fetchPresets = ({ identifier }) => ({
  type: types.FETCH,
  payload: { identifier }
})
export const fetchPresetsCompleted = ({ presets, identifier }) => ({
  type: types.FETCH_COMPLETED,
  payload: { presets, identifier }
})
export const fetchPresetsFailed = reason => ({
  type: types.FETCH_FAILED,
  payload: { reason }
})


export const createPreset = ({ identifier, contentType }) => ({
  type: types.CREATE,
  payload: ({ identifier, contentType })
})
export const createPresetCompleted = ({ identifier, preset }) => ({
  type: types.CREATE_COMPLETED,
  payload: ({ preset, identifier })
})
export const createPresetFailed = reason => ({
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

export const updatePreset = ({ preset, identifier }) => ({
  type: types.UPDATE,
  payload: { preset, identifier }
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
