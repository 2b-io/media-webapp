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

export const changePasswordFailed = (reason) => ({
  type: types.CHANGE_PASSWORD_FAILED,
  payload: { reason }
})

export const getAccount = (id) => ({
  type: types.GET,
  payload: { id }
})

export const getAccountCompleted = (account) => ({
  type: types.GET_COMPLETED,
  payload: { account }
})

export const getAccountFailed = (reason) => ({
  type: types.GET_FAILED,
  payload: { reason }
})

export const register = (email) => ({
  type: types.REGISTER,
  payload: { email }
})

export const registerCompleted = (account) => ({
  type: types.REGISTER_COMPLETED,
  payload: { account }
})

export const registerFailed = (reason) => ({
  type: types.REGISTER_FAILED,
  payload: { reason }
})

export const searchAccount = (email) => ({
  type: types.SEARCH_ACCOUNT,
  payload: { email }
})

export const searchAccountCompleted = (account) => ({
  type: types.SEARCH_ACCOUNT_COMPLETED,
  payload: { account }
})

export const searchAccountFailed = (reason) => ({
  type: types.SEARCH_ACCOUNT_FAILED,
  payload: { reason }
})

export const updateProfile = (account) => ({
  type: types.UPDATE,
  payload: { account }
})

export const updateProfileCompleted = (account) => ({
  type: types.UPDATE_COMPLETED,
  payload: { account }
})

export const updateProfileFailed = (reason) => ({
  type: types.UPDATE_FAILED,
  payload: { reason }
})
