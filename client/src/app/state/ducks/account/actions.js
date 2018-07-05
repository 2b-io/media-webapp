import * as types from './types'

export const changePassword = (currentPassword, newPassword) => ({
  type: types.CHANGE_PASSWORD,
  payload: {
    currentPassword,
    newPassword
  }
})

export const changePasswordCompleted = () => ({
  type: types.CHANGE_PASSWORD_COMPLETED
})

export const changePasswordFailed = reason => ({
  type: types.CHANGE_PASSWORD_FAILED,
  payload: { reason }
})

export const getAccount = id => ({
  type: types.GET,
  payload: { id }
})

export const getAccountCompleted = account => ({
  type: types.GET_COMPLETED,
  payload: { account }
})

export const getAccountFailed = reason => ({
  type: types.GET_FAILED,
  payload: { reason }
})

export const register = email => ({
  type: types.REGISTER,
  payload: { email }
})

export const registerCompleted = account => ({
  type: types.REGISTER_COMPLETED,
  payload: { account }
})

export const registerFailed = reason => ({
  type: types.REGISTER_FAILED,
  payload: { reason }
})
