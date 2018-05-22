import delay from 'delay'
import { put, race, take } from 'redux-saga/effects'
import * as types from './types'
import { accept } from './actions'

export default function*() {
  while (true) {
    const { init, request } = yield race({
      init: take(types.INIT),
      request: take(types.REQUEST)
    })

    if (init) {
      yield delay(5e3)
    }

    // check auth here
    yield put(accept(init || request).payload.pathname)
  }
}
