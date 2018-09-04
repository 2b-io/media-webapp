import * as types from './types'

export const copyMediaLink = () => ({
  type: types.COPY_MEDIA_LINK,
  payload: null
})

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

export const removeProjectMedia = (slug, id ) => ({
  type: types.REMOVE_PROJECT_MEDIA,
  payload: { slug, id }
})

export const removeProjectMediaCompleted = id => ({
  type: types.REMOVE_PROJECT_MEDIA_COMPLETED,
  payload: { id }
})

export const removeProjectMediaFailed = reason => ({
  type: types.REMOVE_PROJECT_MEDIA_FAILED,
  payload: { reason }
})
