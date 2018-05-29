import delay from 'delay'

import { call, put, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'

export default function*() {
  while (true) {
    yield take(types['LAYOUT/CLOSE'])

    yield call(delay, 1200)

    yield put(actions.destroySession())
  }
}
