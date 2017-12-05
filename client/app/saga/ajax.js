import { fork, take, put } from 'redux-saga/effects'

import { AJAX, KEYWORDS, SUFFIXS } from 'actions/ajax'

const REQUEST = new RegExp(`_${SUFFIXS.REQUEST}$`)
const SUCCESS = new RegExp(`_${SUFFIXS.SUCCESS}$`)
const FAILURE = new RegExp(`_${SUFFIXS.FAILURE}$`)

export function* watchAjaxRequest() {
  while (true) {
    const action = yield take(action => {
      if (!action.type) return

      return action.type.match(REQUEST)
    })

    if (action[KEYWORDS.IGNORE]) continue

    console.log('ajax request', action)
  }
}

export function* watchAjaxSuccessResponse() {
  while (true) {
    const action = yield take(action => {
      if (!action.type) return

      return action.type.match(SUCCESS)
    })

    if (action[KEYWORDS.IGNORE]) continue

    console.log('ajax success', action)
  }
}

export function* watchAjaxFailureResponse() {
  while (true) {
    const action = yield take(action => {
      if (!action.type) return

      return action.type.match(FAILURE)
    })

    if (action[KEYWORDS.IGNORE]) continue

    console.log('ajax failure', action)
  }
}

export default function* root() {
  yield fork(watchAjaxRequest)
  yield fork(watchAjaxSuccessResponse)
  yield fork(watchAjaxFailureResponse)
}
