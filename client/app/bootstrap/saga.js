import { fork } from 'redux-saga/effects'

// import { historyPush, historyPop } from 'saga/location'
import ajax from 'saga/ajax'
import location from 'saga/location'
import account from 'saga/account'
import session from 'saga/session'
import tenant from 'saga/tenant'

function *root() {
  yield fork(ajax)
  yield fork(session)
  yield fork(account)
  yield fork(location)
  yield fork(tenant)
}

export default root
