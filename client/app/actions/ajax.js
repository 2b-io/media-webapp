import prefix from 'helpers/prefix-map'

export const SUFFIXS = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
}

export const AJAX = prefix('ajax', {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  CLEAR: 'CLEAR'
})

export const KEYWORDS = prefix('@@ajax', {
  IGNORE: 'ignore',
  ID: 'id'
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
