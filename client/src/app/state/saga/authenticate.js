import { all, call, fork, put, select, take } from 'redux-saga/effects'

import { actions, selectors, types } from 'state/interface'

const signIn = function*() {
  yield all([
    put(actions.createSessionCompleted('xxx')),
    put(actions.requestLocation('/')),
    put(actions.openLayout())
  ])
}

const signOut = function*() {
  yield all([
    put(actions.destroySessionCompleted()),
    put(actions.requestLocation('/sign-in'))
  ])
}

const authLoop = function*() {
  while (true) {
    yield take(types['SESSION/CREATE'])

    yield call(signIn)

    yield take(types['SESSION/DESTROY'])

    yield call(signOut)
  }
}

export default function*() {
  yield take('@@initialized')

  yield fork(authLoop)

  const isSignedIn = yield select(selectors.isSignedIn)

  if (!isSignedIn) {
    yield put(actions.requestLocation('/sign-in'))
  }
}
