import nprogress from 'nprogress'
import { fork, take, put, select, race } from 'redux-saga/effects'

import { toggleSystemDrawer } from 'actions/drawer'
import { LAYOUT } from 'actions/layout'
import { PROJECT } from 'actions/project'
import { ROUTING, redirect } from 'actions/routing'
import { SESSION } from 'actions/session'

function drawerIsOpen(layout) {
  return state => {
    return !!(state.burgerMenu[layout] && state.burgerMenu[layout].isOpen)
  }
}

function* watchUnauthorizedAccesses() {
  while (true) {
    const action = yield take(ROUTING.REJECT)

    const token = yield select(state => state.domain.session.token)

    if (token) {
      yield put({
        type: SESSION.DESTROY_REQUEST
      })
    } else {
      yield put(redirect('/sign-in'))
    }
  }
}

function* toggleDrawer() {
  while (true) {
    yield take(ROUTING.ACCEPT)

    const systemDrawerIsOpen = yield select(drawerIsOpen(LAYOUT.SYSTEM_MODE))

    if (systemDrawerIsOpen) {
      yield put(toggleSystemDrawer(false))
    }
  }
}

export default function* root() {
  yield fork(toggleDrawer)
  yield fork(watchUnauthorizedAccesses)
}
