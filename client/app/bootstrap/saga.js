import { fork } from 'redux-saga/effects'

import { historyPush, historyPop } from 'saga/history'

function *root() {
  yield fork(historyPush)
  yield fork(historyPop)
}

export default root
