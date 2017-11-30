import { fork } from 'redux-saga/effects'

import { historyPush, historyPop } from 'saga/location'
import profile from 'saga/profile'
import session from 'saga/session'
import tenant from 'saga/tenant'

function *root() {
  yield fork(historyPush)
  yield fork(historyPop)

  yield fork(profile)
  yield fork(session)
  yield fork(tenant)
}

export default root
