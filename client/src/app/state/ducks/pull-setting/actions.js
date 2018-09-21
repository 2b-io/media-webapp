import * as types from './types'

export const getPullSetting = identifier => ({
  type: types.GET,
  payload: { identifier }
})
export const getPullSettingCompleted = ({ identifier, pullSetting }) => ({
  type: types.GET_COMPLETED,
  payload: ({ identifier, pullSetting })
})
export const getPullSettingFailed = (reason) => ({
  type: types.GET_FAILED,
  payload: { reason }
})

export const updatePullSetting = ({ identifier, pullSetting }) => ({
  type: types.UPDATE,
  payload: { identifier, pullSetting }
})
export const updatePullSettingCompleted = ({ identifier, pullSetting }) => ({
  type: types.UPDATE_COMPLETED,
  payload: { identifier, pullSetting }
})
export const updatePullSettingFailed = (reason) => ({
  type: types.UPDATE_FAILED,
  payload: { reason }
})
