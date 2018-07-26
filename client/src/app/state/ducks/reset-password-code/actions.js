import * as types from './types'

export const fetchEmail = email => ({
  type: types.FETCH_EMAIL,
  payload: email
})
export const fetchEmailCompleted = status => ({
  type: types.FETCH_EMAIL_COMPLETED,
  payload: status
})
export const fetchEmailFailed = error => ({
  type: types.FETCH_EMAIL_FAILED,
  payload: error
})

export const fetchPasswordReset = (password, code) => ({
  type: types.FETCH_PASSWORD_RESET,
  payload: { password, code }
})
export const fetchPasswordResetCompleted = statusReset => ({
  type: types.FETCH_PASSWORD_RESET_COMPLETED,
  payload: statusReset
})
export const fetchPasswordResetFailed = error => ({
  type: types.FETCH_PASSWORD_RESET_FAILED,
  payload: error
})

export const getResetCode = code => ({
  type: types.GET_RESET_CODE,
  payload: code
})
export const getResetCodeCompleted = resetPasswordCode => ({
  type: types.GET_RESET_CODE_COMPLETED,
  payload: resetPasswordCode
})
export const getResetCodeFailed = error => ({
  type: types.GET_RESET_CODE_FAILED,
  payload: error
})
