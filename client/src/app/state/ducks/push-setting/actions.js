import * as types from './types'

export const getPushSetting = identifier => ({
  type: types.GET,
  payload: { identifier }
})
export const getPushSettingCompleted = ({ identifier, pushSetting }) => ({
  type: types.GET_COMPLETED,
  payload: ({ identifier, pushSetting })
})
export const getPushSettingFailed = (reason) => ({
  type: types.GET_FAILED,
  payload: { reason }
})

export const updatePushSetting = ({ identifier, pushSetting }) => ({
  type: types.UPDATE,
  payload: { identifier, pushSetting }
})
export const updatePushSettingCompleted = ({ identifier, pushSetting }) => ({
  type: types.UPDATE_COMPLETED,
  payload: { identifier, pushSetting }
})
export const updatePushSettingFailed = (reason) => ({
  type: types.UPDATE_FAILED,
  payload: { reason }
})
