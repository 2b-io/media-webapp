import delay from 'delay'
import ms from 'ms'
import { call, fork, put } from 'redux-saga/effects'

import { actions } from 'state/interface'

const expiring = '5s'

const toast = function*({ message, type }) {
  const id = Date.now().toString()

  yield put(actions.addToast({
    id,
    expiring,
    message,
    type,
  }))

  yield call(delay, ms(expiring) + 200)

  yield put(actions.removeToast(id))
}

export const addToast = function*({ message, type }) {
  yield fork(toast, { message, type })
}
