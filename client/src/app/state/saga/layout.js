import delay from 'delay'
import { fork, put, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'

const loop = function*() {
  while (true) {
    yield take(types.layout.CLOSE)

    yield delay(500)

    yield put(actions.destroySession())
  }
}

export default function*() {
  yield take('@@INITIALIZED')

  yield fork(loop)
}
