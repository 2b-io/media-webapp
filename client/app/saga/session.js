import { delay } from 'redux-saga'
import { cancel, call, fork, put, race, select, take } from 'redux-saga/effects'

import { SESSION } from 'actions/session'
import { redirect, replace } from 'actions/location'
import { head, post } from 'services/rest'
import { clear, get, set } from 'services/storage'

const TOKEN_STORAGE_KEY = 'jwt'

function* createSession({ action, token }) {
  try {
    const session = yield call(post, {
      url: '/api/sessions',
      data: action.payload
    }, {
      token: token
    })

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

function* destroySession(reason) {
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
    let session = yield select(state => state.app.session)

    token = session.token
  }

  const { response, signOut } = yield race({
    response: call(createSession, {
      action: action,
      token: token
    }),
    signOut: take(SESSION.DESTROY_REQUEST)
  })

  if (signOut) {
    yield call(destroySession)
    return null
  }

  return response
}

function* verifySession(session) {
  while (true) {
    yield take(SESSION.VERIFY_REQUEST)

    try {
      yield head({
        url: '/api/sessions'
      }, {
        token: session.token
      })
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

    const verifyTask = yield fork(verifySession, session)

    while (true) {
      const { expired, signOut, verify } = yield race({
        expired: delay((session.ttl > 5e3) ? (session.ttl - 5e3) : 0),
        signOut: take(SESSION.DESTROY_REQUEST)
      })

      if (verify) {
        try {
          yield call(head, {
            url: '/api/sessions'
          }, {
            token: session.token
          })
        } catch (e) {
          session = yield call(destroySession, e)
        }
      } else if (expired) {
        // refresh token
        session = yield call(authorize, {
          payload: { refresh: true }
        })
      } else if (signOut) {
        // sign out
        session = yield call(destroySession)
      }

      if (!session) {
        yield cancel(verifyTask)
        break
      }
    }
  }
}
