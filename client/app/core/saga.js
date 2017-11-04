import { fork } from 'redux-saga/effects'

import { historyPush, historyPop } from 'core/effects/history'

function *root() {
  yield fork(historyPush)
  yield fork(historyPop)
}

export default root
