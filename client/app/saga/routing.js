import nprogress from 'nprogress'
import { fork, take, put, select, race } from 'redux-saga/effects'

import { toggleSystemDrawer } from 'actions/drawer'
import { LAYOUT } from 'actions/layout'
import { ROUTING, redirect } from 'actions/routing'
import { SESSION } from 'actions/session'

function drawerIsOpen(layout) {
  return state => {
    return !!(state.burgerMenu[layout] && state.burgerMenu[layout].isOpen)
  }
}

function* screenFlow() {
  while (true) {
    const action = yield race({
      destroySession: take(SESSION.DESTROY_SUCCESS)
    })

    if (action.destroySession) {
      yield put(redirect('/sign-in'))
    }
  }
}

function* watchUnauthorizedAccesses() {
  while (true) {
    const action = yield take(ROUTING.REJECT)

    const token = yield select(state => state.app.session.token)

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

function* routingTransition() {
  while (true) {
    const { request, accept } = yield race({
      request: take(ROUTING.REQUEST),
      accept: take(ROUTING.ACCEPT)
    })

    if (request) {
      console.log('x')
      nprogress.start()
    }

    if (accept) {
      console.log('y')
      nprogress.done()
    }
  }
}

export default function* root() {
  // yield fork(screenFlow)
  yield fork(toggleDrawer)
  yield fork(watchUnauthorizedAccesses)
  // yield fork(routingTransition)
}
