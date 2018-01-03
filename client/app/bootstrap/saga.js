import { fork } from 'redux-saga/effects'

import account from 'saga/account'
import ajax from 'saga/ajax'
import location from 'saga/location'
import project from 'saga/project'
import session from 'saga/session'

function *root() {
  // core
  yield fork(ajax)
  yield fork(session)
  yield fork(location)

  // data
  yield fork(account)
  yield fork(project)
}

export default root
