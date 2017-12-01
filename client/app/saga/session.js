import { delay } from 'redux-saga'
import { call, fork, put, select, take } from 'redux-saga/effects'

import { SESSION } from 'actions/session'
import { redirect } from 'actions/location'

import { head, post } from 'services/rest'

export function* watchSignInRequest() {
  while (true) {
    const action = yield take(SESSION.SIGN_IN_REQUEST)

    try {
      let session = yield select(state => state.session)

      session = yield call(post, {
        url: '/api/sessions',
        data: action.payload
      }, {
        token: session.token
      })

      const ttl = session.ttl

      yield put({
        type: SESSION.SIGN_IN_SUCCESS,
        payload: session
      })

      if (!action.payload.refresh) {
        yield put(redirect('/'))
      }

      // refresh token
      yield fork(refreshJWT)
    } catch (e) {
      yield put({
        type: SESSION.SIGN_IN_FAILURE,
        error: e
      })
    }
  }
}

export function* watchVerifyRequest() {
  while (true) {
    const action = yield take(SESSION.VERIFY_REQUEST)

    try {
      const session = yield select(state => state.session)

      if (!session.token) {
        throw new Error('No Token')
      }

      const verifyResult = yield call(head, {
        url: '/api/sessions'
      }, {
        token: session.token
      })

      yield put({
        type: SESSION.VERIFY_SUCCESS
      })
    } catch (e) {
      yield put({
        type: SESSION.VERIFY_FAILURE,
        error: e
      })
    }
  }
}

export function* refreshJWT() {
  const session = yield select(state => state.session)

  if (!session || !session.token || !session.ttl) {
    console.log('Invalid state')

    return
  }

  yield call(delay, session.ttl - 5e3)

  yield put({
    type: SESSION.SIGN_IN_REQUEST,
    payload: {
      refresh: true
    }
  })
}

export default function* root() {
  yield fork(watchSignInRequest)
  yield fork(watchVerifyRequest)
  yield fork(refreshJWT)
}
