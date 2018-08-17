import * as types from './types'

export const hideDialog = ({ dialog }) => ({
  type: types.HIDE,
  payload: { dialog }
})

export const showDialog = ({ dialog }) => ({
  type: types.SHOW,
  payload: { dialog }
})
