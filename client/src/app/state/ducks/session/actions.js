import * as types from './types'

export const create = info => ({
  type: types.CREATE,
  payload: { info },
  meta: {
    async: true,
    blocking: true
  }
})

export const destroy = () => ({
  type: types.DESTROY
})

export const createCompleted = info => ({
  type: types.CREATE_COMPLETED,
  payload: { info }
})
