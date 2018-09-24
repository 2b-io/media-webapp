import * as types from './types'

export const getSecretKey = identifier => ({
  type: types.GET,
  payload: { identifier }
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
