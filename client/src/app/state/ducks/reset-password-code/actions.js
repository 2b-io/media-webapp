import * as types from './types'

export const forgotPassword = email => ({
  type: types.FORGOT_PASSWORD,
  payload: email
})
export const forgotPasswordCompleted = status => ({
  type: types.FORGOT_PASSWORD_COMPLETED,
  payload: status
})
export const forgotPasswordFailed = error => ({
  type: types.FORGOT_PASSWORD_FAILED,
  payload: error
})

export const resetPassword = (password, code) => ({
  type: types.RESET_PASSWORD,
  payload: { password, code }
})
export const resetPasswordCompleted = statusReset => ({
  type: types.RESET_PASSWORD_COMPLETED,
  payload: statusReset
})
export const resetPasswordFailed = error => ({
  type: types.RESET_PASSWORD_FAILED,
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
