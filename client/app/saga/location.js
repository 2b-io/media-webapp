import { take, put } from 'redux-saga/effects'

import { LOCATION, pushHistory, popHistory, replaceHistory } from 'actions/location'
import { verifySession } from 'actions/session'

export function *historyPush() {
  while (true) {
    let action = yield take(LOCATION.PUSH)

    yield put(pushHistory(action.pathname))
    yield put(verifySession())
  }
}

export function *historyPop() {
  while (true) {
    let action = yield take(LOCATION.POP)

    yield put(popHistory(action.pathname))
    yield put(verifySession())
  }
}
