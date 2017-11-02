import { fork } from 'redux-saga/effects'

import { historyPush, historyPop } from 'components/Router/saga'

function *root() {
  yield fork(historyPush)
  yield fork(historyPop)
}

export default root
