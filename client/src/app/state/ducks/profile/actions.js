import * as types from './types'

export const fetchPassword = (currentPassword, newPassword) => ({
  type: types.FETCH_PASSWORD,
  payload: { currentPassword, newPassword }
})
export const fetchPasswordCompleted = status => ({
  type: types.FETCH_PASSWORD_COMPLETED,
  payload: status
})
export const fetchPasswordFailed = error => ({
  type: types.FETCH_PASSWORD_FAILED,
  payload: error
})
