import { fork } from 'redux-saga/effects'

import account from 'saga/account'
import ajax from 'saga/ajax'
import bootstrap from 'saga/bootstrap'
import interactions from 'saga/interactions'
// import modal from 'saga/modal'
import preset from 'saga/preset'
import project from 'saga/project'
import routing from 'saga/routing'
import session from 'saga/session'


function *root() {
  // init
  yield fork(bootstrap)

  // core
  yield fork(interactions)
  // yield fork(modal)
  yield fork(routing)
  yield fork(session)

  // domain
  yield fork(account)
  yield fork(preset)
  yield fork(project)
}

export default root
