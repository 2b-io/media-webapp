import { delay } from 'redux-saga'
import { cancel, call, fork, put, race, select, take } from 'redux-saga/effects'

import { SESSION } from 'actions/session'
import { clear, get, set } from 'services/storage'
import Session from 'models/session'

const TOKEN_STORAGE_KEY = 'jwt'

function* _createSession({ action, token }) {
  try {
    const session = token ?
      yield call(Session.refresh, token) :
      yield call(Session.create, action.payload)

    yield set(TOKEN_STORAGE_KEY, session.token)
    yield put({
      type: SESSION.CREATE_SUCCESS,
      payload: session
    })

    return session
  } catch (e) {
    yield clear(TOKEN_STORAGE_KEY)
    yield put({
      type: SESSION.CREATE_FAILURE,
      error: e
    })

    return null
  }
}

function* _destroySession(reason) {
  yield clear(TOKEN_STORAGE_KEY)
  yield put({
    type: SESSION.DESTROY_SUCCESS,
    payload: reason
  })

  return null
}

function* authorize(action, token) {
  // if there is no token, try get it from state
  if (!token) {
    let session = yield select(state => state.domain.session)

    token = session.token
  }

  const { response, signOut } = yield race({
    response: call(_createSession, {
      action: action,
      token: token
    }),
    signOut: take(SESSION.DESTROY_REQUEST)
  })

  if (signOut) {
    yield call(_destroySession)
    return null
  }

  return response
}

function* _verifySession(session) {
  while (true) {
    yield take(SESSION.VERIFY_REQUEST)

    try {
      yield call(Session.verify, session.token)
    } catch (e) {
      yield put({
        type: SESSION.DESTROY_REQUEST
      })
    }
  }
}

export default function* root() {
  while (true) {
    // wait for sign-in
    const action = yield take(SESSION.CREATE_REQUEST)
    const { token } = action.payload

    let session = yield call(authorize, action, token)

    // sign-in failure
    if (!session) continue

    const verifyTask = yield fork(_verifySession, session)

    while (true) {
      const { expired, signOut, verify } = yield race({
        expired: delay((session.ttl > 5e3) ? (session.ttl - 5e3) : 0),
        signOut: take(SESSION.DESTROY_REQUEST)
      })

      if (verify) {
        try {
          yield call(Session.verify, session)
        } catch (e) {
          session = yield call(_destroySession, e)
        }
      } else if (expired) {
        // refresh token
        session = yield call(authorize, {
          payload: { refresh: true }
        })
      } else if (signOut) {
        // sign out
        session = yield call(_destroySession)
      }

      if (!session) {
        yield cancel(verifyTask)
        break
      }
    }
  }
}
