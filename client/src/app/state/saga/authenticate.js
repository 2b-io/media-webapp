import { put, take } from 'redux-saga/effects'

import { types } from 'state/interface'
import { actions } from 'state/interface'

export default function*() {
  while (true) {
    yield take(types['SESSION/CREATE'])

    yield put(actions.createSessionCompleted())
  }
}
