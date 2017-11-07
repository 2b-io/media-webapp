import { take, put } from 'redux-saga/effects'

import HISTORY from 'components/History/actions'

import { pushHistory, popHistory, replaceHistory } from 'core/actions'

export function *historyPush() {
  while (true) {
    let action = yield take(HISTORY.PUSH)

    console.log(`history push to ${action.pathname}`)

    yield put(pushHistory(action.pathname))
  }
}

export function *historyPop() {
  while (true) {
    let action = yield take(HISTORY.POP)

    console.log(`history pop to ${action.pathname}`)

    yield put(popHistory(action.pathname))

    // TODO should call API for validating current session
    let requiresSignIn = false //action.pathname === '/profile'

    if (requiresSignIn) {
      yield put(replaceHistory('/sign-in'))
    }
  }
}
