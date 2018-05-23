import { put, take } from 'redux-saga/effects'

import { types } from 'state/ducks/session'
import { actions } from 'state/interface'

export default function*() {
  while (true) {
    yield take(types.CREATE)

    yield put(actions.createSessionCompleted())
  }
}
