import { fork } from 'redux-saga/effects'

import account from 'saga/account'
import ajax from 'saga/ajax'
// import location from 'saga/location'
import project from 'saga/project'
import routing from 'saga/routing'
import session from 'saga/session'

function *root() {
  // core
  yield fork(ajax)
  // yield fork(routing)
  yield fork(session)

  // data
  yield fork(account)
  yield fork(project)
}

export default root
