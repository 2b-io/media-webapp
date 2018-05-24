import * as types from './types'

export const createSession = info => ({
  type: types.CREATE,
  payload: { info },
  meta: {
    async: true,
    blocking: true
  }
})

export const destroySession = () => ({
  type: types.DESTROY
})

export const createSessionCompleted = info => ({
  type: types.CREATE_COMPLETED,
  payload: { info }
})
