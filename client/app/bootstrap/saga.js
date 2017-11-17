import { fork } from 'redux-saga/effects'

import { historyPush, historyPop } from 'saga/location'
import profile from 'saga/profile'

function *root() {
  yield fork(historyPush)
  yield fork(historyPop)

  yield fork(profile)
}

export default root
