import { all, call, fork, put, take } from 'redux-saga/effects'

import Session from 'models/session'
import { actions, types } from 'state/interface'
import storage from 'services/storage'

const TOKEN = 'jwt'

const restoreSession = function*() {
  try {
    const token = yield storage.get(TOKEN)

    if (token) {
      const session = yield Session.refresh(token)

      yield put(
        actions.restoreSession(session)
      )
    }
  } catch (e) {
    yield storage.clear(TOKEN)
  }
}

const loop = function*() {
  while (true) {
    const action = yield take(types.session.CREATE)
    const { credential } = action.payload

    try {
      const session = credential ?
        (yield Session.create(credential)) :
        action.payload.session

      yield all([
        storage.set(TOKEN, session.token),
        put(
          actions.createSessionCompleted(session)
        ),
        put(
          actions.requestLocation('/')
        ),
        put(
          actions.openLayout()
        )
      ])
    } catch(e) {
      yield put(actions.createSessionFailed(e))

      continue
    }

    yield take(types.session.DESTROY)

    yield all([
      storage.clear(TOKEN),
      put(
        actions.destroySessionCompleted()
      ),
      put(
        actions.requestLocation('/sign-in')
      ),
      put({ type: '@@RESET' })
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
