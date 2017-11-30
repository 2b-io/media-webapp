import { delay } from 'redux-saga'
import { call, fork, put, select, take } from 'redux-saga/effects'

import { SESSION } from 'actions/session'
import { redirect } from 'actions/location'

import { head, post } from 'services/rest'

export function* watchSignInRequest() {
  while (true) {
    const action = yield take(SESSION.SIGN_IN_REQUEST)

    try {
      const session = yield call(post, {
        url: '/api/sessions',
        data: action.payload
      })

      yield put({
        type: SESSION.SIGN_IN_SUCCESS,
        payload: session
      })

      yield put(redirect('/'))
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
  while (true) {
    yield call(delay, 5e3)
    const session = yield select(state => state.session)

    if (session.token) {
      console.log('JWT is expiring... refresh it')
    }
  }
}

export default function* root() {
  yield fork(watchSignInRequest)
  yield fork(watchVerifyRequest)
  yield fork(refreshJWT)
}
