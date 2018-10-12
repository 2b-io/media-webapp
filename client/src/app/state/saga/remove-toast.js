import delay from 'delay'
import ms from 'ms'
import { call, fork, put, race, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'

const expiring = '5s'

const removeToastLoop = function*() {
  while (true) {
    const { addToast, removeToast } = yield race({
      addToast: take(types.toast.ADD),
      removeToast: take(types.toast.REMOVE)
    })

    if (removeToast) {
      continue
    }

    yield call(delay, ms(expiring) + 200)
    yield put(actions.removeToast(addToast.payload.toast.id))
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(removeToastLoop)
}
