import delay from 'delay'
import ms from 'ms'
import { call, fork, put, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'

const removeToast = function*({ expiring, id }) {
  yield call(delay, ms(expiring) + 200)
  yield put(actions.removeToast(id))
}

const removeToastLoop = function*() {
  while (true) {
    const { payload } = yield take(types.toast.ADD)

    if (payload.toast.expiring) {
      yield fork(removeToast, payload.toast)
    }
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(removeToastLoop)
}


