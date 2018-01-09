import { fork } from 'redux-saga/effects'

import account from 'saga/account'
import ajax from 'saga/ajax'
import bootstrap from 'saga/bootstrap'
// import location from 'saga/location'
import project from 'saga/project'
import routing from 'saga/routing'
import session from 'saga/session'
import userInteraction from 'saga/user-interaction'

function *root() {
  // init
  yield fork(bootstrap)

  // core
  // yield fork(ajax)
  yield fork(routing)
  yield fork(session)
  yield fork(userInteraction)

  // data
  yield fork(account)
  yield fork(project)
}

export default root
