import * as types from './types'

export const hideModal = ({ modal }) => ({
  type: types.HIDE,
  payload: { modal }
})

export const showModal = ({ modal, params }) => ({
  type: types.SHOW,
  payload: { modal, params }
})
