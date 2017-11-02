import { take, put } from 'redux-saga/effects'

import HISTORY from 'components/History/actions'

export function *historyPush() {
  while (true) {
    let action = yield take(HISTORY.PUSH)

    console.log(`history push to ${action.pathname}`)

    yield put({
      type: HISTORY.PUSH_ACCEPTED,
      pathname: action.pathname
    })
  }
}

export function *historyPop() {
  while (true) {
    let action = yield take(HISTORY.POP)

    console.log(`history pop to ${action.pathname}`)

    yield put({
      type: HISTORY.POP_ACCEPTED,
      pathname: action.pathname
    })
  }
}
