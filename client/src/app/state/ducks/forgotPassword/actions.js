import * as types from './types'

export const fetchForgotPassword = email => { console.log('email',email); return ({
  type: types.FETCH,
  payload: { email }
})}
