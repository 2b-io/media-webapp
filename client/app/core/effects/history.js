import { take, put } from 'redux-saga/effects'

import HISTORY from 'components/History/actions'

import { pushHistory, popHistory, replaceHistory } from 'core/actions'

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
