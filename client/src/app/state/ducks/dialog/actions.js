import * as types from './types'

export const hideDialog = (name) => ({
  type: `${ types.HIDE }:${ name }`,
  payload: { name }
})

export const showDialog = (name,  params = {}) => ({
  type: `${ types.SHOW }:${ name }`,
  payload: { name, params }
})
