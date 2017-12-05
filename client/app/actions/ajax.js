import prefix from 'helpers/prefix-map'

export const AJAX = prefix('ajax', {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  CLEAR: 'CLEAR'
})

export function ajaxSuccess(id, data) {
  return {
    type: AJAX.SUCCESS,
    payload: { id, data }
  }
}

export function ajaxFailure(id, reason) {
  return {
    type: AJAX.FAILURE,
    payload: { id, reason }
  }
}

export function ajaxClear(id) {
  return {
    type: AJAX.CLEAR,
    payload: { id }
  }
}
