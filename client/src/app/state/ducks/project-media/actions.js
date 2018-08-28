import * as types from './types'

export const fetchProjectMedia = slug => ({
  type: types.FETCH_PROJECT_MEDIA,
  payload: { slug }
})

export const fetchProjectMediaCompleted = projectMedia => ({
  type: types.FETCH_PROJECT_MEDIA_COMPLETED,
  payload: { projectMedia }
})

export const fetchProjectMediaFailed = reason => ({
  type: types.FETCH_PROJECT_MEDIA_FAILED,
  payload: { reason }
})
