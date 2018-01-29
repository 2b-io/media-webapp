import prefix from 'helpers/prefix-map'

export const MODAL = prefix('modal', {
  OPEN: 'OPEN',
  DISMISS: 'DISMISS'
})

export function openModal(id, data) {
  return {
    type: MODAL.OPEN,
    payload: {
      id,
      data
    }
  }
}

export function dismissModal(id) {
  return {
    type: MODAL.DISMISS,
    payload: {
      id
    }
  }
}
