import { fork } from 'redux-saga/effects'

import ajax from 'saga/ajax'
import location from 'saga/location'
import account from 'saga/account'
import session from 'saga/session'

function *root() {
  yield fork(ajax)
  yield fork(session)
  yield fork(account)
  yield fork(location)
}

export default root
