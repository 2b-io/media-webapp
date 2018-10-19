import * as types from './types'

export const getCacheSetting = (identifier) => ({
  type: types.GET,
  payload: { identifier }
})
export const getCacheSettingCompleted = ({ identifier, cacheSetting }) => ({
  type: types.GET_COMPLETED,
  payload: ({ identifier, cacheSetting })
})
export const getCacheSettingFailed = (reason) => ({
  type: types.GET_FAILED,
  payload: { reason }
})

export const updateCacheSetting = ({ identifier, cacheSetting }) => ({
  type: types.UPDATE,
  payload: { identifier, cacheSetting }
})
export const updateCacheSettingCompleted = ({ identifier, cacheSetting }) => ({
  type: types.UPDATE_COMPLETED,
  payload: { identifier, cacheSetting }
})
export const updateCacheSettingFailed = (reason) => ({
  type: types.UPDATE_FAILED,
  payload: { reason }
})
