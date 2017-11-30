import { delay } from 'redux-saga'
import { call, fork, put, select, take } from 'redux-saga/effects'

import { SESSION } from 'actions/session'

import { post } from 'services/rest'

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
    } catch (e) {
      yield put({
        type: SESSION.SIGN_IN_FAILURE,
        error: e
      })
    }
  }
}

export function* refreshJWT() {
  while (true) {
    yield call(delay, 5e3)
    const session = yield select(state => state.session)

    if (session.jwt) {
      console.log('JWT is expiring... refresh it')
    }
  }
}

export default function* root() {
  yield fork(watchSignInRequest)
  yield fork(refreshJWT)
}
