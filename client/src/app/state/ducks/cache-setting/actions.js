import * as types from './types'

export const createCacheSetting = identifier => ({
  type: types.CREATE,
  payload: { identifier }
})
export const createCacheSettingCompleted = ({ identifier, expired }) => ({
  type: types.CREATE_COMPLETED,
  payload: ({ identifier, expired })
})
export const createCacheSettingFailed = (reason) => ({
  type: types.CREATE_FAILED,
  payload: { reason }
})

export const getCacheSetting = identifier => ({
  type: types.GET,
  payload: { identifier }
})
export const getCacheSettingCompleted = ({ identifier, expired }) => ({
  type: types.GET_COMPLETED,
  payload: ({ identifier, expired })
})
export const getCacheSettingFailed = (reason) => ({
  type: types.GET_FAILED,
  payload: { reason }
})

export const updateCacheSetting = ({ identifier, expired }) => ({
  type: types.UPDATE,
  payload: { identifier, expired }
})
export const updateCacheSettingCompleted = ({ identifier, expired }) => ({
  type: types.UPDATE_COMPLETED,
  payload: { identifier, expired }
})
export const updateCacheSettingFailed = (reason) => ({
  type: types.UPDATE_FAILED,
  payload: { reason }
})
