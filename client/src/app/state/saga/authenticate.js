import delay from 'delay'
import { all, call, fork, put, select, take } from 'redux-saga/effects'

import Session from 'models/session'
import { actions, selectors, types } from 'state/interface'

const signIn = function*({ credential }) {
  try {
    const session = yield call(Session.create, credential)

    yield all([
      put(actions.createSessionCompleted(session)),
      put(actions.requestLocation('/')),
      put(actions.openLayout())
    ])
  } catch (e) {
    throw e
  }
}

const signOut = function*() {
  yield all([
    put(actions.destroySessionCompleted()),
    put(actions.requestLocation('/sign-in'))
  ])
}

const loop = function*() {
  while (true) {
    const action = yield take(types['SESSION/CREATE'])

    try {
      yield call(signIn, action.payload)
    } catch(e) {
      continue
    }

    yield take(types['SESSION/DESTROY'])

    yield call(signOut)
  }
}

export default function*() {
  yield take('@@INITIALIZED')

  yield fork(loop)
}
