import { fork } from 'redux-saga/effects'

import { historyPush, historyPop } from 'saga/location'
import profile from 'saga/profile'
import session from 'saga/session'

function *root() {
  yield fork(historyPush)
  yield fork(historyPop)

  yield fork(profile)

  yield fork(session)
}

export default root
