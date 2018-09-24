import * as types from './types'

export const createSecretKey = identifier => ({
  type: types.GET,
  payload: { identifier }
})
export const createSecretKeyCompleted = ({ identifier, secretKey }) => ({
  type: types.GET_COMPLETED,
  payload: ({ identifier, secretKey })
})
export const createSecretKeyFailed = (reason) => ({
  type: types.GET_FAILED,
  payload: { reason }
})

export const listSecretKeys = identifier => ({
  type: types.GET,
  payload: { identifier }
})
export const listSecretKeysCompleted = ({ identifier, secretKeys }) => ({
  type: types.GET_COMPLETED,
  payload: ({ identifier, secretKeys })
})
export const listSecretKeysFailed = (reason) => ({
  type: types.GET_FAILED,
  payload: { reason }
})

export const getSecretKey = ({ identifier, key }) => ({
  type: types.GET,
  payload: { identifier, key }
})
export const getSecretKeyCompleted = ({ identifier, secretKey }) => ({
  type: types.GET_COMPLETED,
  payload: ({ identifier, secretKey })
})
export const getSecretKeyFailed = (reason) => ({
  type: types.GET_FAILED,
  payload: { reason }
})

export const updateSecretKey = ({ identifier, secretKey }) => ({
  type: types.UPDATE,
  payload: { identifier, secretKey }
})
export const updateSecretKeyCompleted = ({ identifier, secretKey }) => ({
  type: types.UPDATE_COMPLETED,
  payload: { identifier, secretKey }
})
export const updateSecretKeyFailed = (reason) => ({
  type: types.UPDATE_FAILED,
  payload: { reason }
})

export const removeSecretKey = ({ identifier, key }) => ({
  type: types.REMOVE,
  payload: { identifier, key }
})
export const removeSecretKeyCompleted = ({ identifier, key }) => ({
  type: types.REMOVE_COMPLETED,
  payload: { identifier, key }
})
export const removeSecretKeyFailed = (reason) => ({
  type: types.REMOVE_FAILED,
  payload: { reason }
})
