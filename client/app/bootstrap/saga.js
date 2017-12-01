import { fork } from 'redux-saga/effects'

// import { historyPush, historyPop } from 'saga/location'
import location from 'saga/location'
import profile from 'saga/profile'
import session from 'saga/session'
import tenant from 'saga/tenant'

function *root() {
  yield fork(session)
  yield fork(location)
  yield fork(profile)
  yield fork(tenant)
}

export default root
