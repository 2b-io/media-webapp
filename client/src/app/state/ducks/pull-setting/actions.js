import * as types from './types'

export const getPullSetting = identifier => ({
  type: types.GET,
  payload: identifier
})
export const getPullSettingCompleted = pullSetting => ({
  type: types.GET_COMPLETED,
  payload: pullSetting
})
export const getPullSettingFailed = error => ({
  type: types.GET_FAILED,
  payload: error
})


export const updatePullSetting = pullSetting => ({
  type: types.UPDATE,
  payload: pullSetting
})
export const updatePullSettingCompleted = pullSetting => ({
  type: types.UPDATE_COMPLETED,
  payload: pullSetting
})
export const updatePullSettingFailed = error => ({
  type: types.UPDATE_FAILED,
  payload: error
})
