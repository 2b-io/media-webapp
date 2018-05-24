import * as types from './types'

export const createSession = info => ({
  type: types.CREATE,
  payload: { info }
})

export const destroySession = () => ({
  type: types.DESTROY
})

export const createSessionCompleted = info => ({
  type: types.CREATE_COMPLETED,
  payload: { info }
})

export const destroySessionCompleted = () => ({
  type: types.DESTROY_COMPLETED
})
