import * as types from './types'

export const listInvalidateCache = (projectIdentifier) => ({
  type: types.LIST_INVALIDATE_CACHE,
  payload: { projectIdentifier }
})

export const listInvalidateCacheCompleted = (invalidateCaches) => ({
  type: types.LIST_INVALIDATE_CACHE_COMPLETED,
  payload: { invalidateCaches }
})

export const listInvalidateCacheFailed = reason => ({
  type: types.LIST_INVALIDATE_CACHE_FAILED,
  payload: { reason }
})

export const invalidateCache = (projectIdentifier, patterns) => ({
  type: types.INVALIDATE_CACHE,
  payload: { projectIdentifier, patterns }
})

export const invalidateCacheCompleted = () => ({
  type: types.INVALIDATE_CACHE_COMPLETED
})

export const invalidateCacheFailed = reason => ({
  type: types.INVALIDATE_CACHE_FAILED,
  payload: { reason }
})
