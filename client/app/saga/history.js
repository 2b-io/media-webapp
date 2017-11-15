import { take, put } from 'redux-saga/effects'

import { HISTORY, pushHistory, popHistory, replaceHistory } from 'actions/history'

export function *historyPush() {
  while (true) {
    let action = yield take(HISTORY.PUSH)

    yield put(pushHistory(action.pathname))
  }
}

export function *historyPop() {
  while (true) {
    let action = yield take(HISTORY.POP)

    yield put(popHistory(action.pathname))
  }
}
