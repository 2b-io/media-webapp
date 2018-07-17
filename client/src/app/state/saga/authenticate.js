import { all, call, fork, put, take } from 'redux-saga/effects'

import Session from 'models/session'
import { actions, types } from 'state/interface'
import storage from 'services/storage'

import { addToast } from './toast'

const TOKEN = 'jwt'

const restoreSession = function*() {
  try {
    const token = yield call(storage.get, TOKEN)

    if (token) {
      const session = yield call(Session.refresh, token)

      yield put(actions.restoreSession(session))
    }
  } catch (e) {
    yield call(storage.clear, TOKEN)
  }
}

const loop = function*() {
  while (true) {
    const action = yield take(types['SESSION/CREATE'])
    const { credential } = action.payload

    try {
      const session = credential ?
        (yield call(Session.create, credential)) :
        action.payload.session

      yield all([
        call(storage.set, TOKEN, session.token),
        put(actions.createSessionCompleted(session)),
        put(actions.requestLocation('/')),
        put(actions.openLayout()),
        fork(addToast, {
          type: 'success',
          message: `Welcome back, ${ session.account.email }`
        })
      ])
    } catch(e) {
      yield put(actions.createSessionFailed(e))

      continue
    }

    yield take(types['SESSION/DESTROY'])

    yield all([
      call(storage.clear, TOKEN),
      put(actions.destroySessionCompleted()),
      put(actions.requestLocation('/sign-in'))
    ])
  }
}

export default function*() {
  yield fork(loop)

  yield call(restoreSession)

  yield put({
    type: '@@SESSION/INITIALIZED'
  })
}
