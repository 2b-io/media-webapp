import * as types from './types'

export const fetchEmail = email => ({
  type: types.FETCH,
  payload:  email
})
export const receiveEmailExist = emailExist => ({
  type: types.FETCH_COMPLETED,
  payload:  emailExist
})
export const fetchResetPassword = (password,code,id) => ({
  type: types.FETCH_PASSWORD,
  payload:  {password,code,id}
})
export const receiveResetPassword = statusResetPassword => ({
  type: types.FETCH_PASSWORD_COMPLETED,
  payload:  statusResetPassword
})
