import { fork, take, put } from 'redux-saga/effects'

import { AJAX } from 'actions/ajax'

export function* watchAjaxRequest() {
  while (true) {
    const action = yield take(action => {
      return action.type.match(/_REQUEST$/)
    })

    console.log('ajax request', action)
  }
}

export function* watchAjaxSuccessResponse() {
  while (true) {
    const action = yield take(action => {
      return action.type.match(/_SUCCESS$/)
    })

    console.log('ajax success', action)
  }
}

export function* watchAjaxFailureResponse() {
  while (true) {
    const action = yield take(action => {
      return action.type.match(/_FAILURE$/)
    })

    console.log('ajax failure', action)
  }
}

export default function* root() {
  yield fork(watchAjaxRequest)
  yield fork(watchAjaxSuccessResponse)
  yield fork(watchAjaxFailureResponse)
}
