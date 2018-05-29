import delay from 'delay'
import { all, call, fork, put, select, take } from 'redux-saga/effects'

import { actions, selectors, types } from 'state/interface'

const signIn = function*() {
  // TODO call API in real life
  yield call(delay, 500)

  yield all([
    put(actions.createSessionCompleted('xxx')),
    put(actions.requestLocation('/')),
    put(actions.openLayout())
  ])
}

const signOut = function*() {
  // TODO call API in real life
  yield call(delay, 500)

  yield all([
    put(actions.destroySessionCompleted()),
    put(actions.requestLocation('/sign-in'))
  ])
}

const loop = function*() {
  while (true) {
    yield take(types['SESSION/CREATE'])

    yield call(signIn)

    yield take(types['SESSION/DESTROY'])

    yield call(signOut)
  }
}

export default function*() {
  yield take('@@INITIALIZED')

  yield fork(loop)

  const isSignedIn = yield select(selectors.isSignedIn)

  if (!isSignedIn) {
    yield put(actions.requestLocation('/sign-in'))
  }
}
