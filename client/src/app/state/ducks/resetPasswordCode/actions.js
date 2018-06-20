import * as types from './types'

export const fetchEmail= email => ({
  type: types.FETCH,
  payload:  email
})
