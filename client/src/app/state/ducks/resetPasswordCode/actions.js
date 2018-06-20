import * as types from './types'

export const fetchEmail = email => ({
  type: types.FETCH,
  payload:  email
})
export const receiveEmailExist = emailExist => ({
  type: types.FETCH_COMPLETED,
  payload:  emailExist
})
