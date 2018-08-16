import * as types from './types'

export const createSession = credential => ({
  type: types.CREATE,
  payload: { credential }
})

export const restoreSession = session => ({
  type: types.CREATE,
  payload: { session }
})

export const createSessionCompleted = info => ({
  type: types.CREATE_COMPLETED,
  payload: { info }
})

export const createSessionFailed = reason => ({
  type: types.CREATE_FAILED,
  payload: { reason }
})

export const destroySession = () => ({
  type: types.DESTROY
})

export const destroySessionCompleted = () => ({
  type: types.DESTROY_COMPLETED
})
