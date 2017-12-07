import prefix from 'helpers/prefix-map'

export const UI_STATE = prefix('ui-state', {
  CLEAR: 'CLEAR'
})

export function clearState(id) {
  return {
    type: UI_STATE.CLEAR,
    payload: { id }
  }
}
