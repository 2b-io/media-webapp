import * as types from './types'

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
